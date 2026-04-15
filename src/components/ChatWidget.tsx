"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
        keywords: ["service", "services", "offer", "do you do", "help with", "capabilities"],
        response: "**[UPLINK]** Mindscape Analytics specializes in high-tier architectural solutions with industrial focus:\n• **AI Employee Studio**: AI Recruiters, Insurance Advisors, and Knowledge Partners.\n• **FSI Suite**: EKYC, Device Anti-fraud, and Risk Engines for Banking.\n• **Operational Core**: Enterprise n8n automation & Master RAG pipelines.\n• **SaaS Engineering**: Next.js 15+ Full-Stack architectures.\n• **Voice & Visual**: Vapi/Retell Voice Agents and AvatarGPT interfaces."
    },
    {
        keywords: ["ai employee", "recruiter", "hiring", "avatar", "agent studio", "workforce"],
        response: "**[UPLINK]** Our AI Employee Studio deploys autonomous digital workers via **AvatarGPT** or **VoiceGPT**. We specialize in **AI Recruiters** and **Sales Advisors** that handle contextual reasoning and CRM integration with 99% accuracy. Acquire the Blueprint in our Shop."
    },
    {
        keywords: ["banking", "fintech", "lending", "insurance", "fsi", "ekyc", "fraud"],
        response: "**[UPLINK]** Our FSI Suite provides specialized protocols for high-security environments. Key nodes include **EKYC** (Frictionless Verification) and **Device Anti-fraud** logic. These are modeled after elite international banking standards (Dyna-Brain Protocol)."
    },
    {
        keywords: ["saas", "webapp", "fullstack", "nextjs", "application", "development"],
        response: "**[UPLINK]** We engineer end-to-end SaaS architectures using **Next.js 15**, TypeScript, and Prisma. Our builds are type-safe, micro-frontend ready, and optimized for infinite scaling."
    },
    {
        keywords: ["voice", "call", "vapi", "retell", "dialer", "voicegpt"],
        response: "**[UPLINK]** We deploy ultra-low latency **Voice Agents** using Vapi/Retell. These agents handle inbound/outbound appointment booking and contextual strategic reasoning without human intervention."
    },
    {
        keywords: ["automation", "workflow", "n8n", "zapier", "engine"],
        response: "**[UPLINK]** We build autonomous engines using **n8n** and custom Python nodes. Our systems manage lead flow, data governance, and operational synchronization 24/7."
    },
    {
        keywords: ["shop", "buy", "asset", "template", "blueprint", "license"],
        response: "**[UPLINK]** The **Mindscape Asset Shop** facilitates direct acquisition of production-ready boilerplate architectures: AI Recruiters, SaaS Boilerplates, and custom n8n Workflows. Review our Ecosystem for instant uplink."
    },
    {
        keywords: ["pricing", "price", "cost", "how much"],
        response: "**[UPLINK]** Tactical pricing models:\n• **Asset Licensing**: From $29 (One-time)\n• **Standard Pipeline**: From $999/mo\n• **Enterprise Architecture**: Custom scoped via Strategic Audit."
    },
    {
        keywords: ["contact", "talk", "whatsapp", "call", "human", "consult"],
        response: "**[UPLINK]** Redirecting to Direct Engineering Uplink. For high-priority architectural consultation, utilize the Secure WhatsApp uplink (+1 307 210 6155) or the Contact Form."
    },
];

