"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Activity, ShieldCheck, Cpu } from "lucide-react";

const TAGS = [
    { name: "Adaptive", x: -320, y: -180, delay: 0, bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
    { name: "Analytical", x: 220, y: -260, delay: 0.2, bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400" },
    { name: "Conversational", x: 300, y: 40, delay: 0.4, bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400" },
    { name: "Proactive", x: 240, y: 280, delay: 0.6, bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400" },
    { name: "Collaborative", x: -280, y: 240, delay: 0.8, bg: "bg-rose-500/10", border: "border-rose-500/30", dot: "bg-rose-400" },
];

export default function AiEmployee() {
    return (
        <section id="ai-employee-section" className="relative w-full overflow-hidden bg-transparent pt-0 pb-12 lg:pb-48 -mt-2">
            {/* Massive Ambient Background Glows */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[900px] h-[900px] bg-secondary/5 blur-[200px] rounded-full pointer-events-none opacity-40 translate-x-1/3" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none opacity-20 -translate-x-1/2 -translate-y-1/2" />

            <div className="container-wide relative z-10 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] lg:gap-x-16 items-start">

                    {/* 1. TOP: Heading & Description (Mobile Order 1) */}
                    <div className="flex flex-col items-start text-left space-y-4 lg:space-y-12 order-1 lg:mb-12 pt-4 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                            className="space-y-3 lg:space-y-10"
                        >
                            <div className="inline-flex items-center gap-4 px-4 py-1.5 lg:px-6 lg:py-3 rounded-full bg-foreground/[0.03] border border-border/20 backdrop-blur-3xl">
                                <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                                <span className="text-[8px] lg:text-meta font-mono text-foreground/40 uppercase tracking-[0.4em] font-black">Neural_Sync // STABLE</span>
                            </div>

                            <h2 className="fluid-h2 text-foreground relative">
                                THE ERA OF AI <br />
                                <span className="text-secondary drop-shadow-[0_0_40px_rgba(var(--secondary),0.4)] bg-gradient-to-r from-secondary to-secondary/50 bg-clip-text text-transparent">
                                    IS HERE.
                                </span>
                                <span className="absolute -left-16 top-4 text-[11px] font-mono text-secondary/30 hidden xl:block tracking-[0.8em] font-black rotate-90 origin-left">PROT_V4.0</span>
                            </h2>

                            <p className="text-foreground/60 dark:text-foreground/40 text-sm md:text-xl lg:text-2xl font-medium max-w-xl leading-[1.4] tracking-tight italic border-l-[3px] border-secondary/15 pl-6 lg:pl-10">
                                Transform your organization with self-evolving digital employees. We architect autonomous agents that handle mission-critical workflows with zero latency and infinite scalability.
                            </p>
                        </motion.div>
                    </div>

                    {/* 2. MIDDLE: Visual Hub (Mobile Order 2, Desktop Spans) */}
                    <div className="relative order-2 lg:row-span-2 flex justify-center items-center py-0 lg:py-0 min-h-[300px] md:min-h-[500px] lg:min-h-[950px] scale-[0.6] sm:scale-75 md:scale-95 lg:scale-100 transition-transform duration-1000 -my-20 lg:my-0">
                        {/* Background Data Matrix */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--secondary),0.06)_0%,transparent_75%)] opacity-40" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
                        </div>

                        <div className="relative w-full h-[550px] lg:h-[950px] flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                                <motion.div 
                                    animate={{ rotate: 360 }} 
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }} 
                                    className="absolute w-[140%] aspect-square rounded-full border border-secondary/5 opacity-[0.05] hidden lg:block" 
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.5 }}
                                viewport={{ once: true }}
                                className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[720px] h-[480px] md:h-[750px] lg:h-[950px] z-20 group"
                            >
                                <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-2xl overflow-hidden shadow-[0_100px_200px_-40px_rgba(0,0,0,1)] ring-1 ring-white/5">
                                    <Image src="/images/team/zeeshan-keerio.webp" alt="Zeeshan Keerio" fill className="object-cover object-top brightness-[1.01] contrast-[1.02] grayscale-[0.05] hover:grayscale-0 transition-all duration-[6s]" priority />
                                    <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
                                    
                                    <div className="absolute bottom-8 lg:bottom-16 left-8 lg:left-14 z-20">
                                        <div className="flex flex-col gap-1.5 lg:gap-3">
                                            <div className="flex items-center gap-3 opacity-30">
                                                <div className="h-[1px] w-6 lg:w-14 bg-secondary" />
                                                <span className="text-[7px] lg:text-[10px] font-mono text-white tracking-[0.4em] uppercase">Core_System</span>
                                            </div>
                                            <div className="text-[20px] lg:text-[44px] font-black text-white/10 select-none uppercase tracking-tighter">ZEESHAN KEERIO</div>
                                        </div>
                                    </div>
                                    <motion.div animate={{ y: ["-100%", "300%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-[40%] bg-gradient-to-b from-transparent via-secondary/5 to-transparent z-30 opacity-50 border-b border-white/10" />
                                </div>

                                {TAGS.map((tag, i) => (
                                    <motion.div 
                                        key={tag.name} 
                                        initial={{ opacity: 0 }} 
                                        whileInView={{ opacity: 1 }} 
                                        transition={{ delay: 1.2 + tag.delay }} 
                                        className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ 
                                            // Dynamic scaling for mobile responsiveness: use CSS variables or inline calculation
                                            left: `calc(50% + (var(--tag-offset-scale, 1) * ${tag.x}px))`, 
                                            top: `calc(50% + (var(--tag-offset-scale, 1) * ${tag.y}px))` 
                                        }}
                                    >
                                        <style jsx>{`
                                            @media (max-width: 400px) {
                                                div { --tag-offset-scale: 0.22; }
                                            }
                                            @media (min-width: 401px) and (max-width: 640px) {
                                                div { --tag-offset-scale: 0.28; }
                                            }
                                            @media (min-width: 641px) and (max-width: 1024px) {
                                                div { --tag-offset-scale: 0.65; }
                                            }
                                        `}</style>
                                        <div className={cn("px-4 py-2 lg:px-6 lg:py-2.5 rounded-full border backdrop-blur-3xl flex items-center gap-2 lg:gap-3 shadow-2xl relative group", tag.bg, tag.border)}>
                                            <div className={cn("w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full animate-pulse", tag.dot)} />
                                            <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] whitespace-nowrap text-white/90">
                                                {tag.name}
                                            </span>
                                            {/* Subtle Inner Glow */}
                                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* 3. BOTTOM: Feature Cards (Mobile Order 3, Desktop stays Left) */}
                    <div className="order-3 lg:col-start-1 lg:row-start-2 pt-0 lg:pt-0 -mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-10 w-full max-w-2xl"
                        >
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/[0.015] border border-border/30 backdrop-blur-2xl transition-colors hover:border-secondary/20 shadow-xl">
                                <Cpu className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-30" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/30 mb-1 lg:mb-3">Cognitive Capacity</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground italic leading-none tracking-tight">Infinite Parallelism</p>
                            </div>
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/[0.015] border border-border/30 backdrop-blur-2xl transition-colors hover:border-secondary/20 shadow-xl">
                                <ShieldCheck className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-30" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/30 mb-1 lg:mb-3">System Reliability</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground italic leading-none tracking-tight">Error-Free Execution</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
