"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Star, Mail, Lock } from "lucide-react";
import VftLogo from "@/components/VftLogo";
import { createClient } from "@/lib/supabase/client";

export default function MemberLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        setError("Incorrect email or password. Please try again.");
      } else if (signInError.message.includes("Email not confirmed")) {
        setError("Please confirm your email first. Check your inbox.");
      } else {
        setError(signInError.message);
      }
      return;
    }

    // Success — middleware will redirect, but push just in case
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <div className="min-h-screen flex flex-row">

        {/* ── LEFT: Hero ── */}
        <div className="hidden md:flex flex-[0_0_52%] relative overflow-hidden flex-col">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-[1.02]"
            style={{ backgroundImage: "url('/hero_bg.png')" }}
          />
          {/* Deep bottom-up gradient so text pops */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/20" />
          {/* Green diagonal wash top-left */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,168,93,0.22)_0%,transparent_50%)]" />
          {/* Subtle green glow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-linear-to-t from-[rgba(0,204,112,0.07)] to-transparent pointer-events-none" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center px-8 py-6">
            <VftLogo theme="white" size={26} />
          </div>

          {/* Push content to bottom */}
          <div className="flex-1" />

          {/* Bottom content */}
          <div className="relative z-10 px-10 pb-10">

            {/* Member Portal badge */}
            <div className="inline-flex items-center gap-[0.45rem] bg-[rgba(0,204,112,0.14)] border border-[rgba(0,204,112,0.28)] rounded-[20px] px-[0.9rem] py-[0.32rem] mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00cc70] shadow-[0_0_8px_rgba(0,204,112,0.9)]" />
              <span className="text-[#00cc70] text-[0.7rem] font-extrabold tracking-[0.12em] uppercase">
                Member Portal
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-[Outfit,sans-serif] text-[clamp(2rem,3.2vw,3rem)] font-black text-white leading-[1.1] mb-4 tracking-[-0.03em]">
              Train smarter.<br />
              <span className="text-[#00cc70]">Access your account.</span>
            </h1>

            {/* Description */}
            <p className="text-white/55 text-[0.92rem] leading-[1.65] mb-8 max-w-xs">
              Book classes, track your progress, and manage your membership — all in one place.
            </p>

            {/* Stats — horizontal glass bar */}
            <div className="flex items-stretch rounded-2xl overflow-hidden border border-white/10 mb-8 bg-white/4 backdrop-blur-[10px]">
              {[
                { val: "300+", label: "Active Members" },
                { val: "20+",  label: "Weekly Classes"  },
                { val: "4.9★", label: "Member Rating"   },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 px-5 py-[1.1rem] text-center${i < 2 ? " border-r border-white/10" : ""}`}
                >
                  <p className="font-[Outfit,sans-serif] font-black text-[1.15rem] text-white m-0 tracking-[-0.02em]">{s.val}</p>
                  <p className="text-white/40 text-[0.68rem] m-0 mt-0.5 font-medium">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-[0.6rem]">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <span className="text-white/50 text-[0.8rem]">
                <strong className="text-white font-bold">4.9</strong> · Rated by 300+ members
              </span>
            </div>

          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center px-8 py-10 relative min-h-screen">
          {/* Mobile back */}
          <Link
            href="/"
            className="md:hidden absolute top-5 left-5 flex items-center gap-[0.35rem] text-[#64748b] text-[0.82rem] font-semibold no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>

          <div className="w-full max-w-100">

            {/* Mobile logo */}
            <div className="md:hidden mb-8">
              <VftLogo theme="dark" size={36} />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="font-[Outfit,sans-serif] text-[1.9rem] font-black text-[#0f172a] tracking-[-0.03em] mb-[0.35rem]">
                Welcome back 👋
              </h2>
              <p className="text-[#64748b] text-[0.9rem] m-0">
                Sign in to your VFT member account.
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="bg-[#fef2f2] border border-[rgba(239,68,68,0.2)] rounded-[10px] px-4 py-3 mb-5 flex items-center gap-[0.6rem]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                <span className="text-[#dc2626] text-[0.85rem]">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1.1rem]">

              {/* Email */}
              <div>
                <label className="block text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest mb-[0.45rem]">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-[0.8rem] pr-4 pl-11 text-[0.9rem] text-[#0f172a] outline-none transition-[border-color,background] duration-200 box-border focus:border-[#00cc70] focus:bg-white placeholder:text-[#94a3b8]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-[0.45rem]">
                  <label className="text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[#00a85d] text-[0.78rem] font-semibold no-underline hover:text-[#00cc70]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-[0.8rem] pr-[2.85rem] pl-11 text-[0.9rem] text-[#0f172a] outline-none transition-[border-color,background] duration-200 box-border focus:border-[#00cc70] focus:bg-white placeholder:text-[#94a3b8]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[0.9rem] top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-[#94a3b8] flex p-0"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-br from-[#00cc70] to-[#00a85d] text-white border-0 rounded-[10px] py-[0.95rem] font-[Outfit,sans-serif] font-extrabold text-[0.95rem] transition-[opacity,transform,box-shadow] duration-200 tracking-[-0.01em] mt-[0.15rem] flex items-center justify-center gap-2 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,204,112,0.35)] disabled:cursor-not-allowed disabled:opacity-85 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="animate-[spin_0.9s_linear_infinite] inline-block w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full" />
                    Signing in…
                  </>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-[1.6rem]">
              <div className="flex-1 h-px bg-[#e5e7eb]" />
              <span className="text-[#94a3b8] text-[0.75rem] font-medium">Don&apos;t have an account?</span>
              <div className="flex-1 h-px bg-[#e5e7eb]" />
            </div>

            {/* ── Register CTA ── */}
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 w-full bg-[#0f172a] text-white rounded-[10px] py-[0.9rem] font-[Outfit,sans-serif] font-extrabold text-[0.9rem] no-underline transition-[background,transform,box-shadow] duration-200 hover:bg-[#1e293b] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(15,23,42,0.18)]"
            >
              Register — Create Account →
            </Link>

            <p className="text-[#94a3b8] text-[0.74rem] text-center mt-4 leading-relaxed">
              New members choose a plan, fill in their details<br />and get instant access to the member portal.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
