import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const staffEmails = (process.env.STAFF_EMAILS ?? "").split(",").map((e) => e.trim());
  if (!staffEmails.includes(user.email!)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const admin = createAdminClient();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // 14-day window
  const d14 = new Date(today); d14.setDate(d14.getDate() - 13);
  const d14Str = d14.toISOString().split("T")[0];

  // 30-day window
  const d30 = new Date(today); d30.setDate(d30.getDate() - 29);
  const d30Str = d30.toISOString().split("T")[0];

  // ── Fetch raw data ─────────────────────────────────────────────────────────
  const [{ data: recent14 }, { data: allPast }, { data: classes }, { count: totalMembers }] =
    await Promise.all([
      // Bookings last 14 days
      admin.from("bookings")
        .select("class_date, status, class_id")
        .gte("class_date", d14Str)
        .lte("class_date", todayStr),

      // All past bookings for attendance/no-show rates
      admin.from("bookings")
        .select("status")
        .lt("class_date", todayStr)
        .in("status", ["attended", "no_show"]),

      // Classes for peak hours + top classes
      admin.from("bookings")
        .select("class_id, status, classes:class_id(name, class_type, start_time)")
        .gte("class_date", d30Str)
        .neq("status", "cancelled"),

      // Total active members (signed up in supabase auth)
      admin.from("profiles").select("*", { count: "exact", head: true }),
    ]);

  // ── 14-day trend ──────────────────────────────────────────────────────────
  const trendMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    trendMap[d.toISOString().split("T")[0]] = 0;
  }
  for (const b of recent14 ?? []) {
    if (b.status !== "cancelled") trendMap[b.class_date] = (trendMap[b.class_date] ?? 0) + 1;
  }
  const trend = Object.entries(trendMap).map(([date, count]) => ({
    date: new Date(date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    count,
  }));

  // ── Attendance + no-show rates ────────────────────────────────────────────
  const total = (allPast ?? []).length;
  const attended = (allPast ?? []).filter((b) => b.status === "attended").length;
  const noShows = (allPast ?? []).filter((b) => b.status === "no_show").length;
  const attendanceRate = total > 0 ? Math.round((attended / total) * 100) : 0;
  const noShowRate = total > 0 ? Math.round((noShows / total) * 100) : 0;

  // ── Total bookings last 30 days ───────────────────────────────────────────
  const totalBookings30d = (recent14 ?? []).filter((b) => b.status !== "cancelled").length;

  // ── Peak hours ────────────────────────────────────────────────────────────
  const hourMap: Record<number, number> = {};
  for (const b of classes ?? []) {
    const cls = b.classes as { start_time?: string } | null;
    if (!cls?.start_time) continue;
    const hour = parseInt(cls.start_time.split(":")[0], 10);
    hourMap[hour] = (hourMap[hour] ?? 0) + 1;
  }
  const peakHours = Object.entries(hourMap)
    .map(([h, count]) => ({ hour: parseInt(h), label: `${parseInt(h) % 12 || 12}${parseInt(h) >= 12 ? "pm" : "am"}`, count }))
    .sort((a, b) => a.hour - b.hour);

  // ── Top 5 classes ─────────────────────────────────────────────────────────
  const classCountMap: Record<string, { name: string; type: string; count: number }> = {};
  for (const b of classes ?? []) {
    const cls = b.classes as { name?: string; class_type?: string } | null;
    if (!cls?.name) continue;
    const key = b.class_id;
    if (!classCountMap[key]) classCountMap[key] = { name: cls.name, type: cls.class_type ?? "", count: 0 };
    classCountMap[key].count++;
  }
  const topClasses = Object.values(classCountMap).sort((a, b) => b.count - a.count).slice(0, 5);

  return NextResponse.json({
    summary: { totalBookings30d, attendanceRate, noShowRate, totalMembers: totalMembers ?? 0 },
    trend,
    peakHours,
    topClasses,
  });
}
