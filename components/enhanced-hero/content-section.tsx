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
  mode?: 'full' | 'text' | 'actions' // Updated mode prop
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
      {/* Professional Badges - Monochrome Industrial Look */}
      <motion.div
        className={`flex flex-nowrap gap-2 justify-center lg:justify-start w-full overflow-x-auto scrollbar-hide pb-1 ${spacing.badgeSpacing}`}
        variants={itemVariants}
      >
        <Badge className={`bg-zinc-900/90 border border-zinc-700/50 text-zinc-300 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-medium backdrop-blur-xl shadow-lg hover:bg-zinc-800 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-red-500" aria-hidden="true" />
          Data Platforms
        </Badge>
        <Badge className={`bg-zinc-900/90 border border-zinc-700/50 text-zinc-300 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-medium backdrop-blur-xl shadow-lg hover:bg-zinc-800 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Brain className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-red-500" aria-hidden="true" />
          AI Systems
        </Badge>
        <Badge className={`bg-zinc-900/90 border border-zinc-700/50 text-zinc-300 px-3 py-1 text-[11px] sm:text-sm sm:px-4 sm:py-2 font-medium backdrop-blur-xl shadow-lg hover:bg-zinc-800 transition-colors duration-300 whitespace-nowrap ${getFocusStyles()}`}>
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-red-500" aria-hidden="true" />
          Automation
        </Badge>
      </motion.div>

      {/* Enhanced Main Headline with improved typography */}
      <motion.div variants={itemVariants}>
        <h1
          className={`${getResponsiveFontSize()} text-5xl sm:text-7xl lg:text-7xl xl:text-7xl font-bold tracking-tighter ${spacing.headlineSpacing} hero-headline`}
          style={{
            ...getLineHeightStyles(),
            ...getTextShadowStyles(),
            lineHeight: '1.05'
          }}
        >
          <span className="block text-white">Engineering</span>
          <span className="block text-white">Intelligent Data</span>
          <span className="block text-red-500">& AI Systems</span>
          <span className="block text-red-500 font-medium italic">for Modern Enterprises</span>
        </h1>
      </motion.div>
    </>
  )

  const renderText = () => (
    <>
      {/* Enhanced Description with clear visual hierarchy */}
      <motion.div
        variants={itemVariants}
        className={`space-y-3 max-w-2xl mx-auto lg:mx-0 ${spacing.descriptionSpacing}`}
      >
        {/* Primary description with enhanced styling */}
        <p
          className="text-sm sm:text-lg text-zinc-300 leading-relaxed font-normal hero-text text-center lg:text-left"
          style={getTextShadowStyles()}
        >
          Mindscape Analytics delivers scalable data platforms, AI systems, and automation solutions that help organizations operate smarter, faster, and with greater control.
        </p>

        {/* Secondary description with proper hierarchy */}
        <p
          className="text-sm lg:text-base text-zinc-500 leading-relaxed hero-text text-center lg:text-left"
          style={getTextShadowStyles()}
        >
          We design, build, and optimize systems that perform in real-world production environments.
        </p>
      </motion.div>
    </>
  )

  const renderButtons = () => (
    <>
      {/* Enhanced CTA Buttons - Single row on mobile with reduced size */}
      <motion.div
        className={`flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 ${spacing.ctaSpacing}`}
        variants={itemVariants}
      >
        {/* Primary CTA - Compact on mobile */}
        <Button
          size="default"
          className={`group relative flex-1 sm:flex-none px-4 py-2.5 sm:px-8 sm:py-6 text-xs sm:text-lg font-bold text-white rounded-full hover:brightness-110 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-red-500/20 hover:scale-[1.02] border border-red-500/50 bg-red-600 ${getFocusStyles()}`}
          onClick={handleGetStartedClick}
          aria-label="Get started with Mindscape Analytics - Contact us for consultation"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 transition-all duration-500 rounded-full"></div>
          <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 text-white">
            Get Started
            <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Button>

        {/* Secondary CTA - Compact on mobile */}
        <Link href="/services" className="flex-1 sm:flex-none">
          <Button
            size="default"
            variant="outline"
            className={`group relative w-full px-3 py-2.5 sm:px-6 sm:py-6 text-xs sm:text-base font-medium text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${getFocusStyles()}`}
            aria-label="View our solutions and services"
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
              View Services
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Button>
        </Link>
      </motion.div>
    </>
  )

  return (
    <motion.div
      className={`flex flex-col justify-center space-y-4 text-center lg:text-left items-center lg:items-start ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {(mode === 'full' || mode === 'text') && (
        <>
          {renderHeading()}
          {renderText()}
        </>
      )}
      {(mode === 'full' || mode === 'actions') && renderButtons()}
    </motion.div>
  )
}
