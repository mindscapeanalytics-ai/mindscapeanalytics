"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Download, Share2, Terminal, Cpu, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const initialArticles = [
    {
        id: 1,
        title: "Autonomous Real Estate: The 2026 Shift",
        date: "2026-05-14",
        niche: "REAL ESTATE",
        readTime: "4 min",
        confidence: 98.4,
        dataPoints: "12.4k",
        status: "PUBLISHED",
        description: "Strategic analysis of the transition from human brokers to autonomous settlement agents, reducing transaction friction by 94%.",
        impact: "+24.2% Margin Efficiency",
        alpha: "High Alpha Potential"
    },
    {
        id: 11,
        title: "Global Supply Chain: Predictive Port Autonomy",
        date: "2026-05-15",
        niche: "LOGISTICS",
        readTime: "5 min",
        confidence: 97.2,
        dataPoints: "84.1k",
        status: "PUBLISHED",
        description: "Deploying maritime agents for zero-idle docking. Our nodes predict congestion 72 hours before arrival.",
        impact: "-18% Operational Cost",
        alpha: "Logistics Optimization V4"
    },
    {
        id: 2,
        title: "Scaling Manufacturing with MSA-Edge Workflows",
        date: "2026-05-12",
        niche: "INDUSTRIAL",
        readTime: "7 min",
        confidence: 96.2,
        dataPoints: "48.1k",
        status: "PUBLISHED",
        description: "Deploying local LLMs for real-time quality control. Our industrial agents identify micro-fractures in high-frequency production lines.",
        impact: "+12.4% Yield Increase",
        alpha: "Nvidia NIM Optimized"
    },
    {
        id: 22,
        title: "Smart Factories: Neural-Gate Predictive Maintenance",
        date: "2026-05-13",
        niche: "INDUSTRIAL",
        readTime: "6 min",
        confidence: 99.4,
        dataPoints: "128k",
        status: "PUBLISHED",
        description: "How autonomous sensor nodes are preventing catastrophic failures in heavy industry before they occur.",
        impact: "Zero Unplanned Downtime",
        alpha: "Industrial Edge v2"
    },
    {
        id: 3,
        title: "FSI-Core: Re-Architecting Banking Infrastructure",
        date: "2026-05-11",
        niche: "FINANCE",
        readTime: "5 min",
        confidence: 99.1,
        dataPoints: "102.4k",
        status: "PUBLISHED",
        description: "Implementation protocol for autonomous reconciliation agents. Reclaiming billions in lost operational efficiency for tier-1 institutions.",
        impact: "+42% Reconciliation Speed",
        alpha: "Financial Core V6"
    },
    {
        id: 4,
        title: "SaaS 4.0: The Rise of Self-Evolving Products",
        date: "2026-05-10",
        niche: "SAAS",
        readTime: "6 min",
        confidence: 97.8,
        dataPoints: "32.6k",
        status: "PUBLISHED",
        description: "How agentic frameworks are replacing static CRUD apps with self-correcting, autonomous user experiences.",
        impact: "Infinite UX Scalability",
        alpha: "Agentic SaaS Layer"
    },
    {
        id: 5,
        title: "Maritime Routing: Neural Port Optimization",
        date: "2026-05-09",
        niche: "LOGISTICS",
        readTime: "8 min",
        confidence: 95.4,
        dataPoints: "89.2k",
        status: "PUBLISHED",
        description: "Predictive docking and cargo distribution via neural nodes, slashing port idle times by 28% for global shipping conglomerates.",
        impact: "-28% Idle Time",
        alpha: "Maritime Intelligence"
    }
];

const NICHES = ["INDUSTRIAL", "FINANCE", "REAL ESTATE", "SAAS", "LOGISTICS"];

