import Link from "next/link";
import { site } from "@/config/site";

/** Slim bar above the header: the current appeal, plus an honest demo notice in portfolio mode. */
export function TopBar() {
  return (
    <div className="bg-ink-950 text-[0.86rem] text-sand-100">
      <div className="container-site flex flex-col items-center justify-between gap-1 py-2 text-center sm:flex-row sm:text-left">
        <Link href={site.appeal.href} className="group inline-flex items-center gap-2 hover:text-white">
          <span className="rounded-full bg-sun-400 px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-ink-950 uppercase">Appeal</span>
          <span>
            <strong className="font-semibold">{site.appeal.title}:</strong> <span className="text-sand-100/80">{site.appeal.text}</span>
          </span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
        {site.demo && (
          <p className="text-[0.78rem] text-sand-100/65">
            Portfolio demo · fictional organisation · <Link href="/about#demo" className="underline underline-offset-2 hover:text-white">learn more</Link>
          </p>
        )}
      </div>
    </div>
  );
}
