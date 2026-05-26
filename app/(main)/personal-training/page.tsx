import Link from "next/link";
import { CheckCircle, Star, Clock, Target, TrendingUp, Users, Dumbbell, Zap, Flame, Sparkles, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Training | VFT — Vitality Fitness Tavistock",
  description: "Work 1-to-1 with a qualified VFT personal trainer. Tailored programmes, faster results, expert support. Book your first session today.",
};

const trainers = [
  {
    name: "Alex Johnson",
    role: "Founder & Lead PT",
    speciality: "Strength & Conditioning",
    exp: "12 years",
    quals: ["Level 4 S&C", "Sports Nutrition", "Kettlebell Instructor"],
    icon: Dumbbell,
    bio: "Alex founded VFT with one goal — give Tavistock a world-class fitness facility. Specialising in strength & conditioning, he has helped hundreds of clients build real, lasting results.",
  },
  {
    name: "Jake Thompson",
    role: "Personal Trainer",
    speciality: "Fat Loss & Muscle Building",
    exp: "8 years",
    quals: ["Level 3 PT", "Sports Massage", "Nutrition Coach"],
    icon: Flame,
    bio: "Jake is renowned for body transformation results. His no-nonsense, science-backed approach has helped clients lose 2–4 stone and completely reshape their physiques.",
  },
  {
    name: "Sarah Mitchell",
    role: "Group Fitness & PT",
    speciality: "HIIT, Boxing & Cardio",
    exp: "6 years",
    quals: ["Level 3 PT", "Boxing Instructor", "Pre/Post Natal"],
    icon: Zap,
    bio: "Sarah brings energy like no other. Whether you're looking to improve fitness, lose weight or train for a challenge, she'll push you to levels you never thought possible.",
  },
  {
    name: "Lisa Kent",
    role: "Yoga & Wellness PT",
    speciality: "Mind, Body & Mobility",
    exp: "9 years",
    quals: ["200hr YTT", "Level 3 PT", "Mindfulness Coach"],
    icon: Sparkles,
    bio: "Lisa helps clients build a balanced relationship with fitness. Her approach combines strength, mobility and mindfulness — perfect for stress relief and sustainable wellness.",
  },
];

const packages = [
  {
    sessions: 1,
    label: "Taster",
    price: "£50",
    desc: "Perfect for your first PT experience. Includes full fitness assessment and bespoke programme.",
    features: ["60-minute session", "Fitness assessment", "Goal-setting consultation", "Personalised programme"],
    popular: false,
  },
  {
    sessions: 5,
    label: "Kickstart",
    price: "£220",
    desc: "Five sessions to build momentum, perfect your form, and establish lasting habits.",
    features: ["5 × 60-minute sessions", "Progress tracking", "Nutrition guidance", "WhatsApp check-ins", "Programme updates"],
    popular: true,
  },
  {
    sessions: 10,
    label: "Transformation",
    price: "£400",
    desc: "The full experience. Ten sessions with full lifestyle coaching for maximum results.",
    features: ["10 × 60-minute sessions", "Body composition scans", "Full nutrition plan", "Daily check-ins", "Priority booking", "Free guest pass"],
    popular: false,
  },
];

const benefits = [
  { icon: Target,     title: "Goal-Specific Training",   desc: "Every session is built around your exact goal — weight loss, muscle gain, injury rehab, or athletic performance." },
  { icon: TrendingUp, title: "Faster, Measurable Results", desc: "PT clients see results up to 3× faster than gym-only members. Accountability + expertise = progress." },
  { icon: CheckCircle, title: "Correct Technique",        desc: "Learn proper form from day one. Reduce injury risk and get more from every rep, every session." },
  { icon: Clock,       title: "Efficient Workouts",       desc: "No wasted time. Every minute of your session is planned to maximise your output and return on investment." },
  { icon: Users,       title: "Ongoing Support",          desc: "WhatsApp check-ins, nutrition tips, and programme adjustments keep you on track between sessions." },
  { icon: Dumbbell,   title: "Priority Gym Access",       desc: "PT sessions are booked ahead and conducted in our dedicated training zone — never wait for equipment." },
];

const faqs = [
  { q: "Do I need to be a VFT member to book PT?", a: "Yes — PT sessions are available exclusively to VFT members. You can join from £29.99/mo and add PT on top." },
  { q: "Where do sessions take place?", a: "All PT sessions take place in the VFT gym, Plymouth Road, Tavistock. We have a dedicated training zone with full equipment." },
  { q: "What happens in the first session?", a: "Your first session is a full assessment — we discuss your goals, current fitness level, any injuries, and build your personalised programme together." },
  { q: "Can I change my trainer?", a: "Of course. We want you to love your PT experience. If you'd prefer to switch trainers, just let us know at the front desk." },
  { q: "Do sessions expire?", a: "Session packs are valid for 3 months from purchase. We recommend booking weekly for best results." },
];

export default function PersonalTrainingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">Personal Training</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-5">
            Train Smarter With Your<br className="hidden sm:block" />
            <span className="gradient-text"> Own PT</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            One-to-one coaching from qualified professionals. Personalised programmes, expert guidance, and the accountability to finally hit your goals.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/member-login" className="btn-primary">Book a PT Session →</Link>
            <Link href="#trainers" className="btn-secondary">Meet the Trainers</Link>
          </div>
          {/* Social proof */}
          <div className="inline-flex items-center gap-3 bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 shadow-sm mt-8">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-[#111827] font-black">5.0</span>
            <span className="text-[#9ca3af] text-sm">· 50+ PT clients transformed</span>
          </div>
        </div>
      </section>

      {/* ── Why PT ── */}
      <section className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">Why Personal Training</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              The <span className="gradient-text">Fastest Route</span> to Real Results
            </h2>
            <p className="text-[#64748b] max-w-xl mx-auto text-[15px]">
              Stop guessing. Start progressing. A personal trainer gives you the plan, the push, and the expertise to transform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card p-6">
                  <div className="w-11 h-11 rounded-xl bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#374151]" />
                  </div>
                  <h3 className="font-black text-[#0f172a] text-[0.95rem] mb-2">{b.title}</h3>
                  <p className="text-[#64748b] text-[0.85rem] leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" className="section-padding bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">Pricing</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              PT <span className="gradient-text">Packages</span>
            </h2>
            <p className="text-[#64748b] max-w-md mx-auto text-[15px]">
              Choose the package that fits your goals and budget. All sessions are 60 minutes with a qualified VFT trainer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div key={pkg.sessions} className={`rounded-2xl p-7 relative ${pkg.popular
                ? "bg-[#0f172a] border-2 border-[#374151] shadow-[0_8px_40px_rgba(55,65,81,0.2)]"
                : "bg-white border-2 border-[#e2e8f0]"
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#374151] text-white text-[0.65rem] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <p className={`text-[0.72rem] font-extrabold uppercase tracking-widest mb-2 ${pkg.popular ? "text-white/70" : "text-[#64748b]"}`}>
                  {pkg.sessions} Session{pkg.sessions > 1 ? "s" : ""} — {pkg.label}
                </p>
                <p className={`font-[Outfit,sans-serif] font-black text-[2.5rem] tracking-tight mb-1 ${pkg.popular ? "text-white" : "text-[#0f172a]"}`}>
                  {pkg.price}
                </p>
                <p className={`text-[0.82rem] mb-6 leading-relaxed ${pkg.popular ? "text-white/60" : "text-[#64748b]"}`}>
                  {pkg.desc}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 shrink-0 ${pkg.popular ? "text-white/70" : "text-[#374151]"}`} />
                      <span className={`text-[0.83rem] ${pkg.popular ? "text-white/80" : "text-[#475569]"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/member-login"
                  className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-lg font-[Outfit,sans-serif] font-bold text-[0.9rem] transition-all no-underline ${pkg.popular
                    ? "bg-[#374151] text-white hover:bg-[#4b5563]"
                    : "bg-[#0f172a] text-white hover:bg-[#1e293b]"
                  }`}>
                  Book Now <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[#94a3b8] text-[0.8rem] mt-6">
            All packages require an active VFT membership · Sessions valid 3 months from purchase
          </p>
        </div>
      </section>

      {/* ── Meet the Trainers ── */}
      <section id="trainers" className="section-padding bg-white">
        <div className="container-max px-4">
          <div className="text-center mb-12">
            <div className="section-tag">Your Trainers</div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f172a] mt-3 mb-4">
              Meet Your <span className="gradient-text">Fitness Professionals</span>
            </h2>
            <p className="text-[#64748b] max-w-xl mx-auto text-[15px]">
              Fully qualified, passionate, and dedicated to your success. Each trainer has a unique specialism — find your perfect match.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trainers.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="card p-6 flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#374151]" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-[#0f172a] text-[0.95rem]">{t.name}</h3>
                  </div>
                  <p className="text-[#374151] text-[0.78rem] font-bold mb-0.5">{t.role}</p>
                  <p className="text-[#94a3b8] text-[0.72rem] mb-3">{t.speciality} · {t.exp} exp.</p>
                  <p className="text-[#64748b] text-[0.8rem] leading-relaxed mb-4 flex-1">{t.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.quals.map((q) => (
                      <span key={q} className="bg-[#f5f6f8] border border-[#e5e7eb] text-[#374151] text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                        {q}
                      </span>
                    ))}
                  </div>
                  <Link href="/member-login"
                    className="flex items-center justify-center gap-1 w-full text-[0.82rem] font-bold px-4 py-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f5f6f8] hover:text-[#374151] hover:border-[#d1d5db] transition-all no-underline">
                    Book with {t.name.split(" ")[0]}
                  </Link>
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
              Personal Training <span className="gradient-text">Questions</span>
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
          <p className="eyebrow-dark mb-3">Ready to Start?</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Book Your First PT Session Today
          </h2>
          <p className="text-white/55 max-w-md mx-auto mb-8 text-[15px]">
            Log in to your member portal to book directly with a trainer, or contact us to find out more.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/member-login" className="btn-primary">Book via Member Portal →</Link>
            <Link href="/contact" className="btn-ghost-white">Contact the Team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
