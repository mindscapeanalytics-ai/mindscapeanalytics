"use client"

import Image from 'next/image'

interface MindscapeLogoProps {
  className?: string
  variant?: "default" | "white" | "dark" | "light"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  pulseEffect?: boolean
}

export default function MindscapeLogo({
  className = "",
  variant = "default",
  size = "md",
  showText = true,
  pulseEffect = true
}: MindscapeLogoProps) {
  // Define color variations
  const colors = {
    default: {
      primary: "#8B0000", // Dark red
      secondary: "#630000", // Darker red
      text: "#FFFFFF", // White text
    },
    white: {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      text: "#8B0000",
    },
    dark: {
      primary: "#8B0000",
      secondary: "#630000",
      text: "#1A1A1A",
    },
    light: {
      primary: "#8B0000",
      secondary: "#630000",
      text: "#000000",
    }
  }

  // Calculate sizes based on prop
  const sizes = {
    sm: {
      container: "h-6 w-auto",
      svg: { width: 24, height: 24 },
      textSize: "text-sm"
    },
    md: {
      container: "h-8 w-auto",
      svg: { width: 32, height: 32 },
      textSize: "text-lg"
    },
    lg: {
      container: "h-12 w-auto",
      svg: { width: 48, height: 48 },
      textSize: "text-2xl"
    }
  }

  const currentColors = colors[variant]
  const currentSize = sizes[size]

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      <Image
        src="/images/logo.png"
        alt="Mindscape Analytics Logo"
        width={currentSize.svg.width}
        height={currentSize.svg.height}
        className={`${showText ? "mr-2" : ""} ${pulseEffect ? "animate-logo-pulse" : ""}`}
        priority
      />
      {showText && (
        <span className={`font-bold ${currentSize.textSize} tracking-tight mt-1.5`}>
          <span style={{ color: currentColors.text }}>Mindscape</span>
          <span className="ml-2" style={{ color: currentColors.primary }}>Analytics</span>
        </span>
      )}
    </div>
  )
}

