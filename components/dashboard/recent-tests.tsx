"use client";

// components/dashboard/recent-tests.tsx
import { recentTests } from "@/data/dashboard";
import { ArrowRight, BookOpen, Triangle, Code2, BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Triangle, Code2, BarChart
};

export default function RecentTests() {
  const { t: dict } = useLanguage();
  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
         <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.recentTests.title}</h3>
         <button className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition">
          {dict.dashboard.recentTests.viewAll} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-5 flex-1">
        {recentTests.length === 0 ? (
           <div className="flex h-full flex-col items-center justify-center text-center opacity-70">
              <BookOpen className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">{dict.dashboard.recentTests.empty}</p>
           </div>
        ) : (
          recentTests.map((test, index) => {
            const Icon = iconMap[test.icon] || BookOpen;
            const translatedTest = (dict.dashboard.recentTestsList as any[])[index];
            const displayTitle = translatedTest?.title || test.title;
            const displayDate = translatedTest?.date || test.date;
            
            return (
              <div key={test.title} className="flex items-center gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${test.color}`}>
                   <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="flex-1">
                   <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">{displayTitle}</h4>
                   <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{displayDate}</p>
                </div>
                <div className="text-right">
                   <p className="text-[17px] font-black text-slate-900 dark:text-white leading-none">{test.score}</p>
                   <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1">/1000</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}
