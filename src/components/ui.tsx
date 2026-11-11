import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Photo } from "@/content/photos";

type Variant = "primary" | "gold" | "outline" | "light" | "outline-light";
const variants: Record<Variant, string> = {
  primary: "bg-forest-800 text-cream-50 hover:bg-forest-950",
  gold: "bg-gold-400 text-forest-950 hover:bg-gold-300",
  outline: "border border-forest-800/30 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-cream-50",
  light: "bg-cream-50 text-forest-900 hover:bg-white",
  "outline-light": "border border-cream-50/40 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-forest-900",
};
export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-12 text-[0.98rem] font-semibold transition-colors duration-200 ${variants[variant]} ${extra}`;

export function ButtonLink({ href, variant = "primary", className = "", children, ...rest }: { href: string; variant?: Variant } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`${className} transition-transform duration-200 group-hover:translate-x-1`} aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionIntro({ eyebrow, title, children, align = "left", id }: { eyebrow?: string; title: ReactNode; children?: ReactNode; align?: "left" | "center"; id?: string }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-4 text-[2.1rem] sm:text-[2.6rem]">
        {title}
      </h2>
      {children && <div className="mt-4 text-[1.08rem] text-muted">{children}</div>}
    </div>
  );
}

/** Optimised photo with a small, honest "illustrative" label. */
export function Picture({ photo, className = "", sizes, priority = false, label = false, imgClassName = "" }: { photo: Photo; className?: string; sizes: string; priority?: boolean; label?: boolean; imgClassName?: string }) {
  return (
    <figure className={`relative overflow-hidden bg-cream-200 ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} placeholder="blur" className={`object-cover ${imgClassName}`} />
      {label && (
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-forest-950/70 px-3 py-1 text-[0.72rem] font-medium text-cream-50 backdrop-blur-sm">
          Illustrative photo
        </figcaption>
      )}
    </figure>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-cream-200 bg-cream-100">
      <div className="container-site pt-14 pb-14 sm:pt-20 sm:pb-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[2.6rem] sm:text-[3.6rem]">{title}</h1>
        {intro && <div className="mt-5 max-w-2xl text-[1.12rem] text-muted">{intro}</div>}
        {children}
      </div>
    </section>
  );
}

export function Notice({ tone = "info", title, children, role }: { tone?: "info" | "warn" | "error" | "success"; title?: string; children: ReactNode; role?: "status" | "alert" }) {
  const tones = {
    info: "border-forest-700/25 bg-forest-100/60 text-forest-950",
    warn: "border-gold-400/60 bg-gold-300/20 text-forest-950",
    error: "border-danger/40 bg-danger/5 text-danger",
    success: "border-forest-700/40 bg-forest-100 text-forest-950",
  };
  return (
    <div role={role} className={`rounded-2xl border px-5 py-4 text-[0.98rem] ${tones[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-cream-300 bg-cream-50 px-6 py-8">
      <p className="font-semibold text-forest-900">{title}</p>
      <div className="mt-2 text-muted">{children}</div>
    </div>
  );
}
