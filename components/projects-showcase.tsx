import { motion, AnimatePresence, useAnimation, useMotionValue, PanInfo, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TypeAnimation } from "react-type-animation"
import {
  ArrowRight,
  Code,
  Database,
  Brain,
  Zap,
  Clock,
  Eye,
  Github,
  ExternalLink,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  Pen,
  BarChart,
  DollarSign,
  Pizza,
  Recycle,
  Youtube,
  Play,
  Pause,
  RefreshCw,
  Check,
  ImageIcon,
  ShoppingCart,
  Car,
  Building,
  Home
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Available project images for explicit assignment
const availableProjectImages = [
  "/images/projects/inventory.png",
  "/images/projects/CYBERTRADERX.png",
  "/images/projects/mindscape-lms.png",
  "/images/projects/AgriChian.jpg",
  "/images/projects/breach-data.png",
  "/images/projects/real_estate_solutions.png",
  "/images/projects/dblynx-database-intelligence-mindscapeanalytics.PNG",
  "/images/projects/mindscape-mortgage.png",
  "/images/projects/cattle_farm.png",
  "/images/projects/cryforecast.png",
  "/images/projects/ll-mindscapeanalytics.png",
  "/images/projects/vehicle_analysis_dashboard.png",
  "/images/projects/Crypto_folio_App.png",
  "/images/projects/amazon_sales_management.png",
  "/images/projects/amazon_invontry_management_system.png",
  "/images/projects/amazon_inventory.png",
  "/images/projects/KStock_Analyzer.png",
  "/images/projects/Crypto_Tracker.png",
  "/images/projects/Investment_Insights.png",
  "/images/projects/Automated Workflows.png",
  "/images/projects/mindscapeanalytics.png",
  "/images/projects/jfbz_token.png",
  "/images/projects/image_annotation_tool.png",
  "/images/projects/cryptotrader2.png",
  "/images/projects/our_web_designs.png",
];

const getRandomProjectImage = () => {
  const randomIndex = Math.floor(Math.random() * availableProjectImages.length);
  return availableProjectImages[randomIndex];
};

interface ProjectFeature {
  [key: number]: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  status: string;
  videoLink?: string;
  externalLink?: string;
  imageUrl?: string;
  color?: string;
}

interface CurrentProject extends Project { }

interface UpcomingProject extends Project {
  demoLink: string;
  repoLink: string;
  releaseDate: string;
  progress?: number;
}

const currentProjects: CurrentProject[] = [
  {
    id: "mindscape-analytics",
    title: "Intelligence Hub",
    description: "Enterprise data visualization and predictive modeling engine for real-time market insights.",
    category: "Data Analytics",
    icon: Brain,
    href: "/projects/mindscape-analytics",
    features: ["Predictive UI", "Live Streams"],
    status: "Live",
    imageUrl: "/images/projects/mindscapeanalytics.png",
    color: "indigo"
  },
  {
    id: "cryptotrader",
    title: "CryptoTrader Pro",
    description: "High-frequency algorithmic trading platform with deep liquidity integration and AI signal auditing.",
    category: "FinTech",
    icon: BarChart,
    href: "/projects/cryptotrader",
    features: ["Auto-Execution", "Risk Bot"],
    status: "Beta",
    imageUrl: "/images/projects/cryptotrader2.png",
    color: "blue"
  },
  {
    id: "agrichan",
    title: "AgriChain",
    description: "Precision agriculture ecosystem utilizing blockchain for immutable supply chain transparency.",
    category: "AgriTech",
    icon: Recycle,
    href: "/projects/agrichan",
    features: ["Smart Yield", "Tracking"],
    status: "Beta",
    imageUrl: "/images/projects/AgriChian.jpg",
    color: "green"
  },
  {
    id: "image-annotation",
    title: "VisionScan AI",
    description: "Multi-modal model training platform with advanced auto-labeling and dataset integrity checks.",
    category: "Computer Vision",
    icon: ImageIcon,
    href: "/projects/annotation-tool",
    features: ["Auto-Label", "QA Mode"],
    status: "Beta",
    imageUrl: "/images/projects/image_annotation_tool.png",
    color: "purple"
  },
  {
    id: "quantum-crypto",
    title: "Quantum Index",
    description: "Financial modeling tool using quantum-inspired optimization for multi-asset crypto portfolios.",
    category: "FinTech",
    icon: Database,
    href: "/projects/quantum-crypto",
    features: ["Optimized P&L", "DeFi Hub"],
    status: "Beta",
    imageUrl: "/images/projects/Crypto_folio_App.png",
    color: "cyan"
  },
  {
    id: "amazon-inventory",
    title: "Seller Intelligence",
    description: "Demand forecasting and inventory optimization suite tailored for multi-region Amazon logistics.",
    category: "E-commerce",
    icon: ShoppingCart,
    href: "/projects/amazon-inventory",
    features: ["Restock AI", "Profit Map"],
    status: "Live",
    imageUrl: "/images/projects/amazon_invontry_management_system.png",
    color: "amber"
  },
  {
    id: "vehicle-eu-analytics",
    title: "EU Auto Portal",
    description: "Market intelligence platform for European vehicle distribution with automated trend detection.",
    category: "Automotive",
    icon: Car,
    href: "/projects/vehicle-eu-analytics",
    features: ["Euro-Pricing", "Fleet AI"],
    status: "Live",
    imageUrl: "/images/projects/vehicle_analysis_dashboard.png",
    color: "pink"
  },
  {
    id: "jfbz-token",
    title: "JFBZ Exchange",
    description: "Decentralized liquidity aggregator and token management platform for institutional assets.",
    category: "Blockchain",
    icon: Database,
    href: "/projects/jfbz-token",
    features: ["Cold Staking", "Audit Log"],
    status: "Live",
    imageUrl: "/images/projects/jfbz_token.png",
    color: "violet"
  },
  {
    id: "kstock-analyzer",
    title: "KStock Analyzer",
    description: "Real-time stock pattern recognition engine analyzing billions of events for predictive trading.",
    category: "FinTech",
    icon: BarChart,
    href: "/projects/kstock-analyzer",
    features: ["Signal Filter", "P&L Hub"],
    status: "Live",
    imageUrl: "/images/projects/KStock_Analyzer.png",
    color: "emerald"
  },
  {
    id: "crypto-tracker",
    title: "Asset Tracker",
    description: "Unified digital asset monitoring with automated tax reporting and deep wallet insights.",
    category: "FinTech",
    icon: BarChart,
    href: "/projects/crypto-tracker",
    features: ["Tax Export", "Hot Alerts"],
    status: "Live",
    imageUrl: "/images/projects/Crypto_Tracker.png",
    color: "orange"
  },
  {
    id: "kitools",
    title: "DBlynx Dev",
    description: "Automated database schema visualizer and intelligent SQL optimization workbench.",
    category: "DevOps",
    icon: Code,
    href: "/projects/kitools",
    features: ["Query Map", "Auto-Fix"],
    status: "Live",
    imageUrl: "/images/projects/dblynx-database-intelligence-mindscapeanalytics.PNG",
    color: "rose"
  },
  {
    id: "amazon-sales-analytics",
    title: "Sales Hub Pro",
    description: "E-commerce analytics engine providing real-time competitive intelligence and campaign metrics.",
    category: "E-commerce",
    icon: ShoppingCart,
    href: "/projects/amazon-sales-analytics",
    features: ["Ad Optimizer", "ROI Hub"],
    status: "Live",
    imageUrl: "/images/projects/amazon_sales_management.png",
    color: "yellow"
  },
  {
    id: "mindscape-mortgage",
    title: "Mortgage Pro",
    description: "Advanced AI mortgage and financial analysis suite for enterprise real estate.",
    category: "Real Estate",
    icon: DollarSign,
    href: "https://mortgage.mindscapeanalytics.com/",
    features: ["ROI Engine", "Loan Visualizer"],
    status: "Live",
    imageUrl: "/images/projects/mindscape-mortgage.png",
    color: "violet"
  },
]

const upcomingProjects: UpcomingProject[] = [
  {
    id: "quantum-ml",
    title: "Quantum ML",
    description: "Quantum-inspired machine learning platform for solving complex optimization problems",
    category: "Quantum Computing",
    icon: Brain,
    href: "/projects/quantum-ml",
    demoLink: "https://demo.mindscape.ai/quantum-ml",
    repoLink: "https://github.com/mindscape/quantum-ml-demo",
    features: ["Quantum Algorithm Simulation", "Optimization Toolkit", "Integration with Classical ML"],
    status: "Development",
    releaseDate: "Q3 2023",
    progress: 75,
    videoLink: "https://youtu.be/23A9JRb0SXM",
    color: "violet",
    imageUrl: "/images/projects/Investment_Insights.png"
  },
  {
    id: "decentraledge",
    title: "DecentralEdge",
    description: "Decentralized edge computing network leveraging blockchain for IoT applications",
    category: "Edge Computing",
    icon: Database,
    href: "/projects/decentraledge",
    demoLink: "https://demo.mindscape.ai/decentraledge",
    repoLink: "https://github.com/mindscape/decentraledge-demo",
    features: ["Edge Node Network", "Smart Contract Integration", "IoT Device Management"],
    status: "Research",
    releaseDate: "Q4 2023",
    progress: 45,
    videoLink: "https://youtu.be/CcPag_gW78Y",
    color: "cyan",
    imageUrl: "/images/projects/Automated Workflows.png"
  },
  {
    id: "neurocraft",
    title: "NeuroCraft",
    description: "No-code AI model builder with advanced neural architecture search",
    category: "AI Development",
    icon: Code,
    href: "/projects/neurocraft",
    demoLink: "https://demo.mindscape.ai/neurocraft",
    repoLink: "https://github.com/mindscape/neurocraft-preview",
    features: ["Visual Model Builder", "AutoML Capabilities", "One-Click Deployment"],
    status: "Planning",
    releaseDate: "Q1 2024",
    progress: 20,
    videoLink: "https://youtu.be/cd75TIAM9X0",
    color: "emerald",
    imageUrl: "/images/projects/mindscapeanalytics.png"
  },
  {
    id: "neural-governance",
    title: "Neural Governance",
    description: "AI-powered governance and compliance platform for enterprise risk management",
    category: "Governance & Risk",
    icon: Brain,
    href: "/projects/neural-governance",
    demoLink: "https://demo.mindscape.ai/neural-governance",
    repoLink: "https://github.com/mindscape/neural-governance",
    features: ["Automated Compliance", "Risk Assessment", "Real-time Monitoring", "Regulatory Updates"],
    status: "Research",
    releaseDate: "Q2 2024",
    progress: 35,
    videoLink: "https://youtu.be/Fn2a55UKkhU",
    color: "pink",
    imageUrl: "/images/projects/vehicle_analysis_dashboard.png"
  }
]

// Helper function to get background gradient based on color
const getBackgroundGradient = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "from-red-600/10 to-red-900/10",
    blue: "from-blue-600/10 to-blue-900/10",
    green: "from-green-600/10 to-green-900/10",
    purple: "from-purple-600/10 to-purple-900/10",
    indigo: "from-indigo-600/10 to-indigo-900/10",
    pink: "from-pink-600/10 to-pink-900/10",
    yellow: "from-yellow-600/10 to-yellow-900/10",
    orange: "from-orange-600/10 to-orange-900/10",
    teal: "from-teal-600/10 to-teal-900/10",
    cyan: "from-cyan-600/10 to-cyan-900/10",
    amber: "from-amber-600/10 to-amber-900/10",
    lime: "from-lime-600/10 to-lime-900/10",
    emerald: "from-emerald-600/10 to-emerald-900/10",
    rose: "from-rose-600/10 to-rose-900/10",
    violet: "from-violet-600/10 to-violet-900/10",
  };

  return colorMap[color] || "from-red-600/10 to-red-900/10";
};

