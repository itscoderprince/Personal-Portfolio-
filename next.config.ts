import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here - triggered rebuild */
  /* Vercel Framework Preset Fix */
  reactCompiler: true,
};

export default nextConfig;
