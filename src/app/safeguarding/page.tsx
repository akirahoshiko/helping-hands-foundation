import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, PageHeader } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Safeguarding",
  description: "How Helping Hands Foundation keeps children and vulnerable adults safe, and how to report a concern.",
};

const commitments = [
  { title: "Safer recruitment", text: "Staff and volunteers who work with children are interviewed, reference-checked and, where the law allows, background-checked before they start." },
  { title: "Training", text: "Everyone who works with us completes safeguarding training and signs our code of conduct before any contact with children or families." },
  { title: "Never alone", text: "Staff and volunteers do not spend time alone with a child, and all activities with children are planned and supervised." },
  { title: "Consent for every image", text: "We photograph or film children only with the informed consent of a parent or guardian and the child’s own agreement, and never publish names, locations or medical details." },
  { title: "Respect and dignity", text: "We never portray the people we support as helpless, and we never use their stories for fundraising without their consent." },
  { title: "Act on every concern", text: "Every concern is taken seriously, recorded, and acted on promptly, including reporting to the authorities where a child may be at risk." },
];

export default function SafeguardingPage() {
  const email = site.contact.email;
  return (
    <>
      <PageHeader eyebrow="Safeguarding" title={<>Keeping children and families <span className="hl">safe</span> comes first.</>} intro={<p>Everyone who works with Helping Hands, whether staff, volunteer, trustee or partner, has a duty to protect the children and vulnerable adults we serve.</p>} />
      <section className="py-14 lg:py-20">
        <div className="container-site max-w-5xl">
          <h2 className="mt-10 text-[2rem]">Our commitments</h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {commitments.map((c, i) => (
              <li key={c.title} className="rounded-[1.6rem] border border-sand-200 bg-white p-7">
                <span className="font-display text-[1.6rem] text-sun-400">0{i + 1}</span>
                <h3 className="mt-2 font-sans text-[1.15rem] font-semibold">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="prose-hh text-[1.05rem] lg:col-span-7">
              <h2 className="!mt-0">Code of conduct (summary)</h2>
              <ul>
                <li>Treat every child and adult with respect, regardless of age, gender, ability, religion or background.</li>
                <li>Never use physical punishment or language that humiliates or frightens.</li>
                <li>Never enter into a sexual relationship with anyone under 18, or with any person receiving our support.</li>
                <li>Never ask for or accept money, gifts or favours from the people we support.</li>
                <li>Keep information about the people we support confidential.</li>
                <li>Report any concern immediately, even if you are unsure.</li>
              </ul>
              <h2>Partners</h2>
              <p>Schools, clinics and organisations we work with are asked to share our safeguarding standards, and we review them before any joint activity with children.</p>
            </div>
            <aside className="lg:col-span-5">
              <div className="rounded-[1.8rem] bg-ink-900 p-8 text-sand-100">
                <h2 className="text-[1.7rem] !text-sand-50">Report a concern</h2>
                <p className="mt-3 text-sand-100/85">If you are worried about the safety of a child or adult connected with our work, or about the behaviour of anyone representing Helping Hands, tell us straight away. You can remain anonymous.</p>
                <dl className="mt-6 space-y-4">
                  <div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Email (confidential)</dt><dd className="mt-1"><a className="underline underline-offset-4" href={`mailto:${email}?subject=Safeguarding%20concern`}>{email}</a></dd></div>
                  {site.contact.phone && <div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Phone</dt><dd className="mt-1"><a className="underline underline-offset-4" href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}>{site.contact.phone}</a></dd></div>}
                </dl>
                <p className="mt-6 rounded-xl bg-ink-950/50 p-4 text-[0.95rem]"><strong className="text-sun-300">In an emergency</strong>, if someone is in immediate danger, contact the local emergency services first (in Nigeria, dial 112).</p>
              </div>
              <p className="mt-5 text-[0.95rem] text-muted">Please don’t include medical records or identifying details of a child in the website’s contact form. Email us instead, and our Safeguarding Lead will respond.</p>
            </aside>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary">Contact us</ButtonLink>
            <Link href="/privacy" className="inline-flex min-h-12 items-center font-semibold text-ink-800 underline underline-offset-4">Read our privacy policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
