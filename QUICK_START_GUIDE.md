# Quick Start Guide - Mindscape Analytics Improvements

## Overview

This guide helps developers quickly understand and use the new improvements made to the Mindscape Analytics platform.

---

## 🚀 Getting Started

### 1. Environment Setup

1. Copy environment variables (create `.env` file):
```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/mindscape"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Optional but recommended
OPENAI_API_KEY="sk-your-key"
HUGGING_FACE_API_KEY="your-key"
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run migrations:
```bash
npx prisma migrate dev
```

---

## 📚 Key New Files

### Core Utilities

- **`lib/env.ts`** - Environment variable validation
- **`lib/validators.ts`** - Input validation schemas
- **`lib/api-error.ts`** - Error handling utilities
- **`lib/rate-limit.ts`** - Rate limiting middleware

### Documentation

- **`ARCHITECTURE_REVIEW.md`** - Complete architecture analysis
- **`IMPROVEMENTS_SUMMARY.md`** - Summary of improvements
- **`QUICK_START_GUIDE.md`** - This file

---

## 🔧 Common Patterns

### Creating a New API Route

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { handleApiError, BadRequestError } from '@/lib/api-error';
import { withRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// 1. Define validation schema
const myRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

// 2. Create route handler
export async function POST(request: NextRequest) {
  try {
    // 3. Add rate limiting
    const rateLimitResponse = await withRateLimit(50, 60000)(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 4. Parse and validate request
    const body = await request.json();
    const validationResult = myRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      throw new BadRequestError('Invalid request', validationResult.error.errors);
    }

    const { name, email } = validationResult.data;

    // 5. Your business logic here
    // ...

    // 6. Return response
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    // 7. Handle errors
    return handleApiError(error);
  }
}
```

### Using Environment Variables

```typescript
import { env, hasOpenAI, isProduction } from '@/lib/env';

// Access validated environment variables
const dbUrl = env.DATABASE_URL;

// Check if services are available
if (hasOpenAI) {
  // Use OpenAI
}

// Check environment
if (isProduction) {
  // Production-specific code
}
```

### Using Validators

```typescript
import { predictionRequestSchema, PredictionRequest } from '@/lib/validators';

// Validate request
const result = predictionRequestSchema.safeParse(body);
if (!result.success) {
  throw new BadRequestError('Validation failed', result.error.errors);
}

// Type-safe data
const data: PredictionRequest = result.data;
```

### Error Handling

```typescript
import { 
  handleApiError, 
  BadRequestError, 
  UnauthorizedError,
  NotFoundError 
} from '@/lib/api-error';

try {
  // Your code
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  if (!authorized) {
    throw new UnauthorizedError();
  }
} catch (error) {
  return handleApiError(error);
}
```

### Rate Limiting

```typescript
import { withRateLimit } from '@/lib/rate-limit';

// 50 requests per minute
const rateLimitResponse = await withRateLimit(50, 60000)(request);
if (rateLimitResponse) {
  return rateLimitResponse; // Rate limit exceeded
}
```

### Database Operations

```typescript
import { prisma } from '@/lib/prisma';

// Always use the singleton from lib/prisma.ts
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' }
});
```

---

## 🔒 Security Best Practices

1. **Always validate input** - Use validators from `lib/validators.ts`
2. **Use rate limiting** - Protect all API routes
3. **Check authentication** - Use `getServerSession` for protected routes
4. **Handle errors properly** - Use `handleApiError` for consistent responses
5. **Never expose API keys** - Keep all AI service calls server-side
6. **Use Prisma singleton** - Always import from `lib/prisma.ts`

---

## 📝 API Route Checklist

When creating a new API route, ensure:

- [ ] Rate limiting implemented
- [ ] Input validation with Zod schema
- [ ] Error handling with `handleApiError`
- [ ] Authentication check (if required)
- [ ] Database operations use Prisma singleton
- [ ] Environment variables validated
- [ ] Proper TypeScript types
- [ ] Error logging (for debugging)

---

## 🐛 Debugging

### Common Issues

1. **Environment variables not found**
   - Check `.env` file exists
   - Verify `lib/env.ts` validation passes
   - Check variable names match exactly

2. **Rate limit errors**
   - Check rate limit configuration
   - Verify client identifier is correct
   - Consider increasing limits for development

3. **Validation errors**
   - Check Zod schema matches request format
   - Verify request body structure
   - Check error details in response

4. **Database errors**
   - Verify Prisma client is generated
   - Check database connection
   - Verify schema matches migrations

---

## 📖 Additional Resources

- **Architecture Review:** See `ARCHITECTURE_REVIEW.md`
- **Improvements Summary:** See `IMPROVEMENTS_SUMMARY.md`
- **Prisma Docs:** https://www.prisma.io/docs
- **Zod Docs:** https://zod.dev
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎯 Next Steps

1. Review the architecture documentation
2. Understand the new patterns
3. Update existing routes to use new utilities
4. Add tests for new functionality
5. Expand database schema as needed

---

*Last Updated: 2024*

