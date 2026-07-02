"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, Sparkle, WarningCircle, Snowflake, Ticket, PaperPlaneRight, CaretRight, X } from "@phosphor-icons/react";

type CustomerSegment = "VIP" | "New" | "AtRisk" | "Hibernating";

type CustomerData = {
  id: string;
  name: string;
  segment: CustomerSegment;
  recency: string; // Last wash
  frequency: string; // Washes per month
  monetary: string; // Total spent
};

const segmentStats = [
  { id: "VIP", label: "VIP / Whales", count: 42, trend: "+5", icon: Crown, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
  { id: "New", label: "Pelanggan Baru", count: 128, trend: "+12", icon: Sparkle, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  { id: "AtRisk", label: "Berisiko Churn", count: 35, trend: "-2", icon: WarningCircle, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
  { id: "Hibernating", label: "Pasif / Tidur", count: 89, trend: "+8", icon: Snowflake, color: "text-zinc-500", bg: "bg-zinc-100", border: "border-zinc-200" },
];

const customerData: CustomerData[] = [
  { id: "C-001", name: "Budi Santoso", segment: "VIP", recency: "2 hari lalu", frequency: "8x / bulan", monetary: "Rp 1.250.000" },
  { id: "C-002", name: "Siti Aminah", segment: "AtRisk", recency: "2 bulan lalu", frequency: "1x / bulan", monetary: "Rp 150.000" },
  { id: "C-003", name: "Rahmat Hidayat", segment: "New", recency: "Baru saja", frequency: "1x / bulan", monetary: "Rp 45.000" },
  { id: "C-004", name: "Dinda Pratiwi", segment: "VIP", recency: "5 hari lalu", frequency: "6x / bulan", monetary: "Rp 850.000" },
  { id: "C-005", name: "Andi Saputra", segment: "Hibernating", recency: "6 bulan lalu", frequency: "1x total", monetary: "Rp 30.000" },
];

export function AdminSegmentation() {
  const [activeTab, setActiveTab] = useState<CustomerSegment | "All">("All");
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);

  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const filteredData = activeTab === "All" ? customerData : customerData.filter(c => c.segment === activeTab);

  const triggerPromo = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setIsPromoModalOpen(true);
  };

  return (
    <>
      <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Segmentasi Pasar (RFM)</h2>
            <p className="mt-1.5 text-base text-zinc-500">
              Analisis pelanggan berdasarkan Recency (keterkinian), Frequency (frekuensi), dan Monetary (nilai transaksi).
            </p>
          </div>
          <div className="flex bg-zinc-100 p-1 rounded-xl">
            {(["All", "VIP", "New", "AtRisk", "Hibernating"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab 
                    ? "bg-white text-zinc-950 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {tab === "All" ? "Semua" : tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4 Quadrant Cards */}
        <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {segmentStats.map((stat) => {
            const Icon = stat.icon;
            const isActive = activeTab === "All" || activeTab === stat.id;
            
            return (
              <div 
                key={stat.id}
                onClick={() => setActiveTab(stat.id as CustomerSegment)}
                className={`cursor-pointer clean-card p-6 border-2 transition-all duration-300 ${
                  isActive ? stat.border : "border-transparent opacity-60 grayscale"
                } hover:scale-[1.02] active:scale-95`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon size={24} weight="fill" />
                  </div>
                  <h3 className="font-bold text-zinc-700">{stat.label}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-black text-zinc-950 tracking-tighter">{stat.count}</span>
                  <span className={`text-sm font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.trend} bln ini
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* CRM Action Table */}
        <motion.div variants={itemVars} className="clean-card overflow-hidden">
          <div className="border-b border-zinc-100 px-6 py-5 bg-zinc-50/50">
            <h3 className="text-lg font-bold text-zinc-950">Daftar Pelanggan Tersegmentasi</h3>
            <p className="text-sm text-zinc-500 mt-1">Lakukan tindakan retensi spesifik untuk pelanggan di bawah ini.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-xs uppercase text-zinc-400 border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Pelanggan</th>
                  <th className="px-6 py-4 font-semibold">Segmen</th>
                  <th className="px-6 py-4 font-semibold">Recency (Terakhir)</th>
                  <th className="px-6 py-4 font-semibold">Frequency (Total)</th>
                  <th className="px-6 py-4 font-semibold">Monetary (Total)</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi CRM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((customer) => {
                    const statInfo = segmentStats.find(s => s.id === customer.segment)!;
                    const SegIcon = statInfo.icon;
                    
                    return (
                      <motion.tr 
                        key={customer.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="hover:bg-zinc-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-900">{customer.name}</div>
                          <div className="text-xs text-zinc-500 font-mono mt-0.5">{customer.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statInfo.bg} ${statInfo.color}`}>
                            <SegIcon size={14} weight="fill" /> {statInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-zinc-600 font-medium">
                          {customer.recency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-zinc-600 font-medium">
                          {customer.frequency}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-zinc-900">
                          {customer.monetary}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => triggerPromo(customer)}
                            className="inline-flex items-center gap-1.5 bg-zinc-950 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm active:scale-95"
                          >
                            <Ticket size={14} weight="fill" /> Kirim Promo
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* CRM Action Modal */}
      <AnimatePresence>
        {isPromoModalOpen && selectedCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPromoModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 bg-zinc-50">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                    <PaperPlaneRight size={18} weight="fill" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">Kirim Penawaran Spesial</h3>
                </div>
                <button 
                  onClick={() => setIsPromoModalOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-200 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-zinc-600 mb-6">
                  Pilih voucher atau pesan retensi untuk dikirimkan secara otomatis ke WhatsApp <strong>{selectedCustomer.name}</strong>.
                </p>

                <div className="space-y-3">
                  <label className="flex items-start gap-4 p-4 border-2 border-zinc-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <input type="radio" name="promo" className="mt-1 text-blue-600" defaultChecked />
                    <div>
                      <div className="font-bold text-zinc-950">Voucher Diskon 20% (Comeback)</div>
                      <div className="text-xs text-zinc-500 mt-1">Sangat efektif untuk pelanggan "Berisiko Churn" atau "Pasif".</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-4 p-4 border-2 border-zinc-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <input type="radio" name="promo" className="mt-1 text-blue-600" />
                    <div>
                      <div className="font-bold text-zinc-950">Gratis Cuci 1Kg (Loyalty Reward)</div>
                      <div className="text-xs text-zinc-500 mt-1">Reward apresiasi khusus untuk pelanggan "VIP / Whales".</div>
                    </div>
                  </label>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => {
                      alert(`Promo berhasil dikirim ke WhatsApp ${selectedCustomer.name}!`);
                      setIsPromoModalOpen(false);
                    }}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Kirim Sekarang <CaretRight size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
