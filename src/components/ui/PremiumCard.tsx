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

export function PremiumCard({ title, icon: Icon, description, features, gradient, link, index = 0 }: PremiumCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
        >
            {/* Hover Glow Effect */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl blur-3xl pointer-events-none",
                "bg-gradient-to-t from-transparent via-white/5 to-transparent"
            )} />

            {/* Main Interactive Card */}
            <div className="relative h-full bg-white/[0.03] backdrop-blur-md rounded-xl p-8 flex flex-col transition-all duration-500 group-hover:bg-white/[0.06] border border-white/5 shadow-2xl overflow-hidden transform-gpu will-change-transform group-hover:border-white/20">

                {/* --- Industrial HUD Elements --- */}
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none" />

                {/* Corner Brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

                <div className="absolute top-12 left-2 flex flex-col gap-1 items-center opacity-10">
                    {[1, 2, 3].map(i => <div key={i} className="w-[1px] h-4 bg-white" />)}
                    <span className="text-[8px] font-mono font-black vertical-text py-2 uppercase tracking-[0.2em]">
                        SECTOR_ID:0x{index.toString(16).toUpperCase()}
                    </span>
                </div>

                {/* --- Content --- */}
                <div className="pl-6 relative z-10">
                    <div className="flex items-start justify-between mb-8">
                        {/* Icon container */}
                        <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                            "bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 group-hover:border-white/20 transition-all duration-500"
                        )}>
                            <Icon className="h-6 w-6 text-white group-hover:scale-110 transition-all duration-500" />
                        </div>

                        {/* System Status Readout (Top Right) */}
                        <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <span className="text-[8px] font-mono font-black text-white/50 tracking-[0.2em] uppercase">ST: NOMINAL</span>
                            <span className="text-[8px] font-mono font-black text-white/10 tracking-[0.3em] uppercase">REF_0{index + 1}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-white mb-6 leading-tight tracking-[-0.05em] uppercase transition-all group-hover:translate-x-2 font-syncopate italic">
                        {title}
                    </h3>

                    <p className="text-white/30 text-[11px] mb-10 line-clamp-3 leading-relaxed font-medium group-hover:text-white/50 transition-colors uppercase tracking-tight">
                        {description}
                    </p>

                    {/* Features Preview - Technical List */}
                    <div className="space-y-4 mb-12 flex-grow">
                        {features.slice(0, 3).map((feature) => (
                            <div key={feature} className="flex items-center group/item text-[9px] font-mono font-black text-white/20 hover:text-white/60 transition-colors uppercase tracking-[0.2em]">
                                <div className="w-1.5 h-1.5 rounded-full border border-white/40 mr-4 flex items-center justify-center">
                                    <div className="w-0.5 h-0.5 bg-white/60" />
                                </div>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link href={link} className="block group/btn">
                        <div className="w-full h-14 border border-white/5 rounded-2xl flex items-center justify-between px-6 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-500 shadow-2xl backdrop-blur-md">
                            <span>Execute Connection</span>
                            <div className="p-2 rounded-xl border border-white/10 bg-transparent/40 group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Bottom Metadata Band */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </motion.div>
    )
}
