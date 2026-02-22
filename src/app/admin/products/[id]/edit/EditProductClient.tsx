"use client";

import { updateProduct } from "@/app/_actions/product";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductClientProps {
    product: any;
}

const initialState = {
    error: null as string | null,
};

export default function EditProductClient({ product }: EditProductClientProps) {
    const [state, formAction, isPending] = useActionState(updateProduct, initialState);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-12">
                <Link href="/admin/products" className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-all group text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Terminal
                </Link>
                <h1
                    className="text-5xl font-black tracking-tightest uppercase italic"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                >
                    Modify <span className="text-white/20 not-italic">Asset.</span>
                </h1>
            </div>

            <form action={formAction}>
                <input type="hidden" name="id" value={product.id} />
                <ProductForm
                    action={() => { }} // Not used because we wrap in higher-level form with hidden id
                    isPending={isPending}
                    state={state}
                    submitLabel="Sync Changes"
                    initialData={product}
                />
            </form>
        </div>
    );
}
