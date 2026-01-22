"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Globe,
    MessageSquare,
    Palette,
    Workflow,
    Brain,
    Smartphone,
    ArrowRight,
    Check,
    PhoneCall
} from "lucide-react"
import Link from "next/link"

const services = [
    {
        id: "web-development",
        title: "Web Development",
        description: "Custom web applications with cutting-edge tech",
        icon: Globe,
        color: "blue",
        href: "/services/web-application-development",
        features: ["React & Next.js", "Responsive Design", "SEO Optimized"]
    },
    {
        id: "chatbot-ai",
        title: "AI Chatbots",
        description: "Intelligent conversational AI solutions",
        icon: MessageSquare,
        color: "green",
        href: "/services/generative-ai-solutions",
        features: ["24/7 Support", "Multi-language", "Smart Learning"]
    },
    {
        id: "ui-ux-design",
        title: "UI/UX Design",
        description: "Beautiful interfaces that drive conversions",
        icon: Palette,
        color: "purple",
        href: "/services/ux-ui-design",
        features: ["User Research", "Prototyping", "Design Systems"]
    },
    {
        id: "automation",
        title: "Automation",
        description: "Streamline operations intelligently",
        icon: Workflow,
        color: "orange",
        href: "/services/ai-powered-automation",
        features: ["Process Automation", "Integration", "Workflow Design"]
    },
    {
        id: "ai-ml",
        title: "AI & ML",
        description: "Advanced AI solutions for business",
        icon: Brain,
        color: "red",
        href: "/services/generative-ai-solutions",
        features: ["Predictive Analytics", "Custom Models", "Data Science"]
    },
    {
        id: "voice-ai",
        title: "Voice/Mobile Call Agent",
        description: "Autonomous AI agents for seamless voice interactions",
        icon: PhoneCall,
        color: "cyan",
        href: "/services/voice-ai-agents",
        features: ["Real-time Voice", "Natural Conversations", "Seamless Handoff"]
    }
]

const colorVariants = {
    blue: {
        gradient: "from-blue-500 to-blue-600",
        shadow: "shadow-blue-500/20",
        hoverShadow: "group-hover:shadow-blue-500/40"
    },
    green: {
        gradient: "from-green-500 to-green-600",
        shadow: "shadow-green-500/20",
        hoverShadow: "group-hover:shadow-green-500/40"
    },
    purple: {
        gradient: "from-purple-500 to-purple-600",
        shadow: "shadow-purple-500/20",
        hoverShadow: "group-hover:shadow-purple-500/40"
    },
    orange: {
        gradient: "from-orange-500 to-orange-600",
        shadow: "shadow-orange-500/20",
        hoverShadow: "group-hover:shadow-orange-500/40"
    },
    red: {
        gradient: "from-red-500 to-red-600",
        shadow: "shadow-red-500/20",
        hoverShadow: "group-hover:shadow-red-500/40"
    },
    cyan: {
        gradient: "from-cyan-500 to-cyan-600",
        shadow: "shadow-cyan-500/20",
        hoverShadow: "group-hover:shadow-cyan-500/40"
    }
}

export default function ServicesShowcase() {
    return (
        <section className="relative py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center mb-4">
                            <Badge variant="outline" className="bg-black/50 border-white/10 text-white/60 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-md">
                                OUR SERVICES
                            </Badge>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Comprehensive AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Solutions</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-white/50 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        Cutting-edge solutions tailored to your business needs, powered by the latest AI technology.
                    </motion.p>
                </div>

                {/* Single Row of 6 Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => {
                        const colors = colorVariants[service.color as keyof typeof colorVariants]
                        const Icon = service.icon

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <Link href={service.href}>
                                    <Card className={`group relative h-full bg-black/60 backdrop-blur-md border-white/10 transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl ${colors.shadow} hover:shadow-2xl ${colors.hoverShadow} hover:-translate-y-2`}>
                                        {/* Premium Glow Effect */}
                                        <div className={`absolute -inset-[2px] bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm`}></div>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                        <CardContent className="relative p-6 flex flex-col h-full min-h-[280px]">
                                            {/* Icon */}
                                            <div className={`mb-4 p-3 rounded-xl bg-gradient-to-br ${colors.gradient} transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg self-start`}>
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-base font-bold mb-2 text-white group-hover:text-white transition-colors">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-xs text-white/60 mb-4 leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Features List */}
                                            <ul className="space-y-2 mb-4 flex-grow">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-white/50">
                                                        <Check className="h-3 w-3 mt-0.5 flex-shrink-0 text-white/40" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Arrow Icon */}
                                            <div className="mt-auto pt-4 border-t border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Learn more</span>
                                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                                        <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
