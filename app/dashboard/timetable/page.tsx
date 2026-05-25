"use client";
import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Bell, Loader2 } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Map DAYS array index → DB day_of_week (0=Sun,1=Mon,...,6=Sat)
const ARRAY_TO_DOW = [1, 2, 3, 4, 5, 6, 0];

const CATEGORIES = ["All", "HIIT", "Yoga", "Spin", "Strength", "Boxing", "Pilates"];
const CAT_FILTER: Record<string, string> = {
  HIIT: "hiit", Yoga: "yoga", Spin: "spin",
  Strength: "strength", Boxing: "boxing", Pilates: "pilates",
};
const CAT_COLORS: Record<string, string> = {
  hiit: "#ef4444", yoga: "#6366f1", spin: "#f59e0b",
  strength: "#3b82f6", boxing: "#ec4899", pilates: "#8b5cf6", other: "#64748b",
};

interface ClassDisplay {
  id: string;
  name: string;
  class_type: string;
  instructor: string;
  start_time: string;
  duration_mins: number;
  capacity: number;
  booked_count: number;
  bookingId: string | null;
  userStatus: "book" | "booked" | "full" | "waitlist";
}

function getDateForDOW(dow: number): string {
  const today = new Date();
  const diff = (dow - today.getDay() + 7) % 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toISOString().split("T")[0];
}

function fmtTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "pm" : "am";
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${ap}`;
}

function BookingModal({
  cls, date, userId, onClose, onBooked,
}: {
  cls: ClassDisplay; date: string; userId: string;
  onClose: () => void; onBooked: () => void;
}) {
  const supabase = createClient();
  const [sms, setSms] = useState(true);
  const [email, setEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const catColor = CAT_COLORS[cls.class_type] ?? "#64748b";
  const spotsLeft = cls.capacity - cls.booked_count;
  const isFull = cls.userStatus === "full";

  async function handleBook() {
    setLoading(true);
    setError("");
    const { error: err } = await supabase.from("bookings").insert({
      user_id: userId,
      class_id: cls.id,
      class_date: date,
      status: isFull ? "waitlist" : "booked",
    });
    setLoading(false);
    if (err) {
      setError(err.code === "23505" ? "You've already booked this class." : "Booking failed. Please try again.");
      return;
    }
    setConfirmed(true);
    onBooked();
  }

  if (confirmed) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-[#00a85d]" />
        </div>
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.25rem] text-[#0f172a] mb-[0.35rem]">
          {isFull ? "Added to Waitlist!" : "Booked!"}
        </h3>
        <p className="text-[#64748b] text-[0.88rem] mb-5">
          {cls.name} at {fmtTime(cls.start_time)} — you&apos;re all set.
        </p>
        <button onClick={onClose} className="bg-[#00cc70] text-white border-0 rounded-lg px-6 py-[0.65rem] font-[Outfit,sans-serif] font-bold cursor-pointer">Done</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-start mb-5">
        <div>
          <span className="text-[0.7rem] font-extrabold rounded-[20px] px-[0.6rem] py-[0.2rem] tracking-[0.05em]"
            style={{ background: `${catColor}18`, color: catColor }}>
            {cls.class_type.toUpperCase()}
          </span>
          <h3 className="font-[Outfit,sans-serif] font-black text-[1.25rem] text-[#0f172a] mt-[0.4rem] mb-[0.15rem] tracking-[-0.02em]">{cls.name}</h3>
          <p className="text-[#64748b] text-[0.85rem]">{fmtTime(cls.start_time)} · {cls.duration_mins} min · {cls.instructor}</p>
        </div>
        <button onClick={onClose} className="bg-[#f1f5f9] border-0 rounded-lg p-1.5 cursor-pointer text-[#64748b]">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-[#f8fafc] rounded-[10px] p-3 mb-[1.1rem]">
        <div className="flex justify-between mb-[0.35rem]">
          <span className="text-[#64748b] text-[0.8rem] font-semibold">Spots remaining</span>
          <span className="font-extrabold text-[0.85rem] text-[#0f172a]">
            {isFull ? "Full — Waitlist open" : `${spotsLeft} of ${cls.capacity}`}
          </span>
        </div>
        <div className="h-1.5 bg-[#e5e7eb] rounded-full">
          <div className="h-full rounded-full bg-[#00cc70]"
            style={{ width: `${Math.min((cls.booked_count / cls.capacity) * 100, 100)}%` }} />
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-[0.4rem] mb-[0.6rem]">
          <Bell className="w-[15px] h-[15px] text-[#64748b]" />
          <span className="text-[#374151] text-[0.85rem] font-bold">Send me a reminder via</span>
        </div>
        <div className="flex gap-[0.6rem]">
          {[{ label: "SMS", val: sms, set: setSms }, { label: "Email", val: email, set: setEmail }].map(({ label, val, set }) => (
            <label key={label} className="flex items-center gap-[0.4rem] cursor-pointer">
              <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)}
                className="w-3.75 h-3.75" style={{ accentColor: "#00cc70" }} />
              <span className="text-[#475569] text-[0.85rem]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-[#ef4444] text-[0.82rem] mb-3">{error}</p>}

      <button onClick={handleBook} disabled={loading}
        className="w-full bg-[#00cc70] text-white border-0 rounded-[10px] py-[0.85rem] font-[Outfit,sans-serif] font-extrabold text-[0.95rem] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isFull ? "Join Waitlist →" : "Confirm Booking →"}
      </button>
    </>
  );
}

export default function TimetablePage() {
  const supabase = useRef(createClient()).current;
  const todayDOW = new Date().getDay();
  const defaultIdx = todayDOW === 0 ? 6 : todayDOW - 1;

  const [selectedDay, setSelectedDay] = useState(defaultIdx);
  const [selectedCat, setSelectedCat] = useState("All");
  const [bookingCls, setBookingCls] = useState<ClassDisplay | null>(null);
  const [classes, setClasses] = useState<ClassDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const targetDate = getDateForDOW(ARRAY_TO_DOW[selectedDay]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const dow = ARRAY_TO_DOW[selectedDay];
      const date = getDateForDOW(dow);

      // Fetch classes for this day
      const { data: rawClasses } = await supabase
        .from("classes")
        .select("id, name, class_type, instructor, start_time, duration_mins, capacity")
        .eq("day_of_week", dow)
        .eq("is_active", true)
        .order("start_time");

      if (!rawClasses?.length) { setClasses([]); setLoading(false); return; }

      const classIds = rawClasses.map((c) => c.id);

      // Fetch all bookings for these classes on this date
      const { data: bkgs } = await supabase
        .from("bookings")
        .select("id, class_id, user_id, status")
        .in("class_id", classIds)
        .eq("class_date", date)
        .in("status", ["booked", "attended", "waitlist"]);

      const countMap: Record<string, number> = {};
      const userMap: Record<string, { id: string; status: string }> = {};

      for (const b of bkgs ?? []) {
        if (b.status === "booked" || b.status === "attended") {
          countMap[b.class_id] = (countMap[b.class_id] ?? 0) + 1;
        }
        if (b.user_id === user.id) {
          userMap[b.class_id] = { id: b.id, status: b.status };
        }
      }

      const displayed: ClassDisplay[] = rawClasses.map((c) => {
        const booked_count = countMap[c.id] ?? 0;
        const ub = userMap[c.id];
        let userStatus: ClassDisplay["userStatus"];
        if (ub) {
          userStatus = ub.status === "waitlist" ? "waitlist" : "booked";
        } else if (booked_count >= c.capacity) {
          userStatus = "full";
        } else {
          userStatus = "book";
        }
        return { ...c, booked_count, bookingId: ub?.id ?? null, userStatus };
      });

      setClasses(displayed);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, refresh]);

  async function handleCancelFromCard(cls: ClassDisplay) {
    if (!cls.bookingId) return;
    await supabase
      .from("bookings")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", cls.bookingId);
    setRefresh((r) => r + 1);
  }

  const filtered = selectedCat === "All"
    ? classes
    : classes.filter((c) => c.class_type === CAT_FILTER[selectedCat]);

  return (
    <div className="max-w-225 mx-auto">
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">Book a Class</h1>
        <p className="text-[#64748b] text-[0.9rem]">Browse and book group classes across the week.</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-[0.4rem] bg-white border border-[#e5e7eb] rounded-xl p-[0.35rem] mb-4 overflow-x-auto">
        {DAYS.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)}
            className={clsx(
              "flex-[1_0_auto] px-3 py-[0.55rem] rounded-lg border-0 font-[Outfit,sans-serif] font-bold text-[0.82rem] cursor-pointer transition-all duration-150 whitespace-nowrap",
              selectedDay === i ? "bg-[#111827] text-white" : "bg-transparent text-[#64748b]"
            )}>
            {d}
            {ARRAY_TO_DOW[i] === todayDOW && (
              <span className="block w-1 h-1 rounded-full bg-[#00cc70] mx-auto mt-0.75" />
            )}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-[0.4rem] flex-wrap mb-5">
        {CATEGORIES.map((cat) => {
          const active = selectedCat === cat;
          const color = cat !== "All" ? (CAT_COLORS[CAT_FILTER[cat]] ?? "#64748b") : "#111827";
          return (
            <button key={cat} onClick={() => setSelectedCat(cat)}
              className="font-bold text-[0.78rem] cursor-pointer transition-all duration-150 rounded-[20px] border-[1.5px] px-[0.85rem] py-[0.35rem]"
              style={{
                border: `1.5px solid ${active ? color : "#e5e7eb"}`,
                background: active ? (cat === "All" ? "#111827" : `${color}18`) : "white",
                color: active ? (cat === "All" ? "white" : color) : "#64748b",
              }}>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Classes */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-[#e5e7eb] rounded-[14px] px-5 py-4 h-[90px] animate-pulse bg-[#f1f5f9]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-12 text-center">
          <p className="text-[#94a3b8] text-[0.9rem]">
            No {selectedCat !== "All" ? selectedCat : ""} classes on {DAYS[selectedDay]}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((cls) => {
            const pct = cls.capacity > 0 ? Math.round((cls.booked_count / cls.capacity) * 100) : 0;
            const catColor = CAT_COLORS[cls.class_type] ?? "#64748b";
            return (
              <div key={cls.id} className="bg-white border border-[#e5e7eb] rounded-[14px] px-5 py-4 flex gap-4 items-center flex-wrap">
                <div className="w-1 h-12 rounded-xs shrink-0" style={{ background: catColor }} />
                <div className="min-w-15 shrink-0">
                  <p className="font-[Outfit,sans-serif] font-extrabold text-[0.95rem] text-[#0f172a] m-0">{fmtTime(cls.start_time)}</p>
                  <p className="text-[#94a3b8] text-[0.72rem] m-0">{cls.duration_mins} min</p>
                </div>
                <div className="flex-1 min-w-35">
                  <div className="flex items-center gap-2 mb-[0.2rem] flex-wrap">
                    <p className="font-extrabold text-[0.95rem] text-[#0f172a] m-0">{cls.name}</p>
                    <span className="text-[0.65rem] font-extrabold rounded-[20px] px-2 py-[0.15rem] tracking-[0.04em]"
                      style={{ background: `${catColor}18`, color: catColor }}>
                      {cls.class_type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[#64748b] text-[0.78rem] m-0 mb-2">{cls.instructor}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.25 bg-[#e5e7eb] rounded-full">
                      <div className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: pct >= 90 ? "#ef4444" : pct >= 70 ? "#f59e0b" : "#00cc70" }} />
                    </div>
                    <span className="text-[#94a3b8] text-[0.7rem]">{cls.booked_count}/{cls.capacity}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  {cls.userStatus === "book" && (
                    <button onClick={() => setBookingCls(cls)}
                      className="bg-[#00cc70] text-white border-0 rounded-[10px] px-[1.1rem] py-[0.6rem] font-[Outfit,sans-serif] font-extrabold text-[0.85rem] cursor-pointer whitespace-nowrap">
                      Book →
                    </button>
                  )}
                  {cls.userStatus === "booked" && (
                    <button onClick={() => handleCancelFromCard(cls)}
                      className="bg-[#111827] text-white rounded-[10px] px-[0.9rem] py-[0.6rem] text-[0.82rem] font-bold whitespace-nowrap border-0 cursor-pointer hover:bg-[#ef4444] transition-colors duration-150">
                      ✅ Booked — Cancel?
                    </button>
                  )}
                  {cls.userStatus === "full" && (
                    <button onClick={() => setBookingCls(cls)}
                      className="bg-[#f3f4f6] text-[#6b7280] border-[1.5px] border-[#e5e7eb] rounded-[10px] px-[0.9rem] py-[0.6rem] text-[0.82rem] font-bold cursor-pointer whitespace-nowrap">
                      Waitlist
                    </button>
                  )}
                  {cls.userStatus === "waitlist" && (
                    <span className="bg-[#fffbeb] text-[#d97706] border border-[rgba(245,158,11,0.2)] rounded-[10px] px-[0.9rem] py-[0.6rem] text-[0.82rem] font-bold whitespace-nowrap inline-block">
                      ⏳ Waitlisted
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking modal */}
      {bookingCls && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setBookingCls(null); }}>
          <div className="bg-white rounded-[20px] p-7 w-full max-w-105 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
            <BookingModal
              cls={bookingCls}
              date={targetDate}
              userId={userId}
              onClose={() => setBookingCls(null)}
              onBooked={() => { setBookingCls(null); setRefresh((r) => r + 1); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
