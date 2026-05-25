"use client";
import { useState, useEffect, useRef } from "react";
import { CheckCircle, X, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

// ── Plan selection (shown when no active membership) ──────────────────────────
const JOIN_PLANS = [
  {
    id: "essential",
    name: "Essential",
    price: "£29.99",
    color: "#64748b",
    features: ["24/7 Gym Access", "Members App", "Locker Room", "5 Classes/month"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "£44.99",
    color: "#00cc70",
    popular: true,
    features: ["24/7 Gym Access", "Unlimited Classes", "Unlimited Sauna", "Members App", "1 Guest Pass/month"],
  },
  {
    id: "elite",
    name: "Elite",
    price: "£59.99",
    color: "#6366f1",
    features: ["Everything in Premium", "4 PT Sessions/mo", "Nutrition Guidance", "Priority Booking", "VIP Locker"],
  },
];

function StartMembershipPanel({ onStarted }: { onStarted: (plan: string) => void }) {
  const supabase = useRef(createClient()).current;
  const [selected, setSelected] = useState("premium");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleStart() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    // Update profile plan
    await supabase.from("profiles").update({ plan: selected }).eq("id", user.id);

    // Insert membership row
    const renewsAt = new Date();
    renewsAt.setMonth(renewsAt.getMonth() + 1);
    await supabase.from("memberships").insert({
      user_id:    user.id,
      plan:       selected,
      price:      selected === "essential" ? 29.99 : selected === "premium" ? 44.99 : 59.99,
      status:     "active",
      started_at: new Date().toISOString(),
      renews_at:  renewsAt.toISOString(),
    });

    setLoading(false);
    setDone(true);
    setTimeout(() => onStarted(selected), 1200);
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#00cc70]" />
        </div>
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.3rem] text-[#0f172a] mb-1">Membership Started!</h3>
        <p className="text-[#64748b] text-[0.9rem]">Welcome to VFT — loading your plan…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">Start a Membership</h1>
        <p className="text-[#64748b] text-[0.9rem]">Choose the plan that fits your fitness goals.</p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {JOIN_PLANS.map((plan) => (
          <button key={plan.id} type="button" onClick={() => setSelected(plan.id)}
            className={clsx(
              "text-left border-[1.5px] rounded-2xl p-5 transition-all cursor-pointer relative",
              selected === plan.id
                ? "border-[#00cc70] bg-[#f0fdf8] shadow-[0_0_0_3px_rgba(0,204,112,0.12)]"
                : "border-[#e2e8f0] bg-white hover:border-[#cbd5e1]"
            )}>
            {plan.popular && (
              <span className="absolute top-3 right-3 bg-[#00cc70] text-white text-[0.62rem] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Popular
              </span>
            )}
            {/* Radio */}
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mb-3 ${selected === plan.id ? "border-[#00cc70]" : "border-[#cbd5e1]"}`}>
              {selected === plan.id && <div className="w-2 h-2 rounded-full bg-[#00cc70]" />}
            </div>
            <p className="font-[Outfit,sans-serif] font-black text-[1.1rem] text-[#0f172a] mb-0.5">{plan.name}</p>
            <p className="font-[Outfit,sans-serif] font-black text-[1.4rem] text-[#00cc70] mb-3">
              {plan.price}<span className="text-[#94a3b8] font-medium text-[0.75rem]">/mo</span>
            </p>
            <div className="space-y-1.5">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00a85d] shrink-0" />
                  <span className="text-[#475569] text-[0.78rem]">{f}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-linear-to-br from-[#00cc70] to-[#00a85d] text-white border-0 rounded-[12px] py-[1rem] font-[Outfit,sans-serif] font-extrabold text-[1rem] cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,204,112,0.35)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-[spin_0.9s_linear_infinite] inline-block w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full" />
            Starting membership…
          </>
        ) : (
          `Start ${JOIN_PLANS.find((p) => p.id === selected)?.name} — ${JOIN_PLANS.find((p) => p.id === selected)?.price}/mo →`
        )}
      </button>

      <p className="text-[#94a3b8] text-[0.75rem] text-center mt-3">
        No joining fee · Cancel anytime · 30 days&apos; notice to cancel
      </p>
    </div>
  );
}

const PLAN_PRICE: Record<string, string> = {
  essential: "£29.99",
  premium:   "£44.99",
  elite:     "£69.99",
};

const PLAN_FEATURES: Record<string, string[]> = {
  essential: [
    "24/7 Gym Access",
    "5 Group Classes/month",
    "Member App",
    "Locker Access",
  ],
  premium: [
    "24/7 Gym Access",
    "Unlimited Group Classes",
    "Unlimited Sauna",
    "Member App",
    "1 Guest Pass/month",
    "Priority Class Booking",
  ],
  elite: [
    "Everything in Premium",
    "Unlimited Guest Passes",
    "2 PT Sessions/month",
    "Nutrition Guidance",
    "Body Composition Scans",
    "VIP Locker Access",
  ],
};

const UPGRADE_FROM: Record<string, string | null> = {
  essential: "premium",
  premium:   "elite",
  elite:     null,
};

function FreezeModal({ onClose }: { onClose: () => void }) {
  const [weeks, setWeeks] = useState(2);
  const [reason, setReason] = useState("medical");
  const [done, setDone] = useState(false);

  const selCls = "w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[#0f172a] outline-none";
  const lblCls = "block text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest mb-[0.4rem]";

  if (done) {
    return (
      <div className="text-center py-4">
        <div className="w-13 h-13 rounded-full bg-[#eff6ff] border border-[rgba(59,130,246,0.2)] flex items-center justify-center mx-auto mb-[0.85rem]">
          <CheckCircle className="w-6.5 h-6.5 text-[#3b82f6]" />
        </div>
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.1rem] text-[#0f172a] mb-1">Freeze Requested</h3>
        <p className="text-[#64748b] text-[0.85rem] mb-[1.1rem]">We&apos;ll confirm your freeze via email within 24 hours.</p>
        <button onClick={onClose} className="bg-[#3b82f6] text-white border-0 rounded-lg px-[1.4rem] py-[0.6rem] font-[Outfit,sans-serif] font-bold cursor-pointer">Done</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-[1.1rem]">
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-[#0f172a]">Freeze Membership</h3>
        <button onClick={onClose} className="bg-[#f1f5f9] border-0 rounded-lg p-1.5 cursor-pointer text-[#64748b]"><X className="w-4 h-4" /></button>
      </div>
      <p className="text-[#64748b] text-[0.85rem] mb-[1.1rem]">Pause your membership for up to 12 weeks. A £5/month freeze fee applies.</p>
      <div className="mb-4">
        <label className={lblCls}>Duration</label>
        <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className={selCls}>
          {[2, 4, 6, 8, 12].map((w) => <option key={w} value={w}>{w} weeks</option>)}
        </select>
      </div>
      <div className="mb-5">
        <label className={lblCls}>Reason</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className={selCls}>
          <option value="medical">Medical</option>
          <option value="travel">Extended Travel</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button onClick={() => setDone(true)} className="w-full bg-[#3b82f6] text-white border-0 rounded-[10px] py-[0.8rem] font-[Outfit,sans-serif] font-extrabold text-[0.92rem] cursor-pointer">
        Request Freeze
      </button>
    </>
  );
}

function CancelModal({ plan, onClose }: { plan: string; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");

  const selCls = "w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] px-[0.85rem] py-[0.65rem] text-[0.88rem] text-[#0f172a] outline-none";
  const lblCls = "block text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest mb-[0.4rem]";

  // Calculate end date = 30 days from today
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  const endStr = endDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (step === 2) {
    return (
      <div className="text-center py-4">
        <div className="w-13 h-13 rounded-full bg-[#fef2f2] border border-[rgba(239,68,68,0.2)] flex items-center justify-center mx-auto mb-[0.85rem]">
          <CheckCircle className="w-6.5 h-6.5 text-[#ef4444]" />
        </div>
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.1rem] text-[#0f172a] mb-[0.35rem]">Cancellation Requested</h3>
        <p className="text-[#64748b] text-[0.85rem] mb-[1.1rem]">Your membership will end on {endStr}. We&apos;re sad to see you go!</p>
        <button onClick={onClose} className="bg-[#111827] text-white border-0 rounded-lg px-[1.4rem] py-[0.6rem] font-[Outfit,sans-serif] font-bold cursor-pointer">Close</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-[#0f172a]">Cancel Membership</h3>
        <button onClick={onClose} className="bg-[#f1f5f9] border-0 rounded-lg p-1.5 cursor-pointer text-[#64748b]"><X className="w-4 h-4" /></button>
      </div>
      <div className="bg-[#fffbeb] border border-[rgba(245,158,11,0.2)] rounded-[10px] p-[0.85rem] mb-[1.1rem] flex gap-[0.6rem]">
        <AlertTriangle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-[2px]" />
        <p className="text-[#374151] text-[0.82rem] m-0">30 days&apos; notice required. Your membership will end on <strong>{endStr}</strong>.</p>
      </div>
      <div className="mb-5">
        <label className={lblCls}>Reason for cancelling</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className={selCls}>
          <option value="">Select a reason…</option>
          <option value="cost">Cost</option>
          <option value="relocating">Relocating</option>
          <option value="health">Health reasons</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex gap-[0.6rem]">
        <button onClick={onClose} className="flex-1 bg-white border-[1.5px] border-[#e5e7eb] rounded-[10px] py-[0.7rem] font-[Outfit,sans-serif] font-bold text-[0.88rem] text-[#374151] cursor-pointer">
          Keep Membership
        </button>
        <button onClick={() => setStep(2)} disabled={!reason}
          className={clsx(
            "flex-1 border-0 rounded-[10px] py-[0.7rem] font-[Outfit,sans-serif] font-bold text-[0.88rem]",
            reason ? "bg-[#ef4444] text-white cursor-pointer" : "bg-[#f1f5f9] text-[#9ca3af] cursor-not-allowed"
          )}>
          Confirm Cancel
        </button>
      </div>
    </>
  );
}

interface MembershipRow {
  plan: string;
  price: number;
  status: string;
  renews_at: string | null;
  started_at: string;
}

export default function MembershipPage() {
  const supabase = useRef(createClient()).current;
  const [plan, setPlan] = useState("essential");
  const [membership, setMembership] = useState<MembershipRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMembership, setHasMembership] = useState(false);
  const [showFreeze, setShowFreeze] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profile }, { data: mem }] = await Promise.all([
        supabase.from("profiles").select("plan").eq("id", user.id).single(),
        supabase.from("memberships").select("plan, price, status, renews_at, started_at")
          .eq("user_id", user.id).eq("status", "active").order("started_at", { ascending: false }).limit(1).maybeSingle(),
      ]);

      const activePlan = profile?.plan ?? "essential";
      setPlan(activePlan);
      setMembership(mem);
      // Has membership if there's a memberships row OR profile plan is not default/unset
      setHasMembership(!!mem);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upgradeTo = UPGRADE_FROM[plan];
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
  const features = PLAN_FEATURES[plan] ?? [];

  const renewsStr = membership?.renews_at
    ? new Date(membership.renews_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  if (loading) {
    return (
      <div className="max-w-225 mx-auto">
        <div className="h-8 w-44 bg-[#e5e7eb] rounded-lg animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[1,2,3].map((i) => <div key={i} className="bg-[#f1f5f9] rounded-2xl h-48 animate-pulse" />)}
        </div>
        <div className="bg-[#e5e7eb] rounded-[12px] h-14 animate-pulse" />
      </div>
    );
  }

  // No active membership → show plan selection
  if (!hasMembership) {
    return (
      <div className="max-w-225 mx-auto">
        <StartMembershipPanel onStarted={(newPlan) => {
          setPlan(newPlan);
          setHasMembership(true);
        }} />
      </div>
    );
  }

  return (
    <div className="max-w-225 mx-auto">
      <div className="mb-6">
        <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#0f172a] tracking-[-0.03em] mb-1">My Plan</h1>
        <p className="text-[#64748b] text-[0.9rem]">Manage your membership, billing and plan details.</p>
      </div>

      {/* Current plan */}
      <div className="bg-linear-to-br from-[#111827] to-[#1f2937] rounded-[20px] p-7 mb-5 relative overflow-hidden">
        <div className="absolute -top-[30px] -right-[30px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,204,112,0.12)_0%,transparent_70%)]" />
        <div className="flex flex-wrap gap-6 justify-between items-start">
          <div>
            <p className="text-white/50 text-[0.7rem] font-bold uppercase tracking-widest mb-[0.35rem]">Current Plan</p>
            <h2 className="font-[Outfit,sans-serif] font-black text-[2rem] text-white tracking-[-0.03em] mb-1">{planName}</h2>
            <div className="flex items-baseline gap-[0.3rem] mb-[0.6rem]">
              <span className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-[#00cc70]">
                {membership ? `£${Number(membership.price).toFixed(2)}` : PLAN_PRICE[plan]}
              </span>
              <span className="text-white/40 text-[0.85rem]">/month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] rounded-full bg-[#00cc70] shadow-[0_0_6px_rgba(0,204,112,0.6)]" />
              <span className="text-white/55 text-[0.82rem]">
                Active{renewsStr ? ` · Next bill: ${renewsStr}` : ""}
              </span>
            </div>
          </div>
          <div className="grid gap-[0.4rem]">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#00cc70] shrink-0" />
                <span className="text-white/70 text-[0.82rem]">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[0.6rem] mt-6 flex-wrap">
          <button onClick={() => setShowFreeze(true)}
            className="bg-white/8 border border-white/12 rounded-[10px] px-5 py-[0.65rem] text-white font-[Outfit,sans-serif] font-bold text-[0.85rem] cursor-pointer">
            ❄️ Freeze Membership
          </button>
          <button onClick={() => setShowCancel(true)}
            className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-[10px] px-5 py-[0.65rem] text-[#fc8181] font-[Outfit,sans-serif] font-bold text-[0.85rem] cursor-pointer">
            Cancel Membership
          </button>
        </div>
      </div>

      {/* Upgrade card */}
      {upgradeTo && (
        <div className="bg-white border border-[#e5e7eb] rounded-[20px] p-6 mb-6">
          <div className="flex flex-wrap gap-5 items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-[0.35rem] bg-[#faf5ff] border border-[rgba(168,85,247,0.2)] rounded-[20px] px-[0.65rem] py-[0.2rem] mb-[0.65rem]">
                <span className="text-[#a855f7] text-[0.7rem] font-extrabold tracking-widest">UPGRADE</span>
              </div>
              <h2 className="font-[Outfit,sans-serif] font-black text-[1.4rem] text-[#0f172a] mb-[0.2rem] tracking-[-0.02em]">
                {upgradeTo.charAt(0).toUpperCase() + upgradeTo.slice(1)} Plan
              </h2>
              <div className="flex items-baseline gap-[0.3rem] mb-3">
                <span className="font-[Outfit,sans-serif] font-black text-[1.3rem] text-[#0f172a]">{PLAN_PRICE[upgradeTo]}</span>
                <span className="text-[#94a3b8] text-[0.85rem]">/month</span>
              </div>
              <div className="grid gap-[0.35rem]">
                {(PLAN_FEATURES[upgradeTo] ?? []).map((f) => (
                  <div key={f} className="flex items-center gap-[0.45rem]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#a855f7] shrink-0" />
                    <span className="text-[#475569] text-[0.82rem]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-[#a855f7] text-white border-0 rounded-xl px-6 py-3 font-[Outfit,sans-serif] font-extrabold text-[0.9rem] cursor-pointer whitespace-nowrap">
              Upgrade to {upgradeTo.charAt(0).toUpperCase() + upgradeTo.slice(1)} →
            </button>
          </div>
        </div>
      )}

      {/* Billing info notice */}
      <div className="bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)] rounded-[20px] p-5 mb-5">
        <p className="text-[#065f46] text-[0.88rem] font-semibold">
          💡 Full payment history will appear here once your first billing cycle is processed by the VFT team.
        </p>
      </div>

      {/* Modals */}
      {showFreeze && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowFreeze(false); }}>
          <div className="bg-white rounded-[20px] p-7 w-full max-w-100 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
            <FreezeModal onClose={() => setShowFreeze(false)} />
          </div>
        </div>
      )}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCancel(false); }}>
          <div className="bg-white rounded-[20px] p-7 w-full max-w-105 shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
            <CancelModal plan={plan} onClose={() => setShowCancel(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
