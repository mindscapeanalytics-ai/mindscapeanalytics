"use client"

import React, { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Database, Brain } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useAccessibility } from "@/hooks/use-accessibility"
import { FlexibleSection } from "@/components/flexible-section"
import { EnhancedHeroProps, TypographyConfig, PerformanceConfig, MobileShowcaseConfig, TrustBannerConfig } from "@/types/hero-enhancement"

// Import modular components and configurations
import { HeroContainer } from "./hero-container"
import { MobileShowcase } from "./mobile-showcase"
import { TrustBanner } from "./trust-banner"
import { PerformanceOptimizer } from "./performance-optimizer"
import {
  defaultTypographyConfig,
  defaultPerformanceConfig,
  defaultMobileConfig,
  defaultTrustConfig,
  defaultTimelineData
} from "./config"
import { ContentSection } from "./content-section"
import { HeroVisual } from "./hero-visual"

/**
 * Enhanced Hero Component
 * 
 * A performant, accessible, and conversion-optimized hero section that maintains
 * the professional enterprise aesthetic while addressing typography, performance,
 * mobile experience, and accessibility issues.
 */
export default function EnhancedHero({
  fullWidth = true,
  typographyConfig,
  performanceConfig,
  mobileConfig,
  trustConfig,
  timelineData,
  className
}: EnhancedHeroProps) {
  const isMobile = useMobile()

  // Initialize accessibility features
  const {
    containerRef,
    ariaLabels,
    announce,
    focusFirst
  } = useAccessibility({
    enableSkipLinks: true,
    announceChanges: true,
    keyboardNavigation: true
  })

  // Merge configurations with defaults
  const mergedTypographyConfig: TypographyConfig = useMemo(() => ({
    ...defaultTypographyConfig,
    ...typographyConfig
  }), [typographyConfig])

  const mergedPerformanceConfig: PerformanceConfig = useMemo(() => ({
    ...defaultPerformanceConfig,
    ...performanceConfig
  }), [performanceConfig])

  const mergedMobileConfig: MobileShowcaseConfig = useMemo(() => ({
    ...defaultMobileConfig,
    ...mobileConfig,
    content: timelineData || defaultTimelineData
  }), [mobileConfig, timelineData])

  const mergedTrustConfig: TrustBannerConfig = useMemo(() => ({
    ...defaultTrustConfig,
    ...trustConfig
  }), [trustConfig])

  const finalTimelineData = timelineData || defaultTimelineData

  // Performance optimization effect
  useEffect(() => {
    if (mergedPerformanceConfig.animations.respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s')
      }
    }
  }, [mergedPerformanceConfig.animations.respectReducedMotion])

  return (
    <PerformanceOptimizer config={mergedPerformanceConfig}>
      <div
        ref={containerRef}
        className={`relative w-full min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center overflow-visible ${className || ''}`}
        role="banner"
        aria-label={ariaLabels.hero.main}
      >
        {/* Optimized Background System */}
        <HeroContainer
          performanceConfig={mergedPerformanceConfig}
          className="absolute inset-0"
        />

        {/* Main Content - Centered Single Column Layout */}
        <FlexibleSection
          fullWidth={true}
          className="relative z-10 flex-1 flex items-center justify-center pt-16 lg:pt-20 pb-12 lg:pb-16 min-h-[500px]"
          noPadding={true}
          id="hero-content"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Left Column: Content Section */}
              <div className="flex flex-col justify-center items-center lg:items-start text-left w-full order-1 lg:order-1 sm:mt-10 lg:mt-0 lg:pr-4">

                {/* Mobile Layout: Text -> Image -> Actions */}
                <div className="block lg:hidden w-full space-y-0">
                  <ContentSection
                    typographyConfig={mergedTypographyConfig}
                    className="w-full"
                    mode="text"
                  />

                  <div className="flex justify-center items-center w-full py-0">
                    <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
                      <HeroVisual />
                    </div>
                  </div>

                  <ContentSection
                    typographyConfig={mergedTypographyConfig}
                    className="w-full"
                    mode="actions"
                  />
                </div>

                {/* Desktop Layout: Full Content */}
                <div className="hidden lg:block w-full">
                  <ContentSection
                    typographyConfig={mergedTypographyConfig}
                    className="w-full"
                    mode="full"
                  />
                </div>
              </div>

              {/* Right Column: AI Visual Section (Desktop Only) */}
              <div className="hidden lg:flex justify-center items-center w-full order-1 lg:order-2">
                <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </div>
        </FlexibleSection>

        {/* Live region for screen reader announcements */}
        <div
          id="hero-live-region"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
      </div>
    </PerformanceOptimizer>
  )
}

// End of file
