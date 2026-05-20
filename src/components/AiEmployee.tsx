"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Activity, ShieldCheck, Cpu, Mic, Globe, Volume2, Zap, Phone, X, MicOff } from "lucide-react";

const TAGS = [
    { name: "Adaptive", x: -320, y: -180, delay: 0, bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
    { name: "Analytical", x: 220, y: -260, delay: 0.2, bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400" },
    { name: "Conversational", x: 300, y: 40, delay: 0.4, bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400" },
    { name: "Proactive", x: 240, y: 280, delay: 0.6, bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400" },
    { name: "Collaborative", x: -280, y: 240, delay: 0.8, bg: "bg-rose-500/10", border: "border-rose-500/30", dot: "bg-rose-400" },
];

interface ConversationEntry {
    role: "user" | "assistant";
    content: string;
}

export default function AiEmployee() {
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState<"IDLE" | "CONNECTING" | "LISTENING" | "THINKING" | "SPEAKING">("IDLE");
    const [transcript, setTranscript] = useState("");
    const [agentResponse, setAgentResponse] = useState("");
    const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
    const [turnCount, setTurnCount] = useState(0);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isTextMode, setIsTextMode] = useState(false);
    const [textInput, setTextInput] = useState("");
    
    const recognitionRef = useRef<any>(null);
    const activeRef = useRef(false);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    
    // Failsafe refs to prevent memory leaks, redundant loops and voice overlaps
    const recognitionActiveRef = useRef(false);
    const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const resumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Centralized timeout cleanup to prevent phantom restarts
    const clearAllTimeouts = useCallback(() => {
        if (listeningTimeoutRef.current) {
            clearTimeout(listeningTimeoutRef.current);
            listeningTimeoutRef.current = null;
        }
        if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current);
            fallbackTimeoutRef.current = null;
        }
        if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
            restartTimeoutRef.current = null;
        }
        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }
    }, []);

    // Initialize Speech and Voices
    useEffect(() => {
        if (typeof window !== "undefined") {
            synthesisRef.current = window.speechSynthesis;
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                if (availableVoices.length > 0) {
                    setVoices(availableVoices);
                }
            };
            
            // Immediate attempt
            loadVoices();
            
            // Failsafe interval for slow loading voices (some browsers)
            const interval = setInterval(() => {
                if (window.speechSynthesis.getVoices().length > 0) {
                    loadVoices();
                    clearInterval(interval);
                }
            }, 100);

            window.speechSynthesis.onvoiceschanged = loadVoices;
            return () => clearInterval(interval);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            activeRef.current = false;
            clearAllTimeouts();
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.onstart = null;
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onerror = null;
                    recognitionRef.current.onresult = null;
                    recognitionRef.current.abort();
                } catch {}
            }
        };
    }, [clearAllTimeouts]);

    const speakText = useCallback((text: string, onEnd: () => void) => {
        if (!synthesisRef.current) {
            setTimeout(onEnd, 1000);
            return;
        }

        // Preemptively clear any active Chrome 15s keep-alive interval
        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }

        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.resume();
        }
        synthesisRef.current.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Voice Selection Logic - 2026 Pro Standard
        const preferredVoices = [
            "Microsoft Andrew Online (Natural)",
            "Microsoft Christopher Online (Natural)",
            "Google US English Male",
            "Apple Daniel",
            "English (United States)"
        ];

        // Retrieve available voices, fallback to instant getVoices if lazy loaded empty
        let availableVoices = voices;
        if (availableVoices.length === 0) {
            availableVoices = window.speechSynthesis.getVoices();
        }

        let selectedVoice = null;
        for (const name of preferredVoices) {
            selectedVoice = availableVoices.find(v => v.name.includes(name));
            if (selectedVoice) break;
        }

        if (!selectedVoice) {
            selectedVoice = availableVoices.find(v => v.lang.startsWith("en-US") && (v.name.includes("Male") || v.name.includes("Natural")));
        }

        if (selectedVoice) utterance.voice = selectedVoice;
        
        utterance.rate = 1.05; // Slightly faster for modern premium feel
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // CRITICAL HACK: Chrome 15-second SpeechSynthesis Bug Bypass
        // Triggers synthesis keep-alive pulse every 10s to bypass browser-native freeze policies.
        resumeIntervalRef.current = setInterval(() => {
            if (synthesisRef.current && synthesisRef.current.speaking) {
                synthesisRef.current.resume();
            }
        }, 10000);

        utterance.onend = () => {
            if (resumeIntervalRef.current) {
                clearInterval(resumeIntervalRef.current);
                resumeIntervalRef.current = null;
            }
            if (activeRef.current) {
                onEnd();
            }
        };
        
        utterance.onerror = (e) => {
            console.error("TTS Error:", e);
            if (resumeIntervalRef.current) {
                clearInterval(resumeIntervalRef.current);
                resumeIntervalRef.current = null;
            }
            onEnd();
        };

        synthesisRef.current.speak(utterance);
    }, [voices]);

    const getAIResponse = useCallback(async (userText: string, history: ConversationEntry[]): Promise<string> => {
        try {
            const res = await fetch("/api/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: userText, history }),
            });
            if (!res.ok) throw new Error("Voice API error");
            const data = await res.json();
            return data.response || "I'd love to help you explore our AI solutions. What specific challenge are you facing?";
        } catch {
            // Intelligent local fallback
            const lower = userText.toLowerCase();
            if (lower.includes("hello") || lower.includes("hi")) {
                return "Welcome to Mindscape Analytics! I'm the Architect. How can I help transform your business with AI today?";
            }
            if (lower.includes("voice") || lower.includes("call")) {
                return "We build autonomous voice agents that handle sales calls, support, and appointment booking 24/7. Want to see a custom demo for your industry?";
            }
            if (lower.includes("price") || lower.includes("cost")) {
                return "Our solutions start from 999 dollars per month for standard automation. Would you like a free AI audit to scope your specific needs?";
            }
            return "That's a great question. Our team specializes in exactly that kind of challenge. Would you like to share your email so our architects can follow up with a detailed proposal?";
        }
    }, []);

    const startListening = useCallback(() => {
        if (!activeRef.current) return;
        
        clearAllTimeouts();

        // Safely abort previous instances to prevent overlap mic locks
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onstart = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.abort();
            } catch {}
            recognitionRef.current = null;
        }

        setStatus("LISTENING");

        if (typeof window === "undefined") return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            // High-fidelity fallback for browsers without Web Speech API
            fallbackTimeoutRef.current = setTimeout(() => {
                if (!activeRef.current) return;
                const fallbackQueries = [
                    "How do your autonomous agents handle high-volume sales?",
                    "Can you tell me about your FSI suite for banking?",
                    "I'm interested in a free AI audit for my organization",
                ];
                const query = fallbackQueries[turnCount % fallbackQueries.length];
                processUserInput(query);
            }, 3000);
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let finalTranscript = "";

        recognition.onstart = () => {
            recognitionActiveRef.current = true;
        };

        recognition.onresult = (event: any) => {
            if (!activeRef.current) return;
            
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            if (interimTranscript) setTranscript(interimTranscript);
        };

        recognition.onend = () => {
            recognitionActiveRef.current = false;
            if (!activeRef.current) return;
            
            if (finalTranscript) {
                processUserInput(finalTranscript);
            } else {
                // Centralized single-restart mechanism inside onend with guard check
                setStatus("LISTENING");
                restartTimeoutRef.current = setTimeout(() => {
                    if (activeRef.current && !recognitionActiveRef.current) {
                        startListening();
                    }
                }, 1000);
            }
        };

        recognition.onerror = (event: any) => {
            console.error("STT Error:", event.error);
            recognitionActiveRef.current = false;
            
            // Mic Blocked or Service Blocked: Terminate gracefully to prevent permissions prompts loops
            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                setPermissionError("Microphone access blocked or not supported. Please update browser settings.");
                activeRef.current = false;
                setIsActive(false);
                setStatus("IDLE");
                clearAllTimeouts();
            }
        };

        try { 
            recognition.start(); 
        } catch (e) {
            console.error("Recognition start error:", e);
            recognitionActiveRef.current = false;
        }
    }, [turnCount, clearAllTimeouts, isTextMode]);

    const processUserInput = useCallback(async (userText: string) => {
        if (!activeRef.current) return;
        setTranscript(userText);
        setStatus("THINKING");

        const newHistory: ConversationEntry[] = [...conversationHistory, { role: "user", content: userText }];
        const aiResponse = await getAIResponse(userText, newHistory);

        if (!activeRef.current) return;

        const updatedHistory: ConversationEntry[] = [...newHistory, { role: "assistant", content: aiResponse }];
        setConversationHistory(updatedHistory);
        setAgentResponse(aiResponse);
        setStatus("SPEAKING");
        setTurnCount(prev => prev + 1);

        // Capture lead if email detected in user input
        const emailMatch = userText.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
            try {
                fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailMatch[0],
                        source: "voice",
                        message: `Voice conversation: ${updatedHistory.map(h => `${h.role}: ${h.content}`).join(" | ")}`,
                    }),
                });
            } catch {}
        }

        speakText(aiResponse, () => {
            if (activeRef.current) {
                listeningTimeoutRef.current = setTimeout(() => startListening(), 800);
            }
        });
    }, [conversationHistory, getAIResponse, speakText, startListening]);

    const startTextProtocol = useCallback(() => {
        setIsTextMode(true);
        activeRef.current = true;
        setIsActive(true);
        setStatus("CONNECTING");
        
        const welcome = "Establishing secure connection to MSA Agent Core in Text Mode. I am the Architect. How can I assist with your organization's AI transformation today?";
        setAgentResponse(welcome);
        setStatus("SPEAKING");
        
        if (synthesisRef.current && synthesisRef.current.paused) {
            synthesisRef.current.resume();
        }

        speakText(welcome, () => {
            if (activeRef.current) {
                setStatus("LISTENING");
            }
        });
    }, [speakText]);

    const toggleProtocol = () => {
        if (isActive) {
            activeRef.current = false;
            setIsActive(false);
            setStatus("IDLE");
            setTranscript("");
            setAgentResponse("");
            setConversationHistory([]);
            setTurnCount(0);
            setIsTextMode(false);
            
            clearAllTimeouts();

            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.onstart = null;
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onerror = null;
                    recognitionRef.current.onresult = null;
                    recognitionRef.current.abort();
                } catch {}
                recognitionRef.current = null;
            }
        } else {
            // REQUEST MIC PERMISSIONS EXPLICITLY FOR ROBUSTNESS
            setPermissionError(null);
            setIsTextMode(false);
            if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(() => {
                        if (synthesisRef.current) {
                            const silent = new SpeechSynthesisUtterance("");
                            silent.volume = 0;
                            synthesisRef.current.speak(silent);
                        }

                        activeRef.current = true;
                        setIsActive(true);
                        setStatus("CONNECTING");
                        
                        const welcome = "Establishing secure connection to MSA Agent Core. I am the Architect. How can I assist with your organization's AI transformation today?";
                        setAgentResponse(welcome);
                        setStatus("SPEAKING");
                        
                        if (synthesisRef.current && synthesisRef.current.paused) {
                            synthesisRef.current.resume();
                        }

                        speakText(welcome, () => {
                            if (activeRef.current) {
                                listeningTimeoutRef.current = setTimeout(() => startListening(), 500);
                            }
                        });
                    })
                    .catch((err) => {
                        console.error("Mic Access Denied:", err);
                        setPermissionError("Microphone access is required for Voice Intelligence. Please enable permissions in your browser settings.");
                        setStatus("IDLE");
                        
                        // Auto-clear error after 15 seconds to give user time to select text mode fallback
                        setTimeout(() => setPermissionError(null), 15000);
                    });
            } else {
                setPermissionError("Microphone access is not supported by your browser or connection. Please update browser settings.");
                setStatus("IDLE");
                
                // Auto-clear error after 15 seconds
                setTimeout(() => setPermissionError(null), 15000);
            }
        }
    };

    return (
        <section id="ai-employee-section" className="relative w-full overflow-hidden bg-transparent pt-0 pb-8 lg:pb-16 -mt-2 content-deferred">
            <style>{`
                .tag-container { --tag-offset-scale: 0.38 !important; }
                @media (min-width: 480px) { .tag-container { --tag-offset-scale: 0.45 !important; } }
                @media (min-width: 768px) { .tag-container { --tag-offset-scale: 0.7 !important; } }
                @media (min-width: 1024px) { .tag-container { --tag-offset-scale: 1 !important; } }
            `}</style>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[900px] h-[900px] bg-secondary/5 blur-[200px] rounded-full pointer-events-none opacity-40 translate-x-1/3 transform-gpu" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none opacity-20 -translate-x-1/2 -translate-y-1/2 transform-gpu" />

            <div className="container-standard relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] lg:gap-x-16 items-start">

                    {/* 1. TOP: Heading & Description */}
                    <div className="flex flex-col items-start text-left space-y-4 lg:space-y-10 order-1 lg:mb-12 pt-4 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                            className="space-y-3 lg:space-y-8"
                        >
                            <div className="inline-flex items-center gap-4 px-4 py-1.5 lg:px-6 lg:py-3 rounded-full bg-foreground/[0.03] border border-border/20 backdrop-blur-3xl">
                                <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                                <span className="text-[8px] lg:text-meta font-mono text-foreground/40 uppercase tracking-[0.4em] font-black">Neural_Sync // MSA_AGENT_LIVE</span>
                            </div>

                             <h2 className="fluid-h2 text-foreground relative not-italic">
                                THE ERA OF AI <br />
                                <span className="text-secondary drop-shadow-[0_0_40px_hsl(var(--secondary) / 0.4)] bg-gradient-to-r from-secondary to-secondary/50 bg-clip-text text-transparent not-italic">
                                    IS HERE.
                                </span>
                                <span className="absolute -left-16 top-4 text-[11px] font-mono text-secondary/30 hidden xl:block tracking-[0.8em] font-black rotate-90 origin-left not-italic">PROT_V5.0</span>
                            </h2>

                            <p className="text-foreground/60 dark:text-foreground/40 text-sm md:text-xl lg:text-2xl font-medium max-w-xl leading-[1.4] tracking-tight border-l-[3px] border-secondary/15 pl-6 lg:pl-10">
                                Transform your organization with self-evolving digital employees. We architect autonomous agents that handle mission-critical workflows with zero latency and infinite scalability.
                            </p>

                            {/* Voice Intelligence Section */}
                            <div className="mt-8 space-y-4 border-l-[3px] border-secondary/15 pl-6 lg:pl-10 relative">
                                <div className="absolute -left-[3px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-secondary to-transparent opacity-50" />
                                <div className="inline-flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-secondary/70 uppercase tracking-[0.3em]">VOICE_INTELLIGENCE_V5 // MSA AGENT</span>
                                </div>
                                <h3 className="text-base md:text-lg lg:text-xl font-black text-white uppercase leading-tight not-italic">
                                    Speak to <br className="hidden lg:block" />
                                    <span className="text-white/40 not-italic">The Architect.</span>
                                </h3>
                                <p className="text-sm md:text-base text-foreground/50 font-medium max-w-md not-italic">
                                    Real AI conversation powered by MSA AGENT. Ask about our services, get instant answers, and experience the future of enterprise voice intelligence.
                                </p>
                                <div className="flex flex-wrap gap-6 pt-2 opacity-40">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white">MSA_AGENT_675B</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white">Sub_100ms_ASR</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-blue-500" />
                                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white">Auto_Lead_Capture</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. MIDDLE: Visual Hub */}
                    <div className="relative order-2 lg:row-span-2 flex justify-center items-center py-0 lg:py-0 min-h-[350px] md:min-h-[550px] lg:min-h-[950px] scale-[0.75] xs:scale-80 sm:scale-85 md:scale-95 lg:scale-100 transition-transform duration-1000 -my-14 lg:my-0">
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary) / 0.06)_0%,transparent_75%)] opacity-40" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
                        </div>

                        <div className="relative w-full h-[550px] lg:h-[950px] flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-[140%] aspect-square rounded-full border border-secondary/5 opacity-[0.05] hidden lg:block transform-gpu will-change-transform"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.5 }}
                                viewport={{ once: true }}
                                className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[720px] h-[480px] md:h-[750px] lg:h-[950px] z-20 group transform-gpu will-change-transform"
                            >
                                <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-xl md:backdrop-blur-2xl overflow-hidden shadow-[0_100px_200px_-40px_rgba(0,0,0,1)] ring-1 ring-white/5">
                                    <Image src="/images/team/zeeshan-keerio.webp" alt="Zeeshan Keerio" fill className="object-cover object-top contrast-[1.05] grayscale-[0.02] hover:grayscale-0 transition-all duration-[6s]" priority />
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
                                    <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />

                                    <div className="absolute inset-x-0 bottom-6 lg:bottom-10 z-20 flex flex-col items-center gap-4 px-4">
                                        {/* Voice Terminal Overlay */}
                                        <AnimatePresence>
                                            {permissionError && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="w-[90%] max-w-sm bg-rose-500/10 backdrop-blur-xl border border-rose-500/30 rounded-xl p-4 mb-2 text-center pointer-events-auto z-30"
                                                >
                                                    <div className="flex items-center gap-3 justify-center mb-1">
                                                        <MicOff className="w-3.5 h-3.5 text-rose-500" />
                                                        <span className="text-[10px] font-mono text-rose-500 uppercase tracking-widest font-black">PROTOCOL_ERROR</span>
                                                    </div>
                                                    <p className="text-[10px] text-white/70 leading-relaxed uppercase tracking-tighter mb-3">
                                                        {permissionError}
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            setPermissionError(null);
                                                            startTextProtocol();
                                                        }}
                                                        className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-98 text-[9px] text-white font-mono uppercase tracking-widest transition-all border border-white/10 cursor-pointer"
                                                    >
                                                        ⚡ Continue in Interactive Text Mode
                                                    </button>
                                                </motion.div>
                                            )}
                                            {(transcript || agentResponse || isTextMode) && isActive && !permissionError && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 20 }} 
                                                    animate={{ opacity: 1, y: 0 }} 
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left shadow-2xl relative overflow-hidden pointer-events-auto z-30"
                                                >
                                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
                                                    <div className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar mb-2">
                                                        {transcript && (
                                                            <div className="flex gap-2 items-start">
                                                                <span className="text-[9px] font-mono text-white/30 uppercase mt-1 shrink-0">YOU</span>
                                                                <p className="text-xs lg:text-sm text-white/70 leading-snug">&quot;{transcript}&quot;</p>
                                                            </div>
                                                        )}
                                                        {agentResponse && (
                                                            <div className="flex gap-2 items-start pt-2 border-t border-white/5">
                                                                <span className="text-[9px] font-mono text-secondary uppercase mt-1 shrink-0">AI</span>
                                                                <p className="text-xs lg:text-sm text-white leading-snug">{agentResponse}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {isTextMode && (status === "LISTENING" || status === "IDLE") && (
                                                        <form 
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                if (!textInput.trim()) return;
                                                                const query = textInput;
                                                                setTextInput("");
                                                                processUserInput(query);
                                                            }}
                                                            className="flex gap-2 mt-3 pt-3 border-t border-white/10"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={textInput}
                                                                onChange={(e) => setTextInput(e.target.value)}
                                                                placeholder="Type your query to the Architect..."
                                                                className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/35 focus:outline-none focus:border-secondary/50 transition-colors"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="h-9 px-3 rounded-lg bg-white text-black font-mono text-[10px] font-black uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all cursor-pointer shrink-0"
                                                            >
                                                                SEND
                                                            </button>
                                                        </form>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Action Button */}
                                        <button
                                            onClick={toggleProtocol}
                                            className={cn(
                                                "group relative px-6 py-3 lg:px-8 lg:py-4 rounded-full backdrop-blur-md transition-all overflow-hidden flex items-center justify-center gap-3 lg:gap-4 w-[90%] max-w-sm",
                                                isActive 
                                                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                                                    : "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out",
                                                isActive ? "via-white/10" : "via-black/5"
                                            )} />
                                            
                                            <div className={cn(
                                                "relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors",
                                                isActive ? "bg-red-600 border-white/20" : "bg-black/5 border-black/10"
                                            )}>
                                                <AnimatePresence mode="wait">
                                                    {status === "IDLE" && <Mic key="mic" size={14} className="text-black/60" />}
                                                    {status === "CONNECTING" && <Globe key="globe" size={14} className="text-white animate-spin" />}
                                                    {status === "LISTENING" && <Volume2 key="vol" size={14} className="text-white animate-pulse" />}
                                                    {status === "THINKING" && <Zap key="zap" size={14} className="text-white animate-bounce" />}
                                                    {status === "SPEAKING" && <Phone key="phone" size={14} className="text-white animate-pulse" />}
                                                </AnimatePresence>
                                                {isActive && (
                                                    <motion.div 
                                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="absolute inset-0 rounded-full border border-white/50"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col items-start text-left">
                                                <span className={cn(
                                                    "text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] transition-colors not-italic",
                                                    isActive ? "text-white" : "text-black group-hover:text-black/80"
                                                )}>
                                                    {isActive ? "Terminate Protocol" : "Speak to The Architect"}
                                                </span>
                                                <span className={cn(
                                                    "text-[6px] lg:text-[7px] font-mono tracking-[0.3em] uppercase not-italic",
                                                    isActive ? "text-white/70" : "text-black/50"
                                                )}>
                                                    {isActive 
                                                        ? status === "LISTENING" ? "LISTENING..." : status === "THINKING" ? "PROCESSING WITH MSA CORE..." : status === "SPEAKING" ? "SPEAKING..." : "ABORT CONNECTION"
                                                        : "REAL AI • MSA CORE • LIVE"
                                                    }
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    <motion.div animate={{ y: ["-100%", "300%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-[40%] bg-gradient-to-b from-transparent via-secondary/5 to-transparent z-30 opacity-50 border-b border-white/10 transform-gpu will-change-transform" />
                                </div>

                                {TAGS.map((tag) => (
                                    <motion.div
                                        key={tag.name}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 1.2 + tag.delay }}
                                        className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 tag-container"
                                        style={{
                                            left: `calc(50% + (var(--tag-offset-scale) * ${tag.x}px))`,
                                            top: `calc(50% + (var(--tag-offset-scale) * ${tag.y}px))`
                                        }}
                                    >
                                        <div className={cn("px-4 py-2 lg:px-6 lg:py-2.5 rounded-full border backdrop-blur-3xl flex items-center gap-2 lg:gap-3 shadow-2xl relative group", tag.bg, tag.border)}>
                                            <div className={cn("w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full animate-pulse", tag.dot)} />
                                            <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] whitespace-nowrap text-white/90">
                                                {tag.name}
                                            </span>
                                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* 3. Feature Cards */}
                    <div className="order-3 lg:col-start-1 lg:row-start-2 pt-0 lg:pt-0 -mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-10 w-full max-w-2xl"
                        >
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/[0.015] border border-border/30 backdrop-blur-2xl transition-colors hover:border-secondary/20 shadow-xl">
                                <Cpu className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-30" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/30 mb-1 lg:mb-3">Cognitive Capacity</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground leading-none tracking-tight">Infinite Parallelism</p>
                            </div>
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/[0.015] border border-border/30 backdrop-blur-2xl transition-colors hover:border-secondary/20 shadow-xl">
                                <ShieldCheck className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-30" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/30 mb-1 lg:mb-3">System Reliability</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground leading-none tracking-tight">Error-Free Execution</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
