"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const ProjectVision = dynamic(() => import("@/components/ProjectVision"), { ssr: true });
const ProblemAgitation = dynamic(() => import("@/components/ProblemAgitation"), { ssr: true });
const Solutions = dynamic(() => import("@/components/Solutions"), { ssr: true });
const InfrastructureAdvantage = dynamic(() => import("@/components/InfrastructureAdvantage"), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), { ssr: true });
const BusinessImpact = dynamic(() => import("@/components/BusinessImpact"), { ssr: true });
const Products = dynamic(() => import("@/components/Products"), { ssr: true });
const Process = dynamic(() => import("@/components/Process"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });

import { cn } from "@/lib/utils";

// Dynamic imports for below-the-fold sections to optimize initial TTI

// Scroll-based section wrapper with modern reveal animations
function ScrollSection({
    children,
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={cn("will-change-transform transform-gpu", className)}
        >
            {children}
        </motion.div>
    );
}

export default function HomeClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative bg-transparent min-h-screen overflow-hidden">
            <Navbar />

            {/* Hero section - no wrapper needed as it has its own animations */}
            <Hero />

            {/* Project Vision - High Impact Intro Animation */}
            <ProjectVision />

            {/* Main content sections with staggered reveal */}
            <div className="relative z-10">
                <ScrollSection delay={0.05}>
                    <ProblemAgitation />
                </ScrollSection>

                <ScrollSection delay={0.05}>
                    <Solutions />
                </ScrollSection>

                <ScrollSection delay={0.1}>
                    <InfrastructureAdvantage />
                </ScrollSection>

                <ScrollSection delay={0.1}>
                    <CaseStudies />
                </ScrollSection>

                <ScrollSection delay={0.15}>
                    <BusinessImpact />
                </ScrollSection>

                <ScrollSection delay={0.15}>
                    <Process />
                </ScrollSection>

                <ScrollSection delay={0.2}>
                    <Products />
                </ScrollSection>

                <ScrollSection delay={0.25}>
                    <CTA />
                </ScrollSection>
            </div>

            <Footer />
        </main>
    );
}
