"use client";
import { useState } from "react";
import { Plus, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const faqs = [
  { q: "What are your opening hours?", a: "We're open 24/7! You can access the gym at any time. Our staffed reception hours are Monday–Friday 8am–8pm and Saturday–Sunday 9am–5pm." },
  { q: "How do I join VFT?", a: "Joining is easy — click 'Join now' at the top of the page, choose your membership plan and complete the secure online registration. You'll get immediate app access and can book your induction right away." },
  { q: "Is there a contract?", a: "No! We have zero lock-in contracts. Cancel or freeze your membership at any time with no hidden penalties. We earn your loyalty through results." },
  { q: "What's included in the sauna access?", a: "Our unlimited sauna is included in Premium and Elite plans — no extra charge, no booking required. Just use it whenever you like, as often as you like." },
  { q: "Do I need to book classes in advance?", a: "Yes, we recommend booking in advance as popular sessions fill quickly. You can book through our Members App or on the Classes page. Join a waitlist for fully booked classes." },
  { q: "Is there free parking?", a: "Yes! Free parking is available for all VFT members near the gym. Full details and directions are on our Contact page." },
  { q: "Do you offer student or corporate discounts?", a: "Yes — we have special rates for students and corporate memberships. Get in touch at hello@vitalityfitnesstavistock.com for more details." },
  { q: "Is there a free trial?", a: "Yes! We offer a free first week trial so you can experience VFT before committing. Just contact us to arrange — no payment details required." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-14 bg-white">
      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 pointer-events-none z-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] bg-size-[24px_24px]"
      />

      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none z-0 top-[-10%] left-[-10%] w-150 h-150 bg-[radial-gradient(circle,rgba(0,204,112,0.025)_0%,rgba(255,255,255,0)_70%)]"
      />
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none z-0 bottom-[-10%] right-[-10%] w-125 h-125 bg-[radial-gradient(circle,rgba(99,102,241,0.015)_0%,rgba(255,255,255,0)_70%)]"
      />

      <div className="max-w-290 mx-auto px-6 relative z-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16 items-start">

          {/* Left panel */}
          <div className="lg:sticky lg:top-25">
            <span className="inline-block bg-linear-to-br from-[#00cc70] to-[#00a85d] bg-clip-text text-transparent text-[0.72rem] font-extrabold tracking-[0.18em] uppercase mb-4">
              Help &amp; Support
            </span>

            <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-tight mb-4">
              Got{" "}
              <span className="bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                questions
              </span>
              ?
            </h2>

            <p className="text-[#64748b] text-base leading-relaxed mb-9 max-w-115">
              We&apos;ve answered the most common questions on the right. Still need help or have a custom inquiry? Our team is always happy to help.
            </p>

            {/* Support Card */}
            <div className="relative overflow-hidden bg-white/75 border border-[rgba(226,232,240,0.8)] rounded-3xl p-7 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.04)] backdrop-blur-[12px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[linear-gradient(90deg,#00cc70,#00a85d)] before:opacity-80">
              <h3 className="text-[1.1rem] font-extrabold text-[#0f172a] mb-5 flex items-center gap-2.5 font-['Outfit',sans-serif]">
                <span className="relative inline-block w-2 h-2 rounded-full bg-[#00cc70] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[#00cc70] after:rounded-full after:animate-[support-pulse_1.8s_infinite_ease-in-out]" />
                Direct Support
              </h3>

              <div className="flex flex-col gap-2.5 mb-6">
                {/* Phone */}
                <a
                  href="tel:+441822366335"
                  className="group/si flex items-center gap-4 no-underline py-2.5 px-3 rounded-2xl bg-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[rgba(0,204,112,0.04)] hover:translate-x-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,rgba(0,204,112,0.08)_0%,rgba(0,168,93,0.03)_100%)] text-[#00cc70] flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[rgba(0,204,112,0.08)] group-hover/si:bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] group-hover/si:text-white group-hover/si:shadow-[0_4px_12px_rgba(0,204,112,0.2)] group-hover/si:border-transparent">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[0.7rem] font-extrabold text-[#94a3b8] uppercase tracking-[0.06em] mb-0.5">Call Us</div>
                    <div className="text-[0.9rem] font-bold text-[#334155] transition-colors duration-250 ease-in-out group-hover/si:text-[#00a85d]">+44 1822 366335</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@vitalityfitnesstavistock.com"
                  className="group/si flex items-center gap-4 no-underline py-2.5 px-3 rounded-2xl bg-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[rgba(0,204,112,0.04)] hover:translate-x-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,rgba(0,204,112,0.08)_0%,rgba(0,168,93,0.03)_100%)] text-[#00cc70] flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[rgba(0,204,112,0.08)] group-hover/si:bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] group-hover/si:text-white group-hover/si:shadow-[0_4px_12px_rgba(0,204,112,0.2)] group-hover/si:border-transparent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[0.7rem] font-extrabold text-[#94a3b8] uppercase tracking-[0.06em] mb-0.5">Email Us</div>
                    <div className="text-[0.9rem] font-bold text-[#334155] transition-colors duration-250 ease-in-out group-hover/si:text-[#00a85d] break-all">hello@vitalityfitnesstavistock.com</div>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-4 py-2.5 px-3 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,rgba(0,204,112,0.08)_0%,rgba(0,168,93,0.03)_100%)] text-[#00cc70] flex items-center justify-center shrink-0 border border-[rgba(0,204,112,0.08)]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[0.7rem] font-extrabold text-[#94a3b8] uppercase tracking-[0.06em] mb-0.5">Staffed Hours</div>
                    <div className="text-[0.9rem] font-bold text-[#334155]">Mon-Fri 8am-8pm | Sat-Sun 9am-5pm</div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="group/btn flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] text-white py-3.5 px-7 rounded-2xl text-[0.9rem] font-bold no-underline shadow-[0_6px_20px_rgba(0,204,112,0.25)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,204,112,0.35)] hover:brightness-105"
              >
                <span>Write to Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right panel — FAQ accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={clsx(
                    "group relative rounded-2xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen
                      ? "bg-[linear-gradient(135deg,#ffffff_0%,rgba(0,204,112,0.015)_100%)] border border-[rgba(0,204,112,0.35)] shadow-[0_16px_32px_-12px_rgba(0,204,112,0.1),0_4px_12px_rgba(15,23,42,0.02)]"
                      : "bg-white border border-[#e2e8f0] shadow-[0_4px_20px_-10px_rgba(15,23,42,0.03)] hover:-translate-y-0.5 hover:border-[rgba(0,204,112,0.2)] hover:shadow-[0_12px_24px_-10px_rgba(15,23,42,0.06)]"
                  )}
                >
                  {/* Left accent line */}
                  <div
                    className={clsx(
                      "absolute left-0 top-0 bottom-0 w-1 bg-[linear-gradient(180deg,#00cc70_0%,#00a85d_100%)] transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top",
                      isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    )}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 px-6 text-left border-none bg-none outline-none cursor-pointer gap-4"
                  >
                    <span
                      className={clsx(
                        "font-bold text-base leading-snug transition-colors duration-250 ease-in-out font-['Outfit',sans-serif]",
                        isOpen ? "text-[#00a85d]" : "text-[#0f172a] group-hover:text-[#00cc70]"
                      )}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border",
                        isOpen
                          ? "bg-[#00cc70] border-[#00cc70] text-white shadow-[0_4px_12px_rgba(0,204,112,0.25)]"
                          : "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] group-hover:border-[rgba(0,204,112,0.2)] group-hover:text-[#00cc70] group-hover:bg-[rgba(0,204,112,0.04)]"
                      )}
                    >
                      <Plus
                        className={clsx(
                          "w-4 h-4 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isOpen ? "rotate-45" : "rotate-0"
                        )}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {/* Smooth height animation */}
                  <div
                    className={clsx(
                      "grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#475569] text-[0.9rem] leading-relaxed py-0 px-6 pb-5 m-0">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
