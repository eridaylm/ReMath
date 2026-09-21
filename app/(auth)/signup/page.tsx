"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 120 },
  },
};

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 0, key: "weak" as const };
  if (score === 2) return { level: 1, key: "fair" as const };
  if (score === 3) return { level: 2, key: "good" as const };
  return { level: 3, key: "strong" as const };
}

const strengthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-emerald-500",
];

export default function SignUpPage() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    if (!agreeTerms) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mendaftar");
      }

      // Redirect ke halaman verifikasi
      window.location.href = "/verify?email=" + encodeURIComponent(email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-7"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t.auth.signUpTitle}
        </h1>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {t.auth.signUpSubtitle}
        </p>
      </motion.div>      {/* Error Message */}
      {error && (
        <motion.div variants={itemVariants} className="rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10 text-sm">
          <p className="text-red-800 dark:text-red-300">
            {error}
          </p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.auth.fullNameLabel}
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.auth.fullNamePlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.auth.emailLabel}
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.emailPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.auth.passwordLabel}
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
          {/* Password Strength */}
          {password.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= strength.level ? strengthColors[strength.level] : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs font-medium ${
                strength.level === 0 ? "text-red-500" :
                strength.level === 1 ? "text-orange-500" :
                strength.level === 2 ? "text-yellow-600" :
                "text-emerald-500"
              }`}>
                {t.auth.passwordStrength[strength.key]}
              </p>
            </div>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t.auth.confirmPasswordLabel}
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              id="signup-confirm"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.auth.confirmPasswordPlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showConfirm ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
            </button>
          </div>
        </motion.div>

        {/* Terms */}
        <motion.div variants={itemVariants} className="flex items-start gap-3 pt-1">
          <input
            id="agree-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600"
            required
          />
          <label htmlFor="agree-terms" className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t.auth.agreeTerms}{" "}
            <Link href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">{t.auth.termsLink}</Link>
            {" "}{t.auth.andText}{" "}
            <Link href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-400">{t.auth.privacyLink}</Link>
          </label>
        </motion.div>

        {/* Submit */}
        <motion.div variants={itemVariants} className="pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 hover:shadow-blue-500/30 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              t.auth.signUpBtn
            )}
          </button>
        </motion.div>
      </form>

      {/* Footer link */}
      <motion.p variants={itemVariants} className="text-center text-sm text-slate-500 dark:text-slate-400">
        {t.auth.hasAccount}{" "}
        <Link href="/signin" className="font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
          {t.auth.signInLink}
        </Link>
      </motion.p>
    </motion.div>
  );
}
