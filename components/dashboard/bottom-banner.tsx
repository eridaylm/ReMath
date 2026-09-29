"use client";

// components/dashboard/bottom-banner.tsx
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function BottomBanner() {
  const { t: dict } = useLanguage();
  return (
    <div className="mt-8 rounded-[24px] bg-gradient-to-br from-white to-blue-100 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-800 p-8 md:p-10 text-slate-900 dark:text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/40 dark:from-slate-800/40 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl">
         <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">{dict.dashboard.bottomBanner.title}</h2>
         <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{dict.dashboard.bottomBanner.subtitle}</p>
      </div>

      <button className="relative z-10 shrink-0 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-[13px] font-bold text-white transition hover:bg-blue-700 shadow-md whitespace-nowrap">
         {dict.dashboard.bottomBanner.btnText} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
