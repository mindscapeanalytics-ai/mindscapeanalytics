"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Plus, ChevronDown } from "lucide-react";
import CartIcon from "@/components/CartIcon";

const navLinks = [
    {
        name: "Shop",
        href: "/shop",
        submenu: [
            { name: "All Products", href: "/shop" },
            { name: "UI/UX Kits", href: "/shop?category=ui_ux" },
            { name: "SaaS Templates", href: "/shop?category=saas" },
            { name: "Automations", href: "/shop?category=automations" },
            { name: "Apps", href: "/shop?category=apps" },
            { name: "Management Systems", href: "/shop?category=management_systems" },
        ]
    },
    {
        name: "Seller",
        href: "/seller",
        submenu: [
            { name: "Dashboard", href: "/seller" },
            { name: "My Products", href: "/seller/products" },
            { name: "Add Product", href: "/seller/products/new" },
            { name: "Become a Seller", href: "/become-seller" },
        ]
    },
    {
        name: "Admin",
        href: "/admin",
        submenu: [
            { name: "Dashboard", href: "/admin" },
            { name: "Manage Products", href: "/admin/products" },
            { name: "View Orders", href: "/admin/orders" },
        ]
    },
    { name: "Solutions", href: "/#solutions" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                isScrolled ? "py-3" : "py-6"
            )}
        >
            <div
                className={cn(
                    "max-w-6xl mx-auto flex items-center justify-between px-5 py-2 rounded-full transition-all duration-500 border relative",
                    isScrolled
                        ? "bg-transparent/70 backdrop-blur-2xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                        : "bg-transparent/30 backdrop-blur-md border-white/5"
                )}
            >
                <Link href="/" className="relative flex items-center group pl-2 pr-6">
                    <div className="relative flex items-center gap-2 h-9 px-1">
                        <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics"
                            width={130}
                            height={30}
                            className="h-8 w-auto object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        />
                    </div>
                    <motion.div
                        className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 90, backgroundColor: "rgba(255,255,255,0.1)" }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Plus className="w-5 h-5 font-black text-white/80" />
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={link.href}
                                className="text-white/60 hover:text-white text-[0.8rem] font-bold uppercase tracking-[0.15em] transition-all relative py-2 flex items-center gap-1"
                            >
                                {link.name}
                                {link.submenu && <ChevronDown size={14} />}
                                <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                            </Link>

                            {/* Dropdown Menu */}
                            {link.submenu && activeDropdown === link.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 mt-2 w-56 bg-transparent/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                    {link.submenu.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center gap-4">
                    <CartIcon />
                    <Link href="/contact" className="group/btn">
                        <button className="btn-nav-cta">
                            Get Started
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-white"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden mt-4 bg-transparent/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="block text-white/80 hover:text-white font-bold py-2"
                                        onClick={() => !link.submenu && setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.submenu && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {link.submenu.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="block text-white/60 hover:text-white text-sm py-1"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 border-t border-white/10">
                                <CartIcon />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
