import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No R2 incremental cache: every page is prerendered at build time or rendered per request,
// so the site doesn't need one. Add the R2 override here if ISR / revalidation is used later.
export default defineCloudflareConfig({});
