import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BarChart2, CheckSquare, LayoutDashboard, Calendar, LogOut } from "lucide-react";

export const metadata = { title: "Staff Portal | VFT" };

const NAV = [
  { href: "/staff",           label: "Overview",   icon: LayoutDashboard },
  { href: "/staff/checkin",   label: "Check-In",   icon: CheckSquare     },
  { href: "/staff/classes",   label: "Classes",    icon: Calendar        },
  { href: "/staff/analytics", label: "Analytics",  icon: BarChart2       },
];

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/member-login");

  const staffEmails = (process.env.STAFF_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  if (!staffEmails.includes(user.email!)) redirect("/dashboard");

  const firstName = (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "Staff";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0f172a] flex flex-col min-h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-white/50 text-[0.65rem] font-extrabold uppercase tracking-widest mb-0.5">VFT</p>
          <p className="text-white font-black text-sm">Staff Portal</p>
        </div>
        <div className="px-3 py-4 flex-1">
          <p className="text-white/30 text-[0.62rem] font-bold uppercase tracking-widest px-2 mb-2">Navigation</p>
          <nav className="space-y-0.5">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all text-[0.82rem] font-semibold no-underline">
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-2.5 px-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-[0.7rem] font-black shrink-0">
              {firstName[0]}
            </div>
            <div>
              <p className="text-white text-[0.78rem] font-bold leading-none">{firstName}</p>
              <p className="text-white/40 text-[0.65rem]">Staff</p>
            </div>
          </div>
          <Link href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all text-[0.78rem] font-semibold no-underline">
            <LogOut className="w-3.5 h-3.5" /> Back to Member Portal
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 min-w-0">
        {children}
      </main>
    </div>
  );
}
