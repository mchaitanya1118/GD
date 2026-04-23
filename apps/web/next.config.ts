import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  outputFileTracingRoot: '/app',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
