"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createSellerProduct(prevState: any, formData: FormData) {
    const session = await getSession();

    if (!session?.user) {
        return { error: "Session expired. Please sign in again." };
    }

    const isSeller = (session.user as any).isSeller || false;
    if (!isSeller) {
        throw new Error("Only sellers can create products");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    // Extract arrays for JSON fields
    const features = formData.getAll("features") as string[];
    const techStack = formData.getAll("techStack") as string[];

    if (!name || !description || !price || !category) {
        return { error: "Indicated parameters (Name, Description, Price, Category) are requisite for initialization." };
    }

    try {
        // Create product with nested image create
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                features,
                techStack,
                sellerId: session.user.id,
                approvedForSale: false, // Requires admin approval
                images: imageUrl ? {
                    create: {
                        url: imageUrl,
                    }
                } : undefined
            },
        });

        revalidatePath("/seller");
        redirect("/seller");
    } catch (error) {
        console.error("[SELLER_PROTOCOL_FAILURE]", error);
        return { error: error instanceof Error ? error.message : "Architectural fault during product creation." };
    }
}
