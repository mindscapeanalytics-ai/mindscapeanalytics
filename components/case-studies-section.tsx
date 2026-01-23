"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, TrendingUp, ShoppingCart, BarChart3, Phone, Package, Brain, ChevronLeft, ChevronRight, Clock, Users, Zap, CheckCircle2, ArrowRight, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type CaseStudy = {
  id: string
  title: string
  category: string
  description: string
  icon: React.ElementType
  image: string
  link?: string
  client?: string
  timeline?: string
  technologies?: string[]
  metrics: {
    label: string
    value: string
    icon?: React.ElementType
    trend?: "up" | "down" | "neutral"
  }[]
  highlights?: string[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "dblynx",
    title: "DBLynx Analytics",
    category: "Data Analytics",
    description: "Enterprise database analytics platform with real-time insights and AI-powered recommendations. Transformed data processing capabilities with advanced query optimization and predictive modeling.",
    icon: BarChart3,
    image: "/images/projects/ai-data-platform.png",
    link: "https://dblynx.mindscapeanalytics.com/",
    client: "Enterprise Client",
    timeline: "6 months",
    technologies: ["PostgreSQL", "Python", "React", "TensorFlow"],
    metrics: [
      { label: "Data Points", value: "10M+", icon: Database, trend: "up" },
      { label: "Response Time", value: "<100ms", icon: Zap, trend: "up" }
    ],
    highlights: [
      "Real-time data processing",
      "AI-powered insights",
      "99.9% uptime SLA"
    ]
  },
  {
    id: "kaitools",
    title: "KAI Tools Suite",
    category: "AI Platform",
    description: "Comprehensive AI toolkit with intelligent automation and workflow optimization. Streamlined business processes with cutting-edge machine learning models and natural language processing.",
    icon: Brain,
    image: "/images/projects/ai-neural-interface.png",
    link: "https://www.kaitools.tech/",
    client: "Tech Enterprise",
    timeline: "8 months",
    technologies: ["OpenAI", "LangChain", "Next.js", "TypeScript"],
    metrics: [
      { label: "AI Models", value: "15+", icon: Brain, trend: "up" },
      { label: "Automation Rate", value: "80%", icon: Zap, trend: "up" }
    ],
    highlights: [
      "Multi-model AI integration",
      "Workflow automation",
      "Enterprise-grade security"
    ]
  },
  {
    id: "kstock",
    title: "K-Stock Analyzer",
    category: "Financial Analytics",
    description: "AI-driven stock market analysis with real-time predictions and portfolio optimization. Delivered actionable insights for traders and investors with advanced algorithmic trading signals.",
    icon: TrendingUp,
    image: "/images/projects/ai-fintech-dashboard.png",
    link: "https://kstockanalyzer.com/",
    client: "Financial Services",
    timeline: "4 months",
    technologies: ["Python", "TensorFlow", "React", "WebSocket"],
    metrics: [
      { label: "Prediction Accuracy", value: "92%", icon: TrendingUp, trend: "up" },
      { label: "Markets Covered", value: "50+", icon: BarChart3, trend: "up" }
    ],
    highlights: [
      "Real-time market analysis",
      "Portfolio optimization",
      "Risk assessment tools"
    ]
  },
  {
    id: "shopify-engine",
    title: "Shopify Conversion Engine",
    category: "E-commerce",
    description: "Intelligent campaign automation converting visitors into buyers with AI recommendations. Increased conversion rates through personalized shopping experiences and dynamic pricing strategies.",
    icon: ShoppingCart,
    image: "/images/projects/ai-fintech-dashboard.png",
    client: "E-commerce Brand",
    timeline: "3 months",
    technologies: ["Shopify API", "Node.js", "Machine Learning", "Redis"],
    metrics: [
      { label: "Conversion Rate", value: "+40%", icon: TrendingUp, trend: "up" },
      { label: "Revenue Growth", value: "+65%", icon: BarChart3, trend: "up" }
    ],
    highlights: [
      "AI-powered recommendations",
      "Dynamic pricing",
      "Personalized experiences"
    ]
  },
  {
    id: "inventory-system",
    title: "Smart Inventory System",
    category: "Enterprise",
    description: "Automated inventory management with predictive analytics and intelligent reordering. Reduced operational costs while maintaining optimal stock levels across multiple warehouse locations.",
    icon: Package,
    image: "/images/projects/ai-data-platform.png",
    client: "Retail Chain",
    timeline: "5 months",
    technologies: ["Python", "PostgreSQL", "React", "IoT Sensors"],
    metrics: [
      { label: "Efficiency Gain", value: "+75%", icon: Zap, trend: "up" },
      { label: "Cost Savings", value: "35%", icon: TrendingUp, trend: "up" }
    ],
    highlights: [
      "Predictive analytics",
      "Automated reordering",
      "Multi-location sync"
    ]
  },
  {
    id: "voice-agent",
    title: "AI Voice Agent",
    category: "Conversational AI",
    description: "Intelligent voice call agent for automated appointment booking with NLP. Handles complex conversations, understands context, and provides natural human-like interactions for customer service.",
    icon: Phone,
    image: "/images/projects/ai-neural-interface.png",
    client: "Healthcare Provider",
    timeline: "4 months",
    technologies: ["OpenAI Whisper", "GPT-4", "Twilio", "Node.js"],
    metrics: [
      { label: "Booking Success", value: "95%", icon: CheckCircle2, trend: "up" },
      { label: "Customer Rating", value: "4.8/5", icon: Users, trend: "up" }
    ],
    highlights: [
      "Natural language processing",
      "24/7 availability",
      "Multi-language support"
    ]
  }
]

