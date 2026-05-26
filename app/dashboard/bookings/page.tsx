"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, XCircle, Star, X, AlertCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

interface UpcomingBooking {
  id: string;
  class_id: string;
  class_date: string;
  status: string;
  name: string;
  start_time: string;
  instructor: string;
  duration_mins: number;
  canCancel: boolean;
}

interface PastBooking {
  id: string;
  class_id: string;
  class_date: string;
  status: string;
  name: string;
  start_time: string;
  instructor: string;
  reviewed: boolean;
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${ap}`;
}

function canCancelCheck(classDate: string, startTime: string): boolean {
  const dt = new Date(`${classDate}T${startTime}`);
  return dt.getTime() - Date.now() > 2 * 60 * 60 * 1000;
}

function CancelModal({
  booking, onClose, onConfirm, loading,
}: {
  booking: UpcomingBooking; onClose: () => void;
  onConfirm: () => void; loading: boolean;
}) {
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-[#0f172a]">Cancel Booking</h3>
        <button type="button" onClick={onClose}
          className="bg-[#f1f5f9] border-0 rounded-lg p-1.5 cursor-pointer text-[#64748b]">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-[#fef2f2] border border-[rgba(239,68,68,0.15)] rounded-[10px] p-[0.85rem] mb-5">
        <p className="text-[#374151] text-[0.88rem] m-0 mb-[0.15rem] font-bold">{booking.name}</p>
        <p className="text-[#64748b] text-[0.82rem] m-0">{fmtDate(booking.class_date)} · {fmtTime(booking.start_time)} · {booking.instructor}</p>
      </div>
      <p className="text-[#64748b] text-[0.85rem] mb-5">
        Are you sure? Your spot will be released for other members.
      </p>
      <div className="flex gap-[0.6rem]">
        <button type="button" onClick={onClose}
          className="flex-1 bg-white border-[1.5px] border-[#e5e7eb] rounded-[10px] py-[0.7rem] font-[Outfit,sans-serif] font-bold text-[0.88rem] text-[#374151] cursor-pointer">
          Keep Booking
        </button>
        <button type="button" onClick={onConfirm} disabled={loading}
          className="flex-1 bg-[#ef4444] border-0 rounded-[10px] py-[0.7rem] font-[Outfit,sans-serif] font-bold text-[0.88rem] text-white cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Yes, Cancel
        </button>
      </div>
    </>
  );
}

function ReviewModal({
  booking, onClose, onSubmitted,
}: {
  booking: PastBooking; onClose: () => void; onSubmitted: () => void;
}) {
  const supabase = createClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error: err } = await supabase.from("reviews").insert({
      user_id: user.id,
      class_id: booking.class_id,
      booking_id: booking.id,
      rating,
      comment: comment.trim() || null,
      is_public: true,
    });
    setLoading(false);
    if (err) { setError("Failed to submit. Please try again."); return; }
    setSubmitted(true);
    onSubmitted();
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-13 h-13 rounded-full bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center mx-auto mb-[0.85rem]">
          <CheckCircle className="w-6.5 h-6.5 text-[#374151]" />
        </div>
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-[#0f172a] mb-1">Review Submitted!</h3>
        <p className="text-[#64748b] text-[0.85rem] mb-[1.1rem]">Thanks for your feedback. +15 pts earned!</p>
        <button onClick={onClose}
          className="bg-[#1f2937] text-white border-0 rounded-lg px-[1.4rem] py-[0.6rem] font-[Outfit,sans-serif] font-bold cursor-pointer">
          Done
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-[#0f172a]">Leave a Review</h3>
        <button type="button" onClick={onClose}
          className="bg-[#f1f5f9] border-0 rounded-lg p-1.5 cursor-pointer text-[#64748b]">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[#64748b] text-[0.85rem] mb-4">{booking.name} · {fmtDate(booking.class_date)} · {booking.instructor}</p>
      <div className="flex gap-[0.35rem] mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <button type="button" key={s} onClick={() => setRating(s)} className="bg-transparent border-0 cursor-pointer p-0.5">
            <Star className={clsx("w-6 h-6", s <= rating ? "fill-[#f59e0b] text-[#f59e0b]" : "fill-none text-[#e5e7eb]")} />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us about the class..."
        rows={3}
        className="w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] p-3 text-[0.88rem] text-[#0f172a] resize-none outline-none box-border mb-4"
      />
      {error && <p className="text-[#ef4444] text-[0.82rem] mb-3">{error}</p>}
      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-[#1f2937] text-white border-0 rounded-[10px] py-[0.8rem] font-[Outfit,sans-serif] font-extrabold text-[0.92rem] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        Submit Review ⭐
      </button>
    </>
  );
}

export default function BookingsPage() {
  const supabase = useRef(createClient()).current;
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cancelBooking, setCancelBooking] = useState<UpcomingBooking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<PastBooking | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingBooking[]>([]);
  const [past, setPast] = useState<PastBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split("T")[0];

      // Fetch all non-cancelled bookings + class details
      const { data: bkgs } = await supabase
        .from("bookings")
        .select(`
          id, class_date, status,
          classes ( id, name, class_type, instructor, start_time, duration_mins )
        `)
        .eq("user_id", user.id)
        .neq("status", "cancelled")
        .order("class_date", { ascending: true });

      // Fetch reviewed booking ids
      const { data: reviews } = await supabase
        .from("reviews")
        .select("booking_id")
        .eq("user_id", user.id);
      const reviewedIds = new Set((reviews ?? []).map((r) => r.booking_id));

      const upcomingList: UpcomingBooking[] = [];
      const pastList: PastBooking[] = [];

      for (const b of bkgs ?? []) {
        const cls = Array.isArray(b.classes) ? b.classes[0] : b.classes;
        if (!cls) continue;
        if (b.class_date >= today && b.status === "booked") {
          upcomingList.push({
            id: b.id,
            class_id: cls.id,
            class_date: b.class_date,
            status: b.status,
            name: cls.name,
            start_time: cls.start_time,
            instructor: cls.instructor,
            duration_mins: cls.duration_mins,
            canCancel: canCancelCheck(b.class_date, cls.start_time),
          });
        } else if (b.class_date < today || b.status === "attended" || b.status === "no_show") {
          pastList.push({
            id: b.id,
            class_id: cls.id,
            class_date: b.class_date,
            status: b.status,
            name: cls.name,
            start_time: cls.start_time,
            instructor: cls.instructor,
            reviewed: reviewedIds.has(b.id),
          });
        }
      }

      setUpcoming(upcomingList);
      setPast(pastList.reverse()); // most recent first
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  async function handleCancel() {
    if (!cancelBooking) return;
    setCancelLoading(true);
    await supabase
      .from("bookings")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", cancelBooking.id);
    setCancelLoading(false);
    setCancelBooking(null);
    setRefresh((r) => r + 1);
  }

  if (loading) {
    return (
      <div className="max-w-200 mx-auto">
        <div className="mb-6">
          <div className="h-8 w-48 bg-[#e5e7eb] rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-72 bg-[#f1f5f9] rounded animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-[#e5e7eb] rounded-[14px] px-5 py-[1.1rem] h-18 mb-3 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-200 mx-auto">
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">My Bookings</h1>
        <p className="text-[#64748b] text-[0.9rem]">Manage your upcoming classes and view your history.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-[0.35rem] bg-white border border-[#e5e7eb] rounded-xl p-[0.3rem] mb-5 w-fit">
        {(["upcoming", "past"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={clsx(
              "px-5 py-2 rounded-lg border-0 font-[Outfit,sans-serif] font-bold text-[0.85rem] cursor-pointer transition-all duration-150 capitalize",
              tab === t ? "bg-[#111827] text-white" : "bg-transparent text-[#64748b]"
            )}>
            {t} ({t === "upcoming" ? upcoming.length : past.length})
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {tab === "upcoming" && (
        <div>
          {upcoming.length === 0 ? (
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center">
              <p className="text-[#94a3b8] text-[0.9rem] mb-4">No upcoming classes booked.</p>
              <Link href="/dashboard/timetable" className="text-[#374151] font-bold text-[0.9rem]">Browse timetable →</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((b) => (
                <div key={b.id} className="bg-white border border-[#e5e7eb] rounded-[14px] px-5 py-[1.1rem] flex items-center gap-4 flex-wrap">
                  <div className="w-10.5 h-10.5 rounded-xl bg-[#f5f6f8] border border-[#e5e7eb] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#374151]" />
                  </div>
                  <div className="flex-1 min-w-35">
                    <p className="font-extrabold text-[0.95rem] text-[#0f172a] m-0 mb-[0.15rem]">{b.name}</p>
                    <p className="text-[#64748b] text-[0.8rem] m-0">{fmtDate(b.class_date)} · {fmtTime(b.start_time)} · {b.instructor}</p>
                  </div>
                  {b.canCancel ? (
                    <button onClick={() => setCancelBooking(b)}
                      className="bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.15)] rounded-lg px-[0.85rem] py-[0.4rem] text-[#ef4444] text-[0.8rem] font-bold cursor-pointer whitespace-nowrap">
                      Cancel
                    </button>
                  ) : (
                    <div className="flex items-center gap-[0.3rem]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span className="text-[#94a3b8] text-[0.75rem]">Within 2hrs</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Past */}
      {tab === "past" && (
        <div>
          {past.length === 0 ? (
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center">
              <p className="text-[#94a3b8] text-[0.9rem]">No past classes yet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {past.map((b) => {
                const attended = b.status === "attended";
                const noShow = b.status === "no_show";
                return (
                  <div key={b.id} className="bg-white border border-[#e5e7eb] rounded-[14px] px-5 py-[1.1rem] flex items-center gap-4 flex-wrap">
                    <div className={clsx(
                      "w-10.5 h-10.5 rounded-xl flex items-center justify-center shrink-0",
                      attended ? "bg-[#f5f6f8] border border-[#e5e7eb]"
                        : noShow ? "bg-[#fef2f2] border border-[rgba(239,68,68,0.15)]"
                        : "bg-[#f8fafc] border border-[#e5e7eb]"
                    )}>
                      {attended
                        ? <CheckCircle className="w-5 h-5 text-[#374151]" />
                        : noShow
                        ? <XCircle className="w-5 h-5 text-[#ef4444]" />
                        : <CheckCircle className="w-5 h-5 text-[#94a3b8]" />}
                    </div>
                    <div className="flex-1 min-w-35">
                      <p className="font-extrabold text-[0.95rem] text-[#0f172a] m-0 mb-[0.15rem]">{b.name}</p>
                      <p className="text-[#64748b] text-[0.8rem] m-0">{fmtDate(b.class_date)} · {fmtTime(b.start_time)} · {b.instructor}</p>
                    </div>
                    <div className="flex items-center gap-[0.6rem] shrink-0">
                      <span className={clsx(
                        "rounded-[20px] px-[0.6rem] py-[0.2rem] text-[0.72rem] font-extrabold border",
                        attended ? "bg-[#f5f6f8] text-[#374151] border-[#e5e7eb]"
                          : noShow ? "bg-[#fef2f2] text-[#ef4444] border-[rgba(239,68,68,0.2)]"
                          : "bg-[#f8fafc] text-[#64748b] border-[#e5e7eb]"
                      )}>
                        {attended ? "Attended ✅" : noShow ? "No-Show ❌" : "Booked"}
                      </span>
                      {(attended || !noShow) && !b.reviewed && (
                        <button onClick={() => setReviewBooking(b)}
                          className="bg-[#fffbeb] border border-[rgba(245,158,11,0.2)] rounded-lg px-[0.7rem] py-[0.3rem] text-[#d97706] text-[0.75rem] font-bold cursor-pointer whitespace-nowrap">
                          Review ⭐
                        </button>
                      )}
                      {b.reviewed && <span className="text-[#94a3b8] text-[0.75rem]">Reviewed</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Cancel modal */}
      {cancelBooking && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setCancelBooking(null); }}>
          <div className="bg-white rounded-[20px] p-7 w-full max-w-100 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
            <CancelModal booking={cancelBooking} onClose={() => setCancelBooking(null)}
              onConfirm={handleCancel} loading={cancelLoading} />
          </div>
        </div>
      )}

      {/* Review modal */}
      {reviewBooking && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setReviewBooking(null); }}>
          <div className="bg-white rounded-[20px] p-7 w-full max-w-100 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
            <ReviewModal booking={reviewBooking} onClose={() => setReviewBooking(null)}
              onSubmitted={() => setRefresh((r) => r + 1)} />
          </div>
        </div>
      )}
    </div>
  );
}
