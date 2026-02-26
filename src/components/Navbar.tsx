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
                { name: "Blockchain", href: "/solutions/blockchain" },
                { name: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure" },
                { name: "Enterprise Software", href: "/solutions/enterprise-software" },
                { name: "Dynamic Dashboards", href: "/solutions#dashboards" },
                { name: "Data Engineering", href: "/solutions#data-engineering" },
            ]
        },
        {
            name: "Services",
            href: "/services",
            submenu: [
                { name: "Professional Outsourcing", href: "/outsourcing" },
                { name: "Strategic Analytics", href: "/services#analytics" },
                { name: "Data Engineering", href: "/services#engineering" },
                { name: "Dynamic Dashboards", href: "/services#dashboards" },
                { name: "Custom Development", href: "/services#development" },
            ]
        },
        {
            name: "Marketplace",
            href: "/shop",
            submenu: [
                { name: "All Digital Assets", href: "/shop" },
                { name: "SaaS Templates", href: "/shop?category=saas" },
                { name: "UX/UI Design Kits", href: "/shop?category=ui_ux" },
                { name: "Neural Automations", href: "/shop?category=automations" },
            ]
        },
        ...(isSeller ? [{
            name: "Architect Console",
            href: "/seller",
            submenu: [
                { name: "Vendor Dashboard", href: "/seller" },
                { name: "Management Ops", href: "/seller/products" },
                { name: "Initialize Asset", href: "/seller/products/new" },
                { name: "Settlement Hub", href: "/seller/payments" },
            ]
        }] : []),
        { name: "Intelligence Hub", href: "/blog" },
        { name: "About", href: "/about" },
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 flex justify-center",
                isScrolled ? "py-3" : "py-6"
            )}
        >
            <div
                className={cn(
                    "w-fit min-w-[320px] max-w-[95vw] flex items-center justify-between gap-8 px-6 py-2 rounded-full transition-all duration-[800ms] border relative",
                    isScrolled
                        ? "bg-zinc-950/80 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-transparent/40 backdrop-blur-md border-white/5"
                )}
            >
                <Link href="/" className="relative flex items-center group pl-2 pr-4 border-r border-white/5">
                    <div className="relative flex items-center gap-2 h-9 px-1">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics"
                            width={120}
                            height={28}
                            className="h-7 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
                                className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.15em] transition-all relative py-3 flex items-center gap-1 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                            >
                                {link.name}
                                {link.submenu && <ChevronDown size={10} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                                <span className="absolute bottom-1.5 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
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
                            <button className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-zinc-900 transition-all">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[9px] font-black text-white uppercase italic">
                                    {session.user.name?.charAt(0) || "U"}
                                </div>
                                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.15em]">{session.user.name?.split(" ")[0]}</span>
                                {isAdmin && <ShieldCheck className="w-3 h-3 text-blue-400" />}
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
                                            <Link href="/admin" className="flex items-center gap-3 px-6 py-3 text-blue-400 hover:bg-blue-500/10 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
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
                        <Link href="/sign-in" className="group/btn">
                            <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-2">
                                Register
                                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden mt-4 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-8 space-y-6">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="block text-white/60 hover:text-white font-black py-2 uppercase tracking-[0.2em] text-[11px]"
                                        onClick={() => !link.submenu && setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.submenu && (
                                        <div className="ml-4 mt-2 space-y-3 border-l border-white/5 pl-6">
                                            {link.submenu.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="block text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                                <CartIcon />

                                {session ? (
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="mb-6">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Identity Decentralized</p>
                                            <p className="text-[11px] font-bold text-white/70">{session.user.email}</p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            {isAdmin && (
                                                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-lg shadow-blue-500/20 mb-2">
                                                    Master Command
                                                </Link>
                                            )}
                                            {isSeller && (
                                                <div className="flex flex-col gap-2 mb-2">
                                                    <Link href="/seller" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center border border-white/10">
                                                        Asset Terminal
                                                    </Link>
                                                    <Link href="/seller/products/new" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-white/5 text-white/60 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center border border-white/5">
                                                        Deploy New Asset
                                                    </Link>
                                                </div>
                                            )}
                                            {!isSeller && session && (
                                                <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center border border-white/10 mb-2">
                                                    Become Seller
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleSignOut}
                                                className="px-6 py-4 bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em]">Initialize Access</button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
