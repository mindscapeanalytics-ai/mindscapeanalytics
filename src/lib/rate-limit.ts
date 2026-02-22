/**
 * Rate limiting utilities
 * Simple in-memory rate limiter (for production, use Redis-based solution)
 */

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

// In-memory store (for production, replace with Redis)
const store: RateLimitStore = {};

// Clean up expired entries periodically
setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
        if (store[key].resetTime < now) {
            delete store[key];
        }
    });
}, 60000); // Clean up every minute

/**
 * Simple rate limiter
 * @param identifier - Unique identifier for the rate limit (e.g., IP address, user ID)
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed status and reset time
 */
export function rateLimit(
    identifier: string,
    maxRequests: number = 100,
    windowMs: number = 60000 // 1 minute default
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = identifier;

    // Get or create entry
    let entry = store[key];

    // If entry doesn't exist or window has expired, create new entry
    if (!entry || entry.resetTime < now) {
        entry = {
            count: 0,
            resetTime: now + windowMs,
        };
        store[key] = entry;
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    const allowed = entry.count <= maxRequests;
    const remaining = Math.max(0, maxRequests - entry.count);

    return {
        allowed,
        remaining,
        resetTime: entry.resetTime,
    };
}

/**
 * Get client identifier from request
 * Uses IP address or user ID if available
 */
export function getClientIdentifier(request: Request): string {
    // Try to get user ID from headers (if authenticated)
    const userId = request.headers.get('x-user-id');
    if (userId) {
        return `user:${userId}`;
    }

    // Fall back to IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() :
        request.headers.get('x-real-ip') ||
        'unknown';

    return `ip:${ip}`;
}

/**
 * Rate limit middleware for Next.js API routes
 */
export function withRateLimit(
    maxRequests: number = 100,
    windowMs: number = 60000
) {
    return async (request: Request): Promise<Response | null> => {
        const identifier = getClientIdentifier(request);
        const result = rateLimit(identifier, maxRequests, windowMs);

        if (!result.allowed) {
            const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
            return Response.json(
                {
                    error: {
                        code: 'RATE_LIMIT_EXCEEDED',
                        message: 'Too many requests. Please try again later.',
                        statusCode: 429,
                        retryAfter,
                    },
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': retryAfter.toString(),
                        'X-RateLimit-Limit': maxRequests.toString(),
                        'X-RateLimit-Remaining': result.remaining.toString(),
                        'X-RateLimit-Reset': result.resetTime.toString(),
                    },
                }
            );
        }

        // Add rate limit headers to successful requests
        return null; // Continue with request
    };
}