// Helper function to get border color based on color
const getBorderColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "border-red-500/20 hover:border-red-500/40",
    blue: "border-blue-500/20 hover:border-blue-500/40",
    green: "border-green-500/20 hover:border-green-500/40",
    purple: "border-purple-500/20 hover:border-purple-500/40",
    indigo: "border-indigo-500/20 hover:border-indigo-500/40",
    pink: "border-pink-500/20 hover:border-pink-500/40",
    yellow: "border-yellow-500/20 hover:border-yellow-500/40",
    orange: "border-orange-500/20 hover:border-orange-500/40",
    teal: "border-teal-500/20 hover:border-teal-500/40",
    cyan: "border-cyan-500/20 hover:border-cyan-500/40",
    amber: "border-amber-500/20 hover:border-amber-500/40",
    lime: "border-lime-500/20 hover:border-lime-500/40",
    emerald: "border-emerald-500/20 hover:border-emerald-500/40",
    rose: "border-rose-500/20 hover:border-rose-500/40",
    violet: "border-violet-500/20 hover:border-violet-500/40",
  };

  return colorMap[color] || "border-red-500/20 hover:border-red-500/40";
};

// Helper function to get text color based on color
const getTextColor = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "text-red-400",
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
    indigo: "text-indigo-400",
    pink: "text-pink-400",
    yellow: "text-yellow-400",
    orange: "text-orange-400",
    teal: "text-teal-400",
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    lime: "text-lime-400",
    emerald: "text-emerald-400",
    rose: "text-rose-400",
    violet: "text-violet-400",
  };

  return colorMap[color] || "text-red-400";
};

