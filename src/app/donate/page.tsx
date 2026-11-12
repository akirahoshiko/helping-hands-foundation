import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { DonateForm } from "@/components/DonateForm";
import { publicPaymentStatus } from "@/lib/env";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once or monthly, in US dollars, to Orphan Care, Children’s Education, Medical Support, or where it’s needed most.",
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-sand-100">
        <div className="container-site pt-12 pb-10 sm:pt-16">
          <p className="eyebrow">Donate</p>
          <h1 className="mt-4 max-w-3xl text-[2.5rem] sm:text-[3.4rem]">
            Your gift is a <span className="hl">helping hand.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.1rem] text-muted">Pick an amount and a cause, check the details, and you’re done. It takes about a minute.</p>
        </div>
      </section>
      <section className="py-10 lg:py-14">
        <div className="container-site">
          <Suspense fallback={<FormSkeleton />}>
            <DonateWithStatus />
          </Suspense>
        </div>
      </section>
    </>
  );
}

/** Reads payment settings on the server at request time and passes only safe flags to the browser. */
async function DonateWithStatus() {
  await connection();
  return <DonateForm payments={publicPaymentStatus()} />;
}

function FormSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12" aria-busy="true" aria-label="Loading donation form">
      <div className="h-[42rem] animate-pulse rounded-[1.8rem] bg-sand-100 lg:col-span-7" />
      <div className="h-64 animate-pulse rounded-[1.8rem] bg-sand-100 lg:col-span-4 lg:col-start-9" />
    </div>
  );
}