export default function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
    setIsAutoPlaying(false)
  }

  const currentStudy = caseStudies[currentIndex]

  return (
    <div className="w-full bg-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Badge variant="outline" className="bg-black/50 border-white/10 text-white/60 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-md">
              PROVEN RESULTS
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Real Projects, Real <span className="text-red-500">Impact</span>
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mx-auto leading-relaxed font-light">
            See how we've transformed businesses with cutting-edge technology and delivered measurable results.
          </p>
        </div>

        {/* Enhanced Carousel Container */}
        <div className="relative">
          {/* Main Card with modern design */}
          <Card
            className="relative bg-gradient-to-br from-white/[0.03] via-white/[0.02] to-white/[0.01] border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Background gradient & Image effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-black/50 to-blue-500/10 opacity-60 pointer-events-none z-0" />
            <div
              className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 hover:opacity-30"
              style={{
                backgroundImage: `url(${currentStudy.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%)', // Elegant B&W base
              }}
            />
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/80 z-0" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 p-8 md:p-12 lg:p-16"
              >
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left: Enhanced Content */}
                  <div className="space-y-6">
                    {/* Icon & Category with Card */}
                    <Card className="bg-transparent border-0 shadow-none p-0">
                      <div className="flex items-start gap-4 mb-6">
                        {/* Icon Removed as requested */}
                        <div className="flex-1">
                          <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 mb-2 text-xs px-3 py-1">
                            {currentStudy.category}
                          </Badge>
                          <CardTitle className="text-3xl md:text-4xl font-bold text-white mt-2 mb-1">
                            {currentStudy.title}
                          </CardTitle>
                          {currentStudy.client && (
                            <CardDescription className="text-white/50 text-sm flex items-center gap-2 mt-2">
                              <Users className="w-4 h-4" />
                              {currentStudy.client}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </Card>

                    {/* Enhanced Description */}
                    <CardDescription className="text-white/70 leading-relaxed text-base md:text-lg">
                      {currentStudy.description}
                    </CardDescription>

                    {/* Technologies & Timeline */}
                    {(currentStudy.technologies || currentStudy.timeline) && (
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        {currentStudy.timeline && (
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Clock className="w-4 h-4" />
                            <span>{currentStudy.timeline}</span>
                          </div>
                        )}
                        {currentStudy.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {currentStudy.technologies.slice(0, 3).map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="bg-white/5 border-white/10 text-white/70 text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {currentStudy.technologies.length > 3 && (
                              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/70 text-xs">
                                +{currentStudy.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Highlights */}
                    {currentStudy.highlights && (
                      <div className="space-y-2 pt-2">
                        {currentStudy.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-white/60">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/10">
                      {currentStudy.metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon || BarChart3
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                              <MetricIcon className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <div className="text-xl font-bold text-white leading-none">
                                {metric.value}
                              </div>
                              <div className="text-xs text-white/50 uppercase tracking-wider font-medium mt-1">
                                {metric.label}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Enhanced Link Button */}
                    {currentStudy.link && (
                      <Button
                        asChild
                        variant="outline"
                        className="mt-6 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 group"
                      >
                        <a
                          href={currentStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          View Live Project
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Right: Enhanced Metrics Cards */}
                  {/* Right: Attractive Project Image - Replaces Metrics Cards */}
                  <div className="hidden md:block relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 group-hover:border-red-500/20 transition-all shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                    <img
                      src={currentStudy.image}
                      alt={currentStudy.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Floating Badge on Image */}
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-white">Live Project</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm z-20"
            >
              <ChevronLeft className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group backdrop-blur-sm z-20"
            >
              <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
            </Button>
          </Card>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsAutoPlaying(false)
                }}
                className={`rounded-full transition-all duration-300 ${idx === currentIndex
                  ? 'w-10 h-2 bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40 hover:scale-125'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <p className="text-xs text-white/30">
              {currentIndex + 1} / {caseStudies.length}
            </p>
          </div>
        </div>

        {/* Enhanced Project Count with Card */}
        <Card className="bg-transparent border-white/10 mt-12">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <p className="text-sm text-white/60">
                <span className="text-white font-bold text-lg">{caseStudies.length}+</span> successful projects delivered
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}