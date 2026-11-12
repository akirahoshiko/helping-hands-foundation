import { randomBytes } from "node:crypto";
import { getPaymentConfig, siteUrl } from "@/lib/env";
import { clientIp, rateLimited, sameOrigin } from "@/lib/guard";
import { initializeTransaction, monthlyPlanFor, PaystackError } from "@/lib/payments/paystack";
import { donationSchema, fieldErrors } from "@/lib/validation";

/**
 * Starts a donation. The browser sends validated details; the server re-validates,
 * creates the Paystack transaction with the secret key, and returns only the hosted
 * checkout URL. Card details are entered on Paystack's page, never on this site.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false, error: "forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid", message: "We couldn't read your donation details. Please try again." }, { status: 400 });
  }

  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, error: "invalid", fields: fieldErrors(parsed.error) }, { status: 422 });
  const donation = parsed.data;

  const config = getPaymentConfig();
  if (!config.active) {
    // Payments not configured: nothing is charged and nothing is recorded as a donation.
    return Response.json({ ok: false, error: "payments-inactive", reason: config.reason }, { status: 503 });
  }

  if (donation.frequency === "monthly" && !config.recurring) {
    return Response.json(
      { ok: false, error: "recurring-unavailable", message: "Monthly giving isn't available yet. Please choose a one-time gift." },
      { status: 422 },
    );
  }

  if (rateLimited(`donation:${clientIp(req)}`, 10)) {
    return Response.json({ ok: false, error: "rate-limited", message: "Too many attempts in a short time. Please wait a few minutes and try again." }, { status: 429 });
  }

  const base = siteUrl();
  const reference = `HHF-${Date.now().toString(36)}-${randomBytes(5).toString("hex")}`.toUpperCase();

  try {
    const planCode = donation.frequency === "monthly" ? await monthlyPlanFor(config.secretKey, donation.amount) : undefined;
    const tx = await initializeTransaction({
      secretKey: config.secretKey,
      donation,
      reference,
      planCode,
      callbackUrl: `${base}/donate/complete`,
      cancelUrl: `${base}/donate?status=cancelled`,
    });
    return Response.json({ ok: true, checkoutUrl: tx.authorization_url, reference: tx.reference, testMode: config.testMode });
  } catch (e) {
    const detail = e instanceof PaystackError ? e.message : "unknown";
    console.error("[donations] initialize failed:", detail);
    // Most common cause in setup: USD not yet enabled on the Paystack account.
    const currencyIssue = /currency/i.test(detail);
    return Response.json(
      {
        ok: false,
        error: "provider-error",
        message: currencyIssue
          ? "Payments in US dollars aren't enabled yet, so we couldn't start your checkout. No money was taken."
          : "We couldn't connect to the secure checkout just now. No money was taken. Please try again in a few minutes.",
      },
      { status: 502 },
    );
  }
}
