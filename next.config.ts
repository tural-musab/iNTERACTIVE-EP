import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Build sırasında ESLint hatalarını görmezden gel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build sırasında TypeScript hatalarını görmezden gel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
