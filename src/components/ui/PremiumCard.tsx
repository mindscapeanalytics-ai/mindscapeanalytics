"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface PremiumCardProps {
    title: string
    icon: React.ComponentType<any>
    description: string
    features: string[]
    gradient?: string
    link: string
    index?: number
}
export function PremiumCard({
    title,
    icon: Icon,
    description,
    features,
    link,
    index = 0
}: PremiumCardProps) {
    return (
        <div className="group relative h-full">
            {/* Hover Glow Effect */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl blur-3xl pointer-events-none",
                "bg-gradient-to-t from-transparent via-white/5 to-transparent"
            )} />

            {/* hover-triggered data stream lines */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scan-slow" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scan-fast" />
            </div>

            {/* Main Interactive Card */}
            <div className="relative h-full bg-white/[0.03] backdrop-blur-md rounded-2xl p-8 flex flex-col transition-all duration-500 group-hover:bg-white/[0.06] border border-white/5 shadow-2xl overflow-hidden transform-gpu will-change-transform group-hover:border-white/20">

                {/* --- Industrial HUD Elements --- */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/10 group-hover:border-white/40 transition-colors" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/10 group-hover:border-white/40 transition-colors" />

                <div className="absolute top-12 left-2 flex flex-col gap-1 items-center opacity-5 group-hover:opacity-20 transition-opacity">
                    {[1, 2, 3].map(i => <div key={i} className="w-[1px] h-6 bg-white" />)}
                    <span className="text-[7px] font-mono font-black vertical-text py-2 uppercase tracking-[0.3em]">
                        DATA_ST_0x{index.toString(16).toUpperCase()}
                    </span>
                </div>

                {/* --- Content --- */}
                <div className="pl-6 relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                        {/* Icon container */}
                        <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center border border-white/10",
                            "bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 group-hover:border-white/20 transition-all duration-500"
                        )}>
                            <Icon className="h-5 w-5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                        </div>

                        {/* Status Readout */}
                        <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                            <span className="text-[7px] font-mono font-black text-white tracking-[0.3em] uppercase">ST: NOMINAL</span>
                            <span className="text-[7px] font-mono font-black text-white/50 tracking-[0.4em] uppercase">REF_NODE_0{index + 1}</span>
                        </div>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-black text-white mb-4 leading-tight tracking-[-0.03em] uppercase transition-all group-hover:translate-x-1">
                        {title}
                    </h3>

                    <p className="text-white/40 text-[10px] mb-8 line-clamp-3 leading-relaxed font-bold group-hover:text-white/60 transition-colors uppercase tracking-tight">
                        {description}
                    </p>

                    {/* Features List - High Density */}
                    <div className="space-y-3 mb-10 flex-grow">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-center group/item text-[9px] font-mono font-black text-white/10 hover:text-white/50 transition-colors uppercase tracking-[0.1em]">
                                <div className="w-1.5 h-px bg-white/20 mr-3" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link href={link} className="block group/btn mt-auto">
                        <div className="w-full h-12 border border-white/5 rounded-xl flex items-center justify-between px-6 text-[9px] font-mono font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden relative">
                            <span className="relative z-10">Execute Node</span>
                            <motion.div 
                                className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                            />
                            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1" />
                        </div>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
                @keyframes scan {
                    from { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    to { transform: translateY(100%); opacity: 0; }
                }
                .animate-scan-slow {
                    animation: scan 4s linear infinite;
                }
                .animate-scan-fast {
                    animation: scan 2.5s linear infinite;
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    )
}
