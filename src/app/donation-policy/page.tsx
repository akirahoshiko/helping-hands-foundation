import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { DraftBanner } from "@/components/Draft";
import { site } from "@/config/site";
import { MIN_DONATION, MAX_DONATION } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Donation policy",
  description: "How giving to Helping Hands Foundation works: currency, monthly gifts, refunds, how gifts are used, receipts and our promise to donors.",
};

const promises = [
  "To be told clearly how your gift will be used.",
  "To know who runs the foundation and who oversees it.",
  "To see our annual reports and financial summaries.",
  "To have your gift used for the purpose you chose.",
  "To receive a prompt receipt and acknowledgement.",
  "To have your details kept private and never sold.",
  "To be able to ask questions and get honest answers.",
  "To stop or change a monthly gift at any time, easily.",
];

export default function DonationPolicyPage() {
  const email = site.contact.email;
  return (
    <>
      <PageHeader eyebrow="Donation policy" title="How giving works" intro={<p>The small print, in plain English.</p>} />
      <section className="py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <DraftBanner />

          <div className="mt-10 rounded-[1.8rem] bg-ink-900 p-8 text-sand-100">
            <h2 className="text-[1.8rem] !text-sand-50">Our promise to donors</h2>
            <p className="mt-2 text-sand-100/75">Inspired by the Donor Bill of Rights followed by charities worldwide.</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {promises.map((p) => (
                <li key={p} className="flex gap-3"><span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sun-400" />{p}</li>
              ))}
            </ul>
          </div>

          <div className="prose-hh mt-12 text-[1.05rem] text-ink">
            <h2>1. Currency and amounts</h2>
            <p>All online donations are in <strong>US dollars (USD)</strong>. You can give $10, $25, $50 or $100, or any amount from ${MIN_DONATION} to ${MAX_DONATION.toLocaleString("en-US")}. For larger gifts, legacies or gifts from companies, please <Link href="/contact">contact us</Link>. If your card is in another currency, your bank may apply its own exchange rate or fees.</p>

            <h2>2. Secure payment</h2>
            <p>Donations are processed by Paystack, a PCI DSS-compliant payment provider. You enter your card details on Paystack’s secure page, never on our website. We record a gift as received only after Paystack confirms the payment to us directly. Paystack’s processing fee is deducted from each gift.</p>

            <h2>3. Monthly giving</h2>
            <p>A monthly gift is charged on the same day each month until you cancel. You can cancel or change it at any time, using the link in Paystack’s subscription emails or by emailing <a href={`mailto:${email}`}>{email}</a>. We will confirm within 2 working days. Cancelling stops future payments; it does not refund payments already made.</p>

            <h2>4. How your gift is used</h2>
            <ul>
              <li><strong>Where it’s needed most:</strong> your gift supports the most urgent need across Orphan Care, Children’s Wellbeing & Education and Medical Support.</li>
              <li><strong>A cause you choose:</strong> your gift is used for that cause. If a specific appeal is fully funded or can no longer go ahead, we will use your gift for the closest related work, and tell you if you ask us to.</li>
              <li><strong>Running costs:</strong> up to 18% of donations may be used for operations and fundraising, so the foundation can run safely and well. In 2025 this was 18% (see our <Link href="/transparency/annual-report-2025">annual report</Link>).</li>
              <li><strong>Medical support</strong> is always paid directly to the hospital, clinic or pharmacy, never in cash to individuals.</li>
            </ul>

            <h2>5. Receipts</h2>
            <p>Paystack emails a receipt as soon as your payment is confirmed. If you need a statement of your gifts for the year, email us and we will send one within 10 working days.</p>

            <h2>6. Refunds</h2>
            <p>If you made a mistake, such as the wrong amount or an accidental duplicate, contact us within <strong>14 days</strong> of the gift with your payment reference, and we will refund it in full to the original payment method. After 14 days, gifts have usually been put to work and are normally non-refundable, but we will always consider requests fairly.</p>
            <p>If you see a payment you don’t recognise, please contact us before raising a dispute with your bank, so we can resolve it quickly.</p>

            <h2>7. Gifts we may decline</h2>
            <p>We may decline or return a gift if accepting it would conflict with our values, harm the people we serve, or risk our independence, or if we cannot verify where the funds came from.</p>

            <h2>8. Questions</h2>
            <p>If anything about your donation is unclear, email <a href={`mailto:${email}`}>{email}</a> or use our <Link href="/contact">contact form</Link>. We’re happy to help.</p>
          </div>
        </div>
      </section>
    </>
  );
}
