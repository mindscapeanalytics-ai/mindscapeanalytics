"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Brain,
    MessageSquare,
    Eye,
    Wand2,
    BarChart3,
    Code,
    ArrowRight,
    Check,
    Play,
    Zap,
    Cpu,
    Network,
    Shield,
    Database,
    Terminal,
    Activity,
    GitBranch,
    Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define the capabilities data structure aligned with services
const platformCapabilities = [
    {
        id: "genai",
        title: "Generative AI Core",
        subtitle: "Architect Creative Intelligence",
        icon: Wand2,
        description: "Deploy enterprise-grade Large Language Models (LLMs) tailored to your domain. Generate code, content, and creative assets with context-aware precision.",
        features: [
            "Custom LLM Fine-tuning & RAG",
            "Context-Aware Content Generation",
            "Multi-Modal Synthesis (Text/Image/Code)",
            "Enterprise Knowledge Retrieval"
        ],
        stats: [
            { label: "Context Window", value: "1M+" },
            { label: "Inference", value: "<40ms" },
            { label: "Accuracy", value: "99.4%" }
        ],
        codeSnippet: `// Initialize GenAI Engine
const engine = new MindscapeAI({
  model: "titan-v4-enterprise",
  context: "financial-legal-corpus",
  safety: "strict"
});

const response = await engine.generate({
  prompt: "Analyze Q3 risk factors",
  format: "executive_summary"
});`,
        demoType: "genai"
    },
    {
        id: "predictive",
        title: "Predictive Intelligence",
        subtitle: "Forecast with Precision",
        icon: BarChart3,
        description: "Transform raw data into foresight. Our predictive engines utilize advanced time-series analysis to anticipate market shifts and operational risks.",
        features: [
            "High-Frequency Time Series Analysis",
            "Risk Scoring & Anomaly Detection",
            "Demand Forecasting Models",
            "Churn Prediction Algorithms"
        ],
        stats: [
            { label: "Data Points", value: "10B+" },
            { label: "Forecast Horizon", value: "24mo" },
            { label: "Confidence", value: "98%" }
        ],
        codeSnippet: `// Configure Predictive Model
const forecast = await Analytics.predict({
  dataset: "market_volatility_2024",
  horizon: "30d",
  confidence_interval: 0.95,
  features: ["volume", "sentiment", "macro"]
});

console.log(forecast.risk_score); // 0.12 (Low)`,
        demoType: "analytics"
    },
    {
        id: "automation",
        title: "Intelligent Automation",
        subtitle: "Autonomous Workflow Orchestration",
        icon: GitBranch,
        description: "Orchestrate complex business processes with self-optimizing autonomous agents. Reduce manual intervention and accelerate workflow velocity.",
        features: [
            "Autonomous Agent Orchestration",
            "Self-Healing Workflows",
            "Intelligent Document Processing (IDP)",
            "Cross-System Integration"
        ],
        stats: [
            { label: "Efficiency", value: "+400%" },
            { label: "Error Rate", value: "0.01%" },
            { label: "Uptime", value: "99.99%" }
        ],
        codeSnippet: `// Define Workflow Agent
const agent = new WorkflowAgent({
  role: "claims_processor",
  permissions: ["read_db", "send_email"],
  trigger: "new_submission"
});

await agent.deploy();
// Agent active: Monitoring event stream...`,
        demoType: "automation"
    },
    {
        id: "nlp",
        title: "Natural Language Processing",
        subtitle: "Global Semantic Understanding",
        icon: MessageSquare,
        description: "Process and understand human language at scale. From sentiment analysis to entity extraction, unlock the value trapped in unstructured text.",
        features: [
            "Real-time Sentiment Analysis",
            "Named Entity Recognition (NER)",
            "100+ Language Support",
            "Semantic Search & Clustering"
        ],
        stats: [
            { label: "Languages", value: "100+" },
            { label: "Throughput", value: "50k/s" },
            { label: "Latency", value: "12ms" }
        ],
        codeSnippet: `// NLP Pipeline Configuration
const pipeline = new NLPPipeline()
  .use("sentiment-v3")
  .use("ner-financial")
  .use("translation-auto");

const result = await pipeline.process(stream);
// Entities extracted: ["NASDAQ", "Q3 Earnings"]`,
        demoType: "nlp"
    }
]

