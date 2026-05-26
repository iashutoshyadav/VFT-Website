import Link from "next/link";
import { ChevronRight } from "lucide-react";

const cards = [
  {
    title: "Always open for you",
    desc: "24/7 gym access, train on your schedule",
    bg: "/gym_floor.png",
    fallback: "from-[#0f2a1a] to-[#1a3d28]",
    href: "/facilities",
    linkText: "Find out more",
  },
  {
    title: "Pure relaxation",
    desc: "Unlimited sauna access to recover and relax",
    bg: "/sauna.png",
    fallback: "from-[#1a2a0f] to-[#2a3d1a]",
    href: "/facilities",
    linkText: "Find out more",
  },
  {
    title: "Ready to push yourself?",
    desc: "20+ group classes weekly for all levels",
    bg: "/group_class.png",
    fallback: "from-[#0f1a2a] to-[#1a2a3d]",
    href: "/classes",
    linkText: "Explore classes",
  },
];

export default function WhyVFT() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center justify-center mb-12 w-full">
          <span className="text-[#6b7280] text-[11px] font-extrabold uppercase tracking-[0.14em] mb-3 block text-center w-full">
            Why choose VFT?
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4 tracking-tight text-center w-full">
            Get the most from your gym
          </h2>
          <div className="text-[#6b7280] text-base md:text-lg font-medium leading-relaxed px-4 w-full block text-center">
            Everything you need to reach your goals — all under one roof, all in one membership.
          </div>
        </div>

        {/* 3 image cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden block h-102.5 shadow-xs transition-all duration-300"
            >
              {/* Background image */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 ${card.fallback}`}
                style={{ backgroundImage: `url('${card.bg}')` }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent" />

              {/* Text bottom */}
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="px-6 md:px-8 pb-4">
                  <h3 className="text-white font-bold text-[24px] md:text-[26px] tracking-tight mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-[15px] md:text-[16px] font-medium leading-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="w-full border-t border-white/20" />

                <div className="flex items-center justify-between px-6 md:px-8 pt-4 pb-6 md:pb-8">
                  <span className="text-white text-[15px] md:text-[16px] font-bold tracking-wide underline underline-offset-4 decoration-1 group-hover:text-white/90 transition-colors">
                    {card.linkText}
                  </span>
                  <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
