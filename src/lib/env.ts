import "server-only";

/**
 * Server-side configuration read from environment variables.
 * Secrets never leave the server: nothing here is imported by client components.
 */

export type PaymentConfig =
  | { active: false; reason: "not-configured" | "live-key-blocked" | "unsupported-provider"; recurring: false; testMode: true }
  | { active: true; provider: "paystack"; secretKey: string; recurring: boolean; testMode: boolean };

export function getPaymentConfig(): PaymentConfig {
  const provider = (process.env.PAYMENT_PROVIDER || "paystack").toLowerCase();
  const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim() || "";

  if (provider !== "paystack") return { active: false, reason: "unsupported-provider", recurring: false, testMode: true };
  if (!secretKey) return { active: false, reason: "not-configured", recurring: false, testMode: true };

  const testMode = secretKey.startsWith("sk_test_");
  // Live keys are refused unless the foundation explicitly approves going live.
  if (!testMode && process.env.PAYMENTS_ALLOW_LIVE !== "true") {
    return { active: false, reason: "live-key-blocked", recurring: false, testMode: true };
  }

  return {
    active: true,
    provider: "paystack",
    secretKey,
    // Monthly giving needs USD subscription plans enabled on the Paystack account. Off until confirmed.
    recurring: process.env.PAYSTACK_RECURRING_ENABLED === "true",
    testMode,
  };
}

/** What the browser is allowed to know about payments (no secrets). */
export function publicPaymentStatus() {
  const c = getPaymentConfig();
  return { active: c.active, recurring: c.recurring, testMode: c.testMode };
}

export type FormDelivery =
  | { mode: "resend"; apiKey: string; to: string; from: string }
  | { mode: "formspree"; endpoint: string }
  | { mode: "none" };

export function getFormDelivery(): FormDelivery {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.FORMS_TO_EMAIL?.trim();
  const from = process.env.FORMS_FROM_EMAIL?.trim();
  if (resendKey && to && from) return { mode: "resend", apiKey: resendKey, to, from };
  const endpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (endpoint && /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint)) return { mode: "formspree", endpoint };
  return { mode: "none" };
}

export function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
