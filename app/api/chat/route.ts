import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `You are the VFT Assistant for Vitality Fitness Tavistock — a 24/7 gym in Tavistock, Devon, UK. Be friendly, helpful, and concise. Use British English.

KEY FACTS:
- Location: Plymouth Road, Tavistock, Devon, PL19
- Phone: +44 1822 366335 | Email: hello@vitalityfitnesstavistock.com | Instagram: @vft.tavistock
- Hours: 24/7 member access. Staffed Mon–Fri 8am–8pm, Sat–Sun 9am–5pm.

MEMBERSHIP (all include 24/7 access + members app):
- Essential £29.99/mo — gym floor access
- Premium £44.99/mo — Essential + unlimited sauna
- Elite £59.99/mo — Premium + 2 PT sessions/month
- No contracts, cancel anytime (30 days notice), freeze up to 3 months/year

CLASSES (20+ per week, included in all plans): HIIT, Yoga, Spin, Strength, Boxing, Pilates
- Book up to 7 days ahead | Cancel up to 2 hours before | 3+ no-shows = temp booking suspension

PERSONAL TRAINING:
- Taster (1 session) £50 | Kickstart (5 sessions) £220 | Transformation (10 sessions) £400
- Trainers: Alex Johnson (Strength & Conditioning), Jake Thompson (Fat Loss), Sarah Mitchell (HIIT/Boxing), Lisa Kent (Yoga/Wellness)

FACILITIES: Full weights zone, cardio, dedicated class studio, unlimited sauna (Premium+), changing rooms, free parking, sauna

POLICIES: Guest pass £8/visit | Replacement key fob £10 | Free first week trial available
- Cancellation: 30 days written notice for membership | No refunds for partial months

If you don't know something specific, direct them to call or email. Keep responses under 120 words. Never make up facts.`;

type HistoryItem = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key") {
    return NextResponse.json({ error: "AI not configured." }, { status: 503 });
  }

  // Keep last 8 messages for context
  const recent: HistoryItem[] = (history ?? []).slice(-8);

  // Gemini uses "user" / "model" roles (not "assistant")
  const contents = [
    ...recent.map((m: HistoryItem) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message.trim() }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "AI unavailable." }, { status: 502 });
  }

  const data = await res.json();
  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
    "Sorry, I couldn't process that. Please call us on +44 1822 366335.";

  return NextResponse.json({ reply });
}
