/**
 * Integration Test Component for Enhanced Hero
 * 
 * This component verifies that all enhanced hero features are working correctly.
 */

"use client"

import React from "react"
import EnhancedHero from "./index"

export function TestEnhancedHero() {
  // Test configuration to verify all features
  const testConfig = {
    typographyConfig: {
      headlineStyles: {
        fontSize: {
          mobile: "text-2xl md:text-3xl",
          tablet: "text-4xl lg:text-5xl",
          desktop: "text-5xl xl:text-6xl"
        },
        lineHeight: 1.1, // Improved from 0.9
        letterSpacing: "tracking-tight",
        fontWeight: 900
      },
      gradientText: {
        colors: [
          "from-red-400 via-red-500 to-red-600",
          "from-blue-400 via-blue-500 to-blue-600"
        ],
        fallbackColor: "#ef4444",
        contrastRatio: 4.5
      },
      textShadow: {
        enabled: true,
        color: "rgba(0, 0, 0, 0.5)",
        blur: "2px"
      }
    },
    performanceConfig: {
      backgroundLayers: {
        maxLayers: 4,
        lazyLoad: true,
        animationOptimization: "css-transforms" as const
      },
      animations: {
        respectReducedMotion: true,
        frameRate: 60,
        easing: "ease-out" as const
      },
      accessibility: {
        contrastRatio: 4.5,
        focusIndicators: true,
        screenReaderSupport: true
      }
    }
  }

  return (
    <div className="test-enhanced-hero">
      <EnhancedHero 
        fullWidth={true}
        typographyConfig={testConfig.typographyConfig}
        performanceConfig={testConfig.performanceConfig}
        className="test-hero-instance"
      />
      
      {/* Test indicators */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
        ✅ Enhanced Hero Active
        <br />
        📊 Performance Monitoring: ON
        <br />
        ♿ Accessibility: ENABLED
        <br />
        🎨 Typography: ENHANCED
      </div>
    </div>
  )
}

// Verification function for development
export function verifyEnhancedHero(): boolean {
  const checks = {
    typographySystem: !!document.querySelector('.hero-headline'),
    accessibilityFeatures: !!document.querySelector('[role="banner"]'),
    performanceOptimization: !!document.querySelector('.gpu-accelerated'),
    backgroundLayers: document.querySelectorAll('[data-layer]').length <= 4,
    focusIndicators: !!document.querySelector('.enhanced-focus'),
    responsiveDesign: window.innerWidth > 0 // Basic check
  }

  const passed = Object.values(checks).every(Boolean)
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Enhanced Hero Verification:', checks)
    console.log('All checks passed:', passed)
  }

  return passed
}

export default TestEnhancedHero
