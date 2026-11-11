import type { Metadata } from "next";
import { CauseDetail } from "@/components/CauseDetail";
import { getCause } from "@/content/causes";

export const metadata: Metadata = {
  title: "Orphan Care",
  description: "How Helping Hands Foundation intends to support orphaned children with daily necessities, safe care and education.",
};

export default function Page() {
  return <CauseDetail cause={getCause("orphan-care")} />;
}