export default function NeuralNewsroom() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState(NICHES[0]);
    const [articles, setArticles] = useState(initialArticles);
    const [logs, setLogs] = useState<string[]>([]);
    const [marketIndex, setMarketIndex] = useState(2480.12);
    const [scannedCount, setScannedCount] = useState(128402);

    useEffect(() => {
        const interval = setInterval(() => {
            setScannedCount(prev => prev + Math.floor(Math.random() * 5));
            setMarketIndex(prev => prev + (Math.random() - 0.5) * 2);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const filteredArticles = articles.filter(article =>
        article.niche.toUpperCase() === selectedNiche.toUpperCase()
    );

    const [isRefining, setIsRefining] = useState(false);

    const handleNicheChange = (niche: string) => {
        if (niche === selectedNiche) return;
        setIsRefining(true);
        setSelectedNiche(niche);
        setTimeout(() => setIsRefining(false), 800);
    };

    const statusSequence = [
        "INITIALIZING_AUTOBOT_V4...",
        "SCANNING_GLOBAL_MARKET_SIGNALS...",
        "FILTERING_NOISE_LEVELS_0.04...",
        "IDENTIFYING_VALUATION_GAPS...",
        "SYNTHESIZING_STRATEGIC_LOGIC...",
        "ENCRYPTING_OUTPUT_BUFFER...",
        "PUBLISHING_TO_NEURAL_NETWORK..."
    ];

    const generateArticle = () => {
        if (isGenerating) return;
        setIsGenerating(true);
        setLogs([]);

        let step = 0;
        const interval = setInterval(() => {
            if (step < statusSequence.length) {
                setLogs(prev => [...prev, statusSequence[step]]);
                step++;
            } else {
                clearInterval(interval);
            }
        }, 600);

        setTimeout(() => {
            const titles: Record<string, string[]> = {
                "INDUSTRIAL": ["MSA-Edge: Zero-Latency Factory Control", "Predictive Maintenance at Global Scale", "Autonomous Logistics: The End of Idle Time"],
                "FINANCE": ["FSI-Core: Re-Architecting Banking Infrastructure", "Algorithmic Risk Neutralization in 2026", "DeFi Institutional Bridging Protocols"],
                "REAL ESTATE": ["Tokenized Liquidity: The New Property Standard", "Autonomous Appraisals: Eliminating Bias", "Smart Contract Escrow: 0.2s Settlements"],
                "SAAS": ["The Death of CRUD: Autonomous Product Engines", "Self-Evolving UI/UX at 240FPS", "API-First Architecture for Agentic Growth"],
                "LOGISTICS": ["Last-Mile Autonomy: Beyond Drones", "Supply Chain Self-Correction Nodes", "Maritime Routing: Neural Port Optimization"]
            };

            const nicheTitles = titles[selectedNiche] || [`${selectedNiche} Transformation`];
            const randomTitle = nicheTitles[Math.floor(Math.random() * nicheTitles.length)];

            const newArticle = {
                id: Date.now(),
                title: randomTitle,
                date: new Date().toISOString().split('T')[0],
                niche: selectedNiche,
                readTime: `${Math.floor(Math.random() * 5 + 3)} min`,
                confidence: Number((97 + Math.random() * 2.9).toFixed(1)),
                dataPoints: `${(Math.random() * 80 + 20).toFixed(1)}k`,
                status: "PUBLISHED",
                description: `Strategic analysis on how Mindscape's ${selectedNiche.toLowerCase()} agents are capturing alpha through persistent workflow integration and autonomous decision-making.`,
                impact: `+${(Math.random() * 12 + 4).toFixed(1)}% Valuation Delta`,
                alpha: `${(Math.random() * 40 + 15).toFixed(1)}% Captured`
            };
            setArticles([newArticle, ...articles]);
            setIsGenerating(false);
        }, statusSequence.length * 600 + 500);
    };

    const handleShare = (title: string) => {
        const url = typeof window !== "undefined" ? window.location.href : "https://mindscapeanalytics.ai";
        const shareText = `[MSA_NEURAL_LINK] :: ${title} :: ${url}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            // We could add a toast here, but the alert is a good feedback for now as per institutional style
            alert("NEURAL_LINK_COPIED: Encrypted report access link is now in your clipboard.");
        }
    };

    const handleDownload = (title: string) => {
        alert(`REPORT_GENERATED: ${title}.pdf\nInstitutional clearance granted. Download starting...`);
    };

    const handleDeploy = () => {
        window.location.href = "/shop";
    };

    return (
        <section className="py-16 sm:py-24 md:py-32 bg-transparent relative border-t border-white/5 overflow-hidden">
            <div className="container-standard relative z-10">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

                    {/* Header Side */}
                    <div className="w-full lg:w-1/3 static lg:sticky lg:top-32 space-y-8 lg:space-y-12 mb-12 lg:mb-0">
                        <div>
                            <motion.span className="text-[9px] md:text-[10px] font-mono text-secondary tracking-[0.25em] md:tracking-[0.4em] font-black uppercase mb-4 block not-italic">
                                Autonomous_Content_Engine //
                            </motion.span>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 sm:mb-8 leading-[0.9] not-italic">
                                Neural <br />
                                <span className="text-foreground/40">Newsroom.</span>
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-white/40 font-medium mb-6 sm:mb-10 leading-relaxed uppercase tracking-tighter not-italic">
                                Our agents monitor global market shifts in real-time to generate strategic intelligence. No writers. No delays. Just raw, autonomous foresight for institutional growth.
                            </p>

                            {/* Telemetry Visualizer */}
                            <div className="p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.02] border border-white/10 mb-6 sm:mb-10 overflow-hidden relative group">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest not-italic">Network_Index</p>
                                        <p className="text-xl sm:text-2xl font-black text-white tracking-tighter font-mono not-italic">{marketIndex.toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-black not-italic">+1.24%</p>
                                        <p className="text-[7px] font-mono text-white/20 uppercase not-italic">STABLE</p>
                                    </div>
                                </div>
                                <div className="h-16 flex items-end gap-[1px] sm:gap-[2px]">
                                    {[...Array(24)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: "20%" }}
                                            animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 50}%`, `${20 + Math.random() * 60}%`] }}
                                            transition={{ duration: 1.5 + Math.random(), repeat: Infinity }}
                                            className="flex-1 bg-secondary/20 rounded-t-sm group-hover:bg-secondary/40 transition-colors"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                <div className="space-y-1 border-l border-white/10 pl-4 sm:pl-6">
                                    <p className="text-[9px] sm:text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                                        <Activity size={10} className="text-secondary animate-pulse" /> Global_Scanned
                                    </p>
                                    <p className="text-xl sm:text-2xl font-black text-white tracking-tighter font-mono">{scannedCount.toLocaleString()}</p>
                                </div>
                                <div className="space-y-1 border-l border-white/10 pl-4 sm:pl-6">
                                    <p className="text-[9px] sm:text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-2">
                                        <Zap size={10} className="text-secondary" /> Active_Agents
                                    </p>
                                    <p className="text-xl sm:text-2xl font-black text-secondary tracking-tighter font-mono not-italic">842</p>
                                </div>
                            </div>
                        </div>

                        {/* Niche Selector */}
                        <div className="space-y-4">
                            <label className="text-[8px] sm:text-[9px] font-mono font-black text-foreground/30 uppercase tracking-[0.3em]">Sector_Refinement_Matrix</label>
                            <div className="flex flex-wrap gap-2">
                                {NICHES.map(niche => (
                                    <button
                                        key={niche}
                                        onClick={() => handleNicheChange(niche)}
                                        className={cn(
                                            "px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-[9px] font-black tracking-wider sm:tracking-widest transition-all border uppercase not-italic",
                                            selectedNiche === niche
                                                ? "bg-secondary text-black border-secondary"
                                                : "bg-white/5 text-white/60 border-white/20 hover:border-white/40"
                                        )}
                                    >
                                        {niche}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative group">
                            <button
                                onClick={generateArticle}
                                disabled={isGenerating}
                                className={cn(
                                    "w-full btn-institutional py-4 sm:py-5 group uppercase tracking-[0.15em] sm:tracking-[0.2em] font-black text-[9px] sm:text-[10px] relative overflow-hidden",
                                    isGenerating ? "opacity-50 cursor-wait" : ""
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 sm:gap-4">
                                    {isGenerating ? "NEURAL_LINK_ESTABLISHED" : "INITIALIZE_AUTOBOT_GEN"}
                                    <Sparkles size={14} className={cn("transition-transform", isGenerating ? "animate-spin text-secondary" : "group-hover:rotate-12")} />
                                </span>
                                {isGenerating && (
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 bg-white/10 z-0"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Generation Logs */}
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-5 sm:p-6 rounded-2xl bg-black border border-white/10 font-mono text-[9px] space-y-1 overflow-hidden shadow-2xl"
                                >
                                    {logs.map((log, i) => (
                                        <div key={i} className="flex gap-2.5 sm:gap-3 uppercase">
                                            <span className="text-secondary/40">[{new Date().toLocaleTimeString()}]</span>
                                            <span className="text-white/60 text-[8px] sm:text-[9px]">{log}</span>
                                        </div>
                                    ))}
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="w-1.5 h-3 bg-secondary inline-block ml-1"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Feed Side */}
                    <div className="w-full lg:w-2/3 space-y-8 lg:space-y-12">
                        {/* Live Feed Ticker */}
                        <div className="flex items-center gap-3 sm:gap-6 overflow-hidden bg-white/[0.02] border-y border-white/5 py-3 sm:py-4 px-4 sm:px-8 rounded-full backdrop-blur-md">
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse" />
                                <span className="text-[8px] sm:text-[9px] font-mono font-black text-secondary uppercase tracking-[0.2em] sm:tracking-[0.3em]">LIVE_NETWORK_FEED</span>
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden relative">
                                <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
                                    {[...Array(2)].map((_, i) => (
                                        <React.Fragment key={i}>
                                            {[1, 2, 3, 4, 5, 6, 7].map(n => (
                                                <span key={`${i}-${n}`} className="text-[10px] font-mono text-white/20 uppercase tracking-widest not-italic">
                                                    [AGENT_NODE_{n * 12}] :: SCANNING_{NICHES[n % NICHES.length]} :: {(Math.random() * 100).toFixed(2)}MB_PROCESSED
                                                </span>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {isRefining ? (
                                    <div className="col-span-1 md:col-span-2 py-24 sm:py-32 text-center border border-dashed border-secondary/20 rounded-[2rem] sm:rounded-[3rem] bg-secondary/[0.02] animate-pulse">
                                        <Activity size={36} className="mx-auto text-secondary mb-4 sm:mb-6 animate-spin" />
                                        <p className="text-[9px] sm:text-[10px] font-mono text-secondary uppercase tracking-[0.35em] sm:tracking-[0.5em] font-black">Refining_Sector_Extraction...</p>
                                        <p className="text-[8px] font-mono text-secondary/30 uppercase mt-2">MSA_CORE_V5 // CONNECTING_NODES</p>
                                    </div>
                                ) : filteredArticles.length > 0 ? (
                                    filteredArticles.map((article, i) => (
                                        <motion.div
                                            key={article.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 bg-zinc-950/40 backdrop-blur-xl group hover:border-secondary/20 transition-all flex flex-col justify-between min-h-[320px] sm:min-h-[350px] relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
                                                <Cpu size={140} />
                                            </div>
                                            {/* Scanning Line Animation */}
                                            <motion.div 
                                                initial={{ top: "-10%" }}
                                                animate={{ top: "110%" }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent z-0 opacity-0 group-hover:opacity-100"
                                            />
                                            <div className="space-y-5 sm:space-y-6 relative z-10 flex-grow flex flex-col justify-start">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(var(--secondary),0.5)]" />
                                                        <span className="text-[9px] font-mono font-black text-secondary tracking-[0.2em] sm:tracking-[0.3em] uppercase not-italic">{article.niche}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 sm:gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest not-italic">Confidence</span>
                                                            <span className="text-[11px] sm:text-xs font-mono font-black text-emerald-400 not-italic">{article.confidence}%</span>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest not-italic">Entropy</span>
                                                            <span className="text-[11px] sm:text-xs font-mono font-black text-blue-400 not-italic">{article.dataPoints}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 sm:space-y-4">
                                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tighter uppercase group-hover:text-secondary transition-colors duration-500 not-italic">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-[11px] text-white/30 leading-relaxed font-medium uppercase tracking-tight line-clamp-3 sm:line-clamp-4 not-italic">
                                                        {article.description}
                                                    </p>
                                                    {(article as any).impact && (
                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[7px] sm:text-[8px] font-mono text-emerald-400 uppercase tracking-wider sm:tracking-widest not-italic">
                                                                {(article as any).impact}
                                                            </div>
                                                            <div className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[7px] sm:text-[8px] font-mono text-blue-400 uppercase tracking-wider sm:tracking-widest not-italic">
                                                                {(article as any).alpha}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="pt-6 sm:pt-8 flex flex-col gap-4 border-t border-white/5 mt-6 relative z-10">
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4 sm:gap-6 text-white/20">
                                                        <div className="flex items-center gap-2">
                                                            <Terminal size={12} className="text-secondary/40" />
                                                            <span className="text-[9px] font-mono uppercase tracking-widest not-italic">{article.readTime}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Cpu size={12} className="text-secondary/40" />
                                                            <span className="text-[9px] font-mono uppercase tracking-widest not-italic">Node_V4</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => handleShare(article.title)}
                                                            className="p-2.5 sm:p-3 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                                                        >
                                                            <Share2 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDownload(article.title)}
                                                            className="p-2.5 sm:p-3 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                                                        >
                                                            <Download size={13} />
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={handleDeploy}
                                                    className="w-full py-3.5 rounded-xl bg-secondary text-black font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                                                >
                                                    DEPLOY THIS AGENT
                                                    <Zap size={11} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-1 md:col-span-2 py-24 sm:py-32 text-center border border-dashed border-white/10 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.01]">
                                        <Cpu size={36} className="mx-auto text-white/10 mb-4 sm:mb-6 animate-pulse" />
                                        <p className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-[0.35em] sm:tracking-[0.5em] font-black not-italic">Awaiting_Sector_Intelligence...</p>
                                        <p className="text-[8px] font-mono text-white/10 uppercase mt-2 not-italic">Initialize Autobot for {selectedNiche} extraction</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>

            {/* Ambient Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--secondary)_0%,transparent_70%)] blur-[120px]" />
            </div>
        </section>
    );
}
