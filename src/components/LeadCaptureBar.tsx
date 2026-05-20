"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function LeadCaptureBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Show after 8 seconds or 40% scroll
    useEffect(() => {
        const dismissed = sessionStorage.getItem("msa_lead_bar_dismissed");
        if (dismissed) { setIsDismissed(true); return; }

        const timer = setTimeout(() => setIsVisible(true), 8000);

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 40) setIsVisible(true);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const dismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem("msa_lead_bar_dismissed", "true");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;
        setIsSubmitting(true);

        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "lead_bar",
                    service: "Free AI Audit",
                    message: "Requested free AI audit via lead capture bar",
                }),
            });
            setIsSubmitted(true);
            sessionStorage.setItem("msa_lead_bar_dismissed", "true");
        } catch {
            setIsSubmitting(false);
        }
    };

    if (isDismissed || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="fixed bottom-0 left-0 right-[84px] md:right-0 md:inset-x-0 z-[9990] pl-4 pr-0 pb-4 md:px-4 pointer-events-none"
            >
                <div className="max-w-3xl mx-auto pointer-events-auto">
                    <div className="relative bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_-8px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

                        <button onClick={dismiss} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-10">
                            <X className="w-3 h-3 text-white/60 hover:text-white" />
                        </button>

                        <div className="px-3.5 py-3 md:px-8 md:py-5">
                            {isSubmitted ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 md:gap-4 justify-center py-2">
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0" />
                                    <span className="text-[9px] md:text-xs font-black uppercase tracking-wider text-center md:text-left text-white">
                                        Audit requested! We will reach out within 24h.
                                    </span>
                                </motion.div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-white">Free AI Audit</p>
                                            <p className="text-[9px] md:text-[10px] text-white/50 font-mono tracking-wider">Find $50K+ in hidden efficiency</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 gap-2 w-full md:w-auto">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your work email"
                                            required
                                            className="flex-1 h-10 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="h-10 px-5 rounded-xl bg-white hover:bg-white/95 active:scale-95 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                                        >
                                            {isSubmitting ? "..." : <><span className="hidden sm:inline">Get Audit</span><ArrowRight className="w-3.5 h-3.5 text-black" /></>}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
