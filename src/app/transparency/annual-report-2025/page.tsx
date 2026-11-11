import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Notice, Picture } from "@/components/ui";
import { Donut } from "@/components/Widgets";
import { site } from "@/config/site";
import { photos } from "@/content/photos";
import { formatUsd } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Annual Report 2025",
  description: "Programmes, finances and lessons from Helping Hands Foundation’s 2025 financial year.",
};

/* Sample figures (portfolio demo). Totals reconcile: income 214,600; expenditure 205,300; surplus 9,300. */
const income = [
  { label: "Individual donations", value: 148200 },
  { label: "Corporate & school partners", value: 41900 },
  { label: "In-kind gifts (valued)", value: 24500 },
];
const spending = [
  { label: "Orphan Care", value: 61200 },
  { label: "Children’s Wellbeing & Education", value: 54900 },
  { label: "Medical Support", value: 52246 },
  { label: "Operations", value: 24636 },
  { label: "Fundraising", value: 12318 },
];
const highlights = [
  { value: "420", label: "children received back-to-school kits" },
  { value: "212", label: "children in care supported with essentials" },
  { value: "96", label: "hospital bills contributed to" },
  { value: "6", label: "partner schools and 2 partner clinics" },
];

const sum = (rows: { value: number }[]) => rows.reduce((a, r) => a + r.value, 0);

export default function AnnualReport2025() {
  const totalIn = sum(income);
  const totalOut = sum(spending);
  return (
    <>
      <header className="bg-forest-900 text-cream-100">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-[0.92rem] text-cream-100/70">
              <Link href="/transparency" className="text-gold-300 underline-offset-4 hover:underline">Transparency</Link> <span aria-hidden="true">/</span> Annual Report 2025
            </nav>
            <h1 className="mt-5 text-[2.8rem] !text-cream-50 sm:text-[3.8rem]">Annual Report <span className="italic text-gold-300">2025</span></h1>
            <p className="mt-4 max-w-xl text-[1.12rem] text-cream-100/85">Our fifth year: what we did, what it cost, and what we learned. Published March 2026.</p>
          </div>
          <div className="lg:col-span-5">
            <Picture photo={photos.teacher} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] rounded-[2rem]" label />
          </div>
        </div>
      </header>

      <div className="container-site max-w-5xl py-14 lg:py-20">
        {site.demo && (
          <div className="mb-12"><Notice tone="warn" title="Sample report">This report belongs to a fictional organisation and uses sample figures, created for a portfolio demonstration.</Notice></div>
        )}

        <section aria-labelledby="letter-title">
          <p className="eyebrow">From our Executive Director</p>
          <h2 id="letter-title" className="mt-4 text-[2.1rem]">A year of steady, practical help</h2>
          <div className="mt-5 space-y-4 text-[1.08rem] text-muted">
            <p>In 2025 we grew carefully. We added two partner schools, opened our medical support fund to referrals from two clinics, and published our first full financial summary, because the people who fund this work deserve to see exactly how it is used.</p>
            <p>We also learned. Demand for medical support far outstrips what we can give, so we tightened our review process and now pay every bill directly to the hospital or clinic. Next year, our priority is reaching 500 children through the back-to-school appeal.</p>
            <p className="font-display text-[1.25rem] text-forest-900">Amara Okafor, Founder & Executive Director</p>
          </div>
        </section>

        <section aria-labelledby="hl-title" className="mt-16">
          <h2 id="hl-title" className="text-[2rem]">2025 at a glance</h2>
          <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex flex-col rounded-[1.4rem] bg-gold-400 p-6 text-forest-950">
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
            <div className="overflow-hidden rounded-[1.4rem] border border-cream-200 bg-white">
              <table className="w-full text-left text-[0.98rem]">
                <caption className="bg-cream-100 px-5 py-3 text-left font-semibold text-forest-900">Income</caption>
                <tbody>
                  {income.map((r) => (
                    <tr key={r.label} className="border-t border-cream-200"><th scope="row" className="px-5 py-3 font-normal">{r.label}</th><td className="px-5 py-3 text-right font-semibold tabular-nums">{formatUsd(r.value)}</td></tr>
                  ))}
                  <tr className="border-t-2 border-forest-800"><th scope="row" className="px-5 py-3">Total income</th><td className="px-5 py-3 text-right font-bold tabular-nums">{formatUsd(totalIn)}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-[1.4rem] border border-cream-200 bg-white">
              <table className="w-full text-left text-[0.98rem]">
                <caption className="bg-cream-100 px-5 py-3 text-left font-semibold text-forest-900">Expenditure</caption>
                <tbody>
                  {spending.map((r) => (
                    <tr key={r.label} className="border-t border-cream-200"><th scope="row" className="px-5 py-3 font-normal">{r.label}</th><td className="px-5 py-3 text-right font-semibold tabular-nums">{formatUsd(r.value)}</td></tr>
                  ))}
                  <tr className="border-t-2 border-forest-800"><th scope="row" className="px-5 py-3">Total expenditure</th><td className="px-5 py-3 text-right font-bold tabular-nums">{formatUsd(totalOut)}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[0.95rem] text-muted">Surplus carried to reserves: <strong className="text-forest-900">{formatUsd(totalIn - totalOut)}</strong>. Accounts prepared by our Finance & Transparency Lead and reviewed by the board of trustees.</p>
          <div className="mt-10 rounded-[1.6rem] bg-cream-100 p-8">
            <h3 className="font-display text-[1.5rem]">Where the money went</h3>
            <div className="mt-6"><Donut data={site.spending} /></div>
          </div>
        </section>

        <section aria-labelledby="next-title" className="mt-16">
          <h2 id="next-title" className="text-[2rem]">Looking ahead to 2026</h2>
          <ul className="mt-5 space-y-3 text-[1.05rem]">
            {["Reach 500 children through the Back-to-School Appeal.", "Hold two community health days with partner clinics.", "Publish quarterly project updates alongside the annual report."].map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold-400" />{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/donate" variant="gold">Support our 2026 work</ButtonLink>
            <ButtonLink href="/transparency" variant="outline">Back to Transparency</ButtonLink>
          </div>
        </section>
      </div>
    </>
  );
}
