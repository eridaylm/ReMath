"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Send, CheckCircle2, MessageSquare, Mail, MapPin, Phone, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Navbar />
      
      {/* Premium Header */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background glow & gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten animate-float"></div>
          <div className="absolute top-10 right-1/4 w-72 h-72 bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-lighten animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-6">
              <MessageSquare className="h-3.5 w-3.5" />
              Pusat Dukungan ReMath
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Bagaimana kami bisa <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">membantu Anda?</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Punya pertanyaan terkait tes diagnostik? Atau butuh bantuan teknis? Tim kami siap memberikan solusi semudah Anda memecahkan soal matematika.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kami membalas 1x24 jam.</p>
                    <a href="mailto:support@remath.id" className="text-sm font-bold text-blue-600 dark:text-blue-500 hover:underline mt-1 inline-block">support@remath.id</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Telepon / WhatsApp</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Senin - Jumat, 09:00 - 17:00</p>
                    <a href="#" className="text-sm font-bold text-indigo-600 dark:text-indigo-500 hover:underline mt-1 inline-block">+62 811 2233 4455</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Kantor Pusat</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Gedung EduTech Lt. 5<br/>
                      Jl. Matematika No. 42, Jakarta Selatan<br/>
                      DKI Jakarta 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10 transform rotate-12">
                <HelpCircle className="w-32 h-32" />
              </div>
              <h3 className="text-lg font-bold mb-2 relative z-10">Butuh Bantuan Cepat?</h3>
              <p className="text-sm text-blue-100 mb-5 relative z-10 leading-relaxed">
                Kunjungi halaman Pusat Bantuan kami untuk melihat jawaban atas pertanyaan yang paling sering diajukan.
              </p>
              <button className="bg-white text-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-50 transition relative z-10 w-full sm:w-auto">
                Lihat FAQ
              </button>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Kirim Pesan
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Isi form di bawah ini dan kami akan segera kembali kepada Anda.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                      Nama Lengkap
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama Anda" 
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="nama@email.com" 
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                    Subjek
                  </label>
                  <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all">
                    <option value="umum">Pertanyaan Umum</option>
                    <option value="teknis">Bantuan Teknis</option>
                    <option value="akun">Masalah Akun / Login</option>
                    <option value="feedback">Saran & Masukan</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                    Pesan Anda
                  </label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..." 
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-sm text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 resize-none" 
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-95 hover:shadow-blue-500/40 active:scale-[0.98]"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Pesan Berhasil Terkirim
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Kirim Pesan Sekarang
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
