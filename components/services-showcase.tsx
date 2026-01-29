"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, Phone, Info, Sparkles, ArrowLeft, ArrowRight } from "lucide-react"
import { QuickContactModal } from "@/components/quick-contact-modal"

// Service Data with updated prices (starting from $499)
const services = [
    {
        id: "design-systems",
        title: "UI/UX Design Systems",
        subtitle: "Consistency at scale",
        price: "499",
        color: "red",
        features: [
            { label: "Atomic Component Lib", info: "Building a library of reusable UI blocks." },
            { label: "Interactive Figma File", info: "High-fidelity prototypes for alignment." },
            { label: "Visual Identity System", info: "Master guide for typography and colors." },
            { label: "Accessibility Review", info: "Ensuring WCAG 2.1 compliance." },
            { label: "User Journey Maps", info: "Optimizing conversion funnels." },
            { label: "Micro-animations", info: "Delightful interactive details." }
        ]
    },
    {
        id: "enterprise-automation",
        title: "Enterprise Automation",
        subtitle: "Streamline operations",
        price: "599",
        color: "orange",
        features: [
            { label: "Zapier/Make Workflows", info: "Complex cross-platform automation." },
            { label: "Self-hosted n8n Setup", info: "Secure, private automation infrastructure." },
            { label: "Custom Python Bridges", info: "Heavy-duty data processing." },
            { label: "ERP/CRM Integration", info: "Syncing Salesforce, SAP, or Odoo." },
            { label: "Self-healing Logic", info: "Robust error handling systems." },
            { label: "Daily Business Reports", info: "Automated insights to your team." }
        ]
    },
    {
        id: "ai-agents",
        title: "Custom AI Agents & RAG",
        subtitle: "Context-aware intelligence",
        price: "649",
        color: "green",
        features: [
            { label: "Vector Database Setup", info: "Pinecone, Weaviate or Chroma integration." },
            { label: "PDF & Web Scrapers", info: "Automated document ingestion pipelines." },
            { label: "Semantic Search Engine", info: "Highly accurate knowledge retrieval." },
            { label: "Agentic Reasoning", info: "Multi-step decision making agents." },
            { label: "Real-time Data Sync", info: "Keeping AI domain knowledge fresh." },
            { label: "Privacy-first Design", info: "Enterprise-grade data security." }
        ]
    },
    {
        id: "gpt-dev",
        title: "Full GPT App Development",
        subtitle: "Tailored solution for your use case",
        price: "799",
        color: "blue",
        features: [
            { label: "Complete App Delivery", info: "End-to-end GPT app delivery." },
            { label: "Custom UI/UX for Chat", info: "Optimized conversational interfaces." },
            { label: "Backend API integration", info: "Seamless OpenAI connectivity." },
            { label: "OAuth authentication", info: "Secure sign-in via OpenAI/Auth0." },
            { label: "Production deployment", info: "Edge-optimized Vercel hosting." },
            { label: "Updates every 48h", info: "Agile delivery and patching." }
        ]
    },
    {
        id: "voice-ai",
        title: "Voice AI Integrations",
        subtitle: "Real-world conversations",
        price: "899",
        color: "cyan",
        features: [
            { label: "Vapi/Retell Integration", info: "Ultra-low latency real-time voice." },
            { label: "Twilio Phone Wiring", info: "Business phone automation." },
            { label: "Multi-language Support", info: "Localized voices in 50+ languages." },
            { label: "Calendar Booking", info: "Autonomous appointment scheduling." },
            { label: "Call Summarizations", info: "Detailed notes pushed to your CRM." },
            { label: "Tone & Inflection", info: "Natural, human-like AI responses." }
        ]
    },
    {
        id: "web-platforms",
        title: "Modern Web Platforms",
        subtitle: "Scale with confidence",
        price: "999",
        color: "purple",
        features: [
            { label: "Next.js 14 App Router", info: "Industry-standard React framework." },
            { label: "Server-side Rendering", info: "Maximum SEO and speed performance." },
            { label: "Prisma & PostgreSQL", info: "Type-safe robust architecture." },
            { label: "Tailwind CSS Design", info: "Highly responsive modern UI." },
            { label: "Edge Computing Setup", info: "Global low-latency performance." },
            { label: "Standard Security Audit", info: "Vulnerability scanning and rate-limiting." }
        ]
    }
]

