"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    LayoutGrid,
    ArrowRight,
    Zap,
    ShieldCheck,
    Clock,
    Box,
    Cpu,
    Database,
    Globe,
    Filter,
    Eye,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductDetailsModal } from "@/components/shop/ProductDetailsModal";

const PRIMARY_CATEGORIES = [
    { id: "all", name: "All Products", slug: "" },
    { id: "ai_agents", name: "AI Agents", slug: "ai_agents" },
    { id: "web_projects", name: "Web Projects", slug: "web_projects" },
    { id: "saas", name: "SaaS Templates", slug: "saas" },
    { id: "workflows", name: "Workflows", slug: "workflows" },
];


function ShopContent({ initialProducts }: { initialProducts: any[] }) {
    const searchParams = useSearchParams();
    const navRouter = useRouter();
    const categoryQuery = searchParams.get("category") || "";
    const urlSearchQuery = searchParams.get("search") || "";

    // Add local state for instantaneous typing feedback
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedProduct, setSelectedProduct] = useState<unknown>(null);

    // Debounce the actual URL update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== urlSearchQuery) {
                const params = new URLSearchParams(window.location.search);
                if (searchQuery) {
                    params.set("search", searchQuery);
                } else {
                    params.delete("search");
                }
                navRouter.push(`/shop?${params.toString()}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, urlSearchQuery, navRouter]);

    // Keep local state in sync if URL changes externally
    useEffect(() => {
        setSearchQuery(urlSearchQuery);
    }, [urlSearchQuery]);

    const products = useMemo(() => {
        let list = [...(initialProducts as any[])];

        if (categoryQuery && categoryQuery !== "all") {
            list = list.filter(p => p.category === categoryQuery);
        }

        if (searchQuery) {
            list = list.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        return list;
    }, [initialProducts, categoryQuery, searchQuery]);

    const activeCategoryId = categoryQuery || "all";

    return (
        <div className="min-h-screen bg-transparent text-white relative">
            <Navbar />

            <main className="relative z-10 pt-2 pb-32 px-6 max-w-[1500px] mx-auto">
                {/* Background Effects specifically for Hero */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[600px] bg-[url('/grid.svg')] bg-[length:50px_50px] opacity-[0.03] [mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)] pointer-events-none" />

                {/* Professional Store Hero - Centered and Cinematic */}
                <header className="py-24 mb-16 relative overflow-hidden text-center rounded-[3rem] border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/60">Marketplace Operational</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-7xl md:text-9xl font-black tracking-tightest leading-[0.85] mb-10 uppercase italic"
                            style={{ fontSize: "clamp(3.5rem, 15vw, 15rem)" }}
                        >
                            ELITE <br className="md:hidden" /><span className="text-white/20 not-italic">ASSETS.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-t border-white/5 pt-10"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Total Assets</span>
                                <span className="text-4xl font-black tracking-tighter text-white/90">
                                    {initialProducts.length.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-px h-12 bg-white/5 hidden md:block" />
                            <p className="max-w-xs text-[11px] text-white/40 font-black uppercase tracking-widest leading-relaxed italic text-center md:text-left">
                                Premium digital assets, projects, and ideas built by elite creators.
                            </p>
                            <div className="w-px h-12 bg-white/5 hidden md:block" />
                            <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Elite Creators</span>
                                <span className="text-4xl font-black tracking-tighter text-white/90">
                                    {new Set((initialProducts as any[]).map(p => p.sellerId).filter(Boolean)).size || "—"}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* Unified Control Hub (Sticky) */}
                <div className="sticky top-24 z-[100] mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 flex flex-col lg:flex-row gap-3 items-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-visible"
                    >
                        {/* Integrated Search */}
                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors" size={20} />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Enter system query: templates, auth, components..."
                                className="w-full pl-16 pr-4 py-5 bg-white/[0.02] border-none rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] transition-all font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-all bg-white/5 rounded-full"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Category Fast Switcher - Horizontal Scroll on Mobile */}
                        <div className="flex items-center gap-2 p-1 bg-transparent/40 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
                            {PRIMARY_CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={cat.slug ? `/shop?category=${cat.slug}${searchQuery ? `&search=${searchQuery}` : ""}` : `/shop${searchQuery ? `?search=${searchQuery}` : ""}`}
                                    className={`px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${activeCategoryId === (cat.id === "all" ? "all" : cat.slug)
                                        ? "bg-white text-black"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}

                        </div>

                    </motion.div>
                </div>

                {/* Content Area - Single Column for Results */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                                <span className="text-white bg-white/10 px-4 py-1.5 rounded-lg border border-white/10">{products.length}</span>
                                ASSETS DETECTED
                            </div>
                            <div className="w-px h-4 bg-white/10 hidden md:block" />
                            <div className="hidden md:flex items-center gap-8">
                                {[
                                    { icon: <Zap size={14} />, label: "INSTANT DEPLOY" },
                                    { icon: <ShieldCheck size={14} />, label: "AUDITED" },
                                    { icon: <Clock size={14} />, label: "LIFETIME UPDATES" }
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20">
                                        {badge.icon} {badge.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white/20 tracking-widest uppercase">Filter Status: Active</span>
                            <Filter size={14} className="text-white/10" />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-48 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/5">
                            <Search size={64} strokeWidth={0.5} className="text-white/5 mx-auto mb-10" />
                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 italic text-white/40">Zero Matches</h3>
                            <p className="text-white/10 text-[11px] mb-12 uppercase tracking-[0.4em] font-medium leading-relaxed">No architectural assets aligned <br /> with the current system query.</p>
                            <Link href="/shop" className="inline-block bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] px-16 py-6 rounded-2xl hover:bg-white/90 shadow-2xl transition-all active:scale-95">
                                Reset Terminal
                            </Link>
                        </div>
                    ) : (
                        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-10`}>
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <ProductCard
                                        product={product}
                                        onQuickView={(p) => setSelectedProduct(p)}
                                        priority={index < 6}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <ProductDetailsModal
                        product={selectedProduct}
                        isOpen={!!selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />

                    {/* Monetize Genius CTA - Unified Full Width Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 p-16 md:p-24 bg-white/5 backdrop-blur-md border border-white/5 rounded-[4rem] relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 rotate-12">
                            <Cpu size={300} strokeWidth={0.2} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                            <div className="max-w-2xl text-center md:text-left">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 block">Ecosystem Expansion</span>
                                <h2
                                    className="text-6xl md:text-8xl font-black tracking-tightest leading-[0.85] mb-8 uppercase italic"
                                    style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                                >
                                    MONETIZE <br />
                                    <span className="text-white/20 not-italic">GENIUS.</span>
                                </h2>
                                <p className="text-lg text-white/40 font-medium italic uppercase tracking-tighter leading-relaxed">
                                    Join our elite architect network. Transform high-tier <br className="hidden md:block" /> architectural code into persistent institutional capital.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 w-full md:w-auto">
                                <Link href="/become-seller">
                                    <button className="w-full md:w-80 py-7 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-white/90 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all group/btn flex items-center justify-center gap-4">
                                        Initialize Protocol
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </Link>
                                <p className="text-[9px] text-white/20 font-black uppercase tracking-widest text-center">85% Revenue Retention Guaranteed</p>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ShopClient({ initialProducts }: { initialProducts: any[] }) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] animate-pulse">Initializing Terminal...</div>
            </div>
        }>
            <ShopContent initialProducts={initialProducts} />
        </Suspense>
    );
}
