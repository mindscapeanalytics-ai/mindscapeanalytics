"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getRequiredSession } from "@/lib/get-session";

export async function deleteProduct(formData: FormData) {
    const { session, error } = await getRequiredSession();
    if (error || !session) {
        console.error(error || "Unauthorized");
        return;
    }

    const productId = formData.get("id") as string;
    if (!productId) {
        console.error("Product ID missing");
        return;
    }

    // Fetch product to check ownership
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { sellerId: true }
    });

    if (!product) {
        console.error("Product not found");
        return;
    }

    if (session.user.role !== "admin" && product.sellerId !== session.user.id) {
        console.error("Unauthorized. You can only delete your own products.");
        return;
    }

    try {
        await prisma.product.delete({
            where: { id: productId }
        });
    } catch (e) {
        console.error("Failed to delete product:", e);
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
}
