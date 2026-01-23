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

  // Define the 4 strategic background layers with priority system
  const layers: BackgroundLayer[] = [
    {
      type: "gradient",
      priority: 1,
      styles: "bg-gradient-to-br from-black via-gray-900/50 to-black",
      lazyLoad: false // Base layer loads immediately for LCP
    },
    {
      type: "radial",
      priority: 2,
      styles: "bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,rgba(220,38,38,0.12),transparent_60%)]",
      lazyLoad: backgroundLayers.lazyLoad
    },
    {
      type: "radial",
      priority: 3,
      styles: "bg-[radial-gradient(ellipse_70%_70%_at_70%_80%,rgba(59,130,246,0.08),transparent_60%)]",
      lazyLoad: backgroundLayers.lazyLoad
    },
    {
      type: "glow",
      priority: 4,
      styles: "", // Handled by animated elements
      lazyLoad: backgroundLayers.lazyLoad
    }
  ]

  // Filter layers based on performance config (max 4 layers)
  const activeLayers = layers.slice(0, Math.min(backgroundLayers.maxLayers, 4))

  // Animation classes with performance optimization
  const getAnimationClass = () => {
    if (animations.respectReducedMotion) {
      return "motion-safe:animate-pulse-slow motion-reduce:animate-none"
    }
    return "animate-pulse-slow"
  }

  // GPU acceleration helper
  const getGPUStyles = (): React.CSSProperties => {
    if (backgroundLayers.animationOptimization === "css-transforms") {
      return {
        transform: "translateZ(0)", // Force GPU layer
        willChange: "transform, opacity",
        backfaceVisibility: "hidden" as const
      }
    }
    return {}
  }

  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      {/* Base Layer - Always present for LCP optimization */}
      <div className="absolute inset-0 bg-black" />

      {/* Strategic Gradient Layers with lazy loading */}
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
              {...(layer.lazyLoad && {
                onLoad: () => {
                  // Fade in lazy-loaded layers
                  const element = document.querySelector(`[data-layer="${index}"]`) as HTMLElement
                  if (element) {
                    element.style.opacity = '1'
                  }
                }
              })}
              data-layer={index}
            />
          )
        }
        return null
      })}

      {/* Optimized Animated Glow Orbs - Only if glow layer is active */}
      {activeLayers.some(layer => layer.type === "glow") && (
        <>
          {/* Primary glow orb with performance optimization - Using radial gradient instead of blur */}
          <div
            className={`absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(239,68,68,0.1)_0%,transparent_70%)] ${getAnimationClass()}`}
            style={{
              ...getGPUStyles(),
              animationDelay: '0s',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />

          {/* Secondary glow orb with staggered animation - Using radial gradient instead of blur */}
          <div
            className={`absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] ${getAnimationClass()}`}
            style={{
              ...getGPUStyles(),
              animationDelay: '2s',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Optional Grid Pattern - Only if we have layer capacity and it adds value */}
      {activeLayers.length < backgroundLayers.maxLayers && backgroundLayers.maxLayers >= 4 && (
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]"
          style={getGPUStyles()}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

// Enhanced CSS styles for optimized animations and performance
export const heroContainerStyles = `
  @keyframes pulse-slow {
    0%, 100% { 
      opacity: 0.3; 
      transform: scale(1) translateZ(0); 
    }
    50% { 
      opacity: 0.6; 
      transform: scale(1.05) translateZ(0); 
    }
  }

  @keyframes fade-in {
    from { 
      opacity: 0; 
    }
    to { 
      opacity: 1; 
    }
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
    will-change: transform, opacity;
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
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