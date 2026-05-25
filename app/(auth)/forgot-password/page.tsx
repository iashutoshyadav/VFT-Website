"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import VftLogo from "@/components/VftLogo";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-10 max-w-md w-full">

        <div className="mb-6">
          <VftLogo theme="dark" size={28} />
        </div>

        {!sent ? (
          <>
            <Link href="/member-login"
              className="flex items-center gap-1.5 text-[#64748b] text-[0.82rem] font-semibold mb-6 no-underline hover:text-[#0f172a] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>

            <h1 className="font-[Outfit,sans-serif] text-[1.7rem] font-black text-[#0f172a] tracking-[-0.03em] mb-1">
              Forgot password?
            </h1>
            <p className="text-[#64748b] text-[0.9rem] mb-6">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div className="bg-[#fef2f2] border border-[rgba(239,68,68,0.2)] rounded-[10px] px-4 py-3 mb-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                <span className="text-[#dc2626] text-[0.85rem]">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#475569] text-[0.72rem] font-bold uppercase tracking-widest mb-[0.45rem]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-[0.9rem] top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#f8fafc] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-[0.8rem] pr-4 pl-11 text-[0.9rem] text-[#0f172a] outline-none focus:border-[#00cc70] focus:bg-white transition-all placeholder:text-[#94a3b8]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-br from-[#00cc70] to-[#00a85d] text-white border-0 rounded-[10px] py-[0.95rem] font-[Outfit,sans-serif] font-extrabold text-[0.95rem] cursor-pointer transition-all hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(0,204,112,0.35)] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-[spin_0.9s_linear_infinite] inline-block w-4 h-4 border-[2.5px] border-white/35 border-t-white rounded-full" />
                    Sending…
                  </>
                ) : (
                  "Send Reset Link →"
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#f0fdf8] border border-[#00cc70]/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-[#00a85d]" />
            </div>
            <h2 className="font-[Outfit,sans-serif] text-[1.5rem] font-black text-[#0f172a] mb-2">Email sent!</h2>
            <p className="text-[#64748b] text-[0.9rem] mb-6 leading-[1.7]">
              Check your inbox at <strong className="text-[#0f172a]">{email}</strong> for the reset link.
            </p>
            <Link href="/member-login"
              className="inline-flex items-center gap-2 text-[#00a85d] font-semibold text-[0.88rem] no-underline hover:text-[#00cc70]">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
