
"use client";

import React, { useActionState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createSellerProduct } from "@/app/_actions/create-seller-product";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const initialState = {
    error: null as string | null,
};

export default function NewSellerProductPage() {
    const [state, formAction, isPending] = useActionState(createSellerProduct, initialState);

    return (
        <div className="min-h-screen bg-monochrome-cinematic text-white relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Initialize Return Sequence</span>
                    </Link>

                    <div className="mb-16">
                        <h1
                            className="text-5xl font-black mb-4 uppercase tracking-tighter italic"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                        >
                            NEW ASSET <span className="text-white/20 not-italic">INITIALIZATION.</span>
                        </h1>
                        <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] italic">Authorized Listing Generation Terminal</p>
                    </div>

                    <form action={formAction} className="space-y-12">
                        {state?.error && (
                            <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                                {state.error}
                            </div>
                        )}

                        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-12 md:p-16 space-y-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 flex gap-1 opacity-10">
                                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                <div className="w-px h-8 bg-white/20" />
                            </div>
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Asset Nomenclature *</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="ASSET_IDENTIFIER_v1.0"
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-bold tracking-widest text-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Functional Description *</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={5}
                                    placeholder="Detail the core primitives and value propositions..."
                                    className="w-full px-6 py-6 bg-white/[0.03] border border-white/5 rounded-3xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all italic text-sm leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Valuation (USD) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        min="1"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-mono text-sm"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Classification Cluster *</label>
                                    <select
                                        name="category"
                                        required
                                        className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all font-black text-[10px] uppercase tracking-widest appearance-none"
                                    >
                                        <option value="" className="bg-zinc-900">SELECT_CATEGORY</option>
                                        <option value="ui_ux" className="bg-zinc-900">UI / UX BUNDLES</option>
                                        <option value="saas" className="bg-zinc-900">SAAS ARCHITECTURES</option>
                                        <option value="automations" className="bg-zinc-900">SYSTEM AUTOMATIONS</option>
                                        <option value="apps" className="bg-zinc-900">APP DEPLOYMENTS</option>
                                        <option value="management_systems" className="bg-zinc-900">ENTERPRISE CORE</option>
                                        <option value="excel_powerbi_dashboards" className="bg-zinc-900">DATA VISUALIZATION</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Asset Visualization (URL)</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    placeholder="HTTPS://CDN.MINDSCAPE.COM/ASSET.JPG"
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all text-xs"
                                />
                            </div>

                            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex items-start gap-6">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                    <Save size={20} className="text-white/40" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 mb-2">Verification Protocol</h3>
                                    <p className="text-[9px] text-white/40 uppercase tracking-tighter italic leading-relaxed">
                                        All assets undergo deep analysis. Synchronization typically concludes within 24-48 cycles. Notifications deployed via encrypted mail.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-8">
                            <Link href="/seller" className="flex-1 order-2 sm:order-1">
                                <button type="button" className="w-full py-5 border border-white/5 text-white/20 hover:text-white hover:bg-white/5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all">
                                    Abort Assignment
                                </button>
                            </Link>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="flex-1 order-1 sm:order-2 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/90 disabled:opacity-50 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 group"
                            >
                                {isPending ? "SYNCHRONIZING..." : (
                                    <>
                                        COMMIT TO REGISTRY
                                        <Save size={14} className="group-hover:translate-y-[-1px] transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
