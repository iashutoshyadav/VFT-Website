"use client";
import { useState } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Membership", href: "/membership" },
  { label: "Classes",    href: "/classes"    },
  { label: "Facilities", href: "/facilities" },
  {
    label: "About",
    href: "/about",
    sub: [
      { label: "Our Story",    href: "/about"       },
      { label: "Meet the Team", href: "/about#team" },
      { label: "Contact Us",   href: "/contact"     },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on auth + dashboard routes — these have their own chrome
  if (pathname === "/member-login" || pathname.startsWith("/dashboard")) return null;

  return (
    <>
      {/* ── Fixed Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-[#e5e7eb]">
        <div className="container-max px-6 h-[68px] flex items-center justify-between gap-4">

          {/* LEFT: Menu button + Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger pill button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-[#f3f4f6] border border-[#e5e7eb] text-[#111827] rounded-full px-4 py-2 cursor-pointer transition-colors duration-200 shrink-0"
              aria-label="Open menu"
            >
              {/* Three lines icon */}
              <span className="flex flex-col gap-[4px]">
                <span className="w-4 h-[2px] bg-[#111827] rounded-full block" />
                <span className="w-4 h-[2px] bg-[#111827] rounded-full block" />
                <span className="w-4 h-[2px] bg-[#111827] rounded-full block" />
              </span>
              <span className="text-[#111827] text-[0.82rem] font-bold tracking-wide hidden sm:block">
                Menu
              </span>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img
                src="/vft-full-logo.svg"
                alt="VFT Logo"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* RIGHT: Sign In + Join */}
          <div className="flex items-center gap-4">
            <Link
              href="/member-login"
              className="text-[#4b5563] hover:text-[#111827] font-bold text-sm tracking-wide transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center justify-center gap-1.5 bg-[#00cc70] hover:bg-[#00a85d] text-white rounded-full cursor-pointer font-bold text-[15px] transition-all hover:scale-105 shrink-0 whitespace-nowrap pl-[28px] pr-[18px] py-2.5"
            >
              Join
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

        </div>
      </nav>

      {/* ── Full-screen Menu Drawer ── */}
      <div className={clsx(
        "fixed inset-0 z-[100] transition-all duration-300",
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div className={clsx(
          "absolute top-0 left-0 h-full w-[320px] sm:w-[380px] bg-white flex flex-col transition-transform duration-300 shadow-[4px_0_40px_rgba(0,0,0,0.15)]",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-[68px] border-b border-[#e5e7eb]">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center group">
              <img src="/vft-full-logo.svg" alt="VFT Logo" className="h-10 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full hover:bg-[#f3f4f6] text-[#6b7280] cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 text-[#111827] font-extrabold text-[1.1rem] hover:text-[#00cc70] border-b border-[#f3f4f6] transition-colors group"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-[#d1d5db] group-hover:text-[#00cc70] transition-colors" strokeWidth={2.5} />
                </Link>
                {link.sub && (
                  <div className="pl-4 py-1 space-y-0.5">
                    {link.sub.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center py-2 text-[0.875rem] font-semibold text-[#6b7280] hover:text-[#111827] transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Drawer footer CTAs */}
          <div className="px-6 py-6 border-t border-[#e5e7eb] bg-[#f9fafb] space-y-3">
            <Link
              href="/member-login"
              onClick={() => setMenuOpen(false)}
              className="block text-center py-3 border border-[#e5e7eb] bg-white rounded-xl text-[#4b5563] text-sm font-bold hover:border-[#d1d5db] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/membership"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#00cc70] hover:bg-[#00a85d] text-white font-bold text-[0.9rem] py-3.5 rounded-xl no-underline transition-colors"
            >
              Join Now — From £29.99/mo
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
