import type { Metadata } from "next";
import { Arrow, ButtonLink, PageHeader, Picture, SectionIntro } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { hasRegistration, site } from "@/config/site";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "About us",
  description: "The mission, vision, values and approach of Helping Hands Foundation: dignity, compassion, community participation and transparency.",
};

const values = [
  { title: "Dignity", text: "Every person we support is a person first, never a case or a photograph. We protect their privacy and speak about them with respect." },
  { title: "Compassion", text: "We listen before we act, and we offer help with warmth, patience and care." },
  { title: "Community participation", text: "Families, caregivers and local leaders know their needs best. We intend to work alongside them, not around them." },
  { title: "Transparency", text: "Supporters deserve to know how their gifts are used. We will report openly, and only on what we can verify." },
];

const approach = [
  { title: "Listen", text: "Understand each situation directly, with the people involved and those who care for them." },
  { title: "Assess fairly", text: "Use clear, consistent criteria so that support reaches those who need it most." },
  { title: "Support practically", text: "Provide concrete help (essentials, school costs, treatment costs) rather than promises." },
  { title: "Follow up and report", text: "Check that support made a difference, learn from it, and share what we learn." },
];

export default function AboutPage() {
  const r = site.registration;
  return (
    <>
      <PageHeader eyebrow="About us" title={<>Helping Hands Foundation exists so that <span className="italic text-forest-700">no one is left to struggle alone.</span></>} intro={<p>We are a new foundation dedicated to orphans, vulnerable children in Africa, and people who need help paying for medical treatment.</p>} />

      <section className="py-20 lg:py-28">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="space-y-12 lg:col-span-7">
            <div>
              <p className="eyebrow">Our mission</p>
              <p className="mt-4 font-display text-[1.9rem] leading-snug text-forest-900 sm:text-[2.3rem]">
                To give orphaned and vulnerable children the care, nourishment and education they need to thrive, and to help people in need access the medical treatment that protects their lives.
              </p>
            </div>
            <div>
              <p className="eyebrow">Our vision</p>
              <p className="mt-4 text-[1.2rem] text-muted">
                Communities where every child grows up safe, healthy and learning, and where no family has to give up on treatment because of its cost.
              </p>
            </div>
            {site.history.length > 0 && (
              <div>
                <p className="eyebrow">Our story</p>
                <div className="mt-4 space-y-4 text-[1.08rem] text-muted">
                  {site.history.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <Picture photo={photos.motherChild} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/5] rounded-[2rem]" label />
          </Reveal>
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
          <Reveal>
            <SectionIntro eyebrow="Our approach" title="Practical help, offered the right way" id="approach-title">
              <p>How we intend to work with every family, caregiver and community we support.</p>
            </SectionIntro>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="relative rounded-[1.6rem] border border-cream-200 bg-white p-7">
                <span className="font-display text-[2.4rem] leading-none text-gold-400">{i + 1}</span>
                <h3 className="mt-4 font-sans text-[1.15rem] font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {(site.team.length > 0 || hasRegistration()) && (
        <section className="border-t border-cream-200 bg-cream-100 py-20 lg:py-24">
          <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
            {site.team.length > 0 && (
              <div className="lg:col-span-7">
                <p className="eyebrow">Our people</p>
                <h2 className="mt-4 text-[2.2rem]">The team behind the foundation</h2>
                <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {site.team.map((m) => (
                    <li key={m.name} className="rounded-2xl border border-cream-200 bg-white p-6">
                      <p className="font-semibold text-forest-900">{m.name}</p>
                      <p className="text-[0.95rem] text-gold-600">{m.role}</p>
                      {m.bio && <p className="mt-2 text-muted">{m.bio}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {hasRegistration() && (
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="eyebrow">Registration</p>
                <dl className="mt-6 space-y-3 rounded-2xl border border-cream-200 bg-white p-6 text-[0.98rem]">
                  {r.legalName && (<div><dt className="text-muted">Legal name</dt><dd className="font-medium">{r.legalName}</dd></div>)}
                  <div><dt className="text-muted">Registered in</dt><dd className="font-medium">{r.country}</dd></div>
                  {r.authority && (<div><dt className="text-muted">Registering authority</dt><dd className="font-medium">{r.authority}</dd></div>)}
                  <div><dt className="text-muted">Registration number</dt><dd className="font-medium">{r.number}</dd></div>
                  {r.taxStatus && (<div><dt className="text-muted">Tax status</dt><dd className="font-medium">{r.taxStatus}</dd></div>)}
                </dl>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container-site flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-cream-100 p-8 sm:p-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-[2rem]">Ready to help?</h2>
            <p className="mt-2 text-muted">Explore our causes or make a gift today.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/causes" variant="outline">Our causes</ButtonLink>
            <ButtonLink href="/donate" variant="gold" className="group">Make a Donation <Arrow /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
