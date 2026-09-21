"use client";

// components/landing/popular-tests.tsx
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Target, BarChart2, Sparkles, Trophy, FileText, Medal, BarChart3, Shapes, Calculator, Variable, Brain } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 }
  },
};

export default function PopularTests() {
  const { t } = useLanguage();

  const icons = [
    <Calculator className="w-7 h-7 text-blue-400" key="1" />,
    <Variable className="w-7 h-7 text-indigo-400" key="2" />,
    <Shapes className="w-7 h-7 text-emerald-400" key="3" />,
    <Brain className="w-7 h-7 text-purple-400" key="4" />,
    <BarChart3 className="w-7 h-7 text-cyan-400" key="5" />,
  ];
  const tests = t.popularTests.tests.map((test, index) => ({
    ...test,
    icon: icons[index] || "📝"
  }));

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.popularTests.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {t.popularTests.description}
            </p>
          </div>
          <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition">
            {t.popularTests.viewAll}
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-5"
        >
          {tests.map((test) => (
            <motion.div
              variants={itemVariants}
              key={test.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl dark:bg-blue-900/30">
                {test.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {test.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{test.questions}</p>
              <button className="mt-5 rounded-md border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50 w-full md:w-auto">
                {t.popularTests.startBtn}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}