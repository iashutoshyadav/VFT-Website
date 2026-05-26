"use client";
import { useState, useEffect, useRef } from "react";
import { Calendar, Flame, Star, Bell, Tag, CheckCheck, Loader2 } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

type NotifType = "booking" | "reminder" | "offer" | "streak" | "system";

interface DBNotification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

const TYPE_ICON: Record<NotifType, typeof Bell> = {
  booking:  Calendar,
  reminder: Calendar,
  offer:    Tag,
  streak:   Flame,
  system:   Bell,
};

const TYPE_COLOR: Record<NotifType, string> = {
  booking:  "#374151",
  reminder: "#374151",
  offer:    "#6366f1",
  streak:   "#f59e0b",
  system:   "#3b82f6",
};

const FILTERS = [
  { label: "All",      value: "all"     },
  { label: "Reminders",value: "reminder"},
  { label: "Streak",   value: "streak"  },
  { label: "Offers",   value: "offer"   },
  { label: "Bookings", value: "booking" },
];

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins < 60)  return `${mins || 1} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7)   return `${days} day${days !== 1 ? "s" : ""} ago`;
  return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
}

export default function NotificationsPage() {
  const supabase = useRef(createClient()).current;
  const [notifs, setNotifs] = useState<DBNotification[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("notifications")
        .select("id, type, title, message, read, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setNotifs(data ?? []);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function markRead(id: string) {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  }

  async function markAllRead() {
    setMarkingAll(true);
    const unreadIds = notifs.filter((n) => !n.read).map((n) => n.id);
    if (unreadIds.length) {
      await supabase.from("notifications").update({ read: true }).in("id", unreadIds);
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    }
    setMarkingAll(false);
  }

  const visible = filter === "all"
    ? notifs
    : notifs.filter((n) => {
        if (filter === "reminder") return n.type === "reminder" || n.type === "booking";
        return n.type === filter;
      });

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="max-w-180 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">Notifications</h1>
          <p className="text-[#64748b] text-[0.9rem]">
            {loading ? "Loading…" : unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {!loading && unreadCount > 0 && (
          <button onClick={markAllRead} disabled={markingAll}
            className="flex items-center gap-[0.4rem] bg-white border-[1.5px] border-[#e5e7eb] rounded-[10px] px-[0.85rem] py-2 text-[#475569] text-[0.82rem] font-bold cursor-pointer disabled:opacity-60">
            {markingAll ? <Loader2 className="w-3.75 h-3.75 animate-spin" /> : <CheckCheck className="w-3.75 h-3.75" />}
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-[0.35rem] bg-white border border-[#e5e7eb] rounded-xl p-[0.3rem] mb-5 w-fit overflow-x-auto">
        {FILTERS.map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={clsx(
              "px-4 py-[0.45rem] rounded-lg border-0 font-[Outfit,sans-serif] font-bold text-[0.82rem] cursor-pointer transition-all duration-150 whitespace-nowrap",
              filter === f.value ? "bg-[#111827] text-white" : "bg-transparent text-[#64748b]"
            )}>
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex flex-col gap-[0.6rem]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#e5e7eb] rounded-[14px] h-[84px] animate-pulse" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center">
          <Bell className="w-9 h-9 text-[#e5e7eb] mx-auto mb-[0.85rem]" />
          <p className="text-[#94a3b8] text-[0.9rem]">No notifications in this category.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-[0.6rem]">
          {visible.map((n) => {
            const Icon = TYPE_ICON[n.type] ?? Bell;
            const color = TYPE_COLOR[n.type] ?? "#64748b";
            return (
              <div key={n.id} onClick={() => !n.read && markRead(n.id)}
                className={clsx(
                  "flex gap-4 px-[1.1rem] py-4 rounded-[14px] transition-all duration-150 relative",
                  n.read
                    ? "bg-white border border-[#e5e7eb] cursor-default"
                    : "bg-[#f5f6f8] border border-[#d1d5db] cursor-pointer"
                )}>
                {!n.read && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#374151]" />
                )}
                <div className="w-10.5 h-10.5 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}18` }}>
                  <Icon className="w-[19px] h-[19px]" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-extrabold text-[0.9rem] text-[#0f172a] m-0 mb-[0.2rem]">{n.title}</p>
                  <p className="text-[#475569] text-[0.82rem] leading-[1.55] m-0 mb-[0.4rem]">{n.message}</p>
                  <p className="text-[#94a3b8] text-[0.72rem] m-0">{timeAgo(n.created_at)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty DB state — seed hint */}
      {!loading && notifs.length === 0 && (
        <div className="mt-6 bg-[#fffbeb] border border-[rgba(245,158,11,0.2)] rounded-2xl p-5 text-center">
          <p className="text-[#92400e] text-[0.85rem] font-semibold">
            No notifications yet — they&apos;ll appear here when you book classes, earn badges, or receive offers.
          </p>
        </div>
      )}
    </div>
  );
}
