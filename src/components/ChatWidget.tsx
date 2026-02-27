"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, ArrowRight, MessageCircle, Cpu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    type: "bot" | "user";
    content: React.ReactNode;
}

const INITIAL_MESSAGE = "Protocol active. I'm the Mindscape AI Assistant. How can I facilitate your inquiry today?";

const RESPONSES = [
    {
        keywords: ["service", "services", "offer", "do you do", "help with"],
        response: "Mindscape Analytics specializes in high-tier architectural solutions:\n• AI Agents & Autonomous Workflows\n• AI Voice Call Agents (Vapi/Retell)\n• Full-Stack SaaS Platforms (Next.js 15)\n• Custom Big Data & Cloud Engineering\n• Payments & Stripe Integration\n• UX/UI Design for Enterprise\n• Business Consultation & Digital Strategy"
    },
    {
        keywords: ["saas", "webapp", "fullstack", "nextjs", "application", "development"],
        response: "We engineer end-to-end SaaS architectures using Next.js 15+, TypeScript, and Prisma. Our builds are type-safe, micro-frontend ready, and optimized for global scale with enterprise-grade security."
    },
    {
        keywords: ["voice", "call", "phone", "vapi", "retell", "dialer", "appointment"],
        response: "Our AI Voice Call Agents use ultra-low latency protocols (Vapi/Retell) for human-like inbound and outbound interactions. They handle appointment booking, contextual reasoning, and direct CRM data pipeline sync."
    },
    {
        keywords: ["payment", "stripe", "checkout", "integration", "gateway", "transaction"],
        response: "We specialize in complex Payment Systems Integration, specifically Stripe 'Acquisition' protocols, custom checkout flows, and secure subscription management architectures for high-volume transactions."
    },
    {
        keywords: ["design", "ux", "ui", "uxui", "interface", "frontend", "visual"],
        response: "Our UX/UI Design philosophy is 'Operation-First'. We build high-fidelity, industrial-grade interfaces that prioritize data density, micro-interactions, and premium aesthetics for enterprise users."
    },
    {
        keywords: ["consult", "strategy", "roadmap", "business", "optimization"],
        response: "Beyond code, we provide Technical Strategic Consultation. We analyze your current stack, identify automation bottlenecks, and define a roadmap for long-term scalability and system reliability."
    },
    {
        keywords: ["automation", "workflow", "n8n", "zapier", "engine", "protocol"],
        response: "We build autonomous engines that replace manual operations. Using n8n and custom Python protocols, we create self-operating systems that manage data, leads, and customer interactions 24/7."
    },
    {
        keywords: ["product", "products", "shop", "asset", "assets", "buy", "template"],
        response: "Our Digital Asset Shop features production-ready boilerplate architectures:\n- AI Agents & RAG Systems\n- Next.js SaaS Templates\n- n8n Automation Workflows\n\nCheck the 'Shop / Ecosystem' page for instant acquisition."
    },
    {
        keywords: ["pricing", "price", "cost", "how much", "fee"],
        response: "We offer transparent, fixed-tier pricing for standard pipelines starting at $999/mo, with custom enterprise architecture scaling based on node requirements. Asset licenses start at $29."
    },
    {
        keywords: ["complex", "human", "team", "agent", "support", "contact", "talk", "whatsapp", "call"],
        response: "For complex architectural inquiries, direct engineer access is required. Please utilize the Secure Contact Form or initiate a direct uplink via WhatsApp using the buttons below."
    },
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", type: "bot", content: INITIAL_MESSAGE }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getLocalResponse = (input: string) => {
        const lowerInput = input.toLowerCase();
        const match = RESPONSES.find(r => r.keywords.some(k => lowerInput.includes(k)));
        return match ? match.response : "Query acknowledged. For advanced architectural technicalities, a direct engineering uplink is recommended. How else can I assist with your Mindscape inquiry?";
    };

    const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
        e?.preventDefault();

        const textToProcess = overrideText || inputValue;
        if (!textToProcess.trim() || isLoading) return;

        const userMsg = textToProcess.trim();
        setInputValue("");
        setIsLoading(true);

        const newUserMsg: Message = { id: Date.now().toString(), type: "user", content: userMsg };
        setMessages(prev => [...prev, newUserMsg]);

        try {
            const history = messages.map(m => ({
                role: m.type === "user" ? "user" : "assistant",
                content: typeof m.content === "string" ? m.content : ""
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...history, { role: "user", content: userMsg }]
                })
            });

            if (!response.ok) throw new Error("Uplink timeout");

            const data = await response.json();

            if (data.content) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: "bot", content: data.content }]);
            } else {
                throw new Error("No content received");
            }
        } catch (error) {
            console.warn("AI Uplink failed, switching to local tactical response:", error);
            const fallbackContent = getLocalResponse(userMsg);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: "bot",
                content: `[Tactical Fallback] ${fallbackContent}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const QuickAction = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <button
            onClick={onClick}
            className="text-[9px] font-black uppercase tracking-widest text-white/40 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:text-white transition-all text-left whitespace-nowrap active:scale-95"
        >
            {label}
        </button>
    );

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[420px] bg-[#0a0a0b]/98 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto relative group"
                        style={{ height: "min(700px, calc(100vh - 100px))" }}
                    >
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                        {/* Header */}
                        <div className="w-full flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10">
                                        <Bot size={20} className="text-white/80" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0b] animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Mindscape_Intelligence</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2 mt-0.5">
                                        v2.4 // SECURE_UPLINK
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-3 text-white/20 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pb-32">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-4 max-w-[90%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={cn(
                                                "w-8 h-8 rounded-xl flex items-center justify-center border transition-colors",
                                                msg.type === "user" ? "bg-white/5 border-white/10" : "bg-white border-white"
                                            )}>
                                                {msg.type === "user" ? (
                                                    <User size={14} className="text-white/60" />
                                                ) : (
                                                    <Cpu size={14} className="text-black" />
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "p-4 rounded-2xl text-[12px] leading-relaxed font-medium whitespace-pre-wrap shadow-xl",
                                                msg.type === "user"
                                                    ? "bg-white/5 border border-white/10 text-white rounded-tr-none uppercase tracking-tight"
                                                    : "bg-white text-black rounded-tl-none tracking-tight font-semibold"
                                            )}
                                        >
                                            {typeof msg.content === 'string' ? (
                                                msg.content.split('\n').map((line, i) => {
                                                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<b class="font-black">$1</b>');
                                                    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                        const bulletContent = line.trim().substring(1).trim();
                                                        return (
                                                            <div key={i} className="flex gap-3 items-start my-1.5 pl-1">
                                                                <span className={cn("mt-1.5 w-1 h-1 rounded-full", msg.type === "user" ? "bg-white/40" : "bg-black/30")} />
                                                                <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[•-]\s*/, '') }} />
                                                            </div>
                                                        );
                                                    }
                                                    return <div key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                                                })
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex w-full justify-start mt-4"
                                >
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-white animate-pulse">
                                            <Bot size={14} className="text-black" />
                                        </div>
                                        <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Floating Action Bar (Sticky-bottom behavior) */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b] to-transparent pt-12">
                            {/* Suggestions */}
                            <div className="flex overflow-x-auto gap-2 mb-4 no-scrollbar pb-2 mask-edges-faint">
                                <QuickAction label="Our Services" onClick={() => handleSend(undefined, "Our Services")} />
                                <QuickAction label="Shop Assets" onClick={() => handleSend(undefined, "Shop Assets")} />
                                <QuickAction label="Pricing" onClick={() => handleSend(undefined, "Pricing Models")} />
                            </div>

                            {/* Interaction Area */}
                            <div className="flex flex-col gap-4">
                                <form onSubmit={handleSend} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        disabled={isLoading}
                                        placeholder={isLoading ? "ARCHITECTING..." : "TRANSMIT QUERY..."}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] text-white placeholder:text-white/20 font-black tracking-widest focus:outline-none focus:border-white/30 transition-all uppercase disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isLoading}
                                        className="px-6 bg-white text-black rounded-2xl hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center active:scale-95"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>

                                {/* System Shortcuts */}
                                <div className="grid grid-cols-2 gap-3">
                                    <a
                                        href="https://wa.me/13072106155"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-[#25D366]"
                                    >
                                        <MessageCircle size={14} />
                                        WhatsApp
                                    </a>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white"
                                    >
                                        Contact
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all pointer-events-auto border border-white/10 group relative overflow-hidden",
                    isOpen ? "bg-white/10 text-white" : "bg-white text-black"
                )}
            >
                {/* Background pulse effect */}
                {!isOpen && (
                    <span className="absolute inset-0 bg-white opacity-20 animate-ping [animation-duration:3s]" />
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="flex items-center justify-center"
                        >
                            <MessageSquare size={32} className="group-hover:scale-110 transition-transform" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
