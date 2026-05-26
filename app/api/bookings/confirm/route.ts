import { NextRequest, NextResponse } from "next/server";

interface BookingConfirmBody {
  userEmail: string;
  userName: string;
  className: string;
  classType: string;
  instructor: string;
  startTime: string;
  durationMins: number;
  classDate: string;
  isWaitlist?: boolean;
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${ap}`;
}

function fmtDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });
}

export async function POST(req: NextRequest) {
  const body: BookingConfirmBody = await req.json();
  const { userEmail, userName, className, instructor, startTime, durationMins, classDate, isWaitlist } = body;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM ?? "hello@vitalityfitnesstavistock.com";

  // Dev fallback
  if (!apiKey || apiKey === "your_resend_api_key") {
    return NextResponse.json({ success: true });
  }

  const subject = isWaitlist
    ? `You're on the waitlist — ${className}`
    : `Booking confirmed — ${className} at ${fmtTime(startTime)}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
      <div style="background:#0f172a;padding:24px 32px;border-radius:12px 12px 0 0;">
        <p style="color:#ffffff;font-size:13px;margin:0 0 4px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Vitality Fitness Tavistock</p>
        <h1 style="color:#ffffff;font-size:22px;margin:0;font-weight:800;">
          ${isWaitlist ? "You're on the waitlist! ⏳" : "Booking Confirmed! ✅"}
        </h1>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
        <p style="color:#475569;margin:0 0 24px;">Hi ${userName.split(" ")[0]},<br>${isWaitlist ? `You've been added to the waitlist for <strong>${className}</strong>. We'll notify you if a space opens up.` : `Your spot is confirmed for <strong>${className}</strong>. See you there!`}</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#64748b;font-size:13px;padding:6px 0;width:110px;">Class</td><td style="font-weight:700;font-size:15px;">${className}</td></tr>
            <tr><td style="color:#64748b;font-size:13px;padding:6px 0;">Date</td><td style="font-weight:600;">${fmtDate(classDate)}</td></tr>
            <tr><td style="color:#64748b;font-size:13px;padding:6px 0;">Time</td><td style="font-weight:600;">${fmtTime(startTime)} · ${durationMins} min</td></tr>
            <tr><td style="color:#64748b;font-size:13px;padding:6px 0;">Instructor</td><td style="font-weight:600;">${instructor}</td></tr>
            <tr><td style="color:#64748b;font-size:13px;padding:6px 0;">Location</td><td style="font-weight:600;">Plymouth Road, Tavistock, PL19</td></tr>
          </table>
        </div>
        ${!isWaitlist ? `<div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin-bottom:24px;font-size:13px;color:#92400e;">
          ⚠️ <strong>Can't make it?</strong> Please cancel at least 2 hours before so others can take your spot. Log in to your member portal to cancel.
        </div>` : ""}
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitalityfitnesstavistock.com"}/dashboard/bookings" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:700;font-size:14px;">View My Bookings →</a>
        <p style="color:#94a3b8;font-size:12px;margin-top:28px;">Vitality Fitness Tavistock · Plymouth Road, Tavistock, Devon, PL19<br>+44 1822 366335 · hello@vitalityfitnesstavistock.com</p>
      </div>
    </div>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: `VFT Gym <${fromEmail}>`, to: [userEmail], subject, html }),
  });

  return NextResponse.json({ success: true });
}
