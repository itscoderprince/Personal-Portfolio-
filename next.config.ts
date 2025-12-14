import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here - triggered rebuild */
  reactCompiler: true,
  distDir: 'dist',
};

export default nextConfig;
