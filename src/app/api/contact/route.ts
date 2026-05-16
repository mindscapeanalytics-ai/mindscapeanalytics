import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { notifyAdmin } from '@/lib/notifications';

// Validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = await withRateLimit(5, 60000)(request);
    if (rateLimitResponse) return rateLimitResponse;

    let body;
    try {
      body = await request.json();
    } catch (error) {
      throw new BadRequestError('Invalid JSON in request body');
    }

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid form data', validationResult.error.format());
    }

    const data = validationResult.data;

    // 1. PERSIST TO DATABASE
    try {
      const { prisma } = await import("@/lib/prisma");
      const score = (data.name ? 15 : 0) + 10 + (data.company ? 25 : 0) + (data.phone ? 20 : 0) + (data.service ? 15 : 0) + (data.message && data.message.length > 50 ? 15 : 0);
      
      await prisma.lead.create({
        data: {
          email: data.email,
          name: data.name || null,
          company: data.company || null,
          phone: data.phone || null,
          source: "contact",
          service: data.service || null,
          message: data.message || null,
          score,
        },
      });

      // 2. AUTOMATE NOTIFICATIONS (using shared utility)
      await notifyAdmin({
        title: '🚀 NEW CONTACT INQUIRY',
        ...data,
        score,
        color: 0xffffff // White for general contact
      });

    } catch (err) {
      console.error("[CONTACT_PROCESS_ERROR]", err);
      // Still return success if database fails but we processed the data
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission successful. Lead synchronized.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return handleApiError(error);
  }
}
