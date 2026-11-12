import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { EnquirySection } from "@/components/EnquirySection";
import { hasContactDetails, site, socialLinks } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Helping Hands Foundation.",
};

export default function ContactPage() {
  const c = site.contact;
  const socials = socialLinks();
  const showDetails = hasContactDetails() || socials.length > 0;
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" intro={<p>Questions about a donation, volunteering or working with us? Send a message and someone from the team will reply, usually within two working days.</p>} />
      <section className="py-14 lg:py-20">
        <div className={`container-site grid grid-cols-1 gap-10 ${showDetails ? "lg:grid-cols-12" : ""}`}>
          <div className={showDetails ? "lg:col-span-7" : "max-w-3xl"}>
            <EnquirySection kind="contact" />
          </div>
          {showDetails && (
            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Contact details">
              <div className="rounded-[1.8rem] bg-ink-900 p-8 text-sand-100">
                <h2 className="text-[1.7rem] !text-sand-50">Other ways to reach us</h2>
                <dl className="mt-6 space-y-5">
                  {c.email && (<div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Email</dt><dd className="mt-1"><a className="underline-offset-4 hover:underline" href={`mailto:${c.email}`}>{c.email}</a></dd></div>)}
                  {c.phone && (<div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Phone</dt><dd className="mt-1"><a className="underline-offset-4 hover:underline" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a></dd></div>)}
                  {c.whatsapp && (<div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">WhatsApp</dt><dd className="mt-1"><a className="underline-offset-4 hover:underline" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></dd></div>)}
                  {c.address && (<div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Address</dt><dd className="mt-1">{c.address}</dd></div>)}
                  {c.officeHours && (<div><dt className="text-[0.8rem] font-semibold tracking-[0.14em] text-sun-300 uppercase">Hours</dt><dd className="mt-1">{c.officeHours}</dd></div>)}
                </dl>
                {socials.length > 0 && (
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {socials.map((s) => (
                      <li key={s.key}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-sand-100/30 px-4 py-1.5 text-[0.92rem] hover:border-sand-100">{s.label}</a></li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
