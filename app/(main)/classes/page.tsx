import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes | VFT — Vitality Fitness Tavistock",
  description: "Browse 20+ weekly classes at VFT Tavistock — HIIT, Yoga, Strength, Boxing and more. Included in Premium & Elite membership.",
};

const categories = [
  {
    name: "Fitness Classes",
    description:
      "We've grouped our classes into different categories to help you choose which class to try first. Or you can view a full list below.",
    image: "/group_class.png",
    bg: "#ffffff",
    dark: false,
    imageLeft: false,
    isIntro: true,
  },
  {
    name: "HIIT",
    description:
      "Push your limits and torch calories. These classes are for anyone who loves high energy, fast results.",
    image: "/insta_3.png",
    bg: "#00cc70",
    dark: true,
    imageLeft: true,
    isIntro: false,
  },
  {
    name: "Strength & Conditioning",
    description:
      "Change the shape of your body by building muscle and strengthening your key movement patterns.",
    image: "/gym_floor.png",
    bg: "#0f172a",
    dark: true,
    imageLeft: false,
    isIntro: false,
  },
  {
    name: "Yoga & Mindfulness",
    description:
      "All-rounder classes for wellbeing, core strength, flexibility and low impact conditioning.",
    image: "/insta_2.png",
    bg: "#0d9488",
    dark: true,
    imageLeft: true,
    isIntro: false,
  },
  {
    name: "Boxing & Cardio",
    description:
      "Feel stronger and fitter with high-energy boxing drills, pads and cardio combinations.",
    image: "/insta_5.png",
    bg: "#1c1917",
    dark: true,
    imageLeft: false,
    isIntro: false,
  },
  {
    name: "All Classes",
    description: "Want to view our complete list of weekly classes?",
    image: "/insta_6.png",
    bg: "#f8f8f6",
    dark: false,
    imageLeft: true,
    isIntro: false,
  },
];

export default function ClassesPage() {
  return (
    <>
      {/* ── Hero / Intro Header ── */}
      <section className="bg-white pt-32 pb-14 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm font-semibold text-[#00a85d] mb-10">
            <Link href="/" className="hover:underline">Home Page</Link>
            <ChevronRight className="w-4 h-4 text-[#94a3b8]" strokeWidth={2.5} />
            <span className="text-[#64748b]">Classes</span>
          </nav>

          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-[1.1] mb-5">
            Be part of VFT&apos;s fitness<br className="hidden sm:block" /> class community
          </h1>

          <p className="text-[1.05rem] font-bold text-[#0f172a] mb-4 leading-[1.5]">
            Choose from a wide range of classes to suit every ability and every goal.
          </p>

          <p className="text-[#64748b] text-[0.95rem] leading-[1.7] max-w-2xl mx-auto mb-4">
            Whether you want to lose weight, tone up, improve strength, or just have fun with others,
            there&apos;s something for everyone. Our coaches will empower you to reach your goals in a fun
            and supportive community.
          </p>

          <p className="text-[#64748b] text-[0.95rem]">
            See the class timetable and book your spot with the{" "}
            <Link href="/contact#book" className="text-[#00a85d] underline underline-offset-2 hover:text-[#00cc70] transition-colors">
              VFT Members App
            </Link>
            !
          </p>
        </div>
      </section>

      {/* ── Category Sections ── */}
      {categories.map((cat) => {
        const textColor = cat.dark ? "text-white" : "text-[#0f172a]";
        const mutedColor = cat.dark ? "text-white/75" : "text-[#64748b]";
        const btnBorder = cat.dark ? "border-white text-white hover:bg-white hover:text-[#0f172a]" : "border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white";

        const ImagePanel = (
          <div
            className="w-full md:w-1/2 min-h-72 md:min-h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${cat.image}')` }}
          />
        );

        const TextPanel = (
          <div
            className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20"
            style={{ backgroundColor: cat.bg }}
          >
            <h2 className={`text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.03em] leading-[1.1] mb-5 ${textColor}`}>
              {cat.name}
            </h2>
            <p className={`text-[1rem] leading-[1.65] max-w-sm mb-8 ${mutedColor}`}>
              {cat.description}
            </p>
            <Link
              href={cat.isIntro || cat.name === "All Classes" ? "/classes/all" : "/contact#book"}
              className={`inline-block border-2 rounded-full py-3 px-9 text-[0.95rem] font-bold no-underline transition-all duration-200 ${btnBorder}`}
            >
              {cat.isIntro || cat.name === "All Classes" ? "View All" : "Book Now"}
            </Link>
          </div>
        );

        return (
          <section
            key={cat.name}
            className="flex flex-col md:flex-row min-h-96 md:min-h-[500px]"
          >
            {cat.imageLeft ? ImagePanel : TextPanel}
            {cat.imageLeft ? TextPanel : ImagePanel}
          </section>
        );
      })}
    </>
  );
}
