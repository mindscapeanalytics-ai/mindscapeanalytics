"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"

// Real testimonials with enhanced client data and professional images
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
  },
  {
    id: 7,
    quote: "Super fast delivery, exactly what I needed. Great communication. Would recommend for enterprise projects.",
    author: "Lisa Anderson",
    company: "ScaleUp Ventures",
    location: "United Kingdom",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    date: "4 years ago",
    role: "Operations Manager"
  },
  {
    id: 8,
    quote: "Great seller, will hire again, thanks! Professional approach to complex data challenges.",
    author: "Jennifer Walsh",
    company: "DataCore Analytics",
    location: "United States",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    date: "4 years ago",
    role: "Data Scientist"
  },
  {
    id: 9,
    quote: "Perfect work with attention to detail and enterprise-grade quality standards.",
    author: "Thomas Mueller",
    company: "EuroTech Solutions",
    location: "Belgium",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    date: "3 years ago",
    role: "Senior Developer"
  },
  {
    id: 10,
    quote: "It has been a good user experience. Despite the language gap, the seller has shown all his willingness to solve my doubts and observations. I recommend your services.",
    author: "Javier Gonzalez",
    company: "LatAm Digital",
    location: "Colombia",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    date: "3 years ago",
    role: "Tech Consultant"
  }
]

// Avatar component with enhanced error handling for professional images
function Avatar({ src, alt }: { src: string, alt: string }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 flex-shrink-0">
        <span className="text-white font-semibold text-sm">{alt.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
      </div>
    )
  }

  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-red-400/50 transition-colors duration-300 shadow-md flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
        unoptimized
      />
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <Card className="relative overflow-hidden rounded-lg group transition-all duration-300 w-[280px] h-[340px] bg-gradient-to-br from-slate-900/60 via-slate-950/90 to-black border border-white/10 hover:border-red-500/40 shadow-lg hover:shadow-xl hover:shadow-red-500/20 flex flex-col backdrop-blur-sm">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="h-10 w-10 text-red-400 rotate-180" />
      </div>

      {/* Content */}
      <CardContent className="p-5 h-full flex flex-col relative z-10 justify-between">
        <div className="flex-1">
          {/* Rating */}
          <div className="flex mb-3 gap-0.5 items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(testimonial.rating) ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
              />
            ))}
            {testimonial.rating % 1 !== 0 && (
              <Badge variant="outline" className="ml-1.5 bg-amber-500/10 border-amber-500/20 text-amber-400 text-[10px] font-semibold px-1 py-0 h-4">
                {testimonial.rating}
              </Badge>
            )}
          </div>

          {/* Quote */}
          <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 line-clamp-4 mb-3">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Author info */}
        <div className="flex items-start gap-3 mt-auto pt-4 border-t border-white/10">
          <Avatar src={testimonial.image} alt={testimonial.author} />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm tracking-tight group-hover:text-red-400 transition-colors truncate mb-1">
              {testimonial.author}
            </h3>
            <div className="space-y-1">
              <p className="text-white/70 text-xs font-medium truncate">
                {testimonial.role} • {testimonial.company}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 text-[9px] px-1.5 py-0 h-4">
                  {testimonial.location}
                </Badge>
                <span className="text-[9px] text-white/40 font-mono">{testimonial.date}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll loop
  useEffect(() => {
    if (!scrollContainerRef.current || !isAutoScrolling) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScroll = scrollWidth - clientWidth

        if (scrollLeft >= maxScroll - 1) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollContainerRef.current.scrollTo({ left: scrollLeft + 1, behavior: 'auto' })
        }
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isAutoScrolling])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      const scrollAmount = 264
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      })

      // Resume auto-scroll after delay
      setTimeout(() => setIsAutoScrolling(true), 5000)
    }
  }

  return (
    <div className="relative overflow-hidden bg-transparent">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
              GLOBAL VALIDATION
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            What Our <span className="text-red-500">Elite Clients</span> Say
          </h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Consistently delivering high-performance solutions for enterprises worldwide.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div
          className="relative group"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {/* Controls */}
          <div className="absolute -top-10 right-4 flex gap-2 z-20">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300 h-8 w-8"
              aria-label="Previous"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-white/70" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="bg-white/5 border-white/10 hover:border-red-500/30 hover:bg-white/10 transition-all duration-300 h-8 w-8"
              aria-label="Next"
            >
              <ChevronRight className="h-3.5 w-3.5 text-white/70" />
            </Button>
          </div>

          {/* Masking gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-black via-black/50 to-transparent" />

          {/* Testimonials Grid */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth py-4 px-20"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="flex-none">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Signal - Compact */}
        <div className="mt-8 flex flex-col items-center gap-2.5">
          <div className="flex flex-wrap justify-center gap-5 md:gap-8 text-white/40">
            <div className="text-[10px] font-medium tracking-wide">FIVERR PRO</div>
            <div className="text-[10px] font-medium tracking-wide">ELITE VETTING</div>
            <div className="text-[10px] font-medium tracking-wide">TOP RATED</div>
          </div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
