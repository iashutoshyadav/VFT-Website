import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function verifyStaff() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const staffEmails = (process.env.STAFF_EMAILS ?? "").split(",").map((e) => e.trim());
  return staffEmails.includes(user.email!) ? user : null;
}

/**
 * GET /api/staff/checkin?search=name_or_email
 * Returns matching members + their today's bookings
 */
export async function GET(req: NextRequest) {
  if (!await verifyStaff()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const search = req.nextUrl.searchParams.get("search")?.trim() ?? "";
  if (search.length < 2) return NextResponse.json({ members: [] });

  const admin = createAdminClient();
  const todayStr = new Date().toISOString().split("T")[0];

  // Search auth users by email
  const { data: authList } = await admin.auth.admin.listUsers({ perPage: 200 });
  const matched = (authList?.users ?? []).filter((u) => {
    const name = (u.user_metadata?.full_name ?? "").toLowerCase();
    const email = (u.email ?? "").toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || email.includes(q);
  }).slice(0, 8);

  const results = await Promise.all(
    matched.map(async (u) => {
      const { data: bookings } = await admin
        .from("bookings")
        .select("id, status, class_id, classes:class_id(name, start_time, duration_mins, instructor)")
        .eq("user_id", u.id)
        .eq("class_date", todayStr)
        .in("status", ["booked", "attended"]);

      return {
        id: u.id,
        name: u.user_metadata?.full_name ?? "Unknown",
        email: u.email,
        bookings: (bookings ?? []).map((b) => ({
          id: b.id,
          status: b.status,
          class: b.classes,
        })),
      };
    }),
  );

  return NextResponse.json({ members: results });
}

/**
 * POST /api/staff/checkin
 * Body: { bookingId: string }
 * Marks a booking as "attended"
 */
export async function POST(req: NextRequest) {
  if (!await verifyStaff()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { bookingId } = await req.json();
  if (!bookingId) return NextResponse.json({ error: "bookingId required" }, { status: 400 });

  const admin = createAdminClient();
  const { error } = await admin
    .from("bookings")
    .update({ status: "attended", checked_in_at: new Date().toISOString() })
    .eq("id", bookingId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
