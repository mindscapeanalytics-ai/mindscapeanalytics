"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

interface MindscapeBrainLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "icon-only"
  showTagline?: boolean
}

export default function MindscapeBrainLogo({
  className = "",
  size = "md",
  variant = "default",
  showTagline = true
}: MindscapeBrainLogoProps) {
  // Define sizing variations
  const sizes = {
    sm: {
      container: "h-8",
      iconSize: 30,
      borderWidth: 1.5,
      titleSize: "text-xs",
      taglineSize: "text-[10px]"
    },
    md: {
      container: "h-10",
      iconSize: 40,
      borderWidth: 1.5,
      titleSize: "text-base",
      taglineSize: "text-xs"
    },
    lg: {
      container: "h-12",
      iconSize: 48,
      borderWidth: 1.5,
      titleSize: "text-lg",
      taglineSize: "text-xs"
    },
    xl: {
      container: "h-16",
      iconSize: 64,
      borderWidth: 2,
      titleSize: "text-xl",
      taglineSize: "text-sm"
    }
  }

  const currentSize = sizes[size]

  const iconOnly = (
    <div
      className="relative flex items-center justify-center overflow-hidden bg-black"
      style={{
        width: currentSize.iconSize,
        height: currentSize.iconSize,
        borderRadius: 8,
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Mindscape brain logo"
        width={currentSize.iconSize}
        height={currentSize.iconSize}
        className="object-contain p-1"
        priority
      />
    </div>
  );

  if (variant === "icon-only") {
    return iconOnly;
  }

  return (
    <div className={cn(
      "flex items-center",
      currentSize.container,
      className
    )}>
      {iconOnly}

      <div className="flex flex-col ml-3">
        <span className={cn(
          "font-bold tracking-tight font-sans whitespace-nowrap mt-1.5",
          currentSize.titleSize
        )}>
          <span className="text-white">Mindscape</span>
          <span className="text-red-500 ml-2">Analytics</span>
        </span>

        {showTagline && (
          <span className={cn(
            "text-gray-300 font-light tracking-wide mt-1",
            currentSize.taglineSize
          )}>
            Where AI Meets Innovation
          </span>
        )}
      </div>
    </div>
  )
}