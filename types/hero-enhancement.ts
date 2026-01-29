/**
 * TypeScript interfaces for Hero Section Enhancement
 * Supporting modular architecture and performance optimization
 */

import { ReactNode, ElementType } from 'react'

// Enhanced Timeline Data Structure
export interface EnhancedTimelineItem {
  // Existing properties maintained for compatibility
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
  
  // New properties for enhanced experience
  mobileContent: string // Condensed version for mobile
  metrics?: {
    improvement: string // e.g., "+25%"
    metric: string // e.g., "Efficiency"
  }
  visualPriority: 1 | 2 | 3 // For mobile ordering
  accessibilityLabel: string
}

// Typography Configuration System
export interface TypographyConfig {
  headlineStyles: {
    fontSize: ResponsiveScale
    lineHeight: number
    letterSpacing: string
    fontWeight: number
  }
  gradientText: {
    colors: string[]
    fallbackColor: string
    contrastRatio: number
  }
  textShadow: {
    enabled: boolean
    color: string
    blur: string
  }
}

export interface ResponsiveScale {
  mobile: string
  tablet: string
  desktop: string
}

// Performance Configuration
export interface PerformanceConfig {
  backgroundLayers: {
    maxLayers: number // Changed from literal 4 to number
    lazyLoad: boolean
    animationOptimization: "css-transforms" | "gpu-acceleration"
  }
  animations: {
    respectReducedMotion: boolean
    frameRate: 60 | number // Allow other frame rates
    easing: "ease-out" | "cubic-bezier"
  }
  accessibility: {
    contrastRatio: 4.5 | number // Allow other ratios
    focusIndicators: boolean
    screenReaderSupport: boolean
  }
}

// Mobile Showcase Configuration
export interface MobileShowcaseConfig {
  format: "horizontal-scroll" | "vertical-cards" | "accordion"
  content: EnhancedTimelineItem[]
  animations: "subtle" | "engaging"
  touchTargets: "44px-minimum"
}

// Trust Banner Configuration
export interface TrustBannerConfig {
  metrics: TrustMetric[]
  certifications: string[]
  statusIndicators: StatusIndicator[]
  visualIntegration: boolean
}

export interface TrustMetric {
  label: string
  value: string
  icon?: ElementType
  color?: string
}

export interface StatusIndicator {
  label: string
  status: "online" | "ready" | "certified"
  icon: ElementType
}

// Component Props Interfaces
export interface EnhancedHeroProps {
  fullWidth?: boolean
  typographyConfig?: Partial<TypographyConfig>
  performanceConfig?: Partial<PerformanceConfig>
  mobileConfig?: Partial<MobileShowcaseConfig>
  trustConfig?: Partial<TrustBannerConfig>
  timelineData?: EnhancedTimelineItem[]
  className?: string
}

export interface ContentSectionProps {
  typographyConfig: TypographyConfig
  className?: string
  children: ReactNode
}

export interface InteractiveTimelineProps {
  timelineData: EnhancedTimelineItem[]
  performanceConfig: PerformanceConfig
  className?: string
}

export interface MobileShowcaseProps {
  config: MobileShowcaseConfig
  className?: string
}

export interface TrustBannerProps {
  config: TrustBannerConfig
  fullWidth?: boolean
  className?: string
}

// Animation and Performance Types
export interface AnimationConfig {
  duration: number
  delay: number
  easing: string
  respectReducedMotion: boolean
}

export interface BackgroundLayer {
  type: "gradient" | "radial" | "glow" | "texture"
  priority: 1 | 2 | 3 | 4
  styles: string
  lazyLoad: boolean
}

// Accessibility Types
export interface AccessibilityFeatures {
  ariaLabels: Record<string, string>
  focusManagement: boolean
  screenReaderSupport: boolean
  keyboardNavigation: boolean
  contrastCompliance: boolean
}

// Analytics and Conversion Types
export interface ConversionTracking {
  primaryCTA: string
  secondaryCTA: string
  timelineInteractions: string[]
  trustBannerClicks: string[]
  scrollDepth: number[]
}
