"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Linkedin,
    Mail,
    Terminal,
    Cpu,
    Database,
    Globe,
    Code2,
    ShieldCheck,
    ArrowUpRight,
    Briefcase,
    GraduationCap,
    Sparkles,
    ChevronDown
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const projects = [
    {
        title: "Mindscape Analytics Platform",
        category: "Enterprise AI & Ecosystem",
        image: "/images/projects/mindscapeanalytics-01_opt.webp",
        description: "A scalable, multi-tenant AI-driven inventory management system serving 50+ businesses. Features AI pipelines for demand forecasting, stock optimization, and anomaly detection to reduce waste and manual operations.",
        tags: ["Next.js 15", "Agentic AI", "Multi-Tenancy", "Founder Project"]
    },
    {
        title: "CyberTraderX",
        category: "FinTech / AI",
        image: "/images/projects/CYBERTRADERX_opt.webp",
        description: "Autonomous crypto & stock trading bots using ML and statistical models. Implemented backtesting, risk controls, and strategy optimization pipelines for high-frequency trading.",
        tags: ["Algorithmic Trading", "Python", "Real-time Data"]
    },
    {
        title: "Cattle Farm Management",
        category: "AgriTech / Automation",
        image: "/images/projects/cattle_farm_opt.webp",
        description: "AI-driven livestock management system for large-scale operations, optimizing animal health tracking and operational efficiency through automated workflows.",
        tags: ["AgriTech", "Process Automation", "Enterprise"]
    },
    {
        title: "AgriChain",
        category: "Supply Chain / Blockchain",
        image: "/images/projects/AgriChian_opt.webp",
        description: "Transparent supply chain management system for agricultural products using distributed ledger technology.",
        tags: ["Blockchain", "Data Engineering", "Supply Chain"]
    },
    {
        title: "DBLynx Intelligence",
        category: "AI Data Intelligence",
        image: "/images/projects/dblynx-database-intelligence-mindscapeanalytics_opt.webp",
        description: "Production-grade Agentic AI platform enabling autonomous data analysis and Natural Language Querying (NLQ) over structured databases using RAG.",
        tags: ["Agentic AI", "RAG", "Vector DB", "LLMs"]
    },
    {
        title: "Global Formations",
        category: "Corporate SaaS",
        image: "/images/projects/global_formations_opt.webp",
        description: "Enterprise portal for global business entity management and legal compliance automation.",
        tags: ["Next.js", "Stripe", "Compliance AI"]
    },
    {
        title: "Enterprise ERP v4",
        category: "Industrial Systems",
        image: "/images/projects/enterprise-erp_opt.webp",
        description: "Mission-critical Resource Planning system with integrated AI for predictive maintenance and logistics.",
        tags: ["Big Data", "Real-time Monitoring", "SQL"]
    },
    {
        title: "Fuel Station ERP",
        category: "Retail Intelligence",
        image: "/images/projects/fuel-station-erp_opt.webp",
        description: "Distributed management system for high-volume fueling operations with real-time telemetry.",
        tags: ["Telemetry", "IoT", "Asset Management"]
    },
    {
        title: "Amazon Inventory Pro",
        category: "E-Commerce Data",
        image: "/images/projects/amazon_invontry_management_system_opt.webp",
        description: "High-performance inventory forecasting and management system for tier-1 Amazon sellers.",
        tags: ["Python", "Forecasting", "Big Data"]
    },
    {
        title: "Vehicle Analysis Hub",
        category: "Computer Vision",
        image: "/images/projects/vehicle_analysis_dashboard_opt.webp",
        description: "Real-time vehicle identification and movement analysis using deep neural networks.",
        tags: ["PyTorch", "OpenCV", "Deep Learning"]
    },
    {
        title: "BreachData Analytics",
        category: "Cybersecurity",
        image: "/images/projects/breachdata_opt.webp",
        description: "Data-driven platform aggregating and analyzing large-scale breach-related datasets. Enables intelligent search and insights for security awareness and research.",
        tags: ["Security", "Data Science", "Kafka"]
    },
    {
        title: "Supermarket POS Native",
        category: "Retail Operations",
        image: "/images/projects/supermarket-pos_opt.webp",
        description: "High-throughput native point-of-sale system with automated reordering logic.",
        tags: ["Low Latency", "Database Design", "Inventory"]
    },
    {
        title: "Restaurant POS Core",
        category: "Hospitality IT",
        image: "/images/projects/restraint-pos_opt.webp",
        description: "Specialized POS system for high-volume dining environments with kitchen display integration.",
        tags: ["SaaS", "Real-time Sync", "UX/UI"]
    },
    {
        title: "Cryptocurrency Autonomous Trader",
        category: "FinTech / AI",
        image: "/images/projects/cryptotrader2_opt.webp",
        description: "Self-operating trading protocols using sentiment analysis and technical indicators.",
        tags: ["FinTech", "Autoproduction", "Python"]
    },
    {
        title: "JFBZ Token Ecosystem",
        category: "Web3 Engineering",
        image: "/images/projects/jfbz_token_opt.webp",
        description: "Architecture and smart contract deployment for utility-based digital token ecosystems.",
        tags: ["Solidity", "Ecosystem Design", "Tokenomics"]
    },
    {
        title: "Annotation Tool",
        category: "AI Data Preparation",
        image: "/images/projects/image_annotation_tool_opt.webp",
        description: "Proprietary image labeling and dataset preparation tool for high-precision model training.",
        tags: ["MLOps", "Computer Vision", "Internal Tool"]
    }
];

