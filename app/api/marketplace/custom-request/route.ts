import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// Validation schema
const customRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectDescription: z.string().min(10, 'Project description must be at least 10 characters'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per hour per client
    const rateLimitResponse = await withRateLimit(5, 3600000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      throw new BadRequestError('Invalid JSON in request body');
    }

    // Validate request body
    const validationResult = customRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request format',
            details: validationResult.error.errors,
          },
        },
        { status: 422 }
      );
    }

    const { name, email, company, phone, projectDescription, budget, timeline } = validationResult.data;

    // TODO: Send email notification to admin
    // TODO: Save to database for tracking
    // For now, just log the request
    console.log('Custom software request received:', {
      name,
      email,
      company,
      phone,
      projectDescription,
      budget,
      timeline,
      timestamp: new Date().toISOString(),
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Create a ticket in your support system

    return NextResponse.json({
      success: true,
      message: 'Custom request submitted successfully',
    });
  } catch (error) {
    return handleApiError(error);
  }
}

