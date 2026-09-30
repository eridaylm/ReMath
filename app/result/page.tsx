'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Logo from '@/components/Logo';
import { useLanguage } from '@/contexts/language-context';
import { useTest } from '@/context/TestContext';
import { SubTopic, SubTopicResult, MasteryStatus } from '@/types';
import { SUBTOPICS_SEQUENCE } from '@/data/mockData';
import {
  Sparkles,
  ShieldCheck,
  Timer,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Printer,
  ChevronDown,
  ChevronUp,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  BrainCircuit,
  Trophy,
  Compass,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function ResultPage() {
  const router = useRouter();
  const { t: dict } = useLanguage();
  const { latestResult, loadSampleResult, resetTest } = useTest();
  const [expandedTopic, setExpandedTopic] = useState<SubTopic | null>(null);

  // Auto load sample if not set yet, or give option
  const result = latestResult;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleRetake = () => {
    resetTest();
    router.push('/test');
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const getStatusBadge = (status: MasteryStatus) => {
    switch (status) {
      case 'SMA_MASTERED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SMA Mastered (Fondasi Kuat)
          </span>
        );
      case 'SMP_FOUNDATIONAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            SMP Foundational Level
          </span>
        );
      case 'SD_FOUNDATIONAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-900 border border-orange-300 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            SD Foundational Level
          </span>
        );
      case 'BASIC_REMEDIAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-100 px-3 py-1 text-xs font-extrabold text-rose-900 border border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800">
            <span className="h-2 w-2 rounded-full bg-rose-500"></span>
            Needs Basic Remedial
          </span>
        );
    }
  };

  // IF NO TEST COMPLETED YET
  if (!result) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-center mb-5">
              <Logo variant="full" size="md" href="/" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {dict.resultPage.emptyState.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {dict.resultPage.emptyState.description}
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/test"
                className="w-full rounded-xl bg-blue-600 py-2.5 px-4 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                {dict.resultPage.emptyState.startBtn}
              </Link>
              <button
                onClick={loadSampleResult}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition"
              >
                {dict.resultPage.emptyState.loadSampleBtn}
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const resultsList = Object.values(result.subtopicResults) as SubTopicResult[];
  const masteredCount = resultsList.filter((r) => r.status === 'SMA_MASTERED').length;
  const smpCount = resultsList.filter((r) => r.status === 'SMP_FOUNDATIONAL').length;
  const sdCount = resultsList.filter((r) => r.status === 'SD_FOUNDATIONAL').length;
  const remedialCount = resultsList.filter((r) => r.status === 'BASIC_REMEDIAL').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 print:bg-white print:text-black">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8"
        >
          {/* Printable Report Header */}
          <div className="hidden print:flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
            <Logo variant="full" size="md" href="/" />
            <div className="text-right text-xs text-slate-500">
              <div className="font-bold text-slate-800">Laporan Hasil Diagnostik ReMath</div>
              <div>{result.completedAt}</div>
            </div>
          </div>

          {/* Top Quick Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 print:hidden">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Diagnostik Selesai Diverifikasi</span>
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{result.completedAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 shadow-xs"
              >
                <Printer className="h-3.5 w-3.5 text-slate-500" />
                <span>Cetak / Unduh PDF</span>
              </button>

              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Ulangi Tes</span>
              </button>
            </div>
          </div>

          {/* 1. ANTI-STIGMA SUPPORTIVE SUMMARY HEADER */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 p-6 sm:p-9 shadow-lg shadow-blue-500/5 dark:border-blue-900/40 dark:from-slate-900 dark:via-blue-950/20 dark:to-indigo-950/30 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/60 px-3 py-1 text-xs font-bold text-blue-800 dark:text-blue-300 mb-3">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  <span>Pendekatan Holistik Tanpa Stigma</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {result.supportiveHeader.strengthHeadline}
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.supportiveHeader.motivationalText}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Pilar Terkuat:</span>
                  <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {result.supportiveHeader.keyStrengthSubtopic}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Target Polesan:</span>
                  <span className="rounded-lg bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 font-bold text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    {result.supportiveHeader.focusGrowthSubtopic}
                  </span>
                </div>
              </div>

              {/* Student Avatar Card */}
              <div className="shrink-0 w-full md:w-auto rounded-2xl border border-white/80 bg-white/80 backdrop-blur p-5 text-center shadow-md dark:border-slate-800 dark:bg-slate-800/80">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-md shadow-blue-500/25 mb-2">
                  {result.studentName ? result.studentName.charAt(0) : 'S'}
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {result.studentName || 'Siswa Mandiri'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Profil Peserta Diagnostik
                </div>
              </div>
            </div>
          </div>

          {/* 2. HONESTY & EFFICIENCY METRIC BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
            {/* Honesty Badge */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4.5 dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                <span>Kejujuran Teruji</span>
                <ShieldCheck className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-amber-950 dark:text-amber-100">
                {result.totalHonestyCount} Kali
              </div>
              <p className="mt-1 text-[11px] text-amber-700/90 dark:text-amber-400 leading-tight">
                Memilih &quot;Tidak Tahu&quot; untuk mencegah tebakan acak.
              </p>
            </div>

            {/* Total Time Badge */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4.5 dark:border-blue-900/50 dark:bg-blue-950/30">
              <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">
                <span>Total Waktu</span>
                <Timer className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-blue-950 dark:text-blue-100 font-mono">
                {formatSeconds(result.totalTimeSeconds)}
              </div>
              <p className="mt-1 text-[11px] text-blue-700/90 dark:text-blue-400 leading-tight">
                Efisiensi penyelesaian adaptif 5 sub-topik.
              </p>
            </div>

            {/* SMA Mastered Count */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4.5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                <span>SMA Mastered</span>
                <Award className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-100">
                {masteredCount} / 5
              </div>
              <p className="mt-1 text-[11px] text-emerald-700/90 dark:text-emerald-400 leading-tight">
                Sub-topik lulus standar penuh SMA.
              </p>
            </div>

            {/* SMP & SD Foundational Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4.5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                <span>Fondasi Jembatan</span>
                <TrendingUp className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="text-xs space-y-1 mt-1 font-semibold">
                <div className="flex justify-between text-amber-700 dark:text-amber-400">
                  <span>SMP Foundation:</span>
                  <span>{smpCount} topik</span>
                </div>
                <div className="flex justify-between text-orange-700 dark:text-orange-400">
                  <span>SD Foundation:</span>
                  <span>{sdCount} topik</span>
                </div>
                {remedialCount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Remedial SD:</span>
                    <span>{remedialCount} topik</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Special Badges Earned */}
          {result.badges && result.badges.length > 0 && (
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Lencana Karakter Pembelajar yang Diraih</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.badges.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white block">
                        {b.title}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SKILL TREE / ROOT CAUSE BREAKDOWN (5 SUB-TOPICS) */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Peta Kemampuan &amp; Analisis Akar Masalah
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Melacak hingga ke tingkat SD/SMP mengapa suatu materi SMA terasa membingungkan
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">5 Domain Lengkap</span>
            </div>

            <div className="space-y-4">
              {resultsList.map((res) => {
                const isExpanded = expandedTopic === res.subtopic;

                return (
                  <div
                    key={res.subtopic}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 transition"
                  >
                    {/* Main Row Bar */}
                    <div
                      onClick={() => setExpandedTopic(isExpanded ? null : res.subtopic)}
                      className="cursor-pointer p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold text-sm dark:bg-blue-950/80 dark:text-blue-400 shadow-inner">
                          {res.subtopic.slice(0, 3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-slate-900 dark:text-white">
                              {res.subtopic}
                            </span>
                            {getStatusBadge(res.status)}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {res.rootCauseAnalysis.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] text-slate-400 block">Waktu Selesai:</span>
                          <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                            {formatSeconds(res.timeSpentSeconds)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {isExpanded ? 'Tutup Detail' : 'Lihat Akar Masalah'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-blue-600" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Root Cause & Diagnostic Dropdown */}
                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/60 space-y-4">
                        {/* Diagnostic Root Cause Box */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
                          <div className="flex items-start gap-2.5">
                            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                                Diagnosa Akar Masalah (Root Cause Analysis)
                              </h4>
                              <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                {res.rootCauseAnalysis.description}
                              </p>
                              <div className="mt-2.5 flex items-baseline gap-1.5 text-xs text-amber-900 dark:text-amber-200 font-medium">
                                <span className="font-bold">Konsep Prasyarat Kunci:</span>
                                <span>{res.rootCauseAnalysis.missingPrerequisite}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Targeted Learning Recommendation */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/60">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                              <span>{res.recommendation.actionTitle}</span>
                            </div>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                res.recommendation.priority === 'Tinggi'
                                  ? 'bg-rose-100 text-rose-700'
                                  : res.recommendation.priority === 'Sedang'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              Prioritas: {res.recommendation.priority}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                            Modul mikro interaktif yang direkomendasikan untuk menutup celah konsep secara instan:
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {res.recommendation.learningModules.map((moduleName, mIdx) => (
                              <div
                                key={mIdx}
                                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs font-medium text-slate-700 dark:border-slate-700/60 dark:bg-slate-800 dark:text-slate-200"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                                <span>{moduleName}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. RECOMMENDED LEARNING PATH ROADMAP */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Rencana Aksi &amp; Jalur Belajar Personal
                </h3>
                <p className="text-xs text-slate-500">
                  Langkah sistematis berjenjang agar siswa SMA kembali percaya diri dalam matematika
                </p>
              </div>
            </div>

            <div className="relative ml-2 space-y-8">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-blue-200 dark:bg-blue-900/60" />
              
              {/* Step 1 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 text-xs font-bold">
                  1
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  Perbaiki Fondasi SD &amp; SMP yang Teridentifikasi Belum Tuntas
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Fokus pada topik berstatus <span className="font-semibold text-rose-600">Needs Remedial</span> atau <span className="font-semibold text-orange-600">SD Foundation</span> terlebih dahulu. Menguasai operasi pecahan dan suku aljabar sederhana membutuhkan waktu rata-rata 3-5 jam belajar mandiri.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  2
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  Bangun Jembatan Konseptual SMP ke SMA
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Gunakan pemahaman kemiringan gradien garis lurus SMP untuk memahami konsep turunan kalkulus SMA secara visual tanpa rumus hafalan buta.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  3
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  Asah Soal Tingkat Tinggi (HOTS) pada Domain Unggulan
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Pertahankan keunggulan pada topik yang berstatus <span className="font-semibold text-emerald-600">SMA Mastered</span> dengan mengeksplorasi soal olimpiade atau seleksi perguruan tinggi negeri.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/40 backdrop-blur-md border border-blue-200 dark:border-blue-800 p-6 sm:p-8 text-center shadow-sm print:hidden">
            <h3 className="text-xl font-bold text-blue-950 dark:text-white">Siap Mengukur Kembali Perkembanganmu?</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Kamu bisa mengulang tes diagnostik adaptif kapan saja untuk memperbarui peta fondasi matematika kamu.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRetake}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Mulai Tes Ulang
              </button>
              <Link
                href="/leaderboard"
                className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Lihat Papan Peringkat
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
