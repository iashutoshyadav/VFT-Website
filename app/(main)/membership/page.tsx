import MembershipCards from "@/components/MembershipCards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Plans | VFT — Vitality Fitness Tavistock",
  description: "Join VFT from £29.99/mo. Choose Essential, Premium (with Unlimited Sauna), or Elite. No contracts, cancel anytime. Tavistock's best value gym membership.",
};

export default function MembershipPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Membership Plans</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-xl mx-auto">
            No hidden fees. No contracts. Cancel anytime. Your fitness, your rules.
          </p>
        </div>
      </section>
      <MembershipCards />
    </>
  );
}
