/**
 * Photography (Unsplash licence), credited on /photo-credits.
 * Each photo is used in one place only, apart from each cause's own images.
 */
import type { StaticImageData } from "next/image";
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
import schoolDrive from "@/assets/photos/school-drive.jpg";
import medicalReview from "@/assets/photos/medical-review.jpg";
import healthDay from "@/assets/photos/health-day.jpg";
import volunteers from "@/assets/photos/volunteers.jpg";
import partnersMeeting from "@/assets/photos/partners-meeting.jpg";
import pupilWriting from "@/assets/photos/pupil-writing.jpg";
import friends from "@/assets/photos/friends.jpg";

export type Photo = { src: StaticImageData; alt: string; unsplashId: string };

export const photos = {
  heroWindow: { src: heroWindow, alt: "Smiling schoolchildren leaning out of an open classroom window", unsplashId: "photo-1521493959102-bdd6677fdd81" },
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
  schoolDrive: { src: schoolDrive, alt: "A group of schoolboys in uniform with their school bags, smiling outside their school", unsplashId: "photo-1548102268-3d7dc56b01e1" },
  medicalReview: { src: medicalReview, alt: "Two health workers going through notes together on a tablet", unsplashId: "photo-1666886573440-16ac24f89e31" },
  healthDay: { src: healthDay, alt: "Women in colourful wrappers and headwraps gathered together at a community event", unsplashId: "photo-1509099955921-f0b4ed0c175c" },
  volunteers: { src: volunteers, alt: "Three smiling young women sitting side by side", unsplashId: "photo-1694286080685-279d3b3c8dfb" },
  partnersMeeting: { src: partnersMeeting, alt: "Three women talking over notes and a laptop in an office", unsplashId: "photo-1655720357872-ce227e4164ba" },
  pupilWriting: { src: pupilWriting, alt: "A boy looking up from his work while other pupils write at a long classroom table", unsplashId: "photo-1632932693914-89b90ae3d16d" },
  friends: { src: friends, alt: "Two women in matching purple outfits laughing together outdoors", unsplashId: "photo-1752343809373-0600ccb3bcd2" },
} satisfies Record<string, Photo>;
