"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, User, Mail, Lock, Phone, CheckCircle } from "lucide-react";
import VftLogo from "@/components/VftLogo";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [agreed, setAgreed]             = useState(false);
  const [form, setForm] = useState({
    fullName:        "",
    email:           "",
    phone:           "",
    dob:             "",
    password:        "",
    confirmPassword: "",
  });

  function set(field: keyof typeof form, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("Please agree to the Terms & Privacy Policy.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          phone:     form.phone,
          dob:       form.dob,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data?.session) {
      router.push("/dashboard");
    } else {
      router.push("/signup/confirm?email=" + encodeURIComponent(form.email));
    }
  }

  const inputBase =
    "w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-[0.8rem] pr-4 pl-11 text-[0.9rem] text-[#0f172a] outline-none transition-[border-color,background] duration-200 box-border focus:border-[#374151] focus:bg-white placeholder:text-[#94a3b8]";
  const label =
    "block text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest mb-[0.45rem]";

  return (
    <div className="min-h-screen flex flex-row">

      {/* ── LEFT HERO ── */}
      <div className="hidden md:flex flex-[0_0_48%] relative overflow-hidden flex-col">
        <div className="absolute inset-0 bg-cover bg-center scale-[1.02]"
          style={{ backgroundImage: "url('/gym_floor.png')" }} />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,41,55,0.22)_0%,transparent_50%)]" />

        {/* Top bar */}
        <div className="relative z-10 flex items-center px-8 py-6">
          <VftLogo theme="white" size={26} />
        </div>
        <div className="flex-1" />

        {/* Bottom content */}
        <div className="relative z-10 px-10 pb-10">
          <div className="inline-flex items-center gap-[0.45rem] bg-white/10 border border-white/20 rounded-[20px] px-[0.9rem] py-[0.32rem] mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            <span className="text-white text-[0.7rem] font-extrabold tracking-[0.12em] uppercase">Join VFT</span>
          </div>
          <h1 className="font-[Outfit,sans-serif] text-[clamp(2rem,3.2vw,3rem)] font-black text-white leading-[1.1] mb-4 tracking-[-0.03em]">
            Start your<br />
            <span className="text-white/80">fitness journey.</span>
          </h1>
          <p className="text-white/55 text-[0.92rem] leading-[1.65] mb-8 max-w-xs">
            24/7 gym access, unlimited sauna, group classes & bespoke members app — all in one membership.
          </p>
          <div className="space-y-2">
            {["No joining fee", "Cancel anytime", "Instant access", "Free first week"].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-white/80 shrink-0" />
                <span className="text-white/70 text-[0.85rem]">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center px-8 py-10 relative min-h-screen overflow-y-auto">

        {/* Mobile back */}
        <Link href="/" className="md:hidden absolute top-5 left-5 flex items-center gap-[0.35rem] text-[#64748b] text-[0.82rem] font-semibold no-underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <div className="w-full max-w-[440px]">

          {/* Mobile logo */}
          <div className="md:hidden mb-8">
            <VftLogo theme="dark" size={36} />
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="font-[Outfit,sans-serif] text-[1.9rem] font-black text-[#0f172a] tracking-[-0.03em] mb-[0.35rem]">
              Create your account
            </h2>
            <p className="text-[#64748b] text-[0.9rem] m-0">
              Fill in your details to join Vitality Fitness Tavistock.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="bg-[#fef2f2] border border-[rgba(239,68,68,0.2)] rounded-[10px] px-4 py-3 mb-5 flex items-center gap-[0.6rem]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
              <span className="text-[#dc2626] text-[0.85rem]">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.05rem]">

            {/* Full Name */}
            <div>
              <label className={label}>Full Name</label>
              <div className="relative">
                <User className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                <input type="text" required value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="John Smith" className={inputBase} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={label}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                <input type="email" required value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com" className={inputBase} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={label}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                <input type="tel" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+44 7XXX XXXXXX" className={inputBase} />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className={label}>Date of Birth</label>
              <div className="relative">
                <span className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 text-[#94a3b8] text-[0.9rem] pointer-events-none">🎂</span>
                <input type="date" value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                  className={inputBase + " [color-scheme:light]"} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={label}>Password</label>
              <div className="relative">
                <Lock className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Min. 8 characters"
                  className={inputBase + " pr-[2.85rem]"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[0.9rem] top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-[#94a3b8] flex p-0">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className={label}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                <input
                  type={showConfirm ? "text" : "password"}
                  required value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword", e.target.value)}
                  placeholder="Repeat password"
                  className={inputBase + " pr-[2.85rem]"}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-[0.9rem] top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-[#94a3b8] flex p-0">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 cursor-pointer mt-[0.15rem]">
              <div className="relative mt-[2px] shrink-0">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only" />
                <div className={`w-4.5 h-4.5 rounded border-[1.5px] flex items-center justify-center transition-all ${agreed ? "bg-[#1f2937] border-[#1f2937]" : "bg-white border-[#cbd5e1]"}`}>
                  {agreed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-[#64748b] text-[0.8rem] leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#374151] font-semibold no-underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#374151] font-semibold no-underline">Privacy Policy</Link>.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f2937] text-white border-0 rounded-[10px] py-[0.95rem] font-[Outfit,sans-serif] font-extrabold text-[0.95rem] transition-all duration-200 tracking-[-0.01em] mt-[0.25rem] flex items-center justify-center gap-2 hover:bg-[#374151] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(31,41,55,0.35)] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-[spin_0.9s_linear_infinite] inline-block w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full" />
                  Creating account…
                </>
              ) : (
                "Create Account →"
              )}
            </button>

          </form>

          {/* Sign in link */}
          <div className="flex items-center gap-3 my-[1.4rem]">
            <div className="flex-1 h-px bg-[#e5e7eb]" />
            <span className="text-[#94a3b8] text-[0.75rem]">Already a member?</span>
            <div className="flex-1 h-px bg-[#e5e7eb]" />
          </div>
          <Link href="/member-login"
            className="flex items-center justify-center w-full bg-[#0f172a] text-white rounded-[10px] py-[0.85rem] font-[Outfit,sans-serif] font-extrabold text-[0.9rem] no-underline transition-all duration-200 hover:bg-[#1e293b]">
            Sign In to your account →
          </Link>

        </div>
      </div>
    </div>
  );
}
