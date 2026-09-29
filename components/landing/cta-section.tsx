"use client";

// components/landing/cta-section.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Rocket } from "lucide-react";

export default function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-100 px-8 py-12 shadow-sm dark:from-slate-800 dark:to-slate-900 dark:border-slate-800"
        >
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between z-10">
            <div className="max-w-2xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md shadow-blue-600/20 dark:bg-blue-500">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.cta.title}
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                {t.cta.description}
              </p>
            </div>

            <Link
              href="/tes"
              className="inline-flex w-fit items-center rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:-translate-y-1 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {t.cta.startBtn}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}