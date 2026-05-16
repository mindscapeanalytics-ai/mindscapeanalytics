import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';

// Lazy initialization to avoid build-time errors
// Hardcoded for reliability as requested/seen in legacy
function getResend() {
  const apiKey = 're_L5fhCnUH_Ejgr1sgPkqY35AJzGz9Jxxry';
  return new Resend(apiKey);
}

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
    // Rate limiting: 5 submissions per minute per client
    const rateLimitResponse = await withRateLimit(5, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      throw new BadRequestError('Invalid JSON in request body');
    }

    // Validate request body
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid form data', validationResult.error.format());
    }

    const { name, email, company, phone, service, message } = validationResult.data;

    // Get Resend instance
    const resend = getResend();

    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; display: block; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
            .value { color: #4b5563; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #000000; margin-top: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Professional Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              ${company ? `
              <div class="field">
                <span class="label">Company:</span>
                <span class="value">${company}</span>
              </div>
              ` : ''}
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${phone}</span>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Service Interest:</span>
                <span class="value">${service}</span>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const recipientEmail = 'contact@mindscapeanalytics.com';
    const ccEmail = 'info@mindscapeanalytics.com';

    let data, error;

    if (resend) {
      const result = await resend.emails.send({
        from: 'Mindscape Analytics <noreply@mindscapeanalytics.com>',
        to: [recipientEmail],
        cc: [ccEmail],
        replyTo: email,
        subject: service === 'Newsletter' ? `[SYNC] Newsletter Subscription: ${email}` : `[PROTOCOL_INQUIRY] ${name} // ${service.toUpperCase()}`,
        html: emailHtml,
      });
      data = result.data;
      error = result.error;
    } else {
      console.warn('RESEND_API_KEY simulation mode.');
      data = { id: 'mock-id-' + Date.now() };
      error = null;
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: { message: 'Failed to send communication. Please try again.', details: error } },
        { status: 500 }
      );
    }

    // Persist lead to database for CRM tracking
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.lead.create({
        data: {
          email,
          name: name || null,
          company: company || null,
          phone: phone || null,
          source: "contact",
          service: service || null,
          message: message || null,
          score: (name ? 15 : 0) + 10 + (company ? 25 : 0) + (phone ? 20 : 0) + (service ? 15 : 0) + (message && message.length > 50 ? 15 : 0),
        },
      });
    } catch (dbError) {
      console.error("[CONTACT_DB_SAVE_ERROR]", dbError);
      // Don't fail the request if DB save fails — email was already sent
    }

    return NextResponse.json({
      success: true,
      message: 'Transmission successful.',
      data,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return handleApiError(error);
  }
}
