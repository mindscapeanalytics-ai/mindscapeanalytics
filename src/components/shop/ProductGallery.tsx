"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    images: { url: string }[];
    name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/10 flex items-center justify-center text-white/10">
                <Box size={80} strokeWidth={0.5} />
            </div>
        );
    }

    const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="space-y-6">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/10 group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[activeIndex].url}
                            alt={`${name} - ${activeIndex + 1}`}
                            fill
                            priority
                            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => { e.preventDefault(); prevImage(); }}
                            className="p-4 bg-transparent/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white/60 hover:text-white transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); nextImage(); }}
                            className="p-4 bg-transparent/40 backdrop-blur-xl border border-white/10 rounded-2xl text-white/60 hover:text-white transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-8 left-8 flex items-center gap-3 px-4 py-2 bg-transparent/60 backdrop-blur-xl border border-white/10 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Verified Node</span>
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-8 right-8 px-4 py-2 bg-transparent/60 backdrop-blur-xl border border-white/10 rounded-full">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                            {activeIndex + 1} / {images.length}
                        </span>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex flex-wrap gap-4 mt-8">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${i === activeIndex
                                ? "border-white scale-105"
                                : "border-transparent opacity-40 hover:opacity-100 hover:border-white/20"
                                }`}
                        >
                            <Image
                                src={img.url}
                                alt={`${name} thumb ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
