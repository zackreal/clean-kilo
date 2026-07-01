"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Star, ChartLineUp, ChatCircleText, Warning, MagicWand, CheckCircle } from "@phosphor-icons/react";
import { reviews } from "@/lib/data";

export function AdminFeedbackCenter() {
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleSendReply = (id: string) => {
    if (!replies[id]?.trim()) return;
    setSuccessId(id);
    setTimeout(() => {
      setSuccessId(null);
      setActiveReplyId(null);
    }, 2500);
  };

  const handleDraftAI = (id: string, name: string, stars: number) => {
    setIsGenerating(id);
    
    // Simulate AI generation delay
    setTimeout(() => {
      let draft = "";
      if (stars >= 4) {
        draft = `Halo Kak ${name}! Terima kasih banyak atas ulasan bintang ${stars}-nya. Kami sangat senang Kakak puas dengan layanan CleanKilo. Ditunggu cucian berikutnya ya Kak! ✨`;
      } else if (stars === 3) {
        draft = `Halo Kak ${name}, terima kasih atas masukannya. Kami akan terus berusaha meningkatkan kualitas layanan kami agar bisa memberikan pengalaman bintang 5 di order selanjutnya. 🙏`;
      } else {
        draft = `Halo Kak ${name}. Kami memohon maaf yang sebesar-besarnya atas ketidaknyamanan yang terjadi. Kami telah mencatat keluhan ini dan tim operasional kami akan segera menghubungi Kakak untuk proses kompensasi/perbaikan. 🙏`;
      }
      
      setReplies({ ...replies, [id]: draft });
      setIsGenerating(null);
    }, 800);
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Pusat Reputasi (Feedback)</h2>
          <p className="mt-1.5 text-base text-zinc-500">
            Monitor kepuasan pelanggan, analisis sentimen, dan tanggapi ulasan secara profesional.
          </p>
        </div>
      </motion.div>

      {/* KPI Dashboard */}
      <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="clean-card p-6 border-b-4 border-amber-400">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 text-amber-500 rounded-lg"><Star size={20} weight="fill" /></div>
            <span className="text-sm font-bold text-zinc-500">Rata-rata Rating</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-950">4.8</span>
            <span className="text-sm font-bold text-zinc-400 mb-1">/ 5.0</span>
          </div>
        </div>

        <div className="clean-card p-6 border-b-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ChatCircleText size={20} weight="fill" /></div>
            <span className="text-sm font-bold text-zinc-500">Total Ulasan Masuk</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-950">128</span>
            <span className="text-sm font-bold text-emerald-500 mb-1">+12 bulan ini</span>
          </div>
        </div>

        <div className="clean-card p-6 border-b-4 border-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><ChartLineUp size={20} weight="bold" /></div>
            <span className="text-sm font-bold text-zinc-500">Sentimen Positif</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-950">92%</span>
            <span className="text-sm font-bold text-emerald-500 mb-1">Sangat Sehat</span>
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.section variants={itemVars} className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-950 px-1">Ulasan Terbaru</h3>
        
        {reviews.map((item) => {
          const isNegative = item.stars <= 2;
          const isPositive = item.stars >= 4;
          
          return (
            <div key={item.id} className="clean-card p-6 transition-all hover:border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950">{item.name}</h4>
                    <div className="text-xs text-zinc-400">Pelanggan Terverifikasi</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Sentiment Badge */}
                  {isNegative && (
                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold border border-red-100">
                      <Warning size={14} weight="fill" /> Keluhan
                    </span>
                  )}
                  {isPositive && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100">
                      Pujian 🤩
                    </span>
                  )}
                  {!isNegative && !isPositive && (
                    <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-md text-xs font-bold border border-zinc-200">
                      Netral
                    </span>
                  )}

                  {/* Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} weight={index < item.stars ? "fill" : "regular"} className={index >= item.stars ? "text-zinc-200" : ""} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 mb-4">
                <p className="text-sm leading-relaxed text-zinc-700 italic">"{item.text}"</p>
              </div>

              <AnimatePresence mode="wait">
                {activeReplyId !== item.id ? (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveReplyId(item.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-700 transition hover:bg-zinc-200"
                    >
                      Balas Ulasan
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3 rounded-xl border-2 border-blue-100 bg-blue-50/30 p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-blue-800 uppercase tracking-widest flex items-center gap-1.5">
                        <ChatCircleText size={14} weight="fill" /> Helpdesk Reply
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleDraftAI(item.id, item.name, item.stars)}
                        disabled={isGenerating === item.id}
                        className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-colors disabled:opacity-50"
                      >
                        <MagicWand size={14} weight="fill" className={isGenerating === item.id ? "animate-spin" : ""} /> 
                        {isGenerating === item.id ? "Membuat Draft..." : "Draft with AI"}
                      </button>
                    </div>
                    
                    <textarea
                      placeholder={`Tulis balasan resmi perusahaan untuk ${item.name}...`}
                      value={replies[item.id] || ""}
                      onChange={(event) =>
                        setReplies({
                          ...replies,
                          [item.id]: event.target.value,
                        })
                      }
                      className="w-full min-h-[100px] resize-y bg-white border border-blue-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    
                    <div className="flex items-center justify-between pt-2">
                      <button 
                        type="button"
                        onClick={() => setActiveReplyId(null)}
                        className="text-xs font-bold text-zinc-500 hover:text-zinc-900"
                      >
                        Batal
                      </button>
                      <div className="flex items-center gap-3">
                        {successId === item.id && (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle size={14} weight="fill" /> Balasan Terkirim
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSendReply(item.id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                        >
                          Kirim Balasan <ArrowRight size={14} weight="bold" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.section>
    </motion.div>
  );
}
