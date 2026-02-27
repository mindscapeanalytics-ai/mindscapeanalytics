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
    Package, CreditCard, PieChart
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
    const isSeller = isSellerUser || userRole === "seller" || isAdmin;

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
                    { name: "Dynamic Analytics", href: "/solutions#dashboards" },
                    { name: "Data Engineering", href: "/solutions#data-engineering" },
                ]
            },
            {
                name: "Services",
                label: "Execution Services",
                href: "/services",
                submenu: [
                    { name: "Executive Outsourcing", href: "/outsourcing" },
                    { name: "Strategic Analytics", href: "/services#analytics" },
                    { name: "Data Engineering", href: "/services#engineering" },
                    { name: "Custom Development", href: "/services#development" },
                    { name: "System Audits", href: "/services#audits" },
                ]
            },
            { name: "Registry", label: "Asset Registry", href: "/shop", prefetch: true },
            { name: "Insights", label: "Market Insights", href: "/blog" },
            { name: "Institutional", label: "Institutional Profile", href: "/about" },
        ];

        const shopLinks: NavLink[] = [
            { name: "All Assets", label: "Full Registry", href: "/shop" },
            {
                name: "Categories",
                label: "Asset Categories",
                href: "/shop",
                submenu: [
                    { name: "AI Models", href: "/shop?category=AI Models" },
                    { name: "Datasets", href: "/shop?category=Datasets" },
                    { name: "SaaS Apps", href: "/shop?category=SaaS" },
                    { name: "Workflow Kits", href: "/shop?category=Workflows" },
                ]
            },
            { name: "My Assets", label: "My Acquisitions", href: "/shop/orders" },
            { name: "Corporate Hub", label: "Return to Site", href: "/", icon: <Globe size={12} /> },
        ];

        const sellerLinks: NavLink[] = [
            { name: "Dashboard", label: "Operational Overview", href: "/seller", icon: <BarChart3 size={12} /> },
            { name: "Inventory", label: "Asset Management", href: "/seller/products", icon: <Package size={12} /> },
            { name: "Payments", label: "Revenue Vault", href: "/seller/payments", icon: <CreditCard size={12} /> },
            { name: "Analytics", label: "Growth Data", href: "/seller/analytics", icon: <PieChart size={12} /> },
            { name: "Exit Terminal", label: "Return to Site", href: "/", icon: <ArrowLeft size={12} /> },
        ];

        const adminLinks: NavLink[] = [
            { name: "Console", label: "Master Dashboard", href: "/admin", icon: <ShieldCheck size={12} /> },
            { name: "Assets", label: "Global Registry", href: "/admin/products", icon: <Layers size={12} /> },
            { name: "Users", label: "Identity Registry", href: "/admin/users", icon: <User size={12} /> },
            { name: "Revenue", label: "Global Payouts", href: "/admin/payouts", icon: <Activity size={12} /> },
            { name: "Exit Console", label: "Return to Site", href: "/", icon: <ArrowLeft size={12} /> },
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
            case "admin": return { label: "CONSOLE", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" };
            case "seller": return { label: "TERMINAL", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" };
            case "shop": return { label: "REGISTRY", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
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
                {/* Logo & Context Badge */}
                <div className="relative flex items-center group pl-2 pr-6 border-r border-white/5 h-10 gap-3">
                    <Link href="/" aria-label="Mindscape Analytics Home" className="relative flex items-center h-full">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics Logo"
                            width={110}
                            height={24}
                            className="h-6 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-500"
                        />
                    </Link>
                    {contextTheme && (
                        <div className={cn("px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border", contextTheme.color, contextTheme.bg, contextTheme.border)}>
                            {contextTheme.label}
                        </div>
                    )}
                </div>

                {/* Primary Nav Links (Tailored for Context) */}
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
                                aria-label={link.label}
                                className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-3 flex items-center gap-1.5 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                            >
                                {link.icon && <span className="opacity-40">{link.icon}</span>}
                                {link.name}
                                {link.submenu && <ChevronDown size={10} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                                <span className="absolute bottom-1.5 left-0 w-0 h-[1px] bg-white/40 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            <AnimatePresence>
                                {link.submenu && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.8)] overflow-hidden py-3 z-[110]"
                                    >
                                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:20px_20px] opacity-[0.03] pointer-events-none" />
                                        {link.submenu.map((item: any) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-6 py-3 text-white/30 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em] relative group/item"
                                            >
                                                <div className="flex items-center gap-3 relative z-10">
                                                    {item.icon && <span className="opacity-30 group-hover/item:opacity-100 group-hover/item:text-white transition-all">{item.icon}</span>}
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white group-hover/item:h-4 transition-all duration-300" />
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Profile & Utilities Hub */}
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
                                {isAdmin ? <ShieldCheck className="w-3 h-3 text-emerald-400/50" /> : isSeller ? <Zap className="w-3 h-3 text-amber-400/50" /> : null}
                            </button>

                            <AnimatePresence>
                                {activeDropdown === "profile" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className="absolute top-full right-0 mt-2 w-64 bg-zinc-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
                                    >
                                        <div className="px-6 py-4 border-b border-white/5 mb-2">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Identity Confirmed</p>
                                            <p className="text-[11px] font-bold text-white/80 truncate">{session.user.name}</p>
                                            <p className="text-[8px] font-black text-white/20 uppercase tracking-widest truncate mt-1">{session.user.email}</p>
                                        </div>

                                        {isAdmin && (
                                            <div className="pb-1">
                                                <p className="px-6 py-2 text-[8px] font-black text-emerald-400/40 uppercase tracking-widest flex items-center gap-2">
                                                    <ShieldCheck size={8} /> Controller HUD
                                                </p>
                                                <Link href="/admin" className="flex items-center gap-3 px-6 py-2 text-white/80 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                                                    Master Console
                                                </Link>
                                            </div>
                                        )}

                                        {isSeller ? (
                                            <div className="pb-1 border-t border-white/5 pt-1">
                                                <p className="px-6 py-2 text-[8px] font-black text-amber-400/40 uppercase tracking-widest flex items-center gap-2">
                                                    <BarChart3 size={8} /> Professional Terminal
                                                </p>
                                                <Link href="/seller" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                    Seller Dashboard
                                                </Link>
                                                <Link href="/seller/products" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                    Registry Management
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="pb-1 border-t border-white/5 pt-1">
                                                <p className="px-6 py-2 text-[8px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                                                    <Rocket size={8} /> Network Upgrade
                                                </p>
                                                <Link href="/become-seller" className="flex items-center gap-3 px-6 py-3 bg-white/5 mx-2 rounded-xl text-white hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                    <Rocket size={12} className="text-amber-400" /> Become a Seller
                                                </Link>
                                            </div>
                                        )}

                                        <div className="py-1 border-t border-white/5">
                                            <p className="px-6 py-2 text-[8px] font-black text-white/20 uppercase tracking-widest">Personal Interface</p>
                                            <Link href="/settings" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                Account Control
                                            </Link>
                                            <Link href="/shop/orders" className="flex items-center gap-3 px-6 py-2 text-white/60 hover:text-white hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em]">
                                                Asset Acquisitions
                                            </Link>
                                        </div>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-6 py-3 mt-1 border-t border-white/5 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all text-[9px] font-black uppercase tracking-[0.2em] group/logout"
                                        >
                                            <LogOut size={12} className="group-hover/logout:-translate-x-1 transition-transform" />
                                            Terminate Access
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 h-full">
                            <Link href="/sign-in" className="group/btn h-full flex items-center">
                                <button className="text-white/40 hover:text-white px-4 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all active:scale-95">
                                    Login
                                </button>
                            </Link>
                            <Link href="/sign-up" className="group/btn h-full flex items-center">
                                <button className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white/90 transition-all flex items-center gap-2 shadow-[0_4px_24px_rgba(255,255,255,0.15)] active:scale-95">
                                    Initialize
                                    <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle Handle */}
                <div className="lg:hidden flex items-center gap-3 pr-2">
                    <CartIcon />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white transition-all active:scale-90"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Context-Aware HUD */}
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
                                    <div className="flex items-center justify-between w-full">
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-3 text-white/40 hover:text-white font-black py-1 uppercase tracking-[0.3em] text-[10px] transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.icon ? link.icon : <span className="w-1.5 h-1.5 rounded-full bg-white/10" />}
                                            {link.name}
                                        </Link>
                                        {link.submenu && (
                                            <button
                                                onClick={() => setActiveMobileDropdown(activeMobileDropdown === link.name ? null : link.name)}
                                                className="p-2 text-white/20 hover:text-white transition-all"
                                            >
                                                <ChevronDown size={14} className={cn("transition-transform duration-300", activeMobileDropdown === link.name ? "rotate-180" : "rotate-0")} />
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {link.submenu && activeMobileDropdown === link.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden ml-5 grid grid-cols-1 gap-4 border-l border-white/5 pl-8"
                                            >
                                                <div className="py-2 space-y-4">
                                                    {link.submenu.map((item: any) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="flex items-center gap-3 text-white/20 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {item.icon && <span className="opacity-20">{item.icon}</span>}
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
                                                    Master Console
                                                    <ShieldCheck size={14} className="text-emerald-500" />
                                                </Link>
                                            )}
                                            {isSeller ? (
                                                <Link href="/seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white/5 border border-white/10 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 active:scale-95 transition-all">
                                                    Seller Dashboard
                                                    <BarChart3 size={14} className="text-amber-500" />
                                                </Link>
                                            ) : (
                                                <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-5 bg-white text-black rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all">
                                                    Become a Seller
                                                    <Rocket size={14} className="text-amber-500" />
                                                </Link>
                                            )}
                                            <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-4 bg-white/5 border border-white/10 text-white/60 rounded-[1.5rem] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white/10 active:scale-95 transition-all">
                                                Account Settings
                                                <Settings size={12} className="opacity-20" />
                                            </Link>
                                            <Link href="/shop/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between px-8 py-4 bg-white/5 border border-white/10 text-white/60 rounded-[1.5rem] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white/10 active:scale-95 transition-all">
                                                My Acquisitions
                                                <User size={12} className="opacity-20" />
                                            </Link>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center justify-center gap-3 py-5 text-red-500/50 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                        >
                                            <LogOut size={14} />
                                            Terminate Session
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                                <button className="w-full bg-white/5 border border-white/10 text-white/40 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] active:scale-95 transition-all flex items-center justify-center">
                                                    Access Hub
                                                </button>
                                            </Link>
                                            <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                                                <button className="w-full bg-white text-black py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                                                    Initialize
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
