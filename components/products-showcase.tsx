"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const productImages = [
  {
    src: "/images/projects/inventory.png",
    alt: "Enterprise Inventory Management",
    title: "Inventory Pro",
    description: "Cloud-native ERP system for seamless supply chain tracking and optimization.",
    category: "ERP & Logistics"
  },
  {
    src: "/images/projects/CYBERTRADERX.png",
    alt: "CyberTraderX Trading Platform",
    title: "CyberTraderX",
    description: "High-frequency AI trading dashboard with real-time market structure analysis.",
    category: "FinTech"
  },
  {
    src: "/images/projects/mindscape-lms.png",
    alt: "Mindscape LMS",
    title: "Mindscape LMS",
    description: "Advanced learning management system with AI-driven student progress tracking.",
    category: "EdTech"
  },
  {
    src: "/images/projects/AgriChian.jpg",
    alt: "AgriChain Solutions",
    title: "AgriChain",
    description: "Blockchain-powered agricultural supply chain for farm-to-table transparency.",
    category: "AgriTech"
  },
  {
    src: "/images/projects/breach-data.png",
    alt: "BreachData Security Monitoring",
    title: "BreachData",
    description: "Global security analytics platform monitoring 50B+ leaked records in real-time.",
    category: "CyberSecurity"
  },
  {
    src: "/images/projects/real_estate_solutions.png",
    alt: "Real Estate Analytics",
    title: "EstateIntelligence",
    description: "AI valuation and market forecasting platform for global real estate portfolios.",
    category: "PropTech"
  },
  {
    src: "/images/projects/dblynx-database-intelligence-mindscapeanalytics.PNG",
    alt: "KAITools Analytics",
    title: "DBlynx Analytics",
    description: "Intelligent database explorer with automated schema visualization and query optimization.",
    category: "DevOps"
  },
  {
    src: "/images/projects/cattle_farm.png",
    alt: "Cattle Farm Manager",
    title: "CattleManager AI",
    description: "IoT and AI-powered livestock management for precision dairy and meat farming.",
    category: "AgriTech"
  },
  {
    src: "/images/projects/cryforecast.png",
    alt: "Crypto Forecasting",
    title: "CryForecast",
    description: "Predictive engine for digital assets utilizing deep learning and sentiment analysis.",
    category: "FinTech"
  },
  {
    src: "/images/projects/ll-mindscapeanalytics.png",
    alt: "Mindscape Formations",
    title: "Formations Assistant",
    description: "One-stop entity formation and legal compliance portal for global entrepreneurs.",
    category: "LegalTech"
  },
  {
    src: "/images/projects/vehicle_analysis_dashboard.png",
    alt: "Vehicle Analysis Dashboard",
    title: "AutoInsights Dashboard",
    description: "Advanced telemetrics and diagnostic visualizer for autonomous fleet management.",
    category: "Automotive"
  },
  {
    src: "/images/projects/Crypto_folio_App.png",
    alt: "Crypto Portfolio App",
    title: "Portfolio Master",
    description: "Seamless multi-wallet portfolio tracking with advanced tax and P&L reporting.",
    category: "FinTech"
  },
  {
    src: "/images/projects/mindscape-mortgage.png",
    alt: "Mindscape Mortgage AI Suite",
    title: "MortgageIntelligence",
    description: "Advanced AI mortgage and financial analysis suite for enterprise real estate.",
    category: "FinTech & PropTech"
  },
  {
    src: "/images/projects/KStock_Analyzer.png",
    alt: "KStock Analyzer",
    title: "KStock Analyzer",
    description: "Real-time stock pattern recognition engine analyzing billions of events for predictive trading.",
    category: "FinTech"
  },
  {
    src: "/images/projects/amazon_inventory.png",
    alt: "Inventory Mastery",
    title: "Inventory Mastery",
    description: "Amazon inventory & supply chain management suite with automated stock forecasting.",
    category: "E-commerce"
  },
  {
    src: "/images/projects/jfbz_token.png",
    alt: "JFBZ Token Eco",
    title: "JFBZ Token Eco",
    description: "Blockchain-powered tokenization and DeFi portal for decentralized asset management.",
    category: "Web3"
  },
  {
    src: "/images/projects/image_annotation_tool.png",
    alt: "VisionAnnotate AI Tool",
    title: "VisionAnnotate",
    description: "Advanced AI image annotation and dataset management tool for computer vision models.",
    category: "AI Infrastructure"
  },
  {
    src: "/images/projects/our_web_designs.png",
    alt: "Elite Web Designs",
    title: "Elite Web Designs",
    description: "Showcase of premium, interactive UI/UX architecture and high-conversion landing pages.",
    category: "Design & UX"
  },
  {
    src: "/images/projects/Investment_Insights.png",
    alt: "Investment Insights AI",
    title: "Investment Insights",
    description: "AI-driven market analysis and portfolio optimization for professional investors.",
    category: "Wealth Management"
  },
  {
    src: "/images/projects/Automated Workflows.png",
    alt: "AutoFlow Pro",
    title: "AutoFlow Pro",
    description: "Enterprise-grade automated workflow and process engine for hyper-efficiency.",
    category: "Enterprise AI"
  },
  {
    src: "/images/projects/Crypto_Tracker.png",
    alt: "CryptoTracker Pro",
    title: "CryptoTracker Pro",
    description: "Unified digital asset monitoring with real-time alerts and deep chain analysis.",
    category: "Web3 & FinTech"
  }
]

