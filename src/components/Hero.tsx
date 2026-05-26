"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Bot, Zap, Network } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import CalButton from "./CalButton";

const HERO_BG_IMAGES = [
    "/images/hero/1.png",
    "/images/hero/2.png",
    "/images/hero/3.png",
    "/images/hero/4.png",
    "/images/hero/5.png"
];

const SERVICES = [
    {
        title: "Autonomous Agents",
        description: "Smart digital workers that independently execute complex business tasks 24/7, without human intervention.",
        icon: Bot,
    },
    {
        title: "Custom Generative AI",
        description: "Private, highly-tuned AI models designed to generate content, code, and insights specific to your data.",
        icon: Zap,
    },
    {
        title: "Intelligent Automations",
        description: "End-to-end automated workflows that connect your software stack and completely eliminate manual data entry.",
        icon: Network,
    }
];

export default function Hero() {
    const [bgIndex, setBgIndex] = useState(0);

    // Auto-cycle background images every 5 seconds infinitely
    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((current) => (current + 1) % HERO_BG_IMAGES.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-background px-4 md:px-8 lg:px-16 pt-32 pb-16 overflow-hidden">
            
            {/* Animated Background Images with Low Opacity */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={bgIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full z-0"
                    >
                        <Image 
                            src={HERO_BG_IMAGES[bgIndex]} 
                            alt={`Hero Background ${bgIndex + 1}`} 
                            fill 
                            priority={bgIndex === 0} 
                            sizes="100vw"
                            className="object-cover object-center"
                            quality={100}
                        />
                    </motion.div>
                </AnimatePresence>
                
                {/* Professional Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-background/50 dark:bg-background/70 z-10 backdrop-blur-[2px]" /> 
            </div>

            <div className="container-standard grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-12 items-center z-10 relative mx-auto w-full max-w-7xl">
                
                {/* Left Column: Typography & CTA */}
                <div className="flex flex-col items-start text-left space-y-6 md:space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                        <span className="text-[10px] md:text-xs font-mono font-semibold uppercase tracking-widest text-foreground/80">
                            Enterprise AI Solutions
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] lg:leading-[0.9] tracking-tighter uppercase font-sans"
                    >
                        SCALE WITH <br />
                        <span className="bg-gradient-to-r from-secondary to-foreground/80 bg-clip-text text-transparent">
                            AGENTIC AI
                        </span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-base md:text-xl text-foreground/70 max-w-lg leading-relaxed md:leading-relaxed"
                    >
                        We build custom AI agents and intelligent automation systems that eliminate busywork, cut operational costs, and scale your business on autopilot.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 pt-2 md:pt-4 w-full sm:w-auto"
                    >
                        <CalButton calLink="mindscape/strategy" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto flex items-center justify-center text-center group relative px-6 md:px-8 py-3.5 md:py-4 bg-foreground text-background font-black uppercase text-[10px] md:text-xs tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                                INITIATE PROJECT
                            </button>
                        </CalButton>
                        <Link href="/projects" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto flex items-center justify-center text-center px-6 md:px-8 py-3.5 md:py-4 bg-transparent border border-border text-foreground font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] rounded-xl hover:bg-foreground/5 active:scale-95 transition-all gap-2">
                                VIEW CAPABILITIES <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Right Column: Interactive Services List */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col space-y-3 md:space-y-4 w-full relative z-20"
                >
                    {SERVICES.map((service, idx) => (
                        <div 
                            key={idx}
                            className={`group relative flex items-center justify-between p-5 md:p-8 rounded-2xl md:rounded-3xl border border-border/50 bg-card hover:bg-foreground/[0.03] hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden`}
                        >
                            <div className="flex flex-col gap-1.5 md:gap-2 relative z-10 mr-4">
                                <div className="flex items-center gap-2.5 md:gap-3">
                                    <service.icon className={`w-4 h-4 md:w-5 md:h-5 text-foreground/50 group-hover:text-secondary group-hover:scale-110 transition-transform`} />
                                    <h3 className={`text-base md:text-2xl font-bold uppercase tracking-tight text-foreground/80 group-hover:text-foreground transition-colors`}>
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">{service.description}</p>
                            </div>
                            <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 text-foreground/20 group-hover:text-foreground group-hover:translate-x-2 transition-all relative z-10 flex-shrink-0`} />
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}
