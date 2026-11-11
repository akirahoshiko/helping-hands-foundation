import Image from "next/image";
import Link from "next/link";
import { Arrow, ButtonLink, Picture, SectionIntro } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { QuickDonate } from "@/components/QuickDonate";
import { CountUp } from "@/components/CountUp";
import { GiftCalculator } from "@/components/GiftCalculator";
import { Donut, Progress, StoryCard } from "@/components/Widgets";
import { causes } from "@/content/causes";
import { photos } from "@/content/photos";
import { stories } from "@/content/stories";
import { site } from "@/config/site";

export default function HomePage() {
  const [orphan, education, medical] = causes;
  return (
    <>
      {/* Hero: full-bleed photo, bold headline and a donation box (charity: water / GiveDirectly pattern) */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-cream-50">
        <Image src={photos.heroWindow.src} alt={photos.heroWindow.alt} fill priority placeholder="blur" sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/10 max-lg:bg-gradient-to-b max-lg:from-forest-950/60 max-lg:via-forest-950/85 max-lg:to-forest-950" />
        <div className="container-site grid min-h-[min(46rem,92vh)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7 motion-safe:animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-cream-50/25 bg-forest-950/40 px-4 py-1.5 text-[0.82rem] font-semibold tracking-[0.12em] text-gold-300 uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" /> Helping Hands Foundation
            </p>
            <h1 className="mt-6 text-[3rem] !text-cream-50 sm:text-[4.4rem] lg:text-[5.4rem]">
              A helping hand. <span className="block italic text-gold-300">A brighter tomorrow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.15rem] text-cream-100/90">
              We stand with orphans and vulnerable children across Africa, and with families who cannot afford the medical treatment they need, with practical support that protects their dignity and their future.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
              <ButtonLink href="/causes" variant="outline-light">Explore Our Causes</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="mx-auto max-w-md lg:ml-auto">
              <p className="mb-3 font-display text-[1.6rem] leading-tight text-cream-50">Give a child a brighter start today.</p>
              <QuickDonate />
            </div>
          </div>
        </div>
        <p className="absolute right-4 bottom-3 rounded-full bg-forest-950/70 px-3 py-1 text-[0.72rem] text-cream-100/90">Illustrative photo</p>
      </section>

      {/* Impact numbers (Slum2School / Mercy Corps pattern) */}
      <section aria-label="Our impact" className="bg-gold-400 text-forest-950">
        <div className="container-site py-10 lg:py-12">
          <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {site.impact.map((s, i) => (
              <div key={s.label} className={`flex flex-col px-2 text-center ${i ? "lg:border-l lg:border-forest-950/15" : ""}`}>
                <dt className="order-2 mt-1 text-[0.95rem] font-semibold">{s.label}</dt>
                <dd className="order-1 font-display text-[2.8rem] leading-none sm:text-[3.4rem]"><CountUp value={s.value} suffix={s.suffix} /></dd>
              </div>
            ))}
          </dl>
          {site.demo && <p className="mt-6 text-center text-[0.8rem] text-forest-950/70">Sample figures for this portfolio demo.</p>}
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Picture photo={photos.girlsLaughing} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/5] rounded-[2rem]" label />
            <div className="absolute -right-4 -bottom-6 hidden rounded-[1.4rem] bg-forest-800 px-6 py-5 text-cream-50 shadow-xl sm:block">
              <p className="font-display text-[2.2rem] leading-none text-gold-300">Since {site.founded}</p>
              <p className="mt-1 text-[0.92rem] text-cream-100/85">standing with families</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-4 text-[2.3rem] sm:text-[3rem]">No child should face hardship alone.</h2>
            <div className="mt-5 space-y-4 text-[1.1rem] text-muted">
              <p>Helping Hands Foundation was built on a simple belief: steady, practical help, offered with respect, can change the direction of a life.</p>
              <p>We focus on three areas where support makes an immediate difference: caring for orphaned children, helping vulnerable children stay healthy and in school, and helping families meet the cost of medical treatment.</p>
            </div>
            <Link href="/about" className="group mt-7 inline-flex items-center gap-2 font-semibold text-forest-800 underline-offset-4 hover:underline">
              Our story, mission and team <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Causes with campaign progress */}
      <section aria-labelledby="causes-title" className="bg-cream-100 py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="Our causes" title="Three ways to make a lasting difference" id="causes-title" />
            <ButtonLink href="/causes" variant="outline" className="group shrink-0 self-start md:self-auto">All causes <Arrow /></ButtonLink>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <article className="group relative flex h-full min-h-[32rem] flex-col justify-end overflow-hidden rounded-[2rem] text-cream-50">
                <Picture photo={orphan.photo} sizes="(min-width: 1024px) 56vw, 100vw" className="!absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/45 to-transparent" />
                <div className="relative p-8 sm:p-10">
                  <span className="rounded-full bg-gold-400 px-3 py-1 text-[0.75rem] font-bold tracking-wide text-forest-950 uppercase">{orphan.campaign.name}</span>
                  <h3 className="mt-4 text-[2.4rem] !text-cream-50 sm:text-[2.9rem]">
                    <Link href={`/causes/${orphan.slug}`} className="after:absolute after:inset-0">{orphan.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-md text-[1.05rem] text-cream-100/90">{orphan.short}</p>
                  <div className="mt-6 max-w-md"><Progress raised={orphan.campaign.raised} goal={orphan.campaign.goal} tone="dark" /></div>
                </div>
              </article>
            </Reveal>
            {[education, medical].map((c, k) => (
              <Reveal key={c.slug} className="lg:col-span-5" delay={100 + k * 80}>
                <article className={`group relative grid h-full grid-cols-1 overflow-hidden rounded-[2rem] sm:grid-cols-5 ${k ? "bg-forest-900 text-cream-50" : "border border-cream-200 bg-white"}`}>
                  <Picture photo={c.photo} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw" className="min-h-52 sm:col-span-2" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="flex flex-col p-6 sm:col-span-3">
                    <span className={`text-[0.75rem] font-bold tracking-[0.12em] uppercase ${k ? "text-gold-300" : "text-gold-600"}`}>{c.campaign.name}</span>
                    <h3 className={`mt-2 text-[1.6rem] leading-tight ${k ? "!text-cream-50" : ""}`}>
                      <Link href={`/causes/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link>
                    </h3>
                    <p className={`mt-1 text-[0.97rem] ${k ? "text-cream-100/85" : "text-muted"}`}>{c.short}</p>
                    <div className="mt-auto pt-5"><Progress raised={c.campaign.raised} goal={c.campaign.goal} tone={k ? "dark" : "light"} /></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {site.demo && <p className="mt-6 text-[0.82rem] text-muted">Campaign totals are sample figures for this portfolio demo.</p>}
        </div>
      </section>

      {/* What your gift can do (World Vision pattern) */}
      <section aria-labelledby="calc-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionIntro eyebrow="Your impact" title="See what your gift can do" id="calc-title" align="center">
              <p>Choose a cause and an amount to see an example of what your donation could provide.</p>
            </SectionIntro>
          </Reveal>
          <Reveal className="mt-12" delay={100}>
            <GiftCalculator />
          </Reveal>
        </div>
      </section>

      {/* Where the money goes + accountability */}
      <section aria-labelledby="trust-title" className="bg-forest-900 py-20 text-cream-100 lg:py-28">
        <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow !text-gold-300">Accountability</p>
            <h2 id="trust-title" className="mt-4 text-[2.3rem] !text-cream-50 sm:text-[2.9rem]">Every dollar, accounted for.</h2>
            <p className="mt-5 max-w-xl text-[1.08rem] text-cream-100/80">We publish where donations go, every year. In 2025, 82 cents of every dollar went directly to our programmes.</p>
            <ul className="mt-8 space-y-4">
              {[
                ["Gifts go where you choose", "Directed gifts are used for the cause the donor selects."],
                ["Payments go to providers", "Medical support is paid straight to hospitals and clinics, never in cash."],
                ["Open reporting", "Annual reports and financial summaries are published on our Transparency page."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-400 text-forest-950">
                    <svg viewBox="0 0 20 20" className="h-4 w-4"><path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span><span className="block font-semibold text-cream-50">{t}</span><span className="text-cream-100/75">{d}</span></span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/transparency/annual-report-2025" variant="gold" className="group">Read the 2025 report <Arrow /></ButtonLink>
              <ButtonLink href="/transparency" variant="outline-light">Our transparency</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <div className="rounded-[2rem] bg-cream-50 p-8 text-ink">
              <p className="font-display text-[1.6rem] text-forest-900">Where your money goes</p>
              <p className="text-[0.92rem] text-muted">Annual Report 2025{site.demo ? " · sample figures" : ""}</p>
              <div className="mt-6"><Donut data={site.spending} /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* News */}
      <section aria-labelledby="news-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="News & stories" title="From the field" id="news-title" />
            <ButtonLink href="/news" variant="outline" className="group shrink-0 self-start md:self-auto">All news <Arrow /></ButtonLink>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}><StoryCard story={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section aria-labelledby="team-title" className="bg-cream-100 py-16 lg:py-20">
        <div className="container-site flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Our people</p>
            <h2 id="team-title" className="mt-3 text-[2rem] sm:text-[2.4rem]">Led by people who show up.</h2>
            <p className="mt-2 max-w-lg text-muted">A small team of educators, health professionals and accountants, supported by more than 150 volunteers.</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex -space-x-4" aria-label="Team members">
              {site.team.slice(0, 5).map((m) => (
                <li key={m.name} className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-cream-100 bg-cream-200 sm:h-20 sm:w-20">
                  {m.photo && <Image src={m.photo} alt={m.name} fill sizes="80px" className="object-cover" />}
                </li>
              ))}
            </ul>
            <ButtonLink href="/about#team" variant="primary" className="group whitespace-nowrap">Meet the team <Arrow /></ButtonLink>
          </div>
        </div>
      </section>

      {/* Get involved */}
      <section aria-labelledby="involve-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionIntro eyebrow="Get involved" title="Bring your time, skills or organisation." id="involve-title" align="center">
              <p>Giving money is one way to help. There are others, and every one of them matters.</p>
            </SectionIntro>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { href: "/get-involved#volunteer", title: "Volunteer", text: "Teaching, mentoring, healthcare, logistics: offer the skills you have.", photo: photos.community, cta: "Register your interest" },
              { href: "/get-involved#partnership", title: "Partner with us", text: "Companies, schools and clinics can reach further with us.", photo: photos.gathering, cta: "Explore partnership" },
              { href: "/get-involved#in-kind", title: "Give in kind", text: "Books, school supplies, clothing and bedding make an instant difference.", photo: photos.girlWithBook, cta: "Offer supplies" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <Link href={t.href} className="group relative block overflow-hidden rounded-[2rem] text-cream-50">
                  <Picture photo={t.photo} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/55 to-forest-950/5" />
                  <span className="absolute inset-x-0 bottom-0 p-7">
                    <span className="block font-display text-[2rem] text-cream-50">{t.title}</span>
                    <span className="mt-2 block text-cream-100/90">{t.text}</span>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-300">{t.cta} <Arrow /></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final invitation */}
      <section aria-labelledby="final-title" className="pb-20 lg:pb-28">
        <div className="container-site">
          <Reveal className="relative overflow-hidden rounded-[2.4rem] bg-forest-800 px-7 py-16 text-center sm:px-12 lg:py-20">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-forest-700/60">
              <path d="M100 160s-55-34-55-75a30 30 0 0 1 55-17 30 30 0 0 1 55 17c0 41-55 75-55 75z" fill="currentColor" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 text-gold-400/20">
              <path d="M100 160s-55-34-55-75a30 30 0 0 1 55-17 30 30 0 0 1 55 17c0 41-55 75-55 75z" fill="currentColor" />
            </svg>
            <p className="eyebrow relative justify-center !text-gold-300">Be the helping hand</p>
            <h2 id="final-title" className="relative mx-auto mt-4 max-w-2xl text-[2.3rem] !text-cream-50 sm:text-[3rem]">Your kindness can be the start of a brighter tomorrow.</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[1.08rem] text-cream-100/85">Give once or every month, to the cause that matters most to you.</p>
            <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
              <ButtonLink href="/get-involved" variant="outline-light">Other ways to help</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