const experience = [
    {
        role: "AI Engineer | Team Lead (GenAI & Agentic Systems)",
        company: "Mindscape Analytics LLC (USA | Remote)",
        period: "Jan 2025 - Present",
        description: "Designing and deploying LLM-powered AI assistants using RAG. Building agentic AI systems capable of task planning, decision-making, tool execution, and memory handling. Integrated vector databases and LLM APIs into production-grade systems, significantly reducing manual operational efforts."
    },
    {
        role: "Big Data Administrator",
        company: "Freelance (Remote, Canada)",
        period: "Jul 2023 - Dec 2024",
        description: "Optimized Cloudera HDFS ecosystems, improved reliability and performance for large-scale workloads. Deployed and administered HDFS, Impala, Hive, YARN, and StreamSets. Led enterprise-grade security hardening using SSL/TLS, Apache Knox, Ranger, and LDAP integration."
    },
    {
        role: "Financial Data Analyst",
        company: "UBL Head Office - Speridian Technologies LLC",
        period: "Mar 2022 - Oct 2023",
        description: "Awarded Employee of the Month (Sep 2022) for automation excellence. Automated enterprise financial reporting using Python, SQL, and Oracle Analytics, reducing reporting time from 5 hours to 15 minutes. Designed executive BI dashboards and analytical models."
    },
    {
        role: "AI Engineer Intern",
        company: "Optimizia",
        period: "Jun 2021 - Sep 2021",
        description: "Developed computer vision models using deep neural networks. Performed dataset preparation, labeling, and augmentation. Worked in agile teams delivering ML prototypes and experiments."
    }
];

