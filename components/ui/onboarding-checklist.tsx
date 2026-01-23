"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, PlayCircle, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export interface ChecklistItem {
    id: number | string;
    text: string;
}

export interface OnboardingSlide {
    id: number | string;
    title: string;
    description: string;
    items: ChecklistItem[];
}

export interface OnboardingChecklistProps {
    slides: OnboardingSlide[];
    videoThumbnailUrl: string;
    videoUrl: string;
    className?: string;
}

export const OnboardingChecklist = ({
    slides,
    videoThumbnailUrl,
    videoUrl,
    className,
}: OnboardingChecklistProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [hasMounted, slides.length]);

    if (!hasMounted) {
        return <section className={cn("w-full py-12 md:py-20 bg-black/40 backdrop-blur-sm border-y border-white/5 min-h-[500px]", className)} />;
    }

    const slide = slides[currentSlide];

    return (
        <section className={cn("w-full py-12 md:py-20 bg-black/40 backdrop-blur-sm border-y border-white/5", className)}>
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-zinc-900/40 border border-white/10 rounded-[32px] p-6 md:p-12 overflow-hidden shadow-2xl relative">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Sliding Content */}
                        <div className="flex flex-col h-full min-h-[400px]">
                            <div className="flex items-center gap-2 mb-6">
                                <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold">
                                    Onboarding Guide
                                </Badge>
                                <div className="flex gap-1">
                                    {slides.map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1 transition-all duration-300 rounded-full",
                                                i === currentSlide ? "w-4 bg-red-500" : "w-1 bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="flex flex-col h-full"
                                >
                                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white/50 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                                        {slide.description}
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                                        {slide.items.map((item, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-3 bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm font-medium text-white/80">{item.text}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Side: Video Thumbnail */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative group rounded-[24px] overflow-hidden cursor-pointer w-full aspect-video shadow-2xl border border-white/10"
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="w-full h-full">
                                        <img
                                            src={videoThumbnailUrl}
                                            alt="Mindscape Analytics Video Guide"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/20">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                                <PlayCircle className="h-20 w-20 text-white relative z-10 transform transition-all duration-300 group-hover:scale-110" />
                                            </div>
                                        </div>
                                        {/* Floating Info Badge */}
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-red-400" />
                                                <span className="text-xs font-bold text-white uppercase tracking-wider">Watch our approach</span>
                                            </div>
                                            <Badge className="bg-red-500/20 text-red-400 border-none text-[10px]">Video Guide</Badge>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 border border-white/10 bg-black overflow-hidden sm:rounded-[24px]">
                                    <div className="aspect-video w-full">
                                        <iframe
                                            src={videoUrl}
                                            title="Onboarding Video Guide"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
