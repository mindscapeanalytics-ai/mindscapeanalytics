import { PrismaClient } from "./src/generated/prisma/client";
const prisma = new PrismaClient();

async function checkUser() {
    const users = await prisma.user.findMany({
        select: { email: true, role: true, isSeller: true }
    });
    console.log("Current Users in Registry:");
    console.table(users);
    await prisma.$disconnect();
}

checkUser();
