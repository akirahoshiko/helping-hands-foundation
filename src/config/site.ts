/**
 * Helping Hands Foundation: organisation details.
 *
 * PORTFOLIO DEMO: Helping Hands Foundation is a fictional organisation created to
 * showcase this website. The registration, team, figures, stories and reports below
 * are SAMPLE CONTENT. `demo: true` shows a notice on every page saying so.
 * For a real organisation, replace every value with verified information and set demo to false.
 */
import type { StaticImageData } from "next/image";
import amara from "@/assets/team/amara.jpg";
import tunde from "@/assets/team/tunde.jpg";
import ngozi from "@/assets/team/ngozi.jpg";
import kelechi from "@/assets/team/kelechi.jpg";
import emeka from "@/assets/team/emeka.jpg";
import zainab from "@/assets/team/zainab.jpg";

export type TeamMember = { name: string; role: string; bio?: string; photo?: StaticImageData };
export type PublishedDocument = { title: string; date: string; href: string; summary?: string };
export type Milestone = { year: string; title: string; text: string };
export type Story = { slug: string; title: string; date: string; category: string; excerpt: string; body: string[]; photo: string };

export const site = {
  /** Portfolio demo mode: shows a "fictional organisation" notice site-wide. */
  demo: true,

  name: "Helping Hands Foundation",
  shortName: "Helping Hands",
  tagline: "A helping hand. A brighter tomorrow.",
  description:
    "Helping Hands Foundation supports orphans, vulnerable children in Africa, and people who need financial help with medical treatment.",

  /** Public site address, used for links, sitemaps and payment callbacks. NEXT_PUBLIC_SITE_URL overrides it. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://helping-hands-foundation.peaceomachunyiejiga.workers.dev",

  contact: {
    email: "peaceomachunyiejiga@gmail.com",
    phone: "+234 915 035 0731",
    whatsapp: "2349150350731",
    address: "Lagos, Nigeria",
    officeHours: "Mon–Fri, 9:00–17:00 WAT",
  },

  /** Social profiles: a link appears only when a real URL is supplied (no dead buttons). */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    youtube: "",
  },

  /** Forms fall back to this Formspree endpoint when no delivery env vars are set. */
  forms: {
    formspreeFallback: "https://formspree.io/f/xaeowwge",
  },

  /** Sample registration for the demo. */
  registration: {
    legalName: "Helping Hands Foundation (Incorporated Trustees)",
    country: "Nigeria",
    authority: "Sample registration (portfolio demo)",
    number: "HHF-DEMO-2021-0042",
    taxStatus: "",
  },

  founded: "2021",

  history: [
    "Helping Hands Foundation began in 2021 when a small group of friends in Lagos started paying school fees for children who had lost their parents. What began as a WhatsApp group of twelve people grew into a foundation with volunteers in three states.",
    "Today we work alongside families, schools and clinics to keep children safe, fed and learning, and to help people meet the cost of medical treatment they could not otherwise afford.",
  ],

  milestones: [
    { year: "2021", title: "A circle of friends", text: "Twelve volunteers pool their savings to cover school fees for nine children." },
    { year: "2022", title: "Registered as a foundation", text: "Helping Hands becomes a registered foundation with an independent board of trustees." },
    { year: "2023", title: "Medical support fund", text: "The first fund to help families meet hospital and medicine costs opens." },
    { year: "2024", title: "Back-to-school drives", text: "Annual drives provide uniforms, books and bags to children across Lagos and Ogun." },
    { year: "2025", title: "First annual report", text: "We publish our first full annual report and financial summary." },
  ] as Milestone[],

  team: [
    { name: "Amara Okafor", role: "Founder & Executive Director", bio: "Former teacher who started the foundation’s first school-fees circle in 2021.", photo: amara },
    { name: "Tunde Adebayo", role: "Director of Programmes", bio: "Leads Orphan Care and the back-to-school drives with partner schools.", photo: tunde },
    { name: "Ngozi Eze", role: "Finance & Transparency Lead", bio: "Chartered accountant who prepares our reports and financial summaries.", photo: ngozi },
    { name: "Kelechi Nwosu", role: "Education Programmes Lead", bio: "Works with teachers and caregivers on learning materials and mentoring.", photo: kelechi },
    { name: "Dr. Emeka Obi", role: "Medical Support Adviser", bio: "Physician who reviews requests for help with treatment costs.", photo: emeka },
    { name: "Zainab Bello", role: "Volunteers & Community Coordinator", bio: "Welcomes new volunteers and keeps our community partners connected.", photo: zainab },
  ] as TeamMember[],

  /** Sample impact figures shown on the home page (labelled as sample in demo mode). */
  impact: [
    { value: 1240, suffix: "+", label: "Children supported" },
    { value: 380, suffix: "", label: "Families reached" },
    { value: 96, suffix: "", label: "Medical bills assisted" },
    { value: 150, suffix: "+", label: "Active volunteers" },
  ],

  /** Sample breakdown of spending (Annual Report 2025). Must add up to 100. */
  spending: [
    { label: "Programmes", value: 82 },
    { label: "Operations", value: 12 },
    { label: "Fundraising", value: 6 },
  ],

  appeal: {
    title: "Back-to-School Appeal 2026",
    text: "Help 500 children start the new term with books, uniforms and bags.",
    href: "/donate?cause=children-education",
  },

  reports: {
    annual: [
      { title: "Annual Report 2025", date: "March 2026", href: "/transparency/annual-report-2025", summary: "Programmes, finances and lessons from our fifth year" },
    ] as PublishedDocument[],
    financial: [
      { title: "Financial summary 2025", date: "March 2026", href: "/transparency/annual-report-2025#finances", summary: "Income, spending and reserves" },
    ] as PublishedDocument[],
    projectUpdates: [
      { title: "Back-to-school drive: term report", date: "October 2025", href: "/news/back-to-school-drive-2025" },
      { title: "Medical support fund: first-half update", date: "July 2025", href: "/news/medical-fund-update" },
    ] as PublishedDocument[],
  },

  photoNote:
    "Photographs on this website are illustrative stock images from Unsplash. They do not show people supported by the foundation.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/causes", label: "Our Causes" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/news", label: "News" },
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
