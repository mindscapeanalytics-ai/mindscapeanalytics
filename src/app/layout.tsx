import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import CinematicBackground from "@/components/CinematicBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindscape Analytics | Enterprise AI Asset Registry & Expert Execution",
  description: "Mindscape Analytics builds high-performance AI systems, secure data asset registries, and scalable enterprise architecture. Deploying 2026-standard expert systems since 2025.",
  keywords: [
    "AI Systems Engineering", "Custom Software Development", "Data Asset Registry",
    "AI Automation Agency", "Mindscape Analytics", "Enterprise AI Solutions",
    "Automated Sales Agents", "Scalable Cloud Infrastructure", "Expert Execution Services"
  ],
  authors: [{ name: "Mindscape Analytics", url: "https://mindscapeanalytics.com" }],
  creator: "Mindscape Analytics",
  publisher: "Mindscape Analytics",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://mindscapeanalytics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mindscape Analytics | Enterprise AI Systems & Asset Registry",
    description: "Custom software architecture and AI automation systems engineered for scale. Founded 2025.",
    type: "website",
    url: 'https://mindscapeanalytics.com',
    siteName: 'Mindscape Analytics',
    images: [
      {
        url: 'https://mindscapeanalytics.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mindscape Analytics Architecture',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mindscape Analytics | AI Infrastructure",
    description: "Architecting the future of automated enterprise systems.",
    creator: '@mindscapeai',
    images: ['https://mindscapeanalytics.com/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mindscape Analytics",
  "legalName": "Mindscape Analytics",
  "foundingDate": "2025",
  "url": "https://mindscapeanalytics.com",
  "logo": "https://mindscapeanalytics.com/images/logo/mindscape-analytics.png",
  "description": "Premium engineering firm specializing in AI systems, automation architecture, and Custom SaaS solutions.",
  "founder": {
    "@type": "Person",
    "name": "Zeeshan Keerio"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sheridan",
    "addressRegion": "WY",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-307-210-6155",
    "contactType": "customer service",
    "email": "info@mindscapeanalytics.com"
  },
  "sameAs": [
    "https://linkedin.com/company/mindscapeanalytics",
    "https://twitter.com/mindscapeai",
    "https://github.com/mindscapeai"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <CinematicBackground />
          {children}
          <ChatWidget />
          {process.env.VERCEL && <SpeedInsights />}
        </CartProvider>
      </body>
    </html>
  );
}