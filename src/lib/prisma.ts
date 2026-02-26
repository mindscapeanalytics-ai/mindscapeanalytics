import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// Singleton pool to prevent connection exhaustion during dev hot reloads
const globalForPrisma = globalThis as unknown as {
    __pgPool?: Pool;
    __prismaClient?: PrismaClient;
};

if (!globalForPrisma.__pgPool) {
    globalForPrisma.__pgPool = new Pool({
        connectionString,
        max: 10,
        connectionTimeoutMillis: 15_000, // 15s timeout
        idleTimeoutMillis: 30_000,
        // Ensure connection pooling on Neon works without SSL handshake timeouts
        ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
            ? false
            : { rejectUnauthorized: false },
    });

    // Observability for connection pool issues
    globalForPrisma.__pgPool.on('error', (err) => {
        console.error('[PRISMA_POOL_ERROR] Unexpected protocol rejection:', err.message);
    });
}

if (!globalForPrisma.__prismaClient) {
    const adapter = new PrismaPg(globalForPrisma.__pgPool);
    globalForPrisma.__prismaClient = new PrismaClient({ adapter });
}

const prisma = globalForPrisma.__prismaClient;

export { prisma };