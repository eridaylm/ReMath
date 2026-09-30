'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import { BookOpen, Calculator, Shapes, LineChart, Hash, PlayCircle, Lock, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';

// dummy data
const modules = [
  { id: 'aljabar', titleKey: 'aljabar', levelKey: 'levelSmp', icon: Calculator, progress: 0, total: 5, color: 'bg-blue-500', locked: false },
  { id: 'geometri', titleKey: 'geometri', levelKey: 'levelSma', icon: Shapes, progress: 0, total: 4, color: 'bg-emerald-500', locked: true },
  { id: 'kalkulus', titleKey: 'kalkulus', levelKey: 'levelSmaAdvanced', icon: LineChart, progress: 0, total: 6, color: 'bg-purple-500', locked: true },
  { id: 'statistika', titleKey: 'statistika', levelKey: 'levelSd', icon: Hash, progress: 0, total: 5, color: 'bg-orange-500', locked: true },
];

export default function BelajarPage() {
  const { user } = useAuth();
  const { t: dict } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (!user) return null;

  const pageContent = (
    <div className="max-w-6xl mx-auto space-y-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {dict.dashboard.learnPage.title.replace('{name}', user.firstName || user.username || dict.dashboard.header.roleUser)}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">{dict.dashboard.learnPage.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(mod => (
          <div key={mod.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition">
            <div className={`h-24 ${mod.color} p-6 flex items-center justify-between relative overflow-hidden`}>
               <div className="relative z-10 text-white">
                 <h3 className="font-bold text-lg">{(dict.dashboard.learnPage.modules as any)[mod.titleKey]}</h3>
                 <p className="text-sm opacity-90">{(dict.dashboard.learnPage.modules as any)[mod.levelKey]}</p>
               </div>
               <mod.icon className="h-16 w-16 text-white opacity-20 absolute -right-2 -bottom-2" />
            </div>
            <div className="p-5">
               <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                 <span>{dict.dashboard.learnPage.progress}</span>
                 <span>{mod.progress}/{mod.total} {dict.dashboard.learnPage.video}</span>
               </div>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-6">
                 <div className={`${mod.color} h-2 rounded-full`} style={{ width: `${(mod.progress/mod.total)*100}%` }}></div>
               </div>
               <button 
                 onClick={() => !mod.locked && setSelectedModule(mod.id)}
                 className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition
                 ${mod.locked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-900/60'}`}
               >
                 {mod.locked ? (
                   <><Lock className="h-4 w-4" /> {dict.dashboard.learnPage.locked}</>
                 ) : (
                   <><PlayCircle className="h-4 w-4" /> {dict.dashboard.learnPage.startLearn}</>
                 )}
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Module Popup */}
      {selectedModule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
             <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
               <div>
                 <h3 className="font-bold text-xl text-slate-900 dark:text-white">{dict.dashboard.learnPage.modalTitle}</h3>
                 <p className="text-sm text-slate-500">{dict.dashboard.learnPage.modalSubtitle}</p>
               </div>
               <button onClick={() => setSelectedModule(null)} className="text-slate-500 hover:text-slate-700 bg-slate-100 dark:bg-slate-800 rounded-full p-2 transition">
                 <X className="h-5 w-5" />
               </button>
             </div>
             <div className="p-6 bg-slate-50 dark:bg-slate-950 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
               <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center relative group cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-80"></div>
                  <PlayCircle className="h-16 w-16 text-white absolute group-hover:scale-110 transition-transform" />
               </div>
               <div className="space-y-2 mt-4">
                 <h4 className="font-bold text-slate-900 dark:text-white">{dict.dashboard.learnPage.playlist}</h4>
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition cursor-pointer">
                     <PlayCircle className="h-5 w-5 text-blue-500" />
                     <div className="flex-1">
                       <p className="text-sm font-semibold text-slate-900 dark:text-white">{dict.dashboard.learnPage.conceptPart} {i}</p>
                       <p className="text-xs text-slate-500">{dict.dashboard.learnPage.video} • 05:{i}0 {dict.dashboard.learnPage.videoMins}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans">
      <DashboardSidebar />
      <main className="flex-1 px-4 py-4 pb-24 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:pb-8 overflow-y-auto h-screen">
        <DashboardHeader />
        {pageContent}
      </main>
    </div>
  );
}
