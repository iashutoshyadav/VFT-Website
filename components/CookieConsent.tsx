"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { clsx } from "clsx";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vft-cookie-consent");
    if (!consent) {
      const t = setTimeout(() => {
        setVisible(true);
        setTimeout(() => setAnimating(true), 10);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (value: "accepted" | "declined") => {
    localStorage.setItem("vft-cookie-consent", value);
    setAnimating(false);
    setTimeout(() => setVisible(false), 350);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className={clsx(
        "fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        animating ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-[#111827] border-t border-white/[0.06] py-4 px-6">
        <div className="max-w-[1240px] mx-auto flex items-center gap-4 flex-wrap">

          {/* Icon + brand */}
          <div className="flex items-center gap-[0.6rem] shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#00cc70,#00a85d)] flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4 text-white" />
            </div>
            <span className="text-white [font-family:'Outfit',sans-serif] font-extrabold text-[0.85rem] tracking-[-0.01em]">
              VFT
            </span>
          </div>

          {/* Text */}
          <p className="text-white/70 text-[0.85rem] leading-[1.6] flex-[1_1_280px] m-0">
            We use cookies to improve your experience and analyse site usage.{" "}
            <Link href="/privacy#cookies" className="text-[#00cc70] underline">
              Learn more
            </Link>
          </p>

          {/* Buttons */}
          <div className="flex gap-2 items-center shrink-0">
            <button
              onClick={() => dismiss("accepted")}
              className="bg-[#00cc70] hover:bg-[#00a85d] text-white border-none rounded-[6px] py-2 px-[1.1rem] [font-family:'Outfit',sans-serif] font-bold text-[0.82rem] cursor-pointer transition-[background] duration-200 whitespace-nowrap"
            >
              Accept All
            </button>
            <button
              onClick={() => dismiss("declined")}
              className="bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/50 rounded-[6px] py-2 px-4 [font-family:'Outfit',sans-serif] font-bold text-[0.82rem] cursor-pointer transition-all duration-200 whitespace-nowrap"
            >
              Manage
            </button>
            <button
              onClick={() => dismiss("declined")}
              aria-label="Close"
              className="bg-transparent border-none text-white/40 hover:text-white cursor-pointer p-1 flex items-center justify-center rounded-[4px] transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
