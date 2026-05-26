import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, interest, message } = body;

  // Validate required fields
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.EMAIL_FROM ?? "hello@vitalityfitnesstavistock.com";

  // Dev fallback — log when Resend is not yet configured
  if (!apiKey || apiKey === "your_resend_api_key") {
    if (process.env.NODE_ENV !== "production") {
      console.log("[DEV] Contact form — Resend not configured yet:", {
        name,
        email,
        phone,
        interest,
        message,
      });
    }
    return NextResponse.json({ success: true });
  }

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a;">
      <div style="background: #0f172a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 800;">
          New Enquiry — VFT Website
        </h1>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; font-weight: 600; font-size: 15px;">${name.trim()}</td>
          </tr>
          <tr style="border-top: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0;">
              <a href="mailto:${email.trim()}" style="color: #1f2937; font-weight: 600;">${email.trim()}</a>
            </td>
          </tr>
          ${phone?.trim() ? `
          <tr style="border-top: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; font-size: 15px;">${phone.trim()}</td>
          </tr>` : ""}
          <tr style="border-top: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Interested in</td>
            <td style="padding: 10px 0; font-size: 15px; text-transform: capitalize;">${interest ?? "—"}</td>
          </tr>
          ${message?.trim() ? `
          <tr style="border-top: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; font-size: 15px; line-height: 1.6;">${message.trim().replace(/\n/g, "<br>")}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <a href="mailto:${email.trim()}" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 14px;">
            Reply to ${name.trim().split(" ")[0]}
          </a>
        </div>
      </div>
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
        Sent from the contact form at vitalityfitnesstavistock.com
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `VFT Website <hello@vitalityfitnesstavistock.com>`,
      to: [toEmail],
      reply_to: email.trim(),
      subject: `New enquiry from ${name.trim()} — ${interest ?? "General"}`,
      html,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
