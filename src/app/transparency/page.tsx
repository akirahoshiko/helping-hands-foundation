import type { Metadata } from "next";
import { EmptyState, PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { hasRegistration, site, type PublishedDocument } from "@/config/site";

export const metadata: Metadata = {
  title: "Transparency",
  description: "How Helping Hands Foundation intends to account for every contribution: reports, financial summaries and project updates.",
};

const commitments = [
  { title: "Publish only what is verified", text: "Reports, figures and stories appear here only after they have been checked and approved, never estimates presented as results." },
  { title: "Honour donors’ choices", text: "Gifts directed to a cause are intended for that cause. General gifts go where the need is greatest across all three causes." },
  { title: "Keep proper records", text: "Every online donation is processed and recorded by our payment provider, giving a clear trail from gift to account." },
  { title: "Report regularly", text: "Once the foundation’s work begins, we intend to share annual reports, yearly financial summaries and regular project updates." },
  { title: "Protect the people we serve", text: "Updates will describe our work without exposing anyone’s identity, health or circumstances without their informed consent." },
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
                <a href={d.href} className="font-semibold text-forest-800 underline underline-offset-4" target="_blank" rel="noopener noreferrer">
                  Download<span className="sr-only">: {d.title}</span>
                </a>
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
        intro={<p>Helping Hands Foundation is new. This page sets out how we intend to be accountable, and it is where our reports will appear as soon as they are verified.</p>}
      />

      <section aria-labelledby="commit-title" className="py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Our approach</p>
            <h2 id="commit-title" className="mt-4 max-w-2xl text-[2.2rem] sm:text-[2.6rem]">Five commitments to our supporters</h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 70} className="border-t-2 border-gold-400 pt-5">
                <span className="text-[0.85rem] font-semibold text-gold-600">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-[1.15rem] font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="pb-20">
        <div className="container-site max-w-4xl space-y-12">
          <DocumentList id="annual" title="Annual reports" docs={r.annual} empty="Our first annual report will be published here after the foundation’s first full year of work." />
          <DocumentList id="financial" title="Financial summaries" docs={r.financial} empty="Financial summaries will appear here once accounts for a full financial year have been prepared and reviewed." />
          <DocumentList id="updates" title="Project updates" docs={r.projectUpdates} empty="Updates on supported projects will be shared here as the foundation’s work gets under way." />

          <section aria-labelledby="reg-title" className="border-t border-cream-200 pt-10">
            <h2 id="reg-title" className="text-[1.9rem]">Registration</h2>
            <div className="mt-5">
              {hasRegistration() ? (
                <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-cream-200 bg-white p-6 sm:grid-cols-2">
                  {site.registration.legalName && <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{site.registration.legalName}</dd></div>}
                  <div><dt className="text-muted">Registered in</dt><dd className="font-semibold">{site.registration.country}</dd></div>
                  {site.registration.authority && <div><dt className="text-muted">Authority</dt><dd className="font-semibold">{site.registration.authority}</dd></div>}
                  <div><dt className="text-muted">Registration number</dt><dd className="font-semibold">{site.registration.number}</dd></div>
                  {site.registration.taxStatus && <div><dt className="text-muted">Tax status</dt><dd className="font-semibold">{site.registration.taxStatus}</dd></div>}
                </dl>
              ) : (
                <EmptyState title="Registration details to follow">The foundation’s registration details will be published here once they are confirmed.</EmptyState>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
