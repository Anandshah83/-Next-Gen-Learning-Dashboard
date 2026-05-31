import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set turbopack root to this workspace to avoid
  // "inferred workspace root" warnings when multiple lockfiles exist.
  turbopack: {
    root: './',
  } as any,
};

export default nextConfig;
