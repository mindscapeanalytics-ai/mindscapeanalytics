"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Menu, X, ArrowRight, Plus, ChevronDown, User, LogOut, Settings,
    ShieldCheck, LayoutDashboard, Database, Zap, Activity, Rocket,
    TrendingUp, BarChart3, ShoppingBag, Globe, ArrowLeft, Layers,
    Package, CreditCard, PieChart, ShoppingCart, Info, Mail
} from "lucide-react";
import CartIcon from "@/components/CartIcon";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

interface NavSubLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
}

interface NavLink {
    name: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
    prefetch?: boolean;
    submenu?: NavSubLink[];
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const { data: session, isPending } = authClient.useSession();

    const userRole = (session?.user as any)?.role;
    const isSellerUser = (session?.user as any)?.isSeller;
    const router = useRouter();
    const pathname = usePathname();

    const isAdmin = userRole === "admin" || userRole === "super_admin";
    const isRegisteredSeller = isSellerUser || userRole === "seller" || isAdmin;

    // Intelligence: Context Detection
    const navContext = useMemo(() => {
        if (pathname.startsWith("/admin")) return "admin";
        if (pathname.startsWith("/seller") || pathname.startsWith("/become-seller")) return "seller";
        if (pathname.startsWith("/shop") || pathname.startsWith("/cart") || pathname.startsWith("/checkout") || pathname.startsWith("/product")) return "shop";
        return "site";
    }, [pathname]);