export default function FounderPortfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Parallax effects
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    return (
        <main ref={containerRef} className="bg-transparent text-white min-h-screen relative">
            <Navbar />

            {/* --- INDUSTRIAL HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ opacity: opacityHero, scale: scaleHero }}
                    className="container mx-auto px-6 z-10 flex flex-col items-center text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-48 h-48 md:w-64 md:h-64 mb-12"
                    >
                        <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-[-10px] rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white grayscale contrast-125 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                            <Image
                                src="/images/team/founder.webp"
                                alt="Zeeshan Keerio"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <span className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.8em] mb-4 block">Founding_Architect // ARCH_ZEESHAN</span>
                        <h1 className="text-6xl md:text-9xl font-black font-syncopate leading-none tracking-tighter uppercase mb-2">
                            ZEESHAN <br /> <span className="text-white/20 italic">KEERIO.</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/60 font-medium tracking-tight leading-relaxed uppercase italic">
                            AI-focused technology leader & AI Engineer specialized in GenAI, Agentic AI, and RAG Pipelines. <br />
                            <span className="text-white font-black not-italic drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Architecting Production-Grade Autonomous Intelligence.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                        <span className="text-[9px] font-mono font-black tracking-[0.5em] text-white/20 uppercase">Initialize_Scroll</span>
                        <ChevronDown className="animate-bounce text-white/20" size={20} />
                    </motion.div>
                </motion.div>
            </section>

            {/* --- MISSION DIRECTIVE --- */}
            <section className="py-32 border-y border-white/5 relative bg-white/5 backdrop-blur-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
                        <div className="space-y-12">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                                    <Terminal size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 font-mono">01_Mission_Directive</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-syncopate leading-[0.9]">
                                REPLACING MANUAL <br /> <span className="text-white/20 italic">WORK WITH CODE.</span>
                            </h2>
                            <p className="text-xl text-white/40 leading-relaxed font-medium italic">
                                "Technology is only as valuable as the manual effort it eliminates. As the sole architect of the Mindscape Analytics platform, my focus is on engineering high-fidelity, autonomous ecosystems that allow founders and enterprises to operate at post-quantum speeds with zero technical friction."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Cpu, label: "GenAI Architect", val: "200+ Nodes" },
                                { icon: Database, label: "Data Engineering", val: "Petabyte Scale" },
                                { icon: Globe, label: "Cloud Systems", val: "Global Ops" },
                                { icon: ShieldCheck, label: "Cybersecurity", val: "Hardened" }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 flex flex-col items-center text-center gap-4 group hover:bg-white hover:text-black transition-all duration-500">
                                    <stat.icon size={24} className="text-white group-hover:text-black transition-colors" />
                                    <div className="space-y-1">
                                        <div className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                                        <div className="text-xl font-black font-syncopate">{stat.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROJECT LEDGER (The 14 Projects) --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-8xl font-black font-syncopate uppercase tracking-[-0.05em] mb-4">PROJECT LEDGER.</h2>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.8em] font-black">All Assets Designed & Developed by Zeeshan Keerio</span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-8xl mx-auto">
                        {projects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                className="group relative"
                            >
                                <div className="p-1 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden transition-all duration-700 hover:border-white/30 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                                    <div className="aspect-video relative rounded-[2rem] overflow-hidden mb-6 border border-white/5">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover grayscale saturate-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-8 pb-10">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 block">{project.category}</span>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:italic transition-all">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-white/40 font-medium leading-relaxed mb-8 h-20 line-clamp-3 overflow-hidden">
                                            {project.description}
                                        </p>
                                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                            <span className="text-[8px] font-mono font-black text-white/20 uppercase tracking-[0.2em]">Designed & Developed by Founder</span>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                                                <ArrowUpRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CHRONICLE (EXPERIENCE) --- */}
            <section className="py-32 border-t border-white/5 bg-black/40">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-24 items-start max-w-7xl mx-auto">
                        <div className="sticky top-32 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/40">
                                    <Briefcase size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 font-mono">02_Chronicle</span>
                            </div>
                            <h2 className="text-5xl font-black uppercase font-syncopate leading-[0.8] tracking-tight">PROFESSIONAL <br /> <span className="text-white/20 italic">EVOLUTION.</span></h2>
                            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs uppercase italic">
                                A high-fidelity journey through the core layers of financial data and AI engineering.
                            </p>
                            <div className="pt-8 flex gap-4">
                                <Link href="https://linkedin.com/in/zeeshan-keerio" target="_blank">
                                    <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all">
                                        <Linkedin size={20} />
                                    </button>
                                </Link>
                                <Link href="mailto:zeeshan.keerio@mindscapeanalytics.com">
                                    <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                                        Request Deck
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {experience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] font-mono">{exp.company}</div>
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white/50">
                                            {exp.period}
                                        </div>
                                    </div>
                                    <p className="text-white/40 font-medium leading-relaxed uppercase italic tracking-tight">
                                        {exp.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EDUCATION & CERTIFICATIONS --- */}
            <section className="py-32 relative overflow-hidden bg-white text-black">
                <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')] bg-[length:50px_50px]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-24">
                            {/* Academic Hub */}
                            <div className="space-y-16">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <GraduationCap size={24} className="opacity-40" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Academic_Foundation</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black font-syncopate leading-tight uppercase">THE IQRA <span className="opacity-20">ALMA MATER.</span></h2>
                                    <div className="space-y-2">
                                        <div className="text-2xl font-black uppercase">BS | Computer Science</div>
                                        <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">Iqra University • Karachi • 2016-2021</div>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed opacity-60 uppercase italic">
                                        Specialization in Artificial Intelligence, Data Engineering, and Machine Learning. Final Year Project: Student Distraction Detection using Computer Vision & Deep Learning (Project Lead & Backend Developer).
                                    </p>
                                </div>

                                <div className="p-12 bg-black/[0.03] border border-black/5 rounded-[2.5rem] space-y-8">
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em]">Core Technical Stack</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            "Python", "SQL", "LLMs", "RAG", "Agentic AI", "TensorFlow", "Hadoop", "Cloudera", "Spark", "Kafka", "Hive", "Impala", "StreamSets", "Azure AI", "Snowflake", "Power BI", "SSL/TLS", "Apache Knox", "Next.js"
                                        ].map(tech => (
                                            <span key={tech} className="px-5 py-2 rounded-full border border-black/10 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Certification Vault */}
                            <div className="space-y-12">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={24} className="opacity-40" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Validation_Vault</span>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "Career Essentials in GEN AI (Microsoft/LinkedIn)",
                                        "Data Science Professional (Coursera)",
                                        "Machine Learning (AWS)",
                                        "Neural Networks & Deep Learning",
                                        "Advanced Deep Learning with Keras (DataCamp)",
                                        "Statistics for Machine Learning",
                                        "Scrum Foundation Professional",
                                        "Six Sigma White Belt",
                                        "Ethics in the Age of Generative AI"
                                    ].map((cert, i) => (
                                        <div key={i} className="group flex items-center justify-between p-6 border-b border-black/5 hover:bg-black/5 transition-all">
                                            <span className="text-[10px] font-black uppercase tracking-tight">{cert}</span>
                                            <Code2 size={12} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 bg-transparent">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white text-black p-12 md:p-24 rounded-[3.5rem] relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 z-0 opacity-5 bg-[url('/grid.svg')] bg-[length:50px_50px]" />
                        <div className="relative z-10 space-y-12">
                            <h2 className="text-5xl md:text-8xl font-black font-syncopate leading-[0.8] uppercase tracking-[-0.05em]">
                                READY TO <br /> <span className="opacity-20 italic">AUTOMATE?</span>
                            </h2>
                            <p className="text-lg font-medium max-w-2xl mx-auto opacity-60 uppercase italic tracking-tight">
                                Harness the power of AI-first engineering. Let's build your industrial-grade intelligence ecosystem together.
                            </p>
                            <Link href="https://wa.me/13072106155" target="_blank">
                                <button className="px-12 py-6 bg-black text-white font-black text-xs tracking-[0.3em] uppercase rounded-2xl hover:bg-black/90 transition-all flex items-center gap-4 mx-auto">
                                    Initiate Direct Uplink (WhatsApp)
                                    <ArrowUpRight size={16} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
