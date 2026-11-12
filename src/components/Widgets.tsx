import Link from "next/link";
import { formatUsd } from "@/lib/validation";
import type { Story } from "@/content/stories";
import { Picture } from "./ui";

/** Campaign progress bar */
export function Progress({ raised, goal, tone = "light" }: { raised: number; goal: number; tone?: "light" | "dark" }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-valuetext={`${formatUsd(raised)} raised of ${formatUsd(goal)} goal`}
        className={`h-2.5 overflow-hidden rounded-full ${tone === "dark" ? "bg-ink-950/50" : "bg-sand-200"}`}
      >
        <div className="h-full rounded-full bg-sun-400" style={{ width: `${pct}%` }} />
      </div>
      <p className={`mt-2 flex justify-between text-[0.9rem] ${tone === "dark" ? "text-sand-100/85" : "text-muted"}`}>
        <span><strong className={tone === "dark" ? "text-sand-50" : "text-ink-900"}>{formatUsd(raised)}</strong> raised</span>
        <span>{pct}% of {formatUsd(goal)}</span>
      </p>
    </div>
  );
}

/** Donut chart for "where the money goes" */
export function Donut({ data, size = 220 }: { data: { label: string; value: number }[]; size?: number }) {
  const colors = ["#f06a2a", "#3d3731", "#e4d2bd"];
  const r = 70;
  const c = 2 * Math.PI * r;
  const lengths = data.map((d) => (d.value / 100) * c);
  const offsets = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <figure className="flex flex-col items-center gap-6 sm:flex-row">
      <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={data.map((d) => `${d.label} ${d.value}%`).join(", ")}>
        <g transform="rotate(-90 100 100)">
          {data.map((d, i) => (
            <circle key={d.label} cx="100" cy="100" r={r} fill="none" stroke={colors[i % colors.length]} strokeWidth="30" strokeDasharray={`${lengths[i]} ${c - lengths[i]}`} strokeDashoffset={-offsets[i]} />
          ))}
        </g>
        <text x="100" y="96" textAnchor="middle" className="fill-ink-900 font-display" fontSize="34">{data[0].value}%</text>
        <text x="100" y="120" textAnchor="middle" className="fill-[#5f5850]" fontSize="12">{data[0].label.toLowerCase()}</text>
      </svg>
      <figcaption>
        <ul className="space-y-3">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full" style={{ background: colors[i % colors.length] }} />
              <span className="font-semibold text-ink-900">{d.value}%</span>
              <span className="text-muted">{d.label}</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

export function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-sand-200 bg-white transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(15,42,31,0.5)]">
      <Picture photo={story.photo} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" priority={priority} imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.8rem] font-semibold tracking-[0.12em] text-sun-600 uppercase">{story.category} · {story.date}</p>
        <h3 className="mt-2 text-[1.45rem] leading-snug">
          <Link href={`/news/${story.slug}`} className="after:absolute after:inset-0">{story.title}</Link>
        </h3>
        <p className="mt-2 text-muted">{story.excerpt}</p>
        <span className="mt-auto pt-4 font-semibold text-ink-800">Read more <span aria-hidden="true">→</span></span>
      </div>
    </article>
  );
}
