"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Clock,
    MessageSquare,
    CheckCircle2,
    Calendar,
    Globe,
    Linkedin,
    LinkedinIcon,
    ArrowRight,
    Search,
    ChevronDown,
    ChevronUp,
    PhoneCall,
    MessageCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
    {
        icon: Mail,
        title: "Platform Liaison",
        value: "info@mindscapeanalytics.com",
        link: "mailto:info@mindscapeanalytics.com",
        description: "Standard inquiries and general platform assistance."
    },
    {
        icon: MessageCircle,
        title: "Matrix Direct",
        value: "+1 (307) 210-6155",
        link: "https://wa.me/13072106155",
        description: "Instant connectivity via WhatsApp secure protocol."
    },
    {
        icon: LinkedinIcon,
        title: "Professional Sync",
        value: "Mindscape Analytics",
        link: "https://www.linkedin.com/company/mindscapeanalytics/",
        description: "Connect with our industrial node on LinkedIn."
    },
    {
        icon: Calendar,
        title: "Strategic Session",
        value: "Schedule Now",
        link: "#",
        description: "Book a deep-dive consultation with our architects."
    },
    {
        icon: Globe,
        title: "Digital Presence",
        value: "mindscapeanalytics.com",
        link: "https://mindscapeanalytics.com",
        description: "Primary entry point for the digital elite."
    }
];

const faqs = [
    {
        question: "What industrial sectors do you prioritize?",
        answer: "We focus on high-stakes environments: Finance, Healthcare, Retail, and Advanced Manufacturing. Our architectures are designed for sectors requiring zero-latency intelligence."
    },
    {
        question: "How do I initiate a custom AI deployment?",
        answer: "Start by scheduling a Strategic Session. We analyze your current stack and architect a custom node integration plan tailored to your operational needs."
    },
    {
        question: "Do you offer post-deployment support?",
        answer: "Yes. Every deployment includes 24/7 dedicated Technical Protocol. We offer continuous monitoring, synchronization, and optimization services."
    },
    {
        question: "Is your infrastructure legally compliant?",
        answer: "Mindscape Analytics operates under strict data privacy protocols and ensures all AI integrations meet regional and international cybersecurity standards."
    }
];

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-white/20 font-black tracking-[0.5em] animate-pulse">LOADING ARC...</div>
            </div>
        }>
            <ContactFormContent />
        </Suspense>
    );
}

function ContactFormContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan');

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: ""
    });

    useEffect(() => {
        if (plan) {
            setFormData(prev => ({ ...prev, service: plan }));
        }
    }, [plan]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to send message.');
            }

            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    service: "",
                    message: ""
                });
            }, 5000);
        } catch (err) {
            console.error('Submission error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            setIsSubmitting(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-transparent text-white relative">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-44 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

                <div className="container-standard relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.85] font-syncopate tracking-tighter"
                            style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
                        >
                            GET IN <span className="text-white/30">TOUCH.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium uppercase tracking-widest">
                            Ready to transform your business with <span className="text-white">Industrial Intelligence</span>?
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section-spacing bg-transparent">
                <div className="container-standard">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <a
                                    href={info.link}
                                    target={info.link.startsWith('http') ? '_blank' : undefined}
                                    className="block h-full transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    <div className="h-full p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300 group backdrop-blur-sm">
                                        <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                            <info.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xs font-black mb-2 uppercase tracking-[0.3em] text-white/40">{info.title}</h3>
                                        <p className="text-lg font-bold text-white mb-4 leading-tight">{info.value}</p>
                                        <p className="text-white/40 text-sm leading-relaxed">{info.description}</p>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WhatsApp QR & Connection Matrix */}
            <section className="section-spacing bg-transparent">
                <div className="container-standard">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-7xl mx-auto p-1px bg-white/5 rounded-3xl overflow-hidden backdrop-blur-md"
                    >
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 bg-white/[0.02]">
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="p-4 bg-white rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                                        <Image
                                            src="/images/whatsapp-qr.png"
                                            alt="WhatsApp Connection Protocol"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 space-y-6">
                                <h3
                                    className="text-4xl md:text-6xl font-black font-syncopate uppercase tracking-tighter leading-none"
                                    style={{ fontSize: "clamp(2rem, 8vw, 4rem)" }}
                                >
                                    SCAN TO <span className="text-white/30">SYNC.</span>
                                </h3>
                                <p className="text-xl text-white/50 font-medium leading-relaxed">
                                    Instantly bridge the gap with our technical architects via secure WhatsApp protocol. High-priority inquiries receive real-time sync capabilities.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Button size="lg" className="bg-white text-black hover:bg-white/90 font-black tracking-widest px-8" asChild>
                                        <a href="https://wa.me/13072106155" target="_blank">OPEN PROTOCOL</a>
                                    </Button>
                                    <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">SYSTEM STATUS: READY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section-spacing bg-transparent border-t border-white/5">
                <div className="container-standard">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black mb-6 font-syncopate uppercase tracking-tighter leading-none">
                                    SEND <span className="text-white/30">SIGNAL.</span>
                                </h2>
                                <p className="text-xl text-white/50 font-medium leading-relaxed max-w-lg">
                                    Initialize connection with our global hub. Our architects respond within one standard operational cycle.
                                </p>
                            </div>

                            {/* FAQ Section Integrated into Sidebar */}
                            <div className="space-y-8 pt-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">FREQUENTLY ASKED PROTOCOLS</h3>
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
                                            <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:text-white text-white/60 hover:no-underline py-4">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-white/40 text-sm leading-relaxed pb-6">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-white/[0.03] backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden">
                                <CardContent className="p-8 md:p-12">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-20"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
                                                <CheckCircle2 className="h-10 w-10 text-white animate-pulse" />
                                            </div>
                                            <h3 className="text-3xl font-black uppercase font-syncopate tracking-tighter mb-4">SIGNAL RECEIVED</h3>
                                            <p className="text-white/40 font-medium tracking-wide">
                                                Transmission successful. Awaiting architect verification.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            {/* Form fields with improved styling */}
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                        01 // FULL_NAME
                                                    </label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/10 rounded-xl"
                                                        placeholder="ENTITY NAME"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                        02 // EMAIL_PROTOCOL
                                                    </label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/10 rounded-xl"
                                                        placeholder="SENDER@ACCESS.NODE"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <label htmlFor="company" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                        03 // ORGANIZATION
                                                    </label>
                                                    <Input
                                                        id="company"
                                                        name="company"
                                                        type="text"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/10 rounded-xl"
                                                        placeholder="CORPORATE IDENTITY"
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <label htmlFor="phone" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                        04 // COMMS_UID
                                                    </label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/10 rounded-xl"
                                                        placeholder="+[NODE] XXXXX"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label htmlFor="service" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                    05 // INTEREST_AREA
                                                </label>
                                                <select
                                                    id="service"
                                                    name="service"
                                                    value={formData.service}
                                                    onChange={handleChange}
                                                    className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-white/30 focus:outline-none transition-all appearance-none uppercase font-bold tracking-widest"
                                                >
                                                    <option value="" className="bg-zinc-900">SELECT PROTOCOL</option>
                                                    <option value="strategic-architecture" className="bg-zinc-900">Strategic Architecture Plan</option>
                                                    <option value="enterprise-intelligence" className="bg-zinc-900">Enterprise Intelligence Plan</option>
                                                    <option value="infinite-ecosystem" className="bg-zinc-900">Infinite Ecosystem Plan</option>
                                                    <option value="other" className="bg-zinc-900">Other Inquiries</option>
                                                </select>
                                            </div>

                                            <div className="space-y-4">
                                                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                    06 // SIGNAL_PAYLOAD
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white focus:border-white/30 focus:outline-none transition-all resize-none placeholder:text-white/10"
                                                    placeholder="DESCRIBE ARCHITECTURAL REQUIREMENTS..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-16 rounded-xl bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    "SYNCING..."
                                                ) : (
                                                    <>
                                                        EXECUTE TRANSMISSION
                                                        <Send className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

