"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Linkedin, Github, Mail, Quote } from "lucide-react"
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
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Quote className="h-10 w-10 text-red-400 rotate-180" />
      </div>
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
            <Linkedin className="h-5 w-5" />
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
            <Github className="h-5 w-5" />
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
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
})

TeamCard.displayName = "TeamCard"

import { useAnimation, useMotionValue, useInView } from "framer-motion"

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const x = useMotionValue(0)
  const [isPaused, setIsPaused] = useState(false)
  const dragX = useMotionValue(0)

  // Triple members for seamless loop on ultra-wide screens
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers]

  const startAnimation = useCallback(async () => {
    if (!containerRef.current || isPaused) return

    const scrollWidth = containerRef.current.scrollWidth
    const loopWidth = scrollWidth / 3
    const currentX = x.get()

    // Calculate duration based on distance to end of first set
    const remainingDistance = (loopWidth * 2) + currentX
    const speed = 50 // Pixels per second
    const duration = remainingDistance / speed

    await controls.start({
      x: -(loopWidth * 2),
      transition: {
        duration: Math.abs(duration),
        ease: "linear",
      }
    })

    // Reset to first set position and repeat
    x.set(-loopWidth)
    startAnimation()
  }, [controls, isPaused, x])

  useEffect(() => {
    // Start in the middle
    if (containerRef.current) {
      const loopWidth = containerRef.current.scrollWidth / 3
      x.set(-loopWidth)
    }
  }, [])

  useEffect(() => {
    if (isInView && !isPaused) {
      startAnimation()
    } else {
      controls.stop()
    }
  }, [isInView, isPaused, startAnimation, controls])

  const scroll = (direction: "left" | "right") => {
    setIsPaused(true)
    const scrollAmount = 350
    const targetX = x.get() + (direction === "left" ? scrollAmount : -scrollAmount)

    controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }).then(() => {
      setTimeout(() => setIsPaused(false), 3000)
    })
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
        <div className="relative group">
          {/* Controls */}
          <div className="absolute -top-12 right-0 flex gap-2 z-20">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 hover:border-red-500/50 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full bg-black/50 border border-white/10 hover:bg-black/70 hover:border-red-500/50 transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>

          <div
            className="overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <motion.div
              ref={containerRef}
              className="flex gap-6 py-4 cursor-grab active:cursor-grabbing"
              animate={controls}
              style={{ x }}
              drag="x"
              dragConstraints={{ left: -10000, right: 10000 }}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={(_, info) => {
                const currentX = x.get()
                x.set(currentX + info.offset.x)
                setTimeout(() => setIsPaused(false), 2000)
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedMembers.map((member, index) => (
                <div key={`${member.name}-${index}`} className="flex-none w-80">
                  <TeamCard member={member} index={index % teamMembers.length} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
