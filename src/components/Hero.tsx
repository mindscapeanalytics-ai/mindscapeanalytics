"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link";

export default function Hero() {
    // Use global scroll for the Hero to ensure maximum smoothness at the top of the page
    const { scrollY } = useScroll()

    // Optimized spring physics for maximum fluid performance - 60fps target
    const smoothScroll = useSpring(scrollY, {
        stiffness: 60,
        damping: 40,
        restDelta: 0.005
    })

    // Calculate progression based on a 700px scroll range
    const scrollProgress = useTransform(smoothScroll, [0, 700], [0, 1])

    // Scale down from 1 to 0.95 as we scroll - very subtle
    const scale = useTransform(scrollProgress, [0, 1], [1, 0.95])
    const opacity = useTransform(scrollProgress, [0, 0.8], [1, 0])

    // Depth parallax for Spline - subtle movement
    const splineY = useTransform(scrollProgress, [0, 1], [0, 40])

    // Cinematic title effects - vertical movement only, removed scale scaling
    const titleY = useTransform(scrollProgress, [0, 1], [0, -30])

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-24 pb-12 lg:pt-32 lg:pb-20 px-4 md:px-0">
            {/* The global CinematicBackground handles the unified grid. Local grid removed to prevent Moire conflicts. */}

            {/* Hero Layer 2: Kinetic Atmospheric Glows - Calibrated for monochromatic institutional design */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.35, 0.15],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] rounded-full will-change-transform"
                />
            </div>

            {/* Mobile HUD Ornaments - Institutional Detail */}
            <div className="lg:hidden absolute inset-0 z-10 pointer-events-none px-6 py-20 flex flex-col justify-between overflow-hidden opacity-30">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <span className="text-[7px] font-mono text-white/40 tracking-[0.2em] font-black uppercase">Lat: 44.8113° N</span>
                        <span className="text-[7px] font-mono text-white/40 tracking-[0.2em] font-black uppercase">Lon: 106.9561° W</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[7px] font-mono text-white/40 tracking-[0.2em] font-black uppercase">System_Active: 99.9%</span>
                    </div>
                </div>
            </div>
            {/* Content Overlay with focus on smoothness */}
            <motion.div
                style={{ scale, opacity, y: titleY }}
                className="container-standard relative z-10 py-8 md:py-12 pointer-events-none flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]"
            >
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-6 lg:mb-10 backdrop-blur-md"
                        >
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                            <span className="text-[8px] lg:text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] lg:tracking-[0.4em] font-black">Registry // ELITE_SYSTEM_V4</span>
                        </motion.div>

                    <div className="relative space-y-3 flex flex-col items-center">
                        {/* Scanning Brackets - Mobile Only */}
                        <div className="lg:hidden absolute -top-4 -left-2 -right-2 -bottom-4 pointer-events-none">
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" 
                            />
                            <motion.div 
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" 
                            />
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="fluid-h1 relative z-10 w-full text-center flex flex-col items-center justify-center"
                        >
                            <span className="text-white px-4">ARCHITECTING</span>
                            <span className="bg-gradient-to-r from-white via-white/90 to-white/20 bg-clip-text text-transparent mt-1 md:mt-4 px-4">
                                THE FUTURE
                            </span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-base md:text-3xl lg:text-4xl font-black text-white/40 font-sans tracking-tight leading-[1.1] md:leading-[0.9] uppercase text-center max-w-4xl px-8"
                        >
                            WE BUILD <span className="text-white">AI SYSTEMS</span> <br className="lg:hidden" /> THAT REPLACE MANUAL WORK.
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
                                <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                                    <span className="text-[10px] font-mono text-white/20 font-black">{service.icon}</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{service.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Service List */}
                        <p className="hidden lg:block text-white/40 text-[9px] md:text-[11px] font-medium tracking-[0.25em] md:tracking-[0.3em] uppercase text-center px-4 leading-relaxed">
                            AI Sales Agents <span className="text-white/10 mx-1 md:mx-2">/</span> Voice Automation <span className="text-white/10 mx-1 md:mx-2">/</span> SaaS Platforms
                        </p>

                        <div className="lg:hidden w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                        <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-3 px-4 text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/40">
                            <div className="flex items-center gap-2 hover:text-white transition-all cursor-default group">
                                <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
                                Scale_Ready
                            </div>
                            <div className="flex items-center gap-2 hover:text-white transition-all cursor-default group">
                                <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
                                Performance_Grid
                            </div>
                            <div className="flex items-center gap-2 hover:text-white transition-all cursor-default group">
                                <div className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-white transition-colors" />
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
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto">
                            <Link href="/contact" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group relative px-8 lg:px-10 py-4.5 lg:py-5 bg-white text-black font-black uppercase text-[10px] lg:text-xs tracking-[0.3em] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all hover:bg-white/90 active:scale-95">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        BOOK A STRATEGY CALL
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>

                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group px-8 lg:px-10 py-4.5 lg:py-5 bg-white/[0.03] border border-white/10 text-white font-black uppercase text-[10px] lg:text-xs tracking-[0.3em] rounded-xl backdrop-blur-xl transition-all hover:bg-white/5 hover:border-white/30 active:scale-95 flex items-center justify-center gap-4 shadow-2xl">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                        <Play className="w-3 h-3 fill-white text-white ml-1" />
                                    </div>
                                    VIEW CASE STUDIES
                                </button>
                            </Link>
                        </div>

                        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                            {/* Mission Tags */}
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[8px] md:text-[9px] font-mono text-white/40 tracking-widest uppercase">
                                <span>AI-First Engineering</span>
                                <div className="hidden xs:block w-1 h-1 bg-white/20 rounded-full" />
                                <span>Managed Infrastructure</span>
                                <div className="hidden xs:block w-1 h-1 bg-white/20 rounded-full" />
                                <span>Long-Term Partner</span>
                            </div>

                            {/* System Status - Mobile Only Integration */}
                            <div className="lg:hidden flex items-center justify-between w-full px-4 pt-4 border-t border-white/5 opacity-40">
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
                <span className="text-[9px] font-mono font-bold tracking-[0.5em] text-white/20 uppercase">Initiate_Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent relative">
                    <motion.div
                        animate={{ y: [0, 30, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]"
                    />
                </div>
            </motion.div>
        </section>
    )
}
