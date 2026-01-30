"use client"

import React, { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { StandardBackground } from "@/components/shared/background"
import { SectionDivider } from "@/components/section-divider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import UnifiedChat from "@/components/unified-chat"

// Modular Section Components
// Core critical path components - Static import for LCP
import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"
import ServicesShowcase from "@/components/services-showcase"
import ProductsShowcase from "@/components/products-showcase"

// Error handling and loading states
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SectionSkeleton, HeroSkeleton } from "@/components/ui/section-skeleton"

// Dynamic imports for heavy interactive components with proper loading states
import dynamic from 'next/dynamic'

// Hero with custom skeleton - SSR enabled for better performance
const EnhancedHero = dynamic(() => import("@/components/enhanced-hero"), {
  loading: () => <HeroSkeleton />
})

const ProjectsShowcase = dynamic(() => import("@/components/projects-showcase"), {
  loading: () => <SectionSkeleton height="600px" />
})

const CaseStudiesSection = dynamic(() => import("@/components/case-studies-section"), {
  loading: () => <SectionSkeleton height="700px" />
})

const EnhancedIndustrySolutions = dynamic(() => import("@/components/enhanced-industry-solutions"), {
  loading: () => <SectionSkeleton height="800px" />
})

const UnifiedAIPlatform = dynamic(() => import("@/components/unified-ai-platform"), {
  loading: () => <SectionSkeleton height="900px" />
})

const TechStackShowcase = dynamic(() => import("@/components/tech-stack-showcase"), {
  loading: () => <SectionSkeleton height="600px" />
})

const TeamSection = dynamic(() => import("@/components/team-section"), {
  loading: () => <SectionSkeleton height="700px" />
})

const TestimonialCarousel = dynamic(() => import("@/components/testimonial-carousel"), {
  loading: () => <SectionSkeleton height="500px" />
})

const InstantQuoteCalculator = dynamic(() => import("@/components/instant-quote-calculator"), {
  loading: () => <SectionSkeleton height="600px" showSpinner={false} />
})

const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
  loading: () => <SectionSkeleton height="500px" showSpinner={false} />
})

const EnhancedCTASection = dynamic(() => import("@/components/enhanced-cta-section"), {
  loading: () => <SectionSkeleton height="400px" />
})

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax and scroll effects for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <main ref={containerRef} className="min-h-screen w-full text-white relative overflow-x-hidden selection:bg-red-500/30">
      <StandardBackground />

      <section id="hero" className="relative z-20">
        <ErrorBoundary>
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <EnhancedHero fullWidth={true} />
          </motion.div>
        </ErrorBoundary>
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
        <ErrorBoundary>
          <ProjectsShowcase />
        </ErrorBoundary>
      </section>

      <section id="case-studies" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <CaseStudiesSection />
        </ErrorBoundary>
      </section>

      <section id="solutions" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <EnhancedIndustrySolutions />
        </ErrorBoundary>
      </section>

      <SectionDivider variant="dots" className="opacity-20" />

      <section id="ai-platform" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <UnifiedAIPlatform />
        </ErrorBoundary>
      </section>

      <section id="tech-stack" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <TechStackShowcase />
        </ErrorBoundary>
      </section>

      <section id="team" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <TeamSection />
        </ErrorBoundary>
      </section>

      <SectionDivider variant="gradient" className="opacity-30" />

      <section id="testimonials" className="relative z-10 py-8 md:py-12">
        <ErrorBoundary>
          <TestimonialCarousel />
        </ErrorBoundary>
      </section>

      <section id="tools" className="relative z-10 py-8 md:py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
            <div className="w-full">
              <ErrorBoundary>
                <InstantQuoteCalculator />
              </ErrorBoundary>
            </div>
            <div className="w-full">
              <ErrorBoundary>
                <WhyChooseUs />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative z-10 py-12 md:py-16">
        <ErrorBoundary>
          <EnhancedCTASection />
        </ErrorBoundary>
      </section>

      <ScrollToTop />
      <UnifiedChat initialStyle="floating" allowStyleToggle={true} theme="landing" />
      <CookieConsent />
    </main>
  )
}
