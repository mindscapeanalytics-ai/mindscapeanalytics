import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = `${process.env.DATABASE_URL}`;

// Singleton pool to prevent connection exhaustion during dev hot reloads
const globalForPrisma = globalThis as unknown as {
    __pgPool?: Pool;
    __prismaClient?: PrismaClient;
};

if (!globalForPrisma.__pgPool) {
    globalForPrisma.__pgPool = new Pool({
        connectionString,
        max: 10, // Optimized for serverless/cold starts
        connectionTimeoutMillis: 30_000,
        idleTimeoutMillis: 60_000,
        maxUses: 7500,
        // Neon requires specific SSL handling for pooler
        ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
            ? false
            : {
                rejectUnauthorized: false,
                ca: process.env.CA_CERT
            },
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