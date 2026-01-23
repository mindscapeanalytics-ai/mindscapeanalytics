"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SectionDivider } from "@/components/section-divider"
import { StandardBackground } from "@/components/shared/background"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import UnifiedChat from "@/components/unified-chat"

// Modular Section Components
import EnhancedHero from "@/components/enhanced-hero"
import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"
import ServicesShowcase from "@/components/services-showcase"
import ProductsShowcase from "@/components/products-showcase"
import ProjectsShowcase from "@/components/projects-showcase"
import CaseStudiesSection from "@/components/case-studies-section"
import EnhancedIndustrySolutions from "@/components/enhanced-industry-solutions"
import UnifiedAIPlatform from "@/components/unified-ai-platform"
import TechStackShowcase from "@/components/tech-stack-showcase"
import TeamSection from "@/components/team-section"
import TestimonialCarousel from "@/components/testimonial-carousel"
import InstantQuoteCalculator from "@/components/instant-quote-calculator"
import WhyChooseUs from "@/components/why-choose-us"
import EnhancedCTASection from "@/components/enhanced-cta-section"

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
    <main ref={containerRef} className="min-h-screen w-full bg-black text-white relative overflow-x-hidden selection:bg-red-500/30">
      <StandardBackground />

      <section id="hero" className="relative z-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <EnhancedHero fullWidth={true} />
        </motion.div>
      </section>

      <section id="onboarding" className="relative z-10 py-12 md:py-20">
        <OnboardingChecklist
          videoUrl="https://www.youtube.com/embed/RnJAvSKHGzw"
          videoThumbnailUrl="https://img.youtube.com/vi/RnJAvSKHGzw/maxresdefault.jpg"
          slides={[
            {
              id: "what-we-do",
              title: "What We Do",
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
              title: "Our Core Capabilities",
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
              title: "How We Work",
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
              title: "Why Choose Us",
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
              title: "Enterprise Standards",
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

      <SectionDivider variant="gradient" className="opacity-50" />

      <section id="services" className="relative z-10 py-12 md:py-20">
        <ServicesShowcase />
      </section>

      <SectionDivider variant="dots" />

      <section id="products" className="relative z-10 py-12 md:py-20">
        <ProductsShowcase />
      </section>

      <section id="projects" className="relative z-10 py-12 md:py-20 overflow-hidden">
        <ProjectsShowcase />
      </section>

      <SectionDivider variant="gradient" className="rotate-180 opacity-30" />

      <section id="case-studies" className="relative z-10 py-12 md:py-20">
        <CaseStudiesSection />
      </section>

      <section id="solutions" className="relative z-10 py-12 md:py-20">
        <EnhancedIndustrySolutions />
      </section>

      <SectionDivider variant="shadow" />

      <section id="ai-platform" className="relative z-10 py-12 md:py-20">
        <UnifiedAIPlatform />
      </section>

      <section id="tech-stack" className="relative z-10 py-12 md:py-20">
        <TechStackShowcase />
      </section>

      <SectionDivider variant="dots" />

      <section id="team" className="relative z-10 py-12 md:py-20">
        <TeamSection />
      </section>

      <section id="testimonials" className="relative z-10 py-12 md:py-20">
        <TestimonialCarousel />
      </section>

      <section id="tools" className="relative z-10 py-8 md:py-12 bg-zinc-950/40 border-t border-white/5">
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

      <section id="cta" className="relative z-10 py-16 md:py-24">
        <EnhancedCTASection />
      </section>

      <ScrollToTop />
      <UnifiedChat initialStyle="floating" allowStyleToggle={true} theme="landing" />
      <CookieConsent />
    </main>
  )
}