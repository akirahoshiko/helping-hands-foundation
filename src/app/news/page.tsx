import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/Widgets";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "News & stories",
  description: "Programme updates, volunteer stories and news from Helping Hands Foundation.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="News & stories" title="News" intro={<p>What we’ve been up to at the schools, the clinics and our volunteer days. We don’t share the names or photos of the families we support.</p>} />
      <section className="py-16 lg:py-20">
        <div className="container-site grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}><StoryCard story={s} priority={i === 0} /></Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
