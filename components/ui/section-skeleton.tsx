'use client'

import React from 'react'

interface SectionSkeletonProps {
    height?: string
    className?: string
    showSpinner?: boolean
}

/**
 * Skeleton loader for dynamically imported sections
 * Prevents layout shift and provides visual feedback during loading
 */
export function SectionSkeleton({
    height = "600px",
    className = "",
    showSpinner = true
}: SectionSkeletonProps) {
    return (
        <div
            className={`w-full bg-gradient-to-b from-white/[0.02] to-transparent rounded-lg ${className}`}
            style={{ height }}
            role="status"
            aria-label="Loading content"
        >
            {showSpinner && (
                <div className="h-full flex items-center justify-center">
                    <div className="relative">
                        {/* Outer ring */}
                        <div className="w-16 h-16 border-2 border-white/5 rounded-full" />
                        {/* Spinning ring */}
                        <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-red-500/40 border-r-red-500/20 rounded-full animate-spin" />
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * Hero-specific skeleton with proper aspect ratio
 */
export function HeroSkeleton() {
    return (
        <div
            className="w-full min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-b from-white/[0.01] to-transparent"
            role="status"
            aria-label="Loading hero section"
        >
            <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 px-4">
                    {/* Logo skeleton */}
                    <div className="w-20 h-20 mx-auto bg-white/5 rounded-full animate-pulse" />

                    {/* Text skeleton */}
                    <div className="space-y-3 max-w-2xl mx-auto">
                        <div className="h-8 bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-8 bg-white/5 rounded-lg w-3/4 mx-auto animate-pulse" />
                        <div className="h-4 bg-white/5 rounded-lg w-1/2 mx-auto animate-pulse mt-6" />
                    </div>

                    {/* Button skeleton */}
                    <div className="flex gap-4 justify-center mt-8">
                        <div className="h-12 w-32 bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-12 w-32 bg-white/5 rounded-lg animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
}
