"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Brain,
  Zap,
  Shield,
  Database,
  Globe,
  TrendingUp,
  Activity as ActivityIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { navigateToContactForm } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import { FlexibleSection } from "@/components/flexible-section"
import RadialOrbitalTimeline from "@/components/radial-orbital-timeline"

// Enterprise Timeline Data
const enterpriseTimelineData = [
  {
    id: 1,
    title: "Data Platform",
    date: "Phase 1",
    content: "Scalable data infrastructure with real-time processing capabilities and enterprise-grade security compliance.",
    category: "Infrastructure",
    icon: Database,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "AI Systems",
    date: "Phase 2",
    content: "Intelligent automation systems with machine learning models optimized for production environments.",
    category: "AI/ML",
    icon: Brain,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "Analytics Engine",
    date: "Phase 3",
    content: "Advanced analytics platform with predictive modeling and real-time business intelligence capabilities.",
    category: "Analytics",
    icon: TrendingUp,
    relatedIds: [1, 5],
    status: "in-progress" as const,
    energy: 92,
  },
  {
    id: 4,
    title: "Automation Suite",
    date: "Phase 4",
    content: "Comprehensive automation solutions that streamline operations and reduce manual intervention.",
    category: "Automation",
    icon: Zap,
    relatedIds: [2, 6],
    status: "pending" as const,
    energy: 85,
  },
  {
    id: 5,
    title: "Control Systems",
    date: "Phase 5",
    content: "Centralized control and monitoring systems providing complete operational visibility and management.",
    category: "Control",
    icon: Shield,
    relatedIds: [3, 6],
    status: "pending" as const,
    energy: 90,
  },
  {
    id: 6,
    title: "Production Deploy",
    date: "Phase 6",
    content: "Full production deployment with performance optimization and real-world environment validation.",
    category: "Deployment",
    icon: Globe,
    relatedIds: [4, 5],
    status: "pending" as const,
    energy: 87,
  },
];

// Update interface for HyperHero with fullWidth prop
interface HyperHeroProps {
  fullWidth?: boolean;
}

// Main Hero Component
export default function HyperHero({ fullWidth = true }: HyperHeroProps) {
  const isMobile = useMobile();
  
  // Handle Get Started button click
  const handleGetStartedClick = () => {
    navigateToContactForm();
  };

  // Remove the dynamic viewport meta tag and use pure CSS approach instead
  useEffect(() => {
    // Add styles to fix zoom issues
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="relative pt-8 pb-0 overflow-hidden min-h-[90vh] flex flex-col w-full">
      {/* Enhanced Enterprise Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Multi-layer gradient background with enterprise depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/98 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.08),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(59,130,246,0.06),rgba(255,255,255,0))]" />
      
      {/* Subtle animated enterprise orbs */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-red-500/6 rounded-full blur-[60px] animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] bg-blue-500/4 rounded-full blur-[50px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Main Content Container */}
      <FlexibleSection
        fullWidth={fullWidth}
        className="relative z-10 flex-1 flex items-center justify-center py-8"
        noPadding={false}
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(90vh-6rem)]">
            
            {/* Left Column - Content */}
            <motion.div
              className="flex flex-col justify-center space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Professional Badges */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-red-950/70 to-red-900/50 border-red-600/40 text-red-200 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <Database className="h-3 w-3 mr-1.5" />
                  Data Platforms
                </Badge>
                <Badge className="bg-gradient-to-r from-blue-950/70 to-blue-900/50 border-blue-600/40 text-blue-200 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <Brain className="h-3 w-3 mr-1.5" />
                  AI Systems
                </Badge>
                <Badge className="bg-gradient-to-r from-green-950/70 to-green-900/50 border-green-600/40 text-green-200 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                  <Zap className="h-3 w-3 mr-1.5" />
                  Automation
                </Badge>
              </motion.div>

              {/* Main Headline - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9] mb-4">
                  <span className="block text-white mb-1">Engineering</span>
                  <span className="block text-white mb-1">Intelligent Data</span>
                  <span className="block text-white mb-1">& AI Systems</span>
                  <span className="block text-red-600 font-semibold">for Modern Enterprises</span>
                </h1>
              </motion.div>

              {/* Enterprise Description - Compact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3 max-w-2xl mx-auto lg:mx-0"
              >
                <p className="text-lg text-white/90 leading-relaxed font-light">
                  Mindscape Analytics delivers scalable data platforms, AI systems, and automation solutions that help organizations operate smarter, faster, and with greater control.
                </p>
                <p className="text-base text-white/70 leading-relaxed">
                  We design, build, and optimize systems that perform in real-world production environments.
                </p>
              </motion.div>

              {/* Enterprise CTA Buttons - Compact */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  size="default"
                  className="group relative w-full sm:w-auto px-6 py-3 text-base font-semibold text-white rounded-xl hover:brightness-110 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-red-500/25 hover:scale-[1.02]"
                  onClick={handleGetStartedClick}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 group-hover:from-red-500 group-hover:via-red-400 group-hover:to-red-500 transition-all duration-500 rounded-xl"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Link href="/solutions" className="w-full sm:w-auto">
                  <Button
                    size="default"
                    variant="outline"
                    className="group relative w-full px-6 py-3 text-base font-semibold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Solutions
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Interactive Timeline - Compact */}
            {!isMobile && (
              <motion.div
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9, x: 60 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-full h-[420px] flex items-center justify-center">
                  <RadialOrbitalTimeline timelineData={enterpriseTimelineData} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </FlexibleSection>

      {/* Enterprise Trust Banner - Compact */}
      <motion.div 
        className="relative w-full bg-gradient-to-r from-black/90 via-black/95 to-black/90 backdrop-blur-sm border-t border-white/10 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <FlexibleSection
          fullWidth={fullWidth}
          className="w-full"
          noPadding={false}
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/50" />
                <span className="text-sm font-medium text-white/80">Systems Online</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <ActivityIcon className="h-3 w-3 text-blue-400" />
                <span className="text-sm font-medium text-white/80">Production Ready</span>
              </div>
            </div>
            <Card className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 border-white/20 backdrop-blur-md">
              <div className="flex items-center gap-2 px-4 py-2">
                <Shield className="h-3 w-3 text-red-400" />
                <span className="text-sm font-semibold text-white/90">Enterprise Grade</span>
              </div>
            </Card>
          </div>
        </FlexibleSection>
      </motion.div>
    </div>
  )
}

// Enhanced CSS styles for enterprise-grade animations
const styles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }

  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes shine {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 4s ease infinite;
  }

  .animate-shine {
    animation: shine 1.5s ease-in-out;
  }

  /* Scrollbar hide utility */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Fix for zoom issues */
  .fixed-zoom {
    transform: scale(1);
    transform-origin: center;
  }
`