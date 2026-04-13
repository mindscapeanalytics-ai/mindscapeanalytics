"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Target, Zap } from 'lucide-react';

export default function AIAuditLeadMagnet() {
    return (
        <section className="py-24 border-t border-white/5 bg-black relative overflow-hidden group">
            {/* Cinematic Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-white/10 transition-colors duration-1000" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 md:p-20 backdrop-blur-xl flex flex-col items-center text-center space-y-10">

                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10">
                        <Bot className="w-4 h-4 text-white/60" />
                        <span className="text-white/60 text-[9px] font-mono font-black tracking-[0.4em] uppercase">Free Infrastructure Review</span>
                    </div>

                    <div className="space-y-6 max-w-4xl">
                        <h2 className="fluid-h2">
                            AI AUTOMATION <br /> READINESS <br /> <span className="text-white/40">AUDIT.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed uppercase tracking-tight">
                            Stop guessing. Let our engineers analyze your current operational bottlenecks and map out the exact AI system architecture required to scale your revenue.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center pt-4">
                        <div className="flex items-center gap-3 text-left bg-white/5 p-4 rounded-xl border border-white/5">
                            <Target className="w-6 h-6 text-white/40" />
                            <div>
                                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-white/20">Step 1</div>
                                <div className="text-sm font-bold uppercase tracking-wider text-white/80">Identify Gaps</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-left bg-white/5 p-4 rounded-xl border border-white/5">
                            <Zap className="w-6 h-6 text-white/40" />
                            <div>
                                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-white/20">Step 2</div>
                                <div className="text-sm font-bold uppercase tracking-wider text-white/80">System Design</div>
                            </div>
                        </div>
                    </div>

                    <Link href="/contact" className="inline-block pt-6">
                        <button className="btn-institutional group">
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                Request Free Audit
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </span>
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
