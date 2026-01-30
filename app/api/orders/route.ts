import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, UnauthorizedError, NotFoundError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { z } from 'zod';

// Validation schema
const createOrderSchema = z.object({
  paymentIntentId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().default('usd'),
  items: z.array(z.any()),
  customerInfo: z.record(z.string(), z.any()),
  metadata: z.record(z.string(), z.any()).optional(),
});

// GET - Fetch user's orders
export async function GET(request: NextRequest) {
  try {
    const rateLimitResponse = await withRateLimit(30, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new UnauthorizedError('Authentication required');
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id as string,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent orders
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await withRateLimit(10, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();
    const validationResult = createOrderSchema.safeParse(body);

    if (!validationResult.success) {
      throw new BadRequestError('Invalid order format', validationResult.error.format());
    }

    const { paymentIntentId, amount, currency, items, customerInfo, metadata } = validationResult.data;

    // Get user session (optional - orders can be created for guests too)
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id as string | undefined;

    // Check if order with this payment intent already exists
    const existingOrder = await prisma.order.findUnique({
      where: { paymentIntentId },
    });

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        order: existingOrder,
        message: 'Order already exists',
      });
    }

    // Create new order
    const order = await prisma.order.create({
      data: {
        userId,
        paymentIntentId,
        amount,
        currency,
        items: items as any,
        customerInfo: customerInfo as any,
        metadata: metadata as any,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

