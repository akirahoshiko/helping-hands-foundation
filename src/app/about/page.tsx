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
  { title: "Dignity", text: "Every person we support is a person first, never a case or a photograph. We protect their privacy and speak about them with respect." },
  { title: "Compassion", text: "We listen before we act, and we offer help with warmth, patience and care." },
  { title: "Community participation", text: "Families, caregivers and local leaders know their needs best. We work alongside them, not around them." },
  { title: "Transparency", text: "Supporters deserve to know how their gifts are used. We report openly on our work and our finances, every year." },
];

const approach = [
  { title: "Listen", text: "Understand each situation directly, with the people involved and those who care for them." },
  { title: "Assess fairly", text: "Use clear, consistent criteria so support reaches those who need it most." },
  { title: "Support practically", text: "Provide concrete help (essentials, school costs, treatment costs) paid to schools and providers where possible." },
  { title: "Follow up and report", text: "Check that support made a difference, learn from it, and share what we learn." },
];

export default function AboutPage() {
  const r = site.registration;
  return (
    <>
      <PageHeader eyebrow="About us" title={<>We exist so that <span className="italic text-forest-700">no one is left to struggle alone.</span></>} intro={<p>Helping Hands Foundation supports orphans, vulnerable children and families who need help paying for medical treatment, with a team that knows the communities it serves.</p>} />

      <section aria-labelledby="story-title" className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="mt-4 text-[2.3rem] sm:text-[2.9rem]">It started with nine school fees.</h2>
            <div className="mt-6 space-y-4 text-[1.1rem] text-muted">
              {site.history.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-forest-900 p-7 text-cream-100">
                <p className="text-[0.8rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">Our mission</p>
                <p className="mt-3 font-display text-[1.35rem] leading-snug text-cream-50">To give orphaned and vulnerable children the care, nourishment and education they need to thrive, and to help people access the treatment that protects their lives.</p>
              </div>
              <div className="rounded-[1.6rem] bg-gold-400 p-7 text-forest-950">
                <p className="text-[0.8rem] font-semibold tracking-[0.16em] uppercase">Our vision</p>
                <p className="mt-3 font-display text-[1.35rem] leading-snug">Communities where every child grows up safe, healthy and learning, and no family gives up on treatment because of its cost.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <Picture photo={photos.motherChild} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] rounded-[2rem]" label />
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section aria-labelledby="journey-title" className="bg-cream-100 py-20 lg:py-24">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our journey" title="Five years of showing up" id="journey-title" /></Reveal>
          <ol className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6">
            <span aria-hidden="true" className="absolute top-[1.15rem] right-0 left-0 hidden h-0.5 bg-gold-400/60 md:block" />
            {site.milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 80} className="relative">
                <span className="relative z-10 inline-flex h-9 items-center rounded-full bg-forest-800 px-4 font-display text-[1.1rem] text-gold-300">{m.year}</span>
                <h3 className="mt-4 font-sans text-[1.1rem] font-semibold">{m.title}</h3>
                <p className="mt-1 text-[0.97rem] text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-forest-900 py-20 text-cream-100 lg:py-28">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow !text-gold-300">Our values</p>
            <h2 id="values-title" className="mt-4 max-w-2xl text-[2.2rem] !text-cream-50 sm:text-[2.8rem]">What guides every decision we make</h2>
          </Reveal>
          <dl className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="border-t border-cream-100/20 pt-6">
                <dt className="font-display text-[1.7rem] text-gold-300">{v.title}</dt>
                <dd className="mt-2 max-w-md text-[1.05rem] text-cream-100/80">{v.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our approach" title="Practical help, offered the right way" id="approach-title" /></Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[1.6rem] border border-cream-200 bg-white p-7">
                <span className="font-display text-[2.4rem] leading-none text-gold-400">{i + 1}</span>
                <h3 className="mt-4 font-sans text-[1.15rem] font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section id="team" aria-labelledby="team-title" className="scroll-mt-24 bg-cream-100 py-20 lg:py-28">
        <div className="container-site">
          <Reveal><SectionIntro eyebrow="Our people" title="The team behind the foundation" id="team-title"><p>A small staff team, an independent board of trustees and more than 150 volunteers.</p></SectionIntro></Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.team.map((m, i) => (
              <Reveal as="li" key={m.name} delay={(i % 3) * 80} className="group overflow-hidden rounded-[1.8rem] bg-white">
                {m.photo && (
                  <div className="relative aspect-[5/6] overflow-hidden bg-cream-200">
                    <Image src={m.photo} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" placeholder="blur" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-[1.45rem]">{m.name}</h3>
                  <p className="text-[0.95rem] font-semibold text-gold-600">{m.role}</p>
                  {m.bio && <p className="mt-2 text-muted">{m.bio}</p>}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Registration + demo note */}
      <section className="py-20">
        <div className="container-site grid grid-cols-1 gap-8 lg:grid-cols-2">
          {hasRegistration() && (
            <div className="rounded-[1.8rem] border border-cream-200 bg-white p-8">
              <p className="eyebrow">Registration</p>
              <dl className="mt-6 grid grid-cols-1 gap-4 text-[0.98rem] sm:grid-cols-2">
                <div><dt className="text-muted">Legal name</dt><dd className="font-semibold">{r.legalName}</dd></div>
                <div><dt className="text-muted">Registered in</dt><dd className="font-semibold">{r.country}</dd></div>
                <div><dt className="text-muted">Registration number</dt><dd className="font-semibold">{r.number}</dd></div>
                <div><dt className="text-muted">Founded</dt><dd className="font-semibold">{site.founded}</dd></div>
                {r.authority && <div className="sm:col-span-2"><dt className="text-muted">Note</dt><dd className="font-semibold">{r.authority}</dd></div>}
              </dl>
            </div>
          )}
          {site.demo && (
            <div id="demo" className="scroll-mt-24 rounded-[1.8rem] bg-forest-900 p-8 text-cream-100">
              <p className="eyebrow !text-gold-300">About this website</p>
              <h2 className="mt-4 text-[1.8rem] !text-cream-50">A portfolio demonstration</h2>
              <p className="mt-3 text-cream-100/80">Helping Hands Foundation is a fictional organisation created to showcase this website. The registration, team, figures, stories and reports are sample content, and the photographs are illustrative stock images. Donations are not processed: the payment flow runs in demo mode.</p>
              <p className="mt-3 text-cream-100/80">Designed and built by Peace Ejiga.</p>
            </div>
          )}
        </div>
        <div className="container-site mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/causes" variant="outline">Our causes</ButtonLink>
          <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
        </div>
      </section>
    </>
  );
}
