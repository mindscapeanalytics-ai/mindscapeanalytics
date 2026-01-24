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

  // Define the strategic background layers with priority system
  const layers: BackgroundLayer[] = [
    {
      type: "gradient",
      priority: 1,
      styles: "bg-gradient-to-br from-black via-zinc-950 to-black",
      lazyLoad: false
    },
    {
      type: "radial",
      priority: 2,
      styles: "bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,rgba(220,38,38,0.15),transparent_60%)]",
      lazyLoad: backgroundLayers.lazyLoad
    },
    {
      type: "radial",
      priority: 3,
      styles: "bg-[radial-gradient(ellipse_70%_70%_at_70%_80%,rgba(59,130,246,0.1),transparent_60%)]",
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
      {/* Base Layer */}
      <div className="absolute inset-0 bg-black" />

      {/* Stunning Technical Background Effect: Animated Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent animate-beam-slow" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-beam-medium" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/15 to-transparent animate-beam-fast" />

        {/* Horizontal scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none opacity-20" />
      </div>

      {/* Strategic Gradient Layers */}
      {activeLayers.map((layer, index) => {
        if (layer.type === "gradient" || layer.type === "radial") {
          return (
            <div
              key={`layer-${index}`}
              className={`absolute inset-0 ${layer.styles} ${layer.lazyLoad ? 'opacity-0 animate-fade-in' : ''}`}
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

      {/* Animated Glow Orbs */}
      {activeLayers.some(layer => layer.type === "glow") && (
        <>
          <div
            className={`absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] ${getAnimationClass()}`}
            style={{
              ...getGPUStyles(),
              animationDelay: '0s',
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] ${getAnimationClass()}`}
            style={{
              ...getGPUStyles(),
              animationDelay: '2s',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Enhanced Technical Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_90%)]"
        style={getGPUStyles()}
        aria-hidden="true"
      />
    </div>
  )
}

// Added new technical animations
export const heroContainerStyles = `
  @keyframes beam {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  
  .animate-beam-slow { animation: beam 8s linear infinite; }
  .animate-beam-medium { animation: beam 6s linear infinite; animation-delay: 2s; }
  .animate-beam-fast { animation: beam 4s linear infinite; animation-delay: 1s; }

  @keyframes scanline {
    0% { transform: translateY(0); }
    100% { transform: translateY(100%); }
  }
  .animate-scanline { animation: scanline 10s linear infinite; }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.4; transform: scale(1) translateZ(0); }
    50% { opacity: 0.8; transform: scale(1.05) translateZ(0); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
    will-change: transform, opacity;
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .motion-safe\\:animate-pulse-slow {
      animation: none;
    }
    
    .motion-reduce\\:animate-none {
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

  /* Intersection observer optimization for lazy loading */
  .lazy-bg-layer {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .lazy-bg-layer.loaded {
    opacity: 1;
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