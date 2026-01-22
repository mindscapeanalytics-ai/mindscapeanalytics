"use client"

import React, { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useAccessibility } from "@/hooks/use-accessibility"
import { FlexibleSection } from "@/components/flexible-section"
import { EnhancedHeroProps, TypographyConfig, PerformanceConfig, MobileShowcaseConfig, TrustBannerConfig } from "@/types/hero-enhancement"

// Import modular components and configurations
import {
  HeroContainer,
  ContentSection,
  InteractiveTimeline,
  MobileShowcase,
  TrustBanner,
  PerformanceOptimizer,
  defaultTypographyConfig,
  defaultPerformanceConfig,
  defaultMobileConfig,
  defaultTrustConfig,
  defaultTimelineData
} from "./exports"

/**
 * Enhanced Hero Component
 * 
 * A performant, accessible, and conversion-optimized hero section that maintains
 * the professional enterprise aesthetic while addressing typography, performance,
 * mobile experience, and accessibility issues.
 * 
 * Features:
 * - Modular architecture with clear separation of concerns
 * - Optimized background system (max 4 layers)
 * - Enhanced typography with proper line heights (1.1+)
 * - Mobile-first responsive design with touch optimization
 * - Accessibility compliance (WCAG AA)
 * - Performance monitoring and optimization
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
        className={`relative w-full min-h-[90vh] flex flex-col overflow-hidden ${className || ''}`}
        role="banner"
        aria-label={ariaLabels.hero.main}
      >
        {/* Optimized Background System */}
        <HeroContainer
          performanceConfig={mergedPerformanceConfig}
          className="absolute inset-0"
        />

        {/* Main Content - Full height without trust banner interference */}
        <FlexibleSection
          fullWidth={true}
          className="relative z-10 flex-1 flex items-center py-8"
          noPadding={true}
          id="hero-content"
        >
          <div className="w-full max-w-7xl mx-auto px-4">
            {/* Conditional Layout based on device */}
            {isMobile ? (
              // Mobile Layout: Heading -> Timeline -> Content
              <div className="flex flex-col space-y-2 pb-8 w-full px-4">
                <ContentSection
                  typographyConfig={mergedTypographyConfig}
                  className="flex flex-col justify-center items-start text-left pt-2 px-1"
                  mode="heading"
                />

                <InteractiveTimeline
                  timelineData={finalTimelineData}
                  performanceConfig={mergedPerformanceConfig}
                  className="flex items-center justify-center relative z-0 h-[280px] w-full -my-24 scale-[0.55] origin-top opacity-60 mix-blend-screen"
                />

                <ContentSection
                  typographyConfig={mergedTypographyConfig}
                  className="flex flex-col justify-center items-start text-left -mt-4 px-1"
                  mode="content"
                />
              </div>
            ) : (
              // Desktop Layout: Side by Side
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
                {/* Left Column - Enhanced Content */}
                <ContentSection
                  typographyConfig={mergedTypographyConfig}
                  className="flex flex-col justify-center space-y-8 text-center lg:text-left pt-0"
                  mode="full"
                />

                {/* Right Column - Interactive Elements - Full height */}
                <InteractiveTimeline
                  timelineData={finalTimelineData}
                  performanceConfig={mergedPerformanceConfig}
                  className="hidden lg:flex items-center justify-center relative z-40 h-[80vh] pt-0"
                />
              </div>
            )}
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

// Export individual components for testing and customization
export {
  HeroContainer,
  ContentSection,
  InteractiveTimeline,
  MobileShowcase,
  TrustBanner,
  PerformanceOptimizer
} from "./exports"