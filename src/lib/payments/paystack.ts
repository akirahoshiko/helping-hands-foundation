import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { CURRENCY, type DonationInput } from "@/lib/validation";

/**
 * Paystack integration (server only).
 * Docs: https://paystack.com/docs/api/transaction/ and https://paystack.com/docs/payments/subscriptions/
 * Amounts are sent in the currency's subunit (US cents).
 */

const API = "https://api.paystack.co";

export class PaystackError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

async function paystack<T>(secretKey: string, path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json", ...(init.headers || {}) },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new PaystackError("Could not reach the payment provider.");
  }
  let body: { status?: boolean; message?: string; data?: unknown } = {};
  try {
    body = await res.json();
  } catch {
    /* non-JSON error */
  }
  if (!res.ok || body.status === false) {
    throw new PaystackError(body.message || `Payment provider error (${res.status}).`, res.status);
  }
  return body.data as T;
}

export const toCents = (amount: number) => Math.round(amount * 100);

type Plan = { plan_code: string; amount: number; currency: string; interval: string; is_deleted?: boolean; is_archived?: boolean };

/** Reuse a monthly USD plan for this amount, or create one. */
export async function monthlyPlanFor(secretKey: string, amount: number) {
  const cents = toCents(amount);
  const existing = await paystack<Plan[]>(secretKey, `/plan?interval=monthly&amount=${cents}&perPage=50`);
  const match = existing.find((p) => p.currency === CURRENCY && p.amount === cents && p.interval === "monthly" && !p.is_deleted && !p.is_archived);
  if (match) return match.plan_code;
  const created = await paystack<Plan>(secretKey, "/plan", {
    method: "POST",
    body: JSON.stringify({ name: `Monthly gift ${amount.toFixed(2)} ${CURRENCY}`, interval: "monthly", amount: cents, currency: CURRENCY }),
  });
  return created.plan_code;
}

export async function initializeTransaction(opts: {
  secretKey: string;
  donation: DonationInput;
  reference: string;
  callbackUrl: string;
  cancelUrl: string;
  planCode?: string;
}) {
  const { donation } = opts;
  const metadata = {
    designation: donation.designation,
    frequency: donation.frequency,
    donor_name: donation.name,
    donor_message: donation.message || "",
    cancel_action: opts.cancelUrl, // where Paystack's checkout sends the donor if they cancel
    custom_fields: [
      { display_name: "Donor name", variable_name: "donor_name", value: donation.name },
      { display_name: "Designation", variable_name: "designation", value: donation.designation },
      { display_name: "Frequency", variable_name: "frequency", value: donation.frequency },
    ],
  };
  return paystack<{ authorization_url: string; access_code: string; reference: string }>(opts.secretKey, "/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: donation.email,
      amount: toCents(donation.amount),
      currency: CURRENCY,
      reference: opts.reference,
      callback_url: opts.callbackUrl,
      metadata: JSON.stringify(metadata),
      ...(opts.planCode ? { plan: opts.planCode } : {}),
    }),
  });
}

export type VerifiedPayment = {
  status: "success" | "failed" | "abandoned" | "pending" | "reversed" | "unknown";
  reference: string;
  amount: number; // major units
  currency: string;
  email?: string;
  designation?: string;
  frequency?: string;
  paidAt?: string;
};

type PaystackTx = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paid_at?: string | null;
  customer?: { email?: string };
  metadata?: unknown;
};

function readMetadata(m: unknown): Record<string, unknown> {
  if (!m) return {};
  if (typeof m === "string") {
    try {
      return JSON.parse(m);
    } catch {
      return {};
    }
  }
  return typeof m === "object" ? (m as Record<string, unknown>) : {};
}

/** Ask Paystack (server to server) for the real state of a transaction. */
export async function verifyTransaction(secretKey: string, reference: string): Promise<VerifiedPayment> {
  const tx = await paystack<PaystackTx>(secretKey, `/transaction/verify/${encodeURIComponent(reference)}`);
  const meta = readMetadata(tx.metadata);
  const known = ["success", "failed", "abandoned", "pending", "reversed"] as const;
  const status = (known as readonly string[]).includes(tx.status) ? (tx.status as VerifiedPayment["status"]) : tx.status === "ongoing" || tx.status === "processing" || tx.status === "queued" ? "pending" : "unknown";
  return {
    status,
    reference: tx.reference,
    amount: tx.amount / 100,
    currency: tx.currency,
    email: tx.customer?.email,
    designation: typeof meta.designation === "string" ? meta.designation : undefined,
    frequency: typeof meta.frequency === "string" ? meta.frequency : undefined,
    paidAt: tx.paid_at || undefined,
  };
}

/** Webhook signature: HMAC-SHA512 of the raw request body, keyed with the secret key, sent as x-paystack-signature. */
export function isValidSignature(rawBody: string, signature: string | null, secretKey: string) {
  if (!signature) return false;
  const expected = createHmac("sha512", secretKey).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
