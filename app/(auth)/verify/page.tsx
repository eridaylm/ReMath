"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

function VerifyContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@email.com";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [shake, setShake] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index]?.focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next field
    if (digit && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous field if current is empty
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        focusInput(index - 1);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < 5) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const newOtp = Array(6).fill("");
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      focusInput(Math.min(pastedData.length, 5));
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(Array(6).fill(""));
    focusInput(0);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;

    setVerifying(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Verifikasi gagal");

      // Redirect ke halaman login setelah berhasil verifikasi
      window.location.href = "/signin";
    } catch (err: any) {
      setShake(true);
      setErrorMsg(err.message);
      setTimeout(() => setShake(false), 600);
    } finally {
      setVerifying(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Icon */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t.auth.verifyTitle}
        </h1>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          {t.auth.verifySubtitle}{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>
        </p>
      </motion.div>

      {/* Error Message */}
      {errorMsg && (
        <motion.div variants={itemVariants} className="rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10 text-sm text-center">
          <p className="text-red-800 dark:text-red-300">
            {errorMsg}
          </p>
        </motion.div>
      )}

      {/* OTP Inputs */}
      <form onSubmit={handleVerify}>
        <motion.div
          variants={itemVariants}
          animate={shake ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={shake ? { duration: 0.5 } : {}}
          className="flex justify-center gap-2.5 sm:gap-3"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`h-14 w-12 rounded-xl border-2 text-center text-xl font-bold outline-none transition-all sm:h-16 sm:w-14 ${
                digit
                  ? "border-blue-500 bg-blue-50/50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300"
                  : "border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                shake ? "border-red-400 dark:border-red-500" : ""
              }`}
              autoFocus={index === 0}
            />
          ))}
        </motion.div>

        {/* Verify Button */}
        <motion.div variants={itemVariants} className="mt-6">
          <button
            type="submit"
            disabled={!isComplete || verifying}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 hover:shadow-blue-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {verifying ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
            ) : (
              t.auth.verifyBtn
            )}
          </button>
        </motion.div>
      </form>

      {/* Resend */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.auth.didntReceive}
        </p>
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
          >
            {t.auth.resendCode}
          </button>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {t.auth.resendIn}{" "}
            <span className="font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
              {String(Math.floor(countdown / 60)).padStart(2, "0")}:{String(countdown % 60).padStart(2, "0")}
            </span>{" "}
            {t.auth.seconds}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
