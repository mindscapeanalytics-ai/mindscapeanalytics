"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ShieldCheck, CheckCircle2, Code, Zap, Globe, ArrowRight, ExternalLink, Activity } from "lucide-react";
import Image from "next/image";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductGallery from "./ProductGallery";

interface ProductDetailsModalProps {
    product: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
    if (!product) return null;

    const techStack = (product.techStack as string[]) || ["Enterprise AI", "Cloud Native", "Secure Scalability"];
    const features = (product.features as string[]) || [
        "High-performance architecture",
        "Industrial-grade security",
        "Seamless API integration",
        "Optimized for global scale"
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="relative w-full max-w-[1200px] h-full max-h-[900px] bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 z-[110] p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-xl"
                        >
                            <X size={20} />
                        </button>

                        {/* Left: Gallery Section */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 overflow-y-auto no-scrollbar">
                            <div className="space-y-8">
                                <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border border-white/5">
                                    <Image
                                        src={product.images[0]?.url || "https://placehold.co/600x400/0a0a0b/ffffff?text=No+Image"}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-6 left-6 flex gap-2">
                                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest">
                                            V 2.1.0-STABLE
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack Protocol */}
                                <div className="grid grid-cols-2 gap-3">
                                    {techStack.map((tech: string, i: number) => (
                                        <div key={i} className="px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
                                            <Code size={12} className="text-white/20" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{tech}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Description Context */}
                                <div className="pt-8">
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4 block italic">Core Abstract</span>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed italic border-l border-white/10 pl-6">
                                        {product.description || "Elite architectural primitive engineered for high-tier deployments."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Interaction Interface */}
                        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col overflow-y-auto no-scrollbar">
                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase tracking-[0.4em] text-white/40">
                                        {product.category.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/10">#{product.id.slice(-6).toUpperCase()}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tightest leading-none uppercase italic text-white mb-6">
                                    {product.name}
                                </h2>
                            </div>

                            {/* Features Grid */}
                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-1 gap-4">
                                    {features.map((feature: string, i: number) => (
                                        <div key={i} className="flex gap-4 items-center p-4 bg-white/[0.01] border border-white/5 rounded-2xl group hover:bg-white/[0.03] transition-all">
                                            <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 size={12} className="text-white/20 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Acquisition Footer */}
                            <div className="mt-12 pt-10 border-t border-white/5">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Standard Allocation</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black italic tracking-tighter">${product.price}</span>
                                            <span className="text-white/20 text-[9px] font-bold uppercase">USD</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                        <Activity size={10} className="text-green-500 animate-pulse" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Verified Ready</span>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center">
                                    <div className="w-full max-w-md">
                                        <ProductDetailsClient product={product} />
                                    </div>
                                </div>

                                <div className="mt-10 text-center">
                                    <a
                                        href={`/shop/${product.id}`}
                                        className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Inspect Full Documentation
                                        <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
