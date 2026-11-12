"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { designations } from "@/content/causes";
import { SUGGESTED_AMOUNTS } from "@/lib/validation";

/** Hero donation box (inspired by charity: water / GiveDirectly): choose and continue to the full form. */
export function QuickDonate() {
  const router = useRouter();
  const uid = useId();
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");
  const [amount, setAmount] = useState<number>(25);
  const [cause, setCause] = useState("general");

  function go(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({ amount: String(amount), frequency, cause });
    router.push(`/donate?${q.toString()}`);
  }

  return (
    <form onSubmit={go} className="w-full rounded-[1.6rem] bg-sand-50 p-5 text-ink shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:p-6" aria-label="Quick donation">
      <fieldset>
        <legend className="sr-only">How often</legend>
        <div className="grid grid-cols-2 gap-1.5 rounded-full bg-sand-200/70 p-1">
          {(["monthly", "one-time"] as const).map((f) => (
            <label key={f} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-full text-[0.95rem] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sun-400 ${frequency === f ? "bg-ink-800 text-sand-50" : "text-ink-900"}`}>
              <input type="radio" name={`${uid}-f`} className="sr-only" checked={frequency === f} onChange={() => setFrequency(f)} />
              {f === "monthly" ? "Monthly" : "Give once"}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-4">
        <legend className="text-[0.82rem] font-semibold tracking-wide text-muted uppercase">Amount (USD)</legend>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {SUGGESTED_AMOUNTS.map((a) => (
            <label key={a} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border text-[1.05rem] font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sun-400 ${amount === a ? "border-sun-400 bg-sun-400 text-ink-950" : "border-sand-300 bg-white text-ink-900 hover:border-ink-700"}`}>
              <input type="radio" name={`${uid}-a`} className="sr-only" checked={amount === a} onChange={() => setAmount(a)} />${a}
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor={`${uid}-c`} className="mt-4 block text-[0.82rem] font-semibold tracking-wide text-muted uppercase">Where it goes</label>
      <select id={`${uid}-c`} value={cause} onChange={(e) => setCause(e.target.value)} className="mt-2 block w-full rounded-xl border border-sand-300 bg-white px-3 py-3 text-[0.98rem] font-medium text-ink-900 outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-700/20">
        {designations.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
      <button type="submit" className="group mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-sun-400 py-3.5 text-[1.05rem] font-bold text-ink-950 transition-colors hover:bg-sun-300">
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M10 16.5s-6-3.7-6-8.2A3.3 3.3 0 0 1 10 6.4a3.3 3.3 0 0 1 6 1.9c0 4.5-6 8.2-6 8.2z" fill="currentColor" /></svg>
        Donate ${amount}{frequency === "monthly" ? " monthly" : ""}
      </button>
      <p className="mt-3 text-center text-[0.8rem] text-muted">Secure checkout · Review before you pay</p>
    </form>
  );
}