export default function UnifiedAIPlatform() {
    const [hasMounted, setHasMounted] = useState(false)
    const [activeTab, setActiveTab] = useState("genai")
    const [isDemoActive, setIsDemoActive] = useState(false)
    const [terminalOutput, setTerminalOutput] = useState<string[]>(["> System initialized...", "> Waiting for input..."])

    useEffect(() => {
        setHasMounted(true)
    }, [])

    const activeCapability = platformCapabilities.find(c => c.id === activeTab) || platformCapabilities[0]

    // Helper to highlight code safely
    const highlightCode = (line: string) => {
        // Single pass would be better, but we can also just do it in a safe order:
        // 1. Keywords and Types (no quotes)
        // 2. Comments (wraps everything else)
        // 3. Strings (last, but we must be careful not to match class="...")

        let highlighted = line;

        // Match identifiers/keywords first (no overlapping with tag attributes)
        highlighted = highlighted
            .replace(/const|await|new|return/g, '<span class="text-purple-400">$&</span>')
            .replace(/MindscapeAI|Analytics|WorkflowAgent|NLPPipeline/g, '<span class="text-yellow-400">$&</span>');

        // Match strings LAST, but use a regex that avoids matching content inside tags
        // This is complex, so instead let's just do strings first but make sure keywords don't match our tag attributes.
        // Actually, the previous order was almost fine except strings matching OTHER tag attributes.

        // Let's use a safer approach:
        const parts: { text: string; type: 'none' | 'keyword' | 'type' | 'string' | 'comment' }[] = [];

        // For simplicity in this specific component, we'll just fix the order and use a negative lookahead if available,
        // or just ensure we don't match our own tags.

        // Fixed order:
        // 1. Strings (so they don't match our future tags)
        // 2. Keywords
        // 3. Types
        // 4. Comments (last to wrap everything)

        let result = line;
        // String replacement
        result = result.replace(/".*?"/g, '<span class="text-green-400">$&</span>');

        // Keywords - but ONLY match if NOT inside a tag
        // Since our tags start with <span class="text-..., we just need to make sure we don't match inside the class name.
        // The keywords are "const", "new", etc. None of these are in "text-green-400".
        result = result.replace(/\b(const|await|new|return)\b/g, '<span class="text-purple-400">$&</span>');
        result = result.replace(/\b(MindscapeAI|Analytics|WorkflowAgent|NLPPipeline)\b/g, '<span class="text-yellow-400">$&</span>');

        // Comments
        result = result.replace(/\/\/.*$/g, '<span class="text-gray-500">$&</span>');

        return result;
    };

    // Simulate terminal activity when tab changes
    useEffect(() => {
        setTerminalOutput([
            `> Initializing ${activeCapability.id} module...`,
            "> Loading neural weights...",
            "> Connecting to inference engine...",
            "> Ready."
        ])
    }, [activeCapability])

    if (!hasMounted) return <div className="min-h-[600px] w-full" />;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 font-sans">
            {/* Section Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center mb-4">
                    <Badge variant="outline" className="bg-black/50 border-white/10 text-white/60 px-4 py-1.5 text-xs tracking-[0.2em] uppercase backdrop-blur-sm">
                        AI Platform
                    </Badge>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Enterprise Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Engine</span>
                </h2>
                <p className="text-lg text-white/50 max-w-3xl mx-auto leading-relaxed font-light">
                    A unified operating system for enterprise AI. Orchestrate models, data, and workflows
                    through a single, secure interface designed for scalability.
                </p>
            </div>

            {/* Main Interface - "Frameless" on mobile, Glassmorphic on desktop */}
            <div
                className="md:bg-[#0A0A0A]/80 md:border md:border-white/10 md:rounded-3xl md:overflow-hidden md:shadow-2xl md:ring-1 md:ring-white/5 relative group"
                style={{ transform: 'translateZ(0)' }}
            >
                {/* Background glow for the whole platform */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-900/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">

                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-3 border-r border-white/5 bg-black/40 p-2 flex flex-col gap-1">
                        <div className="p-4 mb-2">
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Module Select</div>
                        </div>
                        {platformCapabilities.map((cap) => (
                            <button
                                key={cap.id}
                                onClick={() => {
                                    setActiveTab(cap.id)
                                    setIsDemoActive(false)
                                }}
                                className={cn(
                                    "flex items-center gap-3 p-3 sm:mx-2 rounded-xl text-left transition-all duration-300 group relative overflow-hidden",
                                    activeTab === cap.id
                                        ? "bg-white/10 text-white shadow-xl shadow-red-500/5"
                                        : "text-white/30 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {activeTab === cap.id && (
                                    <motion.div
                                        layoutId="activeTabGlow"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    />
                                )}
                                <div className={cn(
                                    "p-2 rounded-lg transition-all duration-300",
                                    activeTab === cap.id ? "bg-zinc-800 text-white" : "bg-white/5 text-white/40 group-hover:text-white/70"
                                )}>
                                    <cap.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-xs sm:text-sm tracking-wide uppercase italic">{cap.title}</div>
                                </div>
                            </button>
                        ))}

                        <div className="mt-auto p-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-xs text-white/30">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>System Operational</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Content Area */}
                    <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col border-r border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 flex flex-col will-change-[transform,opacity]"
                            >
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-xs font-medium mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                                        {platformCapabilities.find(c => c.id === activeTab)?.title}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{activeCapability.title}</h3>
                                    <p className="text-lg text-white/50 font-light">{activeCapability.subtitle}</p>
                                </div>

                                <p className="text-white/70 mb-8 leading-relaxed text-sm">
                                    {activeCapability.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {activeCapability.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 group">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/50 transition-colors">
                                                <Check className="h-3 w-3 text-white/60 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-sm text-white/60 group-hover:text-white transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-8 mt-auto">
                                    {activeCapability.stats.map((stat, idx) => (
                                        <div key={idx} className="bg-black/40 rounded-lg p-3 border border-white/5">
                                            <div className="text-xl font-mono font-bold text-white mb-1">{stat.value}</div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full bg-white text-black hover:bg-white/90 font-medium h-12 rounded-xl transition-all hover:scale-[1.02]"
                                    onClick={() => setIsDemoActive(true)}
                                >
                                    <Terminal className="mr-2 h-4 w-4" />
                                    Initialize Engine
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Panel - Code/Terminal View - Visible on Tablet/Desktop, Stacked on Mobile */}
                    <div className="lg:col-span-4 bg-black/95 flex flex-col relative overflow-hidden border-t lg:border-t-0 border-white/5">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <div className="text-[10px] font-mono text-white/30">bash — 80x24</div>
                        </div>

                        {/* Code/Terminal Content */}
                        <div className="flex-1 p-6 font-mono text-sm overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {!isDemoActive ? (
                                    <motion.div
                                        key="code"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full flex flex-col"
                                    >
                                        <div className="text-white/30 mb-4 select-none">
                      // {activeCapability.title} Configuration
                                        </div>
                                        <pre className="text-white/80 overflow-x-auto custom-scrollbar">
                                            <code className="language-typescript">
                                                {activeCapability.codeSnippet.split('\n').map((line, i) => (
                                                    <div key={i} className="flex">
                                                        <span className="w-6 inline-block text-white/20 select-none text-right mr-4">{i + 1}</span>
                                                        <span dangerouslySetInnerHTML={{
                                                            __html: highlightCode(line)
                                                        }} />
                                                    </div>
                                                ))}
                                            </code>
                                        </pre>

                                        <div className="mt-auto pt-6 border-t border-white/5">
                                            <div className="text-xs text-white/40 mb-2">System Status</div>
                                            <div className="space-y-1">
                                                {terminalOutput.map((line, i) => (
                                                    <div key={i} className="text-xs text-green-500/80">{line}</div>
                                                ))}
                                                <div className="text-xs text-green-500 animate-pulse">_</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="demo"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-red-500 border-t-transparent animate-spin mb-4" />
                                        <h4 className="text-white font-medium mb-2">Initializing Environment</h4>
                                        <p className="text-white/40 text-xs mb-6">Allocating GPU resources for {activeCapability.title}...</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-white/10 hover:bg-white/5 text-white/60"
                                            onClick={() => setIsDemoActive(false)}
                                        >
                                            Abort Sequence
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
