"use client"

import React from "react"
import { PerformanceConfig } from "@/types/hero-enhancement"
import { Spotlight } from "@/components/ui/spotlight"
import { cn } from "@/lib/utils"

interface HeroContainerProps {
  performanceConfig: PerformanceConfig
  className?: string
  children?: React.ReactNode
}

/**
 * Optimized Background Container
 *
 * Implements streamlined background system with performance optimization.
 * Uses Spotlight effect and Grid pattern for modern aesthetic.
 */
export function HeroContainer({ performanceConfig, className, children }: HeroContainerProps) {
  const getGPUStyles = (): React.CSSProperties => {
    return {
      transform: "translateZ(0)",
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as const
    }
  }

  return (
    <div className={`absolute inset-0 ${className || ''} overflow-hidden bg-transparent antialiased`}>
      {/* Grid Pattern - Significant visibility boost for stunning metallic effect */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none opacity-[0.04]",
          "[background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]",
          "[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
        )}
        style={getGPUStyles()}
      />

      {/* Spotlight Effect - Adjusted for visibility */}
      <Spotlight
        className="-bottom-40 left-0 md:-bottom-20 md:left-60 z-10"
        fill="white"
      />

      {/* Children content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

// sophisticated ambient animations
export const heroContainerStyles = `
  @keyframes ambient-float {
    0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
    33% { transform: translate(2%, 4%) scale(1.05); opacity: 0.6; }
    66% { transform: translate(-1%, 2%) scale(0.95); opacity: 0.3; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  }

  .animate-ambient-float-slow { animation: ambient-float 25s ease-in-out infinite; }
  .animate-ambient-float-medium { animation: ambient-float 18s ease-in-out infinite; animation-delay: -5s; }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.4; transform: scale(1) translateZ(0); }
    50% { opacity: 0.8; transform: scale(1.05) translateZ(0); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 8s ease-in-out infinite;
    will-change: transform, opacity;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .animate-ambient-float-slow,
    .animate-ambient-float-medium,
    .animate-pulse-slow {
      animation: none !important;
    }
  }

  /* GPU acceleration for better performance */
  .gpu-accelerated {
    transform: translateZ(0);
    will-change: transform, opacity;
    backface-visibility: hidden;
  }

  /* Performance optimizations for background layers */
  .bg-layer-optimized {
    contain: layout style paint;
    transform: translateZ(0);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .hero-bg-gradient {
      background: linear-gradient(to bottom right, #000000, #333333) !important;
    }
  }

  /* Performance monitoring in development */
  ${process.env.NODE_ENV === 'development' ? `
    .perf-debug {
      position: fixed;
      top: 60px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #ff0000ff;
      padding: 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
      z-index: 9999;
      border: 1px solid #333;
    }
  ` : ''}
`
