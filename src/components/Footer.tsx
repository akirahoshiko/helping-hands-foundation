import Link from "next/link";
import { site, socialLinks } from "@/config/site";
import { causes } from "@/content/causes";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

const linkCls = "hover:text-white hover:underline underline-offset-4";

export function Footer() {
  const c = site.contact;
  const socials = socialLinks();
  const year = 2026;
  return (
    <footer className="bg-ink-950 text-sand-100">
      {/* Newsletter (Pencils of Promise / Habitat pattern) */}
      <div className="border-b border-sand-100/10">
        <div className="container-site grid grid-cols-1 items-center gap-6 py-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[1.9rem] !text-sand-50">Get our updates</h2>
            <p className="mt-1 text-sand-100/75">A short email every couple of months with news from the schools and clinics. Unsubscribe whenever you like.</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8"><Newsletter /></div>
        </div>
      </div>

      <div className="container-site grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[0.98rem] text-sand-200/80">{site.description}</p>
          <Link href="/donate" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-sun-400 px-5 font-bold text-ink-950 hover:bg-sun-300">
            Make a donation <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav aria-label="Footer: the foundation" className="md:col-span-2">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-sun-300 uppercase">Foundation</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem]">
            <li><Link className={linkCls} href="/about">About us</Link></li>
            <li><Link className={linkCls} href="/about#team">Our team</Link></li>
            <li><Link className={linkCls} href="/news">News</Link></li>
            <li><Link className={linkCls} href="/transparency">Transparency</Link></li>
            <li><Link className={linkCls} href="/safeguarding">Safeguarding</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer: causes" className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-sun-300 uppercase">Our causes</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem]">
            {causes.map((cause) => (
              <li key={cause.slug}><Link className={linkCls} href={`/causes/${cause.slug}`}>{cause.title}</Link></li>
            ))}
            <li><Link className={linkCls} href="/get-involved">Get involved</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-sun-300 uppercase">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem] text-sand-200/90">
            {c.email && <li><a className={`${linkCls} break-all`} href={`mailto:${c.email}`}>{c.email}</a></li>}
            {c.phone && <li><a className={linkCls} href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a></li>}
            {c.whatsapp && <li><a className={linkCls} href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>}
            {c.address && <li>{c.address}</li>}
            {c.officeHours && <li className="text-sand-200/70">{c.officeHours}</li>}
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-[0.9rem]">
              {socials.map((s) => (
                <li key={s.key}><a className="rounded-full border border-sand-100/25 px-3 py-1 hover:border-sand-100" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-sand-100/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[0.85rem] text-sand-200/65 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.name}. {site.photoNote} <Link href="/photo-credits" className="underline underline-offset-2 hover:text-white">Photo credits</Link>
            <span className="mx-2" aria-hidden="true">·</span>Website by Peace Ejiga
          </p>
          <p className="flex shrink-0 gap-4 whitespace-nowrap">
            <Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link>
            <Link href="/donation-policy" className="hover:text-white hover:underline">Donation policy</Link>
            <Link href="/safeguarding" className="hover:text-white hover:underline">Safeguarding</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
