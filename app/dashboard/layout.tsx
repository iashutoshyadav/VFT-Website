"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, BookOpen, CreditCard,
  User, Trophy, Bell, Menu, X, LogOut,
} from "lucide-react";
import VftLogo from "@/components/VftLogo";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard",   href: "/dashboard",               icon: LayoutDashboard },
  { label: "Book a Class",href: "/dashboard/timetable",     icon: Calendar        },
  { label: "My Bookings", href: "/dashboard/bookings",      icon: BookOpen        },
  { label: "My Plan",     href: "/dashboard/membership",    icon: CreditCard      },
  { label: "Profile",     href: "/dashboard/profile",       icon: User            },
  { label: "Achievements",href: "/dashboard/achievements",  icon: Trophy          },
  { label: "Notifications",href: "/dashboard/notifications",icon: Bell            },
];

interface AuthUser {
  id: string;
  email: string;
  name: string;
  plan: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function Sidebar({
  user,
  onClose,
  onSignOut,
}: {
  user: AuthUser;
  onClose?: () => void;
  onSignOut: () => void;
}) {
  const pathname = usePathname();
  const initials = getInitials(user.name);
  const planLabel = user.plan.charAt(0).toUpperCase() + user.plan.slice(1);

  return (
    <div className="w-70 min-h-screen bg-[#111827] flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 pt-6 pb-5 border-b border-white/6 flex items-center justify-center relative">
        <VftLogo theme="white" size={52} />
        {onClose && (
          <button type="button" onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 text-white/50 cursor-pointer p-1">
            <X className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* Member badge */}
      <div className="px-6 pt-4 pb-2">
        <div className="bg-white/8 border border-white/15 rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-white/90 text-[0.72rem] font-bold tracking-wider uppercase">
            {planLabel} Member
          </span>
          <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose}
              className={clsx(
                "flex items-center gap-3 px-3 py-[0.65rem] rounded-lg mb-0.5 no-underline transition-all duration-150",
                active
                  ? "bg-white/10 border-l-[3px] border-l-white text-white"
                  : "bg-transparent border-l-[3px] border-l-transparent text-white/60 hover:text-white/90 hover:bg-white/5"
              )}>
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className={clsx("font-[Outfit,sans-serif] text-[0.88rem]", active ? "font-bold" : "font-medium")}>
                {label}
              </span>
              {label === "Notifications" && (
                <span className="ml-auto bg-white/20 text-white rounded-[10px] px-1.75 py-px text-[0.68rem] font-extrabold">3</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user + logout */}
      <div className="px-6 py-4 border-t border-white/6">
        <div className="flex items-center gap-3 mb-[0.85rem]">
          <div className="w-9.5 h-9.5 rounded-full bg-[#374151] flex items-center justify-center shrink-0 text-white font-[Outfit,sans-serif] font-extrabold text-[0.85rem]">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-[0.85rem] m-0 overflow-hidden text-ellipsis whitespace-nowrap">{user.name}</p>
            <p className="text-white/40 text-[0.72rem] m-0 overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</p>
          </div>
        </div>
        <button type="button" onClick={onSignOut}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-white/40 text-[0.8rem] font-semibold transition-colors duration-200 p-0 hover:text-[#ef4444]">
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      // Get current session
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/member-login");
        return;
      }

      // Fetch profile from DB
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, plan")
        .eq("id", authUser.id)
        .single();

      setUser({
        id: authUser.id,
        email: authUser.email ?? "",
        name: profile?.full_name ?? authUser.email?.split("@")[0] ?? "Member",
        plan: profile?.plan ?? "essential",
      });
    }

    loadUser();

    // Listen for auth state changes (session expiry / external sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        window.location.href = "/";
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    // Hard redirect to home page — clears all React state and ensures
    // middleware sees fresh (empty) cookies instead of a cached session
    window.location.href = "/";
  }

  // Show nothing while checking auth (middleware handles redirect)
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar user={user} onSignOut={handleSignOut} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-1">
            <Sidebar user={user} onClose={() => setSidebarOpen(false)} onSignOut={handleSignOut} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden bg-[#111827] px-5 py-3 flex items-center justify-between">
          <VftLogo theme="white" size={44} />
          <button type="button" onClick={() => setSidebarOpen(true)}
            className="bg-transparent border-0 text-white cursor-pointer p-1">
            <Menu className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
