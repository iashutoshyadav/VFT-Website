import Link from "next/link";
import { Heart, Users, Zap, Target, Dumbbell, Sparkles, Flame } from "lucide-react";
import TestimonialsSection from "@/components/TestimonialsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VFT — Vitality Fitness Tavistock",
  description: "Learn about Vitality Fitness Tavistock — our story, our team, and our mission to be the best gym in Devon.",
};

const team = [
  { name: "Alex Johnson",  role: "Founder & Lead PT",          speciality: "Strength & Conditioning", icon: Dumbbell },
  { name: "Sarah M.",      role: "Group Fitness Instructor",    speciality: "HIIT, Boxing, Cardio",     icon: Target },
  { name: "Lisa K.",       role: "Yoga & Pilates Instructor",   speciality: "Mind & Body",              icon: Sparkles },
  { name: "Jake T.",       role: "Personal Trainer",            speciality: "Strength, Fat Loss",       icon: Flame },
];

const values = [
  { icon: Heart,  title: "Community First",  desc: "You're not a number — you're part of the VFT family." },
  { icon: Target, title: "Results Driven",   desc: "Our professionals are obsessed with your progress." },
  { icon: Zap,    title: "Always Improving", desc: "We constantly upgrade — because you deserve the best." },
  { icon: Users,  title: "Everyone Welcome", desc: "First timer or seasoned athlete — VFT is for everyone." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Our Story</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-5">
            Tavistock&apos;s Gym,{" "}
            <span className="gradient-text">Built by Locals</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Vitality Fitness Tavistock was born from a simple belief: that Tavistock deserves a world-class gym.
            Not a chain. A genuine, locally-run fitness centre built by people who live and breathe this community.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-5">
                Powered by <span className="gradient-text">Fitness Professionals</span>
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-5 text-[15px]">
                We opened VFT with one goal: to give Tavistock the fitness facility it truly deserves.
                A fully equipped, 24/7 accessible gym with professional trainers, unlimited sauna,
                group classes, and a bespoke members app — all under one roof.
              </p>
              <p className="text-[#64748b] leading-relaxed mb-8 text-[15px]">
                We&apos;re proud to be expanding already, driven by the incredible support of our local community.
                This is just the beginning.
              </p>
              <Link href="/membership" className="btn-primary">
                Join the Family
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="card p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#f0fdf8] border border-[#00cc70]/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#00a85d]" />
                    </div>
                    <h3 className="text-[#0f172a] font-bold text-sm mb-1">{v.title}</h3>
                    <p className="text-[#94a3b8] text-xs leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">The Team</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              Meet Your <span className="gradient-text">Fitness Professionals</span>
            </h2>
            <p className="text-[#64748b] max-w-xl mx-auto text-[15px]">
              Qualified, passionate, and dedicated to your success. Our team is here to guide, motivate and inspire.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#f0fdf8] border border-[#00cc70]/20 flex items-center justify-center mx-auto mb-4 group-hover:border-[#00cc70]/35 transition-all">
                  <member.icon className="w-7 h-7 text-[#00a85d]" />
                </div>
                <h3 className="text-[#0f172a] font-bold text-base mb-0.5">{member.name}</h3>
                <div className="text-[#00a85d] text-sm font-semibold mb-1.5">{member.role}</div>
                <div className="text-[#94a3b8] text-xs mb-4">{member.speciality}</div>
                <Link
                  href="/contact#book"
                  className="inline-block text-xs px-4 py-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f0fdf8] hover:text-[#00a85d] hover:border-[#00cc70]/30 transition-all"
                >
                  Book Session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </>
  );
}
