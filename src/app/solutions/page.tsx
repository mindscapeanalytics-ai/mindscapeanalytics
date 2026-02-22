"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/PremiumCard";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    Brain,
    Database,
    Globe,
    Shield
} from "lucide-react";

const solutions = [
    {
        icon: Brain,
        title: "Intelligent AI Ecosystems",
        description: "Autonomous agentic workflows and LLM clusters designed for complex enterprise reasoning.",
        features: [
            "Custom LLM Fine-tuning",
            "Agentic Workflow Engineering",
            "RAG Infrastructure",
            "Semantic Multi-node Search"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Database,
        title: "Industrial Cloud Foundations",
        description: "High-performance infrastructure defined by sub-10ms latency and unlimited horizontal scale.",
        features: [
            "Advanced Cloud Migration",
            "DevOps / CI/CD Hardening",
            "Kubernetes Cluster Orchestration",
            "Real-time Cost Performance"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Globe,
        title: "Enterprise Core Systems",
        description: "Mission-critical full-stack architectures built for high-growth global organizations.",
        features: [
            "Next.js 15+ Core Deployment",
            "Microservices Sync Logic",
            "Global Edge Distribution",
            "Legacy Architecture Modernization"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Shield,
        title: "Managed Operation Units",
        description: "The definitive business model: perpetual system maintenance, monitoring, and AI optimization.",
        features: [
            "24/7 Real-time Performance Sync",
            "Automated Security Patching",
            "Database Health Monitoring",
            "Recurring Model Optimization"
        ],
        link: "/services",
        gradient: "from-white/10 to-transparent"
    }
];

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-transparent text-white relative">
            <Navbar />

            {/* --- Industrial Hero Section --- */}
            <section className="relative pt-44 pb-16 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto"
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                        <span className="text-white/60 text-[9px] font-mono font-black tracking-[0.5em] uppercase leading-none mt-0.5">Solution_Architectures // v4.2</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.75] font-syncopate tracking-[-0.05em] uppercase w-full mx-auto flex flex-col items-center justify-center"
                        style={{ fontSize: "clamp(3.5rem, 12vw, 15rem)" }}
                    >
                        <span className="text-center w-full break-words" style={{ overflowWrap: "break-word", hyphens: "auto" }}>SYSTEM</span>
                        <span className="text-white/20 italic font-black text-center w-full break-words mt-2 md:mt-6" style={{ overflowWrap: "break-word", hyphens: "auto" }}>SOLUTIONS.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl border-t border-white/10 pt-12 mx-auto"
                    >
                        <p className="text-2xl md:text-3xl text-white/60 font-medium tracking-tight leading-snug uppercase">
                            PRECISION-ENGINEERED FOUNDATIONS FOR THE NEXT GENERATION OF <span className="text-white font-black italic">ENTERPRISE INTELLIGENCE.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 bg-transparent relative border-t border-white/5">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
                        {solutions.map((solution, index) => (
                            <PremiumCard
                                key={solution.title}
                                {...solution}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Managed CTA Section --- */}
            <section className="py-24 border-t border-white/5 bg-white text-black">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 max-w-2xl">
                            <h2 className="text-5xl font-black font-syncopate uppercase tracking-tight">READY_FOR_DEPLOYMENT?</h2>
                            <p className="text-lg font-medium opacity-60 uppercase tracking-tight">
                                All architectures are optimized for subscription-based reliability and managed maintenance.
                            </p>
                        </div>
                        <Link href="/services" className="px-12 py-6 bg-black text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:scale-105 transition-transform">
                            EXPLORE_MANAGED_MODELS
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
