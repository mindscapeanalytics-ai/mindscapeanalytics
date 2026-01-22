"use client"

import EnhancedHero from "@/components/enhanced-hero"
import { TrustBanner } from "@/components/enhanced-hero/trust-banner"
import ServicesShowcase from "@/components/services-showcase"

import ProjectsShowcase from "@/components/projects-showcase"
import EnhancedIndustrySolutions from "@/components/enhanced-industry-solutions"
import TechStackShowcase from "@/components/tech-stack-showcase"
import TestimonialCarousel from "@/components/testimonial-carousel"

import EnhancedCTASection from "@/components/enhanced-cta-section"
import { SectionDivider } from "@/components/section-divider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingChatWidget } from "@/components/floating-chat-widget"
import { CookieConsent } from "@/components/cookie-consent"
import UnifiedAIPlatform from "@/components/unified-ai-platform"
import SocialProofSection from "@/components/social-proof-section"
import WhyChooseUs from "@/components/why-choose-us"
import InstantQuoteCalculator from "@/components/instant-quote-calculator"
import ProductsShowcase from "@/components/products-showcase"
import TeamSection from "@/components/team-section"
import CaseStudiesSection from "@/components/case-studies-section"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Database } from "lucide-react"
import { FlexibleSection } from "@/components/flexible-section"
import { getContainerClasses } from "@/lib/container-utils"
import AIChatbot from "@/components/ai-chatbot"
import UnifiedChat from "@/components/unified-chat"

// Feature data
const features = [
  {
    title: "Blockchain Solutions",
    description: "Enterprise-grade blockchain platform with DeFi, NFT, and cross-chain capabilities",
    icon: Database,
    color: "red",
  },
  // ... existing features ...
];

// Solution data
const solutions = [
  {
    title: "Blockchain Platform",
    description: "Build, deploy, and scale blockchain applications with our comprehensive PaaS solution",
    icon: Database,
    color: "red",
    href: "/solutions/blockchain",
  },
  // ... existing solutions ...
];

// Enhanced Background gradient styles matching projects section theme
const backgroundStyles = {
  global: "fixed inset-0 w-full",
  gradient: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black z-0",
  overlay: "bg-gradient-to-b from-red-950/15 via-black/0 to-transparent z-0 opacity-20",
  secondaryGradient: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-red-950/5 via-transparent to-transparent z-0",
  particles: "fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none",
  grid: "absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]",
  glow: "absolute rounded-full bg-red-500/5 blur-[100px] animate-pulse-slow",
  glowSecondary: "absolute rounded-full bg-red-500/5 blur-[120px] animate-pulse-slow"
};

