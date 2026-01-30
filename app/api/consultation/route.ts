import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';

// Lazy initialization to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY || 're_L5fhCnUH_Ejgr1sgPkqY35AJzGz9Jxxry';
  if (!apiKey) {
    // Return null to allow falling back to mock mode during development
    return null;
  }
  return new Resend(apiKey);
}

// Validation schema
const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 consultations per hour per client
    const rateLimitResponse = await withRateLimit(3, 3600000)(request);
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
    const validationResult = consultationSchema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid form data', validationResult.error.format());
    }

    const { name, email, phone, company, service, budget, timeline, message } = validationResult.data;

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
            .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; display: block; }
            .value { color: #4b5563; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #dc2626; margin-top: 10px; }
            .badge { display: inline-block; background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; margin-left: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Free Consultation Request <span class="badge">Consultation</span></h2>
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
              ${phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${phone}</span>
              </div>
              ` : ''}
              ${company ? `
              <div class="field">
                <span class="label">Company:</span>
                <span class="value">${company}</span>
              </div>
              ` : ''}
              <div class="field">
                <span class="label">Service Interest:</span>
                <span class="value">${service}</span>
              </div>
              ${budget ? `
              <div class="field">
                <span class="label">Budget Range:</span>
                <span class="value">${budget}</span>
              </div>
              ` : ''}
              ${timeline ? `
              <div class="field">
                <span class="label">Timeline:</span>
                <span class="value">${timeline}</span>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <span class="label">Project Details:</span>
                <div class="message-box">
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Free Consultation Request

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${company ? `Company: ${company}\n` : ''}
Service Interest: ${service}
${budget ? `Budget: ${budget}\n` : ''}${timeline ? `Timeline: ${timeline}\n` : ''}${message ? `\nProject Details:\n${message}` : ''}
    `.trim();

    // Send email using Resend
    let data, error;

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'zeeshan.keerio@mindscapeanalytics.com';

    if (resend) {
      const result = await resend.emails.send({
        from: 'Mindscape Analytics <noreply@mindscapeanalytics.com>',
        to: [recipientEmail],
        replyTo: email,
        subject: `Free Consultation Request: ${name}${company ? ` - ${company}` : ''}`,
        html: emailHtml,
        text: emailText,
      });
      data = result.data;
      error = result.error;
    } else {
      // Mock successful response when API key is missing
      console.warn('RESEND_API_KEY is not configured. Simulating successful consultation request.');
      data = { id: 'mock-id-' + Date.now() };
      error = null;
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: { message: 'Failed to book consultation. Please try again later.' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully!',
      data,
    });
  } catch (error) {
    console.error('Consultation request error:', error);
    return handleApiError(error);
  }
}

