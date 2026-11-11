import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/donate/complete"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
