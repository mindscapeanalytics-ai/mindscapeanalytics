"use client"

import { motion } from "framer-motion"
import { Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

const productsData = [
    {
        title: "DisposIQ",
        subtitle: "Production + Disposal Intelligence",
        category: "Industrial",
        description: "Enterprise-grade production and disposal management with real-time SKU tracking, ML forecasting, and automated waste classification.",
        features: ["Real-time SKU Tracking", "ML Forecasting", "Waste Classification", "Enterprise Audit Trails"],
        link: "https://disposiq.mindscapeanalytics.com/",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/production-and-disposal-mindsacpeanalytics-qEsGGfMx3bOktC9eCf5lfbgsXesqGV.png",
        status: "Live",
        accentColor: "#2563eb"
    },
    {
        title: "Smart DairyFarm",
        subtitle: "Intelligent Farm Management System",
        category: "Agriculture",
        description: "Complete dairy farm operations hub with animal tracking, milk production analytics, feed inventory, and financial forecasting.",
        features: ["Animal Health Records", "Milk Production Analytics", "Feed Inventory", "Financial Forecasting"],
        link: "https://cattle.mindscapeanalytics.com/",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dairy_farm_mindscapeanalytics-0AnYCxsPLXsizXKp1dMxDz6FY7ndOe.png",
        status: "Live",
        accentColor: "#10b981"
    },
    {
        title: "TENVO",
        subtitle: "Advanced Business Growth Solution",
        category: "Enterprise",
        description: "All-in-one operations intelligence hub for inventory management, sales invoicing, financial controls, and strategic business analytics.",
        features: ["Operations Intelligence", "Inventory Management", "Sales Invoicing", "Strategic Analytics"],
        link: "https://tenvo.mindscapeanalytics.com/",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tenvo-mindscapeanalytics-oLhUNYZ68SWJ5SqhnBWweQViqgqrvo.png",
        status: "Coming Soon",
        accentColor: "#a855f7"
    },
    {
        title: "RSIQ Pro",
        subtitle: "Real Time Trading Signal Solution",
        category: "FinTech",
        description: "Advanced technical analysis platform with real-time trading signals, 20+ indicators, ML-powered sentiment analysis, and risk management tools.",
        features: ["Real-time Signals", "20+ Indicators", "ML Sentiment", "Risk Management"],
        link: "https://rsiq.mindscapeanalytics.com/",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rsiq-mindscapeanalytics-VVowqmsToPCpsxsiqGcAj1q3QWqKfu.png",
        status: "Live",
        accentColor: "#10b981"
    },
    {
        title: "CyberTrader-X",
        subtitle: "Autonomous Trading System",
        category: "FinTech",
        description: "Intelligent crypto, forex, and metals trading platform with autonomous signal execution, intraday/swing/scalping capabilities, and customizable indicators.",
        features: ["Autonomous Execution", "Multi-Asset Trading", "Intraday/Swing/Scalping", "Custom Indicators"],
        link: "https://traderx.mindscapeanalytics.com/",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/traderX-mindscapeanalytics-K4NYwivAwpjoorURDZvED7H805nT6O.png",
        status: "Live",
        accentColor: "#14b8a6"
    }
]

export default function ProductsShowcase() {
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

    return (
        <section id="products-showcase" className="relative pt-0 pb-32 px-6 overflow-hidden bg-transparent text-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-10 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-[9px] font-mono font-black tracking-[0.5em] uppercase leading-none mt-0.5">Our Flagship Products // LIVE_PLATFORM_v2026</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] mb-6 leading-[0.9] font-syncopate uppercase">
                        POWERING <br />
                        <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">REAL-WORLD OPERATIONS</span>
                    </h2>
                    <p className="text-white/40 text-base max-w-2xl mt-4">
                        Battle-tested platforms for agriculture, industrial production, enterprise operations, and financial trading
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {productsData.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredProduct(product.title)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            className="group relative h-full"
                        >
                            <Link href={product.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                {/* Background card */}
                                <div className={cn(
                                    "relative h-full rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-500",
                                    hoveredProduct === product.title
                                        ? "bg-white/[0.08] border-yellow-500/50 shadow-[0_0_30px_rgba(250,223,3,0.2)]"
                                        : "bg-white/5 border-white/10 hover:border-yellow-500/30"
                                )}>

                                    {/* Image Preview on Hover */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredProduct === product.title ? 1 : 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover opacity-40"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                        {/* Top Section */}
                                        <div>
                                            <div className="flex items-start justify-between mb-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={cn(
                                                            "text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-[0.2em]",
                                                            product.status === "Live"
                                                                ? "bg-green-500/20 text-green-300"
                                                                : "bg-yellow-500/20 text-yellow-300"
                                                        )}>
                                                            {product.status}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-3xl font-black mb-1 group-hover:text-yellow-400 transition-colors">
                                                        {product.title}
                                                    </h3>
                                                    <p className="text-white/60 text-sm font-semibold">
                                                        {product.subtitle}
                                                    </p>
                                                </div>
                                                <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-yellow-400 transition-colors opacity-0 group-hover:opacity-100" />
                                            </div>

                                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                                {product.description}
                                            </p>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-2">
                                                {product.features.slice(0, 2).map((feature) => (
                                                    <span key={feature} className="text-[8px] font-black px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 uppercase tracking-[0.15em]">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {product.features.length > 2 && (
                                                    <span className="text-[8px] font-black px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 uppercase tracking-[0.15em]">
                                                        +{product.features.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom CTA */}
                                        <motion.div
                                            animate={{ y: hoveredProduct === product.title ? 0 : 10, opacity: hoveredProduct === product.title ? 1 : 0.6 }}
                                            className="mt-8 pt-6 border-t border-white/10"
                                        >
                                            <div className="flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-[0.15em]">
                                                Explore Product
                                                <motion.span
                                                    animate={{ x: hoveredProduct === product.title ? 4 : 0 }}
                                                    className="inline-block"
                                                >
                                                    →
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Accent line */}
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-500"
                                        style={{
                                            width: hoveredProduct === product.title ? "100%" : "0%"
                                        }}
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 flex justify-center">
                    <Link href="#solutions" className="group relative px-8 py-4 bg-yellow-400 text-black font-black uppercase text-sm tracking-[0.2em] rounded-full overflow-hidden shadow-[0_0_30px_rgba(250,223,3,0.3)] transition-all hover:shadow-[0_0_40px_rgba(250,223,3,0.5)] hover:scale-105 active:scale-95">
                        <span className="relative z-10 flex items-center gap-3">
                            View All Solutions
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}
