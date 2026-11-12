import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Picture } from "@/components/ui";
import { Donut } from "@/components/Widgets";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import { formatUsd } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Annual Report 2025",
  description: "Programmes, finances and lessons from Helping Hands Foundation’s 2025 financial year.",
};

/* Totals reconcile: income 214,600; expenditure 205,300; surplus 9,300. */
const income = [
  { label: "Individual donations", value: 148200 },
  { label: "Corporate & school partners", value: 41900 },
  { label: "In-kind gifts (valued)", value: 24500 },
];
const spending = [
  { label: "Orphan Care", value: 61200 },
  { label: "Children’s Education", value: 54900 },
  { label: "Medical Support", value: 52246 },
  { label: "Operations", value: 24636 },
  { label: "Fundraising", value: 12318 },
];
const highlights = [
  { value: "420", label: "children got a full school kit" },
  { value: "212", label: "children in foster and kinship care helped every month" },
  { value: "96", label: "hospital bills paid or part-paid" },
  { value: "6", label: "schools and 2 clinics we work with" },
];

const sum = (rows: { value: number }[]) => rows.reduce((a, r) => a + r.value, 0);

export default function AnnualReport2025() {
  const totalIn = sum(income);
  const totalOut = sum(spending);
  return (
    <>
      <header className="bg-ink-900 text-sand-100">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-[0.92rem] text-sand-100/70">
              <Link href="/transparency" className="text-sun-300 underline-offset-4 hover:underline">Transparency</Link> <span aria-hidden="true">/</span> Annual Report 2025
            </nav>
            <h1 className="mt-5 text-[2.8rem] !text-sand-50 sm:text-[3.8rem]">Annual Report <span className="hl-dark">2025</span></h1>
            <p className="mt-4 max-w-xl text-[1.12rem] text-sand-100/85">What we did in 2025, what it cost and what we’d do differently. Published March 2026.</p>
          </div>
          <div className="lg:col-span-5">
            <Picture photo={photos.teacher} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
          </div>
        </div>
      </header>

      <div className="container-site max-w-5xl py-14 lg:py-20">
        <section aria-labelledby="letter-title">
          <p className="eyebrow">A note from Amara</p>
          <h2 id="letter-title" className="mt-4 text-[2.1rem]">A busy year, and a few lessons</h2>
          <div className="mt-5 space-y-4 text-[1.08rem] text-muted">
            <p>2025 was our busiest year yet. Two more schools joined us, two clinics started referring patients to the medical fund, and for the first time we wrote up proper accounts for everyone to see. If you give us money, you should be able to find out what happened to it.</p>
            <p>The hard part was saying no. We got far more requests for help with hospital bills than we could pay, so we changed how we check them. Every case is now confirmed with the hospital by our medical adviser, and we pay the hospital directly. It slows things down a little, but it means we can stand behind every payment.</p>
            <p>This year we want to get 500 children ready for school in September. Thank you for everything you’ve given so far.</p>
            <p className="font-display text-[1.25rem] text-ink-900">Amara Okafor, Founder and Executive Director</p>
          </div>
        </section>

        <section aria-labelledby="hl-title" className="mt-16">
          <h2 id="hl-title" className="text-[2rem]">2025 at a glance</h2>
          <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col rounded-[1.4rem] bg-sun-400 p-6 text-ink-950">
                <dt className="order-2 mt-1 text-[0.95rem] font-medium">{h.label}</dt>
                <dd className="order-1 font-display text-[2.6rem] leading-none">{h.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="finances" aria-labelledby="fin-title" className="mt-16 scroll-mt-24">
          <h2 id="fin-title" className="text-[2rem]">Financial summary</h2>
          <p className="mt-2 text-muted">Year ending 31 December 2025. All figures in US dollars.</p>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[1.4rem] border border-sand-200 bg-white">
              <table className="w-full text-left text-[0.98rem]">
                <caption className="bg-sand-100 px-5 py-3 text-left font-semibold text-ink-900">Income</caption>
                <tbody>
                  {income.map((r) => (
                    <tr key={r.label} className="border-t border-sand-200"><th scope="row" className="px-5 py-3 font-normal">{r.label}</th><td className="px-5 py-3 text-right font-semibold tabular-nums">{formatUsd(r.value)}</td></tr>
                  ))}
                  <tr className="border-t-2 border-ink-800"><th scope="row" className="px-5 py-3">Total income</th><td className="px-5 py-3 text-right font-bold tabular-nums">{formatUsd(totalIn)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-[1.4rem] border border-sand-200 bg-white">
              <table className="w-full text-left text-[0.98rem]">
                <caption className="bg-sand-100 px-5 py-3 text-left font-semibold text-ink-900">Expenditure</caption>
                <tbody>
                  {spending.map((r) => (
                    <tr key={r.label} className="border-t border-sand-200"><th scope="row" className="px-5 py-3 font-normal">{r.label}</th><td className="px-5 py-3 text-right font-semibold tabular-nums">{formatUsd(r.value)}</td></tr>
                  ))}
                  <tr className="border-t-2 border-ink-800"><th scope="row" className="px-5 py-3">Total expenditure</th><td className="px-5 py-3 text-right font-bold tabular-nums">{formatUsd(totalOut)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[0.95rem] text-muted">Surplus carried to reserves: <strong className="text-ink-900">{formatUsd(totalIn - totalOut)}</strong>. Accounts prepared by our Finance Lead, Ngozi Eze, and reviewed by the board of trustees.</p>
          <div className="mt-10 rounded-[1.6rem] bg-sand-100 p-8">
            <h3 className="font-display text-[1.5rem]">Where the money went</h3>
            <div className="mt-6"><Donut data={site.spending} /></div>
          </div>
        </section>

        <section aria-labelledby="next-title" className="mt-16">
          <h2 id="next-title" className="text-[2rem]">Next year</h2>
          <ul className="mt-5 space-y-3 text-[1.05rem]">
            {["Get 500 children kitted out for school in September.", "Run two free health days with our partner clinics.", "Post a short project update every three months, not just once a year."].map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-sun-400" />{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/donate" variant="gold">Help us get there</ButtonLink>
            <ButtonLink href="/transparency" variant="outline">Back to Transparency</ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
