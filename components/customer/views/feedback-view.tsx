"use client";

import { useState } from "react";
import { CheckCircle, Star, ChatCircleText, Heart, PaperPlaneRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const goodTags = ["Wangi Banget", "Tepat Waktu", "Kurir Ramah", "Sangat Bersih", "Pakaian Rapi"];
const badTags = ["Terlambat", "Kurang Bersih", "Kurir Tidak Ramah", "Pakaian Luntur", "Harga Mahal"];

export function CustomerFeedbackView() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [success, setSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const getRatingText = (val: number) => {
    switch (val) {
      case 1: return "Sangat Mengecewakan 😠";
      case 2: return "Kurang Memuaskan 🙁";
      case 3: return "Cukup Baik 😐";
      case 4: return "Sangat Baik! 🙂";
      case 5: return "Luar Biasa Sempurna! 🤩";
      default: return "Pilih bintang penilaian";
    }
  };

  const currentDisplayRating = hoverRating || rating;
  const isBadRating = rating > 0 && rating <= 3;
  const isGoodRating = rating >= 4;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="relative flex h-32 w-32 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl animate-pulse"></div>
          <Heart size={64} weight="fill" className="relative z-10 text-emerald-500" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-black tracking-tighter text-zinc-950 mb-3"
        >
          Terima Kasih!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-500 max-w-sm mb-10 text-base"
        >
          Ulasan Anda sangat berarti bagi kami. Tim CleanKilo akan terus meningkatkan layanan berdasarkan masukan Anda.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => {
            setSuccess(false);
            setRating(0);
            setSelectedTags([]);
            setNote("");
          }}
          className="rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
        >
          Kembali ke Beranda
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto space-y-8 pb-10"
    >
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6 border border-blue-100">
          <ChatCircleText size={32} weight="duotone" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
          Bagaimana Pengalaman Anda?
        </h2>
        <p className="mt-2 text-base text-zinc-500">
          Beritahu kami kepuasan Anda terhadap layanan cuci kami.
        </p>
      </div>

      <motion.form
        variants={itemVars}
        onSubmit={(event) => {
          event.preventDefault();
          if (rating === 0) return alert("Mohon pilih rating bintang terlebih dahulu.");
          setSuccess(true);
        }}
        className="clean-card p-6 sm:p-10 space-y-10"
      >
        
        {/* Interactive Star Rating */}
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-4" onMouseLeave={() => setHoverRating(0)}>
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const isActive = value <= currentDisplayRating;
              return (
                <motion.button
                  key={value}
                  type="button"
                  onMouseEnter={() => setHoverRating(value)}
                  onClick={() => setRating(value)}
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 transition-colors ${
                    isActive ? "text-amber-400" : "text-zinc-200 hover:text-amber-200"
                  }`}
                  aria-label={`Beri rating ${value}`}
                >
                  <Star size={48} weight={isActive ? "fill" : "regular"} className="drop-shadow-sm" />
                </motion.button>
              );
            })}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDisplayRating}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className={`text-sm font-bold px-4 py-1.5 rounded-full ${
                currentDisplayRating >= 4 ? "bg-emerald-50 text-emerald-700" : 
                currentDisplayRating > 0 ? "bg-orange-50 text-orange-700" : 
                "bg-zinc-100 text-zinc-500"
              }`}
            >
              {getRatingText(currentDisplayRating)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Quick Tags */}
        <AnimatePresence>
          {rating > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-950 mb-3">
                  {isGoodRating ? "Apa yang membuat Anda puas?" : "Apa yang perlu kami perbaiki?"}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(isGoodRating ? goodTags : badTags).map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                          isSelected 
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20" 
                            : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea Catatan Tambahan */}
        <div className="space-y-3 pt-4 border-t border-zinc-100">
          <label className="text-sm font-semibold text-zinc-950">
            Ceritakan lebih detail (Opsional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ketik pengalaman, saran, atau komplain Anda di sini..."
            className="w-full min-h-[120px] resize-y rounded-2xl border border-zinc-200 bg-zinc-50/50 py-4 px-5 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 shadow-inner"
          />
        </div>

        <button
          type="submit"
          className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-4 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rating === 0}
        >
          <PaperPlaneRight size={20} weight="fill" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          Kirim Ulasan Sekarang
        </button>
      </motion.form>
    </motion.div>
  );
}
