"use client"

import React, { Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import EnhancedHeader from "@/components/enhanced-header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { NavigationEvents } from "@/components/navigation-events"
import { AILoader } from "@/components/ui/ai-loader"
import ExitIntentPopup from "@/components/exit-intent-popup"

// A fallback component for the navigation events suspense
function NavigationEventsFallback() {
  return null;
}

// Add an image prefetcher component
function ImagePrefetcher() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Prefetch critical images for better performance
    const criticalImages = [
      '/images/logo.png',
      '/images/optimized/founder-reduced.webp'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}

interface RootLayoutContentProps {
  children: React.ReactNode
  inter: any // Font
  fullWidth?: boolean // Added option for full-width layout
}

export default function RootLayoutContent({
  children,
  inter,
  fullWidth = true // Set default to true
}: RootLayoutContentProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  const isDashboard = pathname?.startsWith('/dashboard')
  const isDocs = pathname?.startsWith('/docs')

  useEffect(() => {
    setMounted(true)
    // Mark initial load as complete after a short delay
    const timer = setTimeout(() => {
      setInitialLoadComplete(true)
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Explicitly define pages that should NOT have a footer
  const pagesWithoutFooter = [
    isDashboard, // Dashboard pages
    isDocs,      // Documentation pages
  ]

  // Show footer if not in the exclusion list
  const showFooter = !pagesWithoutFooter.some(Boolean)

  return (
    <body className={`${inter.className} antialiased zoom-fix w-full max-w-[100vw] bg-black`} suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* Prefetch critical images */}
        <ImagePrefetcher />

        {/* Branded AI Loading Screen */}
        {/* We render this initially on both server and client to avoid flicker. 
            Once mounted and timer completes, it will be removed. */}
        {!initialLoadComplete && <AILoader text="Mindscape Analytics" />}

        <div className="relative min-h-screen min-w-[320px] w-full max-w-[100vw] mx-auto xl:max-w-[1920px] bg-gradient-to-b from-black to-zinc-950">
          {/* We only render the rest of the UI after mounting to reduce hydration risks with complex components */}
          {mounted && (
            <>
              {!isDashboard && <EnhancedHeader fullWidth={true} />}

              {/* Monitor navigation events - wrapped in Suspense */}
              <Suspense fallback={<NavigationEventsFallback />}>
                <NavigationEvents />
              </Suspense>

              <div className="w-full max-w-[100vw] mx-auto xl:max-w-[1920px] relative z-10 zoom-friendly">
                {children}
              </div>

              {/* Main footer - consistently applied to all pages except excluded ones */}
              {showFooter && <Footer key="main-footer" fullWidth={true} />}
            </>
          )}

          {/* Exit Intent Popup for Lead Generation */}
          <ExitIntentPopup />

          <Toaster />
        </div>
      </ThemeProvider>
    </body>
  )
}