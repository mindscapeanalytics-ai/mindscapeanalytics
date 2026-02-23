import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// Optimized for pooler/direct connection stability
// In development, Next.js HMR keeps idle connections which PgBouncer (6543) aggressively drops, causing P1001.
// We use the direct connection (5432) locally, and the pooler (6543) in production (serverless).
const dbUrl = process.env.NODE_ENV === 'development'
    ? (process.env.DIRECT_URL || process.env.DATABASE_URL || "")
    : (process.env.DATABASE_URL || process.env.DIRECT_URL || "");

const censoredUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');

if (process.env.NODE_ENV === 'development') {
    console.log(`[Prisma] Initializing with: ${censoredUrl}`);
}

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: dbUrl
        }
    },
    // Add connection pool timeout configurations
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

// Connection check in dev only, with timeout to avoid hanging
if (process.env.NODE_ENV === 'development') {
    // checkConnection logic disabled to prevent pool exhaustion during hot reloads
}


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
