"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { StandardBackground } from "@/components/shared/background"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import UnifiedChat from "@/components/unified-chat"

// Modular Section Components
// Core critical path components - Static import for LCP
import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"
import ServicesShowcase from "@/components/services-showcase"
import ProductsShowcase from "@/components/products-showcase"

// Dynamic imports for heavy interactive components
import dynamic from 'next/dynamic'

// Hero is critical but if it's causing generic object errors, we lazy load it to isolate
const EnhancedHero = dynamic(() => import("@/components/enhanced-hero"), { ssr: false })

const ProjectsShowcase = dynamic(() => import("@/components/projects-showcase"), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-black animate-pulse" />
})
const CaseStudiesSection = dynamic(() => import("@/components/case-studies-section"), { ssr: false })
const EnhancedIndustrySolutions = dynamic(() => import("@/components/enhanced-industry-solutions"), { ssr: false })
const UnifiedAIPlatform = dynamic(() => import("@/components/unified-ai-platform"), { ssr: false })
const TechStackShowcase = dynamic(() => import("@/components/tech-stack-showcase"), { ssr: false })
const TeamSection = dynamic(() => import("@/components/team-section"), { ssr: false })
const TestimonialCarousel = dynamic(() => import("@/components/testimonial-carousel"), { ssr: false })
const InstantQuoteCalculator = dynamic(() => import("@/components/instant-quote-calculator"), { ssr: false })
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), { ssr: false })
const EnhancedCTASection = dynamic(() => import("@/components/enhanced-cta-section"), { ssr: false })

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax and scroll effects for the hero section
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  })

  // We want the hero transition to complete within the first 15% of the page scroll
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <main ref={containerRef} className="min-h-screen w-full text-white relative overflow-x-hidden selection:bg-red-500/30">
      <StandardBackground />

      <section id="hero" className="relative z-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <EnhancedHero fullWidth={true} />
        </motion.div>
      </section>

      <section id="onboarding" className="relative z-10 py-8 md:py-12">
        <OnboardingChecklist
          videoUrl="https://www.youtube.com/embed/RnJAvSKHGzw"
          videoThumbnailUrl="https://img.youtube.com/vi/RnJAvSKHGzw/maxresdefault.jpg"
          slides={[
            {
              id: "what-we-do",
              title: <>What We <span className="text-red-500">Do</span></>,
              description: "Mindscape Analytics architecture helps enterprises turn increasing complexity into structured, high-performance systems aligned with business goals.",
              items: [
                { id: 1, text: "Data Platforms & Architecture" },
                { id: 2, text: "AI & Intelligent Systems" },
                { id: 3, text: "Analytics & Decision Systems" },
                { id: 4, text: "Automation & Optimization" }
              ]
            },
            {
              id: "capabilities",
              title: <>Our Core <span className="text-red-500">Capabilities</span></>,
              description: "We architect intelligence across data, analytics, and AI initiatives for long-term scalability and production stability.",
              items: [
                { id: 1, text: "Large-scale Processing" },
                { id: 2, text: "Cloud-native Architectures" },
                { id: 3, text: "Agent-based Systems" },
                { id: 4, text: "Intelligent Workflows" }
              ]
            },
            {
              id: "how-we-work",
              title: <>How We <span className="text-red-500">Work</span></>,
              description: "We take a practical, execution-first approach focused on real enterprise constraints and measurable ROI.",
              items: [
                { id: 1, text: "Understand Objectives" },
                { id: 2, text: "Design Scalable Architectures" },
                { id: 3, text: "Build Production Systems" },
                { id: 4, text: "Optimize Performance" }
              ]
            },
            {
              id: "why-choose-us",
              title: <>Why <span className="text-red-500">Choose Us</span></>,
              description: "Organizations choose Mindscape for deep expertise and a focus on mission-critical delivery.",
              items: [
                { id: 1, text: "Senior AI Engineering" },
                { id: 2, text: "Security-first Defaults" },
                { id: 3, text: "Complex Environment Exp" },
                { id: 4, text: "Result-driven Delivery" }
              ]
            },
            {
              id: "standards",
              title: <>Enterprise <span className="text-red-500">Standards</span></>,
              description: "Our work is designed for organizations where technology is critical and zero-downtime is mandatory.",
              items: [
                { id: 1, text: "SOC2-aligned Design" },
                { id: 2, text: "High-level Encryption" },
                { id: 3, text: "Audit-ready Architecture" },
                { id: 4, text: "Fault-tolerant Systems" }
              ]
            }
          ]}
        />
      </section>

      <section id="services" className="relative z-10 py-8 md:py-12">
        <ServicesShowcase />
      </section>

      <section id="products" className="relative z-10 py-8 md:py-12">
        <ProductsShowcase />
      </section>

      <section id="projects" className="relative z-10 py-8 md:py-12 overflow-hidden">
        <ProjectsShowcase />
      </section>

      <section id="case-studies" className="relative z-10 py-8 md:py-12">
        <CaseStudiesSection />
      </section>

      <section id="solutions" className="relative z-10 py-8 md:py-12">
        <EnhancedIndustrySolutions />
      </section>

      <section id="ai-platform" className="relative z-10 py-8 md:py-12">
        <UnifiedAIPlatform />
      </section>

      <section id="tech-stack" className="relative z-10 py-8 md:py-12">
        <TechStackShowcase />
      </section>

      <section id="team" className="relative z-10 py-8 md:py-12">
        <TeamSection />
      </section>

      <section id="testimonials" className="relative z-10 py-8 md:py-12">
        <TestimonialCarousel />
      </section>

      <section id="tools" className="relative z-10 py-8 md:py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            <div className="w-full">
              <InstantQuoteCalculator />
            </div>
            <div className="w-full">
              <WhyChooseUs />
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative z-10 py-12 md:py-16">
        <EnhancedCTASection />
      </section>

      <ScrollToTop />
      <UnifiedChat initialStyle="floating" allowStyleToggle={true} theme="landing" />
      <CookieConsent />
    </main>
  )
}
