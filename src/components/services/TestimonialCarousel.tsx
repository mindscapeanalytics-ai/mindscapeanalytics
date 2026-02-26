"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useAnimation, useInView, useMotionValue, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote, Globe, ShieldCheck, LayoutDashboard } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        quote: "Got exactly what I inquired + extra, 10/10 stars. Will come back for more projects!",
        author: "Alex Chen",
        company: "TechFlow Solutions",
        location: "Sweden",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        date: "2 years ago",
        role: "CTO"
    },
    {
        id: 2,
        quote: "Delivered in a timely manner. Very responsive and accommodating. Outstanding technical expertise.",
        author: "Sarah Johnson",
        company: "DataVision Corp",
        location: "United States",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        date: "3 years ago",
        role: "VP Engineering"
    },
    {
        id: 3,
        quote: "A Data Genius! Transformed our entire analytics infrastructure with cutting-edge solutions.",
        author: "Michael Rodriguez",
        company: "InnovateLabs",
        location: "Canada",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        date: "3 years ago",
        role: "Head of Data"
    },
    {
        id: 4,
        quote: "Great skills, commitment and good communication with seller along the way. Recommended provider to bring your ideas to reality.",
        author: "Carlos Martinez",
        company: "Digital Dynamics",
        location: "El Salvador",
        rating: 5,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        date: "3 years ago",
        role: "Product Director"
    },
    {
        id: 5,
        quote: "Excellent work, Zeeshan was on time, polite, professional and I am very happy with the service and results I received. Will use him again and highly recommend.",
        author: "Emma Thompson",
        company: "CloudFirst Ltd",
        location: "United Kingdom",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        date: "4 years ago",
        role: "Technical Lead"
    },
    {
        id: 6,
        quote: "Great work!! Exceeded expectations with innovative AI solutions that transformed our business processes.",
        author: "David Kim",
        company: "NextGen Systems",
        location: "United States",
        rating: 5,
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
        date: "4 years ago",
        role: "CEO"
    }
];

function Avatar({ src, alt }: { src: string; alt: string }) {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
        return (
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <span className="text-white/40 font-black text-xs uppercase">{alt.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
            </div>
        );
    }

    return (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-300 shadow-xl flex-shrink-0">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={() => setImgError(true)}
                unoptimized
            />
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
    return (
        <Card className="relative overflow-hidden rounded-[2.5rem] group transition-all duration-500 w-[320px] h-[400px] bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10 shadow-2xl flex flex-col backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <Quote className="h-16 w-16 text-white rotate-180" />
            </div>

            <CardContent className="p-10 h-full flex flex-col relative z-10 justify-between">
                <div className="flex-1 space-y-6">
                    <div className="flex gap-1 items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(testimonial.rating) ? "text-white fill-white" : "text-white/10 fill-white/10"}`}
                            />
                        ))}
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed font-black uppercase tracking-widest group-hover:text-white/90 transition-colors duration-500 line-clamp-6 italic">
                        "{testimonial.quote}"
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                    <Avatar src={testimonial.image} alt={testimonial.author} />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-black text-[11px] uppercase tracking-[0.2em] group-hover:text-white transition-colors truncate mb-1">
                            {testimonial.author}
                        </h3>
                        <div className="space-y-1">
                            <p className="text-white/30 text-[9px] font-black uppercase tracking-widest truncate">
                                {testimonial.role} // {testimonial.company}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em]">{testimonial.location}</span>
                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                <span className="text-[8px] text-white/20 font-black uppercase tracking-[0.3em]">{testimonial.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function TestimonialCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const isInView = useInView(scrollContainerRef);

    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    const startAnimation = useCallback(async () => {
        if (!scrollContainerRef.current || isPaused) return;

        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const thirdWidth = scrollWidth / 3;
        const currentX = x.get();

        const remainingDistance = (thirdWidth * 2) + currentX;
        const speed = 40;
        const duration = remainingDistance / speed;

        await controls.start({
            x: -(thirdWidth * 2),
            transition: {
                duration: Math.abs(duration),
                ease: "linear",
            }
        });

        x.set(-thirdWidth);
        startAnimation();
    }, [controls, isPaused, x]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const thirdWidth = scrollContainerRef.current.scrollWidth / 3;
            x.set(-thirdWidth);
        }
    }, [x]);

    useEffect(() => {
        if (isInView && !isPaused) {
            startAnimation();
        } else {
            controls.stop();
        }
    }, [isInView, isPaused, startAnimation, controls]);

    return (
        <section className="py-32 bg-transparent relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 space-y-6">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40 px-6 py-2 text-[9px] tracking-[0.5em] uppercase font-black backdrop-blur-xl shadow-2xl">
                        GLOBAL_VALIDATION
                    </Badge>
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tightest uppercase italic">
                        ELITE <span className="text-white/20 not-italic">VALIDATION.</span>
                    </h2>
                    <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed italic">
                        Architecting high-performance systems for global enterprises since the initialization of operations.
                    </p>
                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-48 z-10 bg-gradient-to-r from-black via-black/50 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-48 z-10 bg-gradient-to-l from-black via-black/50 to-transparent" />

                    <div className="overflow-hidden mask-fade-edges">
                        <motion.div
                            ref={scrollContainerRef}
                            className="flex gap-8 py-8 cursor-grab active:cursor-grabbing"
                            animate={controls}
                            style={{ x }}
                            onDragStart={() => setIsPaused(true)}
                            onDragEnd={(_, info) => {
                                const currentX = x.get();
                                x.set(currentX + info.offset.x);
                                setTimeout(() => setIsPaused(false), 2000);
                            }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            drag="x"
                        >
                            {duplicatedTestimonials.map((testimonial, index) => (
                                <div key={`${testimonial.id}-${index}`} className="flex-none">
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="mt-20 flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-12 text-white/20">
                        {["FIVERR PRO", "ELITE VETTING", "TOP RATED", "GLOBAL OPS"].map((signal) => (
                            <span key={signal} className="text-[10px] font-black tracking-[0.4em] uppercase hover:text-white/40 transition-colors cursor-default">
                                {signal}
                            </span>
                        ))}
                    </div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </section>
    );
}
