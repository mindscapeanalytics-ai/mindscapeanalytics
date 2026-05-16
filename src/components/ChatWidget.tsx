"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Mail } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: number;
}

const GREETING = `Welcome to Mindscape Analytics! I'm the AI Architect - your gateway to enterprise automation, voice agents, and full-stack SaaS solutions.\n\nHow can I help transform your business today?`;

const LEAD_PROMPT_THRESHOLD = 3; // Ask for email after 3 exchanges

const formatMarkdown = (text: string) => {
    if (!text) return { __html: '' };
    let html = text
        .replace(/###\s+(.*?)(?=\n|$)/g, '<h3 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-foreground/80 font-bold">$1</em>')
        .replace(/-\s+(.*?)(?=\n|$)/g, '<li class="ml-4 list-disc my-1">$1</li>')
        .replace(/---/g, '<hr class="my-4 border-border opacity-50" />')
        .replace(/\n/g, '<br />')
        // Clean breaks around block elements
        .replace(/(<br \/>)+<h3/g, '<h3')
        .replace(/<\/h3>(<br \/>)+/g, '</h3>')
        .replace(/(<br \/>)+<li/g, '<li')
        .replace(/<\/li>(<br \/>)+/g, '</li>')
        .replace(/(<br \/>)+<hr/g, '<hr')
        .replace(/hr(.*?)>(<br \/>)+/g, 'hr$1>');
    return { __html: html };
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: GREETING, timestamp: Date.now() },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showLeadCapture, setShowLeadCapture] = useState(false);
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [exchangeCount, setExchangeCount] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, showLeadCapture]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Show lead capture after threshold exchanges
    useEffect(() => {
        if (exchangeCount >= LEAD_PROMPT_THRESHOLD && !leadCaptured && !showLeadCapture) {
            setShowLeadCapture(true);
        }
    }, [exchangeCount, leadCaptured, showLeadCapture]);

    const captureLead = useCallback(async () => {
        if (!leadEmail.trim()) return;
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: leadEmail,
                    source: "chat",
                    message: messages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
                    metadata: { exchangeCount, capturedAt: new Date().toISOString() },
                }),
            });
            setLeadCaptured(true);
            setShowLeadCapture(false);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `Thank you! I've noted your email (${leadEmail}). Our architects will follow up with a personalized proposal within 24 hours. Feel free to continue chatting!`,
                timestamp: Date.now(),
            }]);
        } catch {
            setShowLeadCapture(false);
        }
    }, [leadEmail, messages, exchangeCount]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed, timestamp: Date.now() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        // Check if user provided email in message
        const emailMatch = trimmed.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch && !leadCaptured) {
            try {
                fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailMatch[0],
                        source: "chat",
                        message: updatedMessages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
                    }),
                });
                setLeadCaptured(true);
                setShowLeadCapture(false);
            } catch { }
        }

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) throw new Error("API error");
            const data = await res.json();

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.content || "I'd be happy to help. Could you tell me more about your specific needs?",
                timestamp: Date.now(),
            }]);
            setExchangeCount(prev => prev + 1);
        } catch {
            // Intelligent local fallback
            const lower = trimmed.toLowerCase();
            let fallback = "That's an excellent question. Our team at Mindscape Analytics specializes in exactly this area. Would you like to schedule a strategy call?";
            if (lower.includes("price") || lower.includes("cost")) {
                fallback = "Our solutions start at $999/month for standard automation packages. Enterprise tiers include custom AI agents, voice integration, and dedicated support. Want a detailed quote?";
            } else if (lower.includes("voice") || lower.includes("agent")) {
                fallback = "We deploy autonomous AI voice agents using Vapi and Retell that handle sales, support, and appointment booking 24/7. They integrate with your CRM and process calls in real-time.";
            } else if (lower.includes("automation") || lower.includes("n8n")) {
                fallback = "We architect n8n automation workflows that connect 400+ apps — CRM sync, lead nurturing, invoice processing, and more. Most clients see 60-80% time savings.";
            }
            setMessages(prev => [...prev, { role: "assistant", content: fallback, timestamp: Date.now() }]);
            setExchangeCount(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 md:w-16 md:h-16 bg-foreground text-background rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:scale-110 transition-transform group"
                        aria-label="Open AI Chat"
                    >
                        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-4 right-4 z-[10000] w-[calc(100vw-32px)] sm:w-[420px] h-[min(620px,85vh)] bg-background border border-border rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-foreground/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-foreground/5 border border-border flex items-center justify-center relative">
                                    <Bot className="w-5 h-5 text-foreground/60" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">AI Architect</h3>
                                    <p className="text-[9px] font-mono text-foreground/40 tracking-widest uppercase">MSA AGENT • ONLINE</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-foreground/5 flex items-center justify-center transition-colors">
                                <X className="w-4 h-4 text-foreground/40" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "assistant" && (
                                        <div className="w-6 h-6 rounded-lg bg-foreground/5 border border-border flex items-center justify-center shrink-0 mt-1">
                                            <Sparkles className="w-3 h-3 text-secondary" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-foreground text-background rounded-br-md"
                                            : "bg-foreground/[0.04] border border-border text-foreground/80 rounded-bl-md"
                                        }`}>
                                        {msg.role === "assistant" ? (
                                            <div dangerouslySetInnerHTML={formatMarkdown(msg.content)} className="space-y-1" />
                                        ) : (
                                            msg.content.split("\n").map((line, li) => (
                                                <p key={li} className={li > 0 ? "mt-2" : ""}>{line}</p>
                                            ))
                                        )}
                                    </div>
                                    {msg.role === "user" && (
                                        <div className="w-6 h-6 rounded-lg bg-foreground flex items-center justify-center shrink-0 mt-1">
                                            <User className="w-3 h-3 text-background" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-2.5">
                                    <div className="w-6 h-6 rounded-lg bg-foreground/5 border border-border flex items-center justify-center shrink-0">
                                        <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-foreground/[0.04] border border-border rounded-bl-md flex items-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin text-foreground/30" />
                                        <span className="text-xs text-foreground/30 font-mono">Processing...</span>
                                    </div>
                                </div>
                            )}

                            {/* Lead Capture Prompt */}
                            <AnimatePresence>
                                {showLeadCapture && !leadCaptured && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-4 space-y-3"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-secondary" />
                                            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Get a Personalized Proposal</p>
                                        </div>
                                        <p className="text-xs text-foreground/50">Drop your email and our architects will send you a custom strategy within 24 hours.</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                value={leadEmail}
                                                onChange={(e) => setLeadEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="flex-1 h-9 px-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary"
                                                onKeyDown={(e) => { if (e.key === "Enter") captureLead(); }}
                                            />
                                            <button onClick={captureLead} className="h-9 px-4 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/80 transition-colors uppercase tracking-wider">
                                                Send
                                            </button>
                                        </div>
                                        <button onClick={() => setShowLeadCapture(false)} className="text-[10px] text-foreground/30 hover:text-foreground/50 transition-colors">
                                            Maybe later
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Bar */}
                        <div className="px-4 py-3 border-t border-border bg-foreground/[0.01]">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                    placeholder="Ask about AI automation, pricing, voice agents..."
                                    className="flex-1 h-11 px-4 rounded-xl bg-foreground/[0.03] border border-border text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary/50 transition-colors"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors disabled:opacity-30 disabled:hover:bg-foreground shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
