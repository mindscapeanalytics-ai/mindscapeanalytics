import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

// Lazy initialization to avoid build-time errors
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-11-17.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Check if order exists, if not create it
        // @ts-ignore - Prisma client types may need regeneration
        const existingOrder = await prisma.order.findUnique({
          where: { paymentIntentId: paymentIntent.id },
        });

        if (!existingOrder) {
          // Create order from payment intent metadata
          const items = paymentIntent.metadata.items 
            ? JSON.parse(paymentIntent.metadata.items) 
            : [];
          
          const customerInfo = {
            name: paymentIntent.metadata.customerName || 'Guest',
            email: paymentIntent.metadata.customerEmail || '',
          };

          // @ts-ignore - Prisma client types may need regeneration
          await prisma.order.create({
            data: {
              paymentIntentId: paymentIntent.id,
              amount: paymentIntent.amount / 100, // Convert from cents
              currency: paymentIntent.currency,
              items: items as any,
              customerInfo: customerInfo as any,
              metadata: paymentIntent.metadata as any,
              status: 'COMPLETED',
            },
          });

          console.log(`Order created for PaymentIntent ${paymentIntent.id}`);
        } else {
          // Update existing order status to COMPLETED
          // @ts-ignore - Prisma client types may need regeneration
          await prisma.order.update({
            where: { paymentIntentId: paymentIntent.id },
            data: { status: 'COMPLETED' },
          });

          console.log(`Order updated for PaymentIntent ${paymentIntent.id}`);
        }

        // TODO: Send confirmation email to customer
        // TODO: Send notification to admin
        // TODO: Generate download links for purchased products

        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        
        // Update order status to FAILED
        // @ts-ignore - Prisma client types may need regeneration
        await prisma.order.updateMany({
          where: {
            paymentIntentId: failedPayment.id,
          },
          data: {
            status: 'FAILED',
          },
        });

        console.log(`PaymentIntent ${failedPayment.id} failed`);
        break;

      case 'charge.refunded':
        const refund = event.data.object as Stripe.Charge;
        
        // Update order status to REFUNDED
        if (refund.payment_intent) {
          // @ts-ignore - Prisma client types may need regeneration
          await prisma.order.updateMany({
            where: {
              paymentIntentId: typeof refund.payment_intent === 'string' 
                ? refund.payment_intent 
                : refund.payment_intent.id,
            },
            data: {
              status: 'REFUNDED',
            },
          });
        }

        console.log(`Charge ${refund.id} was refunded`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing for webhook routes
export const runtime = 'nodejs';

