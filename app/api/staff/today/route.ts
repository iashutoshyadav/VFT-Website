import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/** GET /api/staff/today — today's classes with live booking counts */
export async function GET() {
  // Verify staff
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const staffEmails = (process.env.STAFF_EMAILS ?? "").split(",").map((e) => e.trim());
  if (!staffEmails.includes(user.email!)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const admin = createAdminClient();
  const todayDOW = new Date().getDay();
  const todayStr = new Date().toISOString().split("T")[0];

  const { data: classes } = await admin
    .from("classes")
    .select("id, name, class_type, instructor, start_time, duration_mins, capacity")
    .eq("day_of_week", todayDOW)
    .eq("is_active", true)
    .order("start_time");

  if (!classes?.length) return NextResponse.json({ classes: [] });

  const classIds = classes.map((c) => c.id);
  const { data: bookings } = await admin
    .from("bookings")
    .select("class_id, status, user_id, profiles:user_id(full_name)")
    .in("class_id", classIds)
    .eq("class_date", todayStr);

  const countMap: Record<string, number> = {};
  const attendedMap: Record<string, number> = {};
  for (const b of bookings ?? []) {
    if (b.status === "booked" || b.status === "attended") countMap[b.class_id] = (countMap[b.class_id] ?? 0) + 1;
    if (b.status === "attended") attendedMap[b.class_id] = (attendedMap[b.class_id] ?? 0) + 1;
  }

  return NextResponse.json({
    classes: classes.map((c) => ({
      ...c,
      booked_count: countMap[c.id] ?? 0,
      attended_count: attendedMap[c.id] ?? 0,
    })),
    date: todayStr,
  });
}
