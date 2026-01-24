"use client"

import React from "react"
import { PerformanceConfig, BackgroundLayer } from "@/types/hero-enhancement"

interface HeroContainerProps {
  performanceConfig: PerformanceConfig
  className?: string
}

/**
 * Optimized Background Container
 * 
 * Implements streamlined 4-layer background system with performance optimization.
 * Reduces from 6+ competing layers to strategic visual hierarchy.
 * Features: GPU acceleration, lazy loading, reduced motion support.
 */
export function HeroContainer({ performanceConfig, className }: HeroContainerProps) {
  const { backgroundLayers, animations } = performanceConfig

  // Define the strategic background layers with semi-transparency
  const layers: BackgroundLayer[] = [
    {
      type: "gradient",
      priority: 1,
      styles: "bg-gradient-to-br from-black/60 via-zinc-950/40 to-black/60",
      lazyLoad: false
    },
    {
      type: "radial",
      priority: 2,
      styles: "bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,rgba(220,38,38,0.25),transparent_60%)]",
      lazyLoad: backgroundLayers.lazyLoad
    },
    {
      type: "radial",
      priority: 3,
      styles: "bg-[radial-gradient(ellipse_70%_70%_at_70%_80%,rgba(59,130,246,0.2),transparent_60%)]",
      lazyLoad: backgroundLayers.lazyLoad
    },
    {
      type: "glow",
      priority: 4,
      styles: "",
      lazyLoad: backgroundLayers.lazyLoad
    }
  ]

  const activeLayers = layers.slice(0, Math.min(backgroundLayers.maxLayers, 4))

  const getAnimationClass = () => {
    if (animations.respectReducedMotion) {
      return "motion-safe:animate-pulse-slow motion-reduce:animate-none"
    }
    return "animate-pulse-slow"
  }

  const getGPUStyles = (): React.CSSProperties => {
    return {
      transform: "translateZ(0)",
      willChange: "transform, opacity",
      backfaceVisibility: "hidden" as const
    }
  }

  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      {/* Base Layer - Semi-transparent to let global BG show through */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Strategic Gradient Layers - Smoother, more immersive */}
      {activeLayers.map((layer, index) => {
        if (layer.type === "gradient" || layer.type === "radial") {
          return (
            <div
              key={`layer-${index}`}
              className={`absolute inset-0 ${layer.styles}`}
              style={{
                zIndex: layer.priority,
                ...getGPUStyles()
              }}
              data-layer={index}
            />
          )
        }
        return null
      })}

      {/* Ambient Moving Glow Orbs - Floating and Pulse combined */}
      {activeLayers.some(layer => layer.type === "glow") && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-1/4 right-1/4 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(239,68,68,0.1)_0%,transparent_70%)] animate-ambient-float-slow`}
            style={{
              ...getGPUStyles(),
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] animate-ambient-float-medium`}
            style={{
              ...getGPUStyles(),
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Refined Technical Grid - Subtle and professional */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_30%,transparent_100%)] opacity-40"
        style={getGPUStyles()}
        aria-hidden="true"
      />
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
      color: #00ff00;
      padding: 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
      z-index: 9999;
      border: 1px solid #333;
    }
  ` : ''}
`