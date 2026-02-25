"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
    Palette,
    Cpu,
    BrainCircuit,
    Mic2,
    Globe,
    Database,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { PremiumCard } from "@/components/ui/PremiumCard";

const solutions = [
    {
        title: "AI Agents & Automation",
        icon: BrainCircuit,
        description: "Autonomous AI agents that replace manual operations with intelligent, self-operating system logic.",
        features: ["Agentic Workflows", "Operation-First Design", "Autonomous capture & qualification"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/ai-genai"
    },
    {
        title: "AI Voice Call Agents",
        icon: Mic2,
        description: "Human-like AI voice systems (Vapi/Retell) for inbound & outbound appointment booking at scale.",
        features: ["Ultra-low Latency Sync", "Contextual Booking Logic", "Bilingual Support"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/ai-genai"
    },
    {
        title: "Big Data & Cloud Engineering",
        icon: Database,
        description: "Architecting high-performance cloud ecosystems and big data pipelines for enterprise precision.",
        features: ["Scalable Data Warehousing", "Managed Infrastructure", "Performance-grade Clusters"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/cloud-infrastructure"
    },
    {
        title: "AI Sales & Chatbots",
        icon: Cpu,
        description: "Intelligent sales engines that capture leads and facilitate complex support 24/7 without friction.",
        features: ["Lead Generation Engines", "Support Intelligence", "CRM Data Sync"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/ai-genai"
    },
    {
        title: "Full Stack SaaS Platforms",
        icon: Globe,
        description: "End-to-end web applications and SaaS architectures built with Next.js 15+ for high performance.",
        features: ["Type-safe Architecture", "Micro-frontend Ready", "Enterprise Grade Security"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/enterprise-software"
    },
    {
        title: "Managed Infrastructure",
        icon: Palette,
        description: "Beyond delivery. We build, host, monitor, and optimize your entire system on a subscription model.",
        features: ["Proactive Monitoring", "Zero-downtime Patches", "Cost Optimization"],
        gradient: "from-white/10 to-transparent",
        link: "/services"
    }
];


export default function Solutions() {
    const sectionRef = React.useRef<HTMLElement>(null);

    // --- Atmospheric Parallax ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 30 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 50;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="relative section-spacing overflow-hidden bg-transparent flex flex-col items-center"
        >
            {/* --- Cinematic Background --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Global grid handles this */}

                {/* Atmospheric Glows */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.01] blur-[150px] rounded-full" />
            </div>

            <div className="container-standard relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-32 border-b border-white/5 pb-12">
                    <div className="max-w-4xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] font-black">Architecture // SOLUTIONS_v4.2</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-[9vw] xs:text-5xl md:text-8xl font-black tracking-[-0.05em] font-syncopate leading-[0.8] uppercase"
                            style={{ fontSize: "clamp(2.4rem, 10vw, 10rem)" }}
                        >
                            SYSTEM <br /> <span className="text-white/20 italic font-black">ARCHITECTURES.</span>
                        </motion.h2>
                    </div>

                    <div className="hidden lg:block text-right font-mono text-[9px] text-white/20 uppercase tracking-[0.4em] leading-relaxed font-black">
                        Status: Operational <br />
                        Load: Optimized <br />
                        Protocol: v4_A_SLN
                    </div>
                </div>

                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -mt-12 animate-scan-line" />

                {/* Premium Solutions Grid - 6 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {solutions.map((solution, index) => (
                        <PremiumCard
                            key={solution.title}
                            {...solution}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.4 }}
                    className="mt-24 text-center border-t border-white/5 pt-16"
                >
                    <Link href="/services">
                        <button className="group relative px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-xl overflow-hidden shadow-2xl transition-all hover:bg-white/90 hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORE ALL SERVICES
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
