"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link";

const CAROUSEL_PROJECTS = [
    {
        title: "DisposIQ",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/production-and-disposal-mindsacpeanalytics-0KgazmuLyRIeuG0SgU6UilsnTwSRj8.png",
        color: "from-blue-500/20"
    },
    {
        title: "Smart DairyFarm",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dairy_farm_mindscapeanalytics-MV3Don0b2Ko36NfHJ88vpk3I2jioO7.png",
        color: "from-green-500/20"
    },
    {
        title: "RSIQ Pro",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rsiq-mindscapeanalytics-12xQXu3FV2JRsszTGtDb9kLLih0jbf.png",
        color: "from-emerald-500/20"
    },
    {
        title: "CyberTrader-X",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/traderX-mindscapeanalytics-ADXDXT7XN4Pk6u1vkIm4cSUVYwAsoT.png",
        color: "from-cyan-500/20"
    },
    {
        title: "TENVO",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenvo-mindscapeanalytics-i8yPGcLjz8sebUqi8WUA1mq0BDGdmP.png",
        color: "from-purple-500/20"
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PROJECTS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-transparent pt-20 pb-10">
            {/* The global CinematicBackground handles the unified grid. Local grid removed to prevent Moire conflicts. */}

            {/* Hero Background: Auto-Sliding Project Carousel */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {CAROUSEL_PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentIndex === index ? 0.12 : 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover scale-110 blur-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                        <div className={`absolute inset-0 bg-gradient-to-r ${project.color} to-transparent`} />
                    </motion.div>
                ))}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Project Indicators */}
            <div className="absolute top-20 right-8 z-20 flex gap-1.5">
                {CAROUSEL_PROJECTS.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        animate={{
                            width: currentIndex === index ? 24 : 8,
                            backgroundColor: currentIndex === index ? "#fcdf03" : "rgba(255,255,255,0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1.5 rounded-full"
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content Overlay with focus on smoothness */}
            <motion.div
                style={{ scale, opacity, y: titleY }}
                className="container-standard relative z-10 py-12 pointer-events-none flex flex-col items-center justify-center min-h-[60vh] md:min-h-[70vh]"
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-8 backdrop-blur-md"
                        >
                            <Sparkles size={10} className="text-yellow-400/60" />
                            <span className="text-[9px] font-mono text-yellow-300/70 uppercase tracking-[0.4em] font-black">Enterprise AI Solutions</span>
                        </motion.div>

                    <div className="space-y-3 flex flex-col items-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[12vw] xs:text-6xl md:text-8xl lg:text-[11vw] font-black leading-[0.8] tracking-[-0.05em] origin-center font-syncopate uppercase w-full text-center flex flex-col items-center justify-center"
                            style={{ fontSize: "clamp(3.5rem, 12vw, 15rem)" }}
                        >
                            <span className="text-white text-center w-full break-words" style={{ overflowWrap: "break-word", hyphens: "auto" }}>ARCHITECTING</span>
                            <span
                                className="bg-gradient-to-r from-white via-white/90 to-white/10 bg-clip-text text-transparent text-center w-full break-words mt-2 md:mt-4"
                                style={{ overflowWrap: "break-word", hyphens: "auto" }}
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
                                <button className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-black uppercase text-xs tracking-[0.3em] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(252,223,3,0.25)] transition-all hover:from-yellow-300 hover:to-yellow-200 hover:shadow-[0_0_60px_rgba(252,223,3,0.35)] hover:scale-105 active:scale-95">
                                    <span className="relative z-10 flex items-center gap-4">
                                        BOOK A STRATEGY CALL
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>

                            <Link href="#products-showcase">
                                <button className="group px-10 py-5 bg-transparent/40 border border-yellow-400/30 text-white font-black uppercase text-xs tracking-[0.3em] rounded-xl backdrop-blur-xl transition-all hover:bg-yellow-400/10 hover:border-yellow-400/50 active:scale-95 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center group-hover:bg-yellow-400/20 group-hover:border-yellow-400/50 transition-all">
                                        <Play className="w-3 h-3 fill-yellow-300 text-yellow-300 ml-1" />
                                    </div>
                                    VIEW OUR PRODUCTS
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
                <span className="text-[9px] font-mono font-bold tracking-[0.5em] text-white/30 uppercase">Scroll_Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-yellow-400/40 to-transparent relative">
                    <motion.div
                        animate={{ y: [0, 30, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-[-1.5px] w-[4px] h-[4px] bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(252,223,3,0.8)]"
                    />
                </div>
            </motion.div>
        </section>
    )
}
