import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { causes } from "@/content/causes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", "/causes", ...causes.map((c) => `/causes/${c.slug}`), "/donate", "/get-involved", "/transparency", "/contact", "/privacy", "/donation-policy"];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
