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
    ArrowRight,
    Sparkles
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
        title: "Full-Stack SaaS Platforms",
        icon: Globe,
        description: "End-to-end web applications and SaaS architectures built with Next.js 15+ for high performance.",
        features: ["Type-safe Architecture", "Micro-frontend Ready", "Enterprise Grade Security"],
        gradient: "from-white/10 to-transparent",
        link: "/solutions/enterprise-software"
    },
    {
        title: "Intelligent Automation",
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
                <div className="flex flex-col items-center text-center mb-16 lg:mb-32 border-b border-white/5 pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-white/40" />
                        <span className="text-meta">
                            Institutional Solutions // NODE_0x44
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fluid-h2 mb-10"
                    >
                        ENGINEERED FOR <span className="text-white/30">SCALE</span>
                    </motion.h2>

                    <div className="flex items-center gap-8 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">
                        <span>ST: Operational</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Load: Optimized</span>
                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                        <span>Protocol: v4_A_SLN</span>
                    </div>
                </div>


                {/* Premium Solutions Grid - 6 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-20 lg:mt-32 flex justify-center"
                >
                    <Link href="/services">
                        <button className="btn-institutional group">
                            <span className="flex items-center gap-4">
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
