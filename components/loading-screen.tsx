import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function LoadingScreen() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const [progress, setProgress] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const fullText = "Preparing AI Environment..."

  // Only show loading screen in dashboard pages
  if (!isDashboard) {
    return null
  }

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        // Move faster at the beginning, slower toward the end
        const increment = Math.max(1, 10 - Math.floor(prev / 10))
        const newProgress = prev + increment

        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 150)

    // Typing effect
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => {
      clearInterval(timer)
      clearInterval(typingInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-[100]">
      <div className="flex flex-col items-center max-w-md text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />

          <div className="relative flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Mindscape Analytics"
              width={120}
              height={120}
              className="object-contain animate-pulse-slow"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 min-h-[60px]"
        >
          <h2 className="text-2xl font-bold text-white tracking-wide">
            {displayText}
            <span className="animate-pulse text-red-500">_</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-64 mt-8"
        >
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40 font-mono">
            <span>SYSTEM_INIT</span>
            <span>{progress}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