const colorVariants = {
    blue: { bg: "bg-blue-600", text: "text-blue-400", border: "border-blue-500/50" },
    green: { bg: "bg-green-600", text: "text-green-400", border: "border-green-500/50" },
    purple: { bg: "bg-purple-600", text: "text-purple-400", border: "border-purple-500/50" },
    orange: { bg: "bg-orange-600", text: "text-orange-400", border: "border-orange-500/50" },
    red: { bg: "bg-red-600", text: "text-red-400", border: "border-red-500/50" },
    cyan: { bg: "bg-cyan-600", text: "text-cyan-400", border: "border-cyan-500/50" }
}

const ServiceCard = ({ service, isCenter, onBookNow }: { service: typeof services[0], isCenter: boolean, onBookNow?: (service: typeof services[0]) => void }) => {
    const colors = colorVariants[service.color as keyof typeof colorVariants]
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 })

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    function onMouseLeave() {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={cn(
                "relative transition-all duration-700 w-[300px] sm:w-[360px]",
                isCenter ? "scale-100 z-30 opacity-100" : "scale-90 z-10 opacity-30 blur-[1px]"
            )}
        >
            <TooltipProvider>
                <Card className={cn(
                    "h-full rounded-[32px] border bg-zinc-900/20 backdrop-blur-md text-white p-6 flex flex-col gap-5 shadow-2xl transition-all duration-500",
                    isCenter ? "border-white/20 shadow-red-900/10 ring-1 ring-white/10" : "border-white/5 opacity-50"
                )}>
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-black leading-tight tracking-tight text-white group-hover:text-red-500 transition-colors">
                            {service.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", colors.bg)} />
                            <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">
                                {service.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Features - Compact list */}
                    <CardContent className="rounded-[24px] border border-white/5 bg-white/[0.02] px-5 py-6 flex flex-col gap-3.5">
                        {service.features.map((feature, i) => (
                            <Tooltip key={i} delayDuration={300}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-3 cursor-help select-none text-white/50 hover:text-white transition-colors group/item">
                                        <div className={cn("flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center bg-white/5 border border-white/5", colors.text)}>
                                            <Check className="w-2.5 h-2.5" />
                                        </div>
                                        <span className="text-[11px] sm:text-[13px] leading-tight font-light">{feature.label}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-zinc-950 border-white/10 text-[10px] rounded-xl px-4 py-2 backdrop-blur-xl">
                                    {feature.info}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </CardContent>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">Starting from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white">${service.price}</span>
                                <span className="text-[10px] text-white/20 font-bold">/ project</span>
                            </div>
                        </div>

                        <Button
                            className={cn(
                                "flex items-center justify-center gap-2 px-6 h-12 rounded-full text-[12px] font-black text-white transition-all",
                                "bg-zinc-950 hover:bg-red-600 border border-white/10 hover:border-red-500 shadow-2xl active:scale-95 group/btn"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onBookNow) onBookNow(service);
                            }}
                        >
                            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover/btn:scale-110", colors.bg)}>
                                <Phone className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span>Book now</span>
                        </Button>
                    </div>

                    {/* Industrial Corner Detail */}
                    <div className="absolute top-4 right-4 text-white/5">
                        <Sparkles className="w-8 h-8 rotate-12" />
                    </div>
                </Card>
            </TooltipProvider>
        </motion.div>
    )
}

export default function ServicesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

    const handleBookNow = (service: typeof services[0]) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const handleScroll = useCallback((dir: 'next' | 'prev') => {
        if (dir === 'next') {
            setDirection(1)
            setActiveIndex((prev) => (prev + 1) % services.length)
        } else {
            setDirection(-1)
            setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
        }
    }, [])

    useEffect(() => {
        setHasMounted(true)
    }, [])

    // Auto Rotation
    useEffect(() => {
        if (!hasMounted || isHovered) return
        const timer = setInterval(() => handleScroll('next'), 4000)
        return () => clearInterval(timer)
    }, [hasMounted, isHovered, handleScroll])

    if (!hasMounted) {
        return <section className="relative py-12 sm:py-16 overflow-hidden bg-transparent min-h-[600px]" />
    }

    return (
        <div
            className="w-full relative overflow-hidden bg-transparent py-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full px-4 mb-10 relative z-20">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40 px-3 py-1 text-[9px] tracking-[0.25em] font-medium uppercase rounded-full">
                            INDUSTRIAL PRECISION
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-7xl font-black text-white mb-6 tracking-tighter"
                    >
                        Industrial <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">AI Engineering</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base font-light px-4"
                    >
                        Precision-engineered solutions for high-stakes enterprise applications,
                        tailored to streamline operations and maximize throughput.
                    </motion.p>
                </div>
            </div>

            {/* Infinite Circular Carousel Track */}
            <div className="relative w-full flex flex-col items-center">
                <div className="relative w-full h-[520px] flex items-center justify-center">
                    <div className="absolute flex gap-4 sm:gap-8 items-center justify-center perspective-[1200px]">
                        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const index = (activeIndex + offset + services.length) % services.length
                                const service = services[index]

                                return (
                                    <motion.div
                                        key={`${service.id}-${offset}`}
                                        custom={direction}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            x: (offset + direction) * 350,
                                            z: -200
                                        }}
                                        animate={{
                                            opacity: 1 - Math.abs(offset) * 0.3,
                                            scale: 1 - Math.abs(offset) * 0.1,
                                            x: offset * 340 + (offset !== 0 ? (offset > 0 ? 40 : -40) : 0),
                                            z: offset === 0 ? 0 : -150 * Math.abs(offset),
                                            rotateY: offset * -15,
                                            filter: offset === 0 ? 'blur(0px)' : 'blur(1px)',
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                            x: (offset - direction) * 350,
                                            z: -200
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 28,
                                            mass: 1
                                        }}
                                        className="absolute cursor-pointer"
                                        onClick={() => {
                                            if (offset === 1) handleScroll('next')
                                            if (offset === -1) handleScroll('prev')
                                        }}
                                    >
                                        <ServiceCard service={service} isCenter={offset === 0} onBookNow={handleBookNow} />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex gap-4 mt-8 z-30 items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-12 h-12 border border-white/10 bg-zinc-900/50 backdrop-blur-md hover:bg-white/10 text-white transition-all shadow-xl group"
                        onClick={() => handleScroll('prev')}
                    >
                        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                    </Button>

                    <div className="flex gap-2 items-center px-6 py-3 bg-zinc-900/20 backdrop-blur-md border border-white/5 rounded-full">
                        {services.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1.5 transition-all duration-500 rounded-full",
                                    i === activeIndex ? "w-10 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "w-1.5 bg-white/10 hover:bg-white/30 cursor-pointer"
                                )}
                                onClick={() => {
                                    setDirection(i > activeIndex ? 1 : -1)
                                    setActiveIndex(i)
                                }}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-12 h-12 border border-white/10 bg-zinc-900/50 backdrop-blur-md hover:bg-white/10 text-white transition-all shadow-xl group"
                        onClick={() => handleScroll('next')}
                    >
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                </div>
            </div>

            {/* Modern Circular Background Effects - Refined for Metallic Look */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border-[0.5px] border-white/5"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500/50 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full border-[0.5px] border-white/[0.02]"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,38,38,0.05)_0%,transparent_70%)] rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#050505_80%)]" />
            </div>

            {/* Quick Contact Modal */}
            <QuickContactModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={selectedService ? `Book ${selectedService.title}` : "Quick Contact"}
                description={selectedService ? `Get started with ${selectedService.title} - Starting from $${selectedService.price}` : "Send us a message and we'll get back to you shortly."}
                defaultMessage={selectedService ? `I'm interested in ${selectedService.title}. Please provide more information about pricing and implementation.` : ""}
            />
        </div>
    )
}
