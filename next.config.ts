import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here - triggered rebuild */
  /* Vercel Framework Preset Fix */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
