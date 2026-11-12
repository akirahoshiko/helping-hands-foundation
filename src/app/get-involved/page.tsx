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
    lead: "Give an afternoon",
    text: "Most of our volunteers have day jobs. They tutor on Saturdays, help pack school kits, drive supplies around, or lend us their skills as nurses, accountants or designers.",
    points: ["Weekend tutoring and school drives in Lagos", "Remote help with design, writing and accounts", "We’ll have a chat first to find something that fits"],
    photo: photos.volunteers,
  },
  {
    id: "partnership",
    title: "Partnerships",
    lead: "For businesses and schools",
    text: "Some of our partners sponsor a school drive, some match what their staff give, and a couple of clinics see patients at a reduced rate. If you have an idea, we’d like to hear it.",
    points: ["Sponsor a school drive or a health day", "Match your staff’s donations", "Offer your services or expertise for free"],
    photo: photos.partnersMeeting,
  },
  {
    id: "in-kind",
    title: "Donate things",
    lead: "Books, clothes and supplies",
    text: "We always need school supplies, children’s books, clothes, bedding and toiletries. Send us a message first, so we can tell you what we’re short of and sort out delivery.",
    points: ["Books, stationery and school bags", "Clothes, bedding and toiletries", "Please don’t send medicines without talking to us first"],
    photo: photos.pupilWriting,
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title={<>Help out <span className="hl">without spending a kobo.</span></>}
        intro={<p>Time, skills, supplies or a good introduction. All of it helps, and most of what we’ve achieved started with someone offering one of these.</p>}
      >
        <ul className="mt-8 flex flex-wrap gap-3">
          {options.map((o) => (
            <li key={o.id}>
              <a href={`#${o.id}`} className="inline-flex rounded-full border border-ink-800/20 bg-white px-5 py-2.5 font-semibold text-ink-900 hover:border-ink-800">
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
                <Picture photo={o.photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] rounded-[2rem]" />
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1" : "lg:col-start-7"}`}>
                <p className="eyebrow">{o.lead}</p>
                <h2 id={`${o.id}-title`} className="mt-4 text-[2.2rem] sm:text-[2.7rem]">{o.title}</h2>
                <p className="mt-4 text-[1.08rem] text-muted">{o.text}</p>
                <ul className="mt-6 space-y-2">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun-400" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/get-involved?interest=${o.id}#involvement-form`} className="group mt-8 inline-flex items-center gap-2 font-semibold text-ink-800 underline-offset-4 hover:underline">
                  Register your interest <Arrow />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <section id="involvement-form" aria-labelledby="form-title" className="scroll-mt-24 border-t border-sand-200 bg-sand-100 py-16 lg:py-24">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Say hello</p>
            <h2 id="form-title" className="mt-4 text-[2.2rem]">Tell us what you’d like to do</h2>
            <p className="mt-4 text-muted">Leave your details and Zainab, our volunteer coordinator, will get back to you within a few days. No commitment.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquirySection kind="involvement" />
          </div>
        </div>
      </section>
    </>
  );
}
