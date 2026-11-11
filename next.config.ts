import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is off: it relies on setTimeout behaviour the Cloudflare Workers runtime
  // doesn't provide (requests hang). Pages are static or rendered per request (via connection()).
  cacheComponents: false,
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
