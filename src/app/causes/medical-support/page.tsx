import type { Metadata } from "next";
import { CauseDetail } from "@/components/CauseDetail";
import { getCause } from "@/content/causes";

export const metadata: Metadata = {
  title: "Medical Support",
  description: "How Helping Hands Foundation intends to help people meet the cost of medical treatment and essential care.",
};

export default function Page() {
  return <CauseDetail cause={getCause("medical-support")} />;
}
