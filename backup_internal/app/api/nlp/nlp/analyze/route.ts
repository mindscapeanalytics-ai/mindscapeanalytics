import { NextRequest, NextResponse } from 'next/server';
import { nlpRequestSchema } from '@/lib/validators';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 100 requests per minute per client
    const rateLimitResponse = await withRateLimit(100, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validationResult = nlpRequestSchema.safeParse(body);
    if (!validationResult.success) {
      throw new BadRequestError('Invalid request format', validationResult.error.errors);
    }

    const { text, options = {} } = validationResult.data;

    // TODO: Replace with actual NLP service (OpenAI, AWS Comprehend, etc.)
    // For now, generate mock analysis
    const analysis = {
      sentiment: {
        score: 0.75,
        label: 'positive',
        confidence: 0.89
      },
      entities: [
        {
          text: text.split(' ').filter((word: string) => word.length > 6)[0] || 'company',
          type: 'ORG',
          start: 0,
          end: 7
        }
      ],
      language: {
        detected: 'en',
        confidence: 0.98
      },
      summary: `This is a summary of the provided text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`,
      keywords: text.split(' ')
        .filter((word: string) => word.length > 4)
        .slice(0, 5)
        .map((word: string) => ({ text: word, relevance: (Math.random() * 0.5) + 0.5 })),
      categories: [
        {
          label: 'Technology',
          confidence: 0.82
        }
      ]
    };

    // Save NLP result to database
    try {
      await prisma.nLPResult.create({
        data: {
          userId: session.user.id as string,
          text: text.substring(0, 10000), // Limit stored text length
          sentiment: analysis.sentiment.label,
          entities: analysis.entities as any,
        },
      });
    } catch (dbError) {
      // Log error but don't fail the request
      console.error('Failed to save NLP result to database:', dbError);
    }

    return NextResponse.json({
      success: true,
      analysis,
      text: text.substring(0, 100), // Return truncated text in response
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return handleApiError(error);
  }
}
