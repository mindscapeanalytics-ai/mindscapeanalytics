"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";

const ProjectVision = dynamic(() => import("@/components/ProjectVision"), { ssr: true });
const AiEmployee = dynamic(() => import("@/components/AiEmployee"), { ssr: true });
const ProblemAgitation = dynamic(() => import("@/components/ProblemAgitation"), { ssr: true });
const BankingAiAdoption = dynamic(() => import("@/components/BankingAiAdoption"), { ssr: true });
const InfrastructureAdvantage = dynamic(() => import("@/components/InfrastructureAdvantage"), { ssr: true });
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), { ssr: true });
const BusinessImpact = dynamic(() => import("@/components/BusinessImpact"), { ssr: true });
const Products = dynamic(() => import("@/components/Products"), { ssr: true });
const Process = dynamic(() => import("@/components/Process"), { ssr: true });
const GrowthHub = dynamic(() => import("@/components/GrowthHub"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });
const AgenticHeroScanner = dynamic(() => import("@/components/AgenticHeroScanner"), { ssr: true });
const NeuralNewsroom = dynamic(() => import("@/components/NeuralNewsroom"), { ssr: true });

// 2026 Conversion Engine Components
const AIAuditLeadMagnet = dynamic(() => import("@/components/AIAuditLeadMagnet"), { ssr: true });
const LeadCaptureBar = dynamic(() => import("@/components/LeadCaptureBar"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { ssr: false });

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
            className={cn("gpu-accelerate", className)}
        >
            {children}
        </motion.div>
    );
}

export default function HomeClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate tactical system initialization
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main ref={containerRef} className="relative bg-transparent min-h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            <Navbar />

            {/* Hero section - no wrapper needed as it has its own animations */}
            <Hero />

            {/* LIVE AGENT INTERACTIVE SECTION - 2026 CONVERSION ENGINE */}
            <AgenticHeroScanner />

            {/* AI Employee Core (Now includes Voice Intelligence + NVIDIA NIM) */}
            <AiEmployee />

            {/* NEURAL NEWSROOM // AUTOBOT BLOGS */}
            <NeuralNewsroom />

            {/* Project Vision - High Impact Intro */}
            <ProjectVision />

            {/* Main content sections - Grouped to minimize IntersectionObserver overhead */}
            <div className="relative z-10">
                <ScrollSection delay={0.05}>
                    <ProblemAgitation />
                    <div className="mt-12 lg:mt-24">
                        <BankingAiAdoption />
                    </div>
                </ScrollSection>

                <ScrollSection delay={0.1}>
                    <InfrastructureAdvantage />
                    <div className="mt-12 lg:mt-24">
                        <CaseStudies />
                    </div>
                </ScrollSection>

                <ScrollSection delay={0.15}>
                    <BusinessImpact />
                    <div className="mt-12 lg:mt-24">
                        <Process />
                    </div>
                </ScrollSection>

                <ScrollSection delay={0.2}>
                    <GrowthHub />
                    <div className="mt-12 lg:mt-24">
                        <Products />
                    </div>
                </ScrollSection>

                {/* LEAD MAGNET — Free AI Audit */}
                <ScrollSection delay={0.2}>
                    <AIAuditLeadMagnet />
                </ScrollSection>

                <ScrollSection delay={0.25}>
                    <CTA />
                </ScrollSection>
            </div>

            <Footer />

            {/* AUTONOMOUS CONVERSION OVERLAYS */}
            <LeadCaptureBar />
            <ChatWidget />
        </main>
    );
}
