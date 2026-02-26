"use server";

import { prisma } from "@/lib/prisma";
import { getRequiredSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    price: z.number().min(0, "Price must be positive"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
    images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
    features: z.array(z.string()).optional(),
    techStack: z.array(z.string()).optional(),
    productFiles: z.array(z.object({
        filename: z.string().min(1, "Filename is required"),
        url: z.string().url("Invalid asset URL"),
    })).optional(),
});

export async function createProduct(prevState: any, formData: FormData) {
    const { session, error: sessionError } = await getRequiredSession();
    if (sessionError || !session) return { error: sessionError || "Unauthorized" };

    const rawData = {
        name: formData.get("name") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        demoUrl: formData.get("demoUrl") as string,
        images: formData.getAll("imageUrl") as string[],
        features: formData.getAll("features") as string[],
        techStack: formData.getAll("techStack") as string[],
        productFiles: formData.getAll("fileUrl").map((url, i) => ({
            url: url as string,
            filename: formData.getAll("fileName")[i] as string || `Asset_${i + 1}`
        })).filter(f => f.url.trim() !== ""),
    };

    const validated = productSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.issues[0].message };
    }

    const { name, price, category, description, demoUrl, images, features, techStack, productFiles } = validated.data;

    try {
        await prisma.product.create({
            data: {
                name,
                price,
                category,
                description: description || "",
                approvedForSale: session.user.role === "admin",
                demoUrl: demoUrl || null,
                features: features || [],
                techStack: techStack || [],
                sellerId: session.user.id,
                images: {
                    create: images.map(url => ({ url }))
                },
                productFiles: {
                    create: productFiles || []
                }
            },
        });
    } catch (error) {
        console.error("Failed to create product:", error);
        return { error: "Database error. Please verify your connection." };
    }

    revalidatePath("/admin/products");
    revalidatePath("/seller");
    revalidatePath("/shop");

    if (session.user.role === "admin") {
        redirect("/admin/products");
    } else {
        redirect("/seller");
    }
}

export async function updateProduct(prevState: any, formData: FormData) {
    const { session, error: sessionError } = await getRequiredSession();
    if (sessionError || !session) return { error: sessionError || "Unauthorized" };

    const rawData = {
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        price: parseFloat(formData.get("price") as string),
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        demoUrl: formData.get("demoUrl") as string,
        images: formData.getAll("imageUrl") as string[],
        features: formData.getAll("features") as string[],
        techStack: formData.getAll("techStack") as string[],
    };

    const validated = productSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.issues[0].message };
    }

    const { id, name, price, category, description, demoUrl, images, features, techStack, productFiles } = validated.data;

    if (!id) return { error: "Product ID is required for updates." };

    try {
        // Fetch product to check ownership
        const product = await prisma.product.findUnique({
            where: { id },
            select: { sellerId: true }
        });

        if (!product) {
            return { error: "Product not found." };
        }

        if (session.user.role !== "admin" && product.sellerId !== session.user.id) {
            return { error: "Unauthorized. You can only update your own products." };
        }

        // Update product metadata
        await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                category,
                description: description || "",
                demoUrl: demoUrl || null,
                features: features || [],
                techStack: techStack || [],
            },
        });

        // Update images
        if (images && images.length > 0) {
            await prisma.image.deleteMany({ where: { productId: id } });
            await prisma.image.createMany({
                data: images.map(url => ({ url, productId: id }))
            });
        }

        // Update product files
        if (productFiles) {
            await prisma.productFile.deleteMany({ where: { productId: id } });
            await prisma.productFile.createMany({
                data: productFiles.map(f => ({ ...f, productId: id }))
            });
        }

    } catch (error) {
        console.error("Failed to update product:", error);
        return { error: "Database error. Please verify your connection." };
    }

    revalidatePath("/admin/products");
    revalidatePath("/seller");
    revalidatePath(`/shop/${id}`);
    revalidatePath("/shop");

    if (session.user.role === "admin") {
        redirect("/admin/products");
    } else {
        redirect("/seller");
    }
}
