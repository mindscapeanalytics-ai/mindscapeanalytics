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
    src: "/our_products/dblynx.png",
    alt: "DBLynx - Database Management Platform",
    title: "DBLynx",
    description: "Advanced database management and analytics platform"
  },
  {
    src: "/our_products/breachdata.jpg",
    alt: "BreachData - Security Analytics Platform",
    title: "BreachData",
    description: "Comprehensive security analytics and threat detection"
  },
  {
    src: "/our_products/mindscapeanalytics_UAE_real_estate_app.png",
    alt: "Mindscape Analytics UAE Real Estate App",
    title: "Real Estate Analytics",
    description: "AI-powered real estate market intelligence platform"
  },
  {
    src: "/our_products/predictive-analytics-uae.png",
    alt: "Predictive Analytics UAE Platform",
    title: "Predictive Analytics",
    description: "Advanced predictive analytics and forecasting platform"
  },
  {
    src: "/our_products/uae_advanced_calculate_mortgage.png",
    alt: "UAE Advanced Mortgage Calculator",
    title: "Mortgage Calculator",
    description: "Advanced mortgage calculation and financial planning tool"
  },
  {
    src: "/our_products/mortgage.png",
    alt: "Mortgage Management Platform",
    title: "Mortgage Manager",
    description: "Comprehensive mortgage management and analysis system"
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
    <section className="py-8 md:py-12 relative overflow-hidden bg-black">
      {/* Background elements - matching site theme */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - matching site theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <Badge className="mb-4 bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1.5" />
              OUR PRODUCTS
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Try Out Our Products
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Explore our innovative solutions and see them in action
            </p>
          </motion.div>

          {/* Window Container - Enhanced with theme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Window Frame - Enhanced styling */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300 hover:border-red-500/30">
              {/* Window Header - Terminal Style with theme */}
              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-white/10 px-4 py-3 flex items-center justify-between backdrop-blur-sm">
                {/* Window Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
                </div>
                
                {/* Window Title */}
                <div className="flex-1 text-center">
                  <span className="text-xs text-white/70 font-mono">products-viewer</span>
                  <span className="text-xs text-red-400/60 font-mono ml-2">v1.0</span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  >
                    {isAutoPlaying ? (
                      <Pause className="h-3.5 w-3.5" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Window Content - Enhanced */}
              <div className="relative bg-gradient-to-br from-black via-black to-gray-900 aspect-video overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={productImages[currentIndex].src}
                      alt={productImages[currentIndex].alt}
                      fill
                      className="object-contain p-2"
                      priority={currentIndex === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                    {/* Overlay gradient for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Enhanced */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-500/20 backdrop-blur-md border border-white/20 hover:border-red-500/50 rounded-full p-2.5 transition-all duration-300 hover:scale-110 z-10 group"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="h-5 w-5 text-white group-hover:text-red-400 transition-colors" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-500/20 backdrop-blur-md border border-white/20 hover:border-red-500/50 rounded-full p-2.5 transition-all duration-300 hover:scale-110 z-10 group"
                  aria-label="Next product"
                >
                  <ChevronRight className="h-5 w-5 text-white group-hover:text-red-400 transition-colors" />
                </button>

                {/* Product Title Overlay - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={currentIndex}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-red-500/30 rounded-lg px-4 py-2.5 z-10 shadow-lg shadow-red-500/10"
                >
                  <p className="text-sm font-semibold text-white mb-0.5">
                    {productImages[currentIndex].title}
                  </p>
                  <p className="text-xs text-white/60">
                    {productImages[currentIndex].description}
                  </p>
                </motion.div>
              </div>

              {/* Window Footer - Status Bar - Enhanced */}
              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-t border-white/10 px-4 py-2.5 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50"></div>
                  <span className="text-xs text-white/70 font-mono">System Operational</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-white/50 font-mono">
                    <span className="text-red-400">{currentIndex + 1}</span>
                    <span className="text-white/30"> / </span>
                    <span className="text-white/50">{productImages.length}</span>
                  </div>
                  <div className="w-px h-4 bg-white/10"></div>
                  <div className="text-xs text-white/40 font-mono">
                    {isAutoPlaying ? "Auto" : "Manual"}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator - Enhanced */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 relative",
                    index === currentIndex
                      ? "bg-red-500 w-8 shadow-md shadow-red-500/50"
                      : "bg-white/30 hover:bg-white/50 w-2"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute inset-0 bg-red-500 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
