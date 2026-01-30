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
import AdvancedAnalytics from "@/components/advanced-analytics"

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
    fullWidth?: boolean
    inter?: any
}

export default function RootLayoutContentContainer({
    children,
    fullWidth = true,
    inter
}: RootLayoutContentProps) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [initialLoadComplete, setInitialLoadComplete] = useState(false)
    const hasScrolledToTop = React.useRef(false)

    const isDashboard = pathname?.startsWith('/dashboard')
    const isDocs = pathname?.startsWith('/docs')

    useEffect(() => {
        setMounted(true)

        // Check if we've already shown the loader in this session
        const hasLoaded = sessionStorage.getItem('mindscape_initial_load_complete')

        if (hasLoaded) {
            setInitialLoadComplete(true)
        } else {
            // Reduced from 2000ms to 800ms for better perceived performance
            const timer = setTimeout(() => {
                setInitialLoadComplete(true)
                sessionStorage.setItem('mindscape_initial_load_complete', 'true')
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    // Ensure page always loads at the top (especially for homepage)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Disable automatic scroll restoration
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual'
            }

            // Only scroll to top on initial load, not on every pathname change
            // This prevents race conditions with component mounting
            if (!hasScrolledToTop.current) {
                window.scrollTo(0, 0)
                hasScrolledToTop.current = true
            }
        }
    }, [pathname]);

    // Explicitly define pages that should NOT have a footer
    const pagesWithoutFooter = [
        isDashboard, // Dashboard pages
        isDocs,      // Documentation pages
    ]

    // Show footer if not in the exclusion list
    const showFooter = !pagesWithoutFooter.some(Boolean)

    return (
        <>
            <AdvancedAnalytics />
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                {/* Prefetch critical images */}
                <ImagePrefetcher />

                {/* Branded AI Loading Screen - only show on client after mount */}
                {mounted && !initialLoadComplete && <AILoader text="Mindscape Analytics" />}

                <div className="relative min-h-screen min-w-[320px] w-full max-w-[100vw] mx-auto xl:max-w-[1920px]">
                    {/* Main header - always render for SSR, hide dashboard header */}
                    {!isDashboard && <EnhancedHeader fullWidth={true} />}

                    {/* Monitor navigation events - wrapped in Suspense */}
                    <Suspense fallback={<NavigationEventsFallback />}>
                        <NavigationEvents />
                    </Suspense>

                    <div className="w-full max-w-[100vw] mx-auto xl:max-w-[1920px] relative z-10 zoom-friendly">
                        {children}
                    </div>

                    {/* Main footer - always render if needed for SSR */}
                    {showFooter && <Footer key="main-footer" fullWidth={true} />}

                    {/* Exit Intent Popup - only on client */}
                    {mounted && <ExitIntentPopup />}

                    <Toaster />
                </div>
            </ThemeProvider>
        </>
    )
}
