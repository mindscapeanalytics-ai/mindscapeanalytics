import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootLayoutContent from "@/components/root-layout-content-container"
import PreloadCriticalImages from "@/components/preload-critical-images"
import Script from "next/script"

// Optimize font loading with display=swap for better performance
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  weight: ['400', '500', '600', '700'] // Only load needed weights
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: {
    default: "Mindscape Analytics | AI Analytics Platform & Machine Learning Solutions",
    template: "%s | Mindscape Analytics"
  },
  description: "Leading AI analytics platform offering machine learning, computer vision, NLP, and custom AI solutions. Transform your business with enterprise-grade AI technology. Expert AI consultants ready to help.",
  metadataBase: new URL("https://mindscapeanalytics.com"),
  keywords: "AI analytics platform, machine learning solutions, artificial intelligence services, AI consulting, enterprise AI, computer vision, NLP services, custom AI development, predictive analytics, AI automation, GPT integration, AI chatbot, voice AI",
  authors: [{ name: "Mindscape Analytics" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindscapeanalytics.com",
    title: "Mindscape Analytics | Enterprise AI & Machine Learning Solutions",
    description:
      "Transform your business with cutting-edge AI analytics. Expert machine learning, computer vision, NLP, and custom AI development. Trusted by Fortune 500 companies. Schedule a free consultation today.",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindscape Analytics | AI Analytics & Machine Learning Platform",
    description:
      "Enterprise AI solutions: Machine Learning, Computer Vision, NLP & Custom AI Development. Transform your business with advanced analytics. Get started today.",
    creator: "@mindscapeanalytics",
    site: "@mindscapeanalytics",
    images: ["/images/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mindscapeanalytics.com',
  },
  category: 'Technology',
  generator: "v0.dev"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full max-w-[100vw] overflow-x-hidden">
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://mindscape-analytics.com" />

        {/* Performance optimizations for faster resource loading */}
        <link rel="preconnect" href="https://mindscape-analytics.com" />
        <link rel="dns-prefetch" href="https://mindscape-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Add critical CSS inline to reduce render-blocking resources */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Critical path CSS */
          *, *::before, *::after {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            max-width: 100vw;
            overflow-x: hidden;
          }
          
          body {
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Add image lazy loading default styles */
          img.lazy-load {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          
          img.lazy-load.loaded {
            opacity: 1;
          }
          
          /* Prevent layout shifts with image containers */
          .img-container {
            position: relative;
            overflow: hidden;
          }
        `}} />

        {/* Move non-essential scripts to afterInteractive or lazyOnload */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mindscape Analytics",
              "url": "https://mindscapeanalytics.com",
              "logo": "https://mindscapeanalytics.com/images/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-307-210-6155",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://twitter.com/mindscapeai",
                "https://www.linkedin.com/company/mindscapeanalytics/",
                "https://github.com/mindscapeanalytics"
              ],
              "description": "Enterprise-grade AI analytics platform for data-driven decision making"
            }
          `}
        </Script>
      </head>
      <body className="antialiased zoom-fix w-full max-w-[100vw] bg-black" suppressHydrationWarning>
        <RootLayoutContent fullWidth={true}>
          {/* Preload critical images for faster page load */}
          <PreloadCriticalImages />
          {children}
        </RootLayoutContent>
      </body>
    </html>
  )
}
