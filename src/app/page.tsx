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
      <section className="relative isolate overflow-hidden bg-ink-950 text-sand-50">
        <Image src={photos.heroWindow.src} alt={photos.heroWindow.alt} fill priority placeholder="blur" sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/10 max-lg:bg-gradient-to-b max-lg:from-ink-950/60 max-lg:via-ink-950/85 max-lg:to-ink-950" />
        <div className="container-site grid min-h-[min(46rem,92vh)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7 motion-safe:animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-sand-50/25 bg-ink-950/40 px-4 py-1.5 text-[0.82rem] font-semibold tracking-[0.12em] text-sun-300 uppercase backdrop-blur-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sun-300" /> Lagos, Nigeria · since 2021
            </p>
            <h1 className="mt-6 text-[3rem] !text-sand-50 sm:text-[4.4rem] lg:text-[5.4rem]">
              A helping hand. <span className="hl-dark block">A brighter tomorrow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.15rem] text-sand-100/90">
              We pay school fees, keep families fed when they take in a child who has lost a parent, and help with hospital bills nobody should have to face alone.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
              <ButtonLink href="/causes" variant="outline-light">Explore Our Causes</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="mx-auto max-w-md lg:ml-auto">
              <p className="mb-3 font-display text-[1.6rem] leading-tight text-sand-50">Give something today</p>
              <QuickDonate />
            </div>
          </div>
        </div>
        
      </section>

      {/* Impact numbers (Slum2School / Mercy Corps pattern) */}
      <section aria-label="Our impact" className="bg-sun-400 text-ink-950">
        <div className="container-site py-10 lg:py-12">
          <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {site.impact.map((s, i) => (
              <div key={s.label} className={`flex flex-col px-2 text-center ${i ? "lg:border-l lg:border-ink-950/15" : ""}`}>
                <dt className="order-2 mt-1 text-[0.95rem] font-semibold">{s.label}</dt>
                <dd className="order-1 font-display text-[2.8rem] leading-none sm:text-[3.4rem]"><CountUp value={s.value} suffix={s.suffix} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Picture photo={photos.girlsLaughing} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/5] rounded-[2rem]" />
            <div className="absolute -right-4 -bottom-6 hidden rounded-[1.4rem] bg-ink-800 px-6 py-5 text-sand-50 shadow-xl sm:block">
              <p className="font-display text-[2.2rem] leading-none text-sun-300">Since {site.founded}</p>
              <p className="mt-1 text-[0.92rem] text-sand-100/85">and still run by volunteers</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 text-[2.3rem] sm:text-[3rem]">It started with <span className="hl">nine school fees.</span></h2>
            <div className="mt-5 space-y-4 text-[1.1rem] text-muted">
              <p>In 2021 a group of twelve friends in Lagos started putting money aside every month to keep nine children in school after they lost a parent. Word got around, and it grew from there.</p>
              <p>We still keep things simple. We find out what a family actually needs, we pay schools and hospitals directly, and we go back to check it helped.</p>
            </div>
            <Link href="/about" className="group mt-7 inline-flex items-center gap-2 font-semibold text-ink-800 underline-offset-4 hover:underline">
              Read our story <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Causes with campaign progress */}
      <section aria-labelledby="causes-title" className="bg-sand-100 py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="Our causes" title="What we do" id="causes-title" />
            <ButtonLink href="/causes" variant="outline" className="group shrink-0 self-start md:self-auto">All causes <Arrow /></ButtonLink>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <article className="group relative flex h-full min-h-[32rem] flex-col justify-end overflow-hidden rounded-[2rem] text-sand-50">
                <Picture photo={orphan.photo} sizes="(min-width: 1024px) 56vw, 100vw" className="!absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-transparent" />
                <div className="relative p-8 sm:p-10">
                  <span className="rounded-full bg-sun-400 px-3 py-1 text-[0.75rem] font-bold tracking-wide text-ink-950 uppercase">{orphan.campaign.name}</span>
                  <h3 className="mt-4 text-[2.4rem] !text-sand-50 sm:text-[2.9rem]">
                    <Link href={`/causes/${orphan.slug}`} className="after:absolute after:inset-0">{orphan.title}</Link>
                  </h3>
                  <p className="mt-2 max-w-md text-[1.05rem] text-sand-100/90">{orphan.short}</p>
                  <div className="mt-6 max-w-md"><Progress raised={orphan.campaign.raised} goal={orphan.campaign.goal} tone="dark" /></div>
                </div>
              </article>
            </Reveal>
            {[education, medical].map((c, k) => (
              <Reveal key={c.slug} className="lg:col-span-5" delay={100 + k * 80}>
                <article className={`group relative grid h-full grid-cols-1 overflow-hidden rounded-[2rem] sm:grid-cols-5 ${k ? "bg-ink-900 text-sand-50" : "border border-sand-200 bg-white"}`}>
                  <Picture photo={c.photo} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 100vw" className="min-h-52 sm:col-span-2" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" />
                  <div className="flex flex-col p-6 sm:col-span-3">
                    <span className={`text-[0.75rem] font-bold tracking-[0.12em] uppercase ${k ? "text-sun-300" : "text-sun-600"}`}>{c.campaign.name}</span>
                    <h3 className={`mt-2 text-[1.6rem] leading-tight ${k ? "!text-sand-50" : ""}`}>
                      <Link href={`/causes/${c.slug}`} className="after:absolute after:inset-0">{c.title}</Link>
                    </h3>
                    <p className={`mt-1 text-[0.97rem] ${k ? "text-sand-100/85" : "text-muted"}`}>{c.short}</p>
                    <div className="mt-auto pt-5"><Progress raised={c.campaign.raised} goal={c.campaign.goal} tone={k ? "dark" : "light"} /></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What your gift can do (World Vision pattern) */}
      <section aria-labelledby="calc-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionIntro eyebrow="Your impact" title="What your money buys" id="calc-title" align="center">
              <p>Slide to an amount and pick a cause. These are the kinds of things your gift pays for.</p>
            </SectionIntro>
          </Reveal>
          <Reveal className="mt-12" delay={100}>
            <GiftCalculator />
          </Reveal>
        </div>
      </section>

      {/* Where the money goes + accountability */}
      <section aria-labelledby="trust-title" className="bg-ink-900 py-20 text-sand-100 lg:py-28">
        <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow !text-sun-300">Where the money goes</p>
            <h2 id="trust-title" className="mt-4 text-[2.3rem] !text-sand-50 sm:text-[2.9rem]">We show you the receipts.</h2>
            <p className="mt-5 max-w-xl text-[1.08rem] text-sand-100/80">Every year we publish what came in and what went out. In 2025, 82 cents of every dollar went straight to children and patients. The rest kept the lights on and paid for fundraising.</p>
            <ul className="mt-8 space-y-4">
              {[
                ["You choose the cause", "If you give to medical support, it goes to medical support."],
                ["We pay bills directly", "School fees go to the school and hospital bills go to the hospital. We don't hand out cash."],
                ["Reports you can read", "Our annual report and accounts are on the Transparency page for anyone to see."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span aria-hidden="true" className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun-400 text-ink-950">
                    <svg viewBox="0 0 20 20" className="h-4 w-4"><path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span><span className="block font-semibold text-sand-50">{t}</span><span className="text-sand-100/75">{d}</span></span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/transparency/annual-report-2025" variant="gold" className="group">Read the 2025 report <Arrow /></ButtonLink>
              <ButtonLink href="/transparency" variant="outline-light">See all reports</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={120}>
            <div className="rounded-[2rem] bg-sand-50 p-8 text-ink">
              <p className="font-display text-[1.6rem] text-ink-900">Where your money goes</p>
              <p className="text-[0.92rem] text-muted">Annual Report 2025</p>
              <div className="mt-6"><Donut data={site.spending} /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* News */}
      <section aria-labelledby="news-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="News & stories" title="Latest news" id="news-title" />
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
      <section aria-labelledby="team-title" className="bg-sand-100 py-16 lg:py-20">
        <div className="container-site flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Our people</p>
            <h2 id="team-title" className="mt-3 text-[2rem] sm:text-[2.4rem]">Small team, lots of help.</h2>
            <p className="mt-2 max-w-lg text-muted">Six of us run things day to day, a teacher, a doctor, an accountant and a few others. Around 150 volunteers do the rest.</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex -space-x-4" aria-label="Team members">
              {site.team.slice(0, 5).map((m) => (
                <li key={m.name} className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-sand-100 bg-sand-200 sm:h-20 sm:w-20">
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
            <SectionIntro eyebrow="Get involved" title="Not just money" id="involve-title" align="center">
              <p>Some of our best help has come from people giving an afternoon, a box of books or an introduction.</p>
            </SectionIntro>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { href: "/get-involved#volunteer", title: "Volunteer", text: "Tutoring, health days, school drives or helping in the office.", photo: photos.community, cta: "Register your interest" },
              { href: "/get-involved#partnership", title: "Partner with us", text: "Businesses, schools and clinics who want to do something useful together.", photo: photos.gathering, cta: "Explore partnership" },
              { href: "/get-involved#in-kind", title: "Give in kind", text: "Books, school supplies, clothes and bedding. Ask us first what's needed.", photo: photos.girlWithBook, cta: "Offer supplies" },
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 80}>
                <Link href={t.href} className="group relative block overflow-hidden rounded-[2rem] text-sand-50">
                  <Picture photo={t.photo} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/5" />
                  <span className="absolute inset-x-0 bottom-0 p-7">
                    <span className="block font-display text-[2rem] text-sand-50">{t.title}</span>
                    <span className="mt-2 block text-sand-100/90">{t.text}</span>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-sun-300">{t.cta} <Arrow /></span>
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
          <Reveal className="relative overflow-hidden rounded-[2.4rem] bg-ink-800 px-7 py-16 text-center sm:px-12 lg:py-20">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-ink-700/60">
              <path d="M100 160s-55-34-55-75a30 30 0 0 1 55-17 30 30 0 0 1 55 17c0 41-55 75-55 75z" fill="currentColor" />
            </svg>
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 text-sun-400/20">
              <path d="M100 160s-55-34-55-75a30 30 0 0 1 55-17 30 30 0 0 1 55 17c0 41-55 75-55 75z" fill="currentColor" />
            </svg>
            <p className="eyebrow relative justify-center !text-sun-300">Back to School 2026</p>
            <h2 id="final-title" className="relative mx-auto mt-4 max-w-2xl text-[2.3rem] !text-sand-50 sm:text-[3rem]">500 children, one school kit each.</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[1.08rem] text-sand-100/85">A full kit costs $50: uniform, shoes, bag and books. We’re about two thirds of the way there.</p>
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
