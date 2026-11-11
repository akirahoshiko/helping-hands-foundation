import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ButtonLink, PageHeader, Picture } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { causes } from "@/content/causes";

export const metadata: Metadata = {
  title: "Our causes",
  description: "Orphan Care, Children’s Wellbeing & Education, and Medical Support: the three causes of Helping Hands Foundation.",
};

export default function CausesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our causes"
        title="Three causes. One commitment to every child and family we meet."
        intro={<p>Each cause addresses a need where practical help can change what happens next. Choose one to learn more, or give where support is needed most.</p>}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site space-y-20 lg:space-y-28">
          {causes.map((cause, i) => (
            <Reveal key={cause.slug} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <Picture photo={cause.photo} sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[4/3] rounded-[2rem]" label={i === 0} />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="font-display text-[1.2rem] text-gold-600">0{i + 1}</p>
                <h2 className="mt-2 text-[2.2rem] sm:text-[2.7rem]">{cause.title}</h2>
                <p className="mt-4 text-[1.08rem] text-muted">{cause.summary}</p>
                <ul className="mt-6 space-y-2">
                  {cause.support.map((s) => (
                    <li key={s.title} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                      <span><span className="font-semibold text-forest-900">{s.title}.</span> <span className="text-muted">{s.text}</span></span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`/causes/${cause.slug}`} variant="primary" className="group">
                    Learn more <Arrow />
                  </ButtonLink>
                  <ButtonLink href={`/donate?cause=${cause.designation}`} variant="outline">Donate to this cause</ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site">
          <div className="rounded-[2rem] bg-forest-900 p-8 text-cream-100 sm:p-12 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="text-[2rem] !text-cream-50">Not sure which cause to choose?</h2>
              <p className="mt-2 max-w-xl text-cream-100/80">A gift to “where it’s needed most” lets the foundation direct support to the most urgent need across all three causes.</p>
            </div>
            <Link href="/donate?cause=general" className="group mt-6 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-gold-400 px-6 font-semibold text-forest-950 hover:bg-gold-300 md:mt-0">
              Give where it’s needed most <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
