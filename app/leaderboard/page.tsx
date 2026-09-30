'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { SubTopic, LeaderboardEntry } from '@/types';
import { INITIAL_LEADERBOARD, SUBTOPICS_SEQUENCE } from '@/data/mockData';
import {
  Trophy,
  Medal,
  Timer,
  Search,
  School,
  Calendar,
  Sparkles,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';

export default function LeaderboardPage() {
  const { t } = useLanguage();
  const lb = t.leaderboardPage;
  const [selectedSubtopic, setSelectedSubtopic] = useState<SubTopic>('Aljabar');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter by subtopic & search query
  const filteredEntries = useMemo(() => {
    return INITIAL_LEADERBOARD.filter((entry) => {
      const matchTopic = entry.subtopic === selectedSubtopic;
      const matchSearch =
        entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.schoolName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTopic && matchSearch;
    }).sort((a, b) => a.timeSeconds - b.timeSeconds);
  }, [selectedSubtopic, searchQuery]);

  // Quick metrics for the active subtopic
  const metrics = useMemo(() => {
    const topicList = INITIAL_LEADERBOARD.filter((e) => e.subtopic === selectedSubtopic);
    const fastest = topicList[0];
    const avgTime =
      topicList.length > 0
        ? Math.round(topicList.reduce((acc, curr) => acc + curr.timeSeconds, 0) / topicList.length)
        : 0;

    const avgMins = Math.floor(avgTime / 60);
    const avgSecs = avgTime % 60;
    const formattedAvg = `${avgMins.toString().padStart(2, '0')}m ${avgSecs.toString().padStart(2, '0')}s`;

    return {
      fastestStudent: fastest ? fastest.studentName : '-',
      fastestTime: fastest ? fastest.formattedTime : '-',
      avgTimeFormatted: formattedAvg,
      totalCount: topicList.length,
    };
  }, [selectedSubtopic]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
          <span className="text-sm">🥇</span> {lb.badges.champ1}
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          <span className="text-sm">🥈</span> {lb.badges.champ2}
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-800 border border-orange-300 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800">
          <span className="text-sm">🥉</span> {lb.badges.champ3}
        </span>
      );
    }
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        #{rank}
      </span>
    );
  };

  const getMasteryPill = (status: string) => {
    if (status === 'SMA_MASTERED') {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          {lb.mastery.sma}
        </span>
      );
    }
    if (status === 'SMP_FOUNDATIONAL') {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          {lb.mastery.smp}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-800 border border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
        {lb.mastery.sd}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Leaderboard Hero Header */}
        <div className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 transition-colors">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    {lb.hero.badge}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {lb.hero.title}
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                  {lb.hero.description}
                </p>
              </div>

              {/* Call to action */}
              <div className="shrink-0">
                <Link
                  href="/test"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:opacity-95 transition"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{lb.hero.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <span>{lb.metrics.rank1} ({t.testPage.subtopics[selectedSubtopic] || selectedSubtopic})</span>
                  <Trophy className="h-4 w-4 text-amber-600" />
                </div>
                <div className="mt-2">
                  <div className="text-base font-bold text-amber-950 dark:text-amber-100">
                    {metrics.fastestStudent}
                  </div>
                  <div className="text-xs text-amber-700/80 dark:text-amber-400 font-mono mt-0.5">
                    {lb.metrics.time}: {metrics.fastestTime}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-300">
                  <span>{lb.metrics.avgTime}</span>
                  <Timer className="h-4 w-4 text-blue-600" />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold text-blue-950 dark:text-blue-100 font-mono">
                    {metrics.avgTimeFormatted}
                  </div>
                  <div className="text-xs text-blue-600/80 dark:text-blue-400 mt-0.5">
                    {lb.metrics.avgDesc}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span>{lb.metrics.totalParticipants}</span>
                  <UserCheck className="h-4 w-4 text-slate-500" />
                </div>
                <div className="mt-2">
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {metrics.totalCount} {lb.metrics.students}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {lb.metrics.totalDesc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          {/* Subtopic Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {SUBTOPICS_SEQUENCE.map((topic) => {
                const isSelected = selectedSubtopic === topic;
                return (
                  <button
                    key={topic}
                    onClick={() => setSelectedSubtopic(topic)}
                    className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t.testPage.subtopics[topic] || topic}
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lb.filter.searchPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Top 10 Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                  <tr>
                    <th className="py-3.5 px-4 w-24 text-center">{lb.table.rank}</th>
                    <th className="py-3.5 px-4 min-w-[200px]">{lb.table.name}</th>
                    <th className="py-3.5 px-4 w-28 text-center">{lb.table.level}</th>
                    <th className="py-3.5 px-4 min-w-[180px]">{lb.table.mastery}</th>
                    <th className="py-3.5 px-4 w-32 text-right">{lb.table.time}</th>
                    <th className="py-3.5 px-4 w-28 text-right">{lb.table.date}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                  {filteredEntries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        {lb.table.empty}
                      </td>
                    </tr>
                  ) : (
                    filteredEntries.map((entry, idx) => {
                      const rank = idx + 1;
                      const isTop3 = rank <= 3;

                      return (
                        <tr
                          key={entry.id}
                          className={`animate-slide-in-right hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition ${
                            rank === 1
                              ? 'bg-amber-50/30 dark:bg-amber-950/10'
                              : rank === 2
                              ? 'bg-slate-50/50 dark:bg-slate-900/30'
                              : rank === 3
                              ? 'bg-orange-50/30 dark:bg-orange-950/10'
                              : ''
                          }`}
                          style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                          {/* Rank */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            {getRankBadge(rank)}
                          </td>

                          {/* Name & School */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                                  rank === 1
                                    ? 'bg-amber-500 shadow-sm shadow-amber-500/40'
                                    : rank === 2
                                    ? 'bg-slate-500'
                                    : rank === 3
                                    ? 'bg-orange-500'
                                    : 'bg-blue-600'
                                }`}
                              >
                                {entry.studentName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white block">
                                  {entry.studentName}
                                </span>
                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                  <School className="h-3 w-3 inline" />
                                  {entry.schoolName}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* School Level Badge */}
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                                entry.schoolLevel === 'SMA'
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                                  : entry.schoolLevel === 'SMP'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              }`}
                            >
                              {entry.schoolLevel}
                            </span>
                          </td>

                          {/* Mastery Status */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {getMasteryPill(entry.masteryLevel)}
                          </td>

                          {/* Completion Time */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                              {entry.formattedTime}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-right text-slate-400 text-[11px] whitespace-nowrap">
                            {entry.date}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>{lb.table.footerPrefix} {t.testPage.subtopics[selectedSubtopic] || selectedSubtopic}</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>{lb.table.footerVerified}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
