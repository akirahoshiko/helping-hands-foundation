"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { enquirySchema, fieldErrors, interestLabels, interestValues } from "@/lib/validation";
import { Notice, buttonClass } from "./ui";

type Kind = "contact" | "involvement";
type State = { phase: "idle" | "sending" | "sent" } | { phase: "error"; message: string; notConfigured?: boolean };

export function EnquiryForm({ kind, deliveryActive }: { kind: Kind; deliveryActive: boolean }) {
  const params = useSearchParams();
  const startInterest = interestValues.find((v) => v === params.get("interest")) ?? (kind === "involvement" ? "volunteer" : undefined);

  const uid = useId();
  const [startedAt] = useState(() => Date.now());
  const [interest, setInterest] = useState<(typeof interestValues)[number] | undefined>(startInterest);

  // Follow "Register your interest" links on the same page (?interest=…)
  const paramInterest = params.get("interest");
  const [lastParam, setLastParam] = useState(paramInterest);
  if (paramInterest !== lastParam) {
    setLastParam(paramInterest);
    const match = interestValues.find((v) => v === paramInterest);
    if (match) setInterest(match);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>({ phase: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const clear = (k: string) => setErrors((e) => (e[k] ? Object.fromEntries(Object.entries(e).filter(([key]) => key !== k)) : e));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "sending") return;
    const payload = { kind, name, email, interest: kind === "involvement" ? interest : undefined, subject: kind === "contact" ? subject : "", message, website, startedAt };
    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setState({ phase: "sending" });
    try {
      const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok === true) {
        setState({ phase: "sent" });
        setTimeout(() => doneRef.current?.focus(), 50);
        return;
      }
      if (body.fields) {
        setErrors(body.fields);
        setState({ phase: "idle" });
        return;
      }
      setState({ phase: "error", message: body.message || "Your message could not be sent. Please try again.", notConfigured: body.error === "not-configured" });
    } catch {
      setState({ phase: "error", message: "We couldn’t reach the server, so your message was not sent. Please check your connection and try again." });
    }
  }

  if (state.phase === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[1.8rem] border border-ink-700/30 bg-ink-100/60 p-8 outline-none">
        <p className="eyebrow">Message delivered</p>
        <h3 className="mt-3 text-[1.9rem]">Thank you, {name.trim().split(" ")[0]}.</h3>
        <p className="mt-3 text-muted">Your message has reached the foundation’s inbox. We’ll reply to <strong className="text-ink-900">{email.trim()}</strong> as soon as we can.</p>
        <button type="button" className={buttonClass("outline", "mt-6")} onClick={() => { setMessage(""); setSubject(""); setState({ phase: "idle" }); }}>
          Send another message
        </button>
      </div>
    );
  }

  const err = (k: string) => (errors[k] ? <p id={`${uid}-${k}-err`} className="mt-2 text-[0.92rem] font-medium text-danger">{errors[k]}</p> : null);
  const desc = (k: string) => (errors[k] ? `${uid}-${k}-err` : undefined);
  const input = (k: string) => `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[1rem] outline-none transition-colors focus:border-ink-700 focus:ring-2 focus:ring-ink-700/20 ${errors[k] ? "border-danger" : "border-sand-300"}`;

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="rounded-[1.8rem] border border-sand-200 bg-white p-6 sm:p-9" aria-label={kind === "involvement" ? "Get involved form" : "Contact form"}>
      {!deliveryActive && (
        <div className="mb-6">
          <Notice tone="warn" title="Online messages are not switched on yet">
            You can fill in this form, but it can’t be delivered until the foundation’s email service is connected. Please check back soon.
          </Notice>
        </div>
      )}

      {kind === "involvement" && (
        <fieldset>
          <legend className="text-[0.95rem] font-semibold">I’m interested in</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {interestValues.map((v, i) => (
              <label key={v} className={`cursor-pointer rounded-full border px-4 py-2 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sun-400 ${interest === v ? "border-ink-800 bg-ink-800 text-sand-50" : "border-sand-300 bg-sand-50 text-ink-900 hover:border-ink-700"}`}>
                <input type="radio" name="interest" value={v} checked={interest === v} onChange={() => { setInterest(v); clear("interest"); }} className="sr-only" data-field={i === 0 ? "interest" : undefined} />
                {interestLabels[v]}
              </label>
            ))}
          </div>
          {err("interest")}
        </fieldset>
      )}

      <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${kind === "involvement" ? "mt-7" : ""}`}>
        <div>
          <label htmlFor={`${uid}-name`} className="text-[0.95rem] font-semibold">Full name</label>
          <input id={`${uid}-name`} data-field="name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); clear("name"); }} className={input("name")} aria-invalid={!!errors.name} aria-describedby={desc("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className="text-[0.95rem] font-semibold">Email</label>
          <input id={`${uid}-email`} data-field="email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} className={input("email")} aria-invalid={!!errors.email} aria-describedby={desc("email")} />
          {err("email")}
        </div>
      </div>

      {kind === "contact" && (
        <div className="mt-5">
          <label htmlFor={`${uid}-subject`} className="text-[0.95rem] font-semibold">Subject <span className="font-normal text-muted">(optional)</span></label>
          <input id={`${uid}-subject`} data-field="subject" value={subject} onChange={(e) => { setSubject(e.target.value); clear("subject"); }} maxLength={120} className={input("subject")} aria-describedby={desc("subject")} />
          {err("subject")}
        </div>
      )}

      <div className="mt-5">
        <label htmlFor={`${uid}-message`} className="text-[0.95rem] font-semibold">Message</label>
        <textarea
          id={`${uid}-message`}
          data-field="message"
          rows={6}
          value={message}
          onChange={(e) => { setMessage(e.target.value); clear("message"); }}
          maxLength={3000}
          placeholder={kind === "involvement" ? "Tell us a little about yourself or your organisation, and how you’d like to help." : "How can we help?"}
          className={`${input("message")} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={[desc("message"), `${uid}-privacy`].filter(Boolean).join(" ")}
        />
        {err("message")}
        <p id={`${uid}-privacy`} className="mt-2 text-[0.88rem] text-muted">Please don’t include medical records, health details or other sensitive personal information.</p>
      </div>

      {/* Spam trap: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {state.phase === "error" && (
        <div className="mt-6">
          <Notice tone={state.notConfigured ? "warn" : "error"} title={state.notConfigured ? "Your message was not sent" : "Something went wrong"} role="alert">
            {state.message}
          </Notice>
        </div>
      )}

      <button type="submit" disabled={state.phase === "sending"} aria-busy={state.phase === "sending"} className={buttonClass("primary", "mt-7 w-full sm:w-auto disabled:cursor-wait disabled:opacity-70")}>
        {state.phase === "sending" ? "Sending…" : kind === "involvement" ? "Send my interest" : "Send message"}
      </button>
      <p className="mt-4 text-[0.88rem] text-muted">
        We only use your details to reply to you. See our <Link href="/privacy" className="underline underline-offset-2">privacy notice</Link>.
      </p>
    </form>
  );
}
