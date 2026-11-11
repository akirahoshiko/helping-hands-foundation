/**
 * Helping Hands Foundation: organisation details.
 *
 * This is the ONE place to add verified information about the foundation.
 * Anything left empty ("" or []) is simply not shown on the website, so nothing
 * unverified is ever published. See README → "Content still needed".
 */

export type TeamMember = { name: string; role: string; bio?: string };
export type PublishedDocument = { title: string; date: string; href: string; summary?: string };

export const site = {
  name: "Helping Hands Foundation",
  shortName: "Helping Hands",
  tagline: "A helping hand. A brighter tomorrow.",
  description:
    "Helping Hands Foundation supports orphans, vulnerable children in Africa, and people who need financial help with medical treatment.",

  /** Public site address, used for links in emails, sitemaps and payment callbacks. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /** Contact details: each line is shown only when filled in. */
  contact: {
    email: "",
    phone: "", // international format, e.g. "+234 800 000 0000"
    whatsapp: "", // digits only with country code, e.g. "2348000000000"
    address: "", // full postal address, one line
    officeHours: "", // e.g. "Mon–Fri, 9:00–17:00 WAT"
  },

  /** Social profiles: a link appears only when a URL is supplied. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    youtube: "",
  },

  /** Legal registration: shown on About and Transparency once supplied. */
  registration: {
    legalName: "", // e.g. "Helping Hands Foundation (Incorporated Trustees)"
    country: "", // country of registration
    authority: "", // e.g. "Corporate Affairs Commission"
    number: "", // registration number
    taxStatus: "", // e.g. tax-exemption or charitable status, if granted
  },

  /** Verified history of the foundation (paragraphs). Leave empty until confirmed. */
  history: [] as string[],

  /** Founders, trustees and staff. Add only real, consenting people. */
  team: [] as TeamMember[],

  /** Transparency documents. Add only finalised, approved documents (files go in /public/documents). */
  reports: {
    annual: [] as PublishedDocument[],
    financial: [] as PublishedDocument[],
    projectUpdates: [] as PublishedDocument[],
  },

  /** Photography note shown in the footer. */
  photoNote:
    "Photographs on this website are illustrative stock images from Unsplash. They do not show people supported by the foundation.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/causes", label: "Our Causes" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
] as const;

export function hasContactDetails() {
  const c = site.contact;
  return Boolean(c.email || c.phone || c.whatsapp || c.address);
}

export function socialLinks() {
  const labels: Record<keyof typeof site.social, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    x: "X (Twitter)",
    youtube: "YouTube",
  };
  return (Object.keys(site.social) as (keyof typeof site.social)[])
    .filter((k) => site.social[k])
    .map((k) => ({ key: k, label: labels[k], href: site.social[k] }));
}

export function hasRegistration() {
  return Boolean(site.registration.number && site.registration.country);
}
