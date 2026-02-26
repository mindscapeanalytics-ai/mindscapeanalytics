"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart" className="relative">
            <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all relative group/cart">
                <ShoppingCart size={18} className="text-white/40 group-hover/cart:text-white transition-colors" />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-xl">
                        {itemCount}
                    </span>
                )}
            </button>
        </Link>
    );
}
