/**
 * News & stories. PORTFOLIO DEMO: these are sample articles about a fictional
 * foundation's programmes. They describe activities, never identifiable people.
 */
import { photos, type Photo } from "./photos";

export type Story = {
  slug: string;
  title: string;
  date: string;
  category: "Programme update" | "Volunteers" | "Medical support" | "Announcement";
  excerpt: string;
  photo: Photo;
  body: string[];
};

export const stories: Story[] = [
  {
    slug: "back-to-school-drive-2025",
    title: "Back to school: 420 children start the term ready to learn",
    date: "October 2025",
    category: "Programme update",
    excerpt: "Our 2025 drive delivered uniforms, books and school bags to children in partner schools across Lagos and Ogun.",
    photo: photos.education,
    body: [
      "Every September, families who are already stretched face the same question: how to pay for uniforms, books and bags before the first day of term. This year our back-to-school drive helped 420 children arrive ready to learn.",
      "Working with six partner schools, our volunteers packed and delivered kits containing a uniform, exercise books, a reading book, stationery and a school bag. Head teachers identified the children most in need, and every kit was delivered through the school so that no child was singled out.",
      "The drive was funded by gifts to our Children’s Wellbeing & Education cause, plus in-kind donations of books from two local publishers. Our 2026 appeal aims to reach 500 children.",
    ],
  },
  {
    slug: "medical-fund-update",
    title: "Medical support fund: how we review every request",
    date: "July 2025",
    category: "Medical support",
    excerpt: "Halfway through the year, we explain how requests for help with treatment costs are assessed, and what we have learned.",
    photo: photos.medical,
    body: [
      "Since opening our medical support fund, we have received far more requests than we can meet. That makes a fair and careful review process essential.",
      "Each request is reviewed by our medical adviser together with the treating hospital or clinic. We confirm the diagnosis, the treatment plan and the cost directly with the provider, and payments go straight to the provider, never to individuals.",
      "In the first half of 2025, the fund contributed to 41 hospital bills, most of them for surgery, maternal care and treatment for children. To protect privacy, we never publish patients’ names, photographs or medical details.",
    ],
  },
  {
    slug: "volunteer-health-day",
    title: "A Saturday of service: our first community health day",
    date: "May 2025",
    category: "Volunteers",
    excerpt: "Thirty volunteers, two clinics and one long queue: what we learned from our first free health screening day.",
    photo: photos.gathering,
    body: [
      "In May, thirty volunteers joined nurses from two partner clinics for our first community health day, offering free blood-pressure and blood-sugar checks, eye tests and health advice.",
      "More than 200 people came through the doors. Anyone who needed further care was referred to a partner clinic, and several referrals were later supported by our medical fund.",
      "We are planning two more health days in 2026. If you are a health professional who would like to help, please register your interest on our Get Involved page.",
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
