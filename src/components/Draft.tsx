import type { ReactNode } from "react";

/** Highlights organisation-specific wording that must be confirmed before launch. */
export function TBC({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-gold-300/40 px-1 text-forest-950">
      [To be confirmed: {children}]
    </mark>
  );
}

export function DraftBanner() {
  return (
    <div className="rounded-2xl border border-gold-400/60 bg-gold-300/20 px-5 py-4 text-[0.96rem] text-forest-950" role="note">
      <strong>Draft policy.</strong> This page describes how the website currently works. Highlighted items depend on the foundation’s registration and procedures, and will be confirmed before launch.
    </div>
  );
}
