"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";

export async function getSellerStats() {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Authentication required.");
    }

    const sellerId = session.user.id;

    try {
        // 1. Total Products
        const totalProducts = await prisma.product.count({
            where: { sellerId },
        });

        // 2. Total Sales (OrderItems for products owned by this seller)
        const totalSales = await prisma.orderItem.count({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
        });

        // 3. Total Revenue (Sum of OrderItem prices * quantities)
        // Since Prisma doesn't directly sum (price * quantity) in a single _sum aggregation easily
        // without raw SQL or bringing records into memory, if quantity is almost always 1,
        // we can aggregate price. If not, a refined fetch is better.
        // For industrial safety, we'll fetch just the necessary fields for calculation.
        const orderItems = await prisma.orderItem.findMany({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
            select: {
                price: true,
                quantity: true,
            },
        });

        const totalRevenue = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        return {
            totalProducts,
            totalSales,
            totalRevenue: Math.round(totalRevenue * 100) / 100,
        };
    } catch (error) {
        console.error("[GET_SELLER_STATS_ERROR]", error);
        return {
            totalProducts: 0,
            totalSales: 0,
            totalRevenue: 0,
        };
    }
}
