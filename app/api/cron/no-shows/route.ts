import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Vercel Cron — runs every 30 min.
 * 1. Marks still-"booked" bookings for past classes as "no_show"
 * 2. Sends no-show recovery email
 * 3. Sends post-class feedback email to "attended" bookings from the last 30 min
 */
export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM ?? "hello@vitalityfitnesstavistock.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitalityfitnesstavistock.com";

  const admin = createAdminClient();
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const nowTime = now.toTimeString().slice(0, 5); // HH:MM
  const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000).toTimeString().slice(0, 5);

  // ── 1. Find past classes that still have "booked" status ──────────────────
  const { data: staleBookings } = await admin
    .from("bookings")
    .select(`id, user_id, profiles:user_id(id, full_name), classes:class_id(name, start_time, duration_mins, instructor)`)
    .eq("class_date", today)
    .eq("status", "booked")
    .lt("classes.start_time", nowTime); // class already started

  type Profile = { id: string; full_name: string };
  type ClsFull = { name: string; start_time: string; duration_mins: number; instructor: string };
  type ClsShort = { name: string };

  const noShowIds: string[] = [];
  for (const b of staleBookings ?? []) {
    const cls = b.classes as unknown as ClsFull | null;
    if (!cls) continue;
    // Check if class has ended
    const [h, m] = cls.start_time.split(":").map(Number);
    const endMins = h * 60 + m + cls.duration_mins;
    const nowMins = now.getHours() * 60 + now.getMinutes();
    if (nowMins >= endMins + 5) { // 5 min grace
      noShowIds.push(b.id);
    }
  }

  if (noShowIds.length) {
    await admin.from("bookings").update({ status: "no_show" }).in("id", noShowIds);
  }

  // ── 2. Send no-show recovery emails ──────────────────────────────────────
  let noShowEmailsSent = 0;
  if (apiKey && apiKey !== "your_resend_api_key") {
    for (const b of (staleBookings ?? []).filter((x) => noShowIds.includes(x.id))) {
      const profile = b.profiles as unknown as Profile;
      const cls = b.classes as unknown as ClsFull;
      const { data: u } = await admin.auth.admin.getUserById(profile.id);
      if (!u?.user?.email) continue;

      const html = `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:20px;margin:0;font-weight:800;">We missed you! 😢</h1>
          </div>
          <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
            <p style="color:#475569;margin:0 0 20px;">Hi ${profile.full_name.split(" ")[0]}, it looks like you missed <strong>${cls.name}</strong> today.</p>
            <p style="color:#475569;margin:0 0 20px;">Life happens! Next time, if you can't make it, please cancel at least 2 hours before so a fellow member can take your spot.</p>
            <a href="${siteUrl}/dashboard/timetable" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;">Book Your Next Class →</a>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Vitality Fitness Tavistock · +44 1822 366335</p>
          </div>
        </div>`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: `VFT Gym <${fromEmail}>`, to: [u.user.email], subject: `We missed you at ${cls.name} today`, html }),
      });
      noShowEmailsSent++;
    }
  }

  // ── 3. Post-class feedback for recently attended bookings ─────────────────
  const { data: recentAttended } = await admin
    .from("bookings")
    .select(`id, user_id, profiles:user_id(id, full_name), classes:class_id(name, start_time, duration_mins)`)
    .eq("class_date", today)
    .eq("status", "attended")
    .gte("classes.start_time", thirtyMinAgo)
    .lte("classes.start_time", nowTime);

  let feedbackEmailsSent = 0;
  if (apiKey && apiKey !== "your_resend_api_key") {
    for (const b of recentAttended ?? []) {
      const profile = b.profiles as unknown as Profile;
      const cls = b.classes as unknown as ClsShort;
      const { data: u } = await admin.auth.admin.getUserById(profile.id);
      if (!u?.user?.email) continue;

      const html = `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
            <h1 style="color:#fff;font-size:20px;margin:0;font-weight:800;">How was ${cls.name}? 🏋️</h1>
          </div>
          <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
            <p style="color:#475569;margin:0 0 20px;">Hi ${profile.full_name.split(" ")[0]}, great work today! We'd love to hear what you thought.</p>
            <p style="color:#475569;margin:0 0 24px;">It only takes 30 seconds — your feedback helps us improve and helps other members choose the right class.</p>
            <a href="${siteUrl}/dashboard/bookings" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;">Leave a Review ⭐</a>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Vitality Fitness Tavistock · +44 1822 366335</p>
          </div>
        </div>`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: `VFT Gym <${fromEmail}>`, to: [u.user.email], subject: `How was ${cls.name}? Leave a quick review!`, html }),
      });
      feedbackEmailsSent++;
    }
  }

  return NextResponse.json({ noShowsMarked: noShowIds.length, noShowEmailsSent, feedbackEmailsSent });
}
