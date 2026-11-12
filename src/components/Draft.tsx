import { site } from "@/config/site";

/** Shown on policy pages in portfolio-demo mode. */
export function DraftBanner() {
  if (!site.demo) return null;
  return (
    <div className="rounded-2xl border border-sun-400/60 bg-sun-300/20 px-5 py-4 text-[0.96rem] text-ink-950" role="note">
      <strong>Sample policy.</strong> Helping Hands Foundation is a fictional organisation in a portfolio demo. This policy shows what a real foundation’s page would contain and how this website actually handles information.
    </div>
  );
}
