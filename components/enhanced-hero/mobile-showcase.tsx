"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { MobileShowcaseConfig } from "@/types/hero-enhancement"
import { useMobileShowcaseAccessibility } from "@/hooks/use-accessibility"
import { ariaLabels } from "@/lib/accessibility-utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MobileShowcaseProps {
  config: MobileShowcaseConfig
  className?: string
}

/**
 * Mobile Showcase Component
 * 
 * Provides mobile-friendly alternative to desktop timeline
 * with touch-optimized interface and same information content.
 */
export function MobileShowcase({ config, className }: MobileShowcaseProps) {
  const { format, content, animations, touchTargets } = config
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  
  // Initialize mobile showcase accessibility
  const { announceCardExpansion, handleCardActivation } = useMobileShowcaseAccessibility()
  
  // Sort content by visual priority for mobile
  const sortedContent = [...content].sort((a, b) => a.visualPriority - b.visualPriority)
  
  // Handle accordion toggle
  const toggleAccordion = (itemId: number, title: string) => {
    const newExpanded = new Set(expandedItems)
    const isExpanding = !expandedItems.has(itemId)
    
    if (isExpanding) {
      newExpanded.add(itemId)
    } else {
      newExpanded.delete(itemId)
    }
    
    setExpandedItems(newExpanded)
    announceCardExpansion(title, isExpanding)
  }
  
  if (format === "vertical-cards") {
    return (
      <div className={`space-y-4 ${className || ''}`}>
        {sortedContent.slice(0, 3).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: animations === "engaging" ? [0.22, 1, 0.36, 1] : "easeOut"
            }}
          >
            <Card className="bg-black/60 backdrop-blur-md border border-white/20 p-4 hover:border-white/30 transition-colors duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-blue-500/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.status === 'completed' ? 'border-green-500/50 text-green-400' :
                        item.status === 'in-progress' ? 'border-blue-500/50 text-blue-400' :
                        'border-gray-500/50 text-gray-400'
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {item.mobileContent}
                  </p>
                  {item.metrics && (
                    <div className="mt-2 text-xs text-green-400 font-medium">
                      {item.metrics.improvement} {item.metrics.metric}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }
  
  // Horizontal scroll format
  if (format === "horizontal-scroll") {
    return (
      <div className={`${className || ''}`}>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {sortedContent.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-64"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-black/60 backdrop-blur-md border border-white/20 p-4 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <item.icon className="h-5 w-5 text-white" />
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed flex-1">
                    {item.mobileContent}
                  </p>
                  {item.metrics && (
                    <div className="mt-3 text-xs text-green-400 font-medium">
                      {item.metrics.improvement} {item.metrics.metric}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  
  // Accordion format
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {sortedContent.slice(0, 3).map((item, index) => (
        <motion.details
          key={item.id}
          className="group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <summary 
            className="flex items-center gap-3 p-3 bg-black/60 backdrop-blur-md border border-white/20 rounded-lg cursor-pointer hover:border-white/30 transition-colors duration-300 list-none"
            style={{ minHeight: touchTargets === "44px-minimum" ? "44px" : "auto" }}
          >
            <item.icon className="h-4 w-4 text-white flex-shrink-0" />
            <span className="text-sm font-medium text-white flex-1">{item.title}</span>
            <div className="text-xs text-white/50 group-open:rotate-180 transition-transform duration-200">
              ▼
            </div>
          </summary>
          <div className="mt-2 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg">
            <p className="text-xs text-white/70 leading-relaxed mb-2">
              {item.mobileContent}
            </p>
            {item.metrics && (
              <div className="text-xs text-green-400 font-medium">
                {item.metrics.improvement} {item.metrics.metric}
              </div>
            )}
          </div>
        </motion.details>
      ))}
    </div>
  )
}