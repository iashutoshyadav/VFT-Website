import Link from "next/link";
import { MapPin, Clock, Calendar, Heart, Users, Sun, TreePine, Wind, CheckCircle, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Walks | VFT — Vitality Fitness Tavistock",
  description: "Join VFT's community Wellness Walks around Tavistock's stunning countryside. Free with membership. Every week, all welcome.",
};

const benefits = [
  { icon: Heart,    title: "Mental Wellbeing",   desc: "Regular walking in nature reduces stress, anxiety and depression — backed by science, loved by members." },
  { icon: Sun,      title: "Vitamin D & Fresh Air", desc: "Dartmoor sunshine and open air do wonders for mood, energy and immune function." },
  { icon: Users,    title: "Social Connection",  desc: "Meet like-minded VFT members outside the gym. Many of our best friendships started on a Wellness Walk." },
  { icon: TreePine, title: "Dartmoor Scenery",   desc: "Tavistock is the gateway to Dartmoor. Our routes showcase the best of Devon's stunning moorland." },
  { icon: Wind,     title: "Active Recovery",    desc: "Low-intensity movement helps your body recover faster between gym sessions. Walk on rest days." },
  { icon: CheckCircle, title: "Free with Membership", desc: "Wellness Walks are completely free for all VFT members. No booking fee, no extras — just show up." },
];

const schedule = [
  {
    day: "Tuesday",
    time: "7:00am",
    route: "Tavistock to Brentor",
    distance: "4.5 miles",
    difficulty: "Easy",
    diffColor: "#374151",
    duration: "~90 min",
    desc: "A gentle morning walk through the Tavy valley, perfect before work or as an active recovery session.",
  },
  {
    day: "Saturday",
    time: "9:00am",
    route: "Dartmoor: Merrivale Circuit",
    distance: "7 miles",
    difficulty: "Moderate",
    diffColor: "#f59e0b",
    duration: "~2.5 hrs",
    desc: "Our flagship Saturday walk across open moorland. Ancient standing stones, stunning views, great company.",
  },
  {
    day: "Sunday",
    time: "10:00am",
    route: "Tamar Valley Riverside",
    distance: "3 miles",
    difficulty: "Easy",
    diffColor: "#374151",
    duration: "~60 min",
    desc: "A relaxed riverside stroll along the Tamar. Perfect for families, beginners, and post-leg-day recovery.",
  },
];

const faqs = [
  { q: "Do I need to be fit to join?", a: "Absolutely not. Wellness Walks are designed for everyone — all fitness levels, all ages. Routes are clearly graded, so pick what suits you." },
  { q: "What should I wear?", a: "Comfortable walking shoes or trail trainers. Layered clothing and a waterproof jacket recommended for longer moorland routes. Bring water and a snack." },
  { q: "Are dogs welcome?", a: "Yes! Well-behaved dogs on leads are very welcome on all Wellness Walks. Dartmoor is dog paradise." },
  { q: "Can I bring a friend who isn't a VFT member?", a: "Members can bring one guest per walk. We'd love them to join — and maybe they'll love VFT enough to sign up!" },
  { q: "Where do we meet?", a: "All walks depart from the VFT car park, Plymouth Road, Tavistock. Allow 10 minutes to arrive and sign in." },
];

