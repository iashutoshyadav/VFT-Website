"use client";
import { useState, useRef } from "react";
import { Search, CheckCircle, Clock, Loader2, UserCheck } from "lucide-react";
import clsx from "clsx";

interface BookingItem {
  id: string;
  status: string;
  class: { name: string; start_time: string; duration_mins: number; instructor: string } | null;
}
interface Member {
  id: string; name: string; email: string;
  bookings: BookingItem[];
}

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
}

export default function CheckInPage() {
  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkedIn, setCheckedIn] = useState<Record<string, boolean>>({});
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(val: string) {
    setQuery(val);
    if (debounce.current) clearTimeout(debounce.current);
    if (val.length < 2) { setMembers([]); return; }
    debounce.current = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/staff/checkin?search=${encodeURIComponent(val)}`);
      const data = await res.json();
      setMembers(data.members ?? []);
      setLoading(false);
    }, 350);
  }

  async function handleCheckIn(bookingId: string) {
    setCheckingIn(bookingId);
    const res = await fetch("/api/staff/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });
    if (res.ok) setCheckedIn((prev) => ({ ...prev, [bookingId]: true }));
    setCheckingIn(null);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-7">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.7rem] text-[#0f172a] tracking-[-0.03em]">Member Check-In</h1>
        <p className="text-[#64748b] text-sm mt-0.5">Search by member name or email to mark attendance.</p>
      </div>

      {/* Search box */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search member name or email…"
          autoFocus
          className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-11 pr-4 py-3.5 text-[#0f172a] text-sm outline-none focus:border-[#374151] transition-all placeholder:text-[#94a3b8]"
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] animate-spin" />}
      </div>

      {/* Results */}
      {members.length === 0 && query.length >= 2 && !loading && (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-8 text-center">
          <p className="text-[#94a3b8] text-sm">No members found for &quot;{query}&quot;</p>
        </div>
      )}

      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden">
            {/* Member header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#f8fafc] border-b border-[#f1f5f9]">
              <div className="w-9 h-9 rounded-full bg-[#0f172a] flex items-center justify-center text-white text-[0.8rem] font-black shrink-0">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-[#0f172a] text-[0.9rem]">{member.name}</p>
                <p className="text-[#94a3b8] text-[0.75rem]">{member.email}</p>
              </div>
            </div>

            {/* Today's bookings */}
            {member.bookings.length === 0 ? (
              <p className="text-[#94a3b8] text-sm px-5 py-4">No classes booked today.</p>
            ) : (
              <div className="divide-y divide-[#f1f5f9]">
                {member.bookings.map((b) => {
                  const done = checkedIn[b.id] || b.status === "attended";
                  return (
                    <div key={b.id} className="flex items-center justify-between px-5 py-3.5 gap-4">
                      <div>
                        <p className="font-bold text-[#0f172a] text-[0.88rem]">{b.class?.name ?? "Unknown class"}</p>
                        <div className="flex items-center gap-1.5 text-[#64748b] text-[0.75rem] mt-0.5">
                          <Clock className="w-3 h-3" />
                          {b.class ? `${fmtTime(b.class.start_time)} · ${b.class.duration_mins}m · ${b.class.instructor}` : "—"}
                        </div>
                      </div>
                      <button
                        onClick={() => !done && handleCheckIn(b.id)}
                        disabled={done || checkingIn === b.id}
                        className={clsx(
                          "flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.8rem] font-bold transition-all shrink-0",
                          done
                            ? "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] cursor-default"
                            : "bg-[#0f172a] text-white hover:bg-[#1e293b] cursor-pointer"
                        )}>
                        {checkingIn === b.id
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : done
                          ? <><CheckCircle className="w-3.5 h-3.5" /> Checked In</>
                          : <><UserCheck className="w-3.5 h-3.5" /> Check In</>
                        }
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
