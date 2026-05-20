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
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth < 1024) return;

            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 40;
                const y = (clientY / window.innerHeight - 0.5) * 40;
                mouseX.set(x);
                mouseY.set(y);
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [mouseX, mouseY]);

    const activeProject = PROJECTS[activeIndex];

    return (
        <section
            id="project-vision"
            ref={containerRef}
            className="relative w-full min-h-screen bg-transparent py-12 lg:py-24 px-4 lg:px-6 overflow-hidden flex flex-col items-center justify-center institutional-grid"
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
                    className="absolute z-0 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-foreground/[0.02] blur-[100px] lg:blur-[120px] rounded-full pointer-events-none transform-gpu"
                />
            </div>

            <div className="container-standard flex flex-col gap-8 lg:gap-12">
                {/* --- Section Header --- */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 border-b border-border pb-6 lg:pb-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start space-y-3 lg:space-y-4">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background dark:bg-foreground/[0.03] border border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-sm backdrop-blur-md">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_hsl(var(--secondary) / 0.6)]" />
                            <span className="text-[8px] lg:text-meta uppercase font-mono tracking-widest text-foreground/80 dark:text-foreground/40">Subsystem // Archive_Port_01</span>
                        </div>
                        <h2 className="fluid-h2">
                            PROJECT <span className="text-secondary drop-shadow-[0_0_15px_hsl(var(--secondary) / 0.3)]">VISION</span>
                        </h2>
                    </div>
                    <div className="hidden lg:block text-right font-mono text-[9px] text-foreground/60 dark:text-foreground/40 uppercase tracking-widest leading-relaxed">
                        Data flow: nominal <br />
                        Latency: 0.04ms <br />
                        Protocol: mindscape-v4-industrial
                    </div>
                </div>

                {/* --- Main Dashboard Container --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-px rounded-2xl overflow-hidden border border-border/80 backdrop-blur-2xl bg-card dark:bg-[#0f0f11]">
                    {/* 1. Left Rail: Project Selector (Adaptive) */}
                    <div className="relative flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-border p-2 lg:p-4 bg-transparent/40 no-scrollbar snap-x snap-mandatory lg:snap-none [mask-image:linear-gradient(to_right,transparent,foreground_10%,foreground_90%,transparent)] lg:[mask-image:none]">
                        <div className="text-[7px] lg:text-[8px] font-mono text-foreground/20 uppercase tracking-widest mb-4 lg:mb-6 px-4 shrink-0">Registry Select</div>
                        
                        <div className="flex flex-row lg:flex-col gap-1 shrink-0 px-[30vw] lg:px-0">
                            {PROJECTS.map((project, i) => (
                                <button
                                    key={i}
                                    onMouseEnter={() => setIsHovering(i)}
                                    onMouseLeave={() => setIsHovering(null)}
                                    onClick={() => setActiveIndex(i)}
                                    className={cn(
                                        "group relative min-w-[140px] lg:min-w-0 text-left px-4 lg:px-5 py-2.5 lg:py-3 transition-all duration-300 rounded-lg flex items-center justify-between snap-center",
                                        activeIndex === i ? "bg-foreground/5 border border-border" : "hover:bg-foreground/[0.02]"
                                    )}
                                >
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <span className={cn(
                                            "font-mono text-[9px] lg:text-[10px] transition-colors",
                                            activeIndex === i ? "text-foreground" : "text-foreground/20"
                                        )}>
                                            0{i + 1}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-[9px] lg:text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap lg:whitespace-normal",
                                                activeIndex === i ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/60"
                                            )}>
                                                {project.title}
                                            </span>
                                            <span className="text-[7px] lg:text-[8px] font-mono text-foreground/10 lg:text-foreground/20 group-hover:text-foreground/30 transition-colors uppercase pt-0.5">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className={cn(
                                        "hidden lg:block w-3 h-3 transition-all duration-300",
                                        activeIndex === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                    )} />

                                    {activeIndex === i && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute bottom-0 lg:bottom-auto lg:left-0 w-full lg:w-1 h-0.5 lg:h-1/2 bg-foreground lg:rounded-r-full shadow-[0_0_8px_hsl(var(--foreground)/0.8)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Center: Active Project Monitor */}
                    <div className="relative min-h-[300px] xs:min-h-[400px] lg:min-h-[700px] bg-transparent p-4 lg:p-12 flex items-center justify-center group overflow-hidden lg:border-r border-border border-b lg:border-b-0">
                        {/* Monitor Border Elements */}
                        <div className="absolute top-4 left-4 w-3 h-3 lg:w-4 lg:h-4 border-t border-l border-foreground/20" />
                        <div className="absolute top-4 right-4 w-3 h-3 lg:w-4 lg:h-4 border-t border-r border-foreground/20" />
                        <div className="absolute bottom-4 left-4 w-3 h-3 lg:w-4 lg:h-4 border-b border-l border-foreground/20" />
                        <div className="absolute bottom-4 right-4 w-3 h-3 lg:w-4 lg:h-4 border-b border-r border-foreground/20" />

                        {/* Top Metadata */}
                        <div className="absolute top-4 lg:top-6 left-8 lg:left-10 right-8 lg:right-10 flex justify-between items-center z-20">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="px-1.5 py-0.5 bg-foreground/5 border border-border text-foreground/60 text-[7px] lg:text-[8px] font-mono rounded uppercase">Live_Feed</div>
                                <span className="text-[7px] lg:text-[8px] font-mono text-foreground/20 uppercase tracking-[0.4em] leading-none pt-0.5">0x{activeIndex.toString(16)}</span>
                            </div>
                            <div className="flex gap-0.5 lg:gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-0.5 lg:w-1 h-2 lg:h-3 bg-foreground/10" />)}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x;
                                    if (swipe < -50 && activeIndex < PROJECTS.length - 1) {
                                        setActiveIndex(activeIndex + 1);
                                    } else if (swipe > 50 && activeIndex > 0) {
                                        setActiveIndex(activeIndex - 1);
                                    }
                                }}
                                className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transform-gpu"
                            >
                                {/* Main Image Container */}
                                <div className="relative w-full aspect-video rounded-xl lg:rounded-2xl overflow-hidden border border-border shadow-[0_0_30px_rgba(0,0,0,0.5)] lg:shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-foreground/20 transition-all duration-700">
                                    <Image
                                        src={activeProject.image}
                                        alt={activeProject.title}
                                        fill
                                        className={cn(
                                            "object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0",
                                            activeProject.status === "coming-soon" && "opacity-50"
                                        )}
                                        priority={activeIndex < 3}
                                        loading={activeIndex < 3 ? "eager" : "lazy"}
                                        sizes="(max-width: 768px) 95vw, (max-width: 1200px) 60vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                                    {activeProject.status === "coming-soon" && (
                                        <div className="absolute inset-0 flex items-center justify-center z-30">
                                            <div className="px-4 py-1.5 lg:px-6 lg:py-2 bg-foreground/10 backdrop-blur-md border border-border rounded-full text-foreground text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                                                Coming Soon
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Swipe Hint */}
                                    <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30 animate-pulse z-20">
                                        <div className="w-8 h-[1px] bg-foreground/40" />
                                        <span className="text-[6px] font-mono text-foreground uppercase tracking-widest whitespace-nowrap">Swipe to Navigate</span>
                                        <div className="w-8 h-[1px] bg-foreground/40" />
                                    </div>

                                    {/* Corner Brackets */}
                                    <div className="absolute inset-0 pointer-events-none p-4 lg:p-6">
                                        <div className="absolute top-4 lg:top-6 left-4 lg:left-6 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-foreground opacity-20 lg:opacity-40" />
                                        <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-6 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-foreground opacity-20 lg:opacity-40" />
                                    </div>
                                </div>

                                {/* Detail Label - Enhanced for Mobile HUD feel */}
                                <motion.div
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative lg:absolute mt-4 lg:mt-0 lg:-bottom-5 lg:left-10 p-4 lg:p-6 bg-foreground/[0.03] backdrop-blur-2xl border border-border rounded-xl lg:rounded-2xl w-full lg:max-w-sm z-30 shadow-2xl"
                                >
                                    <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                        <div className="w-1 h-1 bg-foreground rounded-full animate-pulse" />
                                        <h4 className="text-foreground text-base lg:text-xl font-black uppercase tracking-tighter leading-none not-italic">{activeProject.title}</h4>
                                    </div>
                                    <p className="text-foreground/40 text-[9px] lg:text-[10px] leading-relaxed font-mono uppercase tracking-tight">{activeProject.description}</p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 3. Right Panel: Technical Readout */}
                    <div className="flex flex-col p-6 lg:p-8 bg-transparent/40 gap-8 lg:gap-10">
                        {/* Mobile Grid Layout for Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-10">
                             {/* Metrics Section */}
                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="text-[8px] lg:text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Key Metrics</span>
                                    <div className="hidden lg:flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-1 h-2", i < 4 ? "bg-foreground/60" : "bg-foreground/10")} />)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-[7px] lg:text-[9px] font-mono text-foreground/20 uppercase mb-1 tracking-widest">Performance_Data</div>
                                    <div className="p-3 lg:p-4 rounded-xl bg-foreground/5 border border-border font-mono">
                                        <div className="text-foreground/80 text-[10px] lg:text-xs font-bold mb-1">{activeProject.metrics}</div>
                                        <div className="text-foreground/10 text-[6px] lg:text-[7px] uppercase tracking-widest">Confidence Interval: 99.4%</div>
                                    </div>
                                </div>
                            </div>

                            {/* Sub-Systems Section */}
                            <div className="space-y-4 lg:space-y-6">
                                <span className="text-[8px] lg:text-[10px] font-mono text-foreground/40 uppercase tracking-widest block border-b border-border pb-3">Internal Systems</span>
                                <div className="space-y-2.5 lg:space-y-3">
                                    {activeProject.details.map((detail: string, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ x: 5, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 + (idx * 0.1) }}
                                            className="flex items-center justify-between group/sys"
                                        >
                                            <div className="flex items-center gap-2 lg:gap-3">
                                                <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full border border-border flex items-center justify-center">
                                                    <div className="w-0.5 h-0.5 bg-foreground/40 rounded-full" />
                                                </div>
                                                <span className="text-[9px] lg:text-[10px] font-bold text-foreground/50 group-hover/sys:text-foreground transition-colors">{detail}</span>
                                            </div>
                                            <div className="h-0.5 lg:h-1 w-6 lg:w-8 bg-foreground/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "70%" }}
                                                    className="h-full bg-foreground/20"
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-8 lg:mt-auto space-y-4 pt-6 lg:pt-10 border-t border-border">
                            {activeProject.link ? (
                                <Link
                                    href={activeProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 lg:p-4 bg-foreground text-background text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-all group/view shadow-[0_4px_20px_hsl(var(--foreground) / 0.1)] not-italic",
                                        activeProject.status === "coming-soon" && "opacity-50 pointer-events-none"
                                    )}
                                >
                                    {activeProject.status === "coming-soon" ? "ACCESS STAGED" : "VISIT PLATFORM"}
                                    <ExternalLink className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </Link>
                            ) : (
                                <button className="w-full flex items-center justify-between p-3 lg:p-4 bg-foreground text-background text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-colors group/view shadow-[0_4px_20px_hsl(var(--foreground) / 0.1)] not-italic">
                                    VIEW CORE CODE
                                    <ExternalLink className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </button>
                            )}
                            <div className="flex items-center justify-between px-2">
                                <span className="text-[7px] lg:text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Protocol: 02.AF.91</span>
                                <div className="flex gap-1.5 lg:gap-2">
                                    <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-foreground/10" />
                                    <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-foreground/40 animate-pulse shadow-[0_0_8px_hsl(var(--foreground)/0.4)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Bottom Footer Info --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 lg:py-8 border-t border-border opacity-40">
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
                        <div className="text-[7px] lg:text-[9px] font-mono text-foreground pb-1 border-b border-foreground/20 lg:border-foreground/40 uppercase tracking-widest text-center lg:text-left">SECURE_LINK: MINDSCAPE_ACCESS_GRANTED</div>
                        <div className="text-[7px] lg:text-[9px] font-mono text-foreground/40 uppercase tracking-widest hidden md:block">USER_ID: 0x882_ADM</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-1 grayscale opacity-30">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-3 h-3 lg:w-4 lg:h-4 rounded-full border border-background bg-foreground/20" />
                            ))}
                        </div>
                        <span className="text-[7px] lg:text-[9px] font-mono text-foreground/20 uppercase tracking-widest">ACTIVE_USERS: 12.4K</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
