"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getRequiredSession } from "@/lib/get-session";

export async function deleteProduct(formData: FormData) {
    const { session, error } = await getRequiredSession();
    if (error || !session) {
        console.error(error || "Unauthorized");
        return { success: false, error: error || "Unauthorized" };
    }

    const productId = formData.get("id") as string;
    if (!productId) {
        console.error("Product ID missing");
        return { success: false, error: "Product ID missing" };
    }

    // Fetch product to check ownership
    const product = await prisma.product.findUnique({
        where: { id: productId },
        select: { sellerId: true }
    });

    if (!product) {
        console.error("Product not found");
        return { success: false, error: "Product not found" };
    }

    if (session.user.role !== "admin" && product.sellerId !== session.user.id) {
        console.error("Unauthorized. You can only delete your own products.");
        return { success: false, error: "Unauthorized. You can only delete your own products." };
    }

    try {
        await prisma.product.delete({
            where: { id: productId }
        });
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete product:", e);
        return { success: false, error: e.message || "Failed to delete product" };
    }
}
