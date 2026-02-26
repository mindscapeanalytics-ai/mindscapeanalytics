"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, Linkedin, Github, Mail, MessageSquare, Phone, MapPin } from "lucide-react";

const platformLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Pricing", href: "/pricing" },
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
];

const socialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/company/mindscapeanalytics", label: "LinkedIn" },
    { Icon: MessageSquare, href: "https://wa.me/13072106155", label: "WhatsApp" },
    { Icon: Github, href: "https://github.com/mindscapeai", label: "GitHub" },
    { Icon: Mail, href: "mailto:contact@mindscapeanalytics.com", label: "Email" }
];

export default function Footer() {
    return (
        <footer className="relative bg-transparent border-t border-white/5 pt-24 pb-0 overflow-hidden">
            {/* Shimmering Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

            <div className="container-standard relative z-20 pb-40 lg:pb-64">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <Link href="/" className="inline-block group relative w-fit">
                            {/* HUD Bracket */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <Image
                                src="/images/logo/mindscape-analytics.png"
                                alt="Mindscape Analytics"
                                width={240}
                                height={56}
                                className="h-14 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-500"
                            />
                        </Link>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)] animate-pulse" />
                                <span className="text-xs font-black text-white uppercase tracking-[0.5em] italic opacity-90">Core // NODE_v4.02</span>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-medium tracking-tight">
                                Architecting state-of-the-art AI automation and software solutions for the next generation of global enterprises.
                            </p>

                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                                    <MapPin size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase flex items-center gap-2 font-bold">
                                        Sheridan, WY, USA 🇺🇸
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                                    <Mail size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase font-bold">info@mindscapeanalytics.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                                    <Phone size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase font-bold">+1 307 210 6155</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Platform Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-8"
                    >
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] opacity-50 border-l-2 border-white/20 pl-4">Platform // Directory</h4>
                        <ul className="space-y-4">
                            {platformLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-white/70 hover:text-white transition-all text-sm font-bold flex items-center group"
                                    >
                                        <span className="w-0 h-px bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] opacity-50 border-l-2 border-white/20 pl-4">Company // Access</h4>
                        <ul className="space-y-4">
                            {companyLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-white/70 hover:text-white transition-all text-sm font-bold flex items-center group"
                                    >
                                        <span className="w-0 h-px bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/legal/seller"
                                    className="text-white/70 hover:text-white transition-all text-sm font-bold flex items-center group"
                                >
                                    <span className="w-0 h-px bg-white group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                    Seller Policy
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter & Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] opacity-50 border-l-2 border-white/20 pl-4">Terminal // Sync</h4>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const email = (e.target as any).email.value;
                                if (!email) return;
                                try {
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: 'Newsletter Subscriber',
                                            email: email,
                                            service: 'Newsletter',
                                            message: 'New newsletter subscription request.'
                                        })
                                    });
                                    if (res.ok) {
                                        alert('Subscription protocol initiated.');
                                        (e.target as any).reset();
                                    }
                                } catch (err) {
                                    console.error('Newsletter error:', err);
                                }
                            }}
                            className="relative group"
                        >
                            <input
                                name="email"
                                type="email"
                                placeholder="IDENTIFY EMAIL"
                                className="w-full h-14 bg-transparent border border-white/10 rounded-xl px-6 text-base md:text-xs text-white placeholder:text-white/30 font-black tracking-widest focus:outline-none focus:border-white/40 transition-all uppercase font-mono shadow-[inset_0_0_20px_rgba(0,0,0,1)]"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 h-10 w-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-white/90 transition-all shadow-xl active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        <div className="flex gap-4">
                            {socialLinks.map(({ Icon, href, label }, i) => (
                                <motion.a
                                    key={i}
                                    href={href}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all border border-white/10 shadow-lg"
                                    title={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Massive Metallic Shimmer Background Text */}
            <div className="absolute inset-x-0 bottom-16 pointer-events-none select-none flex items-end justify-center z-0 overflow-hidden opacity-70 h-[60%] lg:h-[80%]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full flex justify-center"
                >
                    <h2
                        className="w-full text-center font-black font-syncopate tracking-[-0.05em] leading-[0.75] text-transparent bg-clip-text flex flex-col pointer-events-none whitespace-nowrap"
                        style={{
                            fontSize: "clamp(3rem, 15vw, 25rem)",
                            backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)",
                        }}
                    >
                        <span>MINDSCAPE</span>
                        <span>ANALYTICS</span>
                    </h2>
                </motion.div>
            </div>

            {/* Final Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 z-30 w-full border-t border-white/5 bg-black/40 backdrop-blur-xl">
                <div className="container-standard py-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-[9px] font-mono font-black tracking-[0.3em] uppercase text-center md:text-left">
                        © 2025 // MINDSCAPE ANALYTICS LLC. <span className="hidden md:inline">FOUNDED 2025. ALL RIGHTS RESERVED.</span>
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8">
                        <span className="text-white/30 text-[7px] md:text-[8px] font-black tracking-[0.4em] uppercase flex items-center gap-2 group hover:text-white transition-colors cursor-default">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                            System Active
                        </span>
                        <span className="text-white/30 text-[7px] md:text-[8px] font-black tracking-[0.4em] uppercase flex items-center gap-2 group hover:text-white transition-colors cursor-default">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
                            Grade-A Security
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
