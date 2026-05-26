import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Vercel Cron — runs daily at 8am.
 * Finds bookings for classes starting in 20–28 hours and sends reminder emails.
 */
export async function GET(req: NextRequest) {
  // Verify cron secret
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM ?? "hello@vitalityfitnesstavistock.com";
  if (!apiKey || apiKey === "your_resend_api_key") {
    return NextResponse.json({ skipped: "Resend not configured" });
  }

  const admin = createAdminClient();

  // Find bookings where the class is happening tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const { data: bookings, error } = await admin
    .from("bookings")
    .select(`
      id,
      class_date,
      status,
      profiles:user_id ( full_name, id ),
      classes:class_id ( name, class_type, instructor, start_time, duration_mins )
    `)
    .eq("class_date", tomorrowStr)
    .eq("status", "booked");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!bookings?.length) return NextResponse.json({ sent: 0 });

  type Profile = { id: string; full_name: string };
  type Cls = { name: string; class_type: string; instructor: string; start_time: string; duration_mins: number };

  // Get emails from auth.users for each profile id
  const userIds = [...new Set(bookings.map((b) => (b.profiles as unknown as Profile).id))];
  const emailMap: Record<string, string> = {};
  for (const uid of userIds) {
    const { data: u } = await admin.auth.admin.getUserById(uid);
    if (u?.user?.email) emailMap[uid] = u.user.email;
  }

  function fmtTime(t: string) {
    const [h, m] = t.split(":").map(Number);
    return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
  }
  function fmtDate(d: string) {
    return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  }

  let sent = 0;
  for (const b of bookings) {
    const profile = b.profiles as unknown as Profile;
    const cls = b.classes as unknown as Cls;
    const email = emailMap[profile.id];
    if (!email) continue;

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
        <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;font-size:20px;margin:0;font-weight:800;">⏰ Class Reminder</h1>
        </div>
        <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
          <p style="color:#475569;margin:0 0 20px;">Hi ${profile.full_name.split(" ")[0]}, just a reminder that you have a class booked for tomorrow:</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 8px;font-weight:800;font-size:16px;">${cls.name}</p>
            <p style="margin:0;color:#64748b;font-size:14px;">${fmtDate(b.class_date)} · ${fmtTime(cls.start_time)} · ${cls.duration_mins} min · ${cls.instructor}</p>
          </div>
          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin-bottom:24px;font-size:13px;color:#92400e;">
            Can't make it? Please cancel at least 2 hours before so others can take your spot.
          </div>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitalityfitnesstavistock.com"}/dashboard/bookings" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;">Manage Booking →</a>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;">Vitality Fitness Tavistock · +44 1822 366335</p>
        </div>
      </div>`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `VFT Gym <${fromEmail}>`,
        to: [email],
        subject: `Reminder: ${cls.name} tomorrow at ${fmtTime(cls.start_time)}`,
        html,
      }),
    });
    sent++;
  }

  return NextResponse.json({ sent });
}
