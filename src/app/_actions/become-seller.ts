"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export async function becomeSeller(prevState: any, formData: FormData) {
    const session = await getSession();

    if (!session?.user) {
        return { success: false, error: "Authentication required.", url: null };
    }

    const storeName = formData.get("storeName") as string;
    const storeDescription = formData.get("storeDescription") as string;

    if (!storeName?.trim() || !storeDescription?.trim()) {
        return { success: false, error: "Store name and asset description are mandatory for enrollment.", url: null };
    }

    try {
        // Update user record with seller basic details
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                isSeller: true,
                role: "seller",
                storeName: storeName.trim(),
                storeDescription: storeDescription.trim(),
                sellerVerified: false,
            },
        });

        console.log(`[SELLER_ENROLLED] User ${session.user.id} enrolled locally - Store: ${storeName}`);

        // Revalidate essential paths
        revalidatePath("/", "layout");
        revalidatePath("/seller");
        revalidatePath("/shop");
        revalidatePath("/admin");

        return { success: true, url: "/seller", error: null };
    } catch (error: any) {
        console.error("[SELLER_ENROLLMENT_ERROR]", error);

        return {
            success: false,
            error: error.message || "Seller enrollment failed due to database rejection.",
            url: null,
        };
    }
}
