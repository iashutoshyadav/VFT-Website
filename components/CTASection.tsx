import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-14 overflow-hidden bg-[#f5f6f8] border-t border-[#e5e7eb]">

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] bg-size-[24px_24px]"
      />

      {/* Dark accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-0.75 z-10 bg-[#1f2937]" />

      <div className="container-max relative z-10 px-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-10 max-md:flex-col max-md:items-start max-md:gap-7">

          {/* Text block */}
          <div className="flex-[1_1_500px]">
            <span className="inline-flex items-center gap-1.5 text-[#374151] text-[0.72rem] font-extrabold tracking-[0.12em] uppercase mb-3">
              <span className="w-[5px] h-[5px] rounded-full bg-[#374151]" />
              Ready to start?
            </span>
            <h2 className="font-black text-[#111827] tracking-[-0.03em] leading-[1.1] mb-3 [font-size:clamp(2.2rem,4.5vw,3rem)] [font-family:'Outfit',sans-serif]">
              Your best self{" "}
              <span className="text-[#374151]">starts here.</span>
            </h2>
            <p className="text-[#6b7280] text-[1.05rem] leading-[1.6] m-0 max-w-[520px]">
              Join Tavistock&apos;s fastest-growing gym. First week free — no commitment required.
            </p>
          </div>

          {/* Buttons block */}
          <div className="flex flex-row gap-[14px] flex-wrap items-center">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 bg-[#1f2937] text-white [font-family:'Outfit',sans-serif] font-bold text-[0.95rem] py-[14px] px-[30px] rounded-xl no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(31,41,55,0.2)] cursor-pointer hover:-translate-y-[2px] hover:bg-[#374151] hover:shadow-[0_10px_25px_rgba(31,41,55,0.25)]"
            >
              <span>Find your membership</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact#book"
              className="inline-flex items-center bg-white text-[#374151] [font-family:'Outfit',sans-serif] font-bold text-[0.95rem] py-[14px] px-[30px] rounded-xl border-2 border-[#d1d5db] cursor-pointer transition-all duration-300 no-underline hover:bg-[#eef0f3] hover:border-[#9ca3af] hover:-translate-y-[2px] hover:text-[#111827]"
            >
              Book a free trial
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