// Enhanced Section background styles with modern design
const sectionBackgroundStyles = {
  container: "absolute inset-0 w-full h-full pointer-events-none z-0",
  gradient: "absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent opacity-50",
  glow: "hidden" // Hiding per-section glows to significantly improve scroll performance
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Ensure we have default values as fallbacks for transform to prevent null issues
  const y = useTransform(scrollYProgress, [0, 1], [0, -50], { clamp: false })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: false })

  return (
    <main ref={containerRef} className="min-h-screen w-full max-w-[100vw] bg-black text-white relative overflow-x-hidden">
      {/* Enhanced Global Background Elements */}
      <div className={`${backgroundStyles.global} ${backgroundStyles.gradient}`} aria-hidden="true"></div>
      <div className={`${backgroundStyles.global} ${backgroundStyles.overlay}`} aria-hidden="true"></div>
      <div className={`${backgroundStyles.global} ${backgroundStyles.secondaryGradient}`} aria-hidden="true"></div>

      {/* Enhanced Animated Background Particles */}
      <div className={backgroundStyles.particles} aria-hidden="true">
        <div className={backgroundStyles.grid}></div>
        {/* Primary glow orb */}
        <div className={`${backgroundStyles.glow} top-1/4 right-1/4 w-96 h-96`} style={{ animationDelay: '0s' }}></div>
        {/* Secondary glow orb */}
        <div className={`${backgroundStyles.glowSecondary} bottom-1/4 left-1/4 w-80 h-80`} style={{ animationDelay: '1s' }}></div>
        {/* Tertiary subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] animate-pulse-very-slow"></div>
      </div>

      {/* Hero Section - First Impression */}
      <FlexibleSection
        id="hero"
        fullWidth={true}
        className="relative z-10 overflow-hidden pt-10"
        noPadding
      >
        <motion.div
          style={{ y, opacity }}
        >
          <EnhancedHero fullWidth={true} />
        </motion.div>
      </FlexibleSection>






      {/* 1. OUR SERVICES - What We Offer */}
      <FlexibleSection
        id="services"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <ServicesShowcase />
      </FlexibleSection>


      {/* 2. TRY OUT OUR PRODUCTS - Product Showcase */}
      <FlexibleSection
        id="products"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <ProductsShowcase />
      </FlexibleSection>

      {/* 3. OUR PROJECTS - Innovations - Moved here to be after Products */}
      <FlexibleSection
        id="projects"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <ProjectsShowcase />
      </FlexibleSection>

      {/* CASE STUDIES - Real Projects & Results - Moved here */}
      <FlexibleSection
        id="case-studies"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <CaseStudiesSection />
      </FlexibleSection>



      {/* 4. INDUSTRY SOLUTIONS - Vertical Focus */}
      <FlexibleSection
        id="solutions"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <EnhancedIndustrySolutions />
      </FlexibleSection>

      {/* AI Capabilities & Interactive Demos - Unified Platform Section */}
      <FlexibleSection
        id="ai-platform"
        fullWidth={true}
        className="relative z-10 py-12 md:py-16 lg:py-20 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>

        <UnifiedAIPlatform />
      </FlexibleSection>


      {/* 6. TECHNOLOGY STACK - Our Technology */}
      <FlexibleSection
        id="tech-stack"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <TechStackShowcase />
      </FlexibleSection>

      {/* 7. OUR TEAM - Experts & Leadership */}
      <FlexibleSection
        id="team"
        fullWidth={true}
        className="relative z-10 py-8 md:py-12 lg:py-16 overflow-hidden"
      >
        <TeamSection />
      </FlexibleSection>



      {/* Testimonials - Social Proof */}
      <FlexibleSection
        id="testimonials"
        fullWidth={true}
        className="relative z-10 py-6 md:py-8 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <TestimonialCarousel />
      </FlexibleSection>

      {/* INSTANT QUOTE - Lead Generation */}
      <FlexibleSection
        id="instant-quote"
        fullWidth={true}
        className="relative z-10 py-6 md:py-8 overflow-hidden"
      >
        <InstantQuoteCalculator />
      </FlexibleSection>

      {/* WHY CHOOSE US - USA-Based Advantages */}
      <FlexibleSection
        id="why-choose-us"
        fullWidth={true}
        className="relative z-10 py-6 md:py-8 overflow-hidden"
      >
        <WhyChooseUs />
      </FlexibleSection>

      {/* Start Today - Call to Action */}
      <FlexibleSection
        id="start-today"
        fullWidth={true}
        className="relative z-10 py-12 md:py-16 lg:py-20 overflow-hidden"
      >
        <div className={sectionBackgroundStyles.container} aria-hidden="true">
          <div className={sectionBackgroundStyles.gradient}></div>
        </div>
        <EnhancedCTASection />
      </FlexibleSection>

      {/* Floating Elements - User Experience */}
      <ScrollToTop />
      <UnifiedChat initialStyle="floating" allowStyleToggle={true} theme="landing" />

      {/* Existing chat widgets - comment these out if using UnifiedChat */}
      {/* <FloatingChatWidget /> */}
      {/* <AIChatbot /> */}
      <CookieConsent />
    </main>
  )
} 