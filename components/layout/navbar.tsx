'use client';
// components/layout/navbar.tsx
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, User as UserIcon, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../theme-toggle";
import Logo from "../Logo";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const navItems = [
    { label: t.navbar.home, href: isAuthenticated ? (user?.role === 'admin' ? '/admin/questions' : '/dashboard') : '/' },
    { label: t.navbar.test, href: "/tes" },
    { label: t.navbar.features, href: "/#fitur" },
    { label: t.navbar.leaderboard, href: "/peringkat" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <div className="flex items-center">
          <div className="hidden sm:block">
            <Logo
              variant="full"
              size="md"
              href={isAuthenticated ? (user?.role === 'admin' ? '/admin/questions' : '/dashboard') : '/'}
            />
          </div>
          <div className="block sm:hidden">
            <Logo
              variant="icon"
              size="sm"
              href={isAuthenticated ? (user?.role === 'admin' ? '/admin/questions' : '/dashboard') : '/'}
            />
          </div>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="mr-1 hidden items-center gap-2 md:flex text-sm font-medium">
            <button 
              onClick={() => setLanguage('id')}
              className={`transition hover:text-blue-600 ${language === 'id' ? 'text-blue-600 font-bold dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              ID
            </button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`transition hover:text-blue-600 ${language === 'en' ? 'text-blue-600 font-bold dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
            >
              EN
            </button>
            <span className="mx-2 text-slate-200 dark:text-slate-800">|</span>
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 sm:gap-3 border-l border-slate-200 pl-4 dark:border-slate-800 transition hover:opacity-80"
              >
                <div className="flex h-9 w-9 overflow-hidden items-center justify-center rounded-full border-2 border-slate-200 bg-slate-100 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:h-10 sm:w-10">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.username || user.firstName || user.name.split(' ')[0]}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{user.role === 'user' ? 'Pelajar' : 'Administrator'}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 overflow-hidden">
                  <div className="p-1">
                    <Link 
                      href={user.role === 'admin' ? '/admin/questions' : '/dashboard'}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link 
                      href="/pengaturan"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                    >
                      <UserIcon className="h-4 w-4" />
                      Lihat Profile
                    </Link>
                    <button 
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:inline-flex sm:px-5 sm:py-2.5"
              >
                {t.navbar.login}
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 sm:inline-flex sm:px-5 sm:py-2.5"
              >
                {t.navbar.register}
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[57px] z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950 lg:hidden sm:p-6"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <button 
                    onClick={() => setLanguage('id')}
                    className={`transition hover:text-blue-600 ${language === 'id' ? 'text-blue-600 font-bold dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    ID
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`transition hover:text-blue-600 ${language === 'en' ? 'text-blue-600 font-bold dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    EN
                  </button>
                  <span className="mx-2 text-slate-200 dark:text-slate-800">|</span>
                  <ThemeToggle />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={user.role === 'admin' ? '/admin/questions' : '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex h-9 w-9 overflow-hidden shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.username || user.firstName || user.name.split(' ')[0]}</span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">Dashboard {user.role}</span>
                      </div>
                    </Link>
                    <button 
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 px-4 py-3 border border-red-100 dark:bg-red-500/10 dark:border-red-900/30 dark:text-red-400 font-semibold text-sm transition"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {t.navbar.login}
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    >
                      {t.navbar.register}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}