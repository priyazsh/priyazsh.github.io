import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  /* config options here */
};

const withMDX = createMDX({
  // Add markdown plugins here, if desired
});

export default withMDX(nextConfig);
