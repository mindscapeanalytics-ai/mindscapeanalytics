import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mindscape Analytics | Next-Generation AI & Cloud Solutions",
  description: "Enterprise-grade intelligent ecosystems, cloud infrastructure, and mission-critical software architecture for global organizations.",
  openGraph: {
    title: "Mindscape Analytics | Next-Generation AI & Cloud Solutions",
    description: "Enterprise-grade intelligent ecosystems, cloud infrastructure, and mission-critical software architecture for global organizations.",
    url: "https://mindscapeanalytics.com",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/og-bg.webp",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics Deep Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindscape Analytics | Next-Generation AI & Cloud Solutions",
    description: "Enterprise-grade intelligent ecosystems, cloud infrastructure, and mission-critical software architecture.",
    images: ["/og-bg.webp"],
  },
};

export default function Home() {
  return <HomeClient />;
}
