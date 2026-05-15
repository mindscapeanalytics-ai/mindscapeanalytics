"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Download, Share2, Terminal, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const initialArticles = [
    {
        id: 1,
        title: "Autonomous Real Estate: The 2026 Shift",
        date: "2026-05-14",
        niche: "Real Estate",
        readTime: "4 min",
        status: "PUBLISHED"
    },
    {
        id: 2,
        title: "Scaling Manufacturing with NIM-Edge Workflows",
        date: "2026-05-12",
        niche: "Industrial",
        readTime: "7 min",
        status: "PUBLISHED"
    },
    {
        id: 3,
        title: "The Death of Static CRM: Why Agents are the UI",
        date: "2026-05-10",
        niche: "Enterprise SaaS",
        readTime: "5 min",
        status: "ARCHIVED"
    }
];

export default function NeuralNewsroom() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [articles, setArticles] = useState(initialArticles);

    const generateArticle = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const newArticle = {
                id: Date.now(),
                title: "Neural Synergy: Cross-Domain Agent Coordination",
                date: new Date().toISOString().split('T')[0],
                niche: "AI Research",
                readTime: "6 min",
                status: "PUBLISHED"
            };
            setArticles([newArticle, ...articles]);
            setIsGenerating(false);
        }, 3000);
    };

    return (
        <section className="py-32 bg-transparent relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    
                    {/* Header Side */}
                    <div className="lg:w-1/3 sticky top-32">
                        <motion.span className="text-[10px] font-mono text-secondary tracking-[0.4em] font-black uppercase mb-4 block">
                            Autonomous_Content_Engine //
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]">
                            Neural <br />
                            <span className="text-foreground/40 italic">Newsroom.</span>
                        </h2>
                        <p className="text-lg text-white/40 font-medium mb-10">
                            Our agents monitor global market shifts in real-time to generate strategic intelligence for our clients. No writers. No delays. Just raw, autonomous foresight.
                        </p>
                        
                        <button
                            onClick={generateArticle}
                            disabled={isGenerating}
                            className={cn(
                                "group relative px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all overflow-hidden",
                                isGenerating ? "bg-zinc-900 text-white/20 cursor-wait" : "bg-white text-black hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                            )}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isGenerating ? "GENERATING_INSIGHT..." : "INITIALIZE_AUTOBOT_BLOG"}
                                <Sparkles size={16} className={isGenerating ? "animate-spin" : ""} />
                            </span>
                        </button>
                    </div>

                    {/* Feed Side */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {articles.map((article, i) => (
                                <motion.div
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-8 rounded-[2rem] border border-white/5 bg-zinc-950/40 backdrop-blur-xl group hover:border-secondary/20 transition-all flex flex-col justify-between min-h-[300px]"
                                >
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                                <span className="text-[8px] font-mono font-black text-secondary tracking-widest uppercase">{article.niche}</span>
                                            </div>
                                            <span className="text-[8px] font-mono text-white/20 uppercase">{article.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-secondary transition-colors">
                                            {article.title}
                                        </h3>
                                    </div>

                                    <div className="pt-8 flex items-center justify-between border-t border-white/5">
                                        <div className="flex items-center gap-4 text-white/30">
                                            <div className="flex items-center gap-1">
                                                <Terminal size={12} />
                                                <span className="text-[10px] font-mono uppercase">{article.readTime}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Cpu size={12} />
                                                <span className="text-[10px] font-mono uppercase">Agent_Gen</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all">
                                                <Share2 size={14} />
                                            </button>
                                            <button className="p-3 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
