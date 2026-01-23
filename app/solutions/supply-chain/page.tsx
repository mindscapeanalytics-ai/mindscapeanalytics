"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Truck,
    Package,
    Factory,
    BarChart,
    Shield,
    Zap,
    Globe,
    Clock,
    ArrowRight,
    TrendingUp,
    MapPin,
    AlertTriangle,
    RefreshCcw,
    Layers,
    Search,
    CheckCircle2,
    ChevronRight,
    Plus,
    Play,
    Settings,
    Database,
    Users,
    Cpu,
    Boxes,
    Activity,
    BarChart3,
    Network,
    Lock,
    MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { StandardBackground } from "@/components/shared/background";

// Mock Data
const supplyChainMetrics = [
    { label: "Delivery Lead Time", value: "3.2 Days", change: -24, trend: "down", icon: Clock },
    { label: "Inventory Accuracy", value: "99.8%", change: 12, trend: "up", icon: Package },
    { label: "Operating Costs", value: "$4.1M", change: -18, trend: "down", icon: BarChart3 },
    { label: "Order Fulfillment", value: "98.5%", change: 8, trend: "up", icon: CheckCircle2 }
];

const solutions = [
    {
        title: "Predictive Demand Forecasting",
        description: "AI models that analyze historical data, market trends, and external factors anyway to predict future demand with 95%+ accuracy.",
        icon: TrendingUp,
        color: "blue"
    },
    {
        title: "Inventory Optimization",
        description: "Dynamic stock leveling that reduces carrying costs by up to 30% while eliminating stockouts through real-time monitoring.",
        icon: Boxes,
        color: "purple"
    },
    {
        title: "Logistics & Route Planning",
        description: "Intelligent routing that considers traffic, weather, and fuel efficiency to reduce delivery times by 20% and carbon footprint.",
        icon: Truck,
        color: "emerald"
    },
    {
        title: "Supply Chain Risk Management",
        description: "Real-time threat detection and mitigation strategies for disruptive events, from port strikes to natural disasters.",
        icon: Shield,
        color: "amber"
    }
];

const workflowSteps = [
    {
        title: "Data Integration",
        description: "Connect all your existing ERP, WMS, and TMS systems using our secure API gateway.",
        icon: Network
    },
    {
        title: "Digital Twin Creation",
        description: "We create a high-fidelity digital replica of your entire supply chain for real-time simulation.",
        icon: Layers
    },
    {
        title: "AI Model Deployment",
        description: "Custom-trained models begin analyzing patterns and identifying optimization opportunities.",
        icon: Cpu
    },
    {
        title: "Automated Execution",
        description: "Recommendations are pushed to your systems or human operators for immediate action.",
        icon: Zap
    }
];

