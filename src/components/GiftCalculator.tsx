"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { causes } from "@/content/causes";

const STEPS = [10, 25, 50, 100] as const;

/** "What your gift can do" (inspired by World Vision's impact slider). Examples are illustrative. */
export function GiftCalculator() {
  const uid = useId();
  const [i, setI] = useState(1);
  const [causeIdx, setCauseIdx] = useState(0);
  const amount = STEPS[i];
  const cause = causes[causeIdx];
  const gift = cause.gifts.find((g) => g.amount === amount);

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-40px_rgba(15,42,31,0.5)] lg:grid-cols-12">
      <div className="bg-forest-800 p-7 text-cream-100 sm:p-10 lg:col-span-7">
        <div role="tablist" aria-label="Choose a cause" className="flex flex-wrap gap-2">
          {causes.map((c, k) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={k === causeIdx}
              type="button"
              onClick={() => setCauseIdx(k)}
              className={`rounded-full px-4 py-2 text-[0.9rem] font-semibold transition-colors ${k === causeIdx ? "bg-gold-400 text-forest-950" : "bg-forest-700/60 text-cream-100 hover:bg-forest-700"}`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <label htmlFor={`${uid}-r`} className="mt-9 block text-[0.85rem] font-semibold tracking-[0.14em] text-gold-300 uppercase">Move the slider</label>
        <input
          id={`${uid}-r`}
          type="range"
          min={0}
          max={STEPS.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-valuetext={`$${amount}`}
          className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-forest-950/60 accent-gold-400"
        />
        <div className="mt-3 flex justify-between text-[0.95rem] font-semibold text-cream-100/80" aria-hidden="true">
          {STEPS.map((s, k) => (
            <button key={s} type="button" tabIndex={-1} onClick={() => setI(k)} className={k === i ? "text-gold-300" : ""}>${s}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5" aria-live="polite">
        <p className="font-display text-[3.6rem] leading-none text-forest-900">${amount}</p>
        <p className="mt-3 text-[1.15rem] text-ink">could provide <strong className="text-forest-800">{gift?.text}</strong>.</p>
        <p className="mt-2 text-[0.88rem] text-muted">Illustrative examples of what gifts of this size can cover.</p>
        <Link href={`/donate?amount=${amount}&cause=${cause.designation}`} className="group mt-6 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-gold-400 px-6 font-bold text-forest-950 hover:bg-gold-300">
          Give ${amount} to {cause.title}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
