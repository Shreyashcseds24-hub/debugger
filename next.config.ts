import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable server-side API routes */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  /* Increase API timeout for AI calls */
  serverExternalPackages: [],
};

export default nextConfig;
