"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import VftLogo from "@/components/VftLogo";

function ConfirmContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "your email";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-10">

      {/* Logo */}
      <div className="mb-8">
        <VftLogo theme="dark" size={40} />
      </div>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-[#e5e7eb] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* Green header strip */}
        <div className="bg-[#00cc70] px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/8 translate-y-1/2 -translate-x-1/3" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-[Outfit,sans-serif] font-black text-[1.6rem] text-white tracking-[-0.02em] mb-1">
              Check your inbox
            </h1>
            <p className="text-white/80 text-[0.88rem]">Almost there — one step left!</p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-7">
          <p className="text-[#374151] text-[0.9rem] leading-[1.65] mb-6">
            We sent a confirmation link to{" "}
            <strong className="text-[#0f172a]">{email}</strong>.<br />
            Click that link to activate your VFT account and access your member portal.
          </p>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {[
              "Open the email from VFT",
              'Click "Confirm your email"',
              "You'll go straight to your member portal 🎉",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f0fdf8] border border-[rgba(0,168,93,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#00a85d] text-[0.7rem] font-extrabold">{i + 1}</span>
                </div>
                <p className="text-[#475569] text-[0.85rem] leading-snug">{step}</p>
              </div>
            ))}
          </div>

          {/* Portal preview tiles */}
          <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-xl p-4 mb-5">
            <p className="text-[#64748b] text-[0.7rem] font-bold uppercase tracking-widest mb-3">
              Your member portal includes
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["📅 Book classes", "🏆 Achievements", "💳 Manage plan", "🔔 Notifications", "👤 My profile", "📖 My bookings"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00a85d] shrink-0" />
                  <span className="text-[#374151] text-[0.78rem] font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[#94a3b8] text-[0.78rem] text-center mb-5">
            Didn&apos;t receive it? Check your spam folder, or{" "}
            <Link href="/signup" className="text-[#00a85d] font-semibold no-underline">try again</Link>.
          </p>

          <Link href="/member-login"
            className="flex items-center justify-center gap-2 w-full bg-[#0f172a] text-white rounded-[10px] py-[0.85rem] font-[Outfit,sans-serif] font-extrabold text-[0.9rem] no-underline hover:bg-[#1e293b] transition-colors duration-150">
            Go to Sign In <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <p className="text-[#94a3b8] text-[0.75rem] mt-6">
        Need help?{" "}
        <a href="mailto:hello@vitalityfitnesstavistock.com" className="text-[#00a85d] no-underline">
          hello@vitalityfitnesstavistock.com
        </a>
      </p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#00cc70] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  );
}
