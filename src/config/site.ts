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
  /** Demo mode shows "sample content" notices across the site. Off for the published site. */
  demo: false,

  name: "Helping Hands Foundation",
  shortName: "Helping Hands",
  tagline: "A helping hand. A brighter tomorrow.",
  description:
    "We look after orphans and vulnerable children in Nigeria, and help families pay for medical treatment they can't afford.",

  /** Public site address, used for links, sitemaps and payment callbacks. NEXT_PUBLIC_SITE_URL overrides it. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://helping-hands-foundation.peaceomachunyiejiga.workers.dev",

  contact: {
    email: "peaceomachunyiejiga@gmail.com",
    phone: "+234 915 035 0731",
    whatsapp: "2349150350731",
    address: "Lagos, Nigeria",
    officeHours: "Monday to Friday, 9am to 5pm (WAT)",
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

  /** Legal registration. Shown on About and Transparency only when a real number is filled in. */
  registration: {
    legalName: "",
    country: "",
    authority: "",
    number: "",
    taxStatus: "",
  },

  founded: "2021",

  history: [
    "It started in 2021 with a WhatsApp group. Twelve friends in Lagos each put in what they could spare every month and used it to pay school fees for nine children who had lost a parent. Nobody planned to start a charity. The money just kept coming in, and so did the requests.",
    "Five years on, we still work the same way, only bigger. We pay school fees, buy uniforms and books, keep food on the table for families caring for orphaned children, and help cover hospital bills when someone is sick and can't pay.",
  ],

  milestones: [
    { year: "2021", title: "Nine school fees", text: "Twelve friends pool their money and pay for nine children to stay in school." },
    { year: "2022", title: "Trustees on board", text: "We set up a board of trustees so the money is overseen by people outside the team." },
    { year: "2023", title: "Hospital bills", text: "We start paying towards hospital and medicine costs for families who can't cover them." },
    { year: "2024", title: "First school drive", text: "Volunteers hand out uniforms, books and bags at schools in Lagos and Ogun." },
    { year: "2025", title: "First annual report", text: "We publish a full report and a breakdown of every naira and dollar spent." },
  ] as Milestone[],

  team: [
    { name: "Amara Okafor", role: "Founder and Executive Director", bio: "Taught primary school for eight years. Started the WhatsApp group that became Helping Hands.", photo: amara },
    { name: "Tunde Adebayo", role: "Programmes Director", bio: "Runs orphan care and the school drives, and spends most weeks visiting families and partner schools.", photo: tunde },
    { name: "Ngozi Eze", role: "Finance Lead", bio: "Chartered accountant. Keeps the books, pays every bill directly and writes up our yearly accounts.", photo: ngozi },
    { name: "Kelechi Nwosu", role: "Education Lead", bio: "Works with teachers and caregivers on books, supplies and after-school tutoring.", photo: kelechi },
    { name: "Dr. Emeka Obi", role: "Medical Adviser", bio: "Doctor in Lagos. Checks every request for medical help with the hospital before we pay.", photo: emeka },
    { name: "Zainab Bello", role: "Volunteer Coordinator", bio: "The first person new volunteers meet. Organises our health days and school drives.", photo: zainab },
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
    title: "Back to School 2026",
    text: "We're aiming to kit out 500 children for the new term.",
    href: "/donate?cause=children-education",
  },

  reports: {
    annual: [
      { title: "Annual Report 2025", date: "March 2026", href: "/transparency/annual-report-2025", summary: "What we did in our fifth year and what it cost" },
    ] as PublishedDocument[],
    financial: [
      { title: "2025 accounts summary", date: "March 2026", href: "/transparency/annual-report-2025#finances", summary: "Money in, money out and what's left over" },
    ] as PublishedDocument[],
    projectUpdates: [
      { title: "School drive, September 2025", date: "October 2025", href: "/news/back-to-school-drive-2025" },
      { title: "Medical fund, half-year update", date: "July 2025", href: "/news/medical-fund-update" },
    ] as PublishedDocument[],
  },

  photoNote: "Some photographs are stock images.",
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
