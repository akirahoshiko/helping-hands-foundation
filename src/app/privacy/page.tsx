import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { DraftBanner, TBC } from "@/components/Draft";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Helping Hands Foundation handles personal information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy notice" intro={<p>We collect as little personal information as possible, and only to respond to you or to process your donation.</p>} />
      <section className="py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <DraftBanner />
          <div className="prose-hh mt-10 text-[1.05rem] text-ink">
            <h2>Who we are</h2>
            <p>
              This website is operated by {site.name}. The organisation responsible for your information (the data controller) is{" "}
              {site.registration.legalName ? site.registration.legalName : <TBC>the foundation’s registered legal name and address</TBC>}.
            </p>

            <h2>What we collect, and why</h2>
            <h3>Contact and Get Involved forms</h3>
            <p>When you send a message, we receive your name, email address, your message and, on the Get Involved form, your area of interest. We use these only to reply to you and to discuss how you would like to help.</p>
            <p>Your message is delivered to the foundation’s inbox by an email delivery service. The website itself does not keep a database of messages.</p>
            <p>Please do not send medical records, health details or other sensitive personal information through these forms.</p>

            <h3>Donations</h3>
            <p>When you donate, you give us your name, email address, the amount, how often you’d like to give, the cause you chose, and an optional message. These details are sent securely to our payment provider, Paystack, which processes the payment.</p>
            <p>
              You enter your card or bank details on Paystack’s own secure page. They are <strong>never</strong> entered on, sent to, or stored by this website. Paystack handles payment information under its own{" "}
              <a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>. Paystack sends you the payment receipt and gives the foundation a record of each payment.
            </p>

            <h3>Technical information</h3>
            <p>To protect the forms from abuse, the website briefly keeps the IP address of each submission in memory to limit repeated attempts. It is not stored permanently. Our hosting provider keeps standard server logs for security and reliability.</p>

            <h2>Cookies</h2>
            <p>This website does not use advertising or analytics cookies, and fonts are served from our own website rather than third parties. If you continue to Paystack’s checkout, Paystack may use cookies needed to process your payment securely.</p>

            <h2>How long we keep information</h2>
            <p>Messages are kept in the foundation’s email for as long as needed to respond and follow up. Donation records are kept as required for accounting and legal purposes: <TBC>retention periods under the foundation’s policies and local law</TBC>.</p>

            <h2>Sharing</h2>
            <p>We do not sell or rent personal information. We share it only with the service providers needed to run this website (hosting, email delivery and payment processing), or where the law requires it.</p>

            <h2>Your rights</h2>
            <p>
              You can ask to see, correct or delete the personal information we hold about you, or object to how it is used. To make a request, please use our <Link href="/contact">contact form</Link>. You may also have the right to complain to your data protection authority: <TBC>the relevant authority, for example the Nigeria Data Protection Commission</TBC>.
            </p>

            <h2>Changes</h2>
            <p>We will update this notice if the way the website handles information changes. Last updated: <TBC>publication date</TBC>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
