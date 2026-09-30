"use client";

// components/landing/hero-section.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/context/AuthContext";

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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, damping: 20, stiffness: 100 }
  },
};

export default function HeroSection() {
  const { t } = useLanguage();
  const { allUsers } = useAuth();
  
  // Ambil maksimal 4 user (role 'user')
  const registeredUsers = allUsers?.filter(u => u.role === 'user').slice(0, 4) || [];
  const defaultInitials = ["A", "R", "D", "S"];
  
  // Siapkan 4 slot. Isi dengan data user (jika ada), sisanya pakai default initials
  const displayAvatars = Array.from({ length: 4 }).map((_, i) => {
    const user = registeredUsers[i];
    if (user) {
      let initial = "";
      const isDefaultUsername = !user.username || user.username.endsWith('_user') || user.username.endsWith('_admin');
      
      if (isDefaultUsername && user.name) {
         initial = user.name.charAt(0).toUpperCase();
      } else if (user.username) {
         initial = user.username.charAt(0).toUpperCase();
      } else {
         initial = "U";
      }

      return {
        id: user.id || `u-${i}`,
        hasAvatar: !!user.avatarUrl,
        url: user.avatarUrl,
        initial,
      };
    }
    
    return {
      id: `default-${i}`,
      hasAvatar: false,
      url: null,
      initial: defaultInitials[i],
    };
  });

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.12),_transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.05),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.05),_transparent_35%)]">
      {/* Animated floating decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-400/8 blur-3xl dark:bg-blue-500/5" />
        <div className="animate-float-delayed absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl dark:bg-indigo-500/5" />
        <div className="animate-float absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-violet-400/5 blur-3xl dark:bg-violet-500/3" style={{ animationDelay: '2s' }} />
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center px-6 py-20 lg:px-8 lg:py-32"
      >
        <motion.div variants={itemVariants} className="mb-5 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400">
          {t.hero.badge}
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
          {t.hero.title}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          {t.hero.description}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/tes"
            className="group flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:shadow-xl hover:shadow-blue-200/80 hover:opacity-95 dark:hover:shadow-none"
          >
            {t.hero.startBtn}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#cara-kerja"
            className="rounded-md border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {t.hero.exploreBtn}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-4">
          <div className="flex -space-x-3">
            {displayAvatars.map((item) => (
              item.hasAvatar ? (
                <div
                  key={item.id}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 overflow-hidden shadow"
                >
                  <img src={item.url!} alt="User avatar" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div
                  key={item.id}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white dark:border-slate-950 bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow"
                >
                  {item.initial}
                </div>
              )
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-bold text-blue-600 dark:text-blue-400">50.000+</span> {t.hero.activeUsers}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}