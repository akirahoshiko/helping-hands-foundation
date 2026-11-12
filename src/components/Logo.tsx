import Link from "next/link";
import { site } from "@/config/site";

/** The mark: a heart held in an open, cupped hand. */
export function LogoMark({ className = "h-10 w-10", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const bg = tone === "dark" ? "#1b1a17" : "#fffbf6";
  const hand = tone === "dark" ? "#faf2e8" : "#1b1a17";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="12" fill={bg} />
      <path
        d="M20 24.6c-.35 0-.7-.12-.98-.36-3.9-3.27-6.27-5.34-6.27-8.13 0-2.08 1.62-3.71 3.66-3.71 1.38 0 2.67.74 3.59 1.98.92-1.24 2.21-1.98 3.59-1.98 2.04 0 3.66 1.63 3.66 3.71 0 2.79-2.37 4.86-6.27 8.13-.28.24-.63.36-.98.36z"
        fill="#f06a2a"
      />
      <path d="M8.6 21.4c2.3 5 6.4 8.2 11.4 8.2s9.1-3.2 11.4-8.2" fill="none" stroke={hand} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M8.6 21.4 7.4 18.6M31.4 21.4l1.2-2.8" fill="none" stroke={hand} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", onClick }: { tone?: "dark" | "light"; onClick?: () => void }) {
  const text = tone === "dark" ? "text-ink-900" : "text-sand-50";
  const sub = tone === "dark" ? "text-sun-600" : "text-sun-300";
  return (
    <Link href="/" onClick={onClick} className="group inline-flex items-center gap-3 rounded-lg" aria-label={`${site.name}, home`}>
      <LogoMark tone={tone} className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-rotate-6 sm:h-10 sm:w-10" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={`font-display text-[1.15rem] font-bold tracking-tight sm:text-[1.35rem] ${text}`}>Helping Hands</span>
        <span className={`mt-1 text-[0.58rem] font-semibold tracking-[0.3em] uppercase sm:text-[0.62rem] ${sub}`}>Foundation</span>
      </span>
    </Link>
  );
}
