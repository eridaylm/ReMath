'use client';

import { useState } from "react";
import { Search, Bell, X, ChevronDown, User, LogOut } from "lucide-react";
import Link from 'next/link';
import Logo from '../Logo';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from "../theme-toggle";
import { useLanguage } from "@/contexts/language-context";
import { useTest } from '@/context/TestContext';

export default function AdminHeader() {
  const { user, logout, allUsers } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { questions } = useTest();
  
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Dynamic notification data
  const recentUser = allUsers.find(u => u.role === 'user' && u.lastAccess) || allUsers.find(u => u.role === 'user');
  const recentUserName = recentUser ? (recentUser.firstName || recentUser.name.split(' ')[0]) : "Calizha";
  const recentUserTime = recentUser?.lastAccess ? `Akses: ${recentUser.lastAccess}` : "Baru saja";

  const recentQuestion = questions.length > 0 ? questions[questions.length - 1] : null;
  const recentQCategory = recentQuestion ? `${recentQuestion.subtopic} ${recentQuestion.level}` : "Geometri SMA";
  const recentQTime = recentQuestion?.id?.startsWith('Q-') ? "Baru saja" : "Beberapa waktu lalu";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Logo href="/" />

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium mr-2">
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

          {/* Notification Button */}
          <div className="relative">
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm sm:h-10 sm:w-10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute top-1.5 right-2 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-white dark:ring-slate-800 sm:top-2 sm:right-2.5">
                2
              </span>
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
                <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white">Aktivitas Sistem</h3>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">2 Baru</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
                  <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Pengguna Baru Login</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1"><span className="font-medium text-slate-700 dark:text-slate-300">{recentUserName}</span> telah masuk ke sistem.</p>
                      <p className="mt-1 text-[10px] font-medium text-blue-600 dark:text-blue-500">{recentUserTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                      <span className="font-bold">+</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Soal Baru Ditambahkan</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1"><span className="font-medium text-slate-700 dark:text-slate-300">Sistem/Admin</span> menambahkan soal baru di kategori <span className="font-medium">{recentQCategory}</span>.</p>
                      <p className="mt-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-500">{recentQTime}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-100 p-3 text-center dark:border-slate-800 rounded-b-2xl bg-slate-50 dark:bg-slate-900">
                  <button 
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Tandai semua dibaca
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 sm:gap-3 border-l border-slate-200 pl-3 sm:pl-4 dark:border-slate-800 transition hover:opacity-80"
            >
              <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-slate-200 bg-blue-50 text-blue-700 dark:border-slate-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center sm:h-10 sm:w-10">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-bold">
                    {getInitials(user?.name || '')}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.username || user?.firstName || 'Administrator'}</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 capitalize">
                  {user?.role === 'admin' ? 'Admin' : 'Pelajar'}
                </p>
              </div>
              <ChevronDown className={`hidden sm:block h-4 w-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 overflow-hidden">
                <div className="p-1">
                  <Link 
                    href="/pengaturan" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    <User className="h-4 w-4" />
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
        </div>
        
      </div>
    </header>
  );
}