const QuickAction = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="text-[9px] font-black uppercase tracking-widest text-foreground/40 border border-border rounded-full px-4 py-2 hover:bg-foreground/10 hover:text-foreground transition-all text-left whitespace-nowrap active:scale-95"
    >
        {label}
    </button>
);

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
        return match ? match.response : "Query decrypted. For advanced architectural specifications beyond local cache, a Direct Engineering Uplink is recommended. How else can I assist with your Mindscape inquiry?";
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

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end pointer-events-none">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="mb-4 w-[calc(100vw-32px)] sm:w-[420px] bg-background/98 dark:bg-[#0a0a0b]/98 backdrop-blur-2xl border border-border rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col pointer-events-auto relative group"
                        style={{ height: "min(700px, calc(100vh - 100px))" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                        <div className="w-full flex items-center justify-between p-6 border-b border-border bg-foreground/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-white shadow-lg relative flex items-center justify-center">
                                        <div className="relative w-full h-full p-[3px]">
                                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                                <Image 
                                                    src="/images/zeeshan-keerio-chat-app-acon.png" 
                                                    alt="Mindscape AI" 
                                                    fill 
                                                    className="object-cover object-center scale-[0.9]" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0b] animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Mindscape_Intelligence</span>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-foreground/30 flex items-center gap-2 mt-0.5">
                                        v2.4 // SECURE_UPLINK
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-3 text-foreground/20 hover:text-foreground hover:bg-foreground/5 rounded-2xl transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

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
                                                "w-8 h-8 rounded-full flex items-center justify-center border transition-colors overflow-hidden bg-zinc-950",
                                                msg.type === "user" ? "bg-foreground/5 border-border" : "border-white/10 shadow-lg"
                                            )}>
                                                {msg.type === "user" ? (
                                                    <User size={14} className="text-foreground/60" />
                                                ) : (
                                                    <div className="relative w-full h-full bg-white flex items-center justify-center">
                                                        <div className="relative w-full h-full p-[3px]">
                                                            <div className="relative w-full h-full rounded-full overflow-hidden">
                                                                <Image 
                                                                    src="/images/zeeshan-keerio-chat-app-acon.png" 
                                                                    alt="Agent" 
                                                                    fill 
                                                                    className="object-cover object-center scale-[0.9]" 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={cn(
                                                "p-4 rounded-2xl text-[12px] leading-relaxed font-medium whitespace-pre-wrap shadow-xl",
                                                msg.type === "user"
                                                    ? "bg-foreground/5 border border-border text-foreground rounded-tr-none uppercase tracking-tight"
                                                    : "bg-foreground text-background rounded-tl-none tracking-tight font-semibold"
                                            )}
                                        >
                                            {typeof msg.content === 'string' ? (
                                                msg.content.split('\n').map((line, i) => {
                                                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<b class="font-black">$1</b>');
                                                    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                                                        return (
                                                            <div key={i} className="flex gap-3 items-start my-1.5 pl-1">
                                                                <span className={cn("mt-1.5 w-1 h-1 rounded-full", msg.type === "user" ? "bg-foreground/40" : "bg-black/30")} />
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
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-border animate-pulse overflow-hidden relative shadow-lg">
                                            <div className="relative w-full h-full p-[2px]">
                                                <div className="relative w-full h-full rounded-full overflow-hidden">
                                                    <Image 
                                                        src="/images/zeeshan-keerio-chat-app-acon.png" 
                                                        alt="Agent" 
                                                        fill 
                                                        className="object-cover object-center scale-[0.9] opacity-80" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-foreground/5 border border-border px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b] to-transparent pt-12">
                            <div className="flex overflow-x-auto gap-2 mb-4 no-scrollbar pb-2 mask-edges-faint">
                                <QuickAction label="Our Services" onClick={() => handleSend(undefined, "Our Services")} />
                                <QuickAction label="Shop Assets" onClick={() => handleSend(undefined, "Shop Assets")} />
                                <QuickAction label="Pricing" onClick={() => handleSend(undefined, "Pricing Models")} />
                            </div>

                            <div className="flex flex-col gap-4">
                                <form onSubmit={handleSend} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        disabled={isLoading}
                                        placeholder={isLoading ? "ARCHITECTING..." : "TRANSMIT QUERY..."}
                                        className="flex-1 bg-foreground/5 border border-border rounded-2xl px-6 py-4 text-[11px] text-foreground placeholder:text-foreground/20 font-black tracking-widest focus:outline-none focus:border-white/30 transition-all uppercase disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isLoading}
                                        className="px-6 bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center active:scale-95"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>

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
                                        className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-border transition-all text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground"
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

            <motion.div 
                whileHover="hover"
                className="flex flex-row items-center gap-2 pointer-events-auto mb-4"
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.9 }}
                            variants={{
                                hover: { opacity: 1, x: 0, scale: 1 }
                            }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="hidden sm:flex items-center gap-2 bg-background/60 backdrop-blur-md border border-border px-3 py-1.5 rounded-full shadow-xl"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/80">
                                Chat Now
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center outline-none"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                className="z-10 flex items-center justify-center bg-foreground rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-2xl"
                            >
                                <X size={24} className="text-secondary" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: [0, -10, 0],
                                    transition: {
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }
                                }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <div className="relative w-full h-full group flex items-center justify-center">
                                    {/* Circular Background Badge - Clean White Professional Look */}
                                    <div className="absolute inset-0 bg-white border border-border rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all" />
                                    
                                    <div className="absolute inset-0 bg-secondary/10 blur-[30px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                                    
                                    <div className="relative w-full h-full p-[3px]">
                                        <div className="relative w-full h-full overflow-hidden rounded-full border border-border/30 bg-background z-10 shadow-inner">
                                            <Image 
                                                src="/images/zeeshan-keerio-chat-app-acon.png" 
                                                alt="Mindscape AI Assistant" 
                                                fill 
                                                priority
                                                className="object-cover object-center scale-[0.9] drop-shadow-sm transition-transform group-hover:scale-100" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>
        </div>
    );
}
