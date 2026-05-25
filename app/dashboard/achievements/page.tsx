"use client";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

type BadgeKey =
  | "first_class" | "streak_5" | "streak_10" | "streak_30"
  | "classes_10"  | "classes_50" | "classes_100"
  | "referral_1"  | "referral_5" | "top_performer";

interface BadgeDef {
  key: BadgeKey;
  icon: string;
  label: string;
  desc: string;
  pts: number;
}

const ALL_BADGES: BadgeDef[] = [
  { key: "first_class",   icon: "💪", label: "First Class",    desc: "Attended your first class",        pts: 50   },
  { key: "streak_5",      icon: "🔥", label: "5-Day Streak",   desc: "5 consecutive days active",        pts: 100  },
  { key: "classes_10",    icon: "⚡", label: "10 Classes",     desc: "Booked 10 classes total",          pts: 150  },
  { key: "streak_10",     icon: "🏃", label: "10-Day Streak",  desc: "10 consecutive days active",       pts: 200  },
  { key: "classes_50",    icon: "🌟", label: "50 Classes",     desc: "Booked 50 classes total",          pts: 500  },
  { key: "referral_1",    icon: "🤝", label: "First Referral", desc: "Referred your first friend",       pts: 300  },
  { key: "streak_30",     icon: "📅", label: "30-Day Streak",  desc: "30 consecutive days active",       pts: 1000 },
  { key: "classes_100",   icon: "🏆", label: "100 Classes",    desc: "Booked 100 classes total",         pts: 1000 },
  { key: "referral_5",    icon: "👥", label: "Social Star",    desc: "Referred 5 friends",               pts: 750  },
  { key: "top_performer", icon: "👑", label: "Top Performer",  desc: "Highest attendance in a month",    pts: 500  },
];

const REWARDS = [
  { icon: "🎟️", label: "Guest Pass",  pts: 500,  desc: "Bring a friend for free"        },
  { icon: "🏋️", label: "PT Session",  pts: 1000, desc: "1-to-1 with a personal trainer" },
  { icon: "🆓", label: "Free Month",  pts: 2000, desc: "One free month membership"       },
];

const EARN_ACTIVITIES = [
  { icon: "🏋️", label: "Attend a class",            pts: 20,  note: "per class"        },
  { icon: "📅", label: "Book 7 days in advance",    pts: 10,  note: "per booking"      },
  { icon: "🤝", label: "Refer a friend",             pts: 500, note: "per referral"     },
  { icon: "⭐", label: "Leave a class review",       pts: 15,  note: "per review"       },
  { icon: "🔥", label: "Maintain a 7-day streak",   pts: 150, note: "per streak"       },
  { icon: "📝", label: "Complete your profile",      pts: 25,  note: "one-time"         },
];

