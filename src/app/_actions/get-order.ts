
"use server";

import { prisma } from "@/lib/prisma";

export async function getOrderBySessionId(sessionId: string) {
    if (!sessionId) return null;

    try {
        const order = await prisma.order.findUnique({
            where: { stripeSessionId: sessionId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                productFiles: true
                            }
                        }
                    }
                }
            }
        });

        if (order && !order.isPaid) {
            order.items = order.items.map(item => ({
                ...item,
                product: {
                    ...item.product,
                    productFiles: []
                }
            }));
        }

        return order;
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
}
