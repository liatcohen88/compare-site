import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ksp.co.il" },
      { protocol: "https", hostname: "ae01.alicdn.com" },
      { protocol: "https", hostname: "ae02.alicdn.com" },
      { protocol: "https", hostname: "ae04.alicdn.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "img.ltwebstatic.com" },
    ],
  },
};

export default nextConfig;
