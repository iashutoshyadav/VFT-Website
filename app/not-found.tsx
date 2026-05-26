"use client";
import Link from "next/link";
import { ArrowRight, Home, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-6">
      <div className="text-center max-w-lg w-full">

        {/* Big 404 */}
        <div className="relative mb-6">
          <p
            className="font-[Outfit,sans-serif] text-[clamp(7rem,22vw,10rem)] font-black leading-none tracking-[-0.05em] select-none bg-gradient-to-br from-[#1f2937] to-[#374151] [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          >
            404
          </p>
          {/* Dumbbell icon floating in the 0 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 border-[#e5e7eb] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <Dumbbell className="w-[26px] h-[26px] text-[#374151]" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-[Outfit,sans-serif] text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] mb-3 tracking-[-0.03em]">
          Page not found
        </h1>

        {/* Message */}
        <p className="text-[#64748b] text-base leading-[1.7] max-w-[28rem] mx-auto mb-9">
          Looks like this page skipped leg day — it doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        {/* Primary buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/membership" className="btn-secondary">
            View Membership <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-[#e5e7eb] pt-7">
          <p className="text-[#94a3b8] text-[0.75rem] font-bold uppercase tracking-[0.1em] mb-4">
            Quick links
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { label: "Classes", href: "/classes" },
              { label: "Facilities", href: "/facilities" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#475569] text-[0.9rem] font-semibold no-underline transition-colors duration-200 hover:text-[#1f2937]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
