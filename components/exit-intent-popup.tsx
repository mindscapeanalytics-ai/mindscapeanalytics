"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

/**
 * Exit Intent Lead Magnet
 * Captures leads when users are about to leave the site
 * Offers free AI consultation or downloadable resource
 */
export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        // Check if user has already seen the popup
        const hasSeenPopup = localStorage.getItem('exitIntentShown')
        if (hasSeenPopup) return

        let mouseY = 0
        let isExiting = false

        const handleMouseLeave = (e: MouseEvent) => {
            mouseY = e.clientY

            // Trigger when mouse moves to top of screen (exit intent)
            if (mouseY < 10 && !isExiting && !hasSeenPopup) {
                isExiting = true
                setIsVisible(true)
                localStorage.setItem('exitIntentShown', 'true')

                // Track exit intent trigger
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'exit_intent_triggered', {
                        event_category: 'Lead Generation'
                    })
                }
            }
        }

        // Also trigger after 30 seconds if user hasn't scrolled much
        const timeoutId = setTimeout(() => {
            if (!hasSeenPopup && !isExiting) {
                setIsVisible(true)
                localStorage.setItem('exitIntentShown', 'true')
            }
        }, 30000) // 30 seconds

        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave)
            clearTimeout(timeoutId)
        }
    }, [])

    // New effect for auto-dismiss after 1 minute
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 60000) // 60 seconds auto-dismiss
            return () => clearTimeout(timer)
        }
    }, [isVisible])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Track lead capture
            if (typeof window !== 'undefined') {
                if ((window as any).gtag) {
                    (window as any).gtag('event', 'generate_lead', {
                        lead_type: 'exit_intent',
                        value: 50
                    })
                }
                if ((window as any).fbq) {
                    (window as any).fbq('track', 'Lead')
                }
            }

            // Using contact form logic (/api/contact) for better lead tracking
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name || "Exit Intent Prospect",
                    email,
                    subject: "Free AI Strategy Guide Request",
                    message: "User requested the free AI strategy guide and consultation via exit intent popup.",
                    interest: "AI Implementation roadmap",
                }),
            })

            if (response.ok) {
                toast({
                    title: "Success! 🎉",
                    description: "Check your email for the free AI strategy guide!",
                })
                setIsVisible(false)
                setName("")
                setEmail("")
            } else {
                const data = await response.json();
                throw new Error(data.error?.message || 'Failed to send');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Please try again or contact us directly.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsVisible(false)}
                    />

                    {/* Popup Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-gradient-to-br from-zinc-900 to-black border border-red-500/20 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-[9999]"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
                                <Gift className="h-8 w-8 text-red-500" />
                            </div>
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Wait! Don't Miss This 🎁
                        </h2>

                        {/* Subheadline */}
                        <p className="text-center text-zinc-400 mb-6 text-sm md:text-base">
                            Get our <span className="text-red-500 font-semibold">FREE AI Strategy Guide</span> +
                            <span className="text-red-500 font-semibold"> 30-minute consultation</span> ($500 value)
                        </p>

                        {/* Benefits */}
                        <ul className="space-y-2 mb-6">
                            {[
                                "AI implementation roadmap for your business",
                                "Cost-benefit analysis template",
                                "Industry-specific use cases",
                                "Free 30-min consultation with our AI experts"
                            ].map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <div className="h-5 w-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                    </div>
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <Input
                                type="text"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 h-11 text-white placeholder:text-zinc-500"
                            />
                            <Input
                                type="email"
                                placeholder="Enter your work email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-zinc-900/80 border-white/10 focus:border-red-500/50 h-11 text-white placeholder:text-zinc-500"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold h-11 rounded-md shadow-lg shadow-red-900/20 transition-all active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Get Free Guide + Consultation
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Trust badge */}
                        <p className="text-center text-xs text-zinc-500 mt-4">
                            🔒 Your email is safe. No spam, unsubscribe anytime.
                        </p>

                        {/* Social proof */}
                        <p className="text-center text-xs text-zinc-400 mt-2">
                            <span className="text-red-500 font-semibold">2,847</span> business leaders already downloaded this guide
                        </p>
                    </motion.div>
                </div>
            )
            }
        </AnimatePresence >
    )
}

export default ExitIntentPopup
