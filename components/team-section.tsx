"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const teamMembers = [
  {
    name: "Zeeshan Keerio",
    role: "Founder & CEO",
    bio: "Visionary AI specialist with extensive experience in developing cutting-edge artificial intelligence solutions. Combining technical expertise with strategic business acumen to transform industries through AI innovation.",
    image: "/founder.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/zeeshan-keerio/",
      twitter: "#",
      github: "#",
      email: "mailto:zeeshan.keerio@mindscapeanalytics.com"
    }
  },
  {
    name: "Muhammad Atif",
    role: "Full Stack Developer",
    bio: "Versatile developer specializing in creating scalable, user-friendly applications with modern technologies. Expert in building robust full-stack solutions.",
    image: "/muhammad-atif.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Ghulam Akbar",
    role: "Business Development Manager",
    bio: "Strategic leader focused on driving growth through market expansion, high-value partnerships, and innovative sales strategies.",
    image: "/Akbar_keerio.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Syed Athar",
    role: "Brand & Media Specialist",
    bio: "Creative expert dedicated to building compelling brand identities and high-impact digital media strategies for global enterprises.",
    image: "/syed-ather.png",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Farhan Murad",
    role: "Cybersecurity Analyst",
    bio: "Security specialist focused on proactive threat detection, vulnerability management, and ensuring the integrity of digital infrastructure.",
    image: "/farhankeerio.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      email: "#"
    }
  }
]

const TeamCard = React.memo(({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  const isFounder = member.name === "Zeeshan Keerio"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-xl group transition-all duration-300 w-[320px] h-[520px] will-change-transform transform-gpu ${isFounder
        ? "bg-gradient-to-br from-red-500/10 to-black/40 border border-red-500/30 shadow-[0_0_25px_rgba(220,38,38,0.2)]"
        : "bg-black/40 border border-white/10"
        }`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image container */}
      <div className="relative h-[300px] overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

        {/* Decorative elements */}
        {isFounder && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent z-0" />
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-transparent blur-lg opacity-50 transition-opacity duration-1000 group-hover:animate-pulse" />
          </>
        )}

        {isFounder ? (
          <Link href="/founder">
            <Image
              src={member.image}
              alt={member.name}
              width={500}
              height={500}
              className={`w-full h-full object-cover transition-transform duration-500 ${isFounder ? "group-hover:scale-110" : "group-hover:scale-105"
                }`}
              priority={index < 3}
            />
          </Link>
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            width={500}
            height={500}
            className={`w-full h-full object-cover transition-transform duration-500 ${isFounder ? "group-hover:scale-110" : "group-hover:scale-105"
              }`}
            priority={index < 3}
          />
        )}

        {/* Role badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${isFounder
            ? "bg-red-500/20 text-red-400 border border-red-500/30"
            : "bg-white/10 text-white/70 border border-white/10"
            }`}>
            {member.role}
          </span>
        </div>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          {isFounder ? (
            <Link href="/founder">
              <h3 className="text-2xl font-bold text-white hover:text-red-400 transition-colors uppercase tracking-tighter">{member.name}</h3>
            </Link>
          ) : (
            <h3 className="text-2xl font-bold uppercase tracking-tighter">{member.name}</h3>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 h-[220px] flex flex-col">
        <p className="text-white/70 text-sm leading-relaxed flex-grow">{member.bio}</p>

        {/* Social links */}
        <div className="flex gap-3 pt-4">
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${isFounder
              ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110"
              : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${isFounder
              ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110"
              : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
            aria-label={`${member.name}'s GitHub profile`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={member.social.email}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all duration-300 ${isFounder
              ? "bg-red-500/20 hover:bg-red-500/30 hover:scale-110"
              : "bg-white/5 hover:bg-white/10 hover:scale-105"
              }`}
            aria-label={`${member.name}'s email`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  )
})

TeamCard.displayName = "TeamCard"

export default function TeamSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(true)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  // Auto-scroll functionality using requestAnimationFrame for smoothness
  useEffect(() => {
    if (!scrollContainerRef.current || !isAutoScrolling) return

    let animationFrameId: number
    const scrollSpeed = 0.8 // Increased speed for better visibility (pixels per frame)

    const step = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const singleSetWidth = scrollWidth / 2 // We duplicate the team members

        // Seamless loop: reset to beginning when we've scrolled past one full set
        if (scrollLeft >= singleSetWidth) {
          scrollContainerRef.current.scrollLeft = 0
        } else {
          scrollContainerRef.current.scrollLeft += scrollSpeed
        }

        // Update arrow visibility
        setShowLeftArrow(scrollLeft > 10)
        setShowRightArrow(true)
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isAutoScrolling])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false)
      const scrollAmount = 400
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      })

      setShowLeftArrow(newScroll > 0)
      setShowRightArrow(
        newScroll < (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)
      )

      // Resume auto-scroll after manual scroll
      setTimeout(() => setIsAutoScrolling(true), 5000)
    }
  }

  return (
    <div className="relative overflow-hidden bg-transparent">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-red-500/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="w-full px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">OUR TEAM</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Meet Our <span className="text-red-500">Expert</span> Team
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Industry leaders and innovators driving the future of AI and software solutions
          </p>
        </div>

        {/* Team Members Slider */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Team Members Grid - GPU Accelerated */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              willChange: 'scroll-position',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden',
            }}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onScroll={(e) => {
              const target = e.target as HTMLDivElement
              const scrollLeft = target.scrollLeft
              const scrollWidth = target.scrollWidth
              const halfWidth = scrollWidth / 2

              if (scrollLeft >= halfWidth) {
                target.scrollLeft = scrollLeft - halfWidth
              }

              setShowLeftArrow(target.scrollLeft > 10)
              setShowRightArrow(true)
            }}
          >
            {[...teamMembers, ...teamMembers].map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="flex-none w-80"
                style={{
                  transform: 'translateZ(0)', // GPU acceleration for each card
                }}
              >
                <TeamCard member={member} index={index % teamMembers.length} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
