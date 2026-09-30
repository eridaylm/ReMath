"use client";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardWelcome from "@/components/dashboard/dashboard-welcome";
import StatCard from "@/components/dashboard/stat-card";
import RecommendedTests from "@/components/dashboard/recommended-tests";
import WeeklyProgressChart from "@/components/charts/weekly-progress-chart";
import StrengthWeaknessCard from "@/components/dashboard/strength-weakness-card";
import RecentTests from "@/components/dashboard/recent-tests";
import LearningTargetCard from "@/components/dashboard/learning-target-card";
import BadgeCard from "@/components/dashboard/badge-card";
import DailyChallengeCard from "@/components/dashboard/daily-challenge-card";
import BottomBanner from "@/components/dashboard/bottom-banner";
import { dashboardStats } from "@/data/dashboard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/animated-container";

export default function DashboardPage() {
  return (
    <AnimatedContainer className="mx-auto max-w-[1200px]">
      {/* Header */}
      <AnimatedItem>
        <DashboardHeader />
      </AnimatedItem>

      {/* Row 1: Welcome */}
      <AnimatedItem className="mt-2 mb-6 sm:mb-8">
        <DashboardWelcome />
      </AnimatedItem>

      {/* Row 2: 3 Stat Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
        {dashboardStats.map((stat) => (
          <AnimatedItem key={stat.title}>
            <StatCard {...stat} />
          </AnimatedItem>
        ))}
      </div>

      {/* Row 3: Rekomendasi Tes */}
      <AnimatedItem className="mb-6 sm:mb-8">
        <RecommendedTests />
      </AnimatedItem>

      {/* Row 4: 3-Column Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
        <AnimatedItem className="md:col-span-1">
           <WeeklyProgressChart />
        </AnimatedItem>
        <AnimatedItem className="md:col-span-1">
           <StrengthWeaknessCard />
        </AnimatedItem>
        <AnimatedItem className="md:col-span-2 lg:col-span-1">
           <RecentTests />
        </AnimatedItem>
      </div>

      {/* Row 5: 3-Column Layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatedItem className="md:col-span-1">
           <LearningTargetCard />
        </AnimatedItem>
        <AnimatedItem className="md:col-span-1">
           <BadgeCard />
        </AnimatedItem>
        <AnimatedItem className="md:col-span-2 lg:col-span-1">
           <DailyChallengeCard />
        </AnimatedItem>
      </div>

      {/* Row 6: Bottom Banner */}
      <AnimatedItem>
        <BottomBanner />
      </AnimatedItem>
    </AnimatedContainer>
  );
}