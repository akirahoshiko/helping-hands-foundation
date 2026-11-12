import type { Metadata } from "next";
import Image from "next/image";
import { Arrow, ButtonLink, PageHeader, Picture, SectionIntro } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { hasRegistration, site } from "@/config/site";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "About us",
  description: "The story, mission, values, team and registration of Helping Hands Foundation.",
};

const values = [
  { title: "People, not cases", text: "We don't put children's faces on posters or share anyone's story without asking. Everyone we help is treated the way we'd want our own family treated." },
  { title: "Listen first", text: "We sit down with families before deciding anything. What they tell us they need usually isn't what we'd have guessed." },
  { title: "Work with the community", text: "Teachers, nurses, pastors and imams often know which families are struggling long before we do. We rely on them." },
  { title: "Be open about money", text: "We publish our accounts every year. If you want to know where your gift went, ask us and we'll tell you." },
];

const approach = [
  { title: "We visit", text: "Someone from the team meets the family, the school or the hospital in person." },
  { title: "We check", text: "We confirm the fees or the bill with the school or hospital before agreeing to anything." },
  { title: "We pay directly", text: "Money goes to the school, the hospital or the supplier, not to individuals." },
  { title: "We follow up", text: "We go back a few months later to see how things are going, and we write it up in our reports." },
];

export default function AboutPage() {
  const r = site.registration;
  return (
    <>
      <PageHeader eyebrow="About us" title={<>A small foundation that <span className="hl">does what it says.</span></>} intro={<p>Helping Hands Foundation supports orphans, vulnerable children and families who need help paying for medical treatment, with a team that knows the communities it serves.</p>} />

      <section aria-labelledby="story-title" className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="mt-4 text-[2.3rem] sm:text-[2.9rem]">Where it began</h2>
            <div className="mt-6 space-y-4 text-[1.1rem] text-muted">
              {site.history.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-ink-900 p-7 text-sand-100">
                <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-sun-300 uppercase">Our mission</p>
                <p className="mt-3 font-display text-[1.35rem] leading-snug text-sand-50">Keep children who have lost a parent fed, safe and in school, and help families pay for treatment they can’t afford.</p>
              </div>
              <div className="rounded-[1.6rem] bg-sun-400 p-7 text-ink-950">
                <p className="text-[0.8rem] font-semibold tracking-[0.16em] uppercase">Our vision</p>
                <p className="mt-3 font-display text-[1.35rem] leading-snug">No child leaves school because of money, and no family stops treatment halfway because the bill got too big.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <Picture photo={photos.friends} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] rounded-[2rem]" />
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section aria-labelledby="journey-title" className="bg-sand-100 py-20 lg:py-24">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our journey" title="How we got here" id="journey-title" /></Reveal>
          <ol className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
            <span aria-hidden="true" className="absolute top-[1.15rem] right-0 left-0 hidden h-0.5 bg-sun-400/60 lg:block" />
            {site.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 80} className="relative">
                <span className="relative z-10 inline-flex h-9 items-center rounded-full bg-ink-800 px-4 font-display text-[1.1rem] text-sun-300">{m.year}</span>
                <h3 className="mt-4 font-sans text-[1.1rem] font-semibold">{m.title}</h3>
                <p className="mt-1 text-[0.97rem] text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-ink-900 py-20 text-sand-100 lg:py-28">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow !text-sun-300">Our values</p>
            <h2 id="values-title" className="mt-4 max-w-2xl text-[2.2rem] !text-sand-50 sm:text-[2.8rem]">What we care about</h2>
          </Reveal>
          <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="border-t border-sand-100/20 pt-6">
                <dt className="font-display text-[1.7rem] text-sun-300">{v.title}</dt>
                <dd className="mt-2 max-w-md text-[1.05rem] text-sand-100/80">{v.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our approach" title="How we help a family" id="approach-title" /></Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[1.6rem] border border-sand-200 bg-white p-7">
                <span className="font-display text-[2.4rem] leading-none text-sun-400">{i + 1}</span>
                <h3 className="mt-4 font-sans text-[1.15rem] font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" aria-labelledby="team-title" className="scroll-mt-24 bg-sand-100 py-20 lg:py-28">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our people" title="The team" id="team-title"><p>Six people run the foundation day to day. A board of trustees keeps an eye on the money, and about 150 volunteers help out.</p></SectionIntro></Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={(i % 3) * 80} className="group overflow-hidden rounded-[1.8rem] bg-white">
                {m.photo && (
                  <div className="relative aspect-[5/6] overflow-hidden bg-sand-200">
                    <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" placeholder="blur" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-[1.45rem]">{m.name}</h3>
                  <p className="text-[0.95rem] font-semibold text-sun-600">{m.role}</p>
                  {m.bio && <p className="mt-2 text-muted">{m.bio}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Registration (shown once details are filled in) */}
      <section className="py-20">
        {hasRegistration() && (
        <div className="container-site mb-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[1.8rem] border border-sand-200 bg-white p-8">
              <p className="eyebrow">Registration</p>
              <dl className="mt-6 grid grid-cols-1 gap-4 text-[0.98rem] sm:grid-cols-2">
                <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{r.legalName}</dd></div>
                <div><dt className="text-muted">Registered in</dt><dd className="font-semibold">{r.country}</dd></div>
                <div><dt className="text-muted">Registration number</dt><dd className="font-semibold">{r.number}</dd></div>
                <div><dt className="text-muted">Founded</dt><dd className="font-semibold">{site.founded}</dd></div>
                {r.authority && <div className="sm:col-span-2"><dt className="text-muted">Note</dt><dd className="font-semibold">{r.authority}</dd></div>}
              </dl>
            </div>
        </div>
        )}
        <div className="container-site flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/causes" variant="outline">Our causes</ButtonLink>
          <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
        </div>
      </section>
    </>
  );
}
