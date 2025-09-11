import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    domains: ["images-assets.nasa.gov"],
    path: "/_next/image",
    loader: "default",
  },
};

export default nextConfig;
