"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  User, MapPin, Phone, Clock, ChevronRight, Mail, MessageSquare,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashProfile {
  full_name: string;
  plan: string;
  points: number;
  referral_code: string | null;
}

interface UpcomingClass {
  name: string;
  class_date: string;
  start_time: string;
  instructor: string;
  class_type: string;
}

const QUOTES = [
  "The gym isn't about being the fittest in the room. It's about showing up for yourself, building confidence, and becoming stronger at your own pace 💪",
  "Every rep, every step, every drop of sweat is an investment in the best version of you 🔥",
  "Your body can do it. It's your mind you need to convince. Show up today 🏋️",
  "Small progress is still progress. Keep moving forward, VFT is with you every step 🌟",
];

// Quick action tile definitions (photo-style, ClubRight layout)
interface ActionTile {
  label: string;
  href: string;
  img: string;
  external?: boolean;
}

const ACTIONS: ActionTile[] = [
  { label: "Make a Booking",     href: "/dashboard/timetable",                    img: "/group_class.png"   },
  { label: "Start a Membership", href: "/dashboard/membership",                   img: "/membership_bg.png" },
  { label: "Online Shop",        href: "https://vft.clubright.co.uk/shop",        img: "/gym_floor.png",    external: true },
  { label: "Contact us",         href: "/#contact",                               img: "/hero_gym_bg.png"   },
  { label: "Wellness Walks",     href: "/wellness-walks",                         img: "/sauna.png"         },
];

