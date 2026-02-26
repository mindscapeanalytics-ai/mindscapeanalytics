"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Brain, Cpu, Database, Cloud, Code, Shield, Network, Zap, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TechIcon = ({ name, iconSlug, fallbackIcon: FallbackIcon }: { name: string; iconSlug?: string; fallbackIcon?: any }) => {
    const [imgError, setImgError] = useState(false);
    const iconUrl = iconSlug ? `https://cdn.simpleicons.org/${iconSlug}/white` : null;

    if (!iconUrl || imgError) {
        return (
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                {FallbackIcon ? (
                    <FallbackIcon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                ) : (
                    <span className="font-bold text-xs text-white/40 uppercase">
                        {name.slice(0, 2)}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="w-10 h-10 flex items-center justify-center p-1.5 overflow-hidden">
            <img
                src={iconUrl}
                alt={name}
                className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-300"
                onError={() => setImgError(true)}
                loading="lazy"
            />
        </div>
    );
};

type TechItem = {
    name: string;
    category: string;
    iconSlug?: string;
    fallbackIcon: any;
};

const techStackData: TechItem[] = [
    { name: "OpenAI", category: "ai", iconSlug: "openai", fallbackIcon: Brain },
    { name: "Anthropic", category: "ai", iconSlug: "anthropic", fallbackIcon: Brain },
    { name: "LangChain", category: "ai", iconSlug: undefined, fallbackIcon: Network },
    { name: "TensorFlow", category: "ai", iconSlug: "tensorflow", fallbackIcon: Cpu },
    { name: "PyTorch", category: "ai", iconSlug: "pytorch", fallbackIcon: Cpu },
    { name: "Hugging Face", category: "ai", iconSlug: "huggingface", fallbackIcon: Brain },

    { name: "PostgreSQL", category: "data", iconSlug: "postgresql", fallbackIcon: Database },
    { name: "Supabase", category: "data", iconSlug: "supabase", fallbackIcon: Database },
    { name: "Redis", category: "data", iconSlug: "redis", fallbackIcon: Zap },
    { name: "MongoDB", category: "data", iconSlug: "mongodb", fallbackIcon: Database },
    { name: "Kafka", category: "data", iconSlug: "apachekafka", fallbackIcon: Network },
    { name: "Pinecone", category: "data", iconSlug: undefined, fallbackIcon: Database },

    { name: "AWS", category: "cloud", iconSlug: "amazonaws", fallbackIcon: Cloud },
    { name: "Google Cloud", category: "cloud", iconSlug: "googlecloud", fallbackIcon: Cloud },
    { name: "Azure", category: "cloud", iconSlug: "microsoftazure", fallbackIcon: Cloud },
    { name: "Vercel", category: "cloud", iconSlug: "vercel", fallbackIcon: Globe },
    { name: "Docker", category: "cloud", iconSlug: "docker", fallbackIcon: Shield },
    { name: "Kubernetes", category: "cloud", iconSlug: "kubernetes", fallbackIcon: Shield },

    { name: "Next.js", category: "dev", iconSlug: "nextdotjs", fallbackIcon: Code },
    { name: "React", category: "dev", iconSlug: "react", fallbackIcon: Code },
    { name: "TypeScript", category: "dev", iconSlug: "typescript", fallbackIcon: Code },
    { name: "Python", category: "dev", iconSlug: "python", fallbackIcon: Code },
    { name: "Node.js", category: "dev", iconSlug: "nodedotjs", fallbackIcon: Code },
    { name: "Tailwind CSS", category: "dev", iconSlug: "tailwindcss", fallbackIcon: Code }
];

const categories = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI & ML" },
    { id: "data", label: "Data" },
    { id: "cloud", label: "Cloud" },
    { id: "dev", label: "Dev" }
];

export default function TechStackShowcase() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const filteredTech = techStackData.filter(tech => {
        const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
        const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (!hasMounted) return null;

    return (
        <section className="w-full py-24 bg-transparent border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16 pb-12 border-b border-white/5">
                    <div className="text-left space-y-4">
                        <Badge variant="outline" className="bg-white/5 text-white/40 border-white/10 px-4 py-1.5 text-[9px] tracking-[0.4em] uppercase font-black">
                            Technical_Infrastructure
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tightest uppercase italic">
                            ELITE <span className="text-white/20 not-italic">TEK STACK.</span>
                        </h2>
                        <p className="text-[11px] font-black text-white/30 uppercase tracking-widest leading-relaxed max-w-xl">
                            We bridge the gap between abstract intelligence and industrial-grade execution using leading technologies.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id
                                            ? 'bg-white text-black shadow-lg'
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-48 group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white transition-colors" />
                            <Input
                                placeholder="FIND_NODE..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white/5 border-white/10 w-full focus:ring-0 focus:border-white/30 h-11 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredTech.map((item) => (
                            <motion.div
                                layout
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="aspect-square bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all duration-300 flex flex-col items-center justify-center gap-3 group cursor-default"
                            >
                                <TechIcon name={item.name} iconSlug={item.iconSlug} fallbackIcon={item.fallbackIcon} />
                                <span className="text-[9px] font-black uppercase text-white/20 group-hover:text-white tracking-[0.2em] transition-all text-center px-2">
                                    {item.name}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredTech.length === 0 && (
                    <div className="text-center py-20 text-white/20 flex flex-col items-center gap-3">
                        <Database size={24} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">No matching nodes identified.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
