import type { Metadata } from "next";
import { CauseDetail } from "@/components/CauseDetail";
import { getCause } from "@/content/causes";

export const metadata: Metadata = {
  title: "Children’s Wellbeing & Education",
  description: "How Helping Hands Foundation intends to support vulnerable children with learning materials, nutrition and access to opportunity.",
};

export default function Page() {
  return <CauseDetail cause={getCause("children-education")} />;
}
