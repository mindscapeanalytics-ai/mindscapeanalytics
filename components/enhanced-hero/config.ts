/**
 * Default configurations for Enhanced Hero Component
 */

import {
  Database,
  Brain,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Activity as ActivityIcon
} from "lucide-react"

import {
  TypographyConfig,
  PerformanceConfig,
  MobileShowcaseConfig,
  TrustBannerConfig,
  EnhancedTimelineItem
} from "@/types/hero-enhancement"

// Default Typography Configuration
export const defaultTypographyConfig: TypographyConfig = {
  headlineStyles: {
    fontSize: {
      mobile: "text-3xl md:text-4xl",
      tablet: "text-4xl lg:text-4xl",
      desktop: "text-4xl xl:text-5xl"
    },
    lineHeight: 1.1, // Improved from 0.9
    letterSpacing: "tracking-tight",
    fontWeight: 900 // font-black
  },
  gradientText: {
    colors: [
      "from-white via-zinc-400 to-zinc-600",
      "from-zinc-200 via-zinc-500 to-zinc-700"
    ],
    fallbackColor: "#ffffff", // white fallback
    contrastRatio: 4.5
  },
  textShadow: {
    enabled: true,
    color: "rgba(0, 0, 0, 0.5)",
    blur: "2px"
  }
}

// Default Performance Configuration
export const defaultPerformanceConfig: PerformanceConfig = {
  backgroundLayers: {
    maxLayers: 4,
    lazyLoad: true,
    animationOptimization: "css-transforms"
  },
  animations: {
    respectReducedMotion: true,
    frameRate: 60,
    easing: "ease-out"
  },
  accessibility: {
    contrastRatio: 4.5,
    focusIndicators: true,
    screenReaderSupport: true
  }
}

// Default Mobile Showcase Configuration
export const defaultMobileConfig: MobileShowcaseConfig = {
  format: "vertical-cards",
  content: [], // Will be populated with timeline data
  animations: "subtle",
  touchTargets: "44px-minimum"
}

// Default Trust Banner Configuration
export const defaultTrustConfig: TrustBannerConfig = {
  metrics: [
    {
      label: "Uptime",
      value: "99.9%",
      icon: ActivityIcon,
      color: "text-zinc-300"
    },
    {
      label: "Enterprise Clients",
      value: "500+",
      icon: Shield,
      color: "text-zinc-300"
    },
    {
      label: "Processing Speed",
      value: "< 100ms",
      icon: Zap,
      color: "text-zinc-300"
    }
  ],
  certifications: [
    "SOC 2 Type II",
    "GDPR Compliant",
    "ISO 27001"
  ],
  statusIndicators: [
    {
      label: "Systems Online",
      status: "online",
      icon: ActivityIcon
    },
    {
      label: "Production Ready",
      status: "ready",
      icon: Shield
    }
  ],
  visualIntegration: true
}

// Enhanced Timeline Data with mobile content and metrics
export const defaultTimelineData: EnhancedTimelineItem[] = [
  {
    id: 1,
    title: "Data Platform",
    date: "Phase 1",
    content: "Scalable data infrastructure with real-time processing capabilities and enterprise-grade security compliance.",
    mobileContent: "Enterprise data infrastructure with real-time processing",
    category: "Infrastructure",
    icon: Database,
    relatedIds: [2, 3],
    status: "completed",
    energy: 95,
    metrics: {
      improvement: "+18%",
      metric: "Data Processing"
    },
    visualPriority: 1,
    accessibilityLabel: "Data Platform phase completed with 95% energy efficiency"
  },
  {
    id: 2,
    title: "AI Systems",
    date: "Phase 2",
    content: "Intelligent automation systems with machine learning models optimized for production environments.",
    mobileContent: "AI automation systems with ML optimization",
    category: "AI/ML",
    icon: Brain,
    relatedIds: [1, 4],
    status: "in-progress",
    energy: 88,
    metrics: {
      improvement: "+25%",
      metric: "AI Efficiency"
    },
    visualPriority: 2,
    accessibilityLabel: "AI Systems phase in progress with 88% energy efficiency"
  },
  {
    id: 3,
    title: "Analytics Engine",
    date: "Phase 3",
    content: "Advanced analytics platform with predictive modeling and real-time business intelligence capabilities.",
    mobileContent: "Advanced analytics with predictive modeling",
    category: "Analytics",
    icon: TrendingUp,
    relatedIds: [1, 5],
    status: "in-progress",
    energy: 92,
    metrics: {
      improvement: "+32%",
      metric: "Analytics Speed"
    },
    visualPriority: 3,
    accessibilityLabel: "Analytics Engine phase in progress with 92% energy efficiency"
  },
  {
    id: 4,
    title: "Automation Suite",
    date: "Phase 4",
    content: "Comprehensive automation solutions that streamline operations and reduce manual intervention.",
    mobileContent: "Automation solutions for streamlined operations",
    category: "Automation",
    icon: Zap,
    relatedIds: [2, 6],
    status: "pending",
    energy: 85,
    metrics: {
      improvement: "+40%",
      metric: "Automation"
    },
    visualPriority: 1,
    accessibilityLabel: "Automation Suite phase pending with 85% energy efficiency"
  },
  {
    id: 5,
    title: "Control Systems",
    date: "Phase 5",
    content: "Centralized control and monitoring systems providing complete operational visibility and management.",
    mobileContent: "Centralized control and monitoring systems",
    category: "Control",
    icon: Shield,
    relatedIds: [3, 6],
    status: "pending",
    energy: 90,
    visualPriority: 2,
    accessibilityLabel: "Control Systems phase pending with 90% energy efficiency"
  },
  {
    id: 6,
    title: "Production Deploy",
    date: "Phase 6",
    content: "Full production deployment with performance optimization and real-world environment validation.",
    mobileContent: "Production deployment with optimization",
    category: "Deployment",
    icon: Globe,
    relatedIds: [4, 5],
    status: "pending",
    energy: 87,
    visualPriority: 3,
    accessibilityLabel: "Production Deploy phase pending with 87% energy efficiency"
  }
]
