"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Brain, Cpu, Database, Cloud, Code, Shield, Network, Zap, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Reliable icon source: SimpleIcons via CDN
// Using generic format: https://cdn.simpleicons.org/[slug]/[color]

const TechIcon = ({ name, iconSlug, fallbackIcon: FallbackIcon }: { name: string; iconSlug?: string, fallbackIcon?: any }) => {
  const [imgError, setImgError] = useState(false)

  // OpenAI slug fix if needed, but 'openai' is correct. 
  // Adding /white ensures it's visible on dark backgrounds and might bypass some 404s depending on the CDN's cache state.
  const iconUrl = iconSlug ? `https://cdn.simpleicons.org/${iconSlug}/white` : null

  if (!iconUrl || imgError) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
        {FallbackIcon ? (
          <FallbackIcon className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
        ) : (
          <span className="font-bold text-xs text-white/40 uppercase">
            {name.slice(0, 2)}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="w-10 h-10 flex items-center justify-center p-1.5 overflow-hidden">
      <img
        src={iconUrl}
        alt={name}
        className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  )
}

// Define types
type TechItem = {
  name: string
  category: string
  iconSlug?: string // SimpleIcons slug
  fallbackIcon: any
}

// Data Handling - Correct Slugs for SimpleIcons
const techStackData: TechItem[] = [
  // AI & ML
  { name: "OpenAI", category: "ai", iconSlug: "openai", fallbackIcon: Brain },
  { name: "LangChain", category: "ai", iconSlug: "langchain", fallbackIcon: Network },
  { name: "Anthropic", category: "ai", iconSlug: "anthropic", fallbackIcon: Brain },
  { name: "Meta AI", category: "ai", iconSlug: "meta", fallbackIcon: Globe },
  { name: "TensorFlow", category: "ai", iconSlug: "tensorflow", fallbackIcon: Cpu },
  { name: "PyTorch", category: "ai", iconSlug: "pytorch", fallbackIcon: Cpu },
  { name: "Hugging Face", category: "ai", iconSlug: "huggingface", fallbackIcon: Brain },
  { name: "Cohere", category: "ai", iconSlug: "cohere", fallbackIcon: Brain },

  // Data
  { name: "PostgreSQL", category: "data", iconSlug: "postgresql", fallbackIcon: Database },
  { name: "Supabase", category: "data", iconSlug: "supabase", fallbackIcon: Database },
  { name: "Redis", category: "data", iconSlug: "redis", fallbackIcon: Zap },
  { name: "MongoDB", category: "data", iconSlug: "mongodb", fallbackIcon: Database },
  { name: "Elasticsearch", category: "data", iconSlug: "elasticsearch", fallbackIcon: Search },
  { name: "Kafka", category: "data", iconSlug: "apachekafka", fallbackIcon: Network },
  { name: "Pinecone", category: "data", iconSlug: "pinecone", fallbackIcon: Database },
  { name: "Weaviate", category: "data", iconSlug: "weaviate", fallbackIcon: Database },

  // Cloud
  { name: "AWS", category: "cloud", iconSlug: "amazonwebservices", fallbackIcon: Cloud },
  { name: "Google Cloud", category: "cloud", iconSlug: "googlecloud", fallbackIcon: Cloud },
  { name: "Azure", category: "cloud", iconSlug: "microsoftazure", fallbackIcon: Cloud },
  { name: "Vercel", category: "cloud", iconSlug: "vercel", fallbackIcon: Globe },
  { name: "Docker", category: "cloud", iconSlug: "docker", fallbackIcon: Shield },
  { name: "Kubernetes", category: "cloud", iconSlug: "kubernetes", fallbackIcon: Shield },
  { name: "DigitalOcean", category: "cloud", iconSlug: "digitalocean", fallbackIcon: Cloud },
  { name: "Railway", category: "cloud", iconSlug: "railway", fallbackIcon: Zap },

  // Development
  { name: "Next.js", category: "dev", iconSlug: "nextdotjs", fallbackIcon: Code },
  { name: "React", category: "dev", iconSlug: "react", fallbackIcon: Code },
  { name: "TypeScript", category: "dev", iconSlug: "typescript", fallbackIcon: Code },
  { name: "Python", category: "dev", iconSlug: "python", fallbackIcon: Code },
  { name: "Node.js", category: "dev", iconSlug: "nodedotjs", fallbackIcon: Code },
  { name: "FastAPI", category: "dev", iconSlug: "fastapi", fallbackIcon: Code },
  { name: "GraphQL", category: "dev", iconSlug: "graphql", fallbackIcon: Network },
  { name: "Tailwind CSS", category: "dev", iconSlug: "tailwindcss", fallbackIcon: Code }
]

const categories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "data", label: "Data" },
  { id: "cloud", label: "Cloud" },
  { id: "dev", label: "Dev" }
]

export default function TechStackShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const filteredTech = techStackData.filter(tech => {
    const matchesCategory = activeCategory === "all" || tech.category === activeCategory
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Hydration safety: render a shell during server rendering and initial client mount
  if (!hasMounted) {
    return (
      <section className="w-full py-10 bg-transparent min-h-[400px] border-t border-white/5 animate-pulse">
        <div className="w-full px-4 md:px-8">
          <div className="h-8 w-48 bg-white/5 rounded-lg mb-4" />
          <div className="h-12 w-96 bg-white/5 rounded-lg mb-12" />
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-square bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="w-full bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="w-full px-4 md:px-8">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8 border-b border-white/5 pb-6">
          <div className="text-left">
            <Badge variant="outline" className="mb-3 bg-zinc-800/30 text-zinc-300 border-zinc-700/50 px-3 py-1 text-[10px] tracking-widest uppercase">
              Technology Stack
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Built on <span className="text-red-500">Giants</span>
            </h2>
            <p className="text-sm text-white/40 mt-2 max-w-lg">
              We leverage best-in-class open source and enterprise technologies.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex bg-white/5 p-1 rounded-lg overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-40">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <Input
                placeholder="Find tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white/5 border-white/5 w-full focus:ring-white/10 h-9 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Compact Logo Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((item) => (
              <motion.div
                layout
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="aspect-square bg-neutral-900/50 border border-white/5 rounded-xl hover:bg-neutral-800 hover:border-white/10 transition-all duration-200 flex flex-col items-center justify-center gap-2 group cursor-default"
              >
                <TechIcon name={item.name} iconSlug={item.iconSlug} fallbackIcon={item.fallbackIcon} />
                <span className="text-xs text-white/30 group-hover:text-white/70 transition-colors font-medium text-center leading-tight">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTech.length === 0 && (
          <div className="text-center py-10 text-white/20">
            <p className="text-xs">No matching technologies found</p>
          </div>
        )}
      </div>
    </div>
  )
}
