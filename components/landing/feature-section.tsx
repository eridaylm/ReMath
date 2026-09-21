"use client";

// components/landing/feature-section.tsx
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Target, BarChart2, Sparkles, Trophy, FileText, Medal } from 'lucide-react';



export default function FeatureSection() {
  const { t } = useLanguage();

  const icons = [
    <Target className="w-6 h-6 text-indigo-600" key="1" />,
    <BarChart2 className="w-6 h-6 text-indigo-600" key="2" />,
    <Sparkles className="w-6 h-6 text-indigo-600" key="3" />,
    <Trophy className="w-6 h-6 text-indigo-600" key="4" />,
    <FileText className="w-6 h-6 text-indigo-600" key="5" />,
    <Medal className="w-6 h-6 text-indigo-600" key="6" />,
  ];

  const features = t.features.cards.map((card, index) => ({
    ...card,
    icon: icons[index] || "✨",
  }));

  return (
    <section id="fitur" className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.features.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {t.features.description}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: index * 0.1 }}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-900/30">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}