"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Zap, Activity, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { generateAutomationRoadmap } from "@/app/_actions/roadmap";
import { cn } from "@/lib/utils";

const formatMarkdown = (text: string) => {
    if (!text) return { __html: '' };
    
    // Parse tables first
    let parsedText = text;
    if (parsedText.includes('|')) {
        const lines = parsedText.split('\n');
        let inTable = false;
        const newLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('|') && line.endsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    newLines.push('<div class="overflow-x-auto my-4 rounded-xl border border-white/10"><table class="w-full text-sm text-left border-collapse">');
                }
                // Check if it's a separator line like |---|---|
                if (line.match(/^\|(?:\s*[-:]+\s*\|)+$/)) {
                    continue; // Skip separator line
                }
                
                const cells = line.split('|').filter((_, index, array) => index !== 0 && index !== array.length - 1);
                
                newLines.push('<tr class="border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] transition-colors">');
                cells.forEach((cell, index) => {
                    const content = cell.trim();
                    // If it's the first row of the table, treat as header
                    if (newLines.length === 2) { 
                         newLines.push(`<th class="px-4 py-3 font-bold bg-white/[0.05] border-r border-white/10 last:border-r-0 text-white">${content}</th>`);
                    } else {
                         newLines.push(`<td class="px-4 py-3 border-r border-white/10 last:border-r-0 text-white/80">${content}</td>`);
                    }
                });
                newLines.push('</tr>');
            } else {
                if (inTable) {
                    inTable = false;
                    newLines.push('</table></div>');
                }
                newLines.push(lines[i]);
            }
        }
        if (inTable) {
            newLines.push('</table></div>');
        }
        parsedText = newLines.join('\n');
    }

    let html = parsedText
        .replace(/###\s+(.*?)(?=\n|$)/g, '<h3 class="text-base font-bold mt-4 mb-2 text-white">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<span class="text-white/80 font-bold">$1</span>')
        .replace(/-\s+(.*?)(?=\n|$)/g, '<li class="ml-4 list-disc my-1">$1</li>')
        .replace(/---/g, '<hr class="my-4 border-white/10 opacity-50" />')
        .replace(/\n/g, '<br />')
        // Clean breaks around block elements
        .replace(/(<br \/>)+<h3/g, '<h3')
        .replace(/<\/h3>(<br \/>)+/g, '</h3>')
        .replace(/(<br \/>)+<li/g, '<li')
        .replace(/<\/li>(<br \/>)+/g, '</li>')
        .replace(/(<br \/>)+<hr/g, '<hr')
        .replace(/hr(.*?)>(<br \/>)+/g, 'hr$1>')
        // Clean breaks around tables
        .replace(/(<br \/>)+<div class="overflow-x-auto/g, '<div class="overflow-x-auto')
        .replace(/<\/div>(<br \/>)+/g, '</div>');
        
    return { __html: html };
};

export default function AgenticHeroScanner() {
    const [input, setInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
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
            setHistory(prev => [...prev, { type: 'bot', text: "ERROR: NEURAL LINK FAILURE. Retrying connection..." }]);
        }
        setIsAnalyzing(false);
    };

    const captureAuditLead = async () => {
        if (!leadEmail.trim()) return;
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: leadEmail,
                    source: "audit_scanner",
                    service: "AI Automation Roadmap",
                    message: `Roadmap generated: ${result?.slice(0, 500) || "N/A"}`,
                }),
            });
            setLeadCaptured(true);
        } catch {}
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isAnalyzing]);

    return (
        <section className="relative py-12 lg:py-24 overflow-hidden bg-transparent">
            <div className="container-standard">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Column 1: Header Content */}
                    <div className="flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border/40 backdrop-blur-md mb-8">
                            <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                            <span className="text-[10px] font-mono font-black tracking-[0.3em] uppercase text-foreground/40">LIVE AGENT // SANDBOX V1.0</span>
                        </div>
                        <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-6 leading-[0.9]">
                            STOP GUESSING. <br />
                            <span className="text-secondary drop-shadow-[0_0_20px_hsl(var(--secondary) / 0.2)]">START AUTOMATING.</span>
                        </h2>
                        <p className="text-base lg:text-xl font-medium text-foreground/40 max-w-xl leading-relaxed uppercase tracking-tighter mb-8">
                            Tell our architect agent about a manual bottleneck in your business. It will build a technical roadmap using Mindscape Agent logic in seconds.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/[0.02] border border-border/30">
                                <Zap className="w-4 h-4 text-secondary" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/60">Instant Inference</span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/[0.02] border border-border/30">
                                <Cpu className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/60">SOTA Reasoning</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Terminal UI */}
                    <div className="relative group">
                        {/* Outer Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-white/5 to-secondary/20 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                        
                        <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-950/80 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
                            {/* Terminal Top Bar */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3 h-3 text-secondary animate-pulse" />
                                        <span className="text-[9px] font-mono text-secondary/60 tracking-widest font-black uppercase">CORE ACTIVE</span>
                                    </div>
                                    <div className="h-4 w-px bg-white/10" />
                                    <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase">ID: MSA SCOUTER ALPHA</span>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 p-6 lg:p-8 font-mono text-sm overflow-y-auto space-y-6 custom-scrollbar"
                                style={{ maxHeight: '420px' }}
                            >
                                {history.length === 0 && !isAnalyzing && (
                                    <div className="space-y-6 opacity-60">
                                        <p className="text-secondary tracking-widest uppercase font-black">{">"} INITIALIZING MINDSCAPE AGENT PROTOCOL...</p>
                                        <p className="text-white/60">Awaiting input. Enter a URL or describe a bottleneck.</p>
                                        
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                "https://example.com (Analyze my site)",
                                                "I spend 10h/week on LinkedIn lead gen",
                                                "Automate my customer support emails",
                                                "Set up a voice agent for appointment booking"
                                            ].map((prompt, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => setInput(prompt)}
                                                    className="text-left p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-secondary/10 hover:border-secondary/30 transition-all text-[10px] text-white/40 hover:text-white group/btn"
                                                >
                                                    <span className="opacity-0 group-hover:opacity-100 mr-2 text-secondary"> {">"} </span>
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
                                            "max-w-[90%] p-4 rounded-2xl text-xs lg:text-sm",
                                            msg.type === 'user' 
                                                ? "bg-secondary/10 border border-secondary/20 text-white" 
                                                : "bg-white/[0.03] border border-white/5 text-white/80 whitespace-pre-wrap leading-relaxed shadow-xl"
                                        )}>
                                            {msg.type === 'bot' && (
                                                <div className="flex items-center gap-2 mb-3 text-secondary">
                                                    <Cpu className="w-4 h-4" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">MINDSCAPE AGENT ANALYSIS</span>
                                                </div>
                                            )}
                                            {msg.type === 'bot' ? (
                                                <div dangerouslySetInnerHTML={formatMarkdown(msg.text)} className="space-y-1" />
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isAnalyzing && (
                                    <div className="flex items-center gap-4 text-secondary animate-pulse">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">QUANTUM INFERENCE // MINDSCAPE AGENT</span>
                                    </div>
                                )}

                                {/* Lead Capture After Result */}
                                {result && !leadCaptured && !isAnalyzing && (
                                    <div className="mt-4 p-5 rounded-xl bg-secondary/10 border border-secondary/20 space-y-4">
                                        <p className="text-[10px] font-mono font-black text-secondary uppercase tracking-widest">📧 Get Full Report + Implementation Blueprint</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                value={leadEmail}
                                                onChange={(e) => setLeadEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="flex-1 h-10 px-4 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-secondary/50"
                                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); captureAuditLead(); } }}
                                            />
                                            <button onClick={captureAuditLead} className="h-10 px-6 rounded-lg bg-secondary text-white text-[10px] font-black uppercase tracking-wider hover:bg-secondary/80 transition-colors">
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {leadCaptured && (
                                    <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                                        ✓ Report queued. Our architects will deliver the full blueprint within 24h.
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
                                        className="w-full bg-zinc-900/40 border border-white/10 rounded-xl px-6 py-4 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all disabled:opacity-50"
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
                                    <span className="hidden">Model: Mistral-Large-3-675B-Instruct-2512</span>
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
