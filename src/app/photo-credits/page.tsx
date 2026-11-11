import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Illustrative photography used on the Helping Hands Foundation website.",
};

export default function PhotoCreditsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Photo credits"
        title="About the photographs"
        intro={<p>The photographs on this website are illustrative images from Unsplash, used under the Unsplash licence. They do not show people supported by the foundation, and they will be replaced with consented photographs of the foundation’s own work over time.</p>}
      />
      <section className="py-14">
        <ul className="container-site grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Object.values(photos).map((p) => (
            <li key={p.unsplashId} className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
              <div className="relative aspect-[4/3] bg-cream-200">
                <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw" className="object-cover" placeholder="blur" />
              </div>
              <div className="p-4 text-[0.9rem]">
                <p className="text-muted">{p.alt}</p>
                <a href={`https://images.unsplash.com/${p.unsplashId}`} className="mt-2 inline-block font-semibold text-forest-800 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
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
