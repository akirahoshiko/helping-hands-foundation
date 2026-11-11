"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { designations, designationLabel } from "@/content/causes";
import { CURRENCY, MAX_DONATION, MIN_DONATION, SUGGESTED_AMOUNTS, donationSchema, fieldErrors, formatUsd } from "@/lib/validation";
import { Notice, buttonClass } from "./ui";

type Status = { active: boolean; recurring: boolean; testMode: boolean };
type Step = "form" | "review" | "redirecting" | "demo";

export function DonateForm({ payments }: { payments: Status }) {
  const params = useSearchParams();
  const initialCause = designations.some((d) => d.value === params.get("cause")) ? (params.get("cause") as string) : "general";
  const cancelled = params.get("status") === "cancelled";

  const [step, setStep] = useState<Step>("form");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [preset, setPreset] = useState<number | "other">(25);
  const [custom, setCustom] = useState("");
  const [designation, setDesignation] = useState(initialCause);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();

  // Clear a field's error as soon as the donor changes it
  const clear = (k: string) => setErrors((e) => (e[k] ? Object.fromEntries(Object.entries(e).filter(([key]) => key !== k)) : e));

  const amount = preset === "other" ? Number.parseFloat(custom.replace(/,/g, "")) : preset;
  const amountOk = Number.isFinite(amount) && amount >= MIN_DONATION && amount <= MAX_DONATION;
  const data = () => ({ amount: Number.isFinite(amount) ? amount : NaN, frequency, designation, name, email, message });

  useEffect(() => {
    if (step === "review" || step === "demo") reviewRef.current?.focus();
  }, [step]);

  function review(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const parsed = donationSchema.safeParse(data());
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      const target = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      target?.focus();
      return;
    }
    setErrors({});
    setStep("review");
    window.scrollTo({ top: (formRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 120, behavior: "smooth" });
  }

  async function checkout() {
    if (busy) return;
    setBusy(true);
    setServerError("");
    try {
      const res = await fetch("/api/donations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data()) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok && typeof body.checkoutUrl === "string" && body.checkoutUrl.startsWith("https://")) {
        setStep("redirecting");
        window.location.assign(body.checkoutUrl);
        return;
      }
      if (body.error === "payments-inactive") {
        setStep("demo");
      } else if (body.fields) {
        setErrors(body.fields);
        setStep("form");
      } else {
        setServerError(body.message || "Something went wrong and we couldn't start the checkout. No money was taken. Please try again.");
      }
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again. No money was taken.");
    } finally {
      setBusy(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-[0.92rem] font-medium text-danger">
        {errors[k]}
      </p>
    ) : null;
  const described = (k: string) => (errors[k] ? `${uid}-${k}-err` : undefined);
  const inputCls = (k: string) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[1rem] outline-none transition-colors focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 ${errors[k] ? "border-danger" : "border-cream-300"}`;
  const frequencyText = frequency === "monthly" ? "every month" : "once";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="space-y-4">
          {!payments.active && (
            <Notice tone="warn" title="Online donations are not active yet">
              You can explore the donation form, but no payment will be taken and no donation will be recorded. Secure payments will be switched on once the foundation’s payment account is approved.
            </Notice>
          )}
          {payments.active && payments.testMode && (
            <Notice tone="info" title="Test mode">
              Payments are running in test mode. Use Paystack test card details; no real money will move.
            </Notice>
          )}
          {cancelled && step === "form" && (
            <Notice tone="info" title="Your payment was cancelled" role="status">
              No money was taken. Your details are not saved, so you can start again whenever you’re ready.
            </Notice>
          )}
        </div>

        {step === "form" && (
          <form ref={formRef} onSubmit={review} noValidate className="mt-6 rounded-[1.8rem] border border-cream-200 bg-white p-6 sm:p-9" aria-label="Donation details">
            {/* Frequency */}
            <fieldset>
              <legend className="font-display text-[1.45rem] text-forest-900">1. How often?</legend>
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-full bg-cream-100 p-1.5">
                {(["one-time", "monthly"] as const).map((f) => {
                  const disabled = f === "monthly" && !payments.recurring;
                  return (
                    <label key={f} className={`relative flex min-h-12 cursor-pointer items-center justify-center rounded-full text-[0.98rem] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-400 ${frequency === f ? "bg-forest-800 text-cream-50 shadow-sm" : "text-forest-900"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
                      <input type="radio" name="frequency" value={f} checked={frequency === f} disabled={disabled} onChange={() => setFrequency(f)} className="sr-only" data-field={f === "one-time" ? "frequency" : undefined} />
                      {f === "one-time" ? "One-time" : "Monthly"}
                    </label>
                  );
                })}
              </div>
              {!payments.recurring && <p className="mt-3 text-[0.92rem] text-muted">Monthly giving will be offered once recurring payments in US dollars are confirmed for the foundation’s account.</p>}
              {err("frequency")}
            </fieldset>

            {/* Amount */}
            <fieldset className="mt-9">
              <legend className="font-display text-[1.45rem] text-forest-900">2. Choose an amount <span className="font-sans text-[0.95rem] text-muted">(US dollars, {CURRENCY})</span></legend>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {SUGGESTED_AMOUNTS.map((a) => (
                  <label key={a} className={`flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border text-[1.12rem] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-400 ${preset === a ? "border-forest-800 bg-forest-800 text-cream-50" : "border-cream-300 bg-cream-50 text-forest-900 hover:border-forest-700"}`}>
                    <input type="radio" name="amount" value={a} checked={preset === a} onChange={() => { setPreset(a); clear("amount"); }} className="sr-only" data-field={a === SUGGESTED_AMOUNTS[0] ? "amount" : undefined} aria-describedby={described("amount")} />
                    ${a}
                  </label>
                ))}
                <label className={`col-span-2 flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border text-[1rem] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-400 sm:col-span-1 ${preset === "other" ? "border-forest-800 bg-forest-800 text-cream-50" : "border-cream-300 bg-cream-50 text-forest-900 hover:border-forest-700"}`}>
                  <input type="radio" name="amount" value="other" checked={preset === "other"} onChange={() => { setPreset("other"); clear("amount"); }} className="sr-only" />
                  Other
                </label>
              </div>
              {preset === "other" && (
                <div className="mt-4">
                  <label htmlFor={`${uid}-custom`} className="text-[0.95rem] font-semibold">Your amount in US dollars</label>
                  <div className={`mt-2 flex items-center rounded-xl border bg-white focus-within:border-forest-700 focus-within:ring-2 focus-within:ring-forest-700/20 ${errors.amount ? "border-danger" : "border-cream-300"}`}>
                    <span className="pl-4 text-[1.1rem] font-semibold text-muted" aria-hidden="true">$</span>
                    <input
                      id={`${uid}-custom`}
                      inputMode="decimal"
                      autoComplete="off"
                      value={custom}
                      onChange={(e) => {
                        setCustom(e.target.value.replace(/[^\d.,]/g, ""));
                        clear("amount");
                      }}
                      placeholder={`${MIN_DONATION} to ${MAX_DONATION.toLocaleString("en-US")}`}
                      className="w-full bg-transparent px-2 py-3 text-[1.1rem] outline-none"
                      aria-describedby={[described("amount"), `${uid}-custom-hint`].filter(Boolean).join(" ")}
                      aria-invalid={!!errors.amount}
                      data-field="amount"
                      autoFocus
                    />
                    <span className="pr-4 text-[0.9rem] font-semibold text-muted">{CURRENCY}</span>
                  </div>
                  <p id={`${uid}-custom-hint`} className="mt-2 text-[0.9rem] text-muted">Minimum {formatUsd(MIN_DONATION)}. For larger gifts, please contact us.</p>
                </div>
              )}
              {err("amount")}
            </fieldset>

            {/* Designation */}
            <fieldset className="mt-9">
              <legend className="font-display text-[1.45rem] text-forest-900">3. Where should it go?</legend>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {designations.map((d, i) => (
                  <label key={d.value} className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-400 ${designation === d.value ? "border-forest-800 bg-forest-100/60" : "border-cream-300 bg-cream-50 hover:border-forest-700"}`}>
                    <input type="radio" name="designation" value={d.value} checked={designation === d.value} onChange={() => { setDesignation(d.value); clear("designation"); }} className="mt-1 h-4 w-4 accent-forest-800" data-field={i === 0 ? "designation" : undefined} />
                    <span>
                      <span className="block font-semibold text-forest-900">{d.label}</span>
                      <span className="block text-[0.92rem] text-muted">{d.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
              {err("designation")}
            </fieldset>

            {/* Donor */}
            <fieldset className="mt-9">
              <legend className="font-display text-[1.45rem] text-forest-900">4. Your details</legend>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-name`} className="text-[0.95rem] font-semibold">Full name</label>
                  <input id={`${uid}-name`} data-field="name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); clear("name"); }} className={inputCls("name")} aria-invalid={!!errors.name} aria-describedby={described("name")} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className="text-[0.95rem] font-semibold">Email</label>
                  <input id={`${uid}-email`} data-field="email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} className={inputCls("email")} aria-invalid={!!errors.email} aria-describedby={[described("email"), `${uid}-email-hint`].filter(Boolean).join(" ")} />
                  <p id={`${uid}-email-hint`} className="mt-2 text-[0.88rem] text-muted">Your payment receipt is sent here.</p>
                  {err("email")}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor={`${uid}-msg`} className="text-[0.95rem] font-semibold">Message <span className="font-normal text-muted">(optional)</span></label>
                <textarea id={`${uid}-msg`} data-field="message" rows={3} maxLength={500} value={message} onChange={(e) => { setMessage(e.target.value); clear("message"); }} className={`${inputCls("message")} resize-y`} aria-describedby={[described("message"), `${uid}-msg-count`].filter(Boolean).join(" ")} />
                <p id={`${uid}-msg-count`} className="mt-1 text-right text-[0.82rem] text-muted">{message.length}/500</p>
                {err("message")}
              </div>
            </fieldset>

            <button type="submit" className={buttonClass("gold", "mt-8 w-full text-[1.05rem]")}>
              Review my donation
            </button>
            <p className="mt-4 text-center text-[0.88rem] text-muted">
              You’ll confirm the amount before anything is charged. See our <Link href="/donation-policy" className="underline underline-offset-2">donation policy</Link> and <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.
            </p>
          </form>
        )}

        {(step === "review" || step === "redirecting") && (
          <section aria-labelledby={`${uid}-review`} className="mt-6 rounded-[1.8rem] border border-cream-200 bg-white p-6 sm:p-9">
            <h2 id={`${uid}-review`} ref={reviewRef} tabIndex={-1} className="text-[1.9rem] outline-none">Please confirm your gift</h2>
            <p className="mt-5 rounded-2xl bg-forest-900 p-6 font-display text-[1.6rem] leading-snug text-cream-50 sm:text-[1.9rem]">
              {formatUsd(amount)} <span className="font-sans text-[1rem] font-semibold tracking-wide text-gold-300">{CURRENCY}</span>, {frequencyText}, to <span className="italic text-gold-300">{designationLabel(designation)}</span>.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-4 text-[0.98rem] sm:grid-cols-2">
              <div><dt className="text-muted">Amount</dt><dd className="font-semibold">{formatUsd(amount)} {CURRENCY}</dd></div>
              <div><dt className="text-muted">Frequency</dt><dd className="font-semibold">{frequency === "monthly" ? "Monthly, until you cancel" : "One-time"}</dd></div>
              <div><dt className="text-muted">Name</dt><dd className="font-semibold">{name}</dd></div>
              <div><dt className="text-muted">Email</dt><dd className="font-semibold break-all">{email}</dd></div>
              {message && <div className="sm:col-span-2"><dt className="text-muted">Message</dt><dd>{message}</dd></div>}
            </dl>
            {serverError && <div className="mt-6"><Notice tone="error" title="Checkout could not start" role="alert">{serverError}</Notice></div>}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={() => setStep("form")} disabled={busy || step === "redirecting"} className={buttonClass("outline")}>
                Edit details
              </button>
              <button type="button" onClick={checkout} disabled={busy || step === "redirecting"} aria-busy={busy || step === "redirecting"} className={buttonClass("gold", "min-w-64 disabled:cursor-wait disabled:opacity-70")}>
                {step === "redirecting" ? "Opening secure checkout…" : busy ? "Connecting…" : payments.active ? "Continue to secure checkout" : "Continue"}
              </button>
            </div>
            <p className="mt-5 text-[0.88rem] text-muted" aria-live="polite">
              {step === "redirecting" ? "Taking you to Paystack’s secure payment page…" : payments.active ? "You’ll enter your card details on Paystack’s secure page, not on this website." : ""}
            </p>
          </section>
        )}

        {step === "demo" && (
          <section aria-labelledby={`${uid}-demo`} className="mt-6 rounded-[1.8rem] border border-gold-400/50 bg-white p-6 sm:p-9" role="status">
            <h2 id={`${uid}-demo`} ref={reviewRef} tabIndex={-1} className="text-[1.9rem] outline-none">Payments are not active yet</h2>
            <p className="mt-4 text-[1.05rem] text-muted">
              This is where you would continue to the secure checkout to give <strong className="text-forest-900">{formatUsd(amount)} {CURRENCY}</strong> {frequencyText} to <strong className="text-forest-900">{designationLabel(designation)}</strong>.
            </p>
            <p className="mt-3 text-[1.05rem] text-muted">
              Online payments haven’t been switched on, so <strong className="text-forest-900">no payment was taken and no donation was recorded</strong>. Thank you for your patience while the foundation completes its payment setup.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep("form")} className={buttonClass("outline")}>Back to the form</button>
              <Link href="/get-involved" className={buttonClass("primary")}>Other ways to help</Link>
            </div>
          </section>
        )}
      </div>

      <aside className="lg:col-span-4 lg:col-start-9" aria-label="Your gift at a glance">
        <div className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-[1.8rem] bg-forest-900 p-7 text-cream-100">
            <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">Your gift</p>
            <p className="mt-3 font-display text-[2.6rem] leading-none text-cream-50" aria-live="polite">
              {amountOk ? formatUsd(amount) : "$ –"}
              <span className="ml-2 font-sans text-[0.95rem] font-semibold text-gold-300">{CURRENCY}</span>
            </p>
            <p className="mt-2 text-cream-100/80">{frequency === "monthly" ? "Every month" : "One-time"} · {designationLabel(designation)}</p>
          </div>
          <ul className="space-y-4 rounded-[1.8rem] border border-cream-200 bg-white p-7 text-[0.97rem]">
            {[
              ["Secure checkout", "Payments are processed by Paystack. Card details are entered on Paystack’s page, never on this website."],
              ["You decide where it goes", "Choose a cause, or let the foundation direct your gift where it’s needed most."],
              ["Receipt by email", "A payment receipt is sent to the email address you provide."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-800">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5"><path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span><span className="block font-semibold text-forest-900">{t}</span><span className="text-muted">{d}</span></span>
              </li>
            ))}
          </ul>
          <p className="px-2 text-[0.9rem] text-muted">
            Prefer to give another way, or giving on behalf of an organisation? <Link href="/contact" className="font-semibold text-forest-800 underline underline-offset-2">Contact us</Link>.
          </p>
        </div>
      </aside>
    </div>
  );
}
