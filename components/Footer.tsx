"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Instagram, Facebook } from "./icons";
import { usePathname } from "next/navigation";

const links = {
  "Get to know us": [
    { label: "About VFT",      href: "/about" },
    { label: "Meet the Team",  href: "/about#team" },
    { label: "Member Stories", href: "/blog" },
    { label: "Blog",           href: "/blog" },
    { label: "Events",         href: "/events" },
  ],
  "Gym": [
    { label: "Membership Plans",  href: "/membership" },
    { label: "Class Timetable",   href: "/classes" },
    { label: "Facilities",        href: "/facilities" },
    { label: "Personal Training", href: "/personal-training" },
    { label: "Wellness Walks",    href: "/wellness-walks" },
  ],
  "Help & Support": [
    { label: "FAQ",            href: "/#faq" },
    { label: "Contact Us",     href: "/contact" },
    { label: "Book Induction", href: "/contact#book" },
    { label: "Member Login",   href: "/member-login" },
  ],
  "Serious stuff": [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms" },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/member-login" || pathname.startsWith("/dashboard")) return null;

  const isHome = pathname === "/";
  const hideCTA = isHome || pathname === "/classes" || pathname === "/classes/all" || pathname === "/about" || pathname === "/facilities" || pathname === "/membership";

  return (
    <footer className="bg-[#1f2937] relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.75 z-10 bg-[#374151]" />

      {/* Subtle dot grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] bg-size-[28px_28px]"
      />

      {/* ── CTA strip ── */}
      {!hideCTA && (
        <div className="py-12 px-6 border-b border-white/10 relative z-10">
          <div className="container-max flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-white text-3xl font-black mb-1">Ready to join VFT?</h2>
              <p className="text-slate-400 text-[15px]">
                Tavistock&apos;s biggest gym. No contract. First week free.
              </p>
            </div>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 bg-white text-[#1f2937] font-bold px-8 py-3.5 rounded-lg hover:bg-[#f5f6f8] transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] shrink-0"
            >
              Find your membership <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── Main footer ── */}
      <div className="py-12 px-6 relative z-10">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">

            {/* Brand column */}
            <div className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2 flex flex-col">
              <Link href="/" className="inline-flex items-center gap-3.5 mb-5 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
                  </svg>
                </div>
                <span className="text-white font-black text-xl tracking-tight transition-colors duration-300 group-hover:text-slate-300">VFT</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                Tavistock&apos;s biggest, fully equipped gym. 24/7 access, unlimited sauna &amp; classes.
              </p>

              {/* Contact Information */}
              <div className="space-y-3.5">
                <a
                  href="tel:+441822366335"
                  className="group/contact flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-all duration-250 hover:translate-x-1"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0 transition-all duration-300 group-hover/contact:bg-white group-hover/contact:text-[#1f2937] group-hover/contact:border-white">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>+44 1822 366335</span>
                </a>
                <a
                  href="mailto:hello@vitalityfitnesstavistock.com"
                  className="group/contact flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-all duration-250 hover:translate-x-1"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0 transition-all duration-300 group-hover/contact:bg-white group-hover/contact:text-[#1f2937] group-hover/contact:border-white">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="break-all">hello@vitalityfitnesstavistock.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Tavistock, Devon, UK</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Open 24/7</span>
                </div>
              </div>

              {/* Social Media Buttons */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.instagram.com/vft.tavistock/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(links).map(([group, items]) => (
              <div key={group} className="group/col flex flex-col">
                <h3 className="text-white text-xs font-bold uppercase tracking-wider mb-5 flex flex-col gap-1.5 relative">
                  {group}
                  <span className="w-6 h-0.5 bg-slate-500 rounded-full mt-1.5 transition-all duration-300 group-hover/col:w-12 group-hover/col:bg-slate-300" />
                </h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group/link relative inline-block text-slate-400 text-sm transition-all duration-250 pl-0 hover:pl-3.5 hover:text-white before:content-['→'] before:absolute before:-left-2 before:top-1/2 before:-translate-y-1/2 before:text-slate-300 before:font-bold before:text-[0.8rem] before:opacity-0 before:transition-all before:duration-250 hover:before:left-0 hover:before:opacity-100"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <p>© {new Date().getFullYear()} Vitality Fitness Tavistock Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="relative text-slate-400 no-underline transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="relative text-slate-400 no-underline transition-colors hover:text-white">
                Terms of Use
              </Link>
              <Link href="/privacy#cookies" className="relative text-slate-400 no-underline transition-colors hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
