"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, MessageSquare, Plus, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PersistentHUD() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-[88px] md:bottom-[96px] right-6 z-[9995] pointer-events-none">
            <div className="flex flex-col items-end gap-4 pointer-events-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-72 bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] rounded-[2rem] p-6 mb-2 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none rotate-12">
                                <Rocket size={120} strokeWidth={0.5} />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div>
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-foreground/40 flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                        Platform Core
                                    </span>
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-foreground">
                                        Operational HUD
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <Link href="/contact" className="flex items-center justify-between p-4 bg-foreground/5 hover:bg-foreground/10 rounded-2xl border border-border/50 group transition-all">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck size={16} className="text-secondary" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Initialize Audit</span>
                                        </div>
                                        <Plus size={14} className="opacity-40 group-hover:rotate-90 transition-transform" />
                                    </Link>

                                    <Link href="/contact" className="flex items-center justify-between p-4 bg-foreground/5 hover:bg-foreground/10 rounded-2xl border border-border/50 group transition-all">
                                        <div className="flex items-center gap-3">
                                            <MessageSquare size={16} className="text-foreground/60" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Global Support</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-foreground/10" />
                                    </Link>
                                </div>

                                <div className="space-y-2 px-1">
                                    <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-foreground/20">Live_Operations_Feed</span>
                                    <div className="flex flex-col gap-1.5 opacity-60">
                                        <div className="flex items-center justify-between text-[8px] font-mono tracking-tight">
                                            <span className="text-secondary">[AGENT_402]</span>
                                            <span className="text-foreground/40">AUDITING_SYS_X</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[8px] font-mono tracking-tight">
                                            <span className="text-white/40">[AGENT_109]</span>
                                            <span className="text-emerald-500/80">REVENUE_DEPLOYED</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Activity size={10} className="text-secondary" />
                                        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/40">Status: Nominal</span>
                                    </div>
                                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/20">v4.0.26</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-foreground text-background shadow-2xl transition-all flex items-center justify-center group",
                        isOpen ? "bg-background text-foreground border border-border" : ""
                    )}
                >
                    {isOpen ? <X size={20} /> : <Activity size={20} className="group-hover:rotate-12 transition-transform" />}
                </motion.button>
            </div>
        </div>
    );
}
