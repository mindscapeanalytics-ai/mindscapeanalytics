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
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('general'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 subscriptions per hour per client
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
    const validationResult = newsletterSchema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid email address', validationResult.error.format());
    }

    const { email, source } = validationResult.data;

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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Newsletter Subscription</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              <div class="field">
                <span class="label">Source:</span>
                <span class="value">${source}</span>
              </div>
              <div class="field">
                <span class="label">Subscribed At:</span>
                <span class="value">${new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Newsletter Subscription

Email: ${email}
Source: ${source}
Subscribed At: ${new Date().toLocaleString()}
    `.trim();

    // Send email using Resend
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'zeeshan.keerio@mindscapeanalytics.com';

    let data, error;

    if (resend) {
      const result = await resend.emails.send({
        from: 'Mindscape Analytics <noreply@mindscapeanalytics.com>',
        to: [recipientEmail],
        replyTo: email,
        subject: `Newsletter Signup: [${source}] ${email}`,
        html: emailHtml,
        text: emailText,
      });
      data = result.data;
      error = result.error;
    } else {
      // Mock successful response when API key is missing
      console.warn('RESEND_API_KEY is not configured. Simulating successful newsletter subscription.');
      data = { id: 'mock-id-' + Date.now() };
      error = null;
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: { message: 'Failed to subscribe. Please try again later.' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return handleApiError(error);
  }
}