function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${ap}`;
}

function fmtDate(d: string): string {
  const dt = new Date(d + "T00:00:00");
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  if (d === today) return "Today";
  if (d === tomorrow) return "Tomorrow";
  return dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export default function DashboardPage() {
  const supabase = useRef(createClient()).current;
  const [profile, setProfile] = useState<DashProfile | null>(null);
  const [nextClass, setNextClass] = useState<UpcomingClass | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [emailVerified, setEmailVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmailVerified(!!user.email_confirmed_at);

      const today = new Date().toISOString().split("T")[0];

      const [{ data: prof }, { data: bkgs }, { data: notifs }] = await Promise.all([
        supabase.from("profiles").select("full_name, plan, points, referral_code").eq("id", user.id).single(),
        supabase
          .from("bookings")
          .select("class_date, status, classes(name, start_time, instructor, class_type)")
          .eq("user_id", user.id)
          .eq("status", "booked")
          .gte("class_date", today)
          .order("class_date")
          .limit(1),
        supabase.from("notifications").select("id", { count: "exact", head: false }).eq("user_id", user.id).eq("read", false),
      ]);

      setProfile({
        full_name: prof?.full_name ?? user.email?.split("@")[0] ?? "Member",
        plan: prof?.plan ?? "essential",
        points: prof?.points ?? 0,
        referral_code: prof?.referral_code ?? null,
      });

      setUnreadCount((notifs ?? []).length);

      if (bkgs?.[0]) {
        const b = bkgs[0];
        const cls = Array.isArray(b.classes) ? b.classes[0] : b.classes;
        if (cls) setNextClass({ name: cls.name, class_date: b.class_date, start_time: cls.start_time, instructor: cls.instructor, class_type: cls.class_type });
      }

      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstName = profile?.full_name?.split(" ")[0] ?? "Member";
  const planLabel = profile ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : "Essential";

  return (
    <div className="max-w-[1000px] mx-auto pb-6">

      {/* ── Welcome Hero ──────────────────────────────────── */}
      <div className="relative bg-[#0f172a] rounded-2xl overflow-hidden mb-5">
        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,204,112,0.18)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(0,204,112,0.1)_0%,transparent_70%)] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 px-6 sm:px-8 py-8 sm:py-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            {/* Greeting */}
            <div>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse" />
                  <div className="h-5 w-48 bg-white/8 rounded-lg animate-pulse" />
                </div>
              ) : (
                <>
                  <h1 className="font-[Outfit,sans-serif] font-black text-[clamp(1.6rem,4vw,2.4rem)] text-white tracking-[-0.03em] mb-2 leading-tight">
                    Hello, {firstName}! 👋
                  </h1>
                  <p className="text-white/50 text-[0.95rem] mb-4">
                    Welcome to Vitality Fitness Tavistock
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-[rgba(0,204,112,0.15)] border border-[rgba(0,204,112,0.3)] text-[#00cc70] text-[0.72rem] font-extrabold rounded-full px-3 py-1 flex items-center gap-1.5 tracking-wide uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00cc70] shadow-[0_0_6px_rgba(0,204,112,0.8)]" />
                      {planLabel} Member
                    </span>
                    <span className="bg-white/8 border border-white/10 text-white/60 text-[0.72rem] font-bold rounded-full px-3 py-1 tracking-wide">
                      {profile?.points ?? 0} pts
                    </span>
                    {unreadCount > 0 && (
                      <Link href="/dashboard/notifications"
                        className="bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#f87171] text-[0.72rem] font-extrabold rounded-full px-3 py-1 no-underline flex items-center gap-1">
                        🔴 {unreadCount} new
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Next class card */}
            {!loading && (
              <div className="bg-white/8 border border-white/12 rounded-2xl px-5 py-4 min-w-[200px]">
                {nextClass ? (
                  <>
                    <p className="text-white/40 text-[0.65rem] font-bold uppercase tracking-widest mb-[0.35rem]">Next Class</p>
                    <p className="text-white font-extrabold text-[0.95rem] mb-0.5">{nextClass.name}</p>
                    <p className="text-white/55 text-[0.8rem]">{fmtDate(nextClass.class_date)} · {fmtTime(nextClass.start_time)}</p>
                    <p className="text-white/40 text-[0.72rem] mt-0.5">{nextClass.instructor}</p>
                  </>
                ) : (
                  <>
                    <p className="text-white/40 text-[0.65rem] font-bold uppercase tracking-widest mb-2">Next Class</p>
                    <p className="text-white/50 text-[0.82rem] mb-2">No upcoming classes</p>
                    <Link href="/dashboard/timetable"
                      className="text-[#00cc70] text-[0.78rem] font-bold no-underline hover:underline">
                      Book one now →
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Email Verification Banner ─────────────────────── */}
      {!loading && !emailVerified && (
        <div className="bg-[#1d4ed8] rounded-xl px-5 py-4 mb-5 flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-extrabold text-[0.9rem] m-0 mb-[0.2rem]">Verify Your Email</p>
            <p className="text-blue-200 text-[0.82rem] m-0">
              To fully activate your account, please click the confirmation link we sent to your email address.
            </p>
          </div>
        </div>
      )}

      {/* ── Motivational Quote Strip ──────────────────────── */}
      <div className="bg-[#00cc70] rounded-xl px-5 py-3 mb-6">
        <p className="text-white font-semibold text-[0.85rem] text-center m-0 leading-relaxed">
          {quote}
        </p>
      </div>

      {/* ── Quick Action Grid (ClubRight photo tiles) ─────── */}
      {/* Top row: 3 tiles */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {ACTIONS.slice(0, 3).map(({ label, href, img, external }) => (
          <Link key={label} href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="relative rounded-2xl overflow-hidden block group no-underline aspect-[4/3]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${img}')` }} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#00cc70] px-4 py-3">
              <p className="text-white font-[Outfit,sans-serif] font-extrabold text-[0.95rem] m-0 text-center">{label}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Bottom row: 2 tiles */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {ACTIONS.slice(3).map(({ label, href, img, external }) => (
          <Link key={label} href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="relative rounded-2xl overflow-hidden block group no-underline aspect-[4/3]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${img}')` }} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#00cc70] px-4 py-3">
              <p className="text-white font-[Outfit,sans-serif] font-extrabold text-[0.95rem] m-0 text-center">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom Row: Club Info + Member Stats ─────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Club Info */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <MessageSquare className="w-4.5 h-4.5 text-[#3b82f6]" />
            </div>
            <h3 className="font-[Outfit,sans-serif] font-extrabold text-[0.9rem] text-[#0f172a] m-0">Club Info</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00cc70] shrink-0" />
              <span className="text-[#374151] text-[0.82rem] font-semibold">Open Now</span>
              <span className="text-[#94a3b8] text-[0.75rem]">· Closes 10pm</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.75 h-3.75 text-[#94a3b8] shrink-0 mt-0.5" />
              <span className="text-[#64748b] text-[0.8rem] leading-snug">Plymouth Road, Tavistock, Devon, PL19</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.75 h-3.75 text-[#94a3b8] shrink-0" />
              <span className="text-[#64748b] text-[0.8rem]">01822 123456</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-3.75 h-3.75 text-[#94a3b8] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#64748b] text-[0.78rem] m-0">Mon–Fri: 6am – 10pm</p>
                <p className="text-[#64748b] text-[0.78rem] m-0">Sat–Sun: 7am – 8pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Profile quick view */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#f0fdf8] flex items-center justify-center">
              <User className="w-4.5 h-4.5 text-[#00a85d]" />
            </div>
            <h3 className="font-[Outfit,sans-serif] font-extrabold text-[0.9rem] text-[#0f172a] m-0">My Profile</h3>
          </div>
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 w-36 bg-[#f1f5f9] rounded animate-pulse" />
              <div className="h-3 w-24 bg-[#f1f5f9] rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="font-extrabold text-[0.95rem] text-[#0f172a] m-0 mb-0.5">{profile?.full_name}</p>
              <span className="bg-[#f0fdf8] text-[#00a85d] border border-[rgba(0,168,93,0.2)] rounded-full px-2 py-0.5 text-[0.7rem] font-extrabold">
                {planLabel} Member
              </span>
              <div className="mt-4 pt-4 border-t border-[#f1f5f9]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#64748b] text-[0.78rem]">Points balance</span>
                  <span className="font-extrabold text-[0.88rem] text-[#a855f7]">{profile?.points ?? 0} pts</span>
                </div>
                <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-[#a855f7] to-[#6366f1] rounded-full"
                    style={{ width: `${Math.min(((profile?.points ?? 0) / 500) * 100, 100)}%` }} />
                </div>
                <p className="text-[#94a3b8] text-[0.7rem] mt-1">{Math.max(500 - (profile?.points ?? 0), 0)} pts to next reward</p>
              </div>
            </>
          )}
          <Link href="/dashboard/profile"
            className="mt-3 flex items-center gap-1 text-[#00a85d] text-[0.78rem] font-bold no-underline hover:underline">
            Edit profile <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent notices / what's on */}
        <div className="bg-[#0f172a] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(0,204,112,0.1)_0%,transparent_70%)] -translate-y-1/3 translate-x-1/3" />
          <div className="relative z-10">
            <p className="text-white/40 text-[0.65rem] font-bold uppercase tracking-widest mb-3">What&apos;s On at VFT</p>
            <div className="space-y-3">
              {[
                { emoji: "🏋️", title: "New: Saturday Boxing", sub: "Emma Clarke · 10am" },
                { emoji: "🧘", title: "Yoga for Beginners", sub: "Sarah Henley · Thu 7pm" },
                { emoji: "🔥", title: "HIIT Challenge Month", sub: "June challenge — join now" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{item.emoji}</span>
                  <div>
                    <p className="text-white font-bold text-[0.82rem] m-0 mb-0.5">{item.title}</p>
                    <p className="text-white/40 text-[0.72rem] m-0">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/timetable"
              className="mt-4 inline-flex items-center gap-1 text-[#00cc70] text-[0.78rem] font-bold no-underline hover:underline">
              See full timetable <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
