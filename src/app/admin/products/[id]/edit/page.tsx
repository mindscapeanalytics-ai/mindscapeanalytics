import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import EditProductClient from "./EditProductClient";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const session = await getSession();

    if (!session || (session.user.role !== "admin" && session.user.role !== "seller")) {
        redirect("/sign-in");
    }

    const product = await prisma.product.findUnique({
        where: { id },
        include: { images: true }
    });

    if (!product) {
        notFound();
    }

    // Role-based protection: Sellers can only edit their own products
    if (session.user.role !== "admin" && product.sellerId !== session.user.id) {
        redirect("/admin/products");
    }

    return <EditProductClient product={product} />;
}
