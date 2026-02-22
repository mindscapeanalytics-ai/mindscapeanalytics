
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SignUpContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "";
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedName = name.trim();

        if (!trimmedEmail || !trimmedName) {
            setError("All primary identifiers (Email, Full Name) must be finalized.");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password complexity insufficient. Minimum 8 characters required.");
            setLoading(false);
            return;
        }

        let finalUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

        // Auto-generate username from name if blank
        if (!finalUsername && trimmedName) {
            finalUsername = trimmedName.toLowerCase()
                .replace(/[^a-z0-9]/g, '_')
                .replace(/_+/g, '_')
                + '_' + Math.random().toString(36).substring(2, 7);
        }

        if (finalUsername && finalUsername.length < 3) {
            setError("Nomenclature error: Username must be at least 3 characters.");
            setLoading(false);
            return;
        }

        try {
            console.log("[AUTH_SIGNUP_ATTEMPT]", { email: trimmedEmail, name: trimmedName, username: finalUsername });

            const { data, error: authError } = await authClient.signUp.email({
                email: trimmedEmail,
                password,
                name: trimmedName,
                username: finalUsername || undefined,
            });

            if (authError) {
                console.error("[AUTH_SIGNUP_DIAGNOSTIC]", {
                    message: authError.message,
                    status: (authError as any).status,
                    code: (authError as any).code
                });

                // Hardened Error Mapping
                const status = (authError as any).status;
                const code = (authError as any).code;

                if (status === 422 || code === "USER_ALREADY_EXISTS") {
                    setError("Identity collision: This email or name is already registered in the MSA network.");
                } else if (status === 400) {
                    setError(`Protocol Error: ${authError.message || "Invalid registration parameters."}`);
                } else if (status === 500) {
                    setError("Server Error: Identity registry is currently undergoing maintenance. Please try again soon.");
                } else {
                    setError(authError.message || "Registration failed. Please check your data.");
                }
            } else {
                console.log("[AUTH_SIGNUP_SUCCESS]");
                if (callbackUrl) {
                    window.location.href = callbackUrl;
                } else {
                    window.location.href = "/shop";
                }
            }
        } catch (err: any) {
            console.error("[AUTH_SIGNUP_CRITICAL_CATCH]", err);
            if (err instanceof TypeError && err.message.includes("fetch")) {
                setError("Protocol Disconnected: The identity registry server failed to finalize the handshake. Please check your connection or try a different browser.");
            } else {
                setError(`System Error: ${err.message || "An unexpected error occurred during registration."}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Global CinematicBackground handles depth, removed local blurs */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block group">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Image
                                src="/images/logo/mindscape-analytics.png"
                                alt="Mindscape Analytics"
                                width={240}
                                height={56}
                                className="h-14 w-auto brightness-0 invert opacity-100 transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h1
                            className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40"
                        >
                            ENTITY<span className="text-white/20"> // </span>REGISTRY
                        </h1>
                    </Link>
                    <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mt-4">
                        Initialize Access Profile
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-wider text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">Identity (Full Name)</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">Nomenclature (Username - Optional)</label>
                                <div className="relative">
                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center font-mono text-[10px] text-white/20">@</div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-transparent/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                        placeholder="unique_id"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">Terminal ID (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                        placeholder="user@mindscape.com"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">Establish Cipher (Password)</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    Finalize Registration
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center space-y-4">
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                            Authorized Personnel?
                        </p>
                        <Link
                            href="/sign-in"
                            className="inline-block text-white font-black uppercase tracking-widest text-[10px] hover:text-white/60 transition-colors underline underline-offset-8 decoration-white/20"
                        >
                            Access Console Sign-In
                        </Link>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-white/20">
                    <Shield size={12} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Data Protocol Initialized</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignUpPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] animate-pulse">Initializing Identity Registry...</div>
            </div>
        }>
            <SignUpContent />
        </Suspense>
    );
}
