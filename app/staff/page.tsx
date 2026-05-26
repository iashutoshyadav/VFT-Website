"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckSquare, BarChart2, Calendar, Users, Clock } from "lucide-react";

interface ClassItem {
  id: string; name: string; class_type: string; instructor: string;
  start_time: string; duration_mins: number; capacity: number;
  booked_count: number; attended_count: number;
}

const CAT_COLORS: Record<string, string> = {
  hiit: "#ef4444", yoga: "#6366f1", spin: "#f59e0b",
  strength: "#3b82f6", boxing: "#ec4899", pilates: "#8b5cf6", other: "#64748b",
};

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
}

export default function StaffOverviewPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff/today")
      .then((r) => r.json())
      .then((d) => { setClasses(d.classes ?? []); setDate(d.date ?? ""); setLoading(false); });
  }, []);

  const totalBooked = classes.reduce((s, c) => s + c.booked_count, 0);
  const totalAttended = classes.reduce((s, c) => s + c.attended_count, 0);
  const totalCapacity = classes.reduce((s, c) => s + c.capacity, 0);

  const todayLabel = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  return (
    <div className="max-w-5xl">
      <div className="mb-7">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.7rem] text-[#0f172a] tracking-[-0.03em]">Staff Overview</h1>
        <p className="text-[#64748b] text-sm mt-0.5">{todayLabel}</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { href: "/staff/checkin",   icon: CheckSquare, label: "Member Check-In",  sub: "Search & mark attendance",  color: "#0f172a" },
          { href: "/staff/classes",   icon: Calendar,    label: "Manage Classes",    sub: "View & edit timetable",    color: "#374151" },
          { href: "/staff/analytics", icon: BarChart2,   label: "View Analytics",    sub: "Bookings, trends & stats", color: "#4b5563" },
        ].map(({ href, icon: Icon, label, sub, color }) => (
          <Link key={href} href={href}
            className="flex items-center gap-4 bg-white border border-[#e5e7eb] rounded-2xl p-5 no-underline hover:border-[#d1d5db] hover:shadow-sm transition-all group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: color }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-[#0f172a] text-[0.92rem] mb-0.5">{label}</p>
              <p className="text-[#94a3b8] text-[0.75rem]">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Today's stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Calendar, label: "Classes today",  val: classes.length },
          { icon: Users,    label: "Total booked",   val: totalBooked },
          { icon: CheckSquare, label: "Checked in",  val: totalAttended },
          { icon: Clock,    label: "Capacity used",  val: totalCapacity ? `${Math.round((totalBooked / totalCapacity) * 100)}%` : "—" },
        ].map(({ icon: Icon, label, val }) => (
          <div key={label} className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
            <Icon className="w-4 h-4 text-[#94a3b8] mb-2" />
            <p className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] leading-none">{val}</p>
            <p className="text-[#94a3b8] text-[0.75rem] mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Today's class lineup */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f1f5f9]">
          <h2 className="font-black text-[#0f172a] text-[0.95rem]">Today&apos;s Classes</h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map((i) => <div key={i} className="h-14 bg-[#f1f5f9] rounded-xl animate-pulse" />)}
          </div>
        ) : classes.length === 0 ? (
          <p className="text-[#94a3b8] text-sm text-center py-12">No classes scheduled today.</p>
        ) : (
          <div className="divide-y divide-[#f1f5f9]">
            {classes.map((cls) => {
              const pct = cls.capacity > 0 ? Math.round((cls.booked_count / cls.capacity) * 100) : 0;
              const color = CAT_COLORS[cls.class_type] ?? "#64748b";
              return (
                <div key={cls.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ background: color }} />
                  <div className="w-14 shrink-0">
                    <p className="font-bold text-[#0f172a] text-sm">{fmtTime(cls.start_time)}</p>
                    <p className="text-[#94a3b8] text-[0.7rem]">{cls.duration_mins}m</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0f172a] text-[0.88rem]">{cls.name}</p>
                    <p className="text-[#64748b] text-[0.75rem]">{cls.instructor}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#0f172a] font-bold text-sm">{cls.booked_count}/{cls.capacity}</p>
                    <div className="w-20 h-1.5 bg-[#f1f5f9] rounded-full mt-1">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : "#374151" }} />
                    </div>
                  </div>
                  <div className="shrink-0 ml-2">
                    <span className={`text-[0.7rem] font-bold px-2 py-0.5 rounded-full ${cls.attended_count > 0 ? "bg-[#f0fdf4] text-[#166534]" : "bg-[#f1f5f9] text-[#94a3b8]"}`}>
                      {cls.attended_count} in ✓
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
