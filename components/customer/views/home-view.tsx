"use client";

import { motion } from "motion/react";
import { Check, Package, Drop, Wind, TShirt, HandCoins, ArrowRight, SealCheck, CheckCircle, Gift, ClockCounterClockwise, StarHalf, Headset } from "@phosphor-icons/react";
import {
  CustomerData,
  CustomerTab,
  formatPoints,
  OrderStatus,
} from "@/lib/data";

const steps: Array<{
  id: OrderStatus;
  label: string;
  icon: any;
}> = [
  { id: "diterima", label: "Diterima", icon: Package },
  { id: "dicuci", label: "Dicuci", icon: Drop },
  { id: "dikeringkan", label: "Dikeringkan", icon: Wind },
  { id: "disetrika", label: "Disetrika", icon: TShirt },
  { id: "selesai", label: "Selesai", icon: CheckCircle },
];

export function CustomerHomeView({
  data,
  onNavigate,
}: {
  data: CustomerData;
  onNavigate: (tab: CustomerTab) => void;
}) {
  const currentStatus: OrderStatus = "dicuci";
  const currentIndex = steps.findIndex((step) => step.id === currentStatus);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      
      {/* Sisi Kiri: Digital Member Card & Stats */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Premium Digital Member Card (Animated) */}
        <motion.div 
          variants={itemVars}
          whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white shadow-xl shadow-zinc-950/20 perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/30 blur-[40px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-[40px]"
          />
          
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]" style={{ transform: "translateZ(30px)" }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-zinc-400">Member</p>
                <p className="text-xl font-bold tracking-tight text-white mt-0.5">{data.name}</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 border border-blue-400/30 backdrop-blur-md"
              >
                <SealCheck size={16} className="text-blue-400" weight="fill" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  {data.tier}
                </span>
              </motion.div>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400 mb-1">Total Poin Aktif</p>
                <p className="font-mono text-3xl font-bold text-white tracking-tighter">
                  {formatPoints(data.points)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-zinc-400 mb-1">Voucher</p>
                <p className="font-mono text-xl font-bold text-white tracking-tighter">
                  {data.vouchers}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Promo / Info Chip */}
        <motion.section 
          variants={itemVars}
          whileHover={{ scale: 1.02 }}
          className="clean-card p-5 bg-blue-50/50 border-blue-100 cursor-default transition-all hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/5"
        >
          <div className="flex gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm"
            >
              <HandCoins size={18} weight="fill" />
            </motion.div>
            <div>
              <p className="text-sm font-bold text-zinc-950">
                Bonus 2x Poin Akhir Bulan
              </p>
              <p className="mt-1 text-xs font-medium text-zinc-500 leading-relaxed">
                Khusus member Gold. Berlaku untuk layanan Cuci Kiloan Reguler dan Express.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Sisi Kanan: Live Tracking & Action */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Enhanced Order Tracker */}
        <motion.section variants={itemVars} className="clean-card p-6 lg:p-8 relative overflow-hidden group">
          {/* Subtle Background Accent */}
          <motion.div 
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 0.05, rotate: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 p-4 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
          >
            <svg width="120" height="120" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Layanan Aktif
              </p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-blue-600">
                CK-2406-118
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Estimasi Berat
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-zinc-950">
                4,2 <span className="text-sm text-zinc-500">kg</span>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-1/2 -mt-[1px] h-[2px] w-[calc(100%-3rem)] bg-zinc-100 hidden sm:block"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const done = index < currentIndex;
                  const active = index === currentIndex;

                  return (
                    <motion.div 
                      key={step.id} 
                      whileHover={{ scale: 1.05 }}
                      className={`flex sm:flex-col items-center gap-4 sm:gap-3 text-left sm:text-center p-3 rounded-xl transition-colors ${active ? 'bg-blue-50/50 sm:bg-transparent' : ''}`}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1), type: "spring" }}
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white ${
                          done
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : active
                              ? "border-blue-600 text-blue-600 ring-4 ring-blue-50"
                              : "border-zinc-200 text-zinc-400"
                        }`}
                      >
                        {done ? <Check size={20} weight="bold" /> : <Icon size={20} weight={active ? "duotone" : "regular"} />}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                      >
                        <p
                          className={`text-sm font-bold ${
                            active ? "text-blue-700" : "text-zinc-600"
                          }`}
                        >
                          {step.label}
                        </p>
                        {active && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                            className="text-xs font-medium text-blue-500 mt-0.5"
                          >
                            Sedang diproses
                          </motion.p>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Bento Grid */}
        <motion.div variants={itemVars} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("points")}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
          >
            <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
              <Gift size={24} weight="duotone" />
            </div>
            <span className="text-xs font-bold text-zinc-700 group-hover:text-amber-700">Tukar Poin</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("history")}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <ClockCounterClockwise size={24} weight="duotone" />
            </div>
            <span className="text-xs font-bold text-zinc-700 group-hover:text-blue-700">Riwayat</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("feedback")}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
          >
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
              <StarHalf size={24} weight="duotone" />
            </div>
            <span className="text-xs font-bold text-zinc-700 group-hover:text-emerald-700">Ulasan</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("Menghubungkan ke layanan WhatsApp Customer Service...")}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-purple-300 transition-all group"
          >
            <div className="h-12 w-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
              <Headset size={24} weight="duotone" />
            </div>
            <span className="text-xs font-bold text-zinc-700 group-hover:text-purple-700">Bantuan CS</span>
          </motion.button>
        </motion.div>

        {/* Action Button */}
        <motion.button
          variants={itemVars}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => onNavigate("order")}
          className="group flex w-full items-center justify-between rounded-2xl bg-zinc-950 px-6 py-5 text-sm font-bold text-white transition hover:bg-zinc-800 shadow-lg"
        >
          <span>Buat Order Antar-Jemput Baru</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

    </motion.div>
  );
}
