"use client";

// components/dashboard/recommended-tests.tsx
import { recommendedTests } from "@/data/dashboard";
import { ArrowRight, ChevronRight, BarChart3, Triangle, PlusSquare, PieChart } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  Triangle,
  PlusSquare,
  PieChart,
};

export default function RecommendedTests() {
  const { t: dict } = useLanguage();
  return (
    <div className="mt-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
            {dict.dashboard.recommendedTests.title}
          </h3>
          <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {dict.dashboard.recommendedTests.subtitle}
          </p>
        </div>

        <button className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition">
          {dict.dashboard.recommendedTests.viewAll} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div 
        className="flex gap-4 overflow-x-auto pb-4" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recommendedTests.map((test) => {
          const Icon = iconMap[test.icon] || BarChart3;
          const translatedTest = dict.dashboard.recommendedTestsList[test.id - 1];
          const displayTitle = translatedTest?.title || test.title;
          const displayDuration = translatedTest?.duration || test.duration;
          
          return (
            <div
              key={test.id}
              className="flex min-w-[250px] shrink-0 flex-col rounded-[20px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border ${test.color}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">
                    {displayTitle}
                  </h4>
                  <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {test.questions} {dict.dashboard.recommendedTests.questions} • {displayDuration}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                <button className="w-fit rounded-lg border border-indigo-100 dark:border-indigo-500/20 px-6 py-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                  {dict.dashboard.recommendedTests.startBtn}
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Next Arrow Card */}
        <div className="flex w-16 shrink-0 items-center justify-center">
           <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition">
              <ChevronRight className="h-5 w-5" />
           </button>
        </div>
      </div>
    </div>
  );
}