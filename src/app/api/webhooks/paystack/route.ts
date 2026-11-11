import { getPaymentConfig } from "@/lib/env";
import { alreadyProcessed, forgetProcessed } from "@/lib/guard";
import { isValidSignature, verifyTransaction } from "@/lib/payments/paystack";

/**
 * Paystack webhook. Set this URL in Paystack → Settings → API Keys & Webhooks:
 *   https://<your-domain>/api/webhooks/paystack
 *
 * - Rejects any request whose x-paystack-signature does not match.
 * - Acknowledges repeat deliveries of the same event without processing them twice.
 * - Re-verifies successful charges with the Paystack API before trusting them.
 *
 * Add your own record-keeping in `recordDonation` (e.g. a database insert or a
 * notification email). Use the transaction reference as a unique key there too, so
 * repeats are safe even across server restarts.
 */
export async function POST(req: Request) {
  const config = getPaymentConfig();
  if (!config.active) return new Response("payments not configured", { status: 503 });

  const raw = await req.text();
  if (!isValidSignature(raw, req.headers.get("x-paystack-signature"), config.secretKey)) {
    return new Response("invalid signature", { status: 401 });
  }

  let event: { event?: string; data?: { id?: number | string; reference?: string; status?: string; subscription_code?: string } };
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("invalid payload", { status: 400 });
  }

  const name = event.event || "unknown";
  const key = `${name}:${event.data?.reference || event.data?.subscription_code || event.data?.id || raw.length}`;
  if (alreadyProcessed(key)) return new Response("ok (duplicate)", { status: 200 });

  try {
    if (name === "charge.success" && event.data?.reference) {
      const verified = await verifyTransaction(config.secretKey, event.data.reference);
      if (verified.status === "success") await recordDonation(verified);
      else console.warn("[webhook] charge.success not confirmed by verify:", verified.reference, verified.status);
    } else if (name.startsWith("subscription.") || name.startsWith("invoice.")) {
      console.info("[webhook] subscription event:", name, event.data?.subscription_code || "");
    } else {
      console.info("[webhook] ignored event:", name);
    }
  } catch (e) {
    console.error("[webhook] processing error:", e instanceof Error ? e.message : e);
    // Respond 500 so Paystack retries later, and clear the duplicate guard so the retry is processed.
    forgetProcessed(key);
    return new Response("temporary error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}

async function recordDonation(p: Awaited<ReturnType<typeof verifyTransaction>>) {
  // Replace with durable storage or a notification once the foundation chooses one.
  console.info("[webhook] confirmed donation", { reference: p.reference, amount: p.amount, currency: p.currency, designation: p.designation, frequency: p.frequency });
}
