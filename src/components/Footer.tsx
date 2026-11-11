import Link from "next/link";
import { site, socialLinks } from "@/config/site";
import { causes } from "@/content/causes";
import { Logo } from "./Logo";

export function Footer() {
  const c = site.contact;
  const socials = socialLinks();
  const year = 2026;
  return (
    <footer className="bg-forest-950 text-cream-100">
      <div className="container-site grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[0.98rem] text-cream-200/80">{site.description}</p>
          <Link href="/donate" className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-300 underline-offset-4 hover:underline">
            Make a donation <span aria-hidden="true">→</span>
          </Link>
        </div>

        <nav aria-label="Footer: the foundation" className="md:col-span-2">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">Foundation</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem]">
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/about">About us</Link></li>
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/transparency">Transparency</Link></li>
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Footer: causes" className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">Our causes</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem]">
            {causes.map((cause) => (
              <li key={cause.slug}><Link className="hover:text-white hover:underline underline-offset-4" href={`/causes/${cause.slug}`}>{cause.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-sans text-[0.78rem] font-semibold tracking-[0.16em] text-gold-300 uppercase">Get involved</h2>
          <ul className="mt-4 space-y-2.5 text-[0.97rem]">
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/get-involved#volunteer">Volunteer</Link></li>
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/get-involved#partnership">Partner with us</Link></li>
            <li><Link className="hover:text-white hover:underline underline-offset-4" href="/get-involved#in-kind">Give in kind</Link></li>
          </ul>
          {(c.email || c.phone || c.address) && (
            <ul className="mt-6 space-y-1.5 text-[0.95rem] text-cream-200/85">
              {c.email && <li><a className="hover:text-white hover:underline" href={`mailto:${c.email}`}>{c.email}</a></li>}
              {c.phone && <li><a className="hover:text-white hover:underline" href={`tel:${c.phone.replace(/[^\d+]/g, "")}`}>{c.phone}</a></li>}
              {c.address && <li>{c.address}</li>}
            </ul>
          )}
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-[0.9rem]">
              {socials.map((s) => (
                <li key={s.key}><a className="rounded-full border border-cream-100/25 px-3 py-1 hover:border-cream-100" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-site flex flex-col gap-3 py-6 text-[0.85rem] text-cream-200/65 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name}. {site.photoNote} <Link href="/photo-credits" className="underline underline-offset-2 hover:text-white">Photo credits</Link></p>
          <p className="flex shrink-0 gap-4 whitespace-nowrap">
            <Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link>
            <Link href="/donation-policy" className="hover:text-white hover:underline">Donation policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
