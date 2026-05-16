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
                className="fixed bottom-0 inset-x-0 z-[9990] px-4 pb-4 pointer-events-none"
            >
                <div className="max-w-3xl mx-auto pointer-events-auto">
                    <div className="relative bg-foreground/95 dark:bg-white/95 text-background dark:text-black rounded-2xl shadow-[0_-8px_60px_rgba(0,0,0,0.3)] border border-white/10 dark:border-black/10 overflow-hidden">
                        {/* Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-black/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none" />

                        <button onClick={dismiss} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center hover:bg-white/20 dark:hover:bg-black/20 transition-colors z-10">
                            <X className="w-3 h-3" />
                        </button>

                        <div className="px-5 py-4 md:px-8 md:py-5">
                            {isSubmitted ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 justify-center py-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Request received - our architects will reach out within 24h.</span>
                                </motion.div>
                            ) : (
                                <form onSubmit={submit} className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                                            <Sparkles className="w-4 h-4 text-secondary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-black uppercase tracking-[0.15em]">Free AI Audit</p>
                                            <p className="text-[10px] opacity-50 font-mono tracking-wider">Find $50K+ in hidden efficiency</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 gap-2 w-full md:w-auto">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your work email"
                                            required
                                            className="flex-1 h-10 px-4 rounded-xl bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/10 text-sm placeholder:opacity-30 focus:outline-none focus:border-secondary/50 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="h-10 px-5 rounded-xl bg-secondary text-white text-xs font-black uppercase tracking-wider hover:bg-secondary/80 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                                        >
                                            {isSubmitting ? "..." : <><span className="hidden sm:inline">Get Audit</span><ArrowRight className="w-3.5 h-3.5" /></>}
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
