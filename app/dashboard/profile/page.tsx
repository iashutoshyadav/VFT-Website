"use client";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, Camera, Loader2 } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

const FITNESS_GOALS = ["Lose Weight", "Build Muscle", "Flexibility", "Endurance", "General Fitness", "Stress Relief"];

interface NotifPref {
  label: string;
  sms: boolean;
  email: boolean;
}

const inputCls = "w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[#0f172a] outline-none box-border focus:border-[#374151] transition-colors duration-150";
const labelCls = "block text-[#475569] text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-[0.4rem]";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function planLabel(plan: string): string {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export default function ProfilePage() {
  const supabase = useRef(createClient()).current;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [authEmail, setAuthEmail] = useState("");
  const [plan, setPlan] = useState("essential");
  const [memberSince, setMemberSince] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [notifs, setNotifs] = useState<NotifPref[]>([
    { label: "Class Reminders",      sms: true,  email: true  },
    { label: "Booking Confirmations", sms: false, email: true  },
    { label: "Streak Alerts",         sms: true,  email: false },
    { label: "Offers & Promotions",   sms: false, email: true  },
    { label: "Account Updates",       sms: false, email: true  },
  ]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setAuthEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, plan, emergency_name, emergency_phone, created_at")
        .eq("id", user.id)
        .single();

      if (profile) {
        const parts = (profile.full_name ?? "").split(" ");
        setForm({
          firstName: parts[0] ?? "",
          lastName: parts.slice(1).join(" "),
          phone: profile.phone ?? "",
          emergencyName: profile.emergency_name ?? "",
          emergencyPhone: profile.emergency_phone ?? "",
          emergencyRelation: "",
        });
        setPlan(profile.plan ?? "essential");
        if (profile.created_at) {
          setMemberSince(new Date(profile.created_at).toLocaleDateString("en-GB", {
            month: "long", year: "numeric",
          }));
        }
      }
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullName = `${form.firstName} ${form.lastName}`.trim() || "Member";
  const initials = getInitials(fullName);

  async function handleSave() {
    setSaving(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error: err } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone: form.phone || null,
        emergency_name: form.emergencyName || null,
        emergency_phone: form.emergencyPhone || null,
      })
      .eq("id", user.id);

    setSaving(false);
    if (err) { setError("Failed to save. Please try again."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const toggleGoal = (g: string) =>
    setGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);

  const toggleNotif = (idx: number, key: "sms" | "email") =>
    setNotifs((prev) => prev.map((n, i) => i === idx ? { ...n, [key]: !n[key] } : n));

  if (loading) {
    return (
      <div className="max-w-190 mx-auto">
        <div className="h-8 w-40 bg-[#e5e7eb] rounded-lg animate-pulse mb-6" />
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-5 mb-5 h-24 animate-pulse" />
        <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-5 h-48 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-190 mx-auto">
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">My Profile</h1>
        <p className="text-[#64748b] text-[0.9rem]">Keep your details up to date.</p>
      </div>

      {/* Avatar card */}
      <div className="flex items-center gap-5 bg-white border border-[#e5e7eb] rounded-2xl p-5 mb-5">
        <div className="relative">
          <div className="w-18 h-18 rounded-full bg-[#374151] flex items-center justify-center text-white font-[Outfit,sans-serif] font-black text-[1.4rem]">
            {initials}
          </div>
          <button className="absolute bottom-0 right-0 w-6.5 h-6.5 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center cursor-pointer">
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>
        <div>
          <p className="font-[Outfit,sans-serif] font-extrabold text-[1.1rem] text-[#0f172a] mb-[0.1rem]">{fullName}</p>
          {memberSince && <p className="text-[#64748b] text-[0.82rem] m-0 mb-[0.4rem]">Member since {memberSince}</p>}
          <span className="bg-[#f5f6f8] text-[#374151] border border-[#e5e7eb] rounded-[20px] px-[0.65rem] py-[0.2rem] text-[0.72rem] font-extrabold">
            {planLabel(plan)} Member
          </span>
        </div>
      </div>

      {/* Personal details */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-[1.1rem]">Personal Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>First Name</label>
            <input className={inputCls} value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Last Name</label>
            <input className={inputCls} value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" className={inputCls + " opacity-60 cursor-not-allowed"} value={authEmail} readOnly />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" className={inputCls} value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+44 7700 900000" />
          </div>
        </div>
      </div>

      {/* Fitness goals */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-[0.35rem]">Fitness Goals</h2>
        <p className="text-[#94a3b8] text-[0.82rem] mb-4">Select all that apply.</p>
        <div className="flex flex-wrap gap-2">
          {FITNESS_GOALS.map((g) => {
            const active = goals.includes(g);
            return (
              <button key={g} onClick={() => toggleGoal(g)}
                className={clsx(
                  "px-4 py-[0.45rem] rounded-[20px] border-[1.5px] font-bold text-[0.82rem] cursor-pointer transition-all duration-150",
                  active ? "border-[#374151] bg-[#f5f6f8] text-[#1f2937]" : "border-[#e5e7eb] bg-white text-[#64748b]"
                )}>
                {active && "✓ "}{g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Emergency contact */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-5">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-[1.1rem]">Emergency Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name</label>
            <input className={inputCls} value={form.emergencyName}
              onChange={(e) => setForm({ ...form, emergencyName: e.target.value })}
              placeholder="e.g. Jane Smith" />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" className={inputCls} value={form.emergencyPhone}
              onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
              placeholder="+44 7700 900000" />
          </div>
          <div>
            <label className={labelCls}>Relationship</label>
            <input className={inputCls} value={form.emergencyRelation}
              onChange={(e) => setForm({ ...form, emergencyRelation: e.target.value })}
              placeholder="e.g. Partner" />
          </div>
        </div>
      </div>

      {/* Notification preferences */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 mb-6">
        <h2 className="font-[Outfit,sans-serif] font-extrabold text-base text-[#0f172a] mb-4">Notification Preferences</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.82rem]">
            <thead>
              <tr>
                <th className="text-left text-[#94a3b8] font-bold pb-[0.65rem] pr-4 whitespace-nowrap">Type</th>
                {["SMS", "Email"].map((h) => (
                  <th key={h} className="text-center text-[#94a3b8] font-bold pb-[0.65rem] px-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifs.map((n, i) => (
                <tr key={n.label} className="border-t border-[#f1f5f9]">
                  <td className="py-[0.65rem] pr-2 pl-0 text-[#374151] font-semibold whitespace-nowrap">{n.label}</td>
                  {(["sms", "email"] as const).map((key) => (
                    <td key={key} className="text-center px-3 py-[0.65rem]">
                      <input type="checkbox" checked={n[key]} onChange={() => toggleNotif(i, key)}
                        className="w-4 h-4 cursor-pointer" style={{ accentColor: "#374151" }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {error && <p className="text-[#ef4444] text-[0.85rem] mb-3">{error}</p>}

      {/* Save button */}
      <button onClick={handleSave} disabled={saving}
        className={clsx(
          "w-full text-white border-0 rounded-xl py-[0.95rem] font-[Outfit,sans-serif] font-extrabold text-base cursor-pointer flex items-center justify-center gap-2 transition-[background] duration-200 disabled:opacity-70",
          saved ? "bg-[#374151]" : "bg-[#1f2937]"
        )}>
        {saving
          ? <><Loader2 className="w-4.5 h-4.5 animate-spin" />Saving…</>
          : saved
          ? <><CheckCircle className="w-4.5 h-4.5" />Changes Saved!</>
          : "Save Changes"}
      </button>
    </div>
  );
}
