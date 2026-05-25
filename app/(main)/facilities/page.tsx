import FacilitiesSection from "@/components/FacilitiesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities | VFT — Vitality Fitness Tavistock",
  description: "World-class gym facilities in Tavistock — full equipment, unlimited sauna, dedicated class studio, premium changing rooms and free parking.",
};

export default function FacilitiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Facilities</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-4">
            World-Class <span className="gradient-text">Facilities</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-xl mx-auto">
            Everything you need to train, recover, and perform at your best — all under one roof.
          </p>
        </div>
      </section>
      <FacilitiesSection />
    </>
  );
}
