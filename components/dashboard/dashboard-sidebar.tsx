"use client";

// components/dashboard/dashboard-sidebar.tsx
import Link from "next/link";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, PieChart, Trophy, BookOpen, Settings, Crown } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { t: dict } = useLanguage();

  const menuItems = [
    { label: dict.dashboard.sidebar.home, href: "/dashboard", icon: Home },
    { label: dict.dashboard.sidebar.myTests, href: "/tes", icon: ClipboardList },
    { label: dict.dashboard.sidebar.analysis, href: "/analisis", icon: PieChart },
    { label: dict.dashboard.sidebar.leaderboard, href: "/peringkat", icon: Trophy },
    { label: dict.dashboard.sidebar.learn, href: "/belajar", icon: BookOpen },
    { label: dict.dashboard.sidebar.settings, href: "/pengaturan", icon: Settings },
  ];

  const bottomNavItems = [
    { label: dict.dashboard.sidebar.home, href: "/dashboard", icon: Home },
    { label: dict.dashboard.sidebar.myTests, href: "/tes", icon: ClipboardList },
    { label: dict.dashboard.sidebar.analysis, href: "/analisis", icon: PieChart },
    { label: dict.dashboard.sidebar.leaderboard, href: "/peringkat", icon: Trophy },
    { label: dict.dashboard.sidebar.more, href: "/pengaturan", icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-[260px] flex-col border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="mb-8 px-2">
          <Logo variant="full" size="md" href="/" />
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50/80 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>


      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-2 dark:border-slate-800 dark:bg-slate-950/95 lg:hidden safe-bottom">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-medium transition-colors min-w-[56px] ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              }`}
            >
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                isActive ? "bg-blue-50 dark:bg-blue-500/10" : ""
              }`}>
                <Icon className="h-[18px] w-[18px]" />
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}