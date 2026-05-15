"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Zap, Activity, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { generateAutomationRoadmap } from "@/app/_actions/roadmap";
import { cn } from "@/lib/utils";

export default function AgenticHeroScanner() {
    const [input, setInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isAnalyzing) return;

        const userMsg = input;
        setInput("");
        setHistory(prev => [...prev, { type: 'user', text: userMsg }]);
        setIsAnalyzing(true);

        const response = await generateAutomationRoadmap(userMsg);

        if (response.success && response.roadmap) {
            setHistory(prev => [...prev, { type: 'bot', text: response.roadmap! }]);
            setResult(response.roadmap);
        } else {
            setHistory(prev => [...prev, { type: 'bot', text: "ERROR: NEURAL_LINK_FAILURE. Retrying connection..." }]);
        }
        setIsAnalyzing(false);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isAnalyzing]);

    return (
        <section className="relative py-12 lg:py-24 overflow-hidden bg-transparent">
            <div className="container-standard px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header Label */}
                    <div className="flex flex-col items-center mb-12 text-center">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border/40 backdrop-blur-md mb-6">
                            <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                            <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase text-foreground/40">Live_Agent // SANDBOX_V1.0</span>
                        </div>
                        <h3 className="text-2xl lg:text-5xl font-black uppercase tracking-tighter text-foreground mb-4">
                            STOP GUESSING. <span className="text-secondary">START AUTOMATING.</span>
                        </h3>
                        <p className="text-sm lg:text-lg font-medium text-foreground/40 max-w-2xl">
                            Tell our architect agent about a manual bottleneck in your business. It will build a technical roadmap using NVIDIA NIM logic in seconds.
                        </p>
                    </div>

                    {/* Terminal UI */}
                    <div className="relative group">
                        {/* Outer Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-white/5 to-secondary/20 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        
                        <div className="relative rounded-[2rem] border border-white/10 bg-zinc-950/80 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col min-h-[450px]">
                            {/* Terminal Top Bar */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3 h-3 text-secondary animate-pulse" />
                                        <span className="text-[9px] font-mono text-secondary/60 tracking-widest font-black uppercase">Core_Active</span>
                                    </div>
                                    <div className="h-4 w-px bg-white/10" />
                                    <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">ID: MSA_SCOUTER_ALPHA</span>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 p-6 lg:p-10 font-mono text-sm overflow-y-auto space-y-6 custom-scrollbar"
                                style={{ maxHeight: '400px' }}
                            >
                                {history.length === 0 && !isAnalyzing && (
                                    <div className="space-y-6 opacity-60">
                                        <p className="text-secondary tracking-widest uppercase font-black">{">"} INITIALIZING MISTRAL_LARGE_3 (675B) PROTOCOL...</p>
                                        <p className="text-white/60">Awaiting input. Enter a URL or describe a bottleneck.</p>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                "https://example.com (Analyze my site)",
                                                "I spend 10h/week on LinkedIn lead gen",
                                                "Automate my customer support emails",
                                                "Setup a voice agent for appointment booking"
                                            ].map((prompt, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => setInput(prompt)}
                                                    className="text-left p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-secondary/10 hover:border-secondary/30 transition-all text-[10px] text-white/40 hover:text-white"
                                                >
                                                    {prompt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {history.map((msg, i) => (
                                    <div key={i} className={cn(
                                        "flex flex-col space-y-2",
                                        msg.type === 'user' ? "items-end" : "items-start"
                                    )}>
                                        <div className={cn(
                                            "max-w-[85%] p-4 rounded-2xl text-xs lg:text-sm",
                                            msg.type === 'user' 
                                                ? "bg-secondary/10 border border-secondary/20 text-white" 
                                                : "bg-white/[0.03] border border-white/5 text-white/80 whitespace-pre-wrap leading-relaxed shadow-xl"
                                        )}>
                                            {msg.type === 'bot' && (
                                                <div className="flex items-center gap-2 mb-3 text-secondary">
                                                    <Cpu className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Mistral_675B_Analysis</span>
                                                </div>
                                            )}
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                {isAnalyzing && (
                                    <div className="flex items-center gap-4 text-secondary animate-pulse">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Quantum_Inference // NVIDIA_NIM // MISTRAL_L3_675B</span>
                                    </div>
                                )}
                            </div>

                            {/* Terminal Input */}
                            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                                <form onSubmit={handleAnalyze} className="relative group/input">
                                    <input 
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter URL or manual process description..."
                                        disabled={isAnalyzing}
                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-6 py-4 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all disabled:opacity-50"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={isAnalyzing || !input.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-secondary text-white hover:scale-110 active:scale-95 transition-all disabled:opacity-0"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                                <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-widest">
                                    <span>Model: Mistral-Large-3-675B-Instruct-2512</span>
                                    <span className="text-secondary/40">Inference Status: Optimal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
