import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background tint overlay */}
      <div
        className="absolute inset-0 z-0 [background:linear-gradient(to_right,#0b0f19_0%,rgba(15,23,42,0.95)_50%,rgba(15,23,42,0.8)_100%)]"
      />

      {/* Tech Dotted Grid Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 pointer-events-none z-1 bg-[radial-gradient(rgba(255,255,255,0.04)_1.2px,transparent_1.2px)] bg-size-[24px_24px]"
      />

      {/* Ambient Glow Orb */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-100 h-100 pointer-events-none z-1 bg-[radial-gradient(circle,rgba(0,204,112,0.08)_0%,transparent_70%)]"
      />

      {/* Green gradient accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-1 bg-[linear-gradient(90deg,#00cc70_0%,#00a85d_100%)]"
      />

      <div className="container-max relative z-2 px-6">
        <div className="flex flex-row flex-wrap items-center justify-between gap-10 max-md:flex-col max-md:items-start max-md:gap-7">
          {/* Text block */}
          <div className="flex-[1_1_500px]">
            <span className="inline-flex items-center gap-[6px] text-[#00cc70] text-[0.72rem] font-extrabold tracking-[0.12em] uppercase mb-3">
              <span className="w-[5px] h-[5px] rounded-full bg-[#00cc70] shadow-[0_0_8px_#00cc70]" />
              Ready to start?
            </span>
            <h2
              className="font-black text-white tracking-[-0.03em] leading-[1.1] mb-3 [font-size:clamp(2.2rem,4.5vw,3rem)] [font-family:'Outfit',sans-serif]"
            >
              Your best self <span className="text-[#00cc70]">starts here.</span>
            </h2>
            <p
              className="text-white/60 text-[1.05rem] leading-[1.6] m-0 max-w-[520px]"
            >
              Join Tavistock&apos;s fastest-growing gym. First week free — no commitment required.
            </p>
          </div>

          {/* Buttons block */}
          <div className="flex flex-row gap-[14px] flex-wrap items-center">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 bg-[linear-gradient(135deg,#00cc70_0%,#00a85d_100%)] text-white [font-family:'Outfit',sans-serif] font-bold text-[0.95rem] py-[14px] px-[30px] rounded-xl no-underline transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_15px_rgba(0,204,112,0.2)] cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,204,112,0.35)] hover:brightness-[1.05]"
            >
              <span>Find your membership</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact#book"
              className="inline-flex items-center bg-transparent text-white/90 [font-family:'Outfit',sans-serif] font-bold text-[0.95rem] py-[14px] px-[30px] rounded-xl border-2 border-white/20 cursor-pointer transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] no-underline hover:bg-white/[0.08] hover:border-white/60 hover:-translate-y-[2px] hover:text-white"
            >
              Book a free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
