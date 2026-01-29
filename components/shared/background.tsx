"use client"

import React from "react";

// Background component that implements the landing page's background style and effects
export function StandardBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Metallic Sheen - Subtle diagonal linear gradient to simulate brushed metal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/20" />

      {/* Refined Radial Highlight - More focused for reflective depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-[#050505] to-[#050505]" />

      {/* Ultra-Fine Industrial Grid - Barely visible structure */}
      <div className="absolute inset-0 bg-grid-white/[0.01] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

      {/* Film Grain / Noise - Slightly higher opacity for metallic texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

      {/* Vignette for cinematic focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
}

// Section background with glow effect
export function SectionBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
    </div>
  );
} 
