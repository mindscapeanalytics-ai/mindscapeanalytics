
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: { approvedForSale: true },
            include: { images: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("[SELLER_API_PRODUCTS_FATAL]", {
            message: error instanceof Error ? error.message : "Architecture failure",
            stack: error instanceof Error ? error.stack : "NO_STACK",
            errorObject: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            timestamp: new Date().toISOString()
        });

        return NextResponse.json({
            error: "System Integrity Failure",
            details: "Prisma or database connection was severed during asset retrieval.",
            code: (error as any)?.code || "INTERNAL_FLOW_FAULT"
        }, { status: 500 });
    }
}
