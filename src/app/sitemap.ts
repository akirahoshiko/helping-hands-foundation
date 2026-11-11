import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { causes } from "@/content/causes";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/causes",
    ...causes.map((c) => `/causes/${c.slug}`),
    "/donate",
    "/get-involved",
    "/news",
    ...stories.map((s) => `/news/${s.slug}`),
    "/transparency",
    "/transparency/annual-report-2025",
    "/contact",
    "/safeguarding",
    "/privacy",
    "/donation-policy",
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
