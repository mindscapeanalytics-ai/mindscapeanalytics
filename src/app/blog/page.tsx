"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
    Calendar,
    User,
    ChevronRight,
    Cpu,
    Zap,
    Database,
    Brain,
    Clock,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import CinematicBackground from "@/components/CinematicBackground";

const BLOG_POSTS = [
    {
        title: "The Agentic Shift: Why 2026 is the Year of Autonomous Operations",
        excerpt: "Moving beyond simple chatbots. How distributed AI agents are taking over complex enterprise workflows and decision-making.",
        date: "Feb 24, 2026",
        author: "Dr. Aris Thorne",
        category: "Artificial Intelligence",
        readTime: "8 min",
        icon: Brain,
        accent: "text-blue-400"
    },
    {
        title: "Quantum Data Engineering: Architecting for the Next Computational Leap",
        excerpt: "Preparing your data pipelines for quantum-ready encryption and processing speeds. What every CTO needs to know today.",
        date: "Feb 20, 2026",
        author: "Sarah Jenkins",
        category: "Data Engineering",
        readTime: "12 min",
        icon: Database,
        accent: "text-purple-400"
    },
    {
        title: "Neural UI: The End of Traditional Navigation as We Know It",
        excerpt: "Context-aware interfaces that predict user intent before the first click. Exploring the 2026 design standards.",
        date: "Feb 15, 2026",
        author: "Marcus Vane",
        category: "User Experience",
        readTime: "6 min",
        icon: Cpu,
        accent: "text-green-400"
    },
    {
        title: "Global Liquidity Protocols: Web3 Payouts and the Future of Work",
        excerpt: "Ensuring near-instant, compliant settlements for global workforces using distributed ledger technologies.",
        date: "Feb 10, 2026",
        author: "Elena Rossi",
        category: "Web3 / Finance",
        readTime: "10 min",
        icon: Zap,
        accent: "text-orange-400"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-monochrome-cinematic text-white relative">
            <CinematicBackground />
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-20">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8"
                            >
                                <Zap size={12} className="text-yellow-400" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Intelligence_Stream // v2026</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic"
                            >
                                INTEL <span className="text-white/20 not-italic">HUB.</span>
                            </motion.h1>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] italic max-w-sm leading-loose"
                        >
                            Proprietary insights and technical forecasts for the 2026 industrial digital landscape.
                        </motion.p>
                    </div>

                    {/* Blog Feed */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                        {BLOG_POSTS.map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-700"
                            >
                                <div className="p-10 md:p-14">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className={`p-4 bg-white/5 rounded-2xl ${post.accent} group-hover:bg-white group-hover:text-black transition-all duration-500`}>
                                            <post.icon size={24} />
                                        </div>
                                        <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-white/20">
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/80">{post.category}</span>
                                    </div>

                                    <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-tight italic group-hover:translate-x-2 transition-transform duration-500">
                                        {post.title}
                                    </h2>

                                    <p className="text-white/40 text-sm font-medium leading-loose italic mb-10">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-10 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black italic border border-white/10 text-white/40">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">{post.author}</span>
                                        </div>
                                        <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:gap-4 transition-all">
                                            Execute Read <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.article>
                        ))}
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
                        <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic">Stay Ahead of the <span className="text-white/20 not-italic">Incline.</span></h2>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-12 italic">Join 50,000+ architects receiving weekly industrial intelligence.</p>

                        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="IDENT_EMAIL@SECURE.HOST"
                                className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-8 py-5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all"
                            />
                            <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-3 group">
                                Subscribe
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
