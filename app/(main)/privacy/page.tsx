import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Vitality Fitness Tavistock",
  description:
    "Privacy Policy for Vitality Fitness Tavistock — how we collect, use and protect your personal data under UK GDPR.",
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-10">
      <h2 className="font-[Outfit,sans-serif] text-[1.35rem] font-extrabold text-[#00a85d] mb-[0.85rem] tracking-[-0.02em]">
        {title}
      </h2>
      <div className="text-[#475569] leading-[1.8] text-[0.95rem]">{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3">{children}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[Outfit,sans-serif] text-base font-bold text-[#0f172a] mt-5 mb-2">
      {children}
    </h3>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="pl-5 mb-3 list-disc">
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="mb-[0.3rem]">{children}</li>;
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Legal</div>
          <h1 className="font-[Outfit,sans-serif] text-[clamp(2.5rem,6vw,3.75rem)] font-black text-[#0f172a] mt-3 mb-4 tracking-[-0.03em]">
            Privacy Policy
          </h1>
          <p className="text-[#64748b] text-[1.1rem] max-w-[36rem] mx-auto">
            Last updated: May 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="max-w-[52rem] mx-auto">

            {/* Intro box */}
            <div className="bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)] rounded-xl px-6 py-5 mb-10 text-[#374151] text-[0.9rem] leading-[1.7]">
              <strong className="text-[#00a85d]">Summary:</strong> Vitality Fitness Tavistock Ltd (&ldquo;VFT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what personal data we collect, why we collect it, how we use it, and your rights under UK GDPR and the Data Protection Act 2018.
            </div>

            <Section id="who-we-are" title="1. Who We Are">
              <P>
                <strong>Vitality Fitness Tavistock Ltd</strong> is the data controller for personal information collected through our gym, website (<em>vitalityfitnesstavistock.com</em>), and associated services.
              </P>
              <P>
                <strong>Address:</strong> Tavistock, Devon, UK<br />
                <strong>Email:</strong> hello@vitalityfitnesstavistock.com<br />
                <strong>Phone:</strong> +44 1822 366335
              </P>
              <P>
                If you have any questions about this policy or how we handle your data, please contact us at the details above.
              </P>
            </Section>

            <Section id="data-we-collect" title="2. Personal Data We Collect">
              <H3>Data you provide directly</H3>
              <Ul>
                <Li>Name, email address, phone number and date of birth when you join as a member</Li>
                <Li>Payment details (processed securely via Stripe / ClubRight — we do not store card numbers)</Li>
                <Li>Emergency contact name and number</Li>
                <Li>Health disclosures made during gym induction or PAR-Q questionnaire</Li>
                <Li>Enquiries or messages sent via our contact form</Li>
                <Li>Feedback, reviews or survey responses you submit</Li>
              </Ul>
              <H3>Data collected automatically</H3>
              <Ul>
                <Li>Access logs (entry/exit times via our door-access system)</Li>
                <Li>CCTV footage (for security purposes)</Li>
                <Li>IP address and browser type when you visit our website</Li>
                <Li>Cookie data and usage analytics (see Section 8)</Li>
              </Ul>
            </Section>

            <Section id="how-we-use" title="3. How We Use Your Data">
              <Ul>
                <Li>To manage your membership, process payments and renewals</Li>
                <Li>To book and manage class reservations via our app and timetable</Li>
                <Li>To send administrative communications (booking confirmations, receipts, account notices)</Li>
                <Li>To send marketing emails about new classes, offers and events — only with your consent</Li>
                <Li>To maintain site security and prevent fraud</Li>
                <Li>To comply with our legal and regulatory obligations</Li>
                <Li>To improve our services based on usage patterns and feedback</Li>
              </Ul>
            </Section>

            <Section id="legal-basis" title="4. Legal Basis for Processing">
              <P>We process your personal data under the following legal bases (UK GDPR Article 6):</P>
              <H3>Contract</H3>
              <P>Processing is necessary to perform your membership contract — e.g. providing gym access, processing payments and booking classes.</P>
              <H3>Legitimate interests</H3>
              <P>We may process data where we have a legitimate interest, such as maintaining site security, preventing fraud, and improving our services — provided your interests do not override ours.</P>
              <H3>Legal obligation</H3>
              <P>We process some data to comply with legal requirements such as tax records and CCTV obligations.</P>
              <H3>Consent</H3>
              <P>Where you have given explicit consent, such as receiving marketing emails or sharing health information. You may withdraw consent at any time by contacting us or using our unsubscribe links.</P>
            </Section>

            <Section id="data-sharing" title="5. Who We Share Your Data With">
              <P>We do not sell your personal data. We share it only with trusted third parties that help us run our business:</P>
              <Ul>
                <Li><strong>ClubRight</strong> — membership management platform</Li>
                <Li><strong>Stripe</strong> — payment processing</Li>
                <Li><strong>Google Analytics</strong> — anonymised website analytics</Li>
                <Li><strong>Mailchimp / Resend</strong> — email communications</Li>
                <Li><strong>CCTV contractors</strong> — security system maintenance</Li>
              </Ul>
              <P>All third-party processors are required to handle your data in accordance with UK GDPR. We do not transfer personal data outside the UK/EEA without appropriate safeguards.</P>
            </Section>

            <Section id="retention" title="6. How Long We Keep Your Data">
              <Ul>
                <Li><strong>Active member data:</strong> held for the duration of your membership</Li>
                <Li><strong>Post-cancellation:</strong> retained for 6 years for legal and financial compliance</Li>
                <Li><strong>CCTV footage:</strong> overwritten after 31 days unless required for an incident</Li>
                <Li><strong>Contact form enquiries:</strong> retained for 2 years</Li>
                <Li><strong>Marketing consent records:</strong> retained until consent is withdrawn plus 1 year</Li>
              </Ul>
            </Section>

            <Section id="your-rights" title="7. Your Rights Under UK GDPR">
              <P>You have the following rights regarding your personal data:</P>
              <Ul>
                <Li><strong>Right of access</strong> — request a copy of the data we hold about you</Li>
                <Li><strong>Right to rectification</strong> — ask us to correct inaccurate or incomplete data</Li>
                <Li><strong>Right to erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;)</Li>
                <Li><strong>Right to restriction</strong> — ask us to limit how we use your data</Li>
                <Li><strong>Right to portability</strong> — receive your data in a structured, machine-readable format</Li>
                <Li><strong>Right to object</strong> — object to processing based on legitimate interests or direct marketing</Li>
                <Li><strong>Rights related to automated decision-making</strong> — not to be subject to solely automated decisions with significant effects</Li>
              </Ul>
              <P>
                To exercise any of these rights, email us at <a href="mailto:hello@vitalityfitnesstavistock.com" className="text-[#00a85d] underline">hello@vitalityfitnesstavistock.com</a>. We will respond within 30 days. You also have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#00a85d] underline">Information Commissioner&apos;s Office (ICO)</a>.
              </P>
            </Section>

            <Section id="cookies" title="8. Cookies">
              <P>Our website uses cookies to improve your experience and analyse traffic. We use the following categories:</P>
              <H3>Essential cookies</H3>
              <P>Required for the website to function. Cannot be disabled (e.g. session authentication, CSRF protection).</P>
              <H3>Analytics cookies</H3>
              <P>Help us understand how visitors interact with our site (e.g. Google Analytics — data is anonymised). These are only placed with your consent.</P>
              <H3>Marketing cookies</H3>
              <P>Used to deliver relevant advertisements on third-party platforms. Only placed with your consent.</P>
              <P>You can manage your cookie preferences at any time via the consent banner or your browser settings.</P>
            </Section>

            <Section id="security" title="9. Data Security">
              <P>We take data security seriously and implement appropriate technical and organisational measures, including:</P>
              <Ul>
                <Li>SSL/TLS encryption for all data in transit</Li>
                <Li>Access controls limiting data to authorised staff only</Li>
                <Li>Regular security reviews and penetration testing</Li>
                <Li>Staff training on data protection obligations</Li>
              </Ul>
              <P>In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify the ICO within 72 hours and inform affected individuals without undue delay.</P>
            </Section>

            <Section id="children" title="10. Children's Privacy">
              <P>Our gym services are intended for adults aged 16 and over. We do not knowingly collect personal data from children under 16 without verifiable parental consent. If you believe a child has provided us with personal data, please contact us immediately.</P>
            </Section>

            <Section id="changes" title="11. Changes to This Policy">
              <P>We may update this Privacy Policy from time to time to reflect changes in law or our practices. We will notify members of material changes via email. The &ldquo;Last updated&rdquo; date at the top of this page will always reflect the most current version.</P>
            </Section>

            <Section id="contact-dpo" title="12. Contact Us">
              <P>For all data protection enquiries, please contact:</P>
              <P>
                <strong>Vitality Fitness Tavistock Ltd</strong><br />
                Email: <a href="mailto:hello@vitalityfitnesstavistock.com" className="text-[#00a85d] underline">hello@vitalityfitnesstavistock.com</a><br />
                Phone: +44 1822 366335<br />
                Address: Tavistock, Devon, UK
              </P>
            </Section>

            {/* Back link */}
            <div className="border-t border-[#e5e7eb] pt-8 mt-4 flex items-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-[0.4rem] text-[#00a85d] font-bold text-[0.9rem] no-underline"
              >
                ← Contact Us
              </Link>
              <span className="text-[#e5e7eb]">|</span>
              <Link
                href="/terms"
                className="inline-flex items-center gap-[0.4rem] text-[#64748b] font-semibold text-[0.9rem] no-underline"
              >
                Terms of Use →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
