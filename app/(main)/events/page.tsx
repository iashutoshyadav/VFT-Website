import Link from "next/link";
import { Calendar, MapPin, Clock, Users, Trophy, ChevronRight, Star, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Challenges | VFT — Vitality Fitness Tavistock",
  description: "Join fitness challenges, workshops, and community events at Vitality Fitness Tavistock. Open to all members — fun, rewarding, and motivating.",
};

const upcomingEvents = [
  {
    emoji: "🔥",
    category: "Challenge",
    title: "June HIIT Challenge",
    date: "1–30 June 2025",
    time: "All day",
    location: "VFT Gym Floor",
    desc: "30 days of HIIT. Complete every class in June and earn the exclusive HIIT Champion badge + 500 loyalty points. Open to all fitness levels.",
    spots: 24,
    spotsLeft: 8,
    tag: "Popular",
    tagColor: "#ef4444",
  },
  {
    emoji: "🏋️",
    category: "Workshop",
    title: "Strength Foundations Workshop",
    date: "14 June 2025",
    time: "10:00am – 12:00pm",
    location: "VFT Weights Zone",
    desc: "A 2-hour hands-on workshop covering the fundamentals of barbell training — squat, bench, deadlift. Ideal for beginners and those looking to refine technique.",
    spots: 12,
    spotsLeft: 5,
    tag: "New",
    tagColor: "#6366f1",
  },
  {
    emoji: "🧘",
    category: "Workshop",
    title: "Yoga & Recovery Day",
    date: "21 June 2025",
    time: "9:00am – 11:00am",
    location: "VFT Studio",
    desc: "A restorative morning combining yin yoga, breath work, and mobility work. The perfect complement to your weekly training schedule.",
    spots: 16,
    spotsLeft: 11,
    tag: null,
    tagColor: null,
  },
  {
    emoji: "🥊",
    category: "Challenge",
    title: "Boxing for Beginners — 4-Week Course",
    date: "7 July 2025",
    time: "6:00pm – 7:00pm",
    location: "VFT Studio",
    desc: "Never boxed before? Perfect. This 4-week beginner course covers stance, footwork, combinations, and conditioning. Run by Coach Sarah Mitchell.",
    spots: 10,
    spotsLeft: 6,
    tag: "Filling Fast",
    tagColor: "#f59e0b",
  },
  {
    emoji: "🏃",
    category: "Community",
    title: "VFT Summer 5K Fun Run",
    date: "28 June 2025",
    time: "8:00am",
    location: "Tavistock Town Centre",
    desc: "Lace up and join fellow VFT members for a social 5K run through Tavistock. All paces welcome — this is about community, not competition.",
    spots: 50,
    spotsLeft: 22,
    tag: "Free Entry",
    tagColor: "#374151",
  },
  {
    emoji: "🍎",
    category: "Workshop",
    title: "Nutrition for Performance",
    date: "19 July 2025",
    time: "11:00am – 1:00pm",
    location: "VFT Reception Area",
    desc: "A nutrition masterclass covering macros, meal timing, supplementation, and practical meal prep tips. Delivered by a registered sports nutritionist.",
    spots: 20,
    spotsLeft: 14,
    tag: null,
    tagColor: null,
  },
];

const pastHighlights = [
  { emoji: "🏆", title: "March Muscle Challenge", participants: 38, winner: "Tom H." },
  { emoji: "❄️",  title: "January New Year Kickstart", participants: 55, winner: "Community Win" },
  { emoji: "🎃",  title: "Halloween HIIT Circuit", participants: 42, winner: "Everyone!" },
];