export default function AchievementsPage() {
  const supabase = useRef(createClient()).current;
  const [earnedKeys, setEarnedKeys] = useState<Set<string>>(new Set());
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: achievements }, { data: profile }] = await Promise.all([
        supabase.from("achievements").select("badge").eq("user_id", user.id),
        supabase.from("profiles").select("points").eq("id", user.id).single(),
      ]);

      setEarnedKeys(new Set((achievements ?? []).map((a) => a.badge)));
      setPoints(profile?.points ?? 0);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const earnedCount = earnedKeys.size;
  const nextReward = REWARDS.find((r) => points < r.pts);
  const ptsToNext = nextReward ? nextReward.pts - points : 0;
  const progressPct = nextReward
    ? Math.round((points / nextReward.pts) * 100)
    : 100;

  if (loading) {
    return (
      <div className="max-w-225 mx-auto">
        <div className="h-8 w-44 bg-[#e5e7eb] rounded-lg animate-pulse mb-6" />
        <div className="bg-[#111827] rounded-[20px] h-36 animate-pulse mb-5" />
        <div className="bg-white border border-[#e5e7eb] rounded-2xl h-32 animate-pulse mb-5" />
      </div>
    );
  }

  return (
    <div className="max-w-225 mx-auto">
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">Achievements</h1>
        <p className="text-[#64748b] text-[0.9rem]">Earn points, unlock badges and claim rewards.</p>
      </div>

      {/* Points banner */}
      <div className="bg-linear-to-br from-[#111827] to-[#1f2937] rounded-[20px] px-7 py-6 mb-5 relative overflow-hidden">
        <div className="absolute -top-5 -right-5 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)]" />
        <div className="flex flex-wrap gap-6 items-center justify-between">
          <div>
            <p className="text-white/45 text-[0.7rem] font-bold uppercase tracking-widest mb-1">Your Points Balance</p>
            <p className="font-[Outfit,sans-serif] font-black text-[2.5rem] text-white tracking-[-0.04em] mb-[0.35rem]">
              {points.toLocaleString()} <span className="text-base text-[#a855f7] font-extrabold">pts</span>
            </p>
            {nextReward ? (
              <>
                <p className="text-white/45 text-[0.8rem] mb-[0.65rem]">
                  {ptsToNext} pts until {nextReward.label} reward
                </p>
                <div className="w-50 h-1.75 bg-white/10 rounded-full">
                  <div className="h-full rounded-full bg-linear-to-r from-[#a855f7] to-[#6366f1]"
                    style={{ width: `${progressPct}%` }} />
                </div>
              </>
            ) : (
              <p className="text-[#00cc70] text-[0.8rem] font-bold">All rewards unlocked! 🎉</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="bg-white/6 border border-white/8 rounded-xl px-[1.1rem] py-[0.85rem] text-center">
              <p className="font-[Outfit,sans-serif] font-black text-[1.4rem] text-white m-0">{ALL_BADGES.length}</p>
              <p className="text-white/40 text-[0.7rem] m-0">Badges</p>
            </div>
            <div className="bg-white/6 border border-white/8 rounded-xl px-[1.1rem] py-[0.85rem] text-center">
              <p className="font-[Outfit,sans-serif] font-black text-[1.4rem] text-white m-0">{earnedCount}</p>
              <p className="text-white/40 text-[0.7rem] m-0">Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 mb-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-4">Redeem Rewards</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {REWARDS.map((r) => {
            const locked = points < r.pts;
            return (
              <div key={r.label} className={clsx(
                "rounded-xl p-4",
                locked ? "bg-[#f8fafc] border border-[#e5e7eb] opacity-70"
                       : "bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)]"
              )}>
                <p className="text-[1.75rem] mb-[0.4rem]">{r.icon}</p>
                <p className="font-extrabold text-[0.92rem] text-[#0f172a] mb-[0.1rem]">{r.label}</p>
                <p className="text-[#64748b] text-[0.78rem] mb-3">{r.desc}</p>
                <div className="flex items-center justify-between">
                  <span className={clsx("font-[Outfit,sans-serif] font-black text-[0.9rem]",
                    locked ? "text-[#94a3b8]" : "text-[#00a85d]")}>{r.pts} pts</span>
                  <button disabled={locked} className={clsx(
                    "border-0 rounded-lg px-3 py-[0.35rem] text-[0.75rem] font-bold",
                    locked ? "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
                           : "bg-[#00cc70] text-white cursor-pointer"
                  )}>
                    {locked ? "🔒 Locked" : "Redeem"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to earn */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 mb-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-4">How to Earn Points</h2>
        <div className="flex flex-col gap-[0.6rem]">
          {EARN_ACTIVITIES.map((a) => (
            <div key={a.label} className="flex items-center gap-4 p-3 rounded-[10px] bg-[#f8fafc] flex-wrap">
              <span className="text-xl shrink-0">{a.icon}</span>
              <div className="flex-1 min-w-30">
                <p className="font-bold text-[0.85rem] text-[#0f172a] m-0">{a.label}</p>
                <p className="text-[#94a3b8] text-[0.72rem] m-0">{a.note}</p>
              </div>
              <span className="font-[Outfit,sans-serif] font-black text-[0.9rem] rounded-lg px-[0.55rem] py-[0.2rem] whitespace-nowrap border text-[#6366f1] bg-[#eef2ff] border-[rgba(99,102,241,0.2)]">
                +{a.pts} pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Badge showcase */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-4">
          Badge Showcase <span className="text-[#94a3b8] font-medium text-[0.85rem]">({earnedCount}/{ALL_BADGES.length})</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
          {ALL_BADGES.map((b) => {
            const earned = earnedKeys.has(b.key);
            return (
              <div key={b.key} className={clsx(
                "rounded-xl px-3 py-4 text-center relative",
                earned ? "bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)]"
                       : "bg-[#f8fafc] border border-[#e5e7eb] opacity-50"
              )}>
                <p className="text-[2rem] m-0 mb-[0.4rem]">{b.icon}</p>
                <p className={clsx("font-extrabold text-[0.78rem] m-0 mb-[0.15rem]",
                  earned ? "text-[#00a85d]" : "text-[#94a3b8]")}>{b.label}</p>
                <p className="text-[#94a3b8] text-[0.68rem] m-0 mb-[0.4rem] leading-[1.4]">{b.desc}</p>
                <span className={clsx("text-[0.68rem] font-extrabold",
                  earned ? "text-[#00a85d]" : "text-[#9ca3af]")}>+{b.pts} pts</span>
                {!earned && (
                  <div className="absolute top-1.5 right-1.5 text-[0.7rem]">🔒</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
