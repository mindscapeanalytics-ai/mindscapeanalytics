"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface LoaderProps {
  size?: number
  text?: string
  showLogo?: boolean
}

/**
 * AI Loader Component - Mindscape Analytics Edition
 * 
 * Performance-optimized branded loading component.
 * Uses Tailwind for animations to ensure better hydration compatibility than style-jsx.
 */
export const AILoader: React.FC<LoaderProps> = ({
  size = 220,
  text = "Mindscape Analytics",
  showLogo = true
}) => {
  // Static text implementation as requested

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Background Radiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0000] via-black to-black opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#450000]/10 rounded-full blur-[120px] animate-pulse" />

      <div
        className="relative flex flex-col items-center justify-center font-sans select-none"
        style={{ width: size * 2, height: size }}
      >
        {/* Animated Brand Logo */}
        {showLogo && (
          <div className="mb-8 relative group">
            <div className="absolute -inset-4 bg-[#8b0000]/20 blur-[40px] rounded-full animate-pulse scale-150" style={{ animationDuration: '4s' }} />
            <div className="relative z-10">
              <Image
                src="/images/logo.png"
                alt="Mindscape"
                width={150}
                height={150}
                className="brightness-125 contrast-110 drop-shadow-[0_0_15px_rgba(139,0,0,0.5)] animate-pulse"
                style={{ animationDuration: '1.5s' }}
                priority
              />
            </div>
          </div>
        )}

        {/* Neural Circle Animation - Hardware Optimized */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] pointer-events-none">
          <div
            className="rounded-full border border-red-900/20 animate-[spin_4s_linear_infinite]"
            style={{
              width: size,
              height: size,
              boxShadow: 'inset 0 0 20px rgba(139, 0, 0, 0.2), 0 0 10px rgba(139, 0, 0, 0.1)'
            }}
          ></div>
        </div>

        {/* Static Text - Constant */}
        <div className="flex gap-[2px] mt-4 relative z-20 min-h-[28px]">
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter text-white">
            Mindscape <span className="text-red-600">Analytics</span>
          </h1>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-[10px] uppercase tracking-[0.4em] text-red-900/60 font-bold"
        >
          Precision in Every Insight
        </motion.div>
      </div>
    </div>
  )
}
