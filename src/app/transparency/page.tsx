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
  { title: "Checked before it’s published", text: "Our trustees go through every report and set of figures before they go up here." },
  { title: "Your choice sticks", text: "If you give to a cause, it’s spent on that cause. General gifts go wherever the need is biggest." },
  { title: "No cash handouts", text: "We pay school fees and hospital bills straight to the school or hospital." },
  { title: "A report every year", text: "Plus a summary of the accounts and updates on each project as we go." },
  { title: "Privacy comes first", text: "We never publish names, photos or health details of the people we help without their permission." },
];

function DocumentList({ title, id, docs, empty }: { title: string; id: string; docs: PublishedDocument[]; empty: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-sand-200 pt-10">
      <h2 id={id} className="text-[1.9rem]">{title}</h2>
      <div className="mt-5">
        {docs.length ? (
          <ul className="divide-y divide-sand-200 rounded-2xl border border-sand-200 bg-white">
            {docs.map((d) => (
              <li key={d.href} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  <span className="block font-semibold text-ink-900">{d.title}</span>
                  <span className="text-[0.92rem] text-muted">{d.date}{d.summary ? ` · ${d.summary}` : ""}</span>
                </span>
                <Link href={d.href} className="font-semibold text-ink-800 underline underline-offset-4">
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
        title={<>Where your money <span className="hl">actually goes</span></>}
        intro={<p>Our reports, our accounts and how we spend what people give us. If something isn’t clear, email us and ask.</p>}
      >
        <div className="mt-8"><ButtonLink href="/transparency/annual-report-2025" variant="gold">Read the Annual Report 2025</ButtonLink></div>
      </PageHeader>

      <section aria-labelledby="spend-title" className="py-16 lg:py-20">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Where the money goes</p>
            <h2 id="spend-title" className="mt-4 text-[2.2rem] sm:text-[2.6rem]">82 cents in every dollar goes to children and patients.</h2>
            <p className="mt-4 text-muted">How we spent our money in 2025. The rest covers rent, transport, bank charges and the cost of raising funds.</p>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-sand-100 p-8 lg:col-span-6 lg:col-start-7" delay={100}>
            <Donut data={site.spending} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="commit-title" className="bg-ink-900 py-16 text-sand-100 lg:py-20">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow !text-sun-300">Our promises</p>
            <h2 id="commit-title" className="mt-4 max-w-2xl text-[2.2rem] !text-sand-50 sm:text-[2.6rem]">Five things we promise our donors</h2>
          </Reveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 70} className="border-t-2 border-sun-400 pt-5">
                <span className="text-[0.85rem] font-semibold text-sun-300">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-[1.15rem] font-semibold !text-sand-50">{c.title}</h3>
                <p className="mt-2 text-sand-100/75">{c.text}</p>
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
          {hasRegistration() && (<section aria-labelledby="reg-title" className="border-t border-sand-200 pt-10">
            <h2 id="reg-title" className="text-[1.9rem]">Registration</h2>
            <div className="mt-5">
              {hasRegistration() ? (
                <dl className="grid grid-cols-1 gap-4 rounded-2xl border border-sand-200 bg-white p-6 sm:grid-cols-2">
                  <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{site.registration.legalName}</dd></div>
                  <div><dt className="text-muted">Registered in</dt><dd className="font-semibold">{site.registration.country}</dd></div>
                  <div><dt className="text-muted">Registration number</dt><dd className="font-semibold">{site.registration.number}</dd></div>
                  {site.registration.authority && <div><dt className="text-muted">Note</dt><dd className="font-semibold">{site.registration.authority}</dd></div>}
                </dl>
              ) : (
                <EmptyState title="Registration details to follow">The foundation’s registration details will be published here once confirmed.</EmptyState>
              )}
            </div>
          </section>)}
        </div>
      </div>
    </>
  );
}
