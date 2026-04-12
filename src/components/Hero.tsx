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

    // Pre-calculated static dust positions to completely eliminate JS main thread calculations
    const staticDust = [
        { top: "15%", left: "20%", size: "1.2px", delay: "0s" },
        { top: "60%", left: "10%", size: "0.8px", delay: "2s" },
        { top: "85%", left: "80%", size: "1.5px", delay: "1s" },
        { top: "25%", left: "70%", size: "1.0px", delay: "3s" },
        { top: "45%", left: "90%", size: "0.9px", delay: "1.5s" },
        { top: "75%", left: "30%", size: "1.3px", delay: "0.5s" },
        { top: "10%", left: "50%", size: "1.1px", delay: "2.5s" },
        { top: "90%", left: "60%", size: "0.7px", delay: "4s" },
    ];

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-transparent pt-20 pb-10">
            {/* The global CinematicBackground handles the unified grid. Local grid removed to prevent Moire conflicts. */}

            {/* Hero Layer 2: Kinetic Atmospheric Glows - Calibrated for monochromatic institutional design */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] rounded-full will-change-transform"
                />
                <motion.div
                    animate={{
                        scale: [1.15, 1, 1.15],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full will-change-transform"
                />
            </div>

            {/* Layer 3: Static CSS Data Dust Particles bypasses JS entirely */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {staticDust.map((dust, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse opacity-40 will-change-[opacity]"
                        style={{
                            top: dust.top,
                            left: dust.left,
                            width: dust.size,
                            height: dust.size,
                            animationDelay: dust.delay,
                            animationDuration: "4s"
                        }}
                    />
                ))}
            </div>

            {/* Content Overlay with focus on smoothness */}
            <motion.div
                style={{ scale, opacity, y: titleY }}
                className="container-standard relative z-10 py-12 pointer-events-none flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]"
            >
                <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Sparkles size={10} className="text-white/40" />
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em] font-black">Industry Standard AI</span>
                    </motion.div>

                    <div className="space-y-3 flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[12vw] xs:text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.85] tracking-[-0.05em] origin-center font-syncopate uppercase w-full text-center flex flex-col items-center justify-center"
                            style={{ fontSize: "clamp(3rem, 10vw, 12rem)" }}
                        >
                            <span className="text-white text-center w-full whitespace-nowrap px-4">ARCHITECTING</span>
                            <span
                                className="bg-gradient-to-r from-white via-white/90 to-white/10 bg-clip-text text-transparent text-center w-full whitespace-nowrap mt-2 md:mt-4 px-4"
                            >
                                THE FUTURE
                            </span>
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="text-xl md:text-3xl lg:text-4xl font-black text-white/30 font-syncopate tracking-[-0.05em] leading-[0.9] uppercase italic text-center max-w-4xl"
                        >
                            WE BUILD <span className="text-white italic">AI SYSTEMS</span> THAT REPLACE MANUAL WORK.
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center space-y-2 mt-6 mb-4 pointer-events-auto"
                    >
                        <p className="text-white/60 text-xs md:text-sm lg:text-base font-medium tracking-[0.2em] uppercase text-center">
                            AI Sales Agents. Voice Automation. SaaS Platforms.
                        </p>
                        <p className="text-white/40 text-[10px] md:text-xs lg:text-sm font-medium tracking-[0.1em] uppercase text-center">
                            Managed Cloud & Database Infrastructure.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-[9px] font-mono font-bold uppercase tracking-[0.5em] text-white/20 mb-6 flex flex-wrap justify-center gap-x-12 gap-y-2"
                    >
                        <span>Scale_Ready</span>
                        <span>Performance_Grid</span>
                        <span>Managed_v2</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6 pointer-events-auto"
                    >
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/contact">
                                <button className="group relative px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all hover:bg-white/90 hover:scale-105 active:scale-95">
                                    <span className="relative z-10 flex items-center gap-4">
                                        BOOK A STRATEGY CALL
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>

                            <Link href="/projects">
                                <button className="group px-10 py-5 bg-transparent/40 border border-white/10 text-white font-black uppercase text-xs tracking-[0.3em] rounded-xl backdrop-blur-xl transition-all hover:bg-white/5 hover:border-white/30 active:scale-95 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                        <Play className="w-3 h-3 fill-white text-white ml-1" />
                                    </div>
                                    VIEW CASE STUDIES
                                </button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 text-[9px] font-mono text-white/30 tracking-widest uppercase">
                            <span>AI-First Engineering</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Managed Infrastructure</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span>Long-Term Partner</span>
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
