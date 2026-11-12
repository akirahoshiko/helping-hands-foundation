import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Helping Hands Foundation collects, uses and protects personal information.",
};

export default function PrivacyPage() {
  const email = site.contact.email;
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy" intro={<p>We collect as little personal information as possible, use it only for the reasons below, and never sell it.</p>} />
      <section className="py-14 lg:py-20">
        <div className="container-site max-w-3xl">
          <p className="mt-8 text-[0.95rem] text-muted">Last updated: 1 November 2026</p>
          <div className="prose-hh mt-4 text-[1.05rem] text-ink">
            <h2>1. Who we are</h2>
            <p>{site.registration.legalName} (“Helping Hands”, “we”) is responsible for the personal information described in this policy. We follow the Nigeria Data Protection Act 2023 and, for supporters elsewhere, apply the same high standard.</p>
            <p>Questions or requests: <a href={`mailto:${email}`}>{email}</a> (Data Protection Contact).</p>

            <h2>2. What we collect</h2>
            <ul>
              <li><strong>Donors:</strong> name, email address, gift amount, frequency, the cause you chose and any message you add.</li>
              <li><strong>Enquiries and volunteers:</strong> name, email address, your area of interest and your message.</li>
              <li><strong>Newsletter:</strong> your email address.</li>
              <li><strong>Technical:</strong> limited information needed to protect our forms from abuse (see section 6).</li>
            </ul>
            <p>We do <strong>not</strong> collect card or bank details: you enter these on our payment provider’s secure page. Please do not send us medical records or other sensitive information through the website.</p>

            <h2>3. How we use it, and why</h2>
            <ul>
              <li>To process your donation and send you a receipt (to perform our agreement with you).</li>
              <li>To reply to your messages and organise volunteering (our legitimate interest in responding to you).</li>
              <li>To send updates and appeals, only if you sign up, and you can unsubscribe at any time (your consent).</li>
              <li>To keep financial records and meet legal and audit obligations (legal obligation).</li>
              <li>To prevent fraud and misuse of our website (legitimate interest).</li>
            </ul>

            <h2>4. Who we share it with</h2>
            <p>We never sell, rent or trade personal information. We share it only with service providers who help us run the foundation and who must keep it confidential:</p>
            <ul>
              <li><strong>Paystack</strong>: processes donations securely (<a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">Paystack privacy policy</a>).</li>
              <li><strong>Formspree</strong>: delivers website messages to our inbox.</li>
              <li><strong>Vercel</strong>: hosts this website.</li>
            </ul>
            <p>We may disclose information where the law requires it, or to protect the safety of a child or vulnerable adult. Only total, anonymous donation figures are ever published.</p>

            <h2>5. How long we keep it</h2>
            <ul>
              <li>Donation records: 6 years after the gift, for accounting and audit.</li>
              <li>Enquiries and volunteer messages: up to 24 months after our last contact.</li>
              <li>Newsletter: until you unsubscribe.</li>
            </ul>

            <h2>6. Cookies and security</h2>
            <p>This website does not use advertising or analytics cookies, and our fonts are served from our own site. To protect our forms, we briefly keep the IP address of each submission in memory to limit repeated attempts; it is not stored permanently. If you continue to Paystack’s checkout, Paystack may use cookies needed to process your payment securely.</p>
            <p>The website is served over an encrypted connection (HTTPS), and access to supporter records is limited to the staff who need it.</p>

            <h2>7. Your rights</h2>
            <p>You can ask us to:</p>
            <ul>
              <li>show you the personal information we hold about you;</li>
              <li>correct it, or delete it where we no longer need to keep it;</li>
              <li>stop sending you updates, or withdraw any consent you gave;</li>
              <li>object to or restrict how we use it, or give you a copy to take elsewhere.</li>
            </ul>
            <p>Email <a href={`mailto:${email}`}>{email}</a> or use our <Link href="/contact">contact form</Link>. We will reply within 30 days. If you are unhappy with our response, you can complain to the Nigeria Data Protection Commission or the data protection authority where you live.</p>

            <h2>8. Children</h2>
            <p>Our website is not aimed at children, and we do not knowingly collect information from anyone under 18 through it. Information about the children we support is handled under our <Link href="/safeguarding">Safeguarding policy</Link>, never through public forms.</p>

            <h2>9. Changes</h2>
            <p>We will update this policy if the way we handle information changes, and show the date of the latest version at the top of this page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
