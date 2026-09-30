"use client";

// components/dashboard/strength-weakness-card.tsx
import { topicScores } from "@/data/dashboard";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function StrengthWeaknessCard() {
  const { t: dict } = useLanguage();
  const strongest = topicScores.slice(0, 3);
  const weakest = topicScores.slice(3, 6);

  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">{dict.dashboard.strengthWeakness.title}</h3>

      <div className="mt-6 space-y-6 flex-1">
        <div>
          <p className="mb-3 text-[11px] font-bold text-emerald-500 capitalize tracking-wider">{dict.dashboard.strengthWeakness.strongest}</p>
          <div className="space-y-3">
            {strongest.map((topic, index) => {
              const translatedTopicName = dict.dashboard.topicScoresList[index] || topic.name;
              return (
              <div key={topic.name} className="flex items-center gap-3 text-[13px]">
                <span className="font-bold text-emerald-500 w-4">{index + 1}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex-1">{translatedTopicName}</span>
                <span className="font-black text-slate-900 dark:text-white">{topic.score} <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">/1000</span></span>
              </div>
            )})}
          </div>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-bold text-rose-500 capitalize tracking-wider">{dict.dashboard.strengthWeakness.weakest}</p>
          <div className="space-y-3">
            {weakest.map((topic, index) => {
              const translatedTopicName = dict.dashboard.topicScoresList[index + 3] || topic.name;
              return (
              <div key={topic.name} className="flex items-center gap-3 text-[13px] bg-rose-50/40 dark:bg-rose-950/20 -mx-3 px-3 py-1.5 rounded-lg">
                <span className="font-bold text-rose-500 w-4">{index + 1}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex-1">{translatedTopicName}</span>
                <span className="font-black text-slate-900 dark:text-white">{topic.score} <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">/1000</span></span>
              </div>
            )})}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
         <button className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition">
           {dict.dashboard.strengthWeakness.viewAnalysis} <ChevronRight className="h-3.5 w-3.5" />
         </button>
      </div>
    </div>
  );
}