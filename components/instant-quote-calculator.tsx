"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
    Calculator,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Clock,
    DollarSign,
    Zap,
    TrendingUp
} from "lucide-react"

const services = [
    { id: "chatbot", name: "AI Chatbot", basePrice: 5000, icon: "🤖" },
    { id: "webapp", name: "Web App", basePrice: 8000, icon: "💻" },
    { id: "mobileapp", name: "Mobile App", basePrice: 12000, icon: "📱" },
    { id: "uiux", name: "UI/UX Design", basePrice: 3000, icon: "🎨" },
    { id: "automation", name: "Automation", basePrice: 4000, icon: "⚡" },
    { id: "api", name: "API Integration", basePrice: 2500, icon: "🔌" }
]

const complexityMultipliers = {
    simple: { label: "Simple", multiplier: 1, desc: "Basic features" },
    moderate: { label: "Standard", multiplier: 1.5, desc: "Most popular" },
    complex: { label: "Advanced", multiplier: 2.5, desc: "Enterprise" }
}

export default function InstantQuoteCalculator() {
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("moderate")
    const [timeline, setTimeline] = useState([8])
    const [showQuote, setShowQuote] = useState(false)
    const [email, setEmail] = useState("")

    const toggleService = (serviceId: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        )
        setShowQuote(false)
    }

    const calculateQuote = () => {
        const baseTotal = services
            .filter(s => selectedServices.includes(s.id))
            .reduce((sum, s) => sum + s.basePrice, 0)

        const multiplier = complexityMultipliers[complexity].multiplier
        const timelineMultiplier = timeline[0] < 4 ? 1.3 : timeline[0] < 8 ? 1.1 : 1

        return Math.round(baseTotal * multiplier * timelineMultiplier)
    }

    const handleGetQuote = () => {
        if (selectedServices.length > 0) {
            setShowQuote(true)
        }
    }

    const handleEmailQuote = () => {
        if (email) {
            alert(`Quote details will be sent to ${email}`)
            // TODO: Implement actual email sending
        }
    }

    const estimatedQuote = calculateQuote()
    const estimatedTime = Math.ceil(timeline[0] * selectedServices.length * complexityMultipliers[complexity].multiplier / 2)

    return (
        <section className="py-2 relative overflow-hidden bg-black/0">
            {/* Background elements - Adjusted for transparency */}
            <div className="absolute inset-0 bg-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

            <div className="container mx-auto px-0 md:px-2 relative z-10">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-3">
                        <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-400 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
                            <Calculator className="h-3 w-3 mr-1.5" />
                            INSTANT QUOTE
                        </Badge>
                    </div>
                    <h2 className="text-3xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                        Get Your <span className="text-red-500">Instant Estimate</span>
                    </h2>
                    <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
                        Calculate your project cost in seconds. Transparent pricing, no surprises!
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Card className="bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                        <CardContent className="p-5 md:p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left Column - Inputs */}
                                <div className="space-y-5">
                                    {/* Service Selection */}
                                    <div>
                                        <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-white">
                                            <Sparkles className="h-4 w-4 text-red-400" />
                                            Select Services
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2.5">
                                            {services.map((service) => (
                                                <motion.div
                                                    key={service.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div
                                                        onClick={() => toggleService(service.id)}
                                                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${selectedServices.includes(service.id)
                                                            ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/10'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-xl">{service.icon}</span>
                                                            <Checkbox
                                                                checked={selectedServices.includes(service.id)}
                                                                className="pointer-events-none h-4 w-4"
                                                            />
                                                        </div>
                                                        <div className="text-xs font-semibold mb-0.5">{service.name}</div>
                                                        <div className="text-[10px] text-white/60">From ${service.basePrice.toLocaleString()}</div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Complexity */}
                                    <div>
                                        <h3 className="text-base font-semibold mb-2.5 text-white">Complexity Level</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Object.entries(complexityMultipliers).map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    onClick={() => {
                                                        setComplexity(key as keyof typeof complexityMultipliers)
                                                        setShowQuote(false)
                                                    }}
                                                    className={`p-2.5 rounded-lg border cursor-pointer transition-all text-center ${complexity === key
                                                        ? 'border-red-500 bg-red-500/10 shadow-md shadow-red-500/10'
                                                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="font-semibold text-xs mb-0.5">{value.label}</div>
                                                    <div className="text-[10px] text-white/60">{value.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div>
                                        <h3 className="text-base font-semibold mb-2.5 text-white">
                                            Timeline: <span className="text-red-400">{timeline[0]} weeks</span>
                                        </h3>
                                        <Slider
                                            value={timeline}
                                            onValueChange={(value) => {
                                                setTimeline(value)
                                                setShowQuote(false)
                                            }}
                                            min={2}
                                            max={24}
                                            step={1}
                                            className="mb-1.5"
                                        />
                                        <div className="flex justify-between text-[10px] text-white/60">
                                            <span>Rush (2w)</span>
                                            <span>Standard (8-12w)</span>
                                            <span>Flexible (24w)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Quote Display */}
                                <div className="flex flex-col justify-center">
                                    {!showQuote ? (
                                        <div className="text-center py-6">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/10">
                                                <Calculator className="h-8 w-8 text-red-400" />
                                            </div>
                                            <p className="text-white/60 text-sm mb-5">
                                                Select services and click calculate to see your instant estimate
                                            </p>
                                            <Button
                                                onClick={handleGetQuote}
                                                disabled={selectedServices.length === 0}
                                                className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/20"
                                                size="default"
                                            >
                                                <Calculator className="mr-2 h-4 w-4" />
                                                Calculate Instant Quote
                                            </Button>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {/* Price Display */}
                                            <Card className="bg-gradient-to-br from-red-600/20 to-red-600/10 border border-red-500/30 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5"></div>
                                                <CardContent className="p-5 text-center relative z-10">
                                                    <div className="text-xs text-white/70 mb-2 uppercase tracking-wide">Estimated Project Cost</div>
                                                    <div className="text-3xl md:text-4xl font-bold text-red-400 mb-3">
                                                        ${estimatedQuote.toLocaleString()}
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <div className="flex items-center justify-center gap-1.5 bg-black/40 rounded-lg p-2 border border-white/10">
                                                            <Clock className="h-3.5 w-3.5 text-red-400" />
                                                            <span>{estimatedTime} weeks</span>
                                                        </div>
                                                        <div className="flex items-center justify-center gap-1.5 bg-black/40 rounded-lg p-2 border border-white/10">
                                                            <Zap className="h-3.5 w-3.5 text-amber-400" />
                                                            <span>Fast delivery</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Selected Services */}
                                            <div className="space-y-1.5">
                                                <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide">Included Services:</h4>
                                                <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin">
                                                    {selectedServices.map(serviceId => {
                                                        const service = services.find(s => s.id === serviceId)
                                                        return (
                                                            <div key={serviceId} className="flex items-center gap-2 text-xs bg-white/5 rounded-lg p-2 border border-white/10">
                                                                <CheckCircle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                                                                <span className="truncate">{service?.icon} {service?.name}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Email Capture */}
                                            <div className="space-y-2 pt-2 border-t border-white/10">
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="bg-black/40 border-white/10 text-sm h-9"
                                                    />
                                                    <Button
                                                        onClick={handleEmailQuote}
                                                        disabled={!email}
                                                        size="sm"
                                                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 whitespace-nowrap"
                                                    >
                                                        Email Quote
                                                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                                <p className="text-[10px] text-center text-white/50">
                                                    Get detailed quote & free consultation
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Stats - Compact */}
                            {showQuote && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 pt-4 border-t border-white/10"
                                >
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-red-400 mb-1">
                                                <TrendingUp className="h-3.5 w-3.5" />
                                                <span className="text-xs font-semibold">Transparent</span>
                                            </div>
                                            <p className="text-[10px] text-white/60">No hidden fees</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-red-400 mb-1">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                <span className="text-xs font-semibold">Flexible</span>
                                            </div>
                                            <p className="text-[10px] text-white/60">Payment plans</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-red-400 mb-1">
                                                <Sparkles className="h-3.5 w-3.5" />
                                                <span className="text-xs font-semibold">Guaranteed</span>
                                            </div>
                                            <p className="text-[10px] text-white/60">30-day refund</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
