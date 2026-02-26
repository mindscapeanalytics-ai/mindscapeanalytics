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

            const data = await response.json();

            if (data.content) {
                setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: "bot", content: data.content }]);
            } else {
                throw new Error("No content received");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                type: "bot",
                content: "Uplink interrupted. Please utilize the WhatsApp or Contact Form for direct architectural support."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const QuickAction = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <button
            onClick={onClick}
            className="text-[9px] font-black uppercase tracking-widest text-white/50 border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors text-left whitespace-nowrap"
        >
            {label}
        </button>
    );

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[calc(100vw-48px)] sm:w-[380px] bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
                        style={{ height: "min(600px, calc(100vh - 120px))" }}
                    >
                        {/* Header */}
                        <div className="w-full flex items-center justify-between p-4 border-b border-white/5 bg-gradient-to-r from-white/[0.05] to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                                    <Bot size={18} className="text-indigo-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Mindscape AI</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-green-400 flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        System Online
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className="flex-shrink-0 mt-1">
                                            {msg.type === "user" ? (
                                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                                    <User size={12} className="text-white/60" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                                    <Cpu size={12} className="text-indigo-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "p-3 rounded-2xl text-[11px] leading-relaxed font-medium whitespace-pre-wrap",
                                                msg.type === "user"
                                                    ? "bg-white text-black rounded-tr-sm uppercase tracking-tighter"
                                                    : "bg-white/[0.03] border border-white/5 text-white/80 rounded-tl-sm tracking-tight"
                                            )}
                                        >
                                            {typeof msg.content === 'string' ? (
                                                msg.content.split('\n').map((line, i) => {
                                                    // Simple bolding: **text** -> <strong>text</strong>
                                                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
                                                    // Simple bullet points: • or - -> Custom Bullet
                                                    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                        const bulletContent = line.trim().substring(1).trim();
                                                        return (
                                                            <div key={i} className="flex gap-2 items-start my-1">
                                                                <span className="text-blue-500 mt-1">•</span>
                                                                <span dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[•-]\s*/, '') }} />
                                                            </div>
                                                        );
                                                    }
                                                    return <div key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
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
                                    className="flex w-full justify-start mt-2"
                                >
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 animate-pulse">
                                            <Bot size={12} className="text-indigo-400" />
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/5 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions & Links Area */}
                        <div className="p-3 border-t border-white/5 flex flex-col gap-3 shrink-0 bg-white/[0.01]">
                            {/* Suggestion Pills */}
                            <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar mask-edges">
                                <QuickAction label="Our Services" onClick={() => handleSend(undefined, "Tell me about your services")} />
                                <QuickAction label="Shop Assets" onClick={() => handleSend(undefined, "What products do you have?")} />
                                <QuickAction label="Pricing" onClick={() => handleSend(undefined, "How much does it cost?")} />
                            </div>

                            {/* Direct Contact Buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="https://wa.me/13072106155"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 transition-colors text-[9px] font-black uppercase tracking-widest text-[#25D366]"
                                >
                                    <MessageCircle size={12} />
                                    WhatsApp
                                </a>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[9px] font-black uppercase tracking-widest text-white/70 hover:text-white"
                                >
                                    Contact Form
                                    <ArrowRight size={10} />
                                </Link>
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 border-t border-white/5 flex gap-2 shrink-0 bg-black/50">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                                placeholder={isLoading ? "THINKING..." : "TRANSMIT QUERY..."}
                                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[10px] text-white placeholder:text-white/20 font-black tracking-widest focus:outline-none focus:border-white/30 transition-all uppercase disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isLoading}
                                className="p-2.5 bg-white text-black rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                            >
                                <Send size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Bubble */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all pointer-events-auto border border-white/10 group relative",
                    isOpen ? "bg-white/10 text-white" : "bg-white text-black"
                )}
            >
                {/* Ping animation when closed */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping" />
                )}

                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />}
            </motion.button>
        </div>
    );
}
