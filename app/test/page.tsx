'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTest } from '@/context/TestContext';
import { useLanguage } from '@/contexts/language-context';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import Logo from '@/components/Logo';
import { SUBTOPICS_SEQUENCE } from '@/data/mockData';
import { questionsEn } from '@/data/questionsEn';
import {
  Timer,
  ShieldCheck,
  FastForward,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Info,
  Layers,
  HeartHandshake
} from 'lucide-react';

export default function TestPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const {
    isTestActive,
    isTestFinished,
    studentName,
    setStudentName,
    startTest,
    activeSubTopicIndex,
    currentSubTopic,
    currentLevel,
    currentBlockQuestions,
    currentQuestionIndex,
    currentQuestion,
    selectedAnswers,
    selectAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    jumpToQuestion,
    submitCurrentBlock,
    bypassCurrentLevel,
    totalTimeSeconds,
    totalHonestyCount,
    loadSampleResult,
    completedSubTopicResults,
  } = useTest();

  const [inputName, setInputName] = useState(studentName || '');
  const [showBypassModal, setShowBypassModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // If test finished, redirect to /result
  useEffect(() => {
    if (isTestFinished) {
      router.push('/result');
    }
  }, [isTestFinished, router]);

  // Format timer MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    startTest(inputName.trim() || 'Siswa Mandiri');
  };

  // Check how many questions answered in current block
  const answeredCountInBlock = currentBlockQuestions.filter(
    (q) => selectedAnswers[q.id] !== undefined
  ).length;

  const currentSelected = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const { language } = useLanguage();
  const getTranslatedQuestion = (q: any) => {
    if (language === 'en' && questionsEn[q.id]) {
      return { ...q, ...questionsEn[q.id] };
    }
    return q;
  };
  const translatedCurrentQuestion = currentQuestion ? getTranslatedQuestion(currentQuestion) : null;

  // Level Styling helpers
  const levelBadgeConfig = {
    SMA: {
      label: t.testPage.engine.levels.smaLabel,
      badgeClass: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
      tag: t.testPage.engine.levels.smaTag,
    },
    SMP: {
      label: t.testPage.engine.levels.smpLabel,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      tag: t.testPage.engine.levels.smpTag,
    },
    SD: {
      label: t.testPage.engine.levels.sdLabel,
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
      tag: t.testPage.engine.levels.sdTag,
    },
  }[currentLevel];

  // 1. ONBOARDING SCREEN IF TEST HAS NOT STARTED
  if (!isTestActive) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-2xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              {/* Header Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

              <div className="text-center max-w-lg mx-auto mb-8">
                <div className="flex justify-center mb-5">
                  <Logo variant="full" size="lg" href="/" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {t.testPage.onboarding.title}
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.testPage.onboarding.description}
                </p>
              </div>

              {/* Anti-stigma philosophy cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 font-bold text-xs text-blue-800 dark:text-blue-300 mb-1">
                    <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>{t.testPage.onboarding.cards.block3.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    {t.testPage.onboarding.cards.block3.desc}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300 mb-1">
                    <HeartHandshake className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>{t.testPage.onboarding.cards.honestyBtn.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    {t.testPage.onboarding.cards.honestyBtn.desc}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                    <FastForward className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.testPage.onboarding.cards.skipLevel.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    {t.testPage.onboarding.cards.skipLevel.desc}
                  </p>
                </div>
              </div>

              {/* Start Form */}
              <form onSubmit={handleStart} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 text-left">
                    {t.testPage.onboarding.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder={t.testPage.onboarding.form.namePlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 py-3 px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-95"
                >
                  <span>{t.testPage.onboarding.form.startBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Preview Action for Demonstrators/Judges */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <span className="text-xs text-slate-400 mr-2">{t.testPage.onboarding.demo.prefix}</span>
                <button
                  onClick={() => {
                    loadSampleResult();
                    router.push('/result');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 underline underline-offset-4"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t.testPage.onboarding.demo.linkText}</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // 2. ACTIVE TEST ENGINE INTERFACE
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Top Header Tracker */}
        <div className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 sticky top-[65px] z-30 transition-colors shadow-xs">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3.5">
            {/* Subtopics Stepper */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {SUBTOPICS_SEQUENCE.map((topic, idx) => {
                const isCurrent = idx === activeSubTopicIndex;
                const isPassed = idx < activeSubTopicIndex;
                const completedResult = completedSubTopicResults[topic];

                return (
                  <div
                    key={topic}
                    className={`flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isCurrent
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                        : isPassed
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="h-3 w-3" /> : idx + 1}
                    </span>
                    <span>{t.testPage.subtopics[topic] || topic}</span>
                    {isPassed && completedResult && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono">
                        {completedResult.levelReached}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Timer & Honesty Live Indicators */}
            <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs">
              <div className="flex items-center gap-3">
                <Logo variant="icon" size="sm" href="/" className="hidden sm:inline-flex" />
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  <Timer className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{formatTimer(totalTimeSeconds)}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span>{t.testPage.engine.tracker.participant}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {studentName === 'Siswa Mandiri' || studentName === 'Independent Student' ? (language === 'en' ? 'Independent Student' : 'Siswa Mandiri') : studentName}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {totalHonestyCount > 0 && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-200/60 dark:border-amber-900/60">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                    <span>{t.testPage.engine.tracker.honestyTested} {totalHonestyCount}x</span>
                  </div>
                )}
                <span className="text-[11px] text-slate-400">
                  {t.testPage.engine.tracker.subTopicOf} {activeSubTopicIndex + 1} / 5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Test Main Body */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6">
          {/* Level Header Banner with Level Bypass Button */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {t.testPage.engine.header.subtopicLabel} {t.testPage.subtopics[currentSubTopic] || currentSubTopic}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold border ${levelBadgeConfig.badgeClass}`}>
                    {levelBadgeConfig.label}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {t.testPage.engine.header.packageTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.testPage.engine.header.packageDesc}
                </p>
              </div>

              {/* LEVEL BYPASS BUTTON */}
              <button
                onClick={() => setShowBypassModal(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100 hover:border-amber-300 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/80 transition shrink-0 shadow-xs"
              >
                <FastForward className="h-4 w-4 text-amber-600" />
                <span>{t.testPage.engine.header.bypassBtn}</span>
              </button>
            </div>

            {/* Block Question 3-Step Navigator */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t.testPage.engine.header.chooseQuestion}
              </span>
              <div className="flex items-center gap-2">
                {currentBlockQuestions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isUnknown = selectedAnswers[q.id] === 'UNKNOWN';

                  return (
                    <button
                      key={q.id}
                      onClick={() => jumpToQuestion(idx)}
                      className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-600/30'
                          : isUnknown
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Question Card */}
          {currentQuestion ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md dark:border-slate-800 dark:bg-slate-900 transition">
              {/* Question Meta */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs dark:bg-blue-950 dark:text-blue-300">
                    {currentQuestionIndex + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {t.testPage.engine.question.questionOf.replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(currentBlockQuestions.length))}
                  </span>
                </div>
                {translatedCurrentQuestion.conceptTag && (
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {translatedCurrentQuestion.conceptTag} (ID: {currentQuestion.id}, EN keys: {Object.keys(questionsEn).length})
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="my-5">
                <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {translatedCurrentQuestion.question}
                </p>
                {translatedCurrentQuestion.hint && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-blue-50/60 p-3 text-xs text-blue-800 dark:bg-blue-950/20 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{t.testPage.engine.question.hintPrefix} {translatedCurrentQuestion.hint}</span>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options (A, B, C, D) */}
              <div className="space-y-3 mt-6">
                {translatedCurrentQuestion.options.map((optionText: string, optIdx: number) => {
                  const isSelected = currentSelected === optIdx;
                  const letter = ['A', 'B', 'C', 'D'][optIdx];

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => selectAnswer(currentQuestion.id, optIdx)}
                      className={`w-full flex items-center gap-3.5 p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-600/20 dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-100'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1">{optionText}</span>
                    </button>
                  );
                })}
              </div>

              {/* EXPLICIT HONESTY BUTTON */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => selectAnswer(currentQuestion.id, 'UNKNOWN')}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    currentSelected === 'UNKNOWN'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/30 dark:border-amber-600 dark:bg-amber-950/60 dark:text-amber-200'
                      : 'border-dashed border-amber-300 bg-amber-50/40 text-amber-800 hover:bg-amber-50 dark:border-amber-800/80 dark:bg-amber-950/20 dark:text-amber-300 dark:hover:bg-amber-950/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-200/70 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">
                        {t.testPage.engine.question.honestyOptionTitle}
                      </span>
                      <span className="text-[11px] text-amber-700/80 dark:text-amber-400 block">
                        {t.testPage.engine.question.honestyOptionDesc}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    currentSelected === 'UNKNOWN'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {currentSelected === 'UNKNOWN' ? t.testPage.engine.question.honestyOptionSelected : t.testPage.engine.question.honestyOptionSelect}
                  </span>
                </button>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={goToPrevQuestion}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t.testPage.engine.nav.prevBtn}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {currentQuestionIndex < currentBlockQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={goToNextQuestion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 shadow-sm"
                    >
                      <span>{t.testPage.engine.nav.nextBtn}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:opacity-95"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{t.testPage.engine.nav.finishBlockBtn.replace('{answered}', String(answeredCountInBlock))}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold">{t.testPage.engine.nav.loadingPackage}</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* MODAL 1: KONFIRMASI MENYERAH / LOMPATI LEVEL */}
      <AnimatePresence>
        {showBypassModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 mb-3">
                <FastForward className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.testPage.engine.modals.bypass.title.replace('{level}', currentLevel).replace('{subtopic}', currentSubTopic)}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-left">
                {t.testPage.engine.modals.bypass.descPart1}<span className="font-bold">{currentLevel}</span>{t.testPage.engine.modals.bypass.descPart2}
              </p>
              <div className="mt-6 flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowBypassModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  {t.testPage.engine.modals.bypass.keepTryingBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBypassModal(false);
                    bypassCurrentLevel();
                  }}
                  className="flex-1 rounded-xl bg-amber-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-amber-700 shadow-md shadow-amber-600/20"
                >
                  {t.testPage.engine.modals.bypass.skipBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: KONFIRMASI SELESAIKAN BLOK */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.testPage.engine.modals.submit.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.testPage.engine.modals.submit.descPart1}<span className="font-bold text-blue-600">{answeredCountInBlock}</span>{t.testPage.engine.modals.submit.descPart2}<span className="font-bold">{currentLevel}</span>{t.testPage.engine.modals.submit.descPart3}
              </p>
              <div className="mt-6 flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  {t.testPage.engine.modals.submit.checkAgainBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    submitCurrentBlock();
                  }}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  {t.testPage.engine.modals.submit.submitBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
