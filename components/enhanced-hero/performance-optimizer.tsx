"use client"

import React, { useEffect, ReactNode } from "react"
import { PerformanceConfig } from "@/types/hero-enhancement"
import { generateTypographyCSS } from "@/lib/typography-system"

interface PerformanceOptimizerProps {
  config: PerformanceConfig
  children: ReactNode
}

/**
 * Performance Optimizer Component
 * 
 * Manages performance optimizations, accessibility features,
 * and animation preferences for the hero section.
 */
export function PerformanceOptimizer({ config, children }: PerformanceOptimizerProps) {
  
  useEffect(() => {
    // Inject optimized CSS styles
    const styleElement = document.createElement('style')
    styleElement.textContent = getOptimizedStyles(config)
    document.head.appendChild(styleElement)
    
    // Inject typography CSS
    const typographyStyles = document.createElement('style')
    typographyStyles.textContent = generateTypographyCSS({
      headlineStyles: {
        fontSize: { mobile: "text-2xl md:text-3xl", tablet: "text-4xl lg:text-5xl", desktop: "text-5xl xl:text-6xl" },
        lineHeight: 1.1,
        letterSpacing: "tracking-tight",
        fontWeight: 900
      },
      gradientText: {
        colors: ["from-red-400 via-red-500 to-red-600", "from-blue-400 via-blue-500 to-blue-600"],
        fallbackColor: "#ef4444",
        contrastRatio: 4.5
      },
      textShadow: {
        enabled: true,
        color: "rgba(0, 0, 0, 0.5)",
        blur: "2px"
      }
    })
    document.head.appendChild(typographyStyles)
    
    // Handle reduced motion preferences
    if (config.animations.respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      
      const handleMotionChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add('reduce-motion')
        } else {
          document.documentElement.classList.remove('reduce-motion')
        }
      }
      
      // Set initial state
      if (mediaQuery.matches) {
        document.documentElement.classList.add('reduce-motion')
      }
      
      // Listen for changes
      mediaQuery.addEventListener('change', handleMotionChange)
      
      return () => {
        mediaQuery.removeEventListener('change', handleMotionChange)
        document.head.removeChild(styleElement)
        document.head.removeChild(typographyStyles)
        document.documentElement.classList.remove('reduce-motion')
      }
    }
    
    return () => {
      document.head.removeChild(styleElement)
      document.head.removeChild(typographyStyles)
    }
  }, [config])
  
  // Performance monitoring effect with detailed metrics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      let frameCount = 0
      let lastTime = performance.now()
      let animationId: number
      
      // Track performance metrics
      const performanceMetrics = {
        fps: 0,
        memoryUsage: 0,
        renderTime: 0,
        layoutShifts: 0
      }
      
      const measureFPS = () => {
        frameCount++
        const currentTime = performance.now()
        
        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
          performanceMetrics.fps = fps
          
          // Log performance warning if below target
          if (fps < config.animations.frameRate * 0.8) {
            console.warn(`Hero section FPS below target: ${fps}fps (target: ${config.animations.frameRate}fps)`)
            
            // Automatically reduce animation complexity if performance is poor
            if (fps < config.animations.frameRate * 0.6) {
              document.documentElement.classList.add('reduce-animations')
            }
          }
          
          // Memory usage monitoring (if available)
          if ('memory' in performance) {
            const memory = (performance as any).memory
            performanceMetrics.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
          }
          
          // Update debug display in development
          if (process.env.NODE_ENV === 'development') {
            updateDebugDisplay(performanceMetrics)
          }
          
          frameCount = 0
          lastTime = currentTime
        }
        
        animationId = requestAnimationFrame(measureFPS)
      }
      
      // Layout shift monitoring
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              performanceMetrics.layoutShifts += (entry as any).value
            }
          }
        })
        
        try {
          observer.observe({ entryTypes: ['layout-shift'] })
        } catch (e) {
          // Layout shift monitoring not supported
        }
      }
      
      // Start monitoring in development or when explicitly enabled
      if (process.env.NODE_ENV === 'development') {
        animationId = requestAnimationFrame(measureFPS)
        createDebugDisplay()
      }
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
        removeDebugDisplay()
      }
    }
  }, [config.animations.frameRate])

  // Debug display functions
  const createDebugDisplay = () => {
    if (document.getElementById('hero-perf-debug')) return
    
    const debugDiv = document.createElement('div')
    debugDiv.id = 'hero-perf-debug'
    debugDiv.className = 'perf-debug'
    debugDiv.innerHTML = `
      <div>Hero Performance</div>
      <div id="fps-display">FPS: --</div>
      <div id="memory-display">Memory: --</div>
      <div id="cls-display">CLS: --</div>
    `
    document.body.appendChild(debugDiv)
  }
  
  const updateDebugDisplay = (metrics: any) => {
    const fpsEl = document.getElementById('fps-display')
    const memoryEl = document.getElementById('memory-display')
    const clsEl = document.getElementById('cls-display')
    
    if (fpsEl) fpsEl.textContent = `FPS: ${metrics.fps}`
    if (memoryEl) memoryEl.textContent = `Memory: ${metrics.memoryUsage}MB`
    if (clsEl) clsEl.textContent = `CLS: ${metrics.layoutShifts.toFixed(3)}`
  }
  
  const removeDebugDisplay = () => {
    const debugEl = document.getElementById('hero-perf-debug')
    if (debugEl) {
      document.body.removeChild(debugEl)
    }
  }

  return <>{children}</>
}

