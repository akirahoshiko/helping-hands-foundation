import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, EmptyState, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Donut } from "@/components/Widgets";
import { hasRegistration, site, type PublishedDocument } from "@/config/site";

export const metadata: Metadata = {
  title: "Transparency",
  description: "Annual reports, financial summaries, project updates and how Helping Hands Foundation accounts for every contribution.",
};

const commitments = [
  { title: "Publish only what is verified", text: "Reports and figures appear here after they are checked and approved by our trustees." },
  { title: "Honour donors’ choices", text: "Gifts directed to a cause are used for that cause. General gifts go where the need is greatest." },
  { title: "Pay providers directly", text: "School fees and medical bills are paid straight to schools, hospitals and clinics." },
  { title: "Report every year", text: "An annual report, a financial summary and regular project updates." },
  { title: "Protect the people we serve", text: "We never publish anyone’s identity, health or circumstances without informed consent." },
];

function DocumentList({ title, id, docs, empty }: { title: string; id: string; docs: PublishedDocument[]; empty: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-cream-200 pt-10">
      <h2 id={id} className="text-[1.9rem]">{title}</h2>
      <div className="mt-5">
        {docs.length ? (
          <ul className="divide-y divide-cream-200 rounded-2xl border border-cream-200 bg-white">
            {docs.map((d) => (
              <li key={d.href} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  <span className="block font-semibold text-forest-900">{d.title}</span>
                  <span className="text-[0.92rem] text-muted">{d.date}{d.summary ? ` · ${d.summary}` : ""}</span>
                </span>
                <Link href={d.href} className="font-semibold text-forest-800 underline underline-offset-4">
                  Read<span className="sr-only">: {d.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Nothing published yet">{empty}</EmptyState>
        )}
      </div>
    </section>
  );
}

export default function TransparencyPage() {
  const r = site.reports;
  return (
    <>
      <PageHeader
        eyebrow="Transparency"
        title={<>Every gift deserves an <span className="italic text-forest-700">honest account.</span></>}
        intro={<p>How we use donations, what we have achieved, and the documents that show it.</p>}
      >
        <div className="mt-8"><ButtonLink href="/transparency/annual-report-2025" variant="gold">Read the Annual Report 2025</ButtonLink></div>
      </PageHeader>

      <section aria-labelledby="spend-title" className="py-16 lg:py-20">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Where the money goes</p>
            <h2 id="spend-title" className="mt-4 text-[2.2rem] sm:text-[2.6rem]">82 cents of every dollar goes to programmes.</h2>
            <p className="mt-4 text-muted">Breakdown of total expenditure in 2025{site.demo ? " (sample figures for this portfolio demo)" : ""}.</p>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-cream-100 p-8 lg:col-span-6 lg:col-start-7" delay={100}>
            <Donut data={site.spending} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="commit-title" className="bg-forest-900 py-16 text-cream-100 lg:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow !text-gold-300">Our approach</p>
            <h2 id="commit-title" className="mt-4 max-w-2xl text-[2.2rem] !text-cream-50 sm:text-[2.6rem]">Five commitments to our supporters</h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 70} className="border-t-2 border-gold-400 pt-5">
                <span className="text-[0.85rem] font-semibold text-gold-300">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-[1.15rem] font-semibold !text-cream-50">{c.title}</h3>
                <p className="mt-2 text-cream-100/75">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="py-16 lg:py-20">
        <div className="container-site max-w-4xl space-y-12">
          <DocumentList id="annual" title="Annual reports" docs={r.annual} empty="Our first annual report will be published here after a full year of work." />
          <DocumentList id="financial" title="Financial summaries" docs={r.financial} empty="Financial summaries will appear here once accounts have been prepared and reviewed." />
          <DocumentList id="updates" title="Project updates" docs={r.projectUpdates} empty="Updates on supported projects will be shared here." />
          <section aria-labelledby="reg-title" className="border-t border-cream-200 pt-10">
            <h2 id="reg-title" className="text-[1.9rem]">Registration</h2>
            <div className="mt-5">
              {hasRegistration() ? (
                <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-cream-200 bg-white p-6 sm:grid-cols-2">
                  <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{site.registration.legalName}</dd></div>
                  <div><dt className="text-muted">Registered in</dt><dd className="font-semibold">{site.registration.country}</dd></div>
                  <div><dt className="text-muted">Registration number</dt><dd className="font-semibold">{site.registration.number}</dd></div>
                  {site.registration.authority && <div><dt className="text-muted">Note</dt><dd className="font-semibold">{site.registration.authority}</dd></div>}
                </dl>
              ) : (
                <EmptyState title="Registration details to follow">The foundation’s registration details will be published here once confirmed.</EmptyState>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
