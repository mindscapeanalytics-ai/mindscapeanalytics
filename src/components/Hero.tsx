"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link";
import HeroSpotlight from "./animations/HeroSpotlight";

export default function Hero() {
    // All viewport/scroll linked animations removed for maximum mobile smoothness

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-12 lg:pt-32 lg:pb-20 px-4 md:px-0">
            {/* The global CinematicBackground handles the unified grid. Local grid removed to prevent Moire conflicts. */}

            {/* Univers.io Spotlight Background Animation */}
            <HeroSpotlight />

            {/* Content Overlay with focus on smoothness */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container-standard relative z-10 py-8 md:py-12 pointer-events-none flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]"
            >
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-background dark:bg-foreground/[0.03] border border-border/80 backdrop-blur-md mb-8 lg:mb-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-sm"
                        >
                            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(var(--secondary),0.6)]" />
                            <span className="text-[8px] lg:text-[10px] font-mono text-foreground/80 dark:text-foreground/40 uppercase tracking-[0.3em] lg:tracking-[0.4em] font-black">Registry // ELITE_SYSTEM_V4</span>
                        </motion.div>

                    <div className="relative space-y-3 flex flex-col items-center">
                        {/* Scanning Brackets - Mobile Only */}
                        <div className="lg:hidden absolute -top-4 -left-2 -right-2 -bottom-4 pointer-events-none">
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-0 left-0 w-4 h-4 border-t border-l border-foreground/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                className="absolute top-0 right-0 w-4 h-4 border-t border-r border-foreground/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-foreground/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-foreground/20" 
                            />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="fluid-h1 relative z-10 w-full text-center flex flex-col items-center justify-center"
                        >
                            <span className="text-foreground px-4 drop-shadow-sm">ARCHITECTING</span>
                            <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent mt-1 md:mt-4 px-4 drop-shadow-[0_0_20px_hsl(var(--secondary)/0.4)]">
                                THE FUTURE
                            </span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-base md:text-3xl lg:text-4xl font-black text-foreground/70 dark:text-foreground/40 font-sans tracking-tight leading-[1.1] md:leading-[0.9] uppercase text-center max-w-4xl px-8"
                        >
                            WE BUILD <span className="text-secondary drop-shadow-sm">AI SYSTEMS</span> <br className="lg:hidden" /> THAT REPLACE MANUAL WORK.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full mt-10 mb-8 pointer-events-auto"
                    >
                        {/* Mobile Service Hub Grid */}
                        <div className="lg:hidden grid grid-cols-3 gap-2 px-4 max-w-sm mx-auto mb-10">
                            {[
                                { label: "Sales", icon: "01" },
                                { label: "Voice", icon: "02" },
                                { label: "SaaS", icon: "03" }
                            ].map((service, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-foreground/[0.02] border border-border backdrop-blur-sm">
                                    <span className="text-[10px] font-mono text-foreground/40 font-black">{service.icon}</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/70 dark:text-foreground/60">{service.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Service List */}
                        <p className="hidden lg:block text-foreground/60 dark:text-foreground/40 text-[9px] md:text-[11px] font-medium tracking-[0.25em] md:tracking-[0.3em] uppercase text-center px-4 leading-relaxed">
                            AI Sales Agents <span className="text-foreground/20 mx-1 md:mx-2">/</span> Voice Automation <span className="text-foreground/20 mx-1 md:mx-2">/</span> SaaS Platforms
                        </p>

                        <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-8" />

                        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-3 px-4 text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-foreground/60 dark:text-foreground/40">
                            <div className="flex items-center gap-2 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Scale_Ready
                            </div>
                            <div className="flex items-center gap-2 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Performance_Grid
                            </div>
                            <div className="flex items-center gap-2 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Managed_v2
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-8 lg:gap-10 pointer-events-auto w-full px-6"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto mt-4">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group relative px-8 lg:px-10 py-4.5 lg:py-5 bg-secondary text-white font-black uppercase text-[10px] lg:text-xs tracking-[0.3em] rounded-xl overflow-hidden shadow-[0_0_40px_hsl(var(--secondary)/0.4)] transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        BOOK A STRATEGY CALL
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>

                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group px-8 lg:px-10 py-4.5 lg:py-5 bg-background/80 border border-border text-foreground font-black uppercase text-[10px] lg:text-xs tracking-[0.3em] rounded-xl backdrop-blur-xl transition-all hover:bg-foreground/5 hover:border-foreground/30 active:scale-95 flex items-center justify-center gap-4 shadow-xl">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center group-hover:bg-foreground/10 group-hover:border-foreground/30 transition-all">
                                        <Play className="w-3 h-3 fill-foreground text-foreground ml-1" />
                                    </div>
                                    VIEW CASE STUDIES
                                </button>
                            </Link>
                        </div>

                        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                            {/* Mission Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[8px] md:text-[9px] font-mono text-foreground/40 tracking-widest uppercase">
                                <span>AI-First Engineering</span>
                                <div className="hidden xs:block w-1 h-1 bg-foreground/20 rounded-full" />
                                <span>Managed Infrastructure</span>
                                <div className="hidden xs:block w-1 h-1 bg-foreground/20 rounded-full" />
                                <span>Long-Term Partner</span>
                            </div>

                            {/* System Status - Mobile Only Integration */}
                            <div className="lg:hidden flex items-center justify-between w-full px-4 pt-4 border-t border-border opacity-40">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em]">Buffer: Optimal</span>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[7px] font-mono font-black uppercase tracking-[0.2em]">Protocol: 0x4f2</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Remove duplicate static gradients that conflict with global backgrounds */}

            {/* Removed overlapping HUDs - handled cleanly by CinematicBackground */}

            {/* Scroll Indicator - Moved down and ensured visibility */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20"
            >
                <span className="text-[9px] font-mono font-bold tracking-[0.5em] text-foreground/20 uppercase">Initiate_Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent relative">
                    <motion.div
                        animate={{ y: [0, 30, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-foreground rounded-full shadow-[0_0_8px_rgba(var(--foreground),1)]"
                    />
                </div>
            </motion.div>
        </section>
    )
}
