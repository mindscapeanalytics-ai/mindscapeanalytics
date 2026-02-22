"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { getSession } from "@/lib/get-session";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(productId: string): Promise<{ url: string }> {
    const session = await getSession();

    // Find product in DB — must exist and be approved for sale
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new Error("Asset not found in MSA Directory.");
    }

    if (!product.approvedForSale) {
        throw new Error("This asset is pending review and cannot be purchased at this time.");
    }

    const origin = (await headers()).get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    description: product.description || undefined,
                    images: [],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: 1,
        }],
        mode: 'payment',
        customer_email: session?.user?.email || undefined,
        metadata: {
            productId,
            userId: session?.user?.id || "",
        },
        success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/shop/${productId}`,
    });

    if (!stripeSession.url) {
        throw new Error("Failed to generate secure checkout portal.");
    }

    return { url: stripeSession.url };
}

export async function createMultiItemCheckout(
    items: Array<{ id: string; quantity: number }>
): Promise<{ url: string }> {
    const session = await getSession();

    if (!items || items.length === 0) {
        throw new Error("No items in cart.");
    }

    const origin = (await headers()).get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Fetch and validate all products from DB
    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
    });

    // Verify all products exist and are approved
    for (const item of items) {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
            throw new Error(`Asset "${item.id}" not found.`);
        }
        if (!product.approvedForSale) {
            throw new Error(`Asset "${product.name}" is not available for purchase.`);
        }
    }

    const lineItems = items.map((item) => {
        const product = products.find((p) => p.id === item.id)!;
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: item.quantity,
        };
    });

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        customer_email: session?.user?.email || undefined,
        metadata: {
            userId: session?.user?.id || "",
            // Store product IDs for webhook fulfillment
            products: JSON.stringify(items.map((i) => i.id)),
        },
        success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}&batch=true`,
        cancel_url: `${origin}/cart`,
    });

    if (!stripeSession.url) {
        throw new Error("Failed to generate checkout portal.");
    }

    return { url: stripeSession.url };
}
