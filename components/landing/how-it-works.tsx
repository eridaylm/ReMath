"use client";

// components/landing/how-it-works.tsx
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 }
  },
};

export default function HowItWorks() {
  const { t } = useLanguage();

  const colors = [
    "bg-blue-600 dark:bg-blue-500",
    "bg-emerald-500 dark:bg-emerald-600",
    "bg-amber-500 dark:bg-amber-600",
    "bg-indigo-500 dark:bg-indigo-600",
  ];

  const steps = t.howItWorks.steps.map((step, index) => ({
    ...step,
    number: String(index + 1),
    color: colors[index],
  }));

  return (
    <section id="cara-kerja" className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {t.howItWorks.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              variants={itemVariants}
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${step.color}`}
              >
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}