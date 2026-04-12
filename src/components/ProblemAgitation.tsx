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
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-meta">System_Audit // DIAGNOSTIC_MODE</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="fluid-h2"
                        >
                            MOST BUSINESSES DON'T HAVE A <br className="hidden md:block" /> <span className="text-white/40 font-black">SOFTWARE PROBLEM.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-white/40 text-xl md:text-2xl font-medium tracking-tight max-w-xl"
                        >
                            THEY HAVE A <span className="text-white font-black">SYSTEMS PROBLEM.</span>
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
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1 }}
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
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.8 }}
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
