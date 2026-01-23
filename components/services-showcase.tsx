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
    blue: { bg: "bg-blue-500", text: "text-blue-400", border: "border-blue-500/20" },
    green: { bg: "bg-green-500", text: "text-green-400", border: "border-green-500/20" },
    purple: { bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/20" },
    orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/20" },
    red: { bg: "bg-red-500", text: "text-red-400", border: "border-red-500/20" },
    cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/20" }
}

const ServiceCard = ({ service, isCenter, onBookNow }: { service: typeof services[0], isCenter: boolean, onBookNow?: (service: typeof services[0]) => void }) => {
    const colors = colorVariants[service.color as keyof typeof colorVariants]
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { damping: 25 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { damping: 25 })

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
                "relative transition-all duration-700 w-[300px] sm:w-[340px]",
                isCenter ? "scale-100 z-30 opacity-100" : "scale-90 z-10 opacity-40 blur-[0.5px]"
            )}
        >
            <TooltipProvider>
                <Card className={cn(
                    "h-full rounded-[28px] border bg-black/40 backdrop-blur-2xl text-white p-5 flex flex-col gap-4 shadow-2xl transition-colors duration-500",
                    isCenter ? "border-white/20" : "border-white/5"
                )}>
                    {/* Header */}
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-lg font-bold leading-tight tracking-tight">
                            {service.title}
                        </h2>
                        <p className="text-[10px] sm:text-xs text-white/40 flex items-center gap-1.5 uppercase font-black tracking-widest">
                            <Sparkles className={cn("w-3 h-3", colors.text)} />
                            {service.subtitle}
                        </p>
                    </div>

                    {/* Features - Compact list */}
                    <CardContent className="rounded-[22px] border border-white/5 bg-white/[0.03] px-4 py-5 flex flex-col gap-3">
                        {service.features.map((feature, i) => (
                            <Tooltip key={i} delayDuration={300}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-help select-none text-white/60 hover:text-white transition-colors group/item">
                                        <div className={cn("flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center bg-white/5", colors.text)}>
                                            <Check className="w-2 h-2" />
                                        </div>
                                        <span className="text-[11px] sm:text-xs leading-tight line-clamp-1">{feature.label}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-zinc-900 border-white/10 text-[10px] rounded-lg px-3 py-2">
                                    {feature.info}
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </CardContent>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-tighter text-white/30 font-bold">Starting from</span>
                            <span className="text-xl sm:text-2xl font-black tracking-tighter">${service.price}</span>
                        </div>

                        <Button
                            className={cn(
                                "flex items-center justify-center gap-2 px-4 h-10 rounded-full text-[11px] font-black text-white transition-all",
                                "bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 shadow-xl active:scale-95"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onBookNow) onBookNow(service);
                            }}
                        >
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", colors.bg)}>
                                <Phone className="w-3 h-3 text-white" />
                            </div>
                            <span>Book now</span>
                        </Button>
                    </div>
                </Card>
            </TooltipProvider>
        </motion.div>
    )
}

export default function ServicesShowcase() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

    const handleBookNow = (service: typeof services[0]) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const handleScroll = useCallback((direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setActiveIndex((prev) => (prev + 1) % services.length)
        } else {
            setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
        }
    }, [])

    useEffect(() => {
        setHasMounted(true)
    }, [])

    // Auto Rotation
    useEffect(() => {
        if (!hasMounted || isHovered) return
        const timer = setInterval(() => handleScroll('next'), 3000)
        return () => clearInterval(timer)
    }, [hasMounted, isHovered, handleScroll])

    if (!hasMounted) {
        return <section className="relative py-24 sm:py-32 overflow-hidden bg-black min-h-[600px]" />
    }

    return (
        <div
            className="w-full relative overflow-hidden bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto px-4 mb-20 relative z-20">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-500 px-3 py-1 text-[9px] tracking-[0.25em] font-black uppercase rounded-full">
                            Industrial Precision
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter"
                    >
                        Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">AI Engineering</span>
                    </motion.h2>
                </div>
            </div>

            {/* Infinite Circular Carousel Track */}
            <div className="relative w-full flex flex-col items-center">
                <div className="relative w-full h-[480px] flex items-center justify-center">
                    <div className="absolute flex gap-4 sm:gap-8 items-center justify-center transition-all duration-1000">
                        <AnimatePresence mode="popLayout">
                            {[-2, -1, 0, 1, 2].map((offset) => {
                                const index = (activeIndex + offset + services.length) % services.length
                                const service = services[index]

                                return (
                                    <motion.div
                                        key={`${service.id}-${offset}`}
                                        initial={{ opacity: 0, scale: 0.5, x: offset * 350 }}
                                        animate={{
                                            opacity: 1 - Math.abs(offset) * 0.25,
                                            scale: 1 - Math.abs(offset) * 0.12,
                                            x: offset * 330 + (offset !== 0 ? (offset > 0 ? 30 : -30) : 0),
                                            z: -Math.abs(offset) * 150,
                                            rotateY: offset * -12
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
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
                <div className="flex gap-4 mt-4 z-30 items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                        onClick={() => handleScroll('prev')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex gap-1.5 items-center px-4">
                        {services.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1 transition-all duration-300 rounded-full",
                                    i === activeIndex ? "w-8 bg-red-600" : "w-2 bg-white/10"
                                )}
                            />
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                        onClick={() => handleScroll('next')}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Modern Circular Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-red-500/[0.03] animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full border border-red-500/[0.01]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/[0.03] rounded-full blur-[140px]" />
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