// Intersection Observer for lazy loading optimization
export function useLazyLoading() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.classList.add('loaded')
            observer.unobserve(target)
          }
        })
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before element comes into view
        threshold: 0.1
      }
    )

    // Observe lazy-loaded background elements
    const lazyElements = document.querySelectorAll('.lazy-bg-layer')
    lazyElements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])
}

// Adaptive performance optimization hook
export function useAdaptivePerformance() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        document.documentElement.classList.add('tab-hidden')
      } else {
        document.documentElement.classList.remove('tab-hidden')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}

/**
 * Generate optimized CSS styles based on performance configuration
 */
function getOptimizedStyles(config: PerformanceConfig): string {
  const { animations, accessibility } = config
  
  return `
    /* Enhanced Hero Performance Styles */
    
    /* Optimized animations with GPU acceleration */
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

    @keyframes gradient-shift {
      0%, 100% { 
        background-position: 0% 50%; 
      }
      50% { 
        background-position: 100% 50%; 
      }
    }

    @keyframes shine-effect {
      0% { 
        transform: translateX(-100%) skewX(-12deg) translateZ(0); 
      }
      100% { 
        transform: translateX(200%) skewX(-12deg) translateZ(0); 
      }
    }

    /* Performance-optimized animation classes */
    .animate-pulse-slow {
      animation: pulse-slow 4s ${animations.easing} infinite;
      will-change: transform, opacity;
    }

    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient-shift 4s ${animations.easing} infinite;
      will-change: background-position;
    }

    .animate-shine {
      animation: shine-effect 1.5s ${animations.easing};
      will-change: transform;
    }

    /* GPU acceleration for better performance */
    .gpu-accelerated {
      transform: translateZ(0);
      will-change: transform, opacity;
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .reduce-motion *,
      .reduce-motion *::before,
      .reduce-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Performance-based animation reduction */
    .reduce-animations * {
      animation-duration: 0.5s !important;
      transition-duration: 0.2s !important;
    }

    /* Tab visibility optimization */
    .tab-hidden * {
      animation-play-state: paused !important;
    }

    /* Lazy loading optimization */
    .lazy-bg-layer {
      opacity: 0;
      transition: opacity 0.6s ease-out;
    }

    .lazy-bg-layer.loaded {
      opacity: 1;
    }

    /* Enhanced focus indicators for accessibility */
    ${accessibility.focusIndicators ? `
      .enhanced-focus:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 4px;
      }

      .enhanced-focus:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 4px;
      }
    ` : ''}

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .hero-text {
        text-shadow: none;
        font-weight: 700;
      }
      
      .hero-gradient-text {
        background: none !important;
        color: #ffffff !important;
        -webkit-background-clip: unset !important;
        background-clip: unset !important;
      }
    }

    /* Scrollbar optimization */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Container query support for responsive design */
    @container (min-width: 768px) {
      .hero-responsive {
        --hero-scale: 1.2;
      }
    }

    @container (min-width: 1024px) {
      .hero-responsive {
        --hero-scale: 1.4;
      }
    }

    /* Performance monitoring styles */
    ${process.env.NODE_ENV === 'development' ? `
      .perf-monitor {
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
      }
    ` : ''}
  `
}