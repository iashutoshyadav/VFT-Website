"use client";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const plans = [
  {
    name: "Essential",
    monthly: 29.99,
    annual: 24.99,
    featured: false,
    badge: null,
    includesLabel: "Plan includes",
    features: [
      "24/7 Gym Access",
      "Full Equipment Use",
      "Bespoke Members App",
      "Locker & Changing Rooms",
      "Free Parking",
      "2 Guest Passes / Year",
    ],
  },
  {
    name: "Premium",
    monthly: 44.99,
    annual: 37.99,
    featured: true,
    badge: "Best value",
    includesLabel: "Everything in Essential, plus...",
    features: [
      "Unlimited Sauna Access",
      "Unlimited Group Classes",
      "5 Guest Passes / Year",
    ],
  },
  {
    name: "Elite",
    monthly: 59.99,
    annual: 49.99,
    featured: false,
    badge: null,
    includesLabel: "Everything in Premium, plus...",
    features: [
      "2× PT Sessions / Month",
      "Priority Class Booking",
      "Nutrition Consultation",
      "Unlimited Guest Passes",
    ],
  },
];

export default function MembershipCards() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section
      id="membership"
      className="py-14 relative overflow-hidden bg-[#f5f6f8]"
    >
      <div className="max-w-[1160px] mx-auto px-6 relative z-[1]">
        {/* ── Header ── */}
        <div className="text-center mb-9">
          <span className="inline-block text-[#374151] text-[0.72rem] font-extrabold tracking-[0.18em] uppercase mb-2.5">
            Membership Plans
          </span>

          <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-[1.1] mb-3">
            Simple,{" "}
            <span className="text-[#1f2937]">honest</span>{" "}
            pricing
          </h2>

          <p className="text-[#64748b] text-[1.05rem] max-w-[460px] mx-auto mb-5 leading-[1.6]">
            No hidden fees. No lock-in contracts. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-[#e5e7eb] rounded-[30px] p-1 shadow-[inset_0_2px_4px_rgba(15,23,42,0.05)] relative w-60 h-11 z-10">
            {/* Sliding backdrop indicator */}
            <div
              className={clsx(
                "absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-[26px] shadow-[0_4px_10px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.04)] transition-transform duration-[280ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] z-0",
                billing === "annual" ? "translate-x-full" : "translate-x-0"
              )}
            />

            <button
              onClick={() => setBilling("monthly")}
              className={clsx(
                "w-1/2 h-full bg-transparent border-none rounded-[26px] text-[0.85rem] font-bold cursor-pointer relative z-[1] transition-colors duration-200 ease-in-out",
                billing === "monthly" ? "text-[#0f172a]" : "text-[#64748b]"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={clsx(
                "w-1/2 h-full bg-transparent border-none rounded-[26px] text-[0.85rem] font-bold cursor-pointer relative z-[1] flex items-center justify-center gap-1 transition-colors duration-200 ease-in-out",
                billing === "annual" ? "text-[#0f172a]" : "text-[#64748b]"
              )}
            >
              Annual
              <span className="pulse-discount-badge inline-block text-[0.58rem] font-black bg-[#1f2937] text-white py-[1.5px] px-[6px] rounded-full tracking-[0.02em]">
                17% OFF
              </span>
            </button>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid gap-5 items-stretch grid-cols-1 sm:grid-cols-3">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.annual : plan.monthly;
            const yearlySaving = ((plan.monthly - plan.annual) * 12).toFixed(0);

            return (
              <div
                key={plan.name}
                className={clsx(
                  "rounded-2xl flex flex-col overflow-hidden transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)]",
                  plan.featured
                    ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)] ring-2 ring-[#d1d5db]"
                    : "bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                )}
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Plan name + badge row */}
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-[1.6rem] font-black text-[#0f172a] tracking-[-0.02em] leading-none">
                      {plan.name}
                    </h3>
                    {plan.badge && (
                      <span className="inline-block shrink-0 text-[0.65rem] font-extrabold tracking-[0.06em] uppercase bg-[#1f2937] text-white py-[4px] px-[10px] rounded-full mt-[3px]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Includes label */}
                  <p className="text-[0.8rem] text-[#64748b] font-medium mb-5 leading-[1.4]">
                    {plan.includesLabel}
                  </p>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-[10px] flex-1 mb-6 list-none p-0 m-0">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#374151] flex items-center justify-center shrink-0">
                          <Check size={11} color="white" strokeWidth={3} />
                        </div>
                        <span className="text-[0.875rem] text-[#334155] font-medium leading-[1.3]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Price block */}
                  <div className="mt-auto">
                    <p className="text-[0.72rem] text-[#64748b] font-medium mb-1 leading-[1.3]">
                      Typical cost only
                    </p>
                    <div className="flex items-baseline gap-1 mb-[2px]">
                      <span className="text-[1rem] font-bold text-[#0f172a] self-start mt-[3px]">£</span>
                      <span className="text-[3rem] font-black text-[#0f172a] tracking-[-0.04em] leading-none">
                        {Math.floor(price)}
                      </span>
                      <span className="text-[1.4rem] font-extrabold text-[#0f172a] self-start mt-[6px]">
                        .{price.toFixed(2).split(".")[1]}
                      </span>
                    </div>
                    <p className="text-[0.75rem] text-[#64748b] font-medium mb-[2px]">
                      per month
                    </p>

                    {billing === "annual" && (
                      <p className="text-[0.72rem] text-[#374151] font-bold mb-2">
                        Save £{yearlySaving} a year
                      </p>
                    )}

                    <p className="text-[0.65rem] text-[#94a3b8] mb-5 leading-[1.4]">
                      Pricing may differ by location
                    </p>

                    {/* Divider */}
                    <div className="border-t border-[rgba(0,0,0,0.1)] pt-5">
                      <Link
                        href="https://vft.clubright.co.uk/Account/Register"
                        target="_blank"
                        className="group flex items-center justify-between no-underline"
                      >
                        <span className="text-[#0f172a] text-[0.9rem] font-bold underline decoration-[#0f172a]/40 underline-offset-4 group-hover:text-[#374151] group-hover:decoration-[#374151] transition-colors duration-200">
                          Join now
                        </span>
                        <ChevronRight
                          strokeWidth={2.5}
                          className="w-5 h-5 text-[#0f172a] group-hover:text-[#374151] group-hover:translate-x-1 transition-all duration-200"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <div className="text-center mt-7">
          <p className="inline-flex items-center gap-2 text-[#64748b] text-[0.85rem]">
            <span className="text-[#374151] font-bold">✓</span>
            No contracts &nbsp;·&nbsp;
            <span className="text-[#374151] font-bold">✓</span>
            Cancel anytime &nbsp;·&nbsp;
            <span className="text-[#374151] font-bold">✓</span>
            Student &amp; corporate discounts available
          </p>
        </div>
      </div>
    </section>
  );
}
