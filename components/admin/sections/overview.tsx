"use client";

import { motion } from "motion/react";
import { TrendUp, Users, Coin, Star, Sparkle, ChatCircleText, ArrowRight, Clock, Checks } from "@phosphor-icons/react";

const kpis = [
  { label: "Order Bulan Ini", value: "428", icon: TrendUp, trend: "+12.5%", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Pendapatan Kotor", value: "Rp 36,5jt", icon: Coin, trend: "+5.2%", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pelanggan Aktif", value: "1,248", icon: Users, trend: "+24 (Baru)", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Rating Kepuasan", value: "4.8", icon: Star, trend: "+0.1 Naik", color: "text-purple-600", bg: "bg-purple-50" },
];

const activities = [
  { id: 1, title: "Order Baru Masuk", desc: "Budi Santoso - Cuci Kilat (5kg)", time: "2 mnt lalu", icon: Sparkle, color: "text-blue-500" },
  { id: 2, title: "Ulasan 5 Bintang", desc: "Siti Aminah: 'Wanginya awet banget!'", time: "15 mnt lalu", icon: Star, color: "text-amber-500" },
  { id: 3, title: "Order Selesai", desc: "Andi Saputra - Cuci Setrika (10kg)", time: "1 jam lalu", icon: Checks, color: "text-emerald-500" },
  { id: 4, title: "Komplain Masuk", desc: "Dinda - Pakaian sedikit luntur", time: "2 jam lalu", icon: ChatCircleText, color: "text-red-500" },
  { id: 5, title: "Voucher Diklaim", desc: "Rahmat menggunakan COMEBACK20", time: "5 jam lalu", icon: TrendUp, color: "text-purple-500" },
];

export function AdminOverview() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <Header
        title="Executive Dashboard"
        subtitle="Pusat komando operasional CleanKilo. Pantau metrik dan arus kas secara real-time."
      />

      {/* KPI Cards Grid */}
      <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="clean-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* Abstract Shape Background */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.bg} opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${item.bg} ${item.color}`}>
                    <Icon size={22} weight="fill" />
                  </div>
                  <span className="text-xs font-bold text-zinc-500">{item.trend}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-zinc-950 tracking-tighter mb-1">{item.value}</h3>
                  <p className="text-sm font-semibold text-zinc-500">{item.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Main Content: Chart & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gradient Area Chart */}
        <motion.section variants={itemVars} className="clean-card p-6 lg:p-8 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-5 mb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">
                Tren Pendapatan Bulanan
              </h3>
              <p className="text-sm text-zinc-500">Januari - Juni 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50"></span>
              <span className="text-sm font-bold text-zinc-600">Pendapatan (Juta Rp)</span>
            </div>
          </div>

          <div className="flex-1 w-full relative min-h-[250px]">
            <svg viewBox="0 0 620 250" role="img" aria-label="Grafik pendapatan bulanan" className="w-full h-full drop-shadow-sm">
              <defs>
                <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                  <stop offset="80%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <g stroke="#f4f4f5" strokeWidth="1" strokeDasharray="4 4">
                <line x1="40" y1="40" x2="580" y2="40" />
                <line x1="40" y1="100" x2="580" y2="100" />
                <line x1="40" y1="160" x2="580" y2="160" />
                <line x1="40" y1="220" x2="580" y2="220" />
              </g>

              {/* Area Fill */}
              <motion.path
                d="M46 160 C95 140 108 120 145 110 C185 100 207 140 245 120 C285 100 303 60 345 70 C386 80 405 90 444 60 C484 30 510 50 544 40 L544 220 L46 220 Z"
                fill="url(#blueGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              />
              
              {/* Solid Line */}
              <motion.path
                d="M46 160 C95 140 108 120 145 110 C185 100 207 140 245 120 C285 100 303 60 345 70 C386 80 405 90 444 60 C484 30 510 50 544 40"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* Highlight Dots */}
              <g fill="#ffffff">
                {[
                  [46, 160], [145, 110], [245, 120], [345, 70], [444, 60], [544, 40]
                ].map(([x, y], i) => (
                  <motion.circle 
                    key={`${x}-${y}`} 
                    cx={x} 
                    cy={y} 
                    r="5"
                    className="stroke-blue-600 stroke-[3px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  />
                ))}
              </g>
              
              {/* X-Axis */}
              <g fill="#a1a1aa" fontSize="12" fontWeight="700" textAnchor="middle">
                {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((month, index) => (
                  <text key={month} x={46 + index * 99.6} y="240">{month}</text>
                ))}
              </g>
            </svg>
          </div>
        </motion.section>

        {/* Live Activity Feed */}
        <motion.section variants={itemVars} className="clean-card p-0 overflow-hidden flex flex-col h-full max-h-[450px]">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <div>
              <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Live Activity
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Pembaruan sistem real-time.</p>
            </div>
            <button className="text-blue-600 text-xs font-bold hover:underline">Lihat Semua</button>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {activities.map((act) => {
                const AIcon = act.icon;
                return (
                  <div key={act.id} className="flex gap-4 p-3 rounded-xl hover:bg-zinc-50 transition-colors group">
                    <div className={`mt-1 bg-white border border-zinc-100 shadow-sm p-2 rounded-full h-min ${act.color}`}>
                      <AIcon size={16} weight="bold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{act.title}</h4>
                        <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                          <Clock size={12} /> {act.time}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 line-clamp-1">{act.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 bg-zinc-950 mt-auto">
            <button className="w-full flex items-center justify-center gap-2 text-white text-sm font-bold py-2 rounded-lg hover:bg-zinc-800 transition-colors">
              Buka Command Center <ArrowRight size={16} />
            </button>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-zinc-950">{title}</h2>
      <p className="mt-1.5 text-base text-zinc-500">{subtitle}</p>
    </motion.div>
  );
}
