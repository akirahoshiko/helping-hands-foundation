"use client";

import { useEffect, useId, useRef, useState } from "react";
import { newsletterSchema } from "@/lib/validation";

export function Newsletter() {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  // When the form appeared (set after mount; used to reject instant bot submissions)
  const shownAt = useRef(0);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);
  const [state, setState] = useState<{ phase: "idle" | "sending" | "done" } | { phase: "error"; message: string }>({ phase: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.phase === "sending") return;
    const payload = { email, website, startedAt: shownAt.current || undefined };
    const parsed = newsletterSchema.safeParse(payload);
    if (!parsed.success) {
      setState({ phase: "error", message: parsed.error.issues[0]?.message || "Please enter a valid email address." });
      return;
    }
    setState({ phase: "sending" });
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok === true) setState({ phase: "done" });
      else setState({ phase: "error", message: body.message || body.fields?.email || "We couldn’t subscribe you. Please try again." });
    } catch {
      setState({ phase: "error", message: "We couldn’t reach the server. Please try again." });
    }
  }

  if (state.phase === "done") {
    return (
      <p role="status" className="rounded-2xl bg-ink-800 px-5 py-4 text-sand-50">
        Thank you! You’re on the list for occasional updates. <span className="text-sand-100/70">You can unsubscribe at any time.</span>
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative" aria-label="Newsletter sign-up">
      <label htmlFor={`${uid}-e`} className="sr-only">Email address</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${uid}-e`}
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state.phase === "error") setState({ phase: "idle" }); }}
          aria-invalid={state.phase === "error"}
          aria-describedby={state.phase === "error" ? `${uid}-err` : undefined}
          className="min-h-12 flex-1 rounded-full border border-sand-100/25 bg-ink-900 px-5 text-sand-50 placeholder:text-sand-100/50 outline-none focus:border-sun-300"
        />
        <button type="submit" disabled={state.phase === "sending"} className="min-h-12 rounded-full bg-sun-400 px-6 font-bold text-ink-950 hover:bg-sun-300 disabled:opacity-70">
          {state.phase === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-w`}>Website</label>
        <input id={`${uid}-w`} tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {state.phase === "error" && <p id={`${uid}-err`} role="alert" className="mt-2 text-[0.9rem] text-sun-300">{state.message}</p>}
    </form>
  );
}
