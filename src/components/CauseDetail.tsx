import Link from "next/link";
import { Arrow, ButtonLink, Notice, Picture } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { causes, type Cause } from "@/content/causes";
import { Progress } from "@/components/Widgets";

export function CauseDetail({ cause }: { cause: Cause }) {
  const others = causes.filter((c) => c.slug !== cause.slug);
  return (
    <>
      <section className="bg-sand-100">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="text-[0.92rem] text-muted">
              <ol className="flex flex-wrap gap-2">
                <li><Link href="/causes" className="text-ink-800 underline-offset-4 hover:underline">Our causes</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{cause.title}</li>
              </ol>
            </nav>
            <h1 className="mt-5 text-[2.6rem] sm:text-[3.5rem]">{cause.title}</h1>
            <p className="mt-5 max-w-xl text-[1.15rem] text-muted">{cause.summary}</p>
            <div className="mt-7 max-w-md rounded-2xl border border-sand-200 bg-white p-5">
              <p className="text-[0.8rem] font-bold tracking-[0.12em] text-sun-600 uppercase">{cause.campaign.name}</p>
              <div className="mt-3"><Progress raised={cause.campaign.raised} goal={cause.campaign.goal} /></div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/donate?cause=${cause.designation}`} variant="gold" className="group">
                Donate to this cause <Arrow />
              </ButtonLink>
              <ButtonLink href="#ways-to-help" variant="outline">Ways to help</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Picture photo={cause.photo} priority sizes="(min-width: 1024px) 48vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="need-title" className="py-20 lg:py-24">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">The problem</p>
            <h2 id="need-title" className="mt-4 text-[2.1rem] sm:text-[2.5rem]">Why we do this</h2>
            <div className="mt-6 space-y-4 text-[1.08rem] text-muted">
              {cause.need.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <Picture photo={cause.secondPhoto} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[5/4] rounded-[2rem]" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="support-title" className="bg-ink-900 py-20 text-sand-100 lg:py-24">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow !text-sun-300">What we do</p>
            <h2 id="support-title" className="mt-4 max-w-2xl text-[2.1rem] !text-sand-50 sm:text-[2.5rem]">Where the money goes</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {cause.support.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="border-t border-sand-100/20 pt-6">
                <h3 className="font-display text-[1.55rem] !text-sun-300">{s.title}</h3>
                <p className="mt-2 text-sand-100/80">{s.text}</p>
              </Reveal>
            ))}
          </ul>
          <h3 className="mt-16 font-sans text-[0.85rem] font-semibold tracking-[0.16em] !text-sun-300 uppercase">What your gift pays for</h3>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cause.gifts.map((g) => (
              <li key={g.amount}>
                <Link href={`/donate?amount=${g.amount}&cause=${cause.designation}`} className="group flex h-full flex-col rounded-[1.4rem] bg-ink-800 p-6 transition-colors hover:bg-ink-700">
                  <span className="font-display text-[2.4rem] leading-none text-sun-300">${g.amount}</span>
                  <span className="mt-3 text-sand-100/90">{g.text}</span>
                  <span className="mt-auto pt-4 text-[0.92rem] font-semibold text-sun-300">Give ${g.amount} <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ways-to-help" aria-labelledby="ways-title" className="scroll-mt-24 py-20 lg:py-24">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Get involved</p>
            <h2 id="ways-title" className="mt-4 text-[2.1rem] sm:text-[2.5rem]">Ways to help</h2>
          </Reveal>
          <ul className="mt-10 divide-y divide-sand-200 border-y border-sand-200">
            {cause.ways.map((w) => (
              <li key={w.title}>
                <Link href={w.href} className="group grid grid-cols-1 items-center gap-3 py-7 sm:grid-cols-12">
                  <span className="font-display text-[1.6rem] text-ink-900 sm:col-span-4">{w.title}</span>
                  <span className="text-muted sm:col-span-5">{w.text}</span>
                  <span className="inline-flex items-center gap-2 font-semibold text-ink-800 sm:col-span-3 sm:justify-end">{w.cta} <Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
          {cause.note && (
            <div className="mt-10 max-w-3xl">
              <Notice title="How patients reach us">{cause.note}</Notice>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="other-title" className="bg-sand-100 py-16">
        <div className="container-site">
          <h2 id="other-title" className="text-[1.8rem]">Other causes</h2>
          <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/causes/${o.slug}`} className="group flex items-center gap-5 rounded-[1.6rem] border border-sand-200 bg-white p-4 transition-shadow hover:shadow-[0_20px_40px_-28px_rgba(15,42,31,0.5)]">
                  <Picture photo={o.photo} sizes="7rem" className="h-24 w-28 shrink-0 rounded-[1.1rem]" />
                  <span>
                    <span className="block font-display text-[1.35rem] text-ink-900">{o.title}</span>
                    <span className="mt-1 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink-800">Learn more <Arrow /></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
