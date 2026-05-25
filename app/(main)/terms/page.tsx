import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Vitality Fitness Tavistock",
  description:
    "Terms of Use for Vitality Fitness Tavistock — membership terms, class booking rules, cancellation policy and code of conduct.",
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

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Legal</div>
          <h1 className="font-[Outfit,sans-serif] text-[clamp(2.5rem,6vw,3.75rem)] font-black text-[#0f172a] mt-3 mb-4 tracking-[-0.03em]">
            Terms of Use
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
              <strong className="text-[#00a85d]">Please read carefully:</strong> By joining Vitality Fitness Tavistock or using our facilities, website or app, you agree to these Terms of Use. These terms form part of your membership agreement with <strong>Vitality Fitness Tavistock Ltd</strong> (&ldquo;VFT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
            </div>

            <Section id="membership" title="1. Membership Terms">
              <H3>1.1 Eligibility</H3>
              <P>Membership is open to individuals aged 16 and over. Members under 18 must provide written parental or guardian consent. We reserve the right to request proof of age at any time.</P>

              <H3>1.2 Membership Agreement</H3>
              <P>When you join VFT, you enter into a membership agreement with us. Your membership begins on the date confirmed in your welcome email and continues on a rolling monthly basis unless you select an annual plan.</P>

              <H3>1.3 Membership Fees</H3>
              <Ul>
                <Li>Membership fees are charged monthly in advance via Direct Debit or card on file</Li>
                <Li>We reserve the right to update membership prices with at least 30 days&apos; written notice</Li>
                <Li>Failed payments may result in temporary suspension of access until payment is received</Li>
                <Li>Annual memberships are non-refundable except where required by law</Li>
              </Ul>

              <H3>1.4 Membership Freeze</H3>
              <P>You may request to freeze your membership for up to 3 months per year due to medical reasons (with supporting documentation) or extended travel. Freeze requests must be submitted at least 5 business days before the next billing date. A reduced freeze fee of £5/month may apply.</P>

              <H3>1.5 Membership Cancellation</H3>
              <Ul>
                <Li>Monthly memberships require 30 days&apos; written notice of cancellation</Li>
                <Li>Cancellation requests must be submitted via email or through your member portal</Li>
                <Li>No refunds are issued for partial months</Li>
                <Li>Cancellation during a promotional period may be subject to a minimum term</Li>
              </Ul>
            </Section>

            <Section id="class-booking" title="2. Class Booking Rules">
              <H3>2.1 Booking System</H3>
              <P>Group classes can be booked through our website, mobile app, or at the gym reception. Class bookings are subject to availability and are confirmed on a first-come, first-served basis.</P>

              <H3>2.2 Booking in Advance</H3>
              <P>Members may book classes up to 7 days in advance. Bookings open at 6:00am on the day they become available. Premium and Elite members receive early booking access of up to 10 days.</P>

              <H3>2.3 Waitlist</H3>
              <P>If a class is full, you may join the waitlist. If a space becomes available, you will be notified by email or SMS. Waitlist spots are allocated automatically — please ensure your notification preferences are up to date.</P>

              <H3>2.4 Class Attendance</H3>
              <Ul>
                <Li>Please arrive at least 5 minutes before the class start time</Li>
                <Li>Members who are more than 5 minutes late may not be admitted</Li>
                <Li>If you cannot attend, please cancel your booking to release the spot for other members</Li>
              </Ul>
            </Section>

            <Section id="cancellation" title="3. Cancellation Policy">
              <H3>3.1 Class Cancellations</H3>
              <P>You may cancel a class booking up to <strong>2 hours before</strong> the scheduled start time without penalty. Late cancellations or no-shows within the 2-hour window will be recorded.</P>

              <H3>3.2 Repeated No-Shows</H3>
              <P>Members who accumulate 3 or more no-shows within a 30-day period may have their booking privileges temporarily suspended for up to 7 days. We will notify you by email before any suspension is applied.</P>

              <H3>3.3 VFT Class Cancellations</H3>
              <P>We reserve the right to cancel or modify classes due to instructor unavailability, low attendance, or circumstances beyond our control. Where possible, we will provide at least 1 hour&apos;s notice. No credit or refund is issued for cancelled classes.</P>
            </Section>

            <Section id="conduct" title="4. Code of Conduct">
              <P>All members and visitors are expected to behave in a respectful and considerate manner at all times. By joining VFT you agree to the following:</P>
              <H3>4.1 General Behaviour</H3>
              <Ul>
                <Li>Treat all staff and fellow members with courtesy and respect</Li>
                <Li>Zero tolerance for discrimination, harassment or intimidation of any kind</Li>
                <Li>No use of abusive, threatening or offensive language</Li>
                <Li>Report any concerns or incidents to staff immediately</Li>
              </Ul>

              <H3>4.2 Equipment & Facilities</H3>
              <Ul>
                <Li>Return all weights, equipment and mats to their designated storage after use</Li>
                <Li>Wipe down equipment with the provided disinfectant spray after each use</Li>
                <Li>Do not monopolise equipment during busy periods</Li>
                <Li>Report damaged or faulty equipment to staff immediately</Li>
                <Li>Appropriate gym attire and clean, closed-toe athletic footwear must be worn at all times</Li>
              </Ul>

              <H3>4.3 Health & Safety</H3>
              <Ul>
                <Li>Do not use the gym if you are feeling unwell</Li>
                <Li>Inform staff of any medical conditions that may affect your ability to exercise safely</Li>
                <Li>Follow all posted instructions for equipment use and studio capacity limits</Li>
                <Li>VFT accepts no liability for injuries resulting from misuse of equipment or failure to follow safety instructions</Li>
              </Ul>

              <H3>4.4 Sauna & Wet Areas</H3>
              <Ul>
                <Li>Always shower before using the sauna</Li>
                <Li>Use a towel when sitting in the sauna at all times</Li>
                <Li>Maximum 15-minute sauna sessions during peak hours (6am–9am, 5pm–8pm)</Li>
                <Li>The sauna is not recommended for members with certain health conditions — consult your GP if unsure</Li>
              </Ul>
            </Section>

            <Section id="access" title="5. Gym Access">
              <H3>5.1 24/7 Access</H3>
              <P>24/7 unstaffed access is available to all active members using their key fob or app. Staffed hours are Monday to Friday, 8am–8pm. During unstaffed periods, members are responsible for their own safety and must follow posted emergency procedures.</P>

              <H3>5.2 Guest Policy</H3>
              <P>Members may bring a guest with prior arrangement and payment of a guest pass fee (£8 per visit). Guests must sign a visitor waiver and be accompanied by the member at all times. Repeat guests (3+ visits) will be encouraged to join as members.</P>

              <H3>5.3 Access Card / Key Fob</H3>
              <P>Your access credentials are personal and non-transferable. Allowing others to use your credentials to enter the gym is a serious breach of these terms and may result in immediate membership termination. A replacement key fob costs £10.</P>
            </Section>

            <Section id="liability" title="6. Liability">
              <H3>6.1 Member Responsibility</H3>
              <P>You exercise and use our facilities at your own risk. VFT recommends that all new members undergo a gym induction and consult their GP before starting a new exercise programme, particularly if they have a pre-existing medical condition.</P>

              <H3>6.2 Limitation of Liability</H3>
              <P>To the fullest extent permitted by law, VFT shall not be liable for:</P>
              <Ul>
                <Li>Personal injury sustained while using VFT facilities unless caused by our negligence</Li>
                <Li>Loss or damage to personal property brought onto the premises</Li>
                <Li>Losses arising from temporary closure, class cancellations or equipment unavailability</Li>
              </Ul>
              <P>Nothing in these terms limits our liability for death or personal injury caused by our negligence, or for fraud or fraudulent misrepresentation.</P>

              <H3>6.3 Personal Property</H3>
              <P>VFT accepts no responsibility for the loss, theft or damage of personal belongings. Members are advised not to bring valuable items to the gym. Lockers are available for use during your visit — please do not leave belongings overnight.</P>
            </Section>

            <Section id="website" title="7. Website & App Use">
              <P>Our website and member app are provided for your convenience. You agree not to:</P>
              <Ul>
                <Li>Use our digital services for any unlawful purpose</Li>
                <Li>Attempt to gain unauthorised access to any part of our systems</Li>
                <Li>Reproduce, distribute or commercially exploit our content without prior written permission</Li>
                <Li>Post or transmit any harmful, offensive or misleading content</Li>
              </Ul>
              <P>We reserve the right to suspend access to our digital services for maintenance, security or any other reason we consider necessary.</P>
            </Section>

            <Section id="governing-law" title="8. Governing Law">
              <P>These Terms of Use are governed by and construed in accordance with the laws of <strong>England and Wales</strong>. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
              <P>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</P>
            </Section>

            <Section id="amendments" title="9. Amendments">
              <P>We may update these Terms of Use from time to time. Material changes will be communicated to members via email with at least 14 days&apos; notice. Continued use of our facilities or services after the effective date of any changes constitutes your acceptance of the revised terms.</P>
              <P>The current version of these terms is always available on our website.</P>
            </Section>

            <Section id="contact" title="10. Contact & Complaints">
              <P>If you have a question or complaint regarding these terms or your membership, please contact us:</P>
              <P>
                <strong>Vitality Fitness Tavistock Ltd</strong><br />
                Email: <a href="mailto:hello@vitalityfitnesstavistock.com" className="text-[#00a85d] underline">hello@vitalityfitnesstavistock.com</a><br />
                Phone: +44 1822 366335<br />
                Address: Tavistock, Devon, UK
              </P>
              <P>We aim to acknowledge all complaints within 2 business days and resolve them within 14 days.</P>
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
                href="/privacy"
                className="inline-flex items-center gap-[0.4rem] text-[#64748b] font-semibold text-[0.9rem] no-underline"
              >
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
