import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ButtonLink, PageHeader, Picture } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { causes } from "@/content/causes";
import { Progress } from "@/components/Widgets";

export const metadata: Metadata = {
  title: "Our causes",
  description: "Orphan Care, Children’s Education, and Medical Support: the three causes of Helping Hands Foundation.",
};

export default function CausesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our causes"
        title="What we do"
        intro={<p>Three areas, picked because a little money makes a real difference in each. You can give to one, or let us put your gift where it’s most needed.</p>}
      />

      <section className="py-16 lg:py-24">
        <div className="container-site space-y-20 lg:space-y-28">
          {causes.map((cause, i) => (
            <Reveal key={cause.slug} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <Picture photo={cause.photo} sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                <p className="font-display text-[1.2rem] text-sun-600">0{i + 1}</p>
                <h2 className="mt-2 text-[2.2rem] sm:text-[2.7rem]">{cause.title}</h2>
                <p className="mt-4 text-[1.08rem] text-muted">{cause.summary}</p>
                <ul className="mt-6 space-y-2">
                  {cause.support.map((s) => (
                    <li key={s.title} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-400" />
                      <span><span className="font-semibold text-ink-900">{s.title}.</span> <span className="text-muted">{s.text}</span></span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 max-w-md">
                  <p className="mb-2 text-[0.8rem] font-bold tracking-[0.12em] text-sun-600 uppercase">{cause.campaign.name}</p>
                  <Progress raised={cause.campaign.raised} goal={cause.campaign.goal} />
                </div>
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
          <div className="rounded-[2rem] bg-ink-900 p-8 text-sand-100 sm:p-12 md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="text-[2rem] !text-sand-50">Not sure which cause to choose?</h2>
              <p className="mt-2 max-w-xl text-sand-100/80">Give to “wherever it’s needed most” and we’ll put it towards whatever is most urgent that month.</p>
            </div>
            <Link href="/donate?cause=general" className="group mt-6 inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-sun-400 px-6 font-semibold text-ink-950 hover:bg-sun-300 md:mt-0">
              Give where it’s needed most <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
