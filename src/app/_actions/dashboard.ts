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

export async function getRecentActivity() {
    const session = await getSession();

    if (!session?.user) {
        throw new Error("Authentication required.");
    }

    const sellerId = session.user.id;

    try {
        // Fetch recent products
        const recentProducts = await prisma.product.findMany({
            where: { sellerId },
            orderBy: { createdAt: "desc" },
            take: 3,
            select: {
                id: true,
                name: true,
                createdAt: true,
            }
        });

        // Fetch recent sales (OrderItems)
        const recentSales = await prisma.orderItem.findMany({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
            include: {
                product: {
                    select: {
                        name: true
                    }
                },
                order: {
                    select: {
                        createdAt: true,
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                order: {
                    createdAt: "desc"
                }
            },
            take: 5
        });

        // Combine into activity feed
        const activity = [
            ...recentProducts.map(p => ({
                id: `prod-${p.id}`,
                type: "product_created" as const,
                title: "New Asset Released",
                description: `Architectural asset "${p.name}" has been localized in the registry.`,
                timestamp: p.createdAt,
            })),
            ...recentSales.map(s => ({
                id: `sale-${s.id}`,
                type: "sale_completed" as const,
                title: "Asset Deployed",
                description: `Unit "${s.product.name}" acquired by institutional entity ${s.order.user?.name || s.order.user?.email || "Unknown"}.`,
                timestamp: s.order.createdAt,
            }))
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 10);

        return activity;
    } catch (error) {
        console.error("[GET_RECENT_ACTIVITY_ERROR]", error);
        return [];
    }
}

