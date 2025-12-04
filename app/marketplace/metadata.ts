import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Marketplace | Pre-built & Custom Solutions | Mindscape Analytics LLC",
  description: "Browse our premium software marketplace featuring enterprise-ready solutions. Buy pre-built software or request custom development. Save 6+ months of development time with instant deployment.",
  keywords: "software marketplace, pre-built software, custom software development, enterprise solutions, SaaS marketplace, buy software, software products, ready-made software, software solutions",
  metadataBase: new URL("https://mindscape-analytics.com"),
  authors: [{ name: "Mindscape Analytics LLC" }],
  creator: "Mindscape Analytics LLC",
  publisher: "Mindscape Analytics LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindscape-analytics.com/marketplace",
    title: "Software Marketplace | Premium Enterprise Solutions | Mindscape Analytics LLC",
    description: "Discover premium software solutions ready for instant deployment. Save time and money with our pre-built enterprise software or request custom development.",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/images/marketplace-og.jpg",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics Software Marketplace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Marketplace | Mindscape Analytics LLC",
    description: "Premium enterprise software solutions. Buy pre-built software or request custom development.",
    creator: "@mindscapeai",
    images: ["/images/marketplace-twitter.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mindscape-analytics.com/marketplace",
  },
};

