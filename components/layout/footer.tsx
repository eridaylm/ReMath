"use client";

// components/layout/footer.tsx
import Link from "next/link";
import Logo from "../Logo";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      id="tentang"
      className="border-t border-slate-200 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 transition-colors"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo href="/" textClassName="text-2xl" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
            {t.footer.description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{t.footer.productsTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/tes" className="hover:text-blue-600 transition">{t.footer.products.test}</Link></li>
            <li><Link href="/#cara-kerja" className="hover:text-blue-600 transition">{t.footer.products.features}</Link></li>
            <li><Link href="/peringkat" className="hover:text-blue-600 transition">{t.footer.products.leaderboard}</Link></li>
            <li><Link href="/#fitur" className="hover:text-blue-600 transition">{t.footer.products.pricing}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{t.footer.companyTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/#faq" className="hover:text-blue-600 transition">{t.footer.company.blog}</Link></li>
            <li><Link href="/contact-us" className="hover:text-blue-600 transition">{t.footer.company.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{t.footer.newsletterTitle}</h3>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            {t.footer.newsletterDesc}
          </p>
          <div className="mt-5 flex overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <input
              type="email"
              placeholder={t.footer.placeholder}
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-500 px-5 text-sm font-semibold text-white transition hover:opacity-95">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-900 py-5 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 max-w-7xl mx-auto">
        <div>{t.footer.copyright}</div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <Link
            href="/admin/login"
            className="hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1.5 opacity-70 hover:opacity-100"
          >
            <span>Portal Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}