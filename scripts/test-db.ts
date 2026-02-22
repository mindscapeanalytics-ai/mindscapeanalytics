
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    console.log("Testing database connection...");
    try {
        const userCount = await prisma.user.count();
        console.log("SUCCESS: Connected to database.");
        console.log("User count:", userCount);
    } catch (error: any) {
        console.error("FAILURE: Could not connect to database.");
        console.error("Error message:", error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
