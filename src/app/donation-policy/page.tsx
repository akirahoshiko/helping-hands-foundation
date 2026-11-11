import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { DraftBanner, TBC } from "@/components/Draft";
import { MIN_DONATION, MAX_DONATION } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Donation policy",
  description: "How online donations to Helping Hands Foundation work: currency, monthly giving, how gifts are used, receipts and refunds.",
};

export default function DonationPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Donation policy" title="How giving works" intro={<p>Clear terms for every gift, so you know exactly what happens when you donate.</p>} />
      <section className="py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <DraftBanner />
          <div className="prose-hh mt-10 text-[1.05rem] text-ink">
            <h2>Currency and amounts</h2>
            <p>All online donations are in <strong>US dollars (USD)</strong>. You can give a suggested amount ($10, $25, $50 or $100) or any amount from ${MIN_DONATION} to ${MAX_DONATION.toLocaleString("en-US")}. For larger gifts, please <Link href="/contact">contact us</Link>. Your bank may apply its own exchange rate or fees if your card is in another currency.</p>

            <h2>Payment processing</h2>
            <p>Donations are processed securely by Paystack. You enter your payment details on Paystack’s page, never on this website. A donation is only treated as received once Paystack confirms the payment to us directly.</p>
            <p>Payment processing fees are charged by Paystack and deducted from each gift: <TBC>whether the foundation will offer donors the option to cover fees</TBC>.</p>

            <h2>One-time and monthly giving</h2>
            <p>A one-time gift is charged once. Monthly giving is offered only when the foundation’s payment account supports recurring payments in US dollars. When it is available, a monthly gift is charged on the same day each month until you cancel.</p>
            <p>To cancel or change a monthly gift, use the link in the emails Paystack sends about your subscription, or <Link href="/contact">contact us</Link> and we will cancel it for you. Cancellation stops future payments; it does not refund payments already made.</p>

            <h2>How your gift is used</h2>
            <ul>
              <li><strong>Where it’s needed most:</strong> the foundation directs your gift to the most urgent need across Orphan Care, Children’s Wellbeing & Education and Medical Support.</li>
              <li><strong>A cause you choose:</strong> your gift is intended for that cause. If it ever becomes impossible to use a gift for its chosen cause, it will be used for the closest related purpose: <TBC>the foundation’s policy for redirecting restricted gifts</TBC>.</li>
              <li>A share of donations may support the costs of running the foundation responsibly: <TBC>the foundation’s policy on administrative costs</TBC>.</li>
            </ul>

            <h2>Receipts and tax</h2>
            <p>Paystack emails a payment receipt to the address you provide. <TBC>Whether donations are tax-deductible, and in which countries, once the foundation’s registration and tax status are confirmed</TBC>.</p>

            <h2>Refunds</h2>
            <p>If you made a mistake, for example the wrong amount or an accidental duplicate, please <Link href="/contact">contact us</Link> with your payment reference as soon as possible. <TBC>The refund window and process</TBC>.</p>

            <h2>Questions</h2>
            <p>If anything about your donation is unclear, please <Link href="/contact">get in touch</Link>. We’re happy to help.</p>
          </div>
        </div>
      </section>
    </>
  );
}
