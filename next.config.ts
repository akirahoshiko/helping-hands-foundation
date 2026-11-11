import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is off: it relies on setTimeout behaviour the Cloudflare Workers runtime
  // doesn't provide (requests hang). Pages are static or rendered per request (via connection()).
  cacheComponents: false,
  // Photos are pre-compressed in src/assets and served as static files (fast, no image-resizing
  // service needed). Set to false and add the Cloudflare IMAGES binding to enable on-the-fly resizing.
  images: { unoptimized: true },
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

// Makes Cloudflare bindings available when running `next dev` (see https://opennext.js.org/cloudflare)
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
