"use client";
import { useEffect, useState } from "react";
import { Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

interface GymClass {
  id: string; name: string; class_type: string; instructor: string;
  day_of_week: number; start_time: string; duration_mins: number;
  capacity: number; is_active: boolean;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CAT_COLORS: Record<string, string> = {
  hiit: "#ef4444", yoga: "#6366f1", spin: "#f59e0b",
  strength: "#3b82f6", boxing: "#ec4899", pilates: "#8b5cf6", other: "#64748b",
};
const CLASS_TYPES = ["hiit", "yoga", "spin", "strength", "boxing", "pilates", "other"];

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, "0")}` : ""}${h >= 12 ? "pm" : "am"}`;
}

const BLANK = { name: "", class_type: "hiit", instructor: "", day_of_week: 1, start_time: "06:00", duration_mins: 45, capacity: 15 };

export default function ClassesPage() {
  const supabase = createClient();
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [adding, setAdding] = useState(false);
  const [filterDay, setFilterDay] = useState<number | null>(null);

  async function load() {
    const { data } = await supabase.from("classes").select("*").order("day_of_week").order("start_time");
    setClasses(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleActive(cls: GymClass) {
    setSaving(cls.id);
    await supabase.from("classes").update({ is_active: !cls.is_active }).eq("id", cls.id);
    setClasses((prev) => prev.map((c) => c.id === cls.id ? { ...c, is_active: !c.is_active } : c));
    setSaving(null);
  }

  async function addClass() {
    if (!form.name.trim() || !form.instructor.trim()) return;
    setAdding(true);
    const { data, error } = await supabase.from("classes").insert({ ...form }).select().single();
    if (!error && data) {
      setClasses((prev) => [...prev, data].sort((a, b) => a.day_of_week - b.day_of_week || a.start_time.localeCompare(b.start_time)));
      setForm(BLANK);
      setShowForm(false);
    }
    setAdding(false);
  }

  const filtered = filterDay !== null ? classes.filter((c) => c.day_of_week === filterDay) : classes;

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
        <div>
          <h1 className="font-[Outfit,sans-serif] font-black text-[1.7rem] text-[#0f172a] tracking-[-0.03em]">Class Management</h1>
          <p className="text-[#64748b] text-sm mt-0.5">{classes.length} classes · {classes.filter((c) => c.is_active).length} active</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-[#0f172a] text-white border-0 rounded-xl px-5 py-2.5 font-bold text-sm cursor-pointer hover:bg-[#1e293b] transition-colors">
          {showForm ? "Cancel" : "+ Add Class"}
        </button>
      </div>

      {/* Add class form */}
      {showForm && (
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-6">
          <h3 className="font-black text-[#0f172a] mb-4">New Class</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { label: "Class Name", key: "name", type: "text", placeholder: "e.g. Morning HIIT" },
              { label: "Instructor", key: "instructor", type: "text", placeholder: "e.g. Jake Morris" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">{label}</label>
                <input type={type} value={(form as Record<string, string | number>)[key] as string} placeholder={placeholder}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]" />
              </div>
            ))}
            <div>
              <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">Class Type</label>
              <select value={form.class_type} onChange={(e) => setForm((p) => ({ ...p, class_type: e.target.value }))}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]">
                {CLASS_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">Day of Week</label>
              <select value={form.day_of_week} onChange={(e) => setForm((p) => ({ ...p, day_of_week: +e.target.value }))}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]">
                {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">Start Time</label>
              <input type="time" value={form.start_time} onChange={(e) => setForm((p) => ({ ...p, start_time: e.target.value }))}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]" />
            </div>
            <div>
              <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">Duration (mins)</label>
              <input type="number" min={15} max={120} value={form.duration_mins} onChange={(e) => setForm((p) => ({ ...p, duration_mins: +e.target.value }))}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]" />
            </div>
            <div>
              <label className="block text-[#475569] text-xs font-semibold uppercase tracking-wider mb-1.5">Capacity</label>
              <input type="number" min={1} max={50} value={form.capacity} onChange={(e) => setForm((p) => ({ ...p, capacity: +e.target.value }))}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#374151]" />
            </div>
          </div>
          <button onClick={addClass} disabled={adding || !form.name.trim()}
            className="flex items-center gap-2 bg-[#0f172a] text-white border-0 rounded-xl px-6 py-2.5 font-bold text-sm cursor-pointer disabled:opacity-50 hover:bg-[#1e293b] transition-colors">
            {adding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Add Class
          </button>
        </div>
      )}

      {/* Day filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button onClick={() => setFilterDay(null)}
          className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer", filterDay === null ? "bg-[#0f172a] text-white border-[#0f172a]" : "bg-white text-[#64748b] border-[#e5e7eb]")}>
          All days
        </button>
        {DAYS.map((d, i) => (
          <button key={d} onClick={() => setFilterDay(filterDay === i ? null : i)}
            className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer", filterDay === i ? "bg-[#0f172a] text-white border-[#0f172a]" : "bg-white text-[#64748b] border-[#e5e7eb]")}>
            {d}
          </button>
        ))}
      </div>

      {/* Classes table */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-12 bg-[#f1f5f9] rounded-xl animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-[#94a3b8] text-sm py-12">No classes found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f1f5f9]">
                {["Class", "Day & Time", "Instructor", "Capacity", "Status"].map((h) => (
                  <th key={h} className="text-left text-[#94a3b8] text-[0.7rem] font-bold uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {filtered.map((cls) => {
                const color = CAT_COLORS[cls.class_type] ?? "#64748b";
                return (
                  <tr key={cls.id} className={clsx("transition-colors", !cls.is_active && "opacity-50")}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: color }} />
                        <div>
                          <p className="font-bold text-[#0f172a] text-sm">{cls.name}</p>
                          <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{cls.class_type.toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#475569] text-sm">{DAYS[cls.day_of_week]} · {fmtTime(cls.start_time)} · {cls.duration_mins}m</td>
                    <td className="px-5 py-3.5 text-[#475569] text-sm">{cls.instructor}</td>
                    <td className="px-5 py-3.5 text-[#475569] text-sm">{cls.capacity} spots</td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => toggleActive(cls)} disabled={saving === cls.id}
                        className="flex items-center gap-1.5 cursor-pointer border-0 bg-transparent p-0">
                        {saving === cls.id
                          ? <Loader2 className="w-5 h-5 text-[#94a3b8] animate-spin" />
                          : cls.is_active
                          ? <ToggleRight className="w-6 h-6 text-[#374151]" />
                          : <ToggleLeft className="w-6 h-6 text-[#d1d5db]" />
                        }
                        <span className={clsx("text-[0.75rem] font-bold", cls.is_active ? "text-[#374151]" : "text-[#d1d5db]")}>
                          {cls.is_active ? "Active" : "Inactive"}
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
