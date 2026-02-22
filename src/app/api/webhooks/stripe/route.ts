import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    if (!webhookSecret || webhookSecret === "whsec_...") {
        console.error("[WEBHOOK_CONFIG_ERROR] STRIPE_WEBHOOK_SECRET is not configured correctly.");
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`[STRIPE_WEBHOOK_VERIFICATION_FAILED] ${err.message}`);
        return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                // CRITICAL: userId must always come from our metadata — never from session.customer
                // which is a Stripe customer ID, NOT a database user ID.
                const userId = session.metadata?.userId;
                const productId = session.metadata?.productId;
                const productsJson = session.metadata?.products;

                const guestEmail = session.customer_details?.email;
                const guestName = session.customer_details?.name;

                if (!userId && !guestEmail) {
                    console.error("[WEBHOOK_ERROR] No userId and no guestEmail. Cannot fulfill order.", {
                        sessionId: session.id,
                    });
                    break;
                }

                if (!productId && !productsJson) {
                    console.warn("[WEBHOOK_WARNING] Session completed without product metadata.", {
                        sessionId: session.id,
                    });
                    break;
                }

                // Idempotency: skip if order already exists for this session
                const existingOrder = await prisma.order.findUnique({
                    where: { stripeSessionId: session.id },
                });

                if (existingOrder) {
                    console.log(`[WEBHOOK_IDEMPOTENT] Order already exists for session ${session.id}. Skipping.`);
                    break;
                }

                // Verify the user exists in DB if userId is present
                if (userId) {
                    const user = await prisma.user.findUnique({ where: { id: userId } });
                    if (!user) {
                        console.warn(`[WEBHOOK_WARNING] userId ${userId} found in metadata but not in DB. Proceeding as guest.`);
                    }
                }

                // Build items with accurate prices from DB
                let itemsData: { productId: string; quantity: number; price: number }[] = [];
                const totalAmount = (session.amount_total || 0) / 100;

                if (productsJson) {
                    // Multi-item checkout: fetch actual product prices from DB
                    try {
                        const productIds = JSON.parse(productsJson) as string[];
                        const products = await prisma.product.findMany({
                            where: { id: { in: productIds } },
                            select: { id: true, price: true },
                        });

                        // Map product IDs to prices; use 0 only if product was deleted
                        itemsData = productIds.map((id) => {
                            const product = products.find((p) => p.id === id);
                            return {
                                productId: id,
                                quantity: 1,
                                price: product?.price ?? 0,
                            };
                        });
                    } catch (parseError) {
                        console.error("[WEBHOOK_JSON_PARSE_ERROR] Failed to parse productsJson:", parseError);
                        break;
                    }
                } else if (productId) {
                    // Single-item checkout
                    itemsData = [{
                        productId,
                        quantity: 1,
                        price: totalAmount,
                    }];
                }

                if (itemsData.length === 0) {
                    console.error("[WEBHOOK_ERROR] No items to fulfill for session:", session.id);
                    break;
                }

                // We need to determine the sellers for each item to issue payouts
                // Fetch the products again, this time with seller info
                const productIdsForFulfillment = itemsData.map(i => i.productId);
                const productsWithSellers = await prisma.product.findMany({
                    where: { id: { in: productIdsForFulfillment } },
                    include: { seller: { select: { stripeAccountId: true } } }
                });

                // Atomic order creation
                await prisma.$transaction(async (tx) => {
                    const order = await tx.order.create({
                        data: {
                            userId: userId || undefined,
                            customerEmail: guestEmail || undefined,
                            customerName: guestName || undefined,
                            amount: totalAmount,
                            status: "completed",
                            isPaid: true,
                            stripeSessionId: session.id,
                            items: {
                                create: itemsData,
                            },
                        },
                    });
                    console.log(`[ORDER_FULFILLED] Order ${order.id} created. (Status: ${userId ? 'Auth' : 'Guest'})`);
                });

                // Issue Stripe Transfers for Seller Payouts (Platform keeps 10%)
                const PLATFORM_FEE_PERCENTAGE = 0.10;

                // Group totals by Stripe Account ID
                const sellerPayouts: Record<string, number> = {};

                for (const item of itemsData) {
                    const productInfo = productsWithSellers.find(p => p.id === item.productId);
                    if (!productInfo) continue;

                    const sellerStripeAccount = productInfo.seller?.stripeAccountId;
                    if (!sellerStripeAccount) {
                        console.warn(`[WEBHOOK_WARNING] Product ${item.productId} has no seller with a connected Stripe account. Funds remain with platform.`);
                        continue;
                    }

                    const itemRevenue = item.price * item.quantity;
                    const sellerCut = itemRevenue * (1 - PLATFORM_FEE_PERCENTAGE);

                    if (!sellerPayouts[sellerStripeAccount]) {
                        sellerPayouts[sellerStripeAccount] = 0;
                    }
                    sellerPayouts[sellerStripeAccount] += sellerCut;
                }

                // Execute transfers
                for (const [stripeAccountId, amount] of Object.entries(sellerPayouts)) {
                    // Stripe transfers must be in cents and integers
                    const transferAmountCents = Math.round(amount * 100);
                    if (transferAmountCents <= 0) continue;

                    try {
                        const transfer = await stripe.transfers.create({
                            amount: transferAmountCents,
                            currency: "usd",
                            destination: stripeAccountId,
                            transfer_group: session.id,
                            metadata: {
                                orderSessionId: session.id
                            }
                        });
                        console.log(`[PAYOUT_SUCCESS] Transferred ${transferAmountCents / 100} USD to seller ${stripeAccountId} (Transfer: ${transfer.id})`);
                    } catch (transferError) {
                        console.error(`[PAYOUT_ERROR] Failed to transfer funds to ${stripeAccountId}:`, transferError);
                        // Note: The order is fulfilled, but the payout failed. 
                        // This would need manual intervention in Stripe Dashboard.
                    }
                }

                break;
            }

            case "account.updated": {
                // Sync Stripe Connect account verification status to the seller
                const account = event.data.object as Stripe.Account;

                if (account.charges_enabled && account.payouts_enabled) {
                    await prisma.user.updateMany({
                        where: { stripeAccountId: account.id },
                        data: { sellerVerified: true },
                    });
                    console.log(`[SELLER_VERIFIED] Stripe account ${account.id} is now fully verified.`);
                }
                break;
            }

            case "payment_intent.payment_failed": {
                const failedIntent = event.data.object as Stripe.PaymentIntent;
                console.error(`[PAYMENT_FAILED] PaymentIntent ${failedIntent.id} failed.`);
                break;
            }

            default:
                // Unhandled events — no action needed
                break;
        }
    } catch (error) {
        console.error("[WEBHOOK_HANDLER_ERROR] Unexpected error processing event:", error);
        // Return 200 to prevent Stripe from retrying — log for manual investigation
        // (Retrying would cause duplicate processing for non-idempotent operations)
    }

    return NextResponse.json({ received: true, timestamp: new Date().toISOString() });
}
