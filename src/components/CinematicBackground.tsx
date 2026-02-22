"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import React from "react";

export default function CinematicBackground() {
    const { scrollYProgress } = useScroll();

    // Smoothed progress for less jittery animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Performance-optimized transforms - varying speeds for depth
    const y0 = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
    const y1 = useTransform(smoothProgress, [0, 1], ["0%", "-25%"]);
    const y2 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
    const y3 = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);

    const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1.1]);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-monochrome-cinematic">
            {/* High-Performance Atmospheric Orbs - Using Radial Gradients instead of filter:blur */}
            <div className="absolute inset-0 transform-gpu will-change-transform">
                {/* Large Background Orb (Deepest) - Subtle Smooth Light */}
                <m.div
                    style={{
                        y: y0,
                        scale: glowScale,
                        opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.18, 0.1]),
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
                    }}
                    className="absolute top-[-20%] left-[-15%] w-[100%] h-[100%]"
                />

                {/* Dynamic Mid-layer Orbs */}
                <m.div
                    style={{
                        y: y1,
                        scale: glowScale,
                        opacity: useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.06, 0.12, 0.06, 0.03]),
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, transparent 65%)'
                    }}
                    className="absolute top-[10%] right-[-5%] w-[60%] h-[60%]"
                />

                <m.div
                    style={{
                        y: y2,
                        scale: glowScale,
                        opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.1, 0.18, 0.1, 0.06]),
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 60%)'
                    }}
                    className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%]"
                />

                {/* Constant Intense Center Shine - Refined Premium Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] opacity-20 transform-gpu" />

                {/* Reactive HUD Overlay */}
                <div className="absolute inset-0 z-10 opacity-[0.05]">
                    {/* Horizontal Scanlines - Lowered opacity for cleaner text rendering */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]" />

                    {/* Data HUD Markers - Converted to pure CSS animation for 0 JS cost */}
                    <div
                        className="absolute inset-0 flex items-center justify-center animate-[float_25s_linear_infinite] will-change-transform"
                    >
                        <div className="w-[92vw] h-[85vh] border border-white/15 rounded-[4rem] relative">
                            <div className="absolute top-10 left-10 w-6 h-px bg-white/30" />
                            <div className="absolute top-10 right-10 w-6 h-px bg-white/30" />
                            <div className="absolute bottom-10 left-10 w-6 h-px bg-white/30" />
                            <div className="absolute bottom-10 right-10 w-6 h-px bg-white/30" />

                            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 px-6 bg-black/80 border-x border-b border-white/10 rounded-b-xl overflow-hidden">
                                <span className="text-[9px] font-mono tracking-[0.6em] text-white/30">MONITOR_ACTIVE // NODE_01A</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unified Global Grid Overlay - Clean, modern scale */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/grid.svg')] bg-repeat transform-gpu"
                    style={{ backgroundSize: '60px 60px' }}
                />
            </div>
        </div>
    );
}
