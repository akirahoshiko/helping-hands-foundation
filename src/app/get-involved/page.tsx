import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageHeader, Picture } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { EnquirySection } from "@/components/EnquirySection";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer, become a corporate partner, or make an in-kind contribution to Helping Hands Foundation.",
};

const options = [
  {
    id: "volunteer",
    title: "Volunteer",
    lead: "Give your time and skills.",
    text: "We welcome people who can help with mentoring and tutoring, healthcare advice, logistics, fundraising, communications or professional services such as accounting and law.",
    points: ["Remote and in-person roles, depending on location", "Professional skills are especially valuable", "We’ll talk with you first to find the right fit"],
    photo: photos.community,
  },
  {
    id: "partnership",
    title: "Corporate partnership",
    lead: "Reach further, together.",
    text: "Companies, schools, hospitals, clinics and community organisations can partner with the foundation through sponsorship, employee giving, matched donations or shared projects.",
    points: ["Sponsorship of a cause or a project", "Employee volunteering and matched giving", "Services or expertise offered pro bono"],
    photo: photos.gathering,
  },
  {
    id: "in-kind",
    title: "In-kind contributions",
    lead: "Give what’s needed, not just money.",
    text: "Practical items can make an immediate difference, from books and school supplies to clothing, bedding and hygiene products. Please get in touch first so we can confirm what is needed and arrange delivery.",
    points: ["Books, stationery and school bags", "Clothing, bedding and hygiene items", "Please don’t send medicines without arranging it first"],
    photo: photos.girlWithBook,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title={<>There’s more than one way to <span className="italic text-forest-700">lend a hand.</span></>}
        intro={<p>Whether you can offer time, expertise, supplies or a partnership, we would love to hear from you.</p>}
      >
        <ul className="mt-8 flex flex-wrap gap-3">
          {options.map((o) => (
            <li key={o.id}>
              <a href={`#${o.id}`} className="inline-flex rounded-full border border-forest-800/20 bg-white px-5 py-2.5 font-semibold text-forest-900 hover:border-forest-800">
                {o.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="py-16 lg:py-24">
        <div className="container-site space-y-20 lg:space-y-24">
          {options.map((o, i) => (
            <Reveal as="section" key={o.id} className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-12" aria-labelledby={`${o.id}-title`}>
              <div id={o.id} className={`scroll-mt-28 lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <Picture photo={o.photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] rounded-[2rem]" label={i === 0} />
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
                <p className="eyebrow">{o.lead}</p>
                <h2 id={`${o.id}-title`} className="mt-4 text-[2.2rem] sm:text-[2.7rem]">{o.title}</h2>
                <p className="mt-4 text-[1.08rem] text-muted">{o.text}</p>
                <ul className="mt-6 space-y-2">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/get-involved?interest=${o.id}#involvement-form`} className="group mt-8 inline-flex items-center gap-2 font-semibold text-forest-800 underline-offset-4 hover:underline">
                  Register your interest <Arrow />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <section id="involvement-form" aria-labelledby="form-title" className="scroll-mt-24 border-t border-cream-200 bg-cream-100 py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Register your interest</p>
            <h2 id="form-title" className="mt-4 text-[2.2rem]">Tell us how you’d like to help</h2>
            <p className="mt-4 text-muted">Share a few details and we’ll be in touch to talk about next steps. There’s no commitment at this stage.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquirySection kind="involvement" />
          </div>
        </div>
      </section>
    </>
  );
}
