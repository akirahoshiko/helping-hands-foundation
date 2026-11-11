/**
 * Validation rules shared by the browser (instant feedback) and the server (the real check).
 */
import { z } from "zod";
import { designationValues } from "@/content/causes";

export const CURRENCY = "USD" as const;
export const SUGGESTED_AMOUNTS = [10, 25, 50, 100] as const;
export const MIN_DONATION = 5;
export const MAX_DONATION = 10000;

const name = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(100, "Please keep your name under 100 characters.");

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .max(254, "That email address is too long.")
  .pipe(z.email("Please enter a valid email address."));

export const donationSchema = z.object({
  amount: z
    .number({ error: "Please choose or enter an amount." })
    .min(MIN_DONATION, `The minimum gift is $${MIN_DONATION}.`)
    .max(MAX_DONATION, `For gifts over $${MAX_DONATION.toLocaleString("en-US")}, please contact us directly.`)
    .refine((n) => Math.abs(n * 100 - Math.round(n * 100)) < 1e-6, "Please use no more than two decimal places."),
  frequency: z.enum(["one-time", "monthly"], { error: "Please choose one-time or monthly." }),
  designation: z.enum(designationValues, { error: "Please choose where your gift should go." }),
  name,
  email,
  message: z.string().trim().max(500, "Please keep your message under 500 characters.").optional().default(""),
});
export type DonationInput = z.infer<typeof donationSchema>;

export const interestValues = ["volunteer", "partnership", "in-kind", "fundraising", "other"] as const;
export const interestLabels: Record<(typeof interestValues)[number], string> = {
  volunteer: "Volunteering",
  partnership: "Corporate partnership",
  "in-kind": "In-kind contribution",
  fundraising: "Fundraising for the foundation",
  other: "Something else",
};

export const enquirySchema = z.object({
  kind: z.enum(["contact", "involvement"]),
  name,
  email,
  interest: z.enum(interestValues).optional(),
  subject: z.string().trim().max(120, "Please keep the subject under 120 characters.").optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (at least 10 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
  /** spam trap: must stay empty */
  website: z.string().optional().default(""),
  /** time the form was shown (ms since epoch), used to reject instant bot submissions */
  startedAt: z.number().optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email,
  website: z.string().optional().default(""),
  startedAt: z.number().optional(),
});

/** Turn zod issues into { field: message } for the form UI */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
}
