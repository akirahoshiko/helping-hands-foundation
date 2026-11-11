import Link from "next/link";
import { Arrow, ButtonLink, Picture, SectionIntro } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { causes } from "@/content/causes";
import { photos } from "@/content/photos";

export default function HomePage() {
  const [orphan, education, medical] = causes;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="container-site grid grid-cols-1 items-center gap-10 pt-8 pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-14 lg:pb-24">
          <div className="lg:col-span-6 motion-safe:animate-rise">
            <p className="eyebrow">Helping Hands Foundation</p>
            <h1 className="mt-5 text-[2.9rem] sm:text-[4rem] lg:text-[4.6rem]">
              A helping hand. <span className="italic text-forest-700">A brighter tomorrow.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.15rem] text-muted">
              We stand with orphans and vulnerable children across Africa, and with people who cannot afford the medical treatment they need, offering practical support that protects their dignity and their future.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/donate" variant="gold" className="group">
                Make a Donation <Arrow />
              </ButtonLink>
              <ButtonLink href="/causes" variant="outline">
                Explore Our Causes
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-6">
            <div aria-hidden="true" className="absolute -right-10 -top-10 hidden h-72 w-72 rounded-full bg-gold-300/25 blur-2xl lg:block" />
            <Picture
              photo={photos.hero}
              priority
              label
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[4/3] rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(15,42,31,0.55)] lg:aspect-[5/4]"
              imgClassName="object-[30%_center]"
            />
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="border-y border-cream-200 bg-cream-100">
        <div className="container-site grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-4 text-[2.2rem] sm:text-[2.8rem]">No child should face hardship alone. No family should choose between treatment and tomorrow.</h2>
          </Reveal>
          <Reveal className="space-y-5 text-[1.1rem] text-muted lg:col-span-6 lg:col-start-7 lg:pt-12" delay={120}>
            <p>
              Helping Hands Foundation is a new foundation built on a simple belief: that steady, practical help, offered with respect, can change the direction of a life.
            </p>
            <p>
              We focus on three areas where support makes an immediate difference: caring for orphaned children, helping vulnerable children stay healthy and in school, and assisting people who need medical treatment they cannot afford.
            </p>
            <Link href="/about" className="group inline-flex items-center gap-2 font-semibold text-forest-800 underline-offset-4 hover:underline">
              Read about our mission and values <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Causes */}
      <section aria-labelledby="causes-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionIntro eyebrow="Our causes" title="Three ways to make a lasting difference" id="causes-title" />
            <ButtonLink href="/causes" variant="outline" className="group shrink-0 self-start md:self-auto">
              All causes <Arrow />
            </ButtonLink>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Feature: Orphan Care */}
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <Link href={`/causes/${orphan.slug}`} className="group relative flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] text-cream-50">
                <Picture photo={orphan.photo} sizes="(min-width: 1024px) 56vw, 100vw" className="!absolute inset-0" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-transparent" />
                <span className="relative p-8 sm:p-10">
                  <span className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">01 · Cause</span>
                  <span className="mt-3 block font-display text-[2.3rem] leading-tight text-cream-50 sm:text-[2.8rem]">{orphan.title}</span>
                  <span className="mt-3 block max-w-md text-[1.05rem] text-cream-100/90">{orphan.short}</span>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-300">
                    Learn about this cause <Arrow />
                  </span>
                </span>
              </Link>
            </Reveal>

            {/* Education: image left, text right */}
            <Reveal className="lg:col-span-5" delay={100}>
              <Link href={`/causes/${education.slug}`} className="group grid h-full grid-cols-1 overflow-hidden rounded-[2rem] border border-cream-200 bg-white transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(15,42,31,0.5)] sm:grid-cols-2">
                <Picture photo={education.photo} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" className="min-h-56" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="flex flex-col p-7">
                  <span className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-600 uppercase">02 · Cause</span>
                  <span className="mt-3 font-display text-[1.65rem] leading-tight text-forest-900">{education.title}</span>
                  <span className="mt-2 text-muted">{education.short}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold text-forest-800">Learn more <Arrow /></span>
                </span>
              </Link>
            </Reveal>

            {/* Medical: forest panel with inset photo */}
            <Reveal className="lg:col-span-5" delay={180}>
              <Link href={`/causes/${medical.slug}`} className="group flex h-full flex-col gap-6 rounded-[2rem] bg-forest-900 p-7 text-cream-50 sm:flex-row sm:items-center">
                <Picture photo={medical.photo} sizes="(min-width: 640px) 12rem, 100vw" className="aspect-square w-full shrink-0 rounded-[1.4rem] sm:w-44" imgClassName="transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="flex flex-col">
                  <span className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">03 · Cause</span>
                  <span className="mt-3 font-display text-[1.65rem] leading-tight text-cream-50">{medical.title}</span>
                  <span className="mt-2 text-cream-100/85">{medical.short}</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-300">Learn more <Arrow /></span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How giving works */}
      <section aria-labelledby="giving-title" className="bg-forest-900 text-cream-100">
        <div className="container-site py-20 lg:py-28">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow !text-gold-300">How your gift helps</p>
              <h2 id="giving-title" className="mt-4 text-[2.2rem] !text-cream-50 sm:text-[2.8rem]">You choose where your support goes.</h2>
              <p className="mt-5 text-[1.08rem] text-cream-100/80">
                Every donation form asks one simple question: where should this gift go? We intend to honour that choice, and to report on how gifts are used as the foundation’s work begins.
              </p>
              <ButtonLink href="/donate" variant="gold" className="group mt-8">
                Make a Donation <Arrow />
              </ButtonLink>
            </div>
            <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.6rem] bg-cream-100/15 sm:grid-cols-2 lg:col-span-7">
              {[
                ["Where it’s needed most", "A general gift lets the foundation direct support to whichever of the three causes needs it most at that moment."],
                ["A cause you choose", "Choose Orphan Care, Children’s Wellbeing & Education or Medical Support, and your gift is intended for that cause alone."],
                ["Once or every month", "A one-time gift helps right away. Regular giving, when available, helps the foundation plan support with confidence."],
                ["Secure and simple", "Payments are handled on a secure, PCI-compliant checkout. Your card details never touch this website."],
              ].map(([title, text], i) => (
                <li key={title} className="bg-forest-900 p-7">
                  <span className="font-display text-[1.6rem] text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-sans text-[1.12rem] font-semibold !text-cream-50">{title}</h3>
                  <p className="mt-2 text-[0.98rem] text-cream-100/75">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Accountability */}
      <section aria-labelledby="trust-title" className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Picture photo={photos.girlsLaughing} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[2rem]" label />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
            <SectionIntro eyebrow="Accountability" title="Trust is earned. We intend to earn it openly." id="trust-title">
              <p>As a new foundation, we are building good practice from day one, so that every supporter can see how their contribution is treated.</p>
            </SectionIntro>
            <ul className="mt-8 space-y-5">
              {[
                ["Honest reporting", "We will publish annual reports, financial summaries and project updates as they become available, and never before they are verified."],
                ["Careful assessment", "Support is intended to follow a fair review of need, carried out directly with families, caregivers and care providers."],
                ["Responsible stewardship", "Directed gifts are intended for the cause the donor chose. Records of every gift are kept with the payment provider."],
                ["Dignity and privacy", "We will never publish personal stories or images of the people we support without their informed consent."],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-100 text-forest-800">
                    <svg viewBox="0 0 20 20" className="h-4 w-4"><path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-forest-900">{title}</span>
                    <span className="text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/transparency" className="group mt-8 inline-flex items-center gap-2 font-semibold text-forest-800 underline-offset-4 hover:underline">
              Our approach to transparency <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Volunteer & partner */}
      <section aria-labelledby="involve-title" className="bg-cream-100 py-20 lg:py-28">
        <div className="container-site">
          <Reveal>
            <SectionIntro eyebrow="Get involved" title="Bring your time, skills or organisation." id="involve-title" align="center">
              <p>Giving money is one way to help. There are others, and every one of them matters.</p>
            </SectionIntro>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <Link href="/get-involved#volunteer" className="group relative block overflow-hidden rounded-[2rem] text-cream-50">
                <Picture photo={photos.community} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] md:aspect-[5/4]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/60 to-forest-950/5" />
                <span className="absolute inset-x-0 bottom-0 p-8">
                  <span className="block font-display text-[2rem] text-cream-50">Volunteer</span>
                  <span className="mt-2 block max-w-sm text-cream-100/90">Offer your time or professional skills, from teaching and mentoring to healthcare and logistics.</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-300">Register your interest <Arrow /></span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <Link href="/get-involved#partnership" className="group relative block overflow-hidden rounded-[2rem] text-cream-50">
                <Picture photo={photos.gathering} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] md:aspect-[5/4]" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/60 to-forest-950/5" />
                <span className="absolute inset-x-0 bottom-0 p-8">
                  <span className="block font-display text-[2rem] text-cream-50">Partner with us</span>
                  <span className="mt-2 block max-w-sm text-cream-100/90">Companies, schools, hospitals and community groups can work with us to reach further together.</span>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-300">Explore partnership <Arrow /></span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final invitation */}
      <section aria-labelledby="final-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal className="relative overflow-hidden rounded-[2.4rem] bg-forest-800 px-7 py-16 text-center sm:px-12 lg:py-20">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-forest-700/60">
              <path d="M100 160s-55-34-55-75a30 30 0 0 1 55-17 30 30 0 0 1 55 17c0 41-55 75-55 75z" fill="currentColor" />
            </svg>
            <p className="eyebrow relative justify-center !text-gold-300">Be the helping hand</p>
            <h2 id="final-title" className="relative mx-auto mt-4 max-w-2xl text-[2.3rem] !text-cream-50 sm:text-[3rem]">Your kindness can be the start of a brighter tomorrow.</h2>
            <p className="relative mx-auto mt-5 max-w-xl text-[1.08rem] text-cream-100/85">Give once or every month, to the cause that matters most to you. Every gift is received with gratitude.</p>
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
