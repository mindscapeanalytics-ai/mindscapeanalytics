"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
    const { itemCount } = useCart();

    return (
        <Link href="/cart" className="relative">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </button>
        </Link>
    );
}
