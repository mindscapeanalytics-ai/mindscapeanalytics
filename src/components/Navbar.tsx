"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Plus, ChevronDown, User, LogOut, Settings, ShieldCheck, LayoutDashboard } from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const { data: session, isPending } = authClient.useSession();
    // Use explicit casting to ensure custom enterprise fields are recognized
    const userRole = (session?.user as any)?.role;
    const isSellerUser = (session?.user as any)?.isSeller;
    const router = useRouter();
    const pathname = usePathname();

    const isAdmin = userRole === "admin";
    const isSeller = isSellerUser || userRole === "seller" || userRole === "admin";

    // Detect if we are in a special secondary path
    const isShopPath = pathname?.startsWith("/shop") ||
        pathname?.startsWith("/seller") ||
        pathname?.startsWith("/admin");

    const navLinks = [
        {
            name: "Solutions",
            href: "/solutions",
            submenu: [
                { name: "AI & GenAI", href: "/solutions/ai-genai" },
                { name: "Blockchain & Ledger", href: "/solutions/blockchain" },
                { name: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure" },
                { name: "Enterprise Systems", href: "/solutions/enterprise-software" },
                { name: "Dynamic Analytics", href: "/solutions#dashboards" },
                { name: "Data Engineering", href: "/solutions#data-engineering" },
            ]
        },
        {
            name: "Services",
            href: "/services",
            submenu: [
                { name: "Executive Outsourcing", href: "/outsourcing" },
                { name: "Strategic Analytics", href: "/services#analytics" },
                { name: "Data Engineering", href: "/services#engineering" },
                { name: "Custom Development", href: "/services#development" },
                { name: "System Audits", href: "/services#audits" },
            ]
        },
        {
            name: "Marketplace",
            href: "/shop",
            prefetch: true
        },
        ...(isSeller ? [{
            name: "Architect Console",
            href: "/seller",
            submenu: [
                { name: "Asset Terminal", href: "/seller" },
                { name: "Operations Hub", href: "/seller/products" },
                { name: "Initialize Asset", href: "/seller/products/new" },
                { name: "Settlement Vault", href: "/seller/payments" },
            ]
        }] : []),
        { name: "Intelligence Hub", href: "/blog" },
        { name: "Institutional", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 flex flex-col items-center",
                isScrolled ? "pt-4" : "pt-8"
            )}
        >
            <div
                className={cn(
                    "w-fit min-w-[300px] xs:min-w-[320px] max-w-[calc(100vw-3rem)] flex items-center justify-between px-4 py-2 rounded-full transition-all duration-[800ms] border relative mx-auto overflow-hidden",
                    isScrolled
                        ? "bg-zinc-950/80 backdrop-blur-3xl backdrop-saturate-[1.8] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent/40 backdrop-blur-md backdrop-saturate-[1.2] border-white/5"
                )}
            >
                {/* HUD Scanning Line Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[25deg]"
                    />
                </div>
                <Link href="/" className="relative flex items-center group pl-2 pr-6 border-r border-white/5 h-10">
                    <div className="relative flex items-center gap-2 h-full">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics"
                            width={110}
                            height={24}
                            className="h-6 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-x-8 px-6 border-r border-white/5">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group flex items-center"
                            onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-3 flex items-center gap-1.5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                            >
                                {link.name}
                                {link.submenu && <ChevronDown size={10} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                                <span className="absolute bottom-1.5 left-0 w-0 h-[1px] bg-white/40 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            {/* Dropdown Menu - Professional HUD Style */}
                            <AnimatePresence>
                                {link.submenu && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.8)] overflow-hidden py-3 z-[110]"
                                    >
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:20px_20px] opacity-[0.03] pointer-events-none" />
                                        {link.submenu.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-6 py-3 text-white/30 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em] relative group/item"
                                            >
                                                <span className="relative z-10">{item.name}</span>
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white group-hover/item:h-4 transition-all duration-300" />
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Integration & Profile Hub */}
                <div className="hidden lg:flex items-center gap-4">
                    <CartIcon />

                    {session ? (
                        <div className="relative group/profile"
                            onMouseEnter={() => setActiveDropdown("profile")}
                            onMouseLeave={() => setActiveDropdown(null)}>
                            <button className="flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-black text-white/70 uppercase italic border border-white/20">
                                    {session.user.name?.charAt(0) || "U"}
                                </div>
                                <span className="text-[9px] font-black text-white/40 group-hover/profile:text-white/70 uppercase tracking-[0.2em] transition-colors">{session.user.name?.split(" ")[0]}</span>
                                {isAdmin && <ShieldCheck className="w-3 h-3 text-white/20" />}
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "profile" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="absolute top-full right-0 mt-2 w-56 bg-zinc-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
                                    >
                                        <div className="px-6 py-4 border-b border-white/5 mb-2">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Authenticated</p>
                                            <p className="text-[11px] font-bold text-white/80 truncate leading-none">{session.user.email}</p>
                                        </div>
                                        {isAdmin && (
                                            <Link href="/admin" className="flex items-center gap-3 px-6 py-3 text-white/80 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                <LayoutDashboard size={14} /> Admin Terminal
                                            </Link>
                                        )}
                                        {isSeller && (
                                            <>
                                                <Link href="/seller" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                    <LayoutDashboard size={12} /> Asset Terminal
                                                </Link>
                                                <Link href="/seller/products/new" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                    <Plus size={12} /> Deploy New Asset
                                                </Link>
                                            </>
                                        )}
                                        {!isSeller && session && (
                                            <Link href="/become-seller" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                <Plus size={12} /> Become Seller
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-6 py-3 mt-1 border-t border-white/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]"
                                        >
                                            <LogOut size={12} /> Terminate Access
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 h-full">
                            <Link href="/become-seller" className="group/btn-book h-full flex items-center hidden sm:flex">
                                <button className="px-5 py-2.5 rounded-full text-white/40 hover:text-white border border-white/5 hover:border-white/10 hover:bg-white/5 text-[9px] font-black uppercase tracking-[0.25em] transition-all flex items-center gap-2">
                                    Sell Here / Become Seller
                                </button>
                            </Link>
                            <Link href="/sign-in" className="group/btn h-full flex items-center">
                                <button className="text-white/40 hover:text-white px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
                                    Login
                                </button>
                            </Link>
                            <Link href="/sign-up" className="group/btn h-full flex items-center">
                                <button className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_4px_24px_rgba(255,255,255,0.15)] active:scale-95">
                                    Join Network
                                    <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle & Status */}
                <div className="lg:hidden flex items-center gap-3 pr-2">
                    <CartIcon />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white transition-all active:scale-90"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation HUD Extension */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
                        exit={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden w-fit min-w-[300px] xs:min-w-[320px] max-w-[calc(100vw-3rem)] mt-3 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative z-40 mx-auto"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:24px_24px] opacity-[0.03] pointer-events-none" />

                        <div className="p-6 xs:p-8 space-y-8 relative z-10">
                            {navLinks.map((link) => (
                                <div key={link.name} className="space-y-4">
                                    {link.submenu ? (
                                        <div className="flex items-center justify-between w-full">
                                            <Link
                                                href={link.href}
                                                className="flex items-center gap-3 text-white/40 hover:text-white font-black py-1 uppercase tracking-[0.3em] text-[10px] transition-all"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                                {link.name}
                                            </Link>
                                            <button
                                                onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                                                className="p-2 text-white/20 hover:text-white transition-all"
                                            >
                                                <ChevronDown size={14} className={cn("transition-transform duration-300", activeMobileDropdown === link.name ? "rotate-180" : "rotate-0")} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="inline-flex items-center gap-3 text-white/40 hover:text-white font-black py-1 uppercase tracking-[0.3em] text-[10px] transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                            {link.name}
                                        </Link>
                                    )}

                                    <AnimatePresence>
                                        {link.submenu && activeMobileDropdown === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden ml-5 grid grid-cols-1 gap-4 border-l border-white/5 pl-8"
                                            >
                                                <div className="py-2 space-y-4">
                                                    {link.submenu.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block text-white/20 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="pt-10 border-t border-white/5">
                                {session ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black text-white/70 italic border border-white/20">
                                                {session.user.name?.charAt(0) || "U"}
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-[11px] font-bold text-white/80 truncate leading-none mb-1">{session.user.name}</p>
                                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest truncate">{session.user.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {isAdmin && (
                                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="group flex items-center justify-between px-8 py-5 bg-white text-black rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-white/10 active:scale-95 transition-all">
                                                    Master Command
                                                    <ShieldCheck size={14} className="opacity-40" />
                                                </Link>
                                            )}
                                            {isSeller && (
                                                <Link href="/seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white/5 border border-white/10 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 active:scale-95 transition-all">
                                                    Asset Terminal
                                                    <LayoutDashboard size={14} className="opacity-20" />
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center justify-center gap-3 py-5 text-red-400/50 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                            >
                                                <LogOut size={14} />
                                                Terminate Session
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full bg-white/5 border border-white/5 text-white/60 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all flex items-center justify-center">
                                                Sell Here / Become Seller
                                            </button>
                                        </Link>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                                <button className="w-full bg-white/5 border border-white/10 text-white/40 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all flex items-center justify-center">
                                                    Login
                                                </button>
                                            </Link>
                                            <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                                                <button className="w-full bg-white text-black py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                                                    Register
                                                    <ArrowRight size={10} />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
