import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  allowedDevOrigins: ['192.168.42.30'],
};

export default nextConfig;
