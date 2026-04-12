"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
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
    status?: "live" | "coming-soon";
    link?: string;
}

// --- Animation Helpers ---
const IMG_WIDTH = 120;
const IMG_HEIGHT = 170;

// --- Projects Data ---
const PROJECTS: ProjectData[] = [
    {
        title: "DisposIQ",
        category: "Enterprise Intelligence",
        metrics: "Zero Data Loss • Real-time Sync",
        description: "Next-gen production and disposal management ecosystem for enterprise-scale industrial operations.",
        image: "/images/projects/disposiq.webp",
        details: ["Smart Reconciliation", "Autonomous Logging", "Multi-site Sync"],
        status: "live",
        link: "https://disposiq.mindscapeanalytics.com/"
    },
    {
        title: "Smart DairyFarm",
        category: "Agri-Tech Platform",
        metrics: "ROI +35% • Live Monitoring",
        description: "Comprehensive OS for modern dairy farms, managing everything from herd health to milk production lifecycles.",
        image: "/images/projects/smart-dairy.webp",
        details: ["Herd Intelligence", "Milk Cycle Automation", "Feed Inventory AI"],
        status: "live",
        link: "https://cattle.mindscapeanalytics.com/"
    },
    {
        title: "RSIQ Pro",
        category: "FinTech Intelligence",
        metrics: "High-Confluence • Real-time Alert",
        description: "Advanced scanning and signal generation platform for institutional-grade market analysis.",
        image: "/images/projects/rsiq-pro.webp",
        details: ["Multi-indicator Confluence", "Sentiment AI", "Custom Alert Engine"],
        status: "live",
        link: "https://rsiq.mindscapeanalytics.com/"
    },
    {
        title: "Tenvo",
        category: "Business Hub",
        metrics: "Coming Soon • Scaling Ops",
        description: "Advanced intelligent solution designed to automate and accelerate business growth trajectories.",
        image: "/images/projects/tenvo.webp",
        details: ["Growth Automation", "Predictive Analytics", "CRM Intelligence"],
        status: "coming-soon",
        link: "https://tenvo.mindscapeanalytics.com/"
    },
    {
        title: "CyberTrader-X",
        category: "Autonomous Trading",
        metrics: "Coming Soon • Daily Alpha",
        description: "Cutting-edge autonomous system for high-frequency trading across Forex, Crypto, and Metals.",
        image: "/images/projects/cybertrader-x.webp",
        details: ["Intraday Intelligence", "Swing Scaling", "Metals Precision"],
        status: "coming-soon",
        link: "https://traderx.mindscapeanalytics.com/"
    },
    {
        title: "Enterprise ERP",
        category: "Industrial Management",
        metrics: "ROI +450% • AI Forecast",
        description: "Comprehensive 2026 ERP suite for large-scale operations with global supply chain visibility.",
        image: "/images/projects/enterprise-erp_opt.webp",
        details: ["AI Forecasting", "Supply Chain Viz", "Resource Planning"]
    },
    {
        title: "Super Market ERP",
        category: "Retail Tech",
        metrics: "Zero Leakage • 100K SKUs",
        description: "Unified Retail intelligence platform combining POS precision with backend ERP automation.",
        image: "/images/projects/supermarket-pos_opt.webp",
        details: ["Stock Tracking", "Predictive Procurement", "SKU Synchronization"]
    },
    {
        title: "Fuel Station ERP",
        category: "Energy Tech",
        metrics: "Elite Security • Live Tracking",
        description: "Mission-critical Fuel Station management system with automated pump synchronization.",
        image: "/images/projects/fuel-station-erp_opt.webp",
        details: ["Pump Sync", "Hazardous Tracking", "Auto-Accounting"]
    },
    {
        title: "CryptoTrader Pro",
        category: "FinTech",
        metrics: "Auto-Execution • Risk Bot",
        description: "High-frequency algorithmic trading platform with deep liquidity integration.",
        image: "/images/projects/cryptotrader2_opt.webp",
        details: ["Algorithmic Trading", "Liquidity Integration", "AI Signal Auditing"]
    },
    {
        title: "VisionScan AI",
        category: "Computer Vision",
        metrics: "Auto-Label • QA Mode",
        description: "Multi-modal model training platform with advanced auto-labeling and integrity checks.",
        image: "/images/projects/image_annotation_tool_opt.webp",
        details: ["Dataset Preparation", "Integrated QA", "Auto-Labeling Engine"]
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
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Subsystem // Archive_Port_01</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter font-syncopate uppercase">
                            PROJECT <span className="text-white/20">VISION</span>
                        </h2>
                    </div>
                    <div className="hidden lg:block text-right font-mono text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
                        Data flow: nominal <br />
                        Latency: 0.04ms <br />
                        Protocol: mindscape-v4-industrial
                    </div>
                </div>

                {/* --- Main Dashboard Container --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/5 backdrop-blur-xl">
                    {/* 1. Left Rail: Project Selector (Adaptive) */}
                    <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-white/5 p-4 bg-transparent/40 no-scrollbar">
                        <div className="hidden lg:block text-[8px] font-mono text-white/20 uppercase tracking-widest mb-6 px-4 shrink-0">Registry Select</div>
                        <div className="flex flex-row lg:flex-col gap-1 shrink-0">
                            {PROJECTS.map((project, i) => (
                                <button
                                    key={i}
                                    onMouseEnter={() => setIsHovering(i)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    onClick={() => setActiveIndex(i)}
                                    className={cn(
                                        "group relative w-full text-left px-5 py-3 transition-all duration-300 rounded-lg flex items-center justify-between",
                                        activeIndex === i ? "bg-white/5 border border-white/10" : "hover:bg-white/[0.02]"
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
                                            className="absolute left-0 w-1 h-1/2 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Center: Active Project Monitor */}
                    <div className="relative min-h-[350px] xs:min-h-[450px] lg:min-h-[700px] bg-transparent p-6 lg:p-12 flex items-center justify-center group overflow-hidden lg:border-r border-white/5 border-b lg:border-b-0">
                        {/* Monitor Border Elements */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />

                        {/* Top Metadata */}
                        <div className="absolute top-6 left-10 right-10 flex justify-between items-center z-20">
                            <div className="flex items-center gap-3">
                                <div className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/60 text-[8px] font-mono rounded uppercase">Live_Feed</div>
                                <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em] leading-none pt-0.5">Source: Archive_Node_0x{activeIndex.toString(16)}</span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-white/10" />)}
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
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-all duration-700 transform-gpu">
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        fill
                                        className={cn(
                                            "object-cover transition-all duration-1000 group-hover:scale-110",
                                            activeProject.status === "coming-soon" && "opacity-50 grayscale"
                                        )}
                                        priority={activeIndex < 3}
                                        loading={activeIndex < 3 ? "eager" : "lazy"}
                                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    {activeProject.status === "coming-soon" && (
                                        <div className="absolute inset-0 flex items-center justify-center z-30">
                                            <div className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                                                Coming Soon
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
                                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em] font-black">
                                            {activeProject.status === "coming-soon" ? "Terminal_A // STAGED" : "Terminal_A // READY"}
                                        </span>
                                        <div className="w-12 h-[1px] bg-white/10" />
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
                                    className="relative lg:absolute mt-6 lg:mt-0 lg:bottom-[-20px] lg:left-10 lg:right-auto p-4 lg:p-6 bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-2xl max-w-full lg:max-w-sm z-30 shadow-2xl"
                                >
                                    <h4 className="text-white text-lg lg:text-xl font-black uppercase tracking-tighter mb-1 lg:mb-2">{activeProject.title}</h4>
                                    <p className="text-white/40 text-[9px] lg:text-[10px] leading-relaxed font-mono uppercase tracking-tight">{activeProject.description}</p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 3. Right Panel: Technical Readout */}
                    <div className="flex flex-col p-8 bg-transparent/40 gap-10">
                        {/* Metrics Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Key Metrics</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-1 h-2", i < 4 ? "bg-white/60" : "bg-white/10")} />)}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-[9px] font-mono text-white/30 uppercase mb-1">Performance_Data</div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono">
                                    <div className="text-white/80 text-xs font-bold mb-1">{activeProject.metrics}</div>
                                    <div className="text-white/20 text-[7px] uppercase tracking-widest">Confidence Interval: 99.4%</div>
                                </div>
                            </div>
                        </div>

                        {/* Sub-Systems Section */}
                        <div className="space-y-6">
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block border-b border-white/10 pb-4">Internal Systems</span>
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
                                            <div className="w-1.5 h-1.5 rounded-full border border-white/20 flex items-center justify-center">
                                                <div className="w-0.5 h-0.5 bg-white/60 rounded-full" />
                                            </div>
                                            <span className="text-[10px] font-bold text-white/60 group-hover/sys:text-white transition-colors">{detail}</span>
                                        </div>
                                        <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "70%" }}
                                                className="h-full bg-white/30"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-auto space-y-4 pt-10 border-t border-white/10">
                            {activeProject.link ? (
                                <Link
                                    href={activeProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/90 transition-all group/view shadow-[0_4px_20px_rgba(255,255,255,0.1)]",
                                        activeProject.status === "coming-soon" && "opacity-50 pointer-events-none"
                                    )}
                                >
                                    {activeProject.status === "coming-soon" ? "ACCESS STAGED" : "VISIT PLATFORM"}
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            ) : (
                                <button className="w-full flex items-center justify-between p-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/90 transition-colors group/view shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                                    VIEW CORE CODE
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            )}
                            <div className="flex items-center justify-between px-2">
                                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Protocol: 02.AF.91</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Bottom Footer Info --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-white/5 opacity-40">
                    <div className="flex items-center gap-6">
                        <div className="text-[9px] font-mono text-white pb-1 border-b border-white/40 uppercase tracking-widest">SECURE_LINK: MINDSCAPE_ACCESS_GRANTED</div>
                        <div className="text-[9px] font-mono text-white/60 uppercase tracking-widest hidden md:block">USER_ID: 0x882_ADM</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-1 grayscale opacity-50">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-4 h-4 rounded-full border border-black bg-zinc-800" />
                            ))}
                        </div>
                        <span className="text-[9px] font-mono text-white/40 uppercase">ACTIVE_USERS: 12.4K</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
