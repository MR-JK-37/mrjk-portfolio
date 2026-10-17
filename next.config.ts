import type { NextConfig } from "next";

// Static export for GitHub Pages (custom domain, no Node server available):
// no headers()/rewrites/API routes/middleware — those don't run on Pages.
const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
