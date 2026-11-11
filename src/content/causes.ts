/**
 * The foundation's three causes. Copy describes needs and INTENDED support only:
 * no invented beneficiaries, totals or results. Update as programmes become verified.
 */
import { photos, type Photo } from "./photos";

export type CauseSlug = "orphan-care" | "children-education" | "medical-support";

export type Cause = {
  slug: CauseSlug;
  /** value sent with a donation to say where the gift should go */
  designation: string;
  title: string;
  short: string;
  summary: string;
  photo: Photo;
  secondPhoto: Photo;
  need: string[];
  support: { title: string; text: string }[];
  ways: { title: string; text: string; href: string; cta: string }[];
  /** Sample campaign progress (USD) for the portfolio demo */
  campaign: { name: string; raised: number; goal: number };
  /** What a gift could provide (sample, illustrative) */
  gifts: { amount: number; text: string }[];
  note?: string;
};

export const causes: Cause[] = [
  {
    slug: "orphan-care",
    designation: "orphan-care",
    campaign: { name: "Safe Homes Fund", raised: 18450, goal: 25000 },
    gifts: [
      { amount: 10, text: "a week of nutritious meals for one child" },
      { amount: 25, text: "a set of bedding and clothing for a child in care" },
      { amount: 50, text: "a month of food and essentials for a caregiver’s household" },
      { amount: 100, text: "a full year of school fees for one child" },
    ],
    title: "Orphan Care",
    short: "Daily necessities, safe care and the chance to keep learning.",
    summary:
      "Every child deserves to grow up safe, fed and cared for. We aim to support children who have lost one or both parents, and the families and caregivers who take them in.",
    photo: photos.orphanCare,
    secondPhoto: photos.motherChild,
    need: [
      "When a child loses a parent, the people who step in are often relatives or neighbours who are already stretching limited means. Food, clothing, school fees and health costs can quickly become more than one household can carry.",
      "Without steady support, children may miss school, go without basic necessities, or lose the stable home that helps them recover and grow.",
    ],
    support: [
      { title: "Daily necessities", text: "Food, clothing, bedding and hygiene items for children in care, provided through their caregivers." },
      { title: "Safe, stable care", text: "Support that helps children stay with family or trusted caregivers in their own community, wherever that is safe." },
      { title: "Keeping children in school", text: "Help with fees, uniforms and learning materials so that loss does not also mean leaving school." },
    ],
    ways: [
      { title: "Give to Orphan Care", text: "A one-time or monthly gift directed to this cause.", href: "/donate?cause=orphan-care", cta: "Donate to Orphan Care" },
      { title: "Give in kind", text: "Clothing, bedding or school supplies, by arrangement with the foundation.", href: "/get-involved?interest=in-kind#involvement-form", cta: "Offer supplies" },
      { title: "Volunteer", text: "Offer your time or professional skills.", href: "/get-involved?interest=volunteer#involvement-form", cta: "Volunteer with us" },
    ],
  },
  {
    slug: "children-education",
    designation: "children-education",
    campaign: { name: "Back-to-School Appeal 2026", raised: 9800, goal: 15000 },
    gifts: [
      { amount: 10, text: "exercise books and stationery for one pupil" },
      { amount: 25, text: "a school uniform and a pair of shoes" },
      { amount: 50, text: "a complete back-to-school kit, bag included" },
      { amount: 100, text: "school meals for a child for a whole term" },
    ],
    title: "Children’s Wellbeing & Education",
    short: "Learning materials, nutrition and access to opportunity.",
    summary:
      "A child who is well fed and has what they need to learn has a far better chance of reaching their potential. We aim to remove the everyday barriers that keep vulnerable children from thriving at school.",
    photo: photos.education,
    secondPhoto: photos.readingOutdoors,
    need: [
      "Many children who could do well at school are held back by things that seem small from the outside: no textbooks, no uniform, or an empty stomach in class.",
      "These barriers add up. They affect attendance, concentration and confidence, and they fall hardest on children whose families are already under pressure.",
    ],
    support: [
      { title: "Learning materials", text: "Books, stationery, uniforms and school bags so every child arrives ready to learn." },
      { title: "Nutrition", text: "Support for regular, nourishing meals, because children learn best when they are not hungry." },
      { title: "Access to opportunity", text: "Help with school fees, exam costs and mentoring that opens doors to further education." },
    ],
    ways: [
      { title: "Give to Wellbeing & Education", text: "A one-time or monthly gift directed to this cause.", href: "/donate?cause=children-education", cta: "Donate to Education" },
      { title: "Donate learning materials", text: "Books and school supplies, by arrangement with the foundation.", href: "/get-involved?interest=in-kind#involvement-form", cta: "Offer materials" },
      { title: "Partner with us", text: "Schools and companies can explore a partnership.", href: "/get-involved?interest=partnership#involvement-form", cta: "Become a partner" },
    ],
  },
  {
    slug: "medical-support",
    designation: "medical-support",
    campaign: { name: "Medical Support Fund", raised: 31200, goal: 40000 },
    gifts: [
      { amount: 10, text: "a course of essential medicines" },
      { amount: 25, text: "diagnostic tests for one patient" },
      { amount: 50, text: "a follow-up consultation and treatment" },
      { amount: 100, text: "a contribution towards a life-changing surgery" },
    ],
    title: "Medical Support",
    short: "Help with treatment costs and essential care.",
    summary:
      "No one should have to go without treatment because they cannot afford it. We aim to help people meet the cost of medical care they urgently need.",
    photo: photos.medical,
    secondPhoto: photos.doctor,
    need: [
      "For many families, a diagnosis brings a second worry: how to pay for treatment. Medicines, tests, surgery and hospital stays can cost far more than a household earns.",
      "When treatment is delayed or abandoned because of cost, illnesses that could be treated become more serious, and whole families can be pushed into hardship.",
    ],
    support: [
      { title: "Help with treatment costs", text: "Contributions towards medicines, procedures and hospital bills for people who cannot meet them alone." },
      { title: "Essential care", text: "Support for follow-up visits, tests and the basic care that helps recovery." },
      { title: "Careful, fair assessment", text: "Requests are reviewed directly with families and care providers, so support goes where it is genuinely needed." },
    ],
    ways: [
      { title: "Give to Medical Support", text: "A one-time or monthly gift directed to this cause.", href: "/donate?cause=medical-support", cta: "Donate to Medical Support" },
      { title: "Healthcare partners", text: "Hospitals, clinics and pharmacies can explore working with us.", href: "/get-involved?interest=partnership#involvement-form", cta: "Partner with us" },
      { title: "Volunteer your expertise", text: "Health professionals can offer their time and advice.", href: "/get-involved?interest=volunteer#involvement-form", cta: "Volunteer with us" },
    ],
    note:
      "To protect people’s privacy, please do not send medical records or personal health details through this website. If you or someone you know needs medical support, use the contact form to ask how to apply, and the foundation will explain the process.",
  },
];

export function getCause(slug: CauseSlug) {
  const cause = causes.find((c) => c.slug === slug);
  if (!cause) throw new Error(`Unknown cause: ${slug}`);
  return cause;
}

/** Choices offered on the donation form */
export const designations = [
  { value: "general", label: "Where it’s needed most", hint: "General support across all three causes" },
  ...causes.map((c) => ({ value: c.designation, label: c.title, hint: c.short })),
] as const;

export type Designation = "general" | CauseSlug;
export const designationValues = ["general", "orphan-care", "children-education", "medical-support"] as const;
export function designationLabel(v: string) {
  return designations.find((d) => d.value === v)?.label ?? "Where it’s needed most";
}
