"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Menu,
    X,
    User,
    ArrowRight,
    LayoutDashboard,
    Store,
} from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { authClient } from "@/lib/auth-client";
import Web3WalletConnect from "@/components/shop/Web3WalletConnect";

const companyLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const sessionResult = authClient.useSession();
    const session = sessionResult.data;

    const isShopPath = pathname?.startsWith("/shop") ||
        pathname?.startsWith("/admin") ||
        pathname?.startsWith("/checkout") ||
        pathname?.startsWith("/success") ||
        pathname?.startsWith("/sign-in") ||
        pathname?.startsWith("/sign-up") ||
        pathname?.startsWith("/become-seller") ||
        pathname?.startsWith("/cart");

    const isSeller = session?.user?.role === "seller" || (session?.user as any)?.isSeller;

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-[100] transition-all duration-700",
                isScrolled || mobileMenuOpen ? "py-3" : "py-5"
            )}
        >
            <div
                className={cn(
                    "w-[calc(100%-3rem)] max-w-7xl mx-auto flex items-center justify-between px-6 py-2 rounded-full transition-all duration-500 border relative",
                    isScrolled
                        ? "bg-transparent/80 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent/40 backdrop-blur-md border-white/5"
                )}
            >
                {/* Logo Section */}
                <Link href="/" className="relative flex items-center group pl-2 pr-8 border-r border-white/5 h-10">
                    {/* HUD Bracket */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative h-9 w-auto flex items-center justify-center overflow-hidden px-1">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics"
                            width={140}
                            height={32}
                            className="h-full w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                            priority
                        />
                    </div>

                    {/* Status Dot */}
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-white rounded-full blur-[2px]" />
                    </div>
                </Link>

                {/* Desktop Nav - Transitioning Center */}
                <div className="hidden lg:flex items-center gap-10 flex-1 justify-center px-4">
                    {!isShopPath ? (
                        <div className="flex items-center gap-8">
                            {companyLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.25em] transition-all relative group py-2"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-white rounded-full transition-all duration-500 group-hover:w-1 group-hover:h-1 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                </Link>
                            ))}
                            <div className="w-px h-4 bg-white/10 mx-2" />
                            <Link
                                href="/shop"
                                className="text-white/50 hover:text-white text-[10px] font-black uppercase tracking-[0.25em] transition-all py-1 px-3 rounded-md hover:bg-white/5"
                            >
                                Shop
                            </Link>
                        </div>
                    ) : (
                        isShopPath && !isSeller && (
                            <div className="flex items-center gap-6">
                                <Link
                                    href="/become-seller"
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all flex items-center gap-2 group relative py-2"
                                >
                                    <Store size={12} className="text-white/20 group-hover:text-white transition-colors" />
                                    Sell Architecture
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </div>
                        )
                    )}
                </div>

                {/* Right Side Options / CTAs */}
                <div className="hidden lg:flex items-center gap-4">
                    {/* Cart Icon - Contextual */}
                    {isShopPath && (
                        <div className="pr-4 border-r border-white/5 h-8 flex items-center">
                            <CartIcon />
                        </div>
                    )}

                    {/* Primary CTA Logic */}
                    {!isShopPath ? (
                        <Link href="/contact">
                            <button className="relative px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-500 flex items-center gap-2 shadow-[0_8px_24px_rgba(255,255,255,0.1)] active:scale-95 group/btn">
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                                </span>
                            </button>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            {session && <Web3WalletConnect />}

                            {session ? (
                                <div className="flex items-center gap-2">
                                    {session?.user?.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-2 group hidden xl:flex"
                                        >
                                            <LayoutDashboard size={14} className="group-hover:rotate-12 transition-transform opacity-40 group-hover:opacity-100" />
                                            Terminal
                                        </Link>
                                    )}
                                    {isSeller && session?.user?.role !== "admin" && (
                                        <Link
                                            href="/seller"
                                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-2 group hidden xl:flex"
                                        >
                                            <Store size={14} className="group-hover:rotate-12 transition-transform opacity-40 group-hover:opacity-100" />
                                            Seller Hub
                                        </Link>
                                    )}
                                    <button
                                        onClick={async () => {
                                            await authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
                                        }}
                                        className="px-6 py-3 bg-white/5 text-white/80 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-500"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/sign-in"
                                    className="px-8 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-500 flex items-center gap-2 shadow-[0_8px_24px_rgba(255,255,255,0.15)] active:scale-95"
                                >
                                    Login Access
                                    <ArrowRight size={12} className="transition-transform" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="lg:hidden flex items-center h-10">
                    {isShopPath && <div className="mr-3"><CartIcon /></div>}
                    <button
                        className="text-white p-3 hover:bg-white/10 rounded-full transition-colors active:scale-90"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Refined Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-24 left-6 right-6 p-8 rounded-[2.5rem] bg-transparent/95 backdrop-blur-3xl border border-white/10 lg:hidden flex flex-col gap-8 shadow-2xl"
                    >
                        <div className="flex flex-col gap-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 px-1">Systems Navigation</p>
                            {!isShopPath ? (
                                <div className="grid grid-cols-1 gap-2">
                                    {companyLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="text-4xl xs:text-5xl font-black text-white hover:italic hover:translate-x-2 transition-all duration-500 uppercase tracking-tighter py-1"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/shop"
                                        className="text-4xl xs:text-5xl font-black text-white hover:italic hover:translate-x-2 transition-all duration-500 uppercase tracking-tighter py-1"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Market
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-2">
                                    <Link
                                        href="/shop"
                                        className="text-4xl xs:text-5xl font-black text-white hover:italic hover:translate-x-2 transition-all duration-500 uppercase tracking-tighter py-1"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Marketplace
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 pt-8 border-t border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Matrix Access</p>
                            {session ? (
                                <>
                                    {session?.user?.role === "admin" && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center justify-between px-6 py-5 bg-white/5 rounded-2xl border border-white/10 group"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="font-black text-lg uppercase tracking-widest text-white">Open Terminal</span>
                                            <LayoutDashboard size={20} className="text-white group-hover:rotate-12 transition-transform" />
                                        </Link>
                                    )}
                                    {isSeller && session?.user?.role !== "admin" && (
                                        <Link
                                            href="/seller"
                                            className="flex items-center justify-between px-6 py-5 bg-white/5 rounded-2xl border border-white/10 group"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="font-black text-lg uppercase tracking-widest text-white">Seller Hub</span>
                                            <Store size={20} className="text-white group-hover:rotate-12 transition-transform" />
                                        </Link>
                                    )}
                                    <button
                                        onClick={async () => {
                                            await authClient.signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-between px-6 py-5 bg-red-500/10 rounded-2xl border border-red-500/20 group"
                                    >
                                        <span className="font-black text-lg uppercase tracking-widest text-red-500 group-hover:text-red-400 transition-colors">Terminate Session</span>
                                        <X size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/sign-in"
                                    className="flex items-center justify-between px-6 py-5 bg-white text-black rounded-2xl group shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="font-black text-lg uppercase tracking-widest text-black">Decrypt Login</span>
                                    <ArrowRight size={20} className="text-black group-hover:translate-x-2 transition-transform" />
                                </Link>
                            )}
                            {!isSeller && (
                                <Link
                                    href="/become-seller"
                                    className="flex items-center justify-between px-6 py-5 bg-white/5 rounded-2xl border border-white/10 group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="font-black text-lg uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Sell Architecture</span>
                                    <Store size={20} className="text-white/20 group-hover:text-white transition-all" />
                                </Link>
                            )}
                            {isShopPath && session && (
                                <div className="pt-4 mt-2 border-t border-white/5 mx-auto w-full">
                                    <Web3WalletConnect />
                                </div>
                            )}
                        </div>

                        {!isShopPath && (
                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl active:scale-95 transition-all text-sm">
                                    Initiate Deployment
                                </button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