export default function WellnessWalksPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Wellness Walks</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-5">
            Explore Dartmoor<br className="hidden sm:block" />
            <span className="gradient-text"> Together</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Weekly guided walks through Tavistock and the stunning Dartmoor countryside. Free with every VFT membership. Good for the body, great for the mind.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="#schedule" className="btn-primary">View Walk Schedule →</Link>
            <Link href="/member-login" className="btn-secondary">Book via Portal</Link>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { val: "3×", label: "Weekly walks" },
              { val: "Free", label: "Included in membership" },
              { val: "All levels", label: "Welcome" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a]">{s.val}</p>
                <p className="text-[#94a3b8] text-[0.8rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What are Wellness Walks ── */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-tag">What Are They?</div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-5">
                Fitness Meets <span className="gradient-text">Nature</span>
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-5 text-[15px]">
                VFT Wellness Walks are guided community walks held weekly across Tavistock and the surrounding Dartmoor countryside. Led by VFT staff and volunteer members, they're a chance to combine low-intensity exercise with fresh air, great scenery, and genuine social connection.
              </p>
              <p className="text-[#64748b] leading-relaxed mb-8 text-[15px]">
                Unlike high-intensity sessions in the gym, walks are about recovery, mindfulness, and enjoying movement without pressure. They're the perfect complement to your regular training — or a great entry point if you're just starting your fitness journey.
              </p>
              <Link href="#schedule" className="btn-primary">See This Week&apos;s Walks →</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🌿", title: "Dartmoor routes", sub: "Ancient moorland & valleys" },
                { emoji: "🌅", title: "Morning & weekends", sub: "3 walks per week" },
                { emoji: "🐕", title: "Dogs welcome", sub: "On leads please" },
                { emoji: "☕", title: "Café stop option", sub: "On longer Saturday walks" },
              ].map((item) => (
                <div key={item.title} className="card p-5 text-center">
                  <p className="text-[2.5rem] mb-2">{item.emoji}</p>
                  <p className="font-black text-[#0f172a] text-[0.88rem] mb-0.5">{item.title}</p>
                  <p className="text-[#94a3b8] text-[0.75rem]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section id="schedule" className="section-padding bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">Weekly Schedule</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              This Week&apos;s <span className="gradient-text">Walks</span>
            </h2>
            <p className="text-[#64748b] max-w-lg mx-auto text-[15px]">
              Three walks every week — early morning, Saturday adventure, and a relaxed Sunday stroll. All depart from the VFT car park.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {schedule.map((walk) => (
              <div key={walk.day} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-[Outfit,sans-serif] font-black text-[#0f172a] text-[1.1rem]">{walk.day}</p>
                    <p className="text-[#374151] font-bold text-[0.85rem]">{walk.time}</p>
                  </div>
                  <span className="text-white text-[0.65rem] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ background: walk.diffColor }}>
                    {walk.difficulty}
                  </span>
                </div>
                <h3 className="font-black text-[#0f172a] text-[0.95rem] mb-3">{walk.route}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#64748b] text-[0.8rem]">
                    <MapPin className="w-3.5 h-3.5 text-[#374151] shrink-0" />
                    {walk.distance}
                  </div>
                  <div className="flex items-center gap-2 text-[#64748b] text-[0.8rem]">
                    <Clock className="w-3.5 h-3.5 text-[#374151] shrink-0" />
                    {walk.duration}
                  </div>
                </div>
                <p className="text-[#64748b] text-[0.82rem] leading-relaxed mb-5">{walk.desc}</p>
                <Link href="/member-login"
                  className="flex items-center justify-center gap-1 w-full py-2.5 bg-[#f5f6f8] border border-[#e5e7eb] rounded-lg text-[#374151] text-[0.82rem] font-bold no-underline hover:bg-[#1f2937] hover:text-white transition-all">
                  Register <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[#94a3b8] text-[0.8rem] mt-6">
            All walks depart from VFT Car Park, Plymouth Road, Tavistock, PL19 · Free for all members
          </p>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">Why Join</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              Good for <span className="gradient-text">Mind & Body</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card p-6">
                  <div className="w-11 h-11 rounded-xl bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#374151]" />
                  </div>
                  <h3 className="font-black text-[#0f172a] text-[0.92rem] mb-2">{b.title}</h3>
                  <p className="text-[#64748b] text-[0.85rem] leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="container-max px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="section-tag">FAQs</div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] mt-3">
              Wellness Walk <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-black text-[#0f172a] text-[0.92rem] mb-2">{faq.q}</h3>
                <p className="text-[#64748b] text-[0.85rem] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-[#0f172a]">
        <div className="container-max px-4 text-center">
          <TreePine className="w-10 h-10 text-white/70 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Join Us This Weekend
          </h2>
          <p className="text-white/55 max-w-md mx-auto mb-8 text-[15px]">
            Log in to your member portal to register for this week&apos;s Wellness Walk, or just show up at the VFT car park — you&apos;re always welcome.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/member-login" className="btn-primary">Register via Member Portal →</Link>
            <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
