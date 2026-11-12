import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Photography used on the Helping Hands Foundation website.",
};

export default function PhotoCreditsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Photo credits"
        title="About the photographs"
        intro={<p>Most photographs on this website are stock images from Unsplash, used under the Unsplash licence. To protect their privacy, we don’t publish photos of the children and families we support.</p>}
      />
      <section className="py-14">
        <ul className="container-site grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Object.values(photos).map((p) => (
            <li key={p.unsplashId} className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
              <div className="relative aspect-[4/3] bg-sand-200">
                <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw" className="object-cover" placeholder="blur" />
              </div>
              <div className="p-4 text-[0.9rem]">
                <p className="text-muted">{p.alt}</p>
                <a href={`https://images.unsplash.com/${p.unsplashId}`} className="mt-2 inline-block font-semibold text-ink-800 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                  Source image (Unsplash)
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
