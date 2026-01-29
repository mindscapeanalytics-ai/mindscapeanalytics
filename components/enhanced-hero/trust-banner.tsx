"use client"

import React from "react"
import { motion } from "framer-motion"
import { TrustBannerConfig } from "@/types/hero-enhancement"
import { FlexibleSection } from "@/components/flexible-section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TrustBannerProps {
  config: TrustBannerConfig
  fullWidth?: boolean
  className?: string
}

/**
 * Enhanced Trust Banner Component
 * 
 * Displays meaningful business metrics, certifications, and status indicators
 * with visual integration to the main hero design.
 */
export function TrustBanner({ config, fullWidth = true, className }: TrustBannerProps) {
  const { metrics, certifications, statusIndicators, visualIntegration } = config

  return (
    <motion.div 
      className={`relative w-full ${
        visualIntegration 
          ? 'bg-gradient-to-r from-black/95 via-gray-900/98 to-black/95 backdrop-blur-md border-t border-white/20 shadow-2xl' 
          : 'bg-black/90 border-t border-white/10'
      } py-4 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Visual integration background */}
      {visualIntegration && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5"></div>
      )}
      
      <FlexibleSection
        fullWidth={fullWidth}
        className="w-full relative z-10"
        noPadding={false}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
          
          {/* Left side - Status indicators and metrics */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            {/* Status indicators */}
            {statusIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  indicator.status === 'online' ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' :
                  indicator.status === 'ready' ? 'bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50' :
                  'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50'
                }`} />
                <span className="text-sm font-medium text-white/90 drop-shadow-sm">
                  {indicator.label}
                </span>
              </div>
            ))}
            
            {/* Separator */}
            {statusIndicators.length > 0 && metrics.length > 0 && (
              <div className="h-4 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            )}
            
            {/* Key metrics */}
            {metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="flex items-center gap-2">
                {metric.icon && <metric.icon className={`h-3 w-3 ${metric.color || 'text-white/70'} drop-shadow-sm`} />}
                <span className="text-sm font-medium text-white/90 drop-shadow-sm">
                  {metric.label}: <span className={`font-semibold ${metric.color || 'text-white'}`}>{metric.value}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Right side - Certifications and enterprise badge */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Additional metrics for larger screens */}
            {metrics.slice(2).map((metric, index) => (
              <div key={index} className="hidden md:flex items-center gap-2">
                {metric.icon && <metric.icon className={`h-3 w-3 ${metric.color || 'text-white/70'} drop-shadow-sm`} />}
                <span className="text-sm font-medium text-white/90 drop-shadow-sm">
                  {metric.label}: <span className={`font-semibold ${metric.color || 'text-white'}`}>{metric.value}</span>
                </span>
              </div>
            ))}
            
            {/* Certifications */}
            {certifications.slice(0, 2).map((cert, index) => (
              <Badge 
                key={index}
                className="bg-white/10 border border-white/20 text-white/90 text-xs font-medium backdrop-blur-md hover:bg-white/15 transition-colors duration-300"
              >
                {cert}
              </Badge>
            ))}
            
            {/* Enterprise grade card */}
            <Card className={`${
              visualIntegration 
                ? 'bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/30 backdrop-blur-md shadow-xl hover:shadow-2xl' 
                : 'bg-white/10 border border-white/20 backdrop-blur-md'
            } transition-all duration-300`}>
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-sm font-semibold text-white/95 drop-shadow-sm">
                  Enterprise Grade
                </span>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Additional certifications row for mobile */}
        {certifications.length > 2 && (
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3 md:hidden">
            {certifications.slice(2).map((cert, index) => (
              <Badge 
                key={index}
                className="bg-white/10 border border-white/20 text-white/90 text-xs font-medium backdrop-blur-md"
              >
                {cert}
              </Badge>
            ))}
          </div>
        )}
      </FlexibleSection>
    </motion.div>
  )
}
