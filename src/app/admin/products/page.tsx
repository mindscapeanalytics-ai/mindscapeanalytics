import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import { Package, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { deleteProduct } from "@/app/_actions/delete-product";

export default async function AdminProductsPage() {
    const session = await getSession();

    const isSeller = session?.user?.role === "seller";
    const userId = session?.user?.id;

    // Fetch products from prisma
    const products = await prisma.product.findMany({
        where: isSeller ? { sellerId: userId } : {},
        include: { images: true, seller: true },
        orderBy: { createdAt: 'desc' }
    }).catch((err) => {
        console.error("Failed to fetch products for admin:", err);
        return [];
    }) as any[];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-4xl font-black mb-2 tracking-tighter uppercase"
                        style={{ fontSize: "clamp(2rem, 5vw, 2.25rem)" }}
                    >
                        Products
                    </h1>
                    <p className="text-white/40 font-medium uppercase tracking-widest text-sm">Manage platform offerings</p>
                </div>
                <Link href="/admin/products/new">
                    <button className="px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2 hover:bg-white/90 transition shadow-lg shadow-white/5 active:scale-95">
                        <Plus size={14} />
                        Add Product
                    </button>
                </Link>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="p-6 text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">Product</th>
                            <th className="p-6 text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">Category</th>
                            <th className="p-6 text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">Price</th>
                            <th className="p-6 text-white/40 font-black text-[10px] uppercase tracking-[0.2em]">Status</th>
                            <th className="p-6 text-white/40 font-black text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <Package size={24} className="text-white/20" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">No products found</h3>
                                            <p className="text-white/40 text-sm">Add your first product to get started.</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                                        <Package size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-bold text-lg group-hover:text-white transition-colors uppercase tracking-tight">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="px-3 py-1 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">
                                            {product.category?.replace(/_/g, ' ') || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="p-6 font-mono font-bold text-white/80">${product.price}</td>
                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${product.approvedForSale
                                            ? 'bg-white/10 text-white border-white/20'
                                            : 'bg-white/5 text-white/40 border-white/5'
                                            }`}>
                                            {product.approvedForSale ? 'Live' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <button className="p-2.5 bg-white/5 hover:bg-white hover:text-black rounded-xl border border-white/5 transition-all group/btn">
                                                    <Edit size={16} />
                                                </button>
                                            </Link>
                                            <form action={deleteProduct}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <button
                                                    type="submit"
                                                    className="p-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl border border-white/5 transition-all outline-none"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
