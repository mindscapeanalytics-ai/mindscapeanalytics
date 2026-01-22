"use client"

import React from "react"
import { motion } from "framer-motion"
import { EnhancedTimelineItem, PerformanceConfig } from "@/types/hero-enhancement"
import { ariaLabels } from "@/lib/accessibility-utils"
import RadialOrbitalTimeline from "@/components/radial-orbital-timeline"

interface InteractiveTimelineProps {
  timelineData: EnhancedTimelineItem[]
  performanceConfig: PerformanceConfig
  className?: string
}

/**
 * Enhanced Interactive Timeline Component
 * 
 * Uses the original RadialOrbitalTimeline component without floating cards
 * for a cleaner, more focused desktop timeline experience.
 */
export function InteractiveTimeline({
  timelineData,
  performanceConfig,
  className
}: InteractiveTimelineProps) {

  // Convert enhanced timeline data to compatible format
  const compatibleTimelineData = timelineData.map(item => ({
    id: item.id,
    title: item.title,
    date: item.date,
    content: item.content,
    category: item.category,
    icon: item.icon,
    relatedIds: item.relatedIds,
    status: item.status,
    energy: item.energy
  }))

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9, x: 60 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="region"
      aria-label={ariaLabels.timeline.container}
    >
      <div className="w-full h-[600px] flex items-center justify-center relative z-30 pt-10">
        {/* Enhanced glow effect behind timeline - more transparent and larger */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 rounded-full blur-[120px] z-10"></div>

        {/* Original RadialOrbitalTimeline Component */}
        <div className="relative z-30 w-full h-full">
          <RadialOrbitalTimeline timelineData={compatibleTimelineData} />
        </div>
      </div>
    </motion.div>
  )
}