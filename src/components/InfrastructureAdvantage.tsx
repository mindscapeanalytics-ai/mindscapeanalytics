"use client";

import React from "react";
import { m } from "framer-motion";
import { Check } from "lucide-react";

const advantages = [
    "Managed cloud hosting",
    "Optimized database architecture",
    "Query indexing & performance tuning",
    "Automated backups",
    "Security patches",
    "Infrastructure monitoring",
    "Monthly maintenance & support"
];

const risks = [
    "Downtime & latency",
    "Security vulnerabilities",
    "Misconfigured servers",
    "No dedicated monitoring"
];

export default function InfrastructureAdvantage() {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Header Band */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24 border-b border-white/5 pb-10">
                    <div className="max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                            <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em] font-black">Infrastructure // ELITE_MANAGED</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-[-0.05em] font-syncopate leading-[0.85] uppercase">
                            THE INFRASTRUCTURE <span className="text-white/20 italic">ADVANTAGE.</span>
                        </h2>
                    </div>
                    <div className="text-right font-mono text-[9px] text-white/20 uppercase tracking-[0.4em] leading-relaxed font-black">
                        Uptime: 99.99% <br />
                        Response: &lt;10ms <br />
                        Protocol: msa-infra-v1
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
                    {/* Left side: Lifecycle & Advantages */}
                    <div className="space-y-12">
                        <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono font-black uppercase tracking-[0.4em] text-white/20">
                            <span className="text-white/60">Build</span>
                            <span className="text-white/10">→</span>
                            <span className="text-white/60">Deploy</span>
                            <span className="text-white/10">→</span>
                            <span className="text-white/60">Monitor</span>
                            <span className="text-white/10">→</span>
                            <span className="text-white/60">Optimize</span>
                            <span className="text-white/10">→</span>
                            <span className="text-white/60">Maintain</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                            {advantages.map((adv, i) => (
                                <m.div
                                    key={adv}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-4 p-6 bg-white/[0.02] backdrop-blur-sm group hover:bg-white/[0.05] transition-all relative"
                                >
                                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-white/30 transition-colors" />
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.1em]">{adv}</span>
                                </m.div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Risks & Conclusion */}
                    <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

                        <div className="space-y-8 relative z-10">
                            <div className="text-[9px] font-mono font-bold text-white/20 border-b border-white/5 pb-4 tracking-[0.5em] uppercase text-center">UNMANAGED_RISK_REPORT</div>
                            <div className="space-y-4">
                                {risks.map((risk) => (
                                    <div key={risk} className="flex items-center gap-4 opacity-30 group hover:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 border border-white/40 rounded-full" />
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] line-through group-hover:no-underline transition-all">{risk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 space-y-8 relative z-10">
                            <p className="text-white/40 text-[13px] leading-relaxed font-medium uppercase tracking-widest text-center italic">
                                hosting without expertise leads to vulnerabilities, high latency, and mission-critical failure.
                            </p>
                            <m.div
                                whileHover={{ scale: 1.02 }}
                                className="p-8 rounded-2xl bg-white text-black font-black uppercase tracking-[-0.05em] text-lg text-center shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                            >
                                WE BECOME YOUR LONG-TERM <br /> AI SYSTEMS PARTNER.
                            </m.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
