"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useLanguage } from "@/contexts/language-context";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Left Branding Panel — hidden on mobile */}
      <div className="relative hidden w-[480px] flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-10 lg:flex xl:w-[520px]">
        {/* Decorative pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          {/* Dot grid */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Logo variant="full" size="lg" href="/" textClassName="text-2xl text-white font-bold" />
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-extrabold leading-tight text-white xl:text-4xl">
            Ukur Potensi
            <br />
            <span className="text-blue-200">Matematikamu.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-blue-100/90">
            {t.auth.brandTagline}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {["A", "R", "D", "S"].map((c) => (
                <div
                  key={c}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-indigo-600 bg-white/20 text-xs font-bold text-white backdrop-blur-sm"
                >
                  {c}
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-100">
              <span className="font-bold text-white">50.000+</span> pengguna aktif
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="relative z-10 text-xs text-blue-200/70">
          © 2026 ReMath. All rights reserved.
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8">
          {/* Mobile logo */}
          <div className="lg:invisible">
            <Logo variant="full" size="md" href="/" />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <button
              onClick={() => setLanguage("id")}
              className={`transition hover:text-blue-600 ${
                language === "id"
                  ? "text-blue-600 font-bold dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              ID
            </button>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <button
              onClick={() => setLanguage("en")}
              className={`transition hover:text-blue-600 ${
                language === "en"
                  ? "text-blue-600 font-bold dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              EN
            </button>
            <span className="mx-1 text-slate-200 dark:text-slate-700">|</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:px-8">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
