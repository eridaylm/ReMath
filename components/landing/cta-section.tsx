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
          className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 px-8 py-10 text-white shadow-xl dark:shadow-none"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                {t.cta.title}
              </h2>
              <p className="mt-3 text-blue-100">
                {t.cta.description}
              </p>
            </div>

            <Link
              href="/tes"
              className="inline-flex w-fit items-center rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 shadow transition hover:bg-blue-50 hover:-translate-y-1"
            >
              {t.cta.startBtn}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}