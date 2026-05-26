import Link from "next/link";
import { Clock, User, Tag, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | VFT — Vitality Fitness Tavistock",
  description: "Fitness tips, nutrition advice, member stories and gym news from the VFT team. Your weekly dose of motivation.",
};

const categories = ["All", "Training", "Nutrition", "Wellness", "Member Stories", "News"];

const posts = [
  {
    category: "Training",
    emoji: "💪",
    title: "5 Beginner Mistakes at the Gym (and How to Fix Them)",
    excerpt: "Starting your gym journey? Avoid these common errors that slow progress and increase injury risk. Our trainers share what they see most often on the gym floor.",
    author: "Alex Johnson",
    date: "12 May 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    category: "Nutrition",
    emoji: "🥗",
    title: "What to Eat Before and After a Workout",
    excerpt: "Fuelling your workouts correctly can make a dramatic difference to energy, performance and recovery. Here's the simple guide our PT team gives every new member.",
    author: "Jake Thompson",
    date: "5 May 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    category: "Member Stories",
    emoji: "🏆",
    title: "How Tom Lost 2 Stone in 4 Months at VFT",
    excerpt: "Tom Henderson walked into VFT unsure where to start. Four months later, he's down 2 stone and says it's \"the best investment I've ever made.\" We caught up with him to find out how.",
    author: "VFT Team",
    date: "28 Apr 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    category: "Wellness",
    emoji: "🧘",
    title: "Why Rest Days Are Just as Important as Training Days",
    excerpt: "More gym is not always better. Recovery is where real progress is made. Lisa explains the science of rest and how to structure your week for maximum results.",
    author: "Lisa Kent",
    date: "21 Apr 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    category: "Training",
    emoji: "🔥",
    title: "The VFT Guide to HIIT — Everything You Need to Know",
    excerpt: "High-intensity interval training is one of the most efficient ways to burn fat and improve fitness. But only if you're doing it right. Sarah breaks it all down.",
    author: "Sarah Mitchell",
    date: "14 Apr 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    category: "News",
    emoji: "🎉",
    title: "VFT is Expanding — Here's What's Coming",
    excerpt: "We promised growth and we're delivering. New equipment, extended studio space, and two new group class formats are on the way. Here's the full update from Alex.",
    author: "Alex Johnson",
    date: "7 Apr 2025",
    readTime: "3 min read",
    featured: false,
  },
  {
    category: "Nutrition",
    emoji: "💊",
    title: "The Truth About Protein Supplements",
    excerpt: "Shakes, bars, powders — the supplement market is overwhelming. Do you actually need them? Our sports nutritionist gives you the honest, no-BS answer.",
    author: "Jake Thompson",
    date: "1 Apr 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Wellness",
    emoji: "😴",
    title: "Sleep and Fitness — The Most Underrated Performance Tool",
    excerpt: "You can train perfectly and eat well, but if you're sleeping 5 hours a night you're leaving huge gains on the table. Here's what the research shows.",
    author: "Lisa Kent",
    date: "25 Mar 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    category: "Member Stories",
    emoji: "❤️",
    title: "From Couch to Classes — Emma's VFT Story",
    excerpt: "Emma joined VFT after years of putting her health last. She didn't expect to love it. Now she's attending 5 classes a week and says the community changed her life.",
    author: "VFT Team",
    date: "18 Mar 2025",
    readTime: "5 min read",
    featured: false,
  },
];

const catColors: Record<string, string> = {
  Training:       "bg-[#eff6ff] text-[#3b82f6]",
  Nutrition:      "bg-[#f5f6f8] text-[#374151]",
  Wellness:       "bg-[#faf5ff] text-[#a855f7]",
  "Member Stories": "bg-[#fff7ed] text-[#f97316]",
  News:           "bg-[#fef2f2] text-[#ef4444]",
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container-max px-4">
          <div className="section-tag">VFT Blog</div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mt-3 mb-5">
            Training Tips, Member<br className="hidden sm:block" />
            <span className="gradient-text"> Stories & News</span>
          </h1>
          <p className="text-[#64748b] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Fitness advice, nutrition guides, inspiring member stories and the latest VFT news — all from our team of qualified professionals.
          </p>
        </div>
      </section>

      {/* ── Categories ── */}
      <div className="bg-white border-b border-[#e5e7eb] sticky top-[70px] z-40">
        <div className="container-max px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[0.82rem] font-bold border transition-all ${cat === "All"
                  ? "bg-[#0f172a] text-white border-[#0f172a]"
                  : "bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#374151] hover:text-[#1f2937]"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container-max px-4">

          {/* ── Featured Post ── */}
          {featured && (
            <div className="card p-0 overflow-hidden mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Photo placeholder */}
                <div className="bg-linear-to-br from-[#0f172a] to-[#1f2937] min-h-[260px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(55,65,81,0.25)_0%,transparent_60%)]" />
                  <div className="relative z-10 text-center">
                    <p className="text-[5rem] mb-2">{featured.emoji}</p>
                    <span className="bg-[#1f2937] text-white text-[0.65rem] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                      Featured
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <span className={`inline-block text-[0.68rem] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 w-fit ${catColors[featured.category]}`}>
                    {featured.category}
                  </span>
                  <h2 className="font-black text-[#0f172a] text-[1.4rem] leading-tight mb-3">{featured.title}</h2>
                  <p className="text-[#64748b] text-[0.9rem] leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-[#94a3b8] text-[0.75rem] mb-6">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featured.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    <span>{featured.date}</span>
                  </div>
                  <Link href="/blog" className="btn-primary self-start text-sm">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── Post Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => (
              <div key={post.title} className="card p-6 flex flex-col">
                {/* Emoji thumbnail */}
                <div className="h-28 rounded-xl bg-[#f8fafc] flex items-center justify-center mb-5">
                  <span className="text-[3.5rem]">{post.emoji}</span>
                </div>
                {/* Category */}
                <span className={`inline-block text-[0.65rem] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 w-fit ${catColors[post.category] ?? "bg-[#f1f5f9] text-[#64748b]"}`}>
                  <Tag className="w-2.5 h-2.5 inline mr-1" />{post.category}
                </span>
                <h3 className="font-black text-[#0f172a] text-[0.95rem] leading-snug mb-2 flex-1">{post.title}</h3>
                <p className="text-[#64748b] text-[0.82rem] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-[#94a3b8] text-[0.72rem] mb-4 flex-wrap">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <Link href="/blog"
                  className="flex items-center gap-1 text-[#374151] text-[0.82rem] font-bold no-underline hover:underline">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Load more placeholder */}
          <div className="text-center mt-10">
            <button className="btn-secondary">Load More Articles</button>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="section-padding bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="container-max px-4 max-w-2xl text-center">
          <BookOpen className="w-10 h-10 text-[#374151] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] mb-3">
            Get the VFT Newsletter
          </h2>
          <p className="text-[#64748b] mb-6 text-[15px]">
            New articles, training tips, member stories and VFT news delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border border-[#e2e8f0] rounded-lg px-4 py-3 text-[0.9rem] outline-none focus:border-[#374151] transition-colors"
            />
            <button className="btn-primary shrink-0">Subscribe →</button>
          </div>
          <p className="text-[#94a3b8] text-[0.75rem] mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
