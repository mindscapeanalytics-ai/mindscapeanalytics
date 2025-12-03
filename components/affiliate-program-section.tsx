"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Star,
  Rocket,
  Link2
} from "lucide-react"

const commissionTiers = [
  {
    icon: Users,
    title: "Lead Generated",
    amount: "$50",
    description: "Per qualified lead",
    color: "from-orange-500 to-orange-600",
    amountColor: "from-orange-400 to-orange-500",
    iconBg: "bg-orange-500/20"
  },
  {
    icon: Target,
    title: "Meeting Booked",
    amount: "$100",
    description: "Per consultation",
    color: "from-purple-500 to-purple-600",
    amountColor: "from-purple-400 to-purple-500",
    iconBg: "bg-purple-500/20"
  },
  {
    icon: Sparkles,
    title: "Deal Closed",
    amount: "$200+",
    description: "+ 10% project value",
    color: "from-red-600 to-red-500",
    amountColor: "from-red-400 to-red-500",
    iconBg: "bg-red-600/20",
    featured: true
  }
]

const benefits = [
  "100% performance-based - zero upfront cost",
  "30-day cookie tracking window",
  "Real-time dashboard & analytics",
  "Weekly automated payouts",
  "Professional marketing materials",
  "Dedicated support team"
]

const steps = [
  { number: "1", title: "Sign Up Free", desc: "Create account in 60 seconds" },
  { number: "2", title: "Share Link", desc: "Promote your unique URL" },
  { number: "3", title: "Earn Money", desc: "Get paid for referrals" }
]

export default function AffiliateProgramSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      alert("Thanks! We'll send you affiliate details shortly.")
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-8 md:py-10 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-[120px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-8"
          >
            <Badge className="mb-3 bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1.5" />
              AFFILIATE PROGRAM
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Earn Money by Referring Clients
              </span>
            </h2>
            <p className="text-white/60 text-sm max-w-2xl mx-auto">
              Join our affiliate program and earn commissions for every successful referral
            </p>
          </motion.div>

          {/* Commission Tiers - Compact Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
            {commissionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="h-full"
              >
                <Card className={`bg-black/50 backdrop-blur-xl border ${tier.featured ? 'border-red-500/50 ring-1 ring-red-500/20 shadow-lg shadow-red-500/10' : 'border-white/10'} hover:border-red-500/40 transition-all duration-300 relative overflow-hidden group h-full`}>
                  {tier.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg shadow-md z-10">
                      ⭐ BEST VALUE
                    </div>
                  )}

                  <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <CardContent className="p-4 relative z-10 text-center flex flex-col items-center justify-center h-full min-h-[130px]">
                    {/* Icon */}
                    <motion.div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mx-auto mb-2 shadow-md`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <tier.icon className="h-5 w-5 text-white" />
                    </motion.div>

                    {/* Amount */}
                    <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${tier.amountColor || tier.color} bg-clip-text text-transparent mb-1`}>
                      {tier.amount}
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-bold mb-0.5 uppercase tracking-wider text-white/90">
                      {tier.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] text-white/60">
                      {tier.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Compact Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Left Column - How It Works & Benefits Combined */}
            <div className="space-y-4">
              {/* How It Works */}
              <Card className="bg-black/50 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300">
                <CardContent className="p-4">
                  <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-red-400" />
                    <span className="text-white">How It Works</span>
                  </h3>
                  <div className="space-y-2.5">
                    {steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2.5"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-red-400">{step.number}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                          <p className="text-xs text-white/60">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-black/50 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300">
                <CardContent className="p-4">
                  <h4 className="text-base font-bold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white">What You Get</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Signup CTA */}
            <div className="flex flex-col justify-center">
              <Card className="bg-gradient-to-br from-red-600/15 to-purple-600/15 border border-red-500/40 backdrop-blur-xl h-full hover:border-red-500/60 transition-all duration-300 shadow-xl shadow-red-500/10">
                <CardContent className="p-5 flex flex-col justify-center h-full">
                  <div className="text-center mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1 text-white">Start Earning Today</h3>
                    <p className="text-sm text-white/70">
                      Join hundreds of affiliates earning passive income
                    </p>
                  </div>

                  {/* Stats - Compact */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <motion.div
                      className="text-center bg-black/50 rounded-lg p-2 border border-white/5 hover:border-red-500/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">500+</div>
                      <div className="text-[10px] text-white/60 font-medium">Affiliates</div>
                    </motion.div>
                    <motion.div
                      className="text-center bg-black/50 rounded-lg p-2 border border-white/5 hover:border-red-500/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">$50K+</div>
                      <div className="text-[10px] text-white/60 font-medium">Paid Out</div>
                    </motion.div>
                    <motion.div
                      className="text-center bg-black/50 rounded-lg p-2 border border-white/5 hover:border-red-500/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-lg font-black bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">4.9★</div>
                      <div className="text-[10px] text-white/60 font-medium">Rating</div>
                    </motion.div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2.5 mt-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-black/50 border-white/20 focus:border-red-500/50 h-10 text-sm transition-all duration-300"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white h-10 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-[1.02] font-semibold"
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Zap className="mr-2 h-4 w-4 animate-pulse" />
                          Joining...
                        </>
                      ) : (
                        <>
                          <Link2 className="mr-2 h-4 w-4" />
                          Join Free - Start Earning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-[10px] text-center text-white/50">
                      No credit card required • Instant approval
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
