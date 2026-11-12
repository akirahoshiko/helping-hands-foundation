import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Photo } from "@/content/photos";

type Variant = "primary" | "gold" | "outline" | "light" | "outline-light";
const variants: Record<Variant, string> = {
  primary: "bg-ink-800 text-sand-50 hover:bg-ink-950",
  gold: "bg-sun-400 text-ink-950 hover:bg-sun-300",
  outline: "border border-ink-800/30 text-ink-900 hover:border-ink-800 hover:bg-ink-800 hover:text-sand-50",
  light: "bg-sand-50 text-ink-900 hover:bg-white",
  "outline-light": "border border-sand-50/40 text-sand-50 hover:border-sand-50 hover:bg-sand-50 hover:text-ink-900",
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

/** Optimised photo in a rounded frame. */
export function Picture({ photo, className = "", sizes, priority = false, imgClassName = "" }: { photo: Photo; className?: string; sizes: string; priority?: boolean; imgClassName?: string }) {
  return (
    <figure className={`relative overflow-hidden bg-sand-200 ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} placeholder="blur" className={`object-cover ${imgClassName}`} />
    </figure>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b border-sand-200 bg-sand-100">
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
    info: "border-ink-700/25 bg-ink-100/60 text-ink-950",
    warn: "border-sun-400/60 bg-sun-300/20 text-ink-950",
    error: "border-danger/40 bg-danger/5 text-danger",
    success: "border-ink-700/40 bg-ink-100 text-ink-950",
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
    <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-50 px-6 py-8">
      <p className="font-semibold text-ink-900">{title}</p>
      <div className="mt-2 text-muted">{children}</div>
    </div>
  );
}
