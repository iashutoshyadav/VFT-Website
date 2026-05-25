"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    image: "/gym_floor.png",
    title: "Always open for you",
    desc: "24/7 gym access, train on your schedule",
    linkLabel: "Find out more",
    href: "/facilities",
  },
  {
    image: "/sauna.png",
    title: "Pure relaxation",
    desc: "Unlimited sauna access to recover and relax",
    linkLabel: "Find out more",
    href: "/facilities",
  },
  {
    image: "/group_class.png",
    title: "Ready to push yourself?",
    desc: "20+ group classes weekly for all levels",
    linkLabel: "Explore classes",
    href: "/classes",
  },
];

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-14 bg-white">
      <div className="max-w-290 mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block bg-linear-to-br from-[#00cc70] to-[#00a85d] bg-clip-text text-transparent text-[0.72rem] font-extrabold tracking-[0.18em] uppercase mb-2.5">
            Why Choose VFT?
          </span>

          <h2 className="text-[clamp(2rem,5vw,3rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-[1.1] mb-3.5">
            Get the most from your gym
          </h2>

          <p className="text-[#64748b] text-[1.05rem] max-w-130 mx-auto leading-[1.7]">
            Everything you need to reach your goals — all under one roof, all in one membership.
          </p>
        </div>

        {/* 3-card image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative rounded-[18px] overflow-hidden h-64 sm:h-80 md:h-100 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
            >
              {/* Background image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-550 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                style={{ backgroundImage: `url('${card.image}')` }}
              />

              {/* Gradient — only bottom third, subtle */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.35)_38%,transparent_65%)]" />

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-[1.25rem] font-black tracking-[-0.02em] mb-1.25 leading-tight">
                  {card.title}
                </h3>

                <p className="text-white/72 text-[0.85rem] mb-4 leading-normal">
                  {card.desc}
                </p>

                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-white no-underline text-[0.875rem] font-bold tracking-[0.01em] transition-[gap,color] duration-200 ease-in-out group-hover:text-[#00cc70] group-hover:gap-2.5"
                >
                  {card.linkLabel}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
