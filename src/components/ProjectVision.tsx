"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- Types ---
interface ProjectData {
    title: string;
    category: string;
    description: string;
    metrics: string;
    image: string;
    details: string[];
}

// --- Animation Helpers ---
const IMG_WIDTH = 120;
const IMG_HEIGHT = 170;

// --- Projects Data ---
const PROJECTS: ProjectData[] = [
    {
        title: "DisposIQ",
        category: "Industrial Intelligence",
        metrics: "99.99% Uptime • 14ms Latency • AES-256",
        description: "Enterprise-grade production and disposal intelligence platform. Real-time SKU throughput, automated waste classification, ML-powered forecasting, and comprehensive audit trails for global operations.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/production-and-disposal-mindsacpeanalytics-0KgazmuLyRIeuG0SgU6UilsnTwSRj8.png",
        details: ["Production Tracking", "Waste Classification", "Predictive Analytics", "Audit Trails", "Multi-tenant Security"]
    },
    {
        title: "Smart DairyFarm",
        category: "AgriTech Management",
        metrics: "Real-time Monitoring • Smart Yield Analytics",
        description: "Intelligent dairy farm management system. Monitor active animals, milk production metrics, feed costs, health records, and financial performance. Optimize profitability with AI-driven insights and automated task scheduling.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dairy_farm_mindscapeanalytics-MV3Don0b2Ko36NfHJ88vpk3I2jioO7.png",
        details: ["Animal Management", "Milk Production", "Health Records", "Financial Analytics", "IoT Integration"]
    },
    {
        title: "RSIQ Pro",
        category: "FinTech Trading Signals",
        metrics: "Real-Time Analysis • 500+ Indicators • Live Alerts",
        description: "Advanced real-time trading signal solution with 500+ technical indicators and customizable strategies. Sentiment analysis, market bias detection, multi-exchange support (Binance, Bybit), and AI-powered trade guidance for optimal decision-making.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rsiq-mindscapeanalytics-12xQXu3FV2JRsszTGtDb9kLLih0jbf.png",
        details: ["Technical Indicators", "Sentiment Analysis", "Multi-Exchange", "Signal Generation", "Strategy Backtesting"]
    },
    {
        title: "CyberTrader-X",
        category: "Autonomous Trading",
        metrics: "Auto-Execution • Risk Management • 24/7 Trading",
        description: "Autonomous trading system for crypto, forex, and metals. Supports intraday, swing, and scalping strategies with advanced customization. Real-time risk management, automated execution, and AI-powered trade intelligence for daily consistent profits.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/traderX-mindscapeanalytics-ADXDXT7XN4Pk6u1vkIm4cSUVYwAsoT.png",
        details: ["Auto-Trading Engine", "Multi-Asset Support", "Risk Bots", "Live Execution", "Trade Analytics"]
    },
    {
        title: "TENVO",
        category: "Enterprise Business Hub",
        metrics: "Real-time POS • Intelligent Operations • Multi-Module",
        description: "Advanced intelligent business growth solution. Unified POS with real-time inventory sync, sales invoicing, customer management, and financial intelligence. Complete operational control hub with predictive restocking and campaign intelligence.",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenvo-mindscapeanalytics-i8yPGcLjz8sebUqi8WUA1mq0BDGdmP.png",
        details: ["POS System", "Inventory Management", "Sales Analytics", "CRM Integration", "Financial Dashboard"]
    }
];


