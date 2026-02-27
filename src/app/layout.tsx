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
  title: "Mindscape Analytics LLC | Custom AI Automation & Enterprise Software",
  description: "Mindscape Analytics LLC builds custom AI software, automated sales pipelines, and scalable enterprise architecture. Transform your business with expert systems engineering founded in 2025.",
  keywords: [
    "AI Systems Engineering", "Custom Software Development", "SaaS Architecture",
    "AI Automation Agency", "Mindscape Analytics LLC", "Enterprise AI Solutions",
    "Automated Sales Agents", "Scalable Cloud Infrastructure", "n8n Workflow Automation"
  ],
  authors: [{ name: "Mindscape Analytics LLC", url: "https://mindscapeanalytics.com" }],
  creator: "Mindscape Analytics LLC",
  publisher: "Mindscape Analytics LLC",
  metadataBase: new URL('https://mindscapeanalytics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mindscape Analytics LLC | Enterprise AI Systems",
    description: "Custom software architecture and AI automation systems engineered for scale. Founded 2025.",
    type: "website",
    url: 'https://mindscapeanalytics.com',
    siteName: 'Mindscape Analytics LLC',
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
    title: "Mindscape Analytics LLC | AI Infrastructure",
    description: "Architecting the future of automated enterprise systems.",
    creator: '@mindscapeai',
    images: ['https://mindscapeanalytics.com/images/og-image.png'],
  },
  icons: {
    icon: '/images/logo/mindscape-analytics.png',
    apple: '/images/logo/mindscape-analytics.png',
    shortcut: '/images/logo/mindscape-analytics.png',
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
  "name": "Mindscape Analytics LLC",
  "legalName": "Mindscape Analytics LLC",
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