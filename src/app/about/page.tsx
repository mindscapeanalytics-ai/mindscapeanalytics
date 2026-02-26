"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Linkedin,
    Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAuditLeadMagnet from "@/components/AIAuditLeadMagnet";

const team = [
    {
        name: "Zeeshan Keerio",
        role: "Founder & CEO",
        bio: "AI-focused technology leader and AI Engineer specialized in GenAI and Agentic AI. Sole designer and developer of the Mindscape Analytics (MSA) platform, architecting its core autonomous intelligence and multi-tenant infrastructure.",
        image: "/images/team/founder.webp",
        linkedin: "https://linkedin.com/in/zeeshan-keerio",
        email: "mailto:zeeshan.keerio@mindscapeanalytics.com",
        href: "/founder/zeeshan-keerio"
    },
    {
        name: "Muhammad Atif",
        role: "Full Stack Developer",
        bio: "Versatile developer specializing in creating scalable, user-friendly applications with modern technologies and robust architectures.",
        image: "/images/team/muhammad-atif-new.webp",
        linkedin: "#",
        email: "mailto:atif@mindscapeanalytics.com"
    },
    {
        name: "Saleem Raza",
        role: "Finance Consultant",
        bio: "Expert in accounting modules and system integration, ensuring accurate data migration and seamless transition for enterprise clients.",
        image: "/images/team/saleem-raza.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Ghulam Akbar",
        role: "Business Dev Manager",
        bio: "Strategic leader focused on driving growth through market expansion, high-value partnerships, and global outreach.",
        image: "/images/team/Akbar_keerio.webp",
        linkedin: "#",
        email: "mailto:akbar@mindscapeanalytics.com"
    },
    {
        name: "Syed Athar",
        role: "Brand & Media Specialist",
        bio: "Creative expert dedicated to building compelling brand identities and high-impact digital media strategies.",
        image: "/images/team/syed-ather.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Farhan Murad",
        role: "Cybersecurity Analyst",
        bio: "Security specialist focused on proactive threat detection and ensuring the integrity of digital infrastructure.",
        image: "/images/team/farhankeerio.webp",
        linkedin: "#",
        email: "#"
    }
];

const timeline = [
    {
        year: "2018",
        title: "FOUNDATION",
        description: "Mindscape Analytics establishes its core AI architecture, laying the groundwork for industrial-grade systems."
    },
    {
        year: "2020",
        title: "AGENTIC PIVOT",
        description: "Shifted focus to autonomous agent ecosystems and secure big data pipelines for enterprise-scale operations."
    },
    {
        year: "2022",
        title: "GLOBAL SCALABILITY",
        description: "Launched the global node network and our signature managed infrastructure model for high-growth businesses."
    },
    {
        year: "2024",
        title: "VOICE INNOVATION",
        description: "Integration of next-gen AI voice agents (Vapi/Retell), revolutionizing appointment booking and support."
    },
    {
        year: "2026",
        title: "THE STANDARD",
        description: "Positioned as the global AI-first technology partner, helping elite businesses transition to autonomous systems."
    }
];

const expertise = [
    { title: "AI Agents & Automation Systems", id: "01" },
    { title: "AI Voice Call Agents (Vapi/Retell)", id: "02" },
    { title: "AI Chatbots (Sales & Support)", id: "03" },
    { title: "Big Data & Cloud Engineering", id: "04" },
    { title: "Full Stack Web Applications", id: "05" },
    { title: "Lead Generation AI Systems", id: "06" },
    { title: "Custom Database & Infrastructure", id: "07" }
];

const differences = [
    "AI automation workflows",
    "Optimized cloud infrastructure",
    "Enterprise database architecture",
    "Performance monitoring",
    "Ongoing technical support"
];

const trustFactors = [
    { title: "Enterprise-grade database architecture", detail: "Optimized for scale and precision." },
    { title: "Cloud-native scalable deployments", detail: "Built on AWS/GCP/Azure standards." },
    { title: "Security-first development", detail: "Proactive threat detection integrated." },
    { title: "Monthly maintenance & monitoring", detail: "Zero downtime operations." },
    { title: "Performance-optimized systems", detail: "Sub-10ms latency protocols." },
    { title: "Transparent Pricing", detail: "Clear ROI-driven cost structures." }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent text-white relative">
            <Navbar />

            {/* --- Industrial Hero Section --- */}
            <section className="relative pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                        >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                            <span className="text-white/60 text-[9px] font-mono font-black tracking-[0.5em] uppercase leading-none mt-0.5">Corporate_Profile // v4.2</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-[10rem] lg:text-[13rem] font-black leading-[0.75] font-syncopate tracking-[-0.05em] uppercase"
                            style={{ fontSize: "clamp(3.5rem, 15vw, 15rem)" }}
                        >
                            ABOUT <br /> <span className="text-white/20 italic font-black">MINDSCAPE.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-4xl border-t border-white/10 pt-10 md:pt-12 w-full mx-auto px-4"
                        >
                            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/60 font-medium tracking-tight leading-snug uppercase text-center max-w-3xl mx-auto italic">
                                WE HELP BUSINESSES SCALE USING <span className="text-white font-black not-italic drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">INTELLIGENT SYSTEMS</span> - NOT MANUAL EFFORT.
                            </p>
                            <div className="flex items-center justify-center gap-6 mt-10 md:mt-12 opacity-20">
                                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-white" />
                                <span className="text-[8px] font-mono font-black tracking-[0.5em] uppercase whitespace-nowrap">Scale_Protocol_Active</span>
                                <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-white" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Next-Gen Company Overview --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-start max-w-7xl mx-auto border-y border-white/5 py-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                                <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.5em] font-black">Origins // ARCH_ZEESHAN</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-syncopate leading-[0.9]">
                                NEXT-GENERATION <br /> <span className="text-white/20 italic">AI & DATA ENGINEERING.</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-lg text-white/60 leading-relaxed font-medium max-w-xl">
                                    Mindscape Analytics is a next-generation AI and Data Engineering company specializing in intelligent automation, AI agents, full-stack systems, and scalable cloud infrastructure.
                                </p>
                                <p className="text-lg text-white/60 leading-relaxed font-medium max-w-xl">
                                    Founded by Zeeshan Keerio, Technology Leader & AI Engineer, Mindscape Analytics was built with one mission:
                                </p>
                                <p className="text-lg text-white font-black leading-relaxed max-w-xl italic border-l-2 border-white/20 pl-6 py-2">
                                    To help businesses scale using intelligent systems, not manual effort.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-6 right-8 opacity-10 font-mono text-[10px] uppercase font-black tracking-widest">DIAG_v88</div>
                            <h3 className="text-xl font-black uppercase text-white mb-8 tracking-tight font-syncopate">What Makes Us Different?</h3>
                            <div className="space-y-4">
                                {differences.map((diff, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-1.5 h-1.5 rounded-full border border-white/40 group-hover:bg-white group-hover:scale-125 transition-all" />
                                        <span className="text-[11px] font-mono font-black text-white/30 uppercase tracking-[0.1em] group-hover:text-white transition-colors">{diff}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/5">
                                <p className="text-[10px] font-mono font-black text-white/20 uppercase tracking-[0.2em] italic">
                                    We focus on long-term partnership — not one-time delivery.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Core Expertise Grid --- */}
            <section className="py-24 bg-transparent">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2
                            className="text-5xl md:text-[7rem] font-black mb-4 font-syncopate uppercase tracking-[-0.05em]"
                            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
                        >
                            EXPERTISE.
                        </h2>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] font-black">SYSTEM_CAPABILITIES // READOUT</span>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        {expertise.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-10 bg-black/40 backdrop-blur-md hover:bg-white/[0.04] transition-all relative min-h-[220px] flex flex-col justify-center gap-6"
                            >
                                <div className="absolute top-4 left-6 text-[8px] font-mono text-white/10 group-hover:text-white/40 tracking-[0.4em] font-black uppercase">NODE_0{exp.id}</div>
                                <h3 className="text-lg font-black text-white/60 group-hover:text-white transition-colors uppercase tracking-tight font-syncopate leading-tight">{exp.title}</h3>
                                <div className="w-8 h-px bg-white/5 group-hover:w-24 transition-all" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Vision Section --- */}
            <section className="py-24 relative overflow-hidden bg-white text-black">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10" />
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <span className="text-[9px] font-mono font-black tracking-[0.6em] uppercase opacity-40">The_Long_Term_Directive</span>
                        <h2 className="text-5xl md:text-8xl font-black font-syncopate leading-[0.85] uppercase tracking-[-0.05em]">
                            OUR <span className="opacity-20 italic">VISION.</span>
                        </h2>
                        <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-relaxed max-w-3xl mx-auto">
                            To become a global AI-first technology partner helping businesses transition from manual operations to <span className="underline underline-offset-8 decoration-4">autonomous AI-driven systems.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Architects (Team) --- */}
            <section className="py-32 bg-transparent">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-32"
                    >
                        <h2 className="text-6xl md:text-9xl font-black mb-4 font-syncopate uppercase tracking-[-0.05em]">ARCHITECTS.</h2>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] font-black italic">The core logic unit</span>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-700 group relative overflow-hidden backdrop-blur-md">
                                    <Link href={(member as any).href || "#"} className={cn("block", !(member as any).href && "cursor-default")}>
                                        <div className="aspect-[4/5] relative rounded-xl overflow-hidden mb-8 border border-white/5 shadow-2xl">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        </div>
                                    </Link>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <Link href={(member as any).href || "#"} className={cn(!(member as any).href && "cursor-default")}>
                                                    <h3 className="text-xl font-black uppercase font-syncopate tracking-tighter text-white/80 group-hover:text-white transition-colors">{member.name}</h3>
                                                </Link>
                                                <p className="text-[10px] font-black text-white/20 group-hover:text-white/40 uppercase tracking-[0.3em] mt-2 transition-colors">{member.role}</p>
                                            </div>
                                            <div className="flex gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                                {member.linkedin && (
                                                    <a href={member.linkedin} target="_blank" className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
                                                        <Linkedin className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {member.email && (
                                                    <a href={member.email} className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white transition-colors">
                                                        <Mail className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-white/40 text-[11px] font-medium leading-relaxed group-hover:text-white/60 transition-colors uppercase italic tracking-tight">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Journey (Timeline) --- */}
            <section className="py-32 bg-transparent border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-32"
                    >
                        <h2 className="text-5xl md:text-9xl font-black mb-4 font-syncopate uppercase tracking-[-0.05em]">JOURNEY.</h2>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] font-black italic">The evolution of intelligence</span>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-20 relative">
                        {/* Center Line */}
                        <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[1px] bg-white opacity-10" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="absolute left-[16px] md:left-1/2 -ml-[4px] w-2 h-2 rounded-full bg-white z-20" />
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                    <div className={`space-y-4 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <span className="text-4xl font-black text-white/20 font-syncopate leading-none">{item.year}</span>
                                        <h4 className="text-xl font-black uppercase tracking-tight text-white">{item.title}</h4>
                                        <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm ml-0 mr-auto md:ml-auto md:mr-0">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Trust & Business Model --- */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 max-w-7xl mx-auto">
                        {/* Why Trust Us */}
                        <div className="space-y-12 bg-white/[0.03] p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-xl">
                            <h2 className="text-4xl font-black uppercase font-syncopate tracking-tighter">WHY TRUST US?</h2>
                            <div className="space-y-6">
                                {trustFactors.map((factor, i) => (
                                    <div key={i} className="group flex flex-col gap-1 border-b border-white/5 pb-6 last:border-0">
                                        <span className="text-[10px] font-mono font-black text-white/20 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{factor.title}</span>
                                        <p className="text-[11px] text-white/10 group-hover:text-white/40 transition-colors uppercase tracking-widest">{factor.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Managed Infographic */}
                        <div className="p-12 lg:p-24 rounded-[3.5rem] bg-white text-black flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute inset-0 z-0 opacity-5 bg-[url('/grid.svg')] bg-[length:50px_50px]" />
                            <div className="relative z-10 space-y-12">
                                <span className="text-[9px] font-mono font-black tracking-[0.5em] uppercase opacity-40 italic">Managed_Subscription_Logic</span>
                                <h2 className="text-5xl md:text-7xl font-black font-syncopate leading-[0.85] uppercase tracking-[-0.05em]">
                                    WE DON'T JUST DELIVER. <br /> <span className="opacity-30 italic">WE OPTIMIZE.</span>
                                </h2>
                                <p className="text-lg font-medium max-w-xl opacity-60">
                                    Our clients subscribe to long-term reliability. We manage hosting, databases, AI maintenance, and security so you can focus on growth.
                                </p>
                                <div className="grid grid-cols-2 gap-8 text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                                    <div className="space-y-2 opacity-40 hover:opacity-100 transition-opacity">✔ NO TECHNICAL HEADACHES</div>
                                    <div className="space-y-2 opacity-40 hover:opacity-100 transition-opacity">✔ NO DOWNTIME RISKS</div>
                                    <div className="space-y-2 opacity-40 hover:opacity-100 transition-opacity">✔ NO UNMANAGED BILLS</div>
                                    <div className="space-y-2 opacity-40 hover:opacity-100 transition-opacity">✔ NO SYSTEM FAILURES</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Refined */}
            <section className="py-24 bg-transparent border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                        {[
                            { value: "500+", label: "CORE ARCHITECTURES", sub: "DEPLOYED" },
                            { value: "98%", label: "OPERATIONAL", sub: "EFFICIENCY" },
                            { value: "100+", label: "GLOBAL NODE", sub: "NETWORK" },
                            { value: "24/7", label: "REAL-TIME", sub: "SYNC" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="text-5xl md:text-7xl font-black mb-4 text-white font-syncopate leading-none tracking-tighter group-hover:scale-110 transition-transform">
                                    {stat.value}
                                </div>
                                <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                                    {stat.label}
                                    <span className="block mt-1 text-white/10 group-hover:text-white/20">{stat.sub}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AIAuditLeadMagnet />

            <Footer />
        </div>
    );
}
