"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Flag,
    DollarSign,
    Zap,
    Shield,
    Clock,
    Award,
    HeadphonesIcon,
    ArrowRight,
    CheckCircle,
    Code2,
    Cpu,
    Rocket
} from "lucide-react"

const advantages = [
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Senior AI Engineering",
        description: "Direct access to senior AI engineers, not just account managers.",
        highlight: "Expert-led development",
        color: "from-zinc-700 to-zinc-800", // Neutral gradient for card background
        iconColor: "text-white"
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Security-First",
        description: "Enterprise-grade security defaults with SOC2 compliance alignment.",
        highlight: "Data protection",
        color: "from-zinc-700 to-zinc-800",
        iconColor: "text-zinc-400"
    },
    {
        icon: <Code2 className="h-6 w-6" />,
        title: "Clean Architecture",
        description: "Scalable, maintainable codebases built for long-term production use.",
        highlight: "Future-proof solutions",
        color: "from-zinc-700 to-zinc-800",
        iconColor: "text-zinc-300"
    },
    {
        icon: <Cpu className="h-6 w-6" />,
        title: "High Performance",
        description: "Optimized for speed and efficiency at every layer of the stack.",
        highlight: "Blazing fast",
        color: "from-zinc-700 to-zinc-800",
        iconColor: "text-zinc-500"
    },
    {
        icon: <Rocket className="h-6 w-6" />,
        title: "Rapid Deployment",
        description: "From concept to production in weeks, not months.",
        highlight: "Quick market entry",
        color: "from-zinc-700 to-zinc-800",
        iconColor: "text-white/80"
    },
    {
        icon: <HeadphonesIcon className="h-6 w-6" />,
        title: "24/7 Support",
        description: "Always Available",
        highlight: "Dedicated manager",
        color: "from-red-500 to-red-600",
        iconColor: "text-red-400"
    }
]

export default function WhyChooseUs() {
    return (
        <section className="py-2 relative overflow-hidden bg-black/0">
            {/* Background elements - Adjusted for transparency */}
            <div className="absolute inset-0 bg-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

            <div className="container mx-auto px-0 md:px-2 relative z-10">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-3">
                        <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
                            WHY CHOOSE US
                        </Badge>
                    </div>
                    <h2 className="text-3xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                        Your Success is <span className="text-red-500">Our Priority</span>
                    </h2>
                    <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
                        We're not just another agency - we're your dedicated partner in digital transformation
                    </p>
                </div>

                {/* Grid Layout Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
                    {advantages.map((advantage, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 h-full hover:border-red-500/30 transition-all duration-300 group relative overflow-hidden">
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${advantage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <CardContent className="p-3 relative z-10 flex flex-col h-full items-start">
                                    {/* Icon */}
                                    <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                                        {advantage.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-sm font-bold mb-0.5">{advantage.title}</h3>
                                    <p className="text-[10px] uppercase font-semibold text-white/60 mb-1.5 tracking-wide">{advantage.description}</p>

                                    {/* Highlight */}
                                    <div className="flex items-center gap-1.5 text-[10px] text-white/80 mt-auto bg-white/5 px-2 py-1 rounded-full border border-white/5 w-full">
                                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                                        <span className="truncate">{advantage.highlight}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-6"
                >
                    <Card className="bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-500/30 inline-block">
                        <CardContent className="p-2 px-4">
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-red-400" />
                                    <div className="text-left">
                                        <p className="text-xs font-semibold">Limited Availability</p>
                                        <p className="text-[10px] text-white/70"><span className="text-green-400 font-bold">2 spots</span> left</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold" asChild>
                                        <a href="#instant-quote">
                                            Get Quote
                                            <ArrowRight className="ml-1.5 h-3 w-3" />
                                        </a>
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs border-white/20 hover:bg-white/10" asChild>
                                        <a href="mailto:zeeshan.keerio@mindscapeanalytics.com">
                                            Email Us
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