export default function ProjectVision() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Animation Physics - Smoothed for performance ---
    const springConfig = { stiffness: 60, damping: 40, mass: 1, restDelta: 0.005 };

    // Mouse Parallax for the environment
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 40;
            const y = (clientY / window.innerHeight - 0.5) * 40;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const activeProject = PROJECTS[activeIndex];

    return (
        <section
            id="project-vision"
            ref={containerRef}
            className="relative w-full min-h-screen bg-transparent py-24 px-6 overflow-hidden flex flex-col items-center justify-center"
        >
            {/* --- Cinematic Background --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Unified grid handle globally by CinematicBackground component */}

                {/* Localized Glow Spot (Reactive) - Consolidated and Optimized for GPU */}
                <motion.div
                    style={{
                        x: useTransform(smoothMouseX, (v: number) => v * 1.5),
                        y: useTransform(smoothMouseY, (v: number) => v * 1.5)
                    }}
                    className="absolute z-0 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none transform-gpu"
                />
            </div>

            <div className="container-wide flex flex-col gap-12">
                {/* --- Section Header --- */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(252,223,3,0.8)]" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Production // Flagship_Products_v2026</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter font-syncopate uppercase">
                            OUR <span className="text-yellow-400/80">PRODUCTS</span>
                        </h2>
                    </div>
                    <div className="hidden lg:block text-right font-mono text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                        <div className="flex items-center justify-end gap-2 mb-2">
                            <span className="text-yellow-400/60 font-bold">●</span>
                            <span className="text-yellow-400/60">LIVE</span>
                        </div>
                        Data flow: optimal <br />
                        Latency: 0.04ms <br />
                        Protocol: mindscape-enterprise-v2026
                    </div>
                </div>

                {/* --- Main Dashboard Container --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-px bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl overflow-hidden border border-yellow-400/20 backdrop-blur-3xl shadow-[0_8px_32px_rgba(252,223,3,0.08)]">
                    {/* 1. Left Rail: Project Selector (Adaptive) */}
                    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-yellow-400/15 p-4 bg-gradient-to-b from-white/[0.04] to-transparent no-scrollbar">
                        <div className="hidden lg:block text-[8px] font-mono text-white/20 uppercase tracking-widest mb-6 px-4 shrink-0">Registry Select</div>
                        <div className="flex flex-row lg:flex-col gap-1 shrink-0">
                            {PROJECTS.map((project, i) => (
                                <button
                                    key={i}
                                    onMouseEnter={() => setIsHovering(i)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    onClick={() => setActiveIndex(i)}
                                    className={cn(
                                        "group relative w-full text-left px-5 py-3 transition-all duration-300 rounded-xl flex items-center justify-between",
                                        activeIndex === i 
                                            ? "bg-gradient-to-r from-yellow-400/15 to-yellow-400/5 border border-yellow-400/30 shadow-[0_0_16px_rgba(252,223,3,0.1)]" 
                                            : "hover:bg-white/[0.04] border border-transparent hover:border-yellow-400/10"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={cn(
                                            "font-mono text-[10px] transition-colors",
                                            activeIndex === i ? "text-white" : "text-white/20"
                                        )}>
                                            0{i + 1}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-[10px] xs:text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap lg:whitespace-normal",
                                                activeIndex === i ? "text-white" : "text-white/40 group-hover:text-white/60"
                                            )}>
                                                {project.title}
                                            </span>
                                            <span className="text-[8px] font-mono text-white/20 group-hover:text-white/30 transition-colors uppercase pt-0.5">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className={cn(
                                        "w-3 h-3 transition-all duration-300",
                                        activeIndex === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                    )} />

                                    {activeIndex === i && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 w-1.5 h-1/2 bg-gradient-to-b from-yellow-400 to-yellow-400/40 rounded-r-full shadow-[0_0_12px_rgba(252,223,3,0.8)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Center: Active Project Monitor */}
                    <div className="relative min-h-[350px] xs:min-h-[450px] lg:min-h-[700px] bg-gradient-to-br from-white/[0.02] via-transparent to-yellow-400/[0.02] p-6 lg:p-12 flex items-center justify-center group overflow-hidden lg:border-r border-yellow-400/15 border-b lg:border-b-0">
                        {/* Monitor Border Elements */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-yellow-400/40" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-yellow-400/40" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-yellow-400/40" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-yellow-400/40" />

                        {/* Top Metadata */}
                        <div className="absolute top-6 left-10 right-10 flex justify-between items-center z-20">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 border border-yellow-400/40 text-yellow-300 text-[8px] font-mono font-bold rounded-lg uppercase">Live_Feed</div>
                                <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.4em] leading-none pt-0.5">Source: Enterprise_Node_0x{activeIndex.toString(16)}</span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className={cn("w-1 h-3", i < 2 ? "bg-yellow-400/60" : "bg-white/20")} />)}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="relative w-full h-full flex flex-col items-center justify-center"
                            >
                                {/* Main Image Container */}
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-yellow-400/30 shadow-[0_0_60px_rgba(252,223,3,0.15)] group-hover:border-yellow-400/50 group-hover:shadow-[0_0_80px_rgba(252,223,3,0.25)] transition-all duration-700 transform-gpu">
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        fill
                                        className="object-cover transition-all duration-1000 group-hover:scale-110"
                                        priority={activeIndex < 3}
                                        loading={activeIndex < 3 ? "eager" : "lazy"}
                                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-yellow-400/10 opacity-70" />

                                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                                        <span className="text-[8px] font-mono text-yellow-300/80 uppercase tracking-[0.3em] font-black">Terminal_Enterprise // ACTIVE</span>
                                        <div className="w-12 h-[1px] bg-gradient-to-r from-yellow-400/60 to-yellow-400/10" />
                                    </div>

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none opacity-20">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                                    </div>
                                    {/* HUD Elements */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        {/* Crosshair */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center opacity-20">
                                            <div className="w-full h-px bg-white" />
                                            <div className="h-full w-px bg-white absolute" />
                                            <div className="w-8 h-8 border border-white rounded-full" />
                                        </div>

                                        {/* Corner Brackets */}
                                        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white opacity-40" />
                                        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white opacity-40" />
                                    </div>
                                </div>

                                {/* Floating Detail Label - Positioned strategically for mobile accessibility */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative lg:absolute mt-6 lg:mt-0 lg:bottom-[-20px] lg:left-10 lg:right-auto p-4 lg:p-6 bg-gradient-to-br from-white/[0.12] to-white/[0.04] backdrop-blur-3xl border border-yellow-400/30 rounded-2xl max-w-full lg:max-w-sm z-30 shadow-[0_8px_32px_rgba(252,223,3,0.12)]"
                                >
                                    <h4 className="text-white text-lg lg:text-xl font-black uppercase tracking-tighter mb-1 lg:mb-2">{activeProject.title}</h4>
                                    <p className="text-white/40 text-[9px] lg:text-[10px] leading-relaxed font-mono uppercase tracking-tight">{activeProject.description}</p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 3. Right Panel: Technical Readout */}
                    <div className="flex flex-col p-8 bg-gradient-to-b from-white/[0.04] to-yellow-400/[0.03] gap-10">
                        {/* Metrics Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-yellow-400/20 pb-4">
                                <span className="text-[10px] font-mono text-yellow-300/70 uppercase tracking-widest font-bold">Key Metrics</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-1 h-2", i < 4 ? "bg-yellow-400/70" : "bg-white/10")} />)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-[9px] font-mono text-white/30 uppercase mb-1">Performance_Data</div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-400/15 to-yellow-400/5 border border-yellow-400/25 font-mono">
                                    <div className="text-white/90 text-xs font-bold mb-1">{activeProject.metrics}</div>
                                    <div className="text-yellow-300/60 text-[7px] uppercase tracking-widest">Confidence Interval: 99.8%</div>
                                </div>
                            </div>
                        </div>

                        {/* Sub-Systems Section */}
                        <div className="space-y-6">
                            <span className="text-[10px] font-mono text-yellow-300/70 uppercase tracking-widest block border-b border-yellow-400/20 pb-4 font-bold">Internal Systems</span>
                            <div className="space-y-3">
                                {activeProject.details.map((detail: string, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: 10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                        className="flex items-center justify-between group/sys"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full border border-yellow-400/40 flex items-center justify-center">
                                                <div className="w-0.5 h-0.5 bg-yellow-400/70 rounded-full" />
                                            </div>
                                            <span className="text-[10px] font-bold text-white/70 group-hover/sys:text-yellow-300 transition-colors">{detail}</span>
                                        </div>
                                        <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "70%" }}
                                                className="h-full bg-gradient-to-r from-yellow-400/60 to-yellow-400/20"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-auto space-y-4 pt-10 border-t border-yellow-400/20">
                            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:from-yellow-300 hover:to-yellow-200 transition-all group/view shadow-[0_4px_24px_rgba(252,223,3,0.25)] hover:shadow-[0_6px_32px_rgba(252,223,3,0.35)]">
                                EXPLORE PRODUCT
                                <ExternalLink className="w-4 h-4" />
                            </button>
                            <div className="flex items-center justify-between px-2">
                                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Protocol: Enterprise_2026</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(252,223,3,0.6)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Bottom Footer Info --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-yellow-400/15">
                    <div className="flex items-center gap-6">
                        <div className="text-[9px] font-mono text-yellow-300/80 pb-1 border-b border-yellow-400/40 uppercase tracking-widest font-bold">Enterprise_Access_Verified</div>
                        <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest hidden md:block">Org_ID: MSA_Enterprise_2026</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-1 opacity-70">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-4 h-4 rounded-full border border-yellow-400/40 bg-gradient-to-br from-yellow-400/30 to-yellow-400/10" />
                            ))}
                        </div>
                        <span className="text-[9px] font-mono text-white/50 uppercase">Deployment_Status: Live</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
