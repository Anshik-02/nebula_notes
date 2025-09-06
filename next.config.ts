import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
      eslint: {
    // ⚡ completely ignore linting during builds
    ignoreDuringBuilds: true,
  }, typescript: {
    ignoreBuildErrors: true, // ✅ skips type errors on build
  },
  images: {
    domains: ['img.clerk.com'],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
      },
    ], 
  },
};

export default nextConfig;
