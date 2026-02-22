"use client";

import { becomeSeller } from "@/app/_actions/become-seller";
import { ArrowRight, Lock, Check } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface FormState {
    error: string | null;
    success: boolean;
    url?: string | null; // Make url optional as it's not always present
}

const initialState: FormState = {
    error: null,
    success: false,
    url: null,
};

export default function BecomeSellerForm() {
    const [state, formAction, isActionPending] = useActionState<FormState, FormData>(becomeSeller, initialState);
    const router = useRouter();
    const sessionResult = authClient.useSession();
    const session = sessionResult.data;
    const isSessionPending = sessionResult.isPending;

    useEffect(() => {
        if (state.success) {
            if ((state as any).url) {
                window.location.href = (state as any).url;
            } else {
                router.push("/admin");
            }
        }
    }, [state.success, state, router]);

    if (isSessionPending) {
        return (
            <div className="text-center py-12">
                <div className="inline-block px-4 py-2 border border-white/10 rounded-full mb-4">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block mr-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Synchronizing Session...</span>
                </div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="text-center py-12">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-6">Unauthorized Session Detected</p>
                <button
                    onClick={() => router.push("/sign-in?callbackUrl=/become-seller")}
                    className="px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                    Establish Link to Continue
                </button>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-10">
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                    {state.error}
                </div>
            )}

            <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Store Nomenclature *</label>
                <input
                    type="text"
                    name="storeName"
                    required
                    placeholder="ALPHANUMERIC_ID"
                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all backdrop-blur-xl uppercase font-bold tracking-widest text-sm"
                />
            </div>

            <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 ml-1">Asset Suite Description *</label>
                <textarea
                    name="storeDescription"
                    required
                    rows={5}
                    placeholder="Identify the core primitives, architectures, and value propositions of your intended listings..."
                    className="w-full px-6 py-6 bg-white/[0.03] border border-white/5 rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all backdrop-blur-xl italic text-sm leading-relaxed"
                />
            </div>

            <div className="pt-8 border-t border-white/5">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mb-8 italic text-center">
                    Note: Settlement protocols and network configurations can be localized within the dashboard after initial terminal enrollment.
                </p>
                <button
                    type="submit"
                    disabled={isActionPending}
                    className="w-full py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/90 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 group flex items-center justify-center gap-4 disabled:opacity-50"
                >
                    {isActionPending ? "SYNCHRONIZING..." : (
                        <>
                            INITIALIZE VENDOR TERMINAL
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20">
                <Lock size={12} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted Handshake</span>
            </div>
        </form>
    );
}
