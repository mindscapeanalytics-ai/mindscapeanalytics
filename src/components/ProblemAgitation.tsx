"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const painPoints = [
    "Manual sales processes",
    "Slow lead follow-up",
    "Missed customer calls",
    "Disconnected tools",
    "Poor database performance",
    "Unmanaged cloud costs",
    "No automation strategy"
];

export default function ProblemAgitation() {
    return (
        <section className="relative section-spacing overflow-hidden bg-transparent">
            <div className="container-standard">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="flex flex-col items-center lg:items-start max-w-4xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md"
                        >
                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                            <span className="text-meta uppercase font-mono tracking-widest text-white/40">Diagnostic // CORE_LEAKAGE</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="fluid-h2"
                        >
                            THE COST OF <br className="hidden md:block" /> <span className="text-white/40 font-black">INEFFICIENCY.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-white/40 text-lg lg:text-xl max-w-2xl font-medium leading-relaxed"
                        >
                            Every manual workflow is a hidden tax on your growth. We identify the bottlenecks and replace them with intelligent automation.
                        </motion.p>
                    </div>

                    <div className="relative">
                        {/* Interactive Diagnostic Scanner Line */}
                        <motion.div
                            animate={{ y: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-px bg-white/20 z-20 pointer-events-none"
                        />
                        <div className="absolute -inset-10 bg-white/5 blur-[120px] rounded-full opacity-20" />
                        <div className="relative grid grid-cols-1 gap-4">
                            {painPoints.map((point, i) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-[9px] font-mono text-white/20 tracking-[0.3em]">0{i + 1}</span>
                                        <span className="text-lg font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight">{point}</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-8 p-10 rounded-[2.5rem] bg-white text-black text-center space-y-6 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-10" />
                                <p className="text-xl font-black uppercase tracking-[-0.05em]">YOU DON'T NEED ANOTHER APP.</p>
                                <p className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] font-sans leading-none">YOU NEED AN <br /> INTELLIGENT SYSTEM.</p>
                                <div className="pt-4 text-[9px] font-mono font-black tracking-[0.5em] uppercase opacity-40">That's where we come in.</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
