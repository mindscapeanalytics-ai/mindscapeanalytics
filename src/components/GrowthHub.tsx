"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, ArrowRight, ShieldCheck, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

const GrowthHub = () => {
    return (
        <section className="relative py-24 px-6 overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-1 px-1 bg-white/5 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">

                    {/* Sell Side */}
                    <motion.div
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className="p-12 flex flex-col justify-between group transition-all"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/40">
                                    <TrendingUp size={16} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Architect Network</span>
                            </div>

                            <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-4">
                                Sell With <span className="text-white/40 group-hover:text-white transition-colors duration-500">Mindscape</span>
                            </h2>
                            <p className="text-sm text-white/40 font-medium leading-relaxed max-w-sm mb-8 italic">
                                Monetize your architectural intelligence. Deploy premium digital assets, SaaS boilerplates, and autonomous workflows to our global network of institutional clients.
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <ShieldCheck size={12} className="opacity-40" />
                                    Instant Settlement Protocols
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <Globe size={12} className="opacity-40" />
                                    Global Distribution Core
                                </div>
                            </div>
                        </div>

                        <Link href="/become-seller" className="mt-12 group/btn">
                            <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white py-4 px-8 border border-white/10 rounded-2xl group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                Become a Seller
                                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Hire Side */}
                    <motion.div
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className="p-12 flex flex-col justify-between group transition-all border-l md:border-l border-white/5"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/40">
                                    <Users size={16} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Talent Acquisition</span>
                            </div>

                            <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-4">
                                Hire Top <span className="text-white/40 group-hover:text-white transition-colors duration-500">Intelligence</span>
                            </h2>
                            <p className="text-sm text-white/40 font-medium leading-relaxed max-w-sm mb-8 italic">
                                Access elite engineering pods at optimized costs. From AI Researchers to Full-Stack Architects, MSA talent is rigorously vetted for mission-critical deployments.
                            </p>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <Sparkles size={12} className="opacity-40" />
                                    Zero Overhead Augmentation
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                    <TrendingUp size={12} className="opacity-40" />
                                    Post-Quantum Performance
                                </div>
                            </div>
                        </div>

                        <Link href="/outsourcing" className="mt-12 group/btn">
                            <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white py-4 px-8 border border-white/10 rounded-2xl group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                Hire Talent
                                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </motion.div>

                </div>

                {/* Bot Info Meta-Section */}
                <div className="mt-12 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-white/80 tracking-tighter">98.2%</span>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Deployment Success</span>
                    </div>
                    <div className="flex flex-col items-center border-x border-white/5 px-12">
                        <span className="text-2xl font-black text-white/80 tracking-tighter">4.2ms</span>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Internal Latency</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-white/80 tracking-tighter">24/7</span>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Monitoring</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthHub;
