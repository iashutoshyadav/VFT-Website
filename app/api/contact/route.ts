import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, interest, message } = body;

  // TODO: Replace with Resend API call when API key is configured
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'VFT Website <noreply@vitalityfitnesstavistock.com>',
  //   to: 'hello@vitalityfitnesstavistock.com',
  //   subject: `New enquiry from ${name}`,
  //   html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Interest: ${interest}</p><p>Message: ${message}</p>`
  // });

  console.log("Contact form submission:", { name, email, phone, interest, message });

  return NextResponse.json({ success: true });
}
