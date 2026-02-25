import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Output changed to default for local development and standard node start
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'clsx',
      'tailwind-merge'
    ],
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.ignoreWarnings = [
        { message: /Failed to parse source map/ },
        { module: /node_modules\/framer-motion/ }
      ];
    }
    return config;
  },
};

export default nextConfig;