    // Intelligence: Dynamic Link Sets
    const navLinks: NavLink[] = useMemo(() => {
        const siteLinks: NavLink[] = [
            {
                name: "Solutions",
                label: "AI & Data Solutions",
                href: "/solutions",
                submenu: [
                    { name: "AI & GenAI", href: "/solutions/ai-genai" },
                    { name: "Blockchain & Ledger", href: "/solutions/blockchain" },
                    { name: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure" },
                    { name: "Enterprise Systems", href: "/solutions/enterprise-software" },
                ]
            },
            {
                name: "Services",
                label: "Execution Services",
                href: "/services",
                submenu: [
                    { name: "Strategic Analytics", href: "/services#analytics" },
                    { name: "Data Engineering", href: "/services#engineering" },
                    { name: "Custom Development", href: "/services#development" },
                ]
            },
            { name: "Shop", label: "AI Asset Shop", href: "/shop", prefetch: true },
            { name: "Insights", label: "Market Insights", href: "/blog" },
            { name: "About", label: "Institutional Profile", href: "/about" },
        ];

        const shopLinks: NavLink[] = [
            { name: "All Assets", label: "Full Shop Inventory", href: "/shop" },
            {
                name: "Categories",
                label: "Shop Categories",
                href: "/shop",
                submenu: [
                    { name: "AI Models", href: "/shop?category=AI Models" },
                    { name: "Datasets", href: "/shop?category=Datasets" },
                    { name: "SaaS Apps", href: "/shop?category=SaaS" },
                ]
            },
            { name: "Cart", label: "Checkout Process", href: "/cart", icon: <ShoppingCart size={12} /> },
            { name: "Corporate", label: "Return to Main Site", href: "/", icon: <Globe size={12} /> },
        ];

        const sellerLinks: NavLink[] = [
            { name: "Dashboard", label: "Seller Stats", href: "/seller", icon: <BarChart3 size={12} /> },
            { name: "Inventory", label: "Manage Products", href: "/seller/products", icon: <Package size={12} /> },
            { name: "Payments", label: "Revenue Tracking", href: "/seller/payments", icon: <CreditCard size={12} /> },
            { name: "Exit", label: "Return to Site", href: "/", icon: <ArrowLeft size={12} /> },
        ];

        const adminLinks: NavLink[] = [
            { name: "Console", label: "Admin HUD", href: "/admin", icon: <ShieldCheck size={12} /> },
            { name: "Assets", label: "Global Inventory", href: "/admin/products", icon: <Layers size={12} /> },
            { name: "Orders", label: "Customer Orders", href: "/admin/orders", icon: <ShoppingCart size={12} /> },
            { name: "Revenue", label: "Platform Payouts", href: "/admin/payments", icon: <Activity size={12} /> },
            { name: "Exit", label: "Return to Site", href: "/", icon: <ArrowLeft size={12} /> },
        ];

        switch (navContext) {
            case "shop": return shopLinks;
            case "seller": return sellerLinks;
            case "admin": return adminLinks;
            default: return siteLinks;
        }
    }, [navContext]);

    const contextTheme = useMemo(() => {
        switch (navContext) {
            case "admin": return { label: "ADMIN CONSOLE", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" };
            case "seller": return { label: "SELLER TERMINAL", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" };
            case "shop": return { label: "AI ASSET SHOP", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
            default: return null;
        }
    }, [navContext]);

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
            aria-label="Primary Navigation"
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 flex flex-col items-center",
                isScrolled ? "pt-4" : "pt-8"
            )}
        >
            <div
                className={cn(
                    "w-full max-w-7xl flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-[600ms] border relative overflow-hidden",
                    isScrolled
                        ? "bg-zinc-950/80 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent border-transparent"
                )}
            >
                {/* Logo & Context Badge */}
                <div className="flex items-center gap-4">
                    <Link href="/" aria-label="Mindscape Analytics Home" className="flex items-center group transition-transform hover:scale-105 active:scale-95">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics Logo"
                            width={120}
                            height={26}
                            className="h-6 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500"
                        />
                    </Link>
                    {contextTheme && (
                        <div className={cn("hidden xs:flex px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.2em] border self-center", contextTheme.color, contextTheme.bg, contextTheme.border)}>
                            {contextTheme.label}
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-x-10">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group flex items-center h-full"
                            onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                aria-label={link.label}
                                className="text-white/40 hover:text-white text-[11px] font-black uppercase tracking-[0.25em] transition-all relative py-4 flex items-center gap-2 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                            >
                                {link.icon && <span className="opacity-40 group-hover:opacity-100 transition-opacity">{link.icon}</span>}
                                {link.name}
                                {link.submenu && <ChevronDown size={10} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                                <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-white/40 transition-all duration-[400ms] group-hover:w-full" />
                            </Link>

                            <AnimatePresence>
                                {link.submenu && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-zinc-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.9)] overflow-hidden py-4 z-[100]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                                        <div className="relative px-6 py-2 mb-2 border-b border-white/5">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{link.label}</p>
                                        </div>
                                        {link.submenu.map((item: any) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-8 py-3 text-white/40 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] relative group/item"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {item.icon && <span className="opacity-30 group-hover/item:opacity-100 transition-all">{item.icon}</span>}
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white scale-0 group-hover/item:scale-100 transition-transform duration-300" />
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Right Utilities & Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center h-full">
                        <CartIcon />
                    </div>

                    {session ? (
                        <div className="relative group/profile"
                            onMouseEnter={() => setActiveDropdown("profile")}
                            onMouseLeave={() => setActiveDropdown(null)}>
                            <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-lg">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center text-[10px] font-black text-white/90 uppercase italic border border-white/20">
                                    {session.user.name?.charAt(0) || "U"}
                                </div>
                                <span className="hidden sm:inline text-[10px] font-black text-white/50 group-hover/profile:text-white uppercase tracking-[0.2em] transition-colors">
                                    {session.user.name?.split(" ")[0]}
                                </span>
                                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/60" /> : isRegisteredSeller ? <Zap className="w-3.5 h-3.5 text-amber-400/60" /> : <ChevronDown className="w-3 h-3 opacity-20" />}
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "profile" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-3 w-72 bg-zinc-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,1)] overflow-hidden py-3"
                                    >
                                        <div className="px-6 py-4 border-b border-white/5 mb-3">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1.5 flex items-center gap-2">
                                                <User size={10} /> Authenticated Access
                                            </p>
                                            <p className="text-[12px] font-bold text-white/90 truncate">{session.user.name}</p>
                                            <p className="text-[9px] font-medium text-white/30 truncate mt-1">{session.user.email}</p>
                                        </div>

                                        {isAdmin && (
                                            <div className="pb-2">
                                                <p className="px-6 py-2 text-[9px] font-black text-emerald-400/50 uppercase tracking-[0.25em] flex items-center gap-3">
                                                    <ShieldCheck size={12} /> Controller HUD
                                                </p>
                                                <Link href="/admin" className="flex items-center gap-3 px-8 py-3 text-white/70 hover:text-white hover:bg-emerald-400/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                    Master Dashboard
                                                </Link>
                                            </div>
                                        )}

                                        {isRegisteredSeller ? (
                                            <div className="pb-2 border-t border-white/5 pt-2">
                                                <p className="px-6 py-2 text-[9px] font-black text-amber-400/50 uppercase tracking-[0.25em] flex items-center gap-3">
                                                    <BarChart3 size={12} /> Builder Operations
                                                </p>
                                                <Link href="/seller" className="flex items-center gap-3 px-8 py-3 text-white/70 hover:text-white hover:bg-amber-400/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                    Seller Dashboard
                                                </Link>
                                                <Link href="/seller/products" className="flex items-center gap-3 px-8 py-3 text-white/70 hover:text-white hover:bg-amber-400/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                    Inventory Control
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="pb-2 border-t border-white/5 pt-2">
                                                <p className="px-6 py-2 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <Rocket size={12} /> Network Expansion
                                                </p>
                                                <Link href="/become-seller" className="mx-4 mt-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/10 rounded-xl text-white hover:from-white hover:to-white hover:text-black transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                                                    <Zap size={14} className="text-amber-400 group-hover:text-black" /> Join as Seller
                                                </Link>
                                            </div>
                                        )}

                                        <div className="py-2 border-t border-white/5">
                                            <p className="px-6 py-2 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Personal Access</p>
                                            <Link href="/admin/settings" className="flex items-center gap-4 px-8 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                <Settings size={12} /> Account Config
                                            </Link>
                                            <Link href={isAdmin ? "/admin/orders" : "/shop"} className="flex items-center gap-4 px-8 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                <Package size={12} /> Acquisitions
                                            </Link>
                                        </div>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-4 px-8 py-4 mt-2 border-t border-white/10 text-red-400 hover:text-red-500 hover:bg-red-400/5 transition-all text-[10px] font-black uppercase tracking-[0.25em] group/logout"
                                        >
                                            <LogOut size={14} className="group-hover/logout:-translate-x-1 transition-transform" />
                                            Logout / Terminate Access
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/sign-in" className="hidden sm:inline-block">
                                <button className="text-white/40 hover:text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/5">
                                    Login
                                </button>
                            </Link>
                            <Link href="/sign-up">
                                <button className="bg-white text-black px-7 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] hover:bg-white/90 transition-all flex items-center gap-3 shadow-[0_4px_32px_rgba(255,255,255,0.2)] active:scale-95 group/init">
                                    Initialize
                                    <ArrowRight size={12} className="group-hover/init:translate-x-1.5 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Navigation HUD"
                        className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-2xl text-white/50 hover:text-white transition-all active:scale-90 shadow-inner"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation HUD */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="lg:hidden w-full max-w-sm mt-4 bg-zinc-950/98 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.9)] relative"
                    >
                        <div className="p-8 space-y-10 relative z-10">
                            {navLinks.map((link) => (
                                <div key={link.name} className="space-y-6">
                                    <div className="flex items-center justify-between group">
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-4 text-white/60 hover:text-white font-black py-1 uppercase tracking-[0.35em] text-[11px] transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.icon || <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-white transition-colors" />}
                                            {link.name}
                                        </Link>
                                        {link.submenu && (
                                            <button
                                                onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                                                className="p-3 text-white/20 hover:text-white transition-all bg-white/5 rounded-xl border border-white/5 shadow-sm"
                                            >
                                                <ChevronDown size={14} className={cn("transition-transform duration-500", activeMobileDropdown === link.name ? "rotate-180" : "rotate-0")} />
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {link.submenu && activeMobileDropdown === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden ml-6 space-y-5 border-l-2 border-white/10 pl-8 mt-4"
                                            >
                                                {link.submenu.map((item: any) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center gap-4 text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.25em] transition-all"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            <div className="pt-12 border-t border-white/10">
                                {session ? (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-5 px-6 py-5 bg-white/5 border border-white/5 rounded-3xl">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-[12px] font-black text-white italic border border-white/10">
                                                {session.user.name?.charAt(0) || "U"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[12px] font-bold text-white/90 truncate leading-none mb-1.5 uppercase tracking-tight">{session.user.name}</p>
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.1em] truncate">{session.user.email}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3.5">
                                            {isAdmin && (
                                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white text-black rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-white/5 transition-all active:scale-95">
                                                    Master Dashboard
                                                    <ShieldCheck size={16} />
                                                </Link>
                                            )}
                                            {isRegisteredSeller ? (
                                                <Link href="/seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white/5 border border-white/10 text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95">
                                                    Seller Dashboard
                                                    <BarChart3 size={16} className="text-amber-500" />
                                                </Link>
                                            ) : (
                                                <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white text-black rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95">
                                                    Join Global Network
                                                    <Rocket size={16} className="text-amber-500" />
                                                </Link>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center justify-center gap-4 py-6 border-t border-white/10 text-red-400/60 hover:text-red-400 text-[11px] font-black uppercase tracking-[0.3em] transition-all"
                                        >
                                            <LogOut size={16} />
                                            Logout / Terminate Session
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full bg-white text-black py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-3">
                                                Initialize Site Access
                                                <ArrowRight size={14} />
                                            </button>
                                        </Link>
                                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full bg-white/5 border border-white/10 text-white/40 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white/10">
                                                Access Hub
                                            </button>
                                        </Link>
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
