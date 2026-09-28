'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { 
  Trophy, 
  Menu, 
  X, 
  LogOut, 
  Compass, 
  BrainCircuit,
  FileCheck2,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isAdminBadge?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, isAdminLoggedIn, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check admin status
  const isAdmin = isAdminLoggedIn || isAuthenticated;

  // Base navigation links visible to all users (Guests & Admins)
  const baseLinks: NavItem[] = [
    { label: 'Beranda', href: '/', icon: Compass },
    { label: 'Tes Diagnostik', href: '/test', icon: BrainCircuit, badge: 'Adaptif' },
    { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  // Admin-only links (Strictly revealed ONLY when logged in as admin)
  const adminLinks: NavItem[] = [
    { label: 'Kelola Bank Soal', href: '/admin/questions', icon: FileCheck2, isAdminBadge: true },
  ];

  // Active links based on role
  const navLinks: NavItem[] = isAdmin ? [...baseLinks, ...adminLinks] : baseLinks;

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    if (href === '/test' && pathname.startsWith('/tes')) return true;
    if (href === '/leaderboard' && pathname.startsWith('/peringkat')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5 lg:px-8">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/60'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                    {item.badge}
                  </span>
                )}
                {item.isAdminBadge && (
                  <span className="ml-1 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* Role-based Controls */}
          {isAdmin ? (
            /* Logged-In Admin Controls */
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Admin Aktif</span>
              </div>
              <button
                onClick={logout}
                title="Keluar dari sesi Admin"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Subtle Discreet Login Admin link in top corner */
            <div className="hidden sm:flex items-center pl-2 border-l border-slate-200 dark:border-slate-800">
              <Link
                href="/admin/login"
                title="Portal Masuk Administrator"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900 transition"
              >
                <Lock className="h-3.5 w-3.5 opacity-70" />
                <span className="text-[11px]">Login Admin</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                  {item.isAdminBadge && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Mobile Admin Section */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              {isAdmin ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-semibold">Login sebagai Super Admin</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 transition"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Keluar dari Admin</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 opacity-60" />
                    <span>Masuk sebagai Admin</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Portal Soal</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
