"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Brain,
    Code,
    Cloud,
    Shield,
    ArrowRight,
    ChevronRight,
    CheckCircle2
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const solutions = [
    {
        id: "ai-genai",
        name: "Intelligent AI Ecosystems",
        icon: Brain,
        href: "/solutions/ai-genai"
    },
    {
        id: "cloud-infrastructure",
        name: "Industrial Cloud Foundations",
        icon: Cloud,
        href: "/solutions/cloud-infrastructure"
    },
    {
        id: "enterprise-software",
        name: "Enterprise Core Systems",
        icon: Code,
        href: "/solutions/enterprise-software"
    },
    {
        id: "services",
        name: "Managed Operation Units",
        icon: Shield,
        href: "/services"
    }
];

interface SolutionLayoutProps {
    children: React.ReactNode
    currentSolutionId: string
    title: string
    subtitle: string
    heroImage?: string
}

export default function SolutionLayout({
    children,
    currentSolutionId,
    title,
    subtitle,
    heroImage
}: SolutionLayoutProps) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-transparent text-white relative">
            {/* Cinematic Background Layer - Harmonized with Global */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-10 left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-20" />
                <div className="absolute bottom-10 right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] opacity-15" />
            </div>
            <Navbar />

            {/* Premium Solution Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

                {/* Background Glow - Optimized */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-subheading mb-4 block">Solution Architecture</span>
                        <h1
                            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight"
                            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
                        >
                            {title}
                        </h1>
                        <p
                            className="text-body text-xl md:text-2xl max-w-3xl mx-auto"
                            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
                        >
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sticky Sidebar Navigation */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                                    Our Solutions
                                </h3>
                                <nav className="space-y-2">
                                    {solutions.map((solution) => {
                                        const isActive = solution.id === currentSolutionId
                                        return (
                                            <Link
                                                key={solution.id}
                                                href={solution.href}
                                                className={cn(
                                                    "flex items-center justify-between p-4 rounded-xl transition-all group",
                                                    isActive
                                                        ? "bg-white text-black font-bold border-transparent"
                                                        : "bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <solution.icon className={cn("w-5 h-5", isActive ? "text-black" : "group-hover:text-white transition-colors")} />
                                                    <span>{solution.name}</span>
                                                </div>
                                                <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", isActive ? "opacity-100" : "group-hover:opacity-100 group-hover:translate-x-1")} />
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Sidebar CTA - Glassmorphism */}
                            <div className="p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10">
                                <h4 className="text-xl font-bold mb-4">Need a custom solution?</h4>
                                <p className="text-sm text-white/40 mb-6">
                                    Our engineers are ready to build the next generation of your enterprise.
                                </p>
                                <Link href="/contact" className="flex items-center text-sm font-bold group">
                                    Contact Us
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="w-full flex-1">
                        {children}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}
