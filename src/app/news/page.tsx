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
      <PageHeader eyebrow="News & stories" title="From the field" intro={<p>Updates on our programmes, our volunteers and the communities we work with. We never share personal stories or photographs of the people we support without their informed consent.</p>} />
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
