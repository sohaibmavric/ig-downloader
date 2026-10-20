import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // ffmpeg-static resolves its binary path at runtime; keep it out of the bundle.
  serverExternalPackages: ["ffmpeg-static"],
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
