"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link";
import HeroSpotlight from "./animations/HeroSpotlight";
import CalButton from "./CalButton";

export default function Hero() {
    // All viewport/scroll linked animations removed for maximum mobile smoothness

    return (
        <section className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-28 pb-12 lg:pt-20 lg:pb-20 px-4 md:px-0">
            {/* The global CinematicBackground handles the unified grid. Local grid removed to prevent Moire conflicts. */}

            {/* Univers.io Spotlight Background Animation */}
            <HeroSpotlight />

            {/* Content Overlay with focus on smoothness */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container-standard relative z-10 py-2 md:py-6 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh] will-change-[opacity,transform]"
            >
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                    <div className="relative space-y-2 flex flex-col items-center">
                        {/* Scanning Brackets - Mobile Only */}
                        <div className="lg:hidden absolute -top-4 -left-1 -right-1 -bottom-4 pointer-events-none opacity-40">
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-0 left-0 w-3 h-3 border-t border-l border-foreground/30 will-change-opacity"
                            />
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                className="absolute top-0 right-0 w-3 h-3 border-t border-r border-foreground/30 will-change-opacity"
                            />
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-foreground/30 will-change-opacity"
                            />
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-foreground/30 will-change-opacity"
                            />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="fluid-h1 relative z-10 w-full text-center flex flex-col items-center justify-center gpu-accelerate"
                        >
                            {/* Visibility Backlighting */}
                            <div className="absolute inset-0 bg-secondary/5 blur-[80px] rounded-full opacity-30 pointer-events-none" />

                            <div className="relative group/title inline-flex flex-col items-center max-w-[calc(100vw-2rem)] not-italic">
                                {/* Architectural Brackets */}
                                <div className="absolute -top-4 -left-6 w-4 h-4 border-t-2 border-l-2 border-secondary/40 lg:opacity-100 group-hover/title:scale-110 transition-transform hidden sm:block" />
                                <div className="absolute -bottom-2 -right-6 w-4 h-4 border-b-2 border-r-2 border-secondary/40 lg:opacity-100 group-hover/title:scale-110 transition-transform hidden sm:block" />

                                <span className="text-foreground px-4 drop-shadow-sm flex items-center gap-4 break-words text-center">
                                    <span className="hidden lg:block text-[8px] font-mono text-foreground/20 tracking-[0.5em] -ml-12">0X_4F</span>
                                    ARCHITECTING
                                </span>
                                <span className="relative inline-block mt-0.5 md:mt-4 px-4 overflow-hidden max-w-full">
                                    <span className="bg-gradient-to-r from-secondary via-foreground/80 to-secondary bg-[length:200%_auto] bg-clip-text text-transparent shimmer-sweep break-words">
                                        THE FUTURE
                                    </span>
                                </span>
                            </div>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-base md:text-2xl lg:text-3xl font-black text-foreground/80 dark:text-foreground/70 font-sans tracking-tight leading-[1.2] uppercase text-center max-w-4xl px-6 mt-6 will-change-[transform,opacity] not-italic"
                        >
                            <div className="flex flex-col items-center gap-3">
                                <span className="text-[7px] md:text-[9px] font-mono font-black text-secondary tracking-[0.4em] mb-1 opacity-60">
                                    STATUS: ACTIVE // PROTOCOL_01
                                </span>
                                <span>
                                    WE BUILD <span className="text-foreground dark:text-white underline decoration-secondary/30 decoration-2 underline-offset-4">AI SYSTEMS</span> <br className="lg:hidden" /> THAT REPLACE MANUAL WORK.
                                </span>
                            </div>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full mt-8 mb-6"
                    >
                        {/* Mobile Service tags */}
                        <div className="lg:hidden flex flex-wrap justify-center gap-2 px-4 mb-6">
                            {[
                                { label: "Sales Agents", dot: "bg-secondary" },
                                { label: "Voice Automation", dot: "bg-purple-500" },
                                { label: "SaaS Systems", dot: "bg-emerald-500" }
                            ].map((service, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-border/40 backdrop-blur-sm">
                                    <div className={`w-1.5 h-1.5 rounded-full ${service.dot} animate-pulse`} />
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/80 dark:text-foreground/70">{service.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Service List */}
                        <p className="hidden lg:block text-foreground/60 dark:text-foreground/40 text-[9px] md:text-[11px] font-medium tracking-[0.25em] md:tracking-[0.3em] uppercase text-center px-4 leading-relaxed">
                            AI Sales Agents <span className="text-foreground/20 mx-1 md:mx-2">/</span> Voice Automation <span className="text-foreground/20 mx-1 md:mx-2">/</span> SaaS Platforms
                        </p>

                        <div className="lg:hidden w-1/2 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent mb-6 mx-auto" />

                        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-12 gap-y-2 px-6 text-[7px] md:text-[9px] font-mono font-bold uppercase tracking-[0.2em] md:tracking-[0.5em] text-foreground/60 dark:text-foreground/40">
                            <div className="flex items-center gap-1.5 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Scale_Ready
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Performance_Grid
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-foreground transition-all cursor-default group">
                                <div className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground transition-colors" />
                                Managed_v2
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6 lg:gap-10 w-full px-6"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none mx-auto mt-2">
                            <CalButton calLink="mindscape/strategy" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group relative px-6 py-4 bg-secondary text-secondary-foreground font-black uppercase text-[10px] lg:text-xs tracking-[0.2em] rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 not-italic">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        BOOK A STRATEGY CALL
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </button>
                            </CalButton>

                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group px-6 py-4 bg-background/80 border border-border text-foreground font-black uppercase text-[10px] lg:text-xs tracking-[0.2em] rounded-xl backdrop-blur-xl transition-all hover:bg-foreground/5 hover:border-foreground/30 active:scale-95 flex items-center justify-center gap-2 shadow-xl not-italic">
                                    <Play className="w-3.5 h-3.5 fill-foreground text-foreground mr-1" />
                                    VIEW CASE STUDIES
                                </button>
                            </Link>
                        </div>

                        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                            {/* Mission Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[9px] xs:text-[10px] font-mono text-foreground/40 tracking-widest uppercase">
                                <span>AI-First Engineering</span>
                                <div className="hidden xs:block w-1 h-1 bg-foreground/20 rounded-full" />
                                <span>Managed Infrastructure</span>
                                <div className="hidden xs:block w-1 h-1 bg-foreground/20 rounded-full" />
                                <span>Long-Term Partner</span>
                            </div>

                            {/* System Status - Mobile Only Integration */}
                            <div className="lg:hidden flex items-center justify-center gap-4 w-full pt-4 border-t border-border/40 opacity-50">
                                <span className="text-[8px] font-mono font-black uppercase tracking-wider text-foreground/40">Buffer: Optimal</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-mono font-black uppercase tracking-wider text-foreground/40">Protocol: 0x4F2</span>
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
                        className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-foreground rounded-full shadow-[0_0_8px_hsl(var(--foreground) / 1)]"
                    />
                </div>
            </motion.div>
        </section>
    )
}