// Helper function to get badge background color
const getBadgeBackground = (color: string) => {
  const colorMap: Record<string, string> = {
    red: "bg-red-500/10 text-red-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    purple: "bg-purple-500/10 text-purple-400",
    indigo: "bg-indigo-500/10 text-indigo-400",
    pink: "bg-pink-500/10 text-pink-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    orange: "bg-orange-500/10 text-orange-400",
    teal: "bg-teal-500/10 text-teal-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    amber: "bg-amber-500/10 text-amber-400",
    lime: "bg-lime-500/10 text-lime-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    rose: "bg-rose-500/10 text-rose-400",
    violet: "bg-violet-500/10 text-violet-400",
  };

  return colorMap[color] || "bg-red-500/10 text-red-400";
};

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "0px 0px -200px 0px", once: false })

  const [activeTab, setActiveTab] = useState("current")
  const [isPaused, setIsPaused] = useState(false)
  const [isUpcomingPaused, setIsUpcomingPaused] = useState(false)
  const marqueeControls = useAnimation()
  const upcomingMarqueeControls = useAnimation()
  const dragX = useMotionValue(0)
  const upcomingDragX = useMotionValue(0)
  const panStartX = useRef(0)
  const upcomingPanStartX = useRef(0)

  // Duplicate projects for seamless marquee effect
  const duplicatedCurrentProjects = useMemo(() => [...currentProjects, ...currentProjects], [])
  const duplicatedUpcomingProjects = useMemo(() => [...upcomingProjects, ...upcomingProjects], [])

  const startMarquee = useCallback(() => {
    if (!isPaused && isInView) {
      marqueeControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 40, // Slower for smoother perception
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        },
      })
    } else {
      marqueeControls.stop()
    }
  }, [marqueeControls, isPaused, isInView])

  const startUpcomingMarquee = useCallback(() => {
    if (!isUpcomingPaused && isInView) {
      upcomingMarqueeControls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        },
      })
    } else {
      upcomingMarqueeControls.stop()
    }
  }, [upcomingMarqueeControls, isUpcomingPaused, isInView])

  const pauseMarquee = useCallback(() => {
    setIsPaused(true)
    marqueeControls.stop()
  }, [marqueeControls])

  const pauseUpcomingMarquee = useCallback(() => {
    setIsUpcomingPaused(true)
    upcomingMarqueeControls.stop()
  }, [upcomingMarqueeControls])

  const handleDragStart = useCallback(() => {
    panStartX.current = dragX.get()
    pauseMarquee()
  }, [dragX, pauseMarquee])

  const handleUpcomingDragStart = useCallback(() => {
    upcomingPanStartX.current = upcomingDragX.get()
    pauseUpcomingMarquee()
  }, [upcomingDragX, pauseUpcomingMarquee])

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity > 0 ? 1 : -1
      const newX = panStartX.current + direction * 300
      marqueeControls.start({ x: newX, transition: { duration: 0.5 } })
    } else {
      marqueeControls.start({ x: panStartX.current, transition: { duration: 0.5 } })
    }

    setIsPaused(false)
  }, [marqueeControls])

  const handleUpcomingDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x
    const offset = info.offset.x

    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      const direction = velocity > 0 ? 1 : -1
      const newX = upcomingPanStartX.current + direction * 300
      upcomingMarqueeControls.start({ x: newX, transition: { duration: 0.5 } })
    } else {
      upcomingMarqueeControls.start({ x: upcomingPanStartX.current, transition: { duration: 0.5 } })
    }

    setIsUpcomingPaused(false)
  }, [upcomingMarqueeControls])

  useEffect(() => {
    startMarquee()
    return () => {
      marqueeControls.stop()
    }
  }, [startMarquee, marqueeControls])

  useEffect(() => {
    startUpcomingMarquee()
    return () => {
      upcomingMarqueeControls.stop()
    }
  }, [startUpcomingMarquee, upcomingMarqueeControls])

  // Card item animation variants - Simplified for performance
  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    hover: {
      y: -12,
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden py-12">
      {/* Enhanced Background Elements - Simplified for performance */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>

      {/* Reduced particle count and complexity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-[80px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-red-500/5 blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        {/* Updated header with two-column layout similar to features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center px-4">
          {/* Left column: Title and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center">
              <Badge
                variant="outline"
                className="text-sm font-medium bg-red-500/10 border-red-500/20 text-red-400 px-4 py-1.5"
              >
                INNOVATION PORTFOLIO
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
              Our Cutting-Edge <span className="text-red-500">AI Projects</span>
            </h2>

            <p className="text-base md:text-lg text-white/70">
              Explore our diverse portfolio of innovative solutions transforming industries and creating business value.
            </p>
          </motion.div>

          {/* Right column: Explore All button */}
          <div className="flex justify-start md:justify-end">
            <Button
              asChild
              className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:brightness-110 text-white shadow-lg shadow-red-900/20 transition-all duration-300"
            >
              <Link href="/projects">
                Explore Full Project Gallery
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto mb-8 bg-black/40 border border-white/10 p-1 rounded-full overflow-hidden">
            <TabsTrigger value="current" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 rounded-full transition-all duration-300">
              Current Projects
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/70 rounded-full transition-all duration-300">
              Upcoming Projects
            </TabsTrigger>
          </TabsList>

          {/* Current Projects Tab with Interactive Marquee */}
          <TabsContent value="current">
            <div className="relative space-y-4">
              {/* Marquee controls */}
              <div className="flex justify-end mb-4 gap-3 px-4">
                <Badge
                  variant="outline"
                  className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1.5 rounded-full flex items-center gap-2"
                  onClick={() => isPaused ? setIsPaused(false) : setIsPaused(true)}
                >
                  {isPaused ? (
                    <>
                      <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                      <span className="text-white/60">Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                      <span className="text-white/60">Pause</span>
                    </>
                  )}
                </Badge>
              </div>

              {/* Marquee container - full width */}
              <div
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                }}
              >
                <motion.div
                  className="flex gap-6 py-4 pl-4"
                  animate={marqueeControls}
                  style={{
                    x: dragX,
                    willChange: 'transform', // Hardware acceleration hint
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  key={activeTab}
                >
                  {duplicatedCurrentProjects.map((project, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      custom={index % currentProjects.length}
                      variants={cardItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover="hover"
                      className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]"
                    >
                      <Card className={`backdrop-blur-xl border ${getBorderColor(project.color || 'red')} bg-black/40 hover:bg-black/60 transition-all duration-500 h-full group overflow-hidden flex flex-col shadow-2xl relative`}>
                        {/* Animated gradient background overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(project.color || 'red')} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                        <CardHeader className="relative p-4">
                          <div className="absolute top-0 right-0 z-10">
                            <Badge className={`${getBadgeBackground(project.color || 'red')} rounded-br-none rounded-tl-none text-xs`}>{project.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 ${getBadgeBackground(project.color || 'red')} rounded-md`}>
                              <project.icon className={`h-5 w-5 ${getTextColor(project.color || 'red')}`} />
                            </div>
                            <Badge variant="outline" className={`text-xs ${project.status === "Live"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : project.status === "Beta"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              }`}>
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className={`text-lg group-hover:${getTextColor(project.color || 'red')} transition-colors duration-300 text-white`}>{project.title}</CardTitle>
                          <CardDescription className="text-white/70 text-sm line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 pt-0">
                          {/* Project Image Thumbnail - Optimized */}
                          <div className="relative w-full mb-4 pt-[56.25%] rounded-lg overflow-hidden shadow-md ring-1 ring-white/10 bg-black/20">
                            <Image
                              src={project.imageUrl || availableProjectImages[0]}
                              alt={project.title}
                              fill
                              className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Video Play Button */}
                            {project.videoLink && (
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                  className={`p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-red-600 hover:border-red-500 transition-all duration-300`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(project.videoLink, '_blank');
                                  }}
                                >
                                  <Youtube className="h-6 w-6 text-white" />
                                </button>
                              </div>
                            )}
                          </div>

                          <ul className="space-y-1 mt-2">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className={`h-3.5 w-3.5 mt-0.5 ${getTextColor(project.color || 'red')}`} />
                                <span className="text-xs text-white/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-3 border-t border-white/5 mt-auto p-4">
                          <Button
                            size="sm"
                            variant="link"
                            className="text-white/70 hover:text-white p-0 text-xs"
                            asChild
                          >
                            <Link href={project.href}>
                              Learn More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* Upcoming Projects Tab */}
          <TabsContent value="upcoming">
            <div className="relative space-y-4">
              <div className="flex justify-end mb-4 gap-3 px-4">
                <Badge
                  variant="outline"
                  className="bg-white/5 border-white/10 text-xs cursor-pointer hover:bg-white/10 transition-all duration-300 px-3 py-1.5 rounded-full flex items-center gap-2"
                  onClick={() => isUpcomingPaused ? setIsUpcomingPaused(false) : setIsUpcomingPaused(true)}
                >
                  {isUpcomingPaused ? (
                    <>
                      <Play className="h-3 w-3 text-green-500" fill="currentColor" />
                      <span className="text-white/60">Resume</span>
                    </>
                  ) : (
                    <>
                      <Pause className="h-3 w-3 text-yellow-500" fill="currentColor" />
                      <span className="text-white/60">Pause</span>
                    </>
                  )}
                </Badge>
              </div>

              <div
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                }}
              >
                <motion.div
                  className="flex gap-6 py-4 pl-4"
                  animate={upcomingMarqueeControls}
                  style={{
                    x: upcomingDragX,
                    willChange: 'transform',
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={handleUpcomingDragStart}
                  onDragEnd={handleUpcomingDragEnd}
                  key={activeTab}
                >
                  {duplicatedUpcomingProjects.map((project, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      custom={index % upcomingProjects.length}
                      variants={cardItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover="hover"
                      className="flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]"
                    >
                      <Card className={`backdrop-blur-xl border ${getBorderColor(project.color || 'red')} bg-black/40 hover:bg-black/60 transition-all duration-500 h-full group overflow-hidden flex flex-col shadow-2xl relative`}>
                        {/* Animated gradient background overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient(project.color || 'red')} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                        <CardHeader className="relative p-4">
                          <div className="absolute top-0 right-0 z-10">
                            <Badge className={`${getBadgeBackground(project.color || 'red')} rounded-br-none rounded-tl-none text-xs`}>{project.category}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`p-2 ${getBadgeBackground(project.color || 'red')} rounded-md`}>
                              <project.icon className={`h-5 w-5 ${getTextColor(project.color || 'red')}`} />
                            </div>
                            <Badge variant="outline" className="text-xs bg-white/5 border-white/10 text-white/70">
                              {project.releaseDate}
                            </Badge>
                          </div>
                          <CardTitle className={`text-lg group-hover:${getTextColor(project.color || 'red')} transition-colors duration-300 text-white`}>{project.title}</CardTitle>
                          <CardDescription className="text-white/70 text-sm line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 pt-0">
                          <div className="relative w-full mb-4 pt-[56.25%] rounded-lg overflow-hidden shadow-md ring-1 ring-white/10 bg-black/20">
                            <Image
                              src={project.imageUrl || availableProjectImages[0]}
                              alt={project.title}
                              fill
                              className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Development Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getBadgeBackground(project.color || 'red').split(' ')[0].replace('/10', '')}`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-3 border-t border-white/5 mt-auto p-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 hover:bg-white/5 text-xs w-full"
                            asChild
                          >
                            <Link href={project.href}>
                              View Roadmap
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}