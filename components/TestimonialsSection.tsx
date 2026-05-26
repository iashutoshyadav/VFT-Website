import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Thompson", role: "Member since 2024", initials: "ST", rating: 5, text: "VFT has completely transformed my fitness journey. The 24/7 access means I can train before work, and the sauna after a tough session is absolute heaven. Best decision I've ever made!" },
  { name: "James Mitchell", role: "Premium Member", initials: "JM", rating: 5, text: "I've been to PureGym before and honestly VFT is on a completely different level. The equipment is top-notch, classes are brilliant, and the trainers actually know you by name." },
  { name: "Emma Clarke", role: "Elite Member", initials: "EC", rating: 5, text: "The sauna alone is worth the membership. I've tried every gym in Devon and nothing comes close to VFT. The community feel is incredible — everyone is so welcoming." },
  { name: "Mike Roberts", role: "Member since 2024", initials: "MR", rating: 5, text: "Joined for the gym, stayed for the community. The classes are fantastic and the personal training sessions have helped me achieve goals I never thought possible." },
  { name: "Lucy Pearce", role: "Yoga Enthusiast", initials: "LP", rating: 5, text: "The Power Yoga classes here are the best I've attended anywhere. Amazing instructor, great studio, and the fact it's included in my membership is incredible value." },
  { name: "Tom Henderson", role: "Elite Member", initials: "TH", rating: 5, text: "PT sessions with Jake have been game-changing. Lost 2 stone in 4 months and feel better than I have in years. VFT is genuinely the best investment I've made in myself." },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#f5f6f8]">
      <div className="container-max px-6">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="eyebrow">Member reviews</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] mb-4">
            Don&apos;t just take our word for it
          </h2>
          <div className="inline-flex items-center gap-3 bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 shadow-sm mt-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-[#111827] font-black">5.0</span>
            <span className="text-[#9ca3af] text-sm">· 87 Google Reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-white rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 ${i === 1
                ? "border-2 border-[#374151] shadow-[0_4px_20px_rgba(31,41,55,0.10)]"
                : "border border-[#e5e7eb] hover:border-[#d1d5db] hover:shadow-[0_4px_20px_rgba(17,24,39,0.07)]"
                }`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[#374151] text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#f3f4f6]">
                <div className="w-9 h-9 rounded-full bg-[#f5f6f8] border border-[#d1d5db] flex items-center justify-center text-[11px] font-black text-[#374151] shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[#111827] font-bold text-sm">{t.name}</div>
                  <div className="text-[#9ca3af] text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href="https://g.page/r/vft-tavistock/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            Leave a Google review
          </a>
        </div>
      </div>
    </section>
  );
}
