"use client"

import React, { useEffect, ReactNode, useRef } from "react"
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
  const stylesInjected = useRef(false)

  useEffect(() => {
    if (stylesInjected.current) return

    // Inject optimized CSS styles
    const styleElement = document.createElement('style')
    styleElement.id = 'hero-optimized-styles'
    styleElement.textContent = getOptimizedStyles(config)
    document.head.appendChild(styleElement)

    // Inject typography CSS
    const typographyStyles = document.createElement('style')
    typographyStyles.id = 'hero-typography-styles'
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

    stylesInjected.current = true

    // Handle reduced motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion')
      } else {
        document.documentElement.classList.remove('reduce-motion')
      }
    }

    // Set initial state
    handleMotionChange(mediaQuery)

    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      const s1 = document.getElementById('hero-optimized-styles')
      const s2 = document.getElementById('hero-typography-styles')
      if (s1) document.head.removeChild(s1)
      if (s2) document.head.removeChild(s2)
      document.documentElement.classList.remove('reduce-motion')
      stylesInjected.current = false
    }
  }, [config])

  // Performance monitoring effect - Optimized to be less intrusive
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (typeof window === 'undefined' || !('performance' in window)) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number
    let lastLogTime = 0

    const performanceMetrics = {
      fps: 0,
      memoryUsage: 0,
      layoutShifts: 0
    }

    const measureFPS = (currentTime: number) => {
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        performanceMetrics.fps = fps

        // Only log every 10 seconds to avoid console spam, and only if FPS is critically low
        if (fps < config.animations.frameRate * 0.5 && currentTime - lastLogTime > 10000) {
          console.warn(`[Performance] Hero FPS dropped to ${fps} (Target: ${config.animations.frameRate})`)
          lastLogTime = currentTime

          if (fps < 20) {
            document.documentElement.classList.add('reduce-animations')
          }
        }

        if ('memory' in performance) {
          const memory = (performance as any).memory
          performanceMetrics.memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        }

        updateDebugDisplay(performanceMetrics)

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Layout shift monitoring
    let observer: PerformanceObserver | null = null
    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            performanceMetrics.layoutShifts += (entry as any).value
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['layout-shift'] })
      } catch (e) { }
    }

    animationId = requestAnimationFrame(measureFPS)
    createDebugDisplay()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (observer) observer.disconnect()
      removeDebugDisplay()
    }
  }, [config.animations.frameRate])

  const createDebugDisplay = () => {
    if (document.getElementById('hero-perf-debug')) return
    const debugDiv = document.createElement('div')
    debugDiv.id = 'hero-perf-debug'
    debugDiv.className = 'perf-debug'
    debugDiv.style.cssText = 'position:fixed;top:10px;right:10px;background:rgba(0,0,0,0.8);color:#0f0;padding:8px;border-radius:4px;font-family:monospace;font-size:10px;z-index:9999;border:1px solid #333;pointer-events:none;'
    debugDiv.innerHTML = `<div>Hero Metrics</div><div id="fps-val">FPS: --</div><div id="mem-val">Mem: --</div>`
    document.body.appendChild(debugDiv)
  }

  const updateDebugDisplay = (m: any) => {
    const fpsEl = document.getElementById('fps-val')
    const memEl = document.getElementById('mem-val')
    if (fpsEl) fpsEl.textContent = `FPS: ${m.fps}`
    if (memEl) memEl.textContent = `Mem: ${m.memoryUsage}MB`
  }

  const removeDebugDisplay = () => {
    const debugEl = document.getElementById('hero-perf-debug')
    if (debugEl) document.body.removeChild(debugEl)
  }

  return <>{children}</>
}

function getOptimizedStyles(config: PerformanceConfig): string {
  return `
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
      will-change: transform, opacity;
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.3; transform: scale(1) translateZ(0); }
      50% { opacity: 0.6; transform: scale(1.02) translateZ(0); }
    }
    .gpu-accelerated { transform: translateZ(0); will-change: transform, opacity; }
    @media (prefers-reduced-motion: reduce) {
      .reduce-motion * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
    .reduce-animations * { animation-duration: 0.8s !important; transition-duration: 0.4s !important; }
    .tab-hidden * { animation-play-state: paused !important; }
  `
}
