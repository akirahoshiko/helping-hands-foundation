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
      { amount: 10, text: "a week of proper meals for one child" },
      { amount: 25, text: "new bedding and clothes for a child" },
      { amount: 50, text: "a month of food and basics for a foster family" },
      { amount: 100, text: "a full year of school fees for one child" },
    ],
    title: "Orphan Care",
    short: "Food, clothes, school fees and a safe home for children who have lost a parent.",
    summary:
      "When a child loses a parent, it's usually an aunt, a grandmother or a neighbour who takes them in. We help those families with the everyday costs so the child can stay in a home they know and keep going to school.",
    photo: photos.orphanCare,
    secondPhoto: photos.motherChild,
    need: [
      "Most of the children we meet are already living with relatives. The love is there. The money often isn't. One more child at the table means more food, more clothes and another set of school fees, and for a family that was already stretched, something has to give.",
      "Too often, what gives is school. Children drop out to help at home or because the fees simply can't be found. We step in before that happens.",
    ],
    support: [
      { title: "Food and basics", text: "Monthly food packs, clothes, bedding and toiletries, given to the family that is caring for the child." },
      { title: "Staying with family", text: "We support relatives and foster carers so children can grow up in their own community instead of an institution." },
      { title: "School fees", text: "We pay fees, uniforms and books straight to the school, every term, for as long as the child needs it." },
    ],
    ways: [
      { title: "Give to Orphan Care", text: "A one-off gift or a monthly one, set aside for orphan care.", href: "/donate?cause=orphan-care", cta: "Donate" },
      { title: "Send supplies", text: "Clothes, bedding and school things. Get in touch first so we can tell you what's needed.", href: "/get-involved?interest=in-kind#involvement-form", cta: "Offer supplies" },
      { title: "Volunteer", text: "Help with home visits, school drives or behind the scenes.", href: "/get-involved?interest=volunteer#involvement-form", cta: "Volunteer" },
    ],
  },
  {
    slug: "children-education",
    designation: "children-education",
    campaign: { name: "Back to School 2026", raised: 9800, goal: 15000 },
    gifts: [
      { amount: 10, text: "exercise books, pens and a maths set for one pupil" },
      { amount: 25, text: "a school uniform and a pair of shoes" },
      { amount: 50, text: "a full back-to-school kit, bag and all" },
      { amount: 100, text: "school lunches for a child for a whole term" },
    ],
    title: "Children’s Education",
    short: "Uniforms, books, school meals and extra lessons for children who'd otherwise fall behind.",
    summary:
      "Plenty of bright kids struggle at school for reasons that have nothing to do with ability. No uniform, no textbooks, nothing to eat since last night. We sort out those things so they can get on with learning.",
    photo: photos.education,
    secondPhoto: photos.readingOutdoors,
    need: [
      "Teachers in our partner schools tell us the same thing every year. The children who miss the most school aren't the ones who don't care. They're the ones sent home for not having a uniform, or who can't concentrate because they haven't eaten.",
      "It doesn't take much to change that. A uniform, a bag of books and a hot lunch make a big difference to whether a child turns up and keeps up.",
    ],
    support: [
      { title: "School kits", text: "Uniforms, shoes, bags, books and stationery, handed out through the school at the start of each year." },
      { title: "School lunches", text: "We fund lunches at partner schools so children aren't trying to learn on an empty stomach." },
      { title: "Extra lessons", text: "After-school tutoring and exam fees for children who are falling behind or about to sit big exams." },
    ],
    ways: [
      { title: "Give to Education", text: "A one-off gift or a monthly one, for school kits, lunches and lessons.", href: "/donate?cause=children-education", cta: "Donate" },
      { title: "Donate books", text: "New or good-condition books and school supplies. Message us before sending.", href: "/get-involved?interest=in-kind#involvement-form", cta: "Offer books" },
      { title: "Partner with us", text: "Schools and businesses can sponsor a class or a whole school drive.", href: "/get-involved?interest=partnership#involvement-form", cta: "Talk to us" },
    ],
  },
  {
    slug: "medical-support",
    designation: "medical-support",
    campaign: { name: "Medical Fund", raised: 31200, goal: 40000 },
    gifts: [
      { amount: 10, text: "a course of medicine for a sick child" },
      { amount: 25, text: "lab tests and scans for one patient" },
      { amount: 50, text: "a specialist appointment and follow-up treatment" },
      { amount: 100, text: "part of the cost of an operation" },
    ],
    title: "Medical Support",
    short: "Help paying hospital bills, medicines and operations when a family can't.",
    summary:
      "Getting sick is hard enough without wondering how to pay for it. Our medical fund pays towards hospital bills, medicines and operations for families who have run out of options.",
    photo: photos.medical,
    secondPhoto: photos.doctor,
    need: [
      "In Nigeria most people pay for healthcare out of their own pocket. A single operation or a long hospital stay can cost more than a family earns in a year, so treatment gets delayed, or stopped halfway.",
      "We've seen what happens when it does. Something that could have been treated early becomes serious, and the whole family ends up in debt trying to fix it.",
    ],
    support: [
      { title: "Hospital bills", text: "We pay towards surgery, admissions and treatment, always directly to the hospital." },
      { title: "Medicines and tests", text: "Prescriptions, scans and lab work, including the follow-up visits people often skip because of cost." },
      { title: "Checked by a doctor", text: "Our medical adviser confirms every case with the hospital before we pay, so the money goes where it's really needed." },
    ],
    ways: [
      { title: "Give to the Medical Fund", text: "A one-off gift or a monthly one, for patients’ treatment costs.", href: "/donate?cause=medical-support", cta: "Donate" },
      { title: "Hospitals and pharmacies", text: "If you run a clinic or pharmacy and want to work with us, let's talk.", href: "/get-involved?interest=partnership#involvement-form", cta: "Partner with us" },
      { title: "Health professionals", text: "Doctors and nurses can volunteer at our community health days.", href: "/get-involved?interest=volunteer#involvement-form", cta: "Volunteer" },
    ],
    note:
      "Patients come to us through our partner hospitals and clinics, who refer cases they know need help. Please don't send medical records or health details through this website.",
  },
];

export function getCause(slug: CauseSlug) {
  const cause = causes.find((c) => c.slug === slug);
  if (!cause) throw new Error(`Unknown cause: ${slug}`);
  return cause;
}

/** Choices offered on the donation form */
export const designations = [
  { value: "general", label: "Wherever it’s needed most", hint: "We put it where the need is biggest that month" },
  ...causes.map((c) => ({ value: c.designation, label: c.title, hint: c.short })),
] as const;

export type Designation = "general" | CauseSlug;
export const designationValues = ["general", "orphan-care", "children-education", "medical-support"] as const;
export function designationLabel(v: string) {
  return designations.find((d) => d.value === v)?.label ?? "Where it’s needed most";
}
