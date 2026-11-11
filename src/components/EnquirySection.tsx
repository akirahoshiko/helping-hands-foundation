import { Suspense } from "react";
import { connection } from "next/server";
import { getFormDelivery } from "@/lib/env";
import { EnquiryForm } from "./EnquiryForm";

/** Server wrapper: checks at request time whether form delivery is configured, then renders the form. */
export function EnquirySection({ kind }: { kind: "contact" | "involvement" }) {
  return (
    <Suspense fallback={<div className="h-[34rem] animate-pulse rounded-[1.8rem] bg-cream-100" aria-busy="true" aria-label="Loading form" />}>
      <WithDelivery kind={kind} />
    </Suspense>
  );
}

async function WithDelivery({ kind }: { kind: "contact" | "involvement" }) {
  await connection();
  return <EnquiryForm kind={kind} deliveryActive={getFormDelivery().mode !== "none"} />;
}
