"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Curated list of high-impact project images for the hero
const heroProjectImages = [
    "/images/projects/mindscapeanalytics.png",
    "/images/projects/cryptotrader2.png",
    "/images/projects/vehicle_analysis_dashboard.png",
    "/images/projects/amazon_invontry_management_system.png",
    "/images/projects/AgriChian.jpg"
]

/**
 * HeroVisual Component - 3D Flipping Cards
 * 
 * Displays a rotating stack of project cards with a 3D perspective effect.
 * Represents the "Real-world production environments" mentioned in the copy.
 */
export function HeroVisual() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroProjectImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full h-[250px] sm:h-[500px] perspective-1000 flex items-center justify-center transform-gpu">
            {/* Ambient Glows - Subtle and wide */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative w-[280px] h-[190px] sm:w-[450px] sm:h-[280px] preserve-3d will-change-transform" style={{ transform: "translate3d(0,0,0)" }}>
                <AnimatePresence mode="popLayout">
                    {heroProjectImages.map((src, index) => {
                        const offset = (index - currentIndex + heroProjectImages.length) % heroProjectImages.length;
                        if (offset > 2 && offset !== heroProjectImages.length - 1) return null;

                        return (
                            <motion.div
                                key={src}
                                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-[#0A0A0A]"
                                initial={false}
                                animate={{
                                    scale: offset === 0 ? 1 : 1 - offset * 0.1,
                                    y: offset * 30, // Stack vertically downwards
                                    z: -offset * 50, // Move back in 3D space
                                    opacity: offset === 0 ? 1 : 1 - offset * 0.3,
                                    rotateX: offset === 0 ? 0 : 5, // Slight tilt for back cards
                                }}
                                exit={{
                                    y: -100,
                                    opacity: 0,
                                    scale: 0.9,
                                    rotateX: -10,
                                    transition: { duration: 0.5 }
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                style={{
                                    zIndex: heroProjectImages.length - offset,
                                    transformStyle: "preserve-3d",
                                    transform: "translate3d(0,0,0)",
                                    willChange: "transform, opacity"
                                }}
                            >
                                {/* Premium Border Gradient */}
                                <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-transparent z-10 pointer-events-none" />

                                <div className="relative w-full h-full group bg-[#050505]">
                                    <Image
                                        src={src}
                                        alt="Project Preview"
                                        fill
                                        className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                        priority={index === 0}
                                    />

                                    {/* Glass Overlay & Reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-30 pointer-events-none" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                    {/* Active Card Highlight & Shimmer */}
                                    {offset === 0 && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 border border-red-500/30 rounded-2xl z-20"
                                                layoutId="active-border"
                                            />
                                            {/* Moving Shimmer Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-shimmer pointer-events-none" />
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Enhanced Floating Tags */}
            <motion.div
                className="absolute right-0 sm:-right-10 top-[15%] sm:top-1/4 bg-black/60 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-red-500/20 shadow-xl text-[10px] sm:text-xs font-mono text-red-500/90 flex items-center gap-2 z-50 pointer-events-none transform-gpu"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Production
            </motion.div>

            <motion.div
                className="absolute left-0 sm:-left-10 bottom-[15%] sm:bottom-1/4 bg-black/60 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/10 shadow-xl text-[10px] sm:text-xs font-mono text-white/60 flex items-center gap-2 z-50 pointer-events-none transform-gpu"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                Verified Metrics
            </motion.div>
        </div>
    )
}