export default function EventsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Events & Challenges</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-5">
            Train Together,<br className="hidden sm:block" />
            <span className="gradient-text"> Achieve More</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            From 30-day challenges to technique workshops and community runs — VFT events keep you motivated, connected, and progressing.
          </p>
          <Link href="/member-login" className="btn-primary">
            Browse Events in Portal →
          </Link>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="bg-[#0f172a] py-8">
        <div className="container-max px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "12+", label: "Events per year" },
              { val: "300+", label: "Participants" },
              { val: "Free", label: "Included in membership" },
              { val: "🏆", label: "Prizes & badges" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-[Outfit,sans-serif] font-black text-[1.8rem] text-white leading-none mb-1">{s.val}</p>
                <p className="text-white/45 text-[0.8rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upcoming Events ── */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="section-tag">What&apos;s Coming Up</div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3">
                Upcoming <span className="gradient-text">Events</span>
              </h2>
            </div>
            <Link href="/member-login" className="btn-secondary text-sm">
              RSVP via Member Portal
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((ev) => {
              const pct = Math.round(((ev.spots - ev.spotsLeft) / ev.spots) * 100);
              return (
                <div key={ev.title} className="card p-6 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] leading-none">{ev.emoji}</span>
                      <div>
                        <span className="text-[#94a3b8] text-[0.68rem] font-bold uppercase tracking-widest">{ev.category}</span>
                        <h3 className="font-black text-[#0f172a] text-[0.92rem] leading-snug">{ev.title}</h3>
                      </div>
                    </div>
                    {ev.tag && (
                      <span className="text-white text-[0.62rem] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0"
                        style={{ background: ev.tagColor ?? "#374151" }}>
                        {ev.tag}
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[#64748b] text-[0.8rem]">
                      <Calendar className="w-3.5 h-3.5 text-[#374151] shrink-0" />
                      {ev.date}
                    </div>
                    <div className="flex items-center gap-2 text-[#64748b] text-[0.8rem]">
                      <Clock className="w-3.5 h-3.5 text-[#374151] shrink-0" />
                      {ev.time}
                    </div>
                    <div className="flex items-center gap-2 text-[#64748b] text-[0.8rem]">
                      <MapPin className="w-3.5 h-3.5 text-[#374151] shrink-0" />
                      {ev.location}
                    </div>
                  </div>

                  <p className="text-[#64748b] text-[0.82rem] leading-relaxed mb-5 flex-1">{ev.desc}</p>

                  {/* Capacity bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#94a3b8] text-[0.72rem] flex items-center gap-1">
                        <Users className="w-3 h-3" /> {ev.spots - ev.spotsLeft}/{ev.spots} joined
                      </span>
                      <span className={`text-[0.72rem] font-bold ${ev.spotsLeft <= 5 ? "text-[#ef4444]" : "text-[#374151]"}`}>
                        {ev.spotsLeft} spots left
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${ev.spotsLeft <= 5 ? "bg-[#ef4444]" : "bg-[#374151]"}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <Link href="/member-login"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#f5f6f8] border border-[#e5e7eb] rounded-lg text-[#374151] text-[0.85rem] font-bold no-underline hover:bg-[#1f2937] hover:text-white transition-all">
                    Register Interest <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Past Highlights ── */}
      <section className="section-padding bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container-max px-4">
          <div className="text-center mb-10">
            <div className="section-tag">Hall of Fame</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3">
              Past <span className="gradient-text">Challenges</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {pastHighlights.map((h) => (
              <div key={h.title} className="card p-6 text-center">
                <p className="text-[3rem] mb-3">{h.emoji}</p>
                <h3 className="font-black text-[#0f172a] text-[0.9rem] mb-2">{h.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#374151]" />
                  <span className="text-[#64748b] text-[0.8rem]">{h.participants} participants</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[#94a3b8] text-[0.75rem]">{h.winner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-padding bg-white">
        <div className="container-max px-4 max-w-3xl text-center">
          <div className="section-tag">How It Works</div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] mt-3 mb-10">
            Joining an Event is <span className="gradient-text">Simple</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", icon: "🔑", title: "Log in to your portal", desc: "All events are managed inside your VFT member portal — book, track progress, and earn badges." },
              { step: "2", icon: "📋", title: "Register for the event", desc: "Browse upcoming events, read the details, and register in one tap. You'll get a confirmation notification." },
              { step: "3", icon: "🏆", title: "Participate & earn rewards", desc: "Complete the challenge, earn loyalty points, and unlock exclusive member badges." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#0f172a] text-white font-[Outfit,sans-serif] font-black text-xl flex items-center justify-center mb-3">{s.step}</div>
                <p className="text-2xl mb-2">{s.icon}</p>
                <h3 className="font-black text-[#0f172a] text-[0.9rem] mb-1">{s.title}</h3>
                <p className="text-[#64748b] text-[0.82rem] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/member-login" className="btn-primary">Access Events in Portal →</Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="section-padding bg-[#0f172a]">
        <div className="container-max px-4 text-center">
          <Zap className="w-10 h-10 text-white/70 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Never Miss an Event
          </h2>
          <p className="text-white/55 max-w-md mx-auto text-[15px] mb-6">
            Events, challenges and workshops are announced inside the member portal and via our newsletter.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/member-login" className="btn-primary">Go to Member Portal →</Link>
            <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
