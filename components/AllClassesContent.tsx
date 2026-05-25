"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Flame, Dumbbell, Zap, User, Crosshair, Heart, Waves, Target, X, Clock, BarChart2, ArrowRight } from "lucide-react";

type Tag  = { label: string; icon: React.ElementType };
type ClassItem = {
  name: string;
  image: string;
  tags: Tag[];
  description: string;
  duration: string;
  level: string;
};

const FB  = { label: "Full Body",  icon: User      };
const FAT = { label: "Fat Burn",   icon: Flame     };
const STR = { label: "Strength",   icon: Dumbbell  };
const FIT = { label: "Fitness",    icon: Zap       };
const TON = { label: "Tone",       icon: Target    };
const TGT = { label: "Target",     icon: Crosshair };
const WEL = { label: "Wellbeing",  icon: Heart     };
const MOB = { label: "Mobility",   icon: Waves     };

const imgs = [
  "/group_class.png",
  "/gym_floor.png",
  "/insta_1.png",
  "/insta_2.png",
  "/insta_3.png",
  "/insta_4.png",
  "/insta_5.png",
  "/insta_6.png",
  "/sauna.png",
];
const img = (i: number) => imgs[i % imgs.length];

const classes: ClassItem[] = [
  {
    name: "Hyrox Class",
    image: img(0),
    tags: [STR, FIT, FB],
    description: "A competitive fitness event format combining running with functional exercises like sled pushes, burpees and wall balls. Perfect for those who love a real challenge and want to test their limits.",
    duration: "60 min",
    level: "Intermediate",
  },
  {
    name: "HIIT",
    image: img(1),
    tags: [FAT, FB, FIT],
    description: "High Intensity Interval Training that alternates between intense bursts of activity and short rest periods. Maximise calorie burn and improve your cardiovascular fitness in minimal time.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Core",
    image: img(2),
    tags: [STR, TON, TGT],
    description: "A targeted class focused on strengthening your abs, back and stabilising muscles. Build a solid foundation that supports every other exercise you do in the gym.",
    duration: "30 min",
    level: "All Levels",
  },
  {
    name: "Glutes, Legs & Core",
    image: img(3),
    tags: [TGT, FAT, TON],
    description: "Shape and strengthen your lower body and core with squats, lunges, deadlifts and targeted glute exercises. Expect to feel this one for days — in the best way.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Burn",
    image: img(4),
    tags: [FAT, FIT, FB],
    description: "A high-energy calorie-torching class using a mix of cardio and resistance training to keep your heart rate elevated throughout. One of the most effective fat-burning sessions on the timetable.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Strength",
    image: img(5),
    tags: [STR, TON, FB],
    description: "Progressive resistance training focused on building functional strength using barbells, dumbbells and bodyweight exercises. Coached technique cues throughout to keep you safe and progressing.",
    duration: "50 min",
    level: "All Levels",
  },
  {
    name: "Lift",
    image: img(6),
    tags: [STR, TON, FB],
    description: "Learn the fundamentals of barbell lifting movements in a fun, coached class environment. Whether you're a complete beginner or experienced lifter, Lift will help you move better and get stronger.",
    duration: "50 min",
    level: "All Levels",
  },
  {
    name: "Ride",
    image: img(7),
    tags: [TGT, FAT, FIT],
    description: "An indoor cycling class set to pumping music. You control resistance and cadence while your coach guides you through climbs, sprints and recovery intervals for a serious cardio hit.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Cycle",
    image: img(8),
    tags: [TGT, FAT, FIT],
    description: "A high-energy spin class with motivating music and a coach pushing you to your limits. Great for improving cardiovascular fitness and burning calories without impact on your joints.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Mind",
    image: img(0),
    tags: [WEL, MOB, FB],
    description: "A calming, restorative class combining yoga flow, meditation and breathing techniques to support your mental and physical wellbeing. The perfect counterbalance to your intense training sessions.",
    duration: "60 min",
    level: "All Levels",
  },
  {
    name: "Running Club",
    image: img(1),
    tags: [FAT, FIT, WEL],
    description: "A social running session suitable for all paces. Build your aerobic base, improve your running form and meet fellow members who share your passion for moving. All speeds welcome.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Pump",
    image: img(2),
    tags: [STR, TON, FB],
    description: "A barbell class for building strength and toning your muscles. Low weight, high repetition format that is incredibly effective for your whole body — and accessible for complete beginners.",
    duration: "55 min",
    level: "All Levels",
  },
  {
    name: "Step",
    image: img(3),
    tags: [FAT, TON, FIT],
    description: "Classic aerobics step class with choreographed routines on a step platform. Great for coordination, cardiovascular fitness and having a genuinely fun workout session.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Pilates",
    image: img(4),
    tags: [STR, TON, MOB],
    description: "Controlled movements focusing on core stability, posture and flexibility. Pilates is suitable for all fitness levels including beginners and is brilliant for injury prevention and recovery.",
    duration: "50 min",
    level: "All Levels",
  },
  {
    name: "Yoga",
    image: img(5),
    tags: [WEL, MOB, FB],
    description: "A flowing yoga session to improve flexibility, balance and strength. Great for recovery days and overall wellbeing. Our coaches create a welcoming environment no matter your experience level.",
    duration: "60 min",
    level: "All Levels",
  },
  {
    name: "Zumba",
    image: img(6),
    tags: [FAT, TON, FIT],
    description: "A dance fitness class inspired by Latin rhythms. Fun, energetic and perfect for anyone who wants to exercise without it feeling like exercise. No dance experience needed — just bring your energy.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Combat",
    image: img(7),
    tags: [STR, FAT, FIT],
    description: "A martial arts inspired cardio class using punches, kicks and blocks choreographed to high-energy music. High intensity, non-contact and fantastic for fat burning and stress relief.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Box Fit",
    image: img(8),
    tags: [STR, FAT, FIT],
    description: "Boxing-inspired fitness using pads, bags and drills to improve strength, coordination and cardiovascular fitness. Learn proper technique while getting one of the best workouts of your life.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Body Tone",
    image: img(0),
    tags: [FAT, TON, FB],
    description: "A total body workout targeting all major muscle groups using light weights and high repetitions. Designed to give you a lean, toned physique without excessive bulk.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Bootcamp",
    image: img(1),
    tags: [FAT, FIT, FB],
    description: "A military-inspired circuit class combining cardio, strength and agility drills. One of our toughest sessions on the timetable — but you'll leave feeling like you can take on anything.",
    duration: "60 min",
    level: "Intermediate",
  },
  {
    name: "Kettlebells",
    image: img(2),
    tags: [STR, MOB, FB],
    description: "Master the swing, clean, press and snatch with expert coaching. Kettlebell training builds functional strength, improves mobility and burns serious calories — all in one session.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Aerobics",
    image: img(3),
    tags: [FAT, FIT, FB],
    description: "Classic high and low impact aerobics routines that are fun, effective and great for your heart health. A brilliant option if you want a feel-good workout with a social atmosphere.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Absolute Abs",
    image: img(4),
    tags: [STR, TON, TGT],
    description: "Thirty minutes dedicated entirely to sculpting and strengthening your core. Planks, crunches, leg raises and more — this short but intense session will transform your midsection.",
    duration: "30 min",
    level: "All Levels",
  },
  {
    name: "Burn It",
    image: img(5),
    tags: [FAT, FB, FIT],
    description: "An explosive cardio and resistance class designed to push your limits and incinerate calories. If you want to work harder than you ever have before, Burn It is the session for you.",
    duration: "45 min",
    level: "Intermediate",
  },
  {
    name: "Legs, Bums & Tums",
    image: img(6),
    tags: [TGT, FAT, TON],
    description: "The classic lower body toning class targeting your legs, glutes and core. Effective, accessible and great for all abilities. Guaranteed to get results when done consistently.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Circuits",
    image: img(7),
    tags: [STR, FAT, FIT],
    description: "A fast-paced stations-based class rotating through different exercises targeting all muscle groups. No two sessions are the same — expect variety, energy and a whole body workout every time.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Sweat",
    image: img(8),
    tags: [FAT, FIT, FB],
    description: "A fusion of cardio and functional training that will push you harder than you thought possible. The name says it all. Bring a towel, plenty of water and your best effort.",
    duration: "45 min",
    level: "All Levels",
  },
  {
    name: "Get Started",
    image: img(0),
    tags: [STR, TGT, FAT],
    description: "The perfect introduction to group fitness at VFT. Our coaches will guide you through everything you need to know to feel confident, welcome and ready to make classes a regular habit.",
    duration: "45 min",
    level: "Beginner",
  },
];