export default function SupplyChainSolutionPage() {
    const [activeTab, setActiveTab] = useState("visibility");
    const [simRunning, setSimRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    const startSimulation = () => {
        setSimRunning(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSimRunning(false);
                    toast.success("Simulation complete: Optimization plan generated.");
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <StandardBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="outline" className="mb-4 border-blue-500/50 text-blue-400 px-4 py-1">
                                <Network className="w-3.5 h-3.5 mr-2" />
                                ENTERPRISE SUPPLY CHAIN OS
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                        >
                            Intelligent Supply Chain <br />
                            <span className="text-blue-500">Autonomous Execution</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto"
                        >
                            Transform your supply chain into a competitive advantage with Mindscape's AI-native Platform.
                            Real-time visibility, predictive response, and autonomous optimization.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                                Request Demo
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-700 hover:bg-gray-800">
                                View Solutions
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
                </div>
            </section>

            {/* Metrics Dashboard Grid */}
            <section className="py-12 bg-black/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {supplyChainMetrics.map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm group hover:border-blue-500/30 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                                                <metric.icon className="w-5 h-5" />
                                            </div>
                                            <Badge variant="outline" className={metric.trend === 'up' ? 'text-green-400 border-green-400/20' : 'text-blue-400 border-blue-400/20'}>
                                                {metric.change > 0 ? '+' : ''}{metric.change}%
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                                        <div className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{metric.value}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Feature Tabs */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">End-to-End Capability</h2>
                        <p className="text-gray-400">Our platform bridges the gap between digital strategy and physical execution.</p>
                    </div>

                    <Tabs defaultValue="visibility" className="w-full" onValueChange={setActiveTab}>
                        <div className="flex justify-center mb-12">
                            <TabsList className="bg-gray-900/50 p-1 border border-gray-800 rounded-full">
                                <TabsTrigger value="visibility" className="rounded-full px-6 transition-all data-[state=active]:bg-blue-600">Visibility</TabsTrigger>
                                <TabsTrigger value="prediction" className="rounded-full px-6 transition-all data-[state=active]:bg-blue-600">Prediction</TabsTrigger>
                                <TabsTrigger value="optimization" className="rounded-full px-6 transition-all data-[state=active]:bg-blue-600">Optimization</TabsTrigger>
                                <TabsTrigger value="execution" className="rounded-full px-6 transition-all data-[state=active]:bg-blue-600">Execution</TabsTrigger>
                            </TabsList>
                        </div>

                        <AnimatePresence mode="wait">
                            <TabsContent value="visibility" key="visibility" className="mt-0 outline-none">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="text-4xl font-bold mb-6">Real-Time Control Tower</h3>
                                        <p className="text-gray-400 mb-8 text-lg">
                                            Eliminate blind spots with a unified view of your entire network. From raw materials to final mile delivery,
                                            track every SKU and asset in real-time.
                                        </p>
                                        <ul className="space-y-4 mb-8">
                                            {[
                                                "Multi-tiered supplier tracking",
                                                "IoT-integrated asset monitoring",
                                                "Predictive ETA for all shipments",
                                                "Automated exception management"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-300">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button className="bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
                                            Explore Control Tower
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="relative aspect-video bg-gray-900 border border-gray-800 rounded-2xl p-4 overflow-hidden shadow-2xl"
                                    >
                                        {/* Mock Map UI */}
                                        <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=map')] opacity-20" />
                                        <div className="relative h-full flex flex-col justify-end p-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                                    <div className="text-xs text-gray-400 mb-1">In-Transit Shipments</div>
                                                    <div className="text-xl font-bold">1,248</div>
                                                </div>
                                                <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                                                    <div className="text-xs text-red-400 mb-1">Delays Reported</div>
                                                    <div className="text-xl font-bold text-red-500">14</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </TabsContent>

                            {/* Add more TabContents for other values similarly... */}
                            <TabsContent value="optimization" key="optimization" className="mt-0 outline-none">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h3 className="text-4xl font-bold mb-6">Autonomous Simulation</h3>
                                        <p className="text-gray-400 mb-8 text-lg">
                                            Run millions of "What-If" scenarios to find the optimal balance between cost, speed, and sustainability.
                                        </p>
                                        <div className="space-y-6">
                                            <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium">Optimization Progress</span>
                                                    <span className="text-sm font-medium">{progress}%</span>
                                                </div>
                                                <Progress value={progress} className="bg-gray-800 h-2" />
                                            </div>
                                            <Button
                                                onClick={startSimulation}
                                                disabled={simRunning}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                {simRunning ? "Calculating Scenarios..." : "Start Network Optimization"}
                                            </Button>
                                        </div>
                                    </motion.div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {solutions.map((sol, i) => (
                                            <Card key={i} className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer">
                                                <CardHeader className="p-4">
                                                    <div className={`p-2 w-fit rounded-lg bg-${sol.color}-500/10 text-${sol.color}-400 mb-2`}>
                                                        <sol.icon className="w-5 h-5" />
                                                    </div>
                                                    <CardTitle className="text-base text-white">{sol.title}</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                        </AnimatePresence>
                    </Tabs>
                </div>
            </section>

            {/* Implementation Roadmap */}
            <section className="py-24 bg-gray-950/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The Implementation Journey</h2>
                        <p className="text-gray-400">A structured path to enterprise-wide intelligence.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {workflowSteps.map((step, i) => (
                            <div key={i} className="relative group">
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                                )}
                                <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 h-full hover:bg-gray-900 transition-colors z-10 relative">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">0{i + 1}. {step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-3xl p-12 md:p-20 text-center backdrop-blur-md">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Optimize?</h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                            Schedule a strategy session with our supply chain architects to discover how much efficiency you're leaving on the table.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10">
                                Contact Sales
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white rounded-full px-10">
                                Documentation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
            </section>

            {/* Basic Footer */}
            <footer className="py-12 border-t border-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center items-center gap-8 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <span className="font-bold text-xl tracking-tighter">SAPERION</span>
                        <span className="font-bold text-xl tracking-tighter">LOGITECH</span>
                        <span className="font-bold text-xl tracking-tighter">GLOBALNET</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        © 2024 Mindscape Analytics. Enterprise AI Supply chain operating system. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
