"use client";
import { useEffect, useState } from "react";
import { TrendingUp, Users, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface AnalyticsData {
  summary: { totalBookings30d: number; attendanceRate: number; noShowRate: number; totalMembers: number };
  trend: { date: string; count: number }[];
  peakHours: { hour: number; label: string; count: number }[];
  topClasses: { name: string; type: string; count: number }[];
}

const CAT_COLORS: Record<string, string> = {
  hiit: "#ef4444", yoga: "#6366f1", spin: "#f59e0b",
  strength: "#3b82f6", boxing: "#ec4899", pilates: "#8b5cf6", other: "#64748b",
};

function BarChart({ data, color = "#374151" }: { data: { label: string; count: number }[]; color?: string }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-32 pt-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <div className="w-full rounded-t-sm transition-all" style={{ height: `${Math.max((d.count / max) * 100, 4)}%`, background: color }} />
          <span className="text-[0.6rem] text-[#94a3b8] truncate w-full text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-[#94a3b8] animate-spin" />
      </div>
    );
  }

  if (!data) return <p className="text-[#94a3b8]">Failed to load analytics.</p>;

  const { summary, trend, peakHours, topClasses } = data;
  const trendMax = Math.max(...trend.map((d) => d.count), 1);
  const hoursMax = Math.max(...peakHours.map((h) => h.count), 1);
  const classesMax = Math.max(...topClasses.map((c) => c.count), 1);

  return (
    <div className="max-w-5xl">
      <div className="mb-7">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.7rem] text-[#0f172a] tracking-[-0.03em]">Analytics</h1>
        <p className="text-[#64748b] text-sm mt-0.5">Bookings, attendance and member trends.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TrendingUp,   label: "Bookings (30d)",   val: summary.totalBookings30d, sub: "confirmed bookings",    color: "#3b82f6" },
          { icon: Users,        label: "Total Members",    val: summary.totalMembers,     sub: "registered profiles",  color: "#6366f1" },
          { icon: CheckCircle,  label: "Attendance Rate",  val: `${summary.attendanceRate}%`, sub: "of past bookings", color: "#374151" },
          { icon: AlertCircle,  label: "No-Show Rate",     val: `${summary.noShowRate}%`,     sub: "of past bookings", color: summary.noShowRate > 15 ? "#ef4444" : "#f59e0b" },
        ].map(({ icon: Icon, label, val, sub, color }) => (
          <div key={label} className="bg-white border border-[#e5e7eb] rounded-2xl p-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] leading-none">{val}</p>
            <p className="text-[#94a3b8] text-[0.72rem] mt-1 font-semibold uppercase tracking-wide">{label}</p>
            <p className="text-[#cbd5e1] text-[0.68rem] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

        {/* 14-day booking trend */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
          <h2 className="font-black text-[#0f172a] text-[0.92rem] mb-1">Bookings — Last 14 Days</h2>
          <p className="text-[#94a3b8] text-[0.75rem] mb-5">Daily confirmed bookings</p>
          {trend.length === 0 ? (
            <p className="text-[#94a3b8] text-sm text-center py-8">No data yet.</p>
          ) : (
            <BarChart data={trend.map((d) => ({ label: d.date, count: d.count }))} color="#1f2937" />
          )}
          <div className="flex items-center justify-between mt-3 text-[0.7rem] text-[#94a3b8]">
            <span>0</span>
            <span>{trendMax} max/day</span>
          </div>
        </div>

        {/* Peak hours */}
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
          <h2 className="font-black text-[#0f172a] text-[0.92rem] mb-1">Peak Hours</h2>
          <p className="text-[#94a3b8] text-[0.75rem] mb-5">Bookings by class start time</p>
          {peakHours.length === 0 ? (
            <p className="text-[#94a3b8] text-sm text-center py-8">No data yet.</p>
          ) : (
            <div className="flex items-end gap-1.5 h-32 pt-2">
              {peakHours.map((h) => (
                <div key={h.hour} className="flex flex-col items-center gap-1 flex-1 min-w-0">
                  <div className="w-full rounded-t-sm" style={{
                    height: `${Math.max((h.count / hoursMax) * 100, 4)}%`,
                    background: h.count === hoursMax ? "#ef4444" : "#374151",
                  }} />
                  <span className="text-[0.6rem] text-[#94a3b8] truncate w-full text-center">{h.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top classes */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6">
        <h2 className="font-black text-[#0f172a] text-[0.92rem] mb-1">Top Classes (30 days)</h2>
        <p className="text-[#94a3b8] text-[0.75rem] mb-6">Most booked classes by total bookings</p>
        {topClasses.length === 0 ? (
          <p className="text-[#94a3b8] text-sm">No booking data yet.</p>
        ) : (
          <div className="space-y-3">
            {topClasses.map((cls, i) => {
              const color = CAT_COLORS[cls.type] ?? "#64748b";
              const pct = Math.round((cls.count / classesMax) * 100);
              return (
                <div key={cls.name} className="flex items-center gap-4">
                  <span className="text-[#94a3b8] text-[0.75rem] font-bold w-4 shrink-0">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0f172a] text-[0.88rem]">{cls.name}</span>
                        <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{cls.type.toUpperCase()}</span>
                      </div>
                      <span className="text-[#64748b] text-[0.8rem] font-bold ml-2 shrink-0">{cls.count} bookings</span>
                    </div>
                    <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
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