const levelColour: Record<string, string> = {
  Beginner:     "bg-[#dcfce7] text-[#166534]",
  "All Levels": "bg-[#f0f9ff] text-[#0369a1]",
  Intermediate: "bg-[#fef9c3] text-[#854d0e]",
};

export default function AllClassesContent() {
  const [active, setActive] = useState<ClassItem | null>(null);

  return (
    <>
      {/* ── Header ── */}
      <section className="bg-white pt-32 pb-10 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center justify-center gap-2 text-sm font-semibold text-[#00a85d] mb-10">
            <Link href="/" className="hover:underline transition-colors">Home Page</Link>
            <ChevronRight className="w-4 h-4 text-[#94a3b8]" strokeWidth={2.5} />
            <Link href="/classes" className="hover:underline transition-colors">Classes</Link>
            <ChevronRight className="w-4 h-4 text-[#94a3b8]" strokeWidth={2.5} />
            <span className="text-[#64748b]">All Classes</span>
          </nav>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-black text-[#0f172a] tracking-[-0.03em] leading-[1.1]">
            All Classes
          </h1>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="bg-white pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12">
            {classes.map((cls) => (
              <div key={cls.name} className="flex flex-col items-center text-center">
                <h2 className="text-[0.95rem] font-extrabold text-[#00a85d] mb-3 tracking-[-0.01em] leading-[1.3]">
                  {cls.name}
                </h2>

                <div className="w-full aspect-square overflow-hidden rounded-lg mb-4">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url('${cls.image}')` }}
                  />
                </div>

                <div className="flex items-start justify-center gap-2 sm:gap-4 mb-5">
                  {cls.tags.map((tag) => {
                    const Icon = tag.icon;
                    return (
                      <div key={tag.label} className="flex flex-col items-center gap-1.5">
                        <div className="w-11 h-11 rounded-full border-2 border-[#e2e8f0] bg-white flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#0f172a]" strokeWidth={1.8} />
                        </div>
                        <span className="text-[0.6rem] font-extrabold text-[#64748b] uppercase tracking-[0.08em] leading-[1.2] max-w-[52px]">
                          {tag.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActive(cls)}
                  className="inline-block border-2 border-[#0f172a] text-[#0f172a] rounded-full py-2 px-5 sm:py-2.5 sm:px-9 text-[0.8rem] sm:text-[0.875rem] font-bold transition-all duration-200 hover:bg-[#0f172a] hover:text-white cursor-pointer"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-[0_24px_60px_rgba(0,0,0,0.25)] animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div
              className="w-full h-52 bg-cover bg-center"
              style={{ backgroundImage: `url('${active.image}')` }}
            >
              {/* Gradient overlay on image */}
              <div className="w-full h-full bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_60%)]" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-6">
              {/* Name + level + duration */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-[1.5rem] font-black text-[#0f172a] tracking-[-0.02em] leading-[1.1]">
                  {active.name}
                </h2>
                <span className={`shrink-0 text-[0.65rem] font-extrabold uppercase tracking-[0.06em] px-3 py-1 rounded-full mt-1 ${levelColour[active.level] ?? "bg-[#f1f5f9] text-[#475569]"}`}>
                  {active.level}
                </span>
              </div>

              {/* Duration + level pills */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#64748b]">
                  <Clock className="w-3.5 h-3.5 text-[#00cc70]" />
                  {active.duration}
                </div>
                <div className="flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#64748b]">
                  <BarChart2 className="w-3.5 h-3.5 text-[#00cc70]" />
                  {active.level}
                </div>
              </div>

              {/* Description */}
              <p className="text-[#475569] text-[0.9rem] leading-[1.65] mb-5">
                {active.description}
              </p>

              {/* Tags */}
              <div className="flex items-center gap-3 mb-6">
                {active.tags.map((tag) => {
                  const Icon = tag.icon;
                  return (
                    <div key={tag.label} className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-full px-3 py-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#00cc70]" strokeWidth={2} />
                      <span className="text-[0.65rem] font-extrabold text-[#334155] uppercase tracking-[0.07em]">
                        {tag.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <Link
                href="/contact#book"
                className="flex items-center justify-center gap-2 w-full bg-[#00cc70] hover:bg-[#00a85d] text-white font-bold text-[0.95rem] py-3.5 rounded-xl no-underline transition-colors duration-200"
              >
                Book this class
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
