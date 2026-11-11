import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { designationLabel } from "@/content/causes";
import { getPaymentConfig } from "@/lib/env";
import { PaystackError, verifyTransaction, type VerifiedPayment } from "@/lib/payments/paystack";
import { CURRENCY, formatUsd } from "@/lib/validation";
import { ButtonLink, Notice } from "@/components/ui";

export const metadata: Metadata = {
  title: "Donation status",
  robots: { index: false, follow: false },
};

export default function CompletePage({ searchParams }: PageProps<"/donate/complete">) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-site max-w-3xl">
        <Suspense fallback={<p className="text-muted" role="status">Checking your payment with Paystack…</p>}>
          <Result searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}

async function Result({ searchParams }: { searchParams: PageProps<"/donate/complete">["searchParams"] }) {
  const q = await searchParams;
  const raw = (typeof q.reference === "string" ? q.reference : typeof q.trxref === "string" ? q.trxref : "").trim();
  const reference = /^[A-Za-z0-9.=-]{6,100}$/.test(raw) ? raw : "";

  const config = getPaymentConfig();
  if (!config.active) {
    return (
      <Status title="Online payments are not active" tone="warn">
        <p>The foundation hasn’t switched on online payments yet, so no payment can be confirmed here. If you reached this page by mistake, no money was taken.</p>
      </Status>
    );
  }
  if (!reference) {
    return (
      <Status title="We couldn’t find a payment to check" tone="warn">
        <p>This page confirms donations after checkout. It needs the payment reference that Paystack adds to the address. If you were charged, your email receipt from Paystack contains the reference: please contact us with it.</p>
      </Status>
    );
  }

  let payment: VerifiedPayment;
  try {
    // The redirect itself proves nothing: we always ask Paystack directly.
    payment = await verifyTransaction(config.secretKey, reference);
  } catch (e) {
    const notFound = e instanceof PaystackError && (e.status === 400 || e.status === 404);
    return (
      <Status title={notFound ? "We couldn’t find that payment" : "We couldn’t confirm your payment yet"} tone="warn">
        <p>
          {notFound
            ? "Paystack has no record of this payment reference. If you completed a payment, please contact us with your email receipt."
            : "We couldn’t reach the payment provider to confirm your donation. Please refresh this page in a minute. Don’t pay again: if a payment went through, it will show here."}
        </p>
        <p className="mt-2 text-[0.92rem]">Reference: <code className="break-all">{reference}</code></p>
      </Status>
    );
  }

  if (payment.status === "success" && payment.currency === CURRENCY) {
    return (
      <div role="status">
        <p className="eyebrow">Donation received</p>
        <h1 className="mt-4 text-[2.6rem] sm:text-[3.4rem]">
          Thank you. <span className="italic text-forest-700">Your helping hand has arrived.</span>
        </h1>
        <p className="mt-5 text-[1.12rem] text-muted">
          Paystack has confirmed your gift of <strong className="text-forest-900">{formatUsd(payment.amount)} {payment.currency}</strong>
          {payment.frequency === "monthly" ? " as a monthly donation" : ""}
          {payment.designation ? <> to <strong className="text-forest-900">{designationLabel(payment.designation)}</strong></> : null}. A receipt has been sent to {payment.email ? <strong className="text-forest-900">{payment.email}</strong> : "your email address"}.
        </p>
        <dl className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-cream-200 bg-white p-6 text-[0.98rem] sm:grid-cols-2">
          <div><dt className="text-muted">Reference</dt><dd className="font-semibold break-all">{payment.reference}</dd></div>
          {payment.paidAt && <div><dt className="text-muted">Paid</dt><dd className="font-semibold">{new Date(payment.paidAt).toUTCString().replace(" GMT", " UTC")}</dd></div>}
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/causes" variant="primary">See our causes</ButtonLink>
          <ButtonLink href="/get-involved" variant="outline">Other ways to help</ButtonLink>
        </div>
      </div>
    );
  }

  const messages: Record<string, { title: string; body: string }> = {
    abandoned: { title: "Your payment wasn’t completed", body: "The checkout was closed before payment, so no money was taken. You can try again whenever you’re ready." },
    failed: { title: "Your payment didn’t go through", body: "The payment was declined or failed, and no money was taken. You can try again, perhaps with a different card." },
    pending: { title: "Your payment is still processing", body: "Paystack hasn’t finished confirming this payment. Please refresh this page in a few minutes. Don’t pay again in the meantime." },
    reversed: { title: "This payment was reversed", body: "The payment was reversed, so it is not counted as a donation. If you think this is a mistake, please contact us with the reference below." },
  };
  const m = messages[payment.status] ?? { title: "We couldn’t confirm this payment", body: "The payment isn’t confirmed as successful, so we can’t count it as a donation. Please contact us with the reference below." };
  return (
    <Status title={m.title} tone={payment.status === "pending" ? "info" : "warn"}>
      <p>{m.body}</p>
      <p className="mt-2 text-[0.92rem]">Reference: <code className="break-all">{payment.reference}</code></p>
    </Status>
  );
}

function Status({ title, tone, children }: { title: string; tone: "warn" | "info"; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">Donation status</p>
      <h1 className="mt-4 text-[2.4rem] sm:text-[3rem]">{title}</h1>
      <div className="mt-6">
        <Notice tone={tone} role="status">{children}</Notice>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/donate" variant="gold">Back to the donation form</ButtonLink>
        <Link href="/contact" className="inline-flex min-h-12 items-center font-semibold text-forest-800 underline underline-offset-4">Contact us</Link>
      </div>
    </div>
  );
}
