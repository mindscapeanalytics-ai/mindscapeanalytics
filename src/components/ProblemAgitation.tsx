"use client";

import React from "react";
import { m } from "framer-motion";
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
        <section className="relative py-32 px-6 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] font-black">System_Audit // DIAGNOSTIC_MODE</span>
                        </m.div>

                        <m.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-[-0.05em] font-syncopate uppercase"
                        >
                            MOST BUSINESSES DON'T HAVE A <span className="text-white/20 italic">SOFTWARE PROBLEM.</span>
                        </m.h2>

                        <m.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white/40 text-2xl font-medium tracking-[-0.02em] max-w-xl"
                        >
                            THEY HAVE A <span className="text-white font-black">SYSTEMS PROBLEM.</span>
                        </m.p>
                    </div>

                    <div className="relative">
                        {/* Interactive Diagnostic Scanner Line */}
                        <m.div
                            animate={{ y: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-px bg-white/20 z-20 pointer-events-none"
                        />
                        <div className="absolute -inset-10 bg-white/5 blur-[120px] rounded-full opacity-20" />
                        <div className="relative grid grid-cols-1 gap-4">
                            {painPoints.map((point, i) => (
                                <m.div
                                    key={point}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-[9px] font-mono text-white/20 tracking-[0.3em]">0{i + 1}</span>
                                        <span className="text-lg font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight">{point}</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                                </m.div>
                            ))}

                            <m.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 p-10 rounded-[2.5rem] bg-white text-black text-center space-y-6 shadow-[0_0_100px_rgba(255,255,255,0.1)] relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-10" />
                                <p className="text-xl font-black uppercase tracking-[-0.05em]">YOU DON'T NEED ANOTHER APP.</p>
                                <p className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] font-syncopate leading-none">YOU NEED AN <br /> INTELLIGENT SYSTEM.</p>
                                <div className="pt-4 text-[9px] font-mono font-black tracking-[0.5em] uppercase opacity-40 italic">That's where we come in.</div>
                            </m.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
