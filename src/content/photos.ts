/**
 * Illustrative photography (Unsplash licence). These images do not depict
 * people supported by the foundation; replace them with consented photos
 * of the foundation's own work when available.
 */
import type { StaticImageData } from "next/image";
import hero from "@/assets/photos/hero.jpg";
import heroWindow from "@/assets/photos/hero-window.jpg";
import orphanCare from "@/assets/photos/orphan-care.jpg";
import education from "@/assets/photos/education.jpg";
import readingOutdoors from "@/assets/photos/reading-outdoors.jpg";
import girlWithBook from "@/assets/photos/girl-with-book.jpg";
import medical from "@/assets/photos/medical.jpg";
import doctor from "@/assets/photos/doctor.jpg";
import community from "@/assets/photos/community.jpg";
import motherChild from "@/assets/photos/mother-child.jpg";
import girlsLaughing from "@/assets/photos/girls-laughing.jpg";
import teacher from "@/assets/photos/teacher.jpg";
import gathering from "@/assets/photos/gathering.jpg";

export type Photo = { src: StaticImageData; alt: string; unsplashId: string };

export const photos = {
  heroWindow: { src: heroWindow, alt: "Smiling schoolchildren leaning out of an open classroom window", unsplashId: "photo-1521493959102-bdd6677fdd81" },
  hero: { src: hero, alt: "Two young girls touching foreheads and laughing together in the evening sun", unsplashId: "photo-1602181026089-ef2bf4a3e23e" },
  orphanCare: { src: orphanCare, alt: "A smiling woman holding three young children close", unsplashId: "photo-1751580471264-7f8cd53d82d8" },
  education: { src: education, alt: "A young woman reading aloud to a class of attentive pupils", unsplashId: "photo-1632215861513-130b66fe97f4" },
  readingOutdoors: { src: readingOutdoors, alt: "Children sitting together on outdoor steps, sharing a meal", unsplashId: "photo-1694286068561-3233c946e9be" },
  girlWithBook: { src: girlWithBook, alt: "A young girl smiling while holding a book", unsplashId: "photo-1697906097214-3757ae079b4e" },
  medical: { src: medical, alt: "A doctor in a white coat writing notes while speaking with a young patient", unsplashId: "photo-1536064479547-7ee40b74b807" },
  doctor: { src: doctor, alt: "A smiling doctor holding a stethoscope", unsplashId: "photo-1643297654416-05795d62e39c" },
  community: { src: community, alt: "A smiling woman in a headscarf holding a child among a gathered community", unsplashId: "photo-1781263409522-06f1d4a6f3af" },
  motherChild: { src: motherChild, alt: "A mother holding her young child, both smiling, in black and white", unsplashId: "photo-1741940365437-e55b919a89d3" },
  girlsLaughing: { src: girlsLaughing, alt: "Five girls laughing together, in black and white", unsplashId: "photo-1747214300285-a8c5f3ab0c0f" },
  teacher: { src: teacher, alt: "A teacher explaining a lesson to pupils in a classroom", unsplashId: "photo-1744809482817-9a9d4fc280af" },
  gathering: { src: gathering, alt: "Community members of all ages seated together at a gathering", unsplashId: "photo-1761666520005-3ffcf13e74c8" },
} satisfies Record<string, Photo>;