export default function ProductsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate images
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovered])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % productImages.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 relative overflow-hidden bg-black">
      {/* Immersive background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-red-900/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-red-500/10 text-red-500 border-red-500/20 px-4 py-1 text-xs tracking-widest uppercase">
            Innovate • Scale • Dominate
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter">
            <span className="text-white">Try Out Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-600">
              Elite Products
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Experience the future of enterprise software. Our battle-tested solutions are designed to scale your business with the power of Artificial Intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
          {/* Main Visualizer (Frame-less) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 relative aspect-[16/10] md:aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background glass effect */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl z-0"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:border-red-500/30 transition-colors duration-500">
                  <Image
                    src={productImages[currentIndex].src}
                    alt={productImages[currentIndex].alt}
                    fill
                    className="object-cover"
                    priority={currentIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    unoptimized
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  {/* Navigation Arrows (Internal) */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <button
                      onClick={goToPrevious}
                      className="bg-black/50 hover:bg-red-600 backdrop-blur-xl border border-white/10 rounded-full p-3 transition-all transform hover:scale-110"
                    >
                      <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="bg-black/50 hover:bg-red-600 backdrop-blur-xl border border-white/10 rounded-full p-3 transition-all transform hover:scale-110"
                    >
                      <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                  </div>

                  {/* Play/Pause Control */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-6 right-6 z-40 bg-white/10 hover:bg-red-600 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2 transition-all transform hover:translate-y-[-2px] shadow-lg"
                  >
                    {isAutoPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      {isAutoPlaying ? "Running" : "Paused"}
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Info Side Content */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-[2px] w-8 bg-red-600"></span>
                    <span className="text-red-500 font-bold text-xs uppercase tracking-tighter">
                      {productImages[currentIndex].category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                    {productImages[currentIndex].title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">
                    {productImages[currentIndex].description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
                    <p className="text-white font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Active
                    </p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Platform</p>
                    <p className="text-white font-bold">PWA Enabled</p>
                  </div>
                </div>

                <Button
                  className="w-full h-14 bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-500 text-sm font-bold uppercase tracking-widest rounded-2xl group shadow-xl"
                  onClick={() => window.location.href = "/contact?interest=demo"}
                >
                  Request Live Demo
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Nav / Dots */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-1.5 transition-all duration-500 rounded-full",
                    index === currentIndex
                      ? "bg-red-600 w-10"
                      : "bg-white/20 hover:bg-white/40 w-4"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
