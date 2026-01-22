"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Database, Brain, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { navigateToContactForm } from "@/lib/utils"
import { TypographyConfig } from "@/types/hero-enhancement"
import { useTypography } from "@/lib/typography-system"

interface ContentSectionProps {
  typographyConfig: TypographyConfig
  className?: string
  mode?: 'full' | 'heading' | 'content' // Added mode prop
}

/**
 * Enhanced Content Section
 * 
 * Implements improved typography system with proper line heights,
 * enhanced visual hierarchy, and accessibility compliance.
 */
export function ContentSection({ typographyConfig, className, mode = 'full' }: ContentSectionProps) {
  const {
    getResponsiveFontSize,
    getLineHeightStyles,
    getTextShadowStyles,
    getGradientTextClasses,
    getFocusStyles,
    getSpacingClasses
  } = useTypography(typographyConfig)

  const handleGetStartedClick = () => {
    navigateToContactForm()
  }

  // Get spacing classes for consistent hierarchy
  const spacing = getSpacingClasses()

  // Get gradient text configurations
  const redGradient = getGradientTextClasses(0)
  const blueGradient = getGradientTextClasses(1)

  // Enhanced animation sequence with staggered delays
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const renderHeading = () => (
    <>
      {/* Professional Badges - Repositioned above headline for maximum impact */}
      <motion.div
        className={`flex flex-nowrap gap-2 justify-center lg:justify-start w-full overflow-x-auto scrollbar-hide pb-1 ${spacing.badgeSpacing}`}
        variants={itemVariants}
      >
        <Badge className={`bg-red-950/90 border border-red-600/40 text-red-200 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-semibold backdrop-blur-xl shadow-lg hover:bg-red-900/90 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" aria-hidden="true" />
          Data Platforms
        </Badge>
        <Badge className={`bg-blue-950/90 border border-blue-600/40 text-blue-200 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-semibold backdrop-blur-xl shadow-lg hover:bg-blue-900/90 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" aria-hidden="true" />
          AI Systems
        </Badge>
        <Badge className={`bg-green-950/90 border border-green-600/40 text-green-200 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-semibold backdrop-blur-xl shadow-lg hover:bg-green-900/90 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" aria-hidden="true" />
          Automation
        </Badge>
      </motion.div>

      {/* Enhanced Main Headline with improved typography */}
      <motion.div variants={itemVariants}>
        <h1
          className={`${getResponsiveFontSize()} text-3xl sm:text-5xl font-black tracking-tight ${spacing.headlineSpacing} hero-headline`}
          style={{
            ...getLineHeightStyles(),
            ...getTextShadowStyles()
          }}
        >
          <span className="block text-white mb-1 font-black">Engineering</span>
          <span className="block text-white mb-1 font-black">Intelligent Data</span>
          <span className="block text-white mb-1 font-black">& AI Systems</span>
          <span className="block text-red-500 font-black">for Modern Enterprises</span>
        </h1>
      </motion.div>
    </>
  )

  const renderContent = () => (
    <>
      {/* Enhanced Description with clear visual hierarchy */}
      <motion.div
        variants={itemVariants}
        className={`space-y-3 max-w-2xl mx-auto lg:mx-0 ${spacing.descriptionSpacing}`}
      >
        {/* Primary description with enhanced styling */}
        <p
          className="text-sm sm:text-xl text-white/95 leading-relaxed font-light hero-text"
          style={getTextShadowStyles()}
        >
          Mindscape Analytics delivers scalable data platforms, AI systems, and automation solutions that help organizations operate smarter, faster, and with greater control.
        </p>

        {/* Secondary description with proper hierarchy */}
        <p
          className="text-base lg:text-lg text-white/80 leading-relaxed hero-text"
          style={getTextShadowStyles()}
        >
          We design, build, and optimize systems that perform in real-world production environments.
        </p>
      </motion.div>

      {/* Enhanced CTA Buttons - Single row on mobile with reduced size */}
      <motion.div
        className={`flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 ${spacing.ctaSpacing}`}
        variants={itemVariants}
      >
        {/* Primary CTA - Compact on mobile */}
        <Button
          size="default"
          className={`group relative flex-1 sm:flex-none px-4 py-2.5 sm:px-8 sm:py-4 text-xs sm:text-lg font-bold text-white rounded-lg sm:rounded-xl hover:brightness-110 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-red-500/30 hover:scale-[1.02] border border-red-500/20 ${getFocusStyles()}`}
          onClick={handleGetStartedClick}
          aria-label="Get started with Mindscape Analytics - Contact us for consultation"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 group-hover:from-red-500 group-hover:via-red-400 group-hover:to-red-500 transition-all duration-500 rounded-lg sm:rounded-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"></div>
          <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
            Get Started
            <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Button>

        {/* Secondary CTA - Compact on mobile */}
        <Link href="/solutions" className="flex-1 sm:flex-none">
          <Button
            size="default"
            variant="outline"
            className={`group relative w-full px-3 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-base font-semibold text-white border border-white/30 sm:border-2 hover:border-white/50 hover:bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-white/10 ${getFocusStyles()}`}
            aria-label="View our solutions and services"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"></div>
            <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
              View Solutions
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Button>
        </Link>
      </motion.div>
    </>
  )

  return (
    <motion.div
      className={`flex flex-col justify-center space-y-6 text-center lg:text-left ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(mode === 'full' || mode === 'heading') && renderHeading()}
      {(mode === 'full' || mode === 'content') && renderContent()}
    </motion.div>
  )
}