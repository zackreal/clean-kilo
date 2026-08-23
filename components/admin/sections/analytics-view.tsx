"use client";

import { motion } from "motion/react";
import {
  ChartBar,
  TrendUp,
  TrendDown,
  Users,
  Coin,
  Star,
  ShoppingCart,
  CalendarBlank,
  ArrowRight,
  Crown,
} from "@phosphor-icons/react";

const monthlyData = [
  { month: "Jan", revenue: 28.5, orders: 310, customers: 180 },
  { month: "Feb", revenue: 30.2, orders: 345, customers: 195 },
  { month: "Mar", revenue: 32.1, orders: 380, customers: 220 },
  { month: "Apr", revenue: 29.8, orders: 355, customers: 210 },
  { month: "Mei", revenue: 34.7, orders: 410, customers: 245 },
  { month: "Jun", revenue: 36.5, orders: 428, customers: 260 },
];

const serviceBreakdown = [
  { name: "Cuci Kiloan Reguler", percentage: 42, revenue: "Rp 15.3jt", color: "bg-blue-500" },
  { name: "Cuci + Setrika Express", percentage: 28, revenue: "Rp 10.2jt", color: "bg-emerald-500" },
  { name: "Dry Cleaning", percentage: 18, revenue: "Rp 6.6jt", color: "bg-purple-500" },
  { name: "Cuci Sepatu/Tas", percentage: 8, revenue: "Rp 2.9jt", color: "bg-amber-500" },
  { name: "Layanan Lainnya", percentage: 4, revenue: "Rp 1.5jt", color: "bg-zinc-400" },
];

const topCustomers = [
  { name: "Dinda Pratiwi", orders: 14, spent: "Rp 1.2jt", tier: "Gold" },
  { name: "Andi Saputra", orders: 11, spent: "Rp 980rb", tier: "Gold" },
  { name: "Siti Aminah", orders: 9, spent: "Rp 750rb", tier: "Silver" },
  { name: "Budi Santoso", orders: 8, spent: "Rp 620rb", tier: "Silver" },
  { name: "Rahmat Hidayat", orders: 6, spent: "Rp 540rb", tier: "Silver" },
];

const performanceMetrics = [
  { label: "Rata-rata Order/Hari", value: "14.3", change: "+2.1", up: true, icon: ShoppingCart },
  { label: "Rata-rata Pendapatan/Hari", value: "Rp 1.2jt", change: "+8.5%", up: true, icon: Coin },
  { label: "Customer Retention Rate", value: "87.5%", change: "+3.2%", up: true, icon: Users },
  { label: "Avg. Customer Rating", value: "4.8/5.0", change: "+0.1", up: true, icon: Star },
  { label: "Churn Rate", value: "4.2%", change: "-1.8%", up: false, icon: TrendDown },
  { label: "Repeat Order Rate", value: "68%", change: "+5%", up: true, icon: TrendUp },
];

const containerVars: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVars: any = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function AnalyticsView() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <motion.div className="space-y-6" variants={containerVars} initial="hidden" animate="show">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Laporan & Analitik</h2>
        <p className="mt-1.5 text-base text-zinc-500">
          Analisis mendalam performa bisnis, tren pendapatan, dan perilaku pelanggan.
        </p>
      </motion.div>

      {/* Performance Metric Cards */}
      <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="clean-card p-5 hover:-translate-y-0.5 transition-transform duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-zinc-100 text-zinc-600">
                  <Icon size={18} weight="bold" />
                </div>
                <span className={`text-xs font-bold flex items-center gap-1 ${metric.up ? "text-emerald-600" : "text-red-500"}`}>
                  {metric.up ? <TrendUp size={12} weight="bold" /> : <TrendDown size={12} weight="bold" />}
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-black text-zinc-950 tracking-tight">{metric.value}</h3>
              <p className="text-xs font-semibold text-zinc-500 mt-1">{metric.label}</p>
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Revenue Bar Chart */}
        <motion.section variants={itemVars} className="clean-card p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
                <ChartBar size={20} weight="fill" className="text-blue-600" />
                Pendapatan per Bulan
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">Dalam jutaan rupiah (Semester 1 2026)</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 bg-zinc-100 rounded-lg px-3 py-1.5">
              <CalendarBlank size={13} weight="bold" />
              2026
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-52">
            {monthlyData.map((d, i) => {
              const heightPct = (d.revenue / maxRevenue) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-600">Rp {d.revenue}jt</span>
                  <motion.div
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 relative group cursor-pointer"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-t-lg transition-colors" />
                  </motion.div>
                  <span className="text-xs font-bold text-zinc-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Service Breakdown */}
        <motion.section variants={itemVars} className="clean-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-zinc-950 mb-1">Distribusi Layanan</h3>
          <p className="text-xs text-zinc-500 mb-5">Kontribusi pendapatan per layanan</p>
          <div className="space-y-4">
            {serviceBreakdown.map((svc) => (
              <div key={svc.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-zinc-700">{svc.name}</span>
                  <span className="text-xs font-bold text-zinc-500">{svc.revenue}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${svc.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${svc.percentage}%` }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] font-bold text-zinc-400 mt-0.5 block">{svc.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <motion.section variants={itemVars} className="clean-card p-0 overflow-hidden">
          <div className="p-6 border-b border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
              <Crown size={20} weight="fill" className="text-amber-500" />
              Top Pelanggan
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Berdasarkan jumlah order bulan ini</p>
          </div>
          <div className="divide-y divide-zinc-50">
            {topCustomers.map((cust, i) => (
              <div key={cust.name} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 transition-colors">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                  i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-zinc-200 text-zinc-600" : "bg-orange-100 text-orange-600"
                }`}>
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 truncate">{cust.name}</p>
                  <p className="text-[11px] text-zinc-500">{cust.orders} order · {cust.spent}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  cust.tier === "Gold"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-zinc-100 text-zinc-600"
                }`}>
                  {cust.tier}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Monthly Order Trend */}
        <motion.section variants={itemVars} className="clean-card p-6">
          <h3 className="text-lg font-bold text-zinc-950 flex items-center gap-2 mb-1">
            <TrendUp size={20} weight="fill" className="text-emerald-500" />
            Tren Order Bulanan
          </h3>
          <p className="text-xs text-zinc-500 mb-5">Jumlah order & pertumbuhan pelanggan</p>

          <div className="space-y-4">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="w-8 text-xs font-bold text-zinc-500 text-right">{d.month}</span>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-3 rounded-full bg-zinc-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.orders / 450) * 100}%` }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                  <span className="text-xs font-bold text-zinc-700 w-12 text-right">{d.orders}</span>
                </div>
                <div className="flex items-center gap-1 w-16 justify-end">
                  <Users size={12} className="text-zinc-400" />
                  <span className="text-[11px] font-semibold text-zinc-500">{d.customers}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-500">Total Semester 1</p>
              <p className="text-xl font-black text-zinc-950">2,228 Order</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-zinc-500">Total Pelanggan</p>
              <p className="text-xl font-black text-emerald-600">260 Aktif</p>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}