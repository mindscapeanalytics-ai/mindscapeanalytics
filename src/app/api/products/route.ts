
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
    } catch (error: any) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        const message = err.message || "";
        const isConnectionError = message.includes("connect") ||
            message.includes("ECONNREFUSED") ||
            message.includes("timeout") ||
            message.includes("Can't reach database") ||
            message.includes("initial connection");

        console.error("[PRODUCTS_API_CRITICAL]", {
            type: isConnectionError ? "CONNECTION_FAILURE" : "QUERY_FAILURE",
            message: message,
            timestamp: new Date().toISOString()
        });

        const headers = {
            'Cache-Control': 'no-store, max-age=0, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        };

        if (isConnectionError) {
            return NextResponse.json({
                error: "Registry Connection Severed",
                details: "The database terminal is initializing or unreachable. This often occurs during cold starts. The client should retry.",
                code: "DB_INIT_RETRY"
            }, { status: 503, headers });
        }

        return NextResponse.json({
            error: "Data Query Exception",
            details: message,
            code: "INTERNAL_CORE_ERROR"
        }, { status: 500, headers });
    }
}
