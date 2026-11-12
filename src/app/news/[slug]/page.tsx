import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ButtonLink, Picture } from "@/components/ui";
import { StoryCard } from "@/components/Widgets";
import { getStory, stories } from "@/content/stories";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  return story ? { title: story.title, description: story.excerpt } : { title: "Story not found" };
}

export default async function StoryPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <article>
      <header className="bg-sand-100">
        <div className="container-site max-w-4xl pt-12 pb-10 sm:pt-16">
          <nav aria-label="Breadcrumb" className="text-[0.92rem] text-muted">
            <Link href="/news" className="text-ink-800 underline-offset-4 hover:underline">News & stories</Link> <span aria-hidden="true">/</span> {story.category}
          </nav>
          <h1 className="mt-5 text-[2.4rem] sm:text-[3.3rem]">{story.title}</h1>
          <p className="mt-4 text-[0.95rem] font-semibold tracking-[0.1em] text-sun-600 uppercase">{story.category} · {story.date}</p>
        </div>
      </header>
      <div className="container-site max-w-4xl">
        <Picture photo={story.photo} priority sizes="(min-width: 1024px) 56rem, 100vw" className="-mt-2 aspect-[16/9] rounded-[2rem]" />
        <div className="mx-auto max-w-2xl space-y-5 py-12 text-[1.12rem] leading-relaxed">
          <p className="font-display text-[1.45rem] leading-snug text-ink-900">{story.excerpt}</p>
          {story.body.map((p) => <p key={p.slice(0, 30)} className="text-ink/90">{p}</p>)}
          <div className="flex flex-col gap-3 border-t border-sand-200 pt-8 sm:flex-row">
            <ButtonLink href="/donate" variant="gold" className="group">Support this work <Arrow /></ButtonLink>
            <ButtonLink href="/get-involved" variant="outline">Get involved</ButtonLink>
          </div>
        </div>
      </div>
      <section aria-labelledby="more-title" className="bg-sand-100 py-16">
        <div className="container-site">
          <h2 id="more-title" className="text-[1.9rem]">More stories</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {more.map((s) => <StoryCard key={s.slug} story={s} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
