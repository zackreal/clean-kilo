"use client";

import { useState } from "react";
import { CheckCircle, Gift, Sparkle, Ticket, ShieldStar, Info, ArrowsLeftRight, PlusCircle, MinusCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerData, formatPoints } from "@/lib/data";

const rewards = [
  { name: "Diskon 20% Cuci Express", cost: 500, type: "discount", icon: Sparkle },
  { name: "Gratis 1 Kg Cuci Kiloan", cost: 750, type: "free", icon: ShieldStar },
  { name: "Voucher Antar-Jemput Gratis", cost: 1000, type: "voucher", icon: Ticket },
];

const pointsHistory = [
  { id: 1, title: "Poin Pembelanjaan (CK-2406-118)", amount: "+45", type: "in", date: "Hari ini, 14:30" },
  { id: 2, title: "Tukar Reward (Diskon 20%)", amount: "-500", type: "out", date: "Kemarin, 09:15" },
  { id: 3, title: "Bonus Ulang Tahun", amount: "+100", type: "in", date: "12 Jun 2026, 08:00" },
  { id: 4, title: "Poin Pembelanjaan (CK-2405-092)", amount: "+82", type: "in", date: "28 Mei 2026, 16:45" },
];

export function CustomerPointsView({ data }: { data: CustomerData }) {
  const [redeemed, setRedeemed] = useState<string | null>(null);

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

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      
      {/* Sisi Kiri: Status Poin & Edukasi */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Premium Points Card */}
        <motion.div 
          variants={itemVars}
          className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white shadow-2xl shadow-blue-600/30 text-center"
        >
          {/* Animated Background Rays */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          
          <div className="relative z-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md mb-4 shadow-inner border border-white/30">
              <ShieldStar size={28} weight="fill" className="text-white drop-shadow-md" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
              Total Poin Aktif
            </p>
            <p className="mt-2 font-mono text-5xl font-bold tracking-tighter text-white drop-shadow-lg">
              {formatPoints(data.points)}
            </p>
            
            <div className="mt-8 rounded-2xl bg-black/10 backdrop-blur-sm p-4 border border-white/10">
              <div className="flex justify-between items-center text-xs font-semibold mb-2">
                <span className="text-white">{data.tier} Tier</span>
                <span className="text-blue-200">Platinum</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                  className="h-full rounded-full bg-white" 
                />
              </div>
              <p className="mt-2 text-[11px] text-blue-100 font-medium">
                220 poin lagi menuju tier Platinum.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How to get points (Gamification Rules) */}
        <motion.div variants={itemVars} className="clean-card p-5 bg-blue-50/50 border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Info size={20} weight="fill" className="text-blue-500" />
            <h4 className="text-sm font-bold text-zinc-950">Cara Mengumpulkan Poin</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xs font-bold">1</div>
              <p className="text-xs text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Pembelanjaan:</strong> Dapatkan 1 poin untuk setiap pembelanjaan senilai Rp 1.000 (berlaku kelipatan).</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200 text-blue-700 text-xs font-bold">2</div>
              <p className="text-xs text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Misi Spesial:</strong> Dapatkan bonus poin saat Ulang Tahun atau memesan layanan Cuci Express.</p>
            </li>
          </ul>
        </motion.div>

        {/* Success Message for Reward */}
        <AnimatePresence>
          {redeemed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm"
            >
              <CheckCircle size={24} weight="fill" className="text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-bold">Reward Berhasil Diklaim!</p>
                <p className="text-xs mt-0.5 opacity-90">{redeemed} telah ditambahkan ke akun Anda.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sisi Kanan: Daftar Reward & Riwayat Poin */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Katalog Reward */}
        <motion.div variants={itemVars} className="clean-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Gift size={24} className="text-blue-600" weight="fill" />
            <div>
              <h3 className="text-xl font-bold text-zinc-950 tracking-tight">Katalog Reward</h3>
              <p className="text-sm text-zinc-500 mt-0.5">Tukarkan poin Anda dengan penawaran eksklusif.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {rewards.map((reward) => {
              const Icon = reward.icon;
              const canAfford = data.points >= reward.cost;
              
              return (
                <motion.div
                  key={reward.name}
                  variants={itemVars}
                  whileHover={{ scale: 1.01 }}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                    canAfford 
                      ? "border-zinc-200 bg-white hover:border-blue-300 hover:shadow-md" 
                      : "border-zinc-100 bg-zinc-50 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      canAfford ? "bg-blue-50 text-blue-600" : "bg-zinc-200 text-zinc-400"
                    }`}>
                      <Icon size={24} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">
                        {reward.name}
                      </p>
                      <p className="mt-0.5 font-mono text-xs font-semibold text-blue-600">
                        {formatPoints(reward.cost)} poin
                      </p>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      setRedeemed(reward.name);
                      setTimeout(() => setRedeemed(null), 4000);
                    }}
                    className={`w-full sm:w-auto shrink-0 rounded-full px-5 py-2 text-xs font-bold transition-all ${
                      canAfford 
                        ? "bg-zinc-950 text-white hover:bg-zinc-800 shadow-md active:scale-95" 
                        : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    Tukar Poin
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Riwayat Mutasi Poin (Ledger) */}
        <motion.div variants={itemVars} className="clean-card p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-3">
              <ArrowsLeftRight size={24} className="text-zinc-400" weight="bold" />
              <div>
                <h3 className="text-base font-bold text-zinc-950 tracking-tight">Riwayat Poin</h3>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {pointsHistory.map((history) => (
              <div key={history.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${history.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {history.type === 'in' ? <PlusCircle size={16} weight="fill" /> : <MinusCircle size={16} weight="fill" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{history.title}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{history.date}</p>
                  </div>
                </div>
                <div className={`font-mono text-sm font-bold ${history.type === 'in' ? 'text-emerald-600' : 'text-zinc-900'}`}>
                  {history.amount}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
