
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/_actions/product";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function SellerEditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();

    if (!session?.user) {
        redirect(`/sign-in?callbackUrl=/seller/products/${id}/edit`);
    }

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            images: true,
            productFiles: true
        }
    });

    if (!product) {
        notFound();
    }

    // Ensure the seller owns the product or is an admin
    if (product.sellerId !== session.user.id && session.user.role !== "admin") {
        redirect("/seller");
    }

    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller/products" className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground mb-12 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Registry</span>
                    </Link>

                    <div className="mb-16">
                        <h1
                            className="text-5xl font-black mb-4 uppercase tracking-tighter italic"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                        >
                            RECONFIGURE <span className="text-foreground/20 not-italic">ASSET.</span>
                        </h1>
                        <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.5em] italic">Authorized Optimization Terminal</p>
                    </div>

                    <ProductForm
                        initialData={product as any}
                        action={updateProduct}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
