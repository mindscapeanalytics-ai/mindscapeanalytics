import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleApiError, BadRequestError, InternalServerError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

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

// Validation schema
const paymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    price: z.number(),
    quantity: z.number().positive(),
  })).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 payment intents per minute per client
    const rateLimitResponse = await withRateLimit(10, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('JSON parse error:', error);
      throw new BadRequestError('Invalid JSON in request body');
    }

    // Basic validation before Zod
    if (!body || typeof body !== 'object') {
      throw new BadRequestError('Request body must be an object');
    }

    if (typeof body.amount !== 'number' || body.amount <= 0) {
      throw new BadRequestError('Amount must be a positive number');
    }

    // Validate request body with Zod
    const validationResult = paymentIntentSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Zod validation errors:', JSON.stringify(validationResult.error.errors, null, 2));
      throw new BadRequestError('Invalid request format', validationResult.error.errors);
    }

    const { amount, currency, metadata, items } = validationResult.data;

    // Ensure amount is in cents (Stripe requires amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);
    const paymentCurrency = currency || 'usd';

    // Get Stripe instance
    const stripe = getStripe();

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: paymentCurrency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        items: items ? JSON.stringify(items) : undefined,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    
    // Handle Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: {
            code: 'STRIPE_ERROR',
            message: error.message,
            statusCode: 400,
          },
        },
        { status: 400 }
      );
    }

    return handleApiError(error);
  }
}
