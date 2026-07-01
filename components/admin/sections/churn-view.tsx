"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WarningCircle, Thermometer, Flame, Ghost, PaperPlaneRight, WhatsappLogo, Ticket, CheckSquareOffset, CurrencyCircleDollar, Plugs } from "@phosphor-icons/react";

type RiskLevel = "Cooling" | "HighRisk" | "Critical";

type ChurnCustomer = {
  id: string;
  name: string;
  phone: string;
  lastOrder: string;
  daysInactive: number;
  riskLevel: RiskLevel;
  lostRevenue: string; // Estimasi jika benar-benar churn
};

const churnData: ChurnCustomer[] = [
  { id: "CH-001", name: "Siti Aminah", phone: "0812-3456-7890", lastOrder: "15 April 2026", daysInactive: 62, riskLevel: "HighRisk", lostRevenue: "Rp 350.000" },
  { id: "CH-002", name: "Rahmat Hidayat", phone: "0857-1234-5678", lastOrder: "20 Mei 2026", daysInactive: 27, riskLevel: "Cooling", lostRevenue: "Rp 150.000" },
  { id: "CH-003", name: "Andi Saputra", phone: "0819-8765-4321", lastOrder: "02 Februari 2026", daysInactive: 134, riskLevel: "Critical", lostRevenue: "Rp 850.000" },
  { id: "CH-004", name: "Mega Lestari", phone: "0821-9988-7766", lastOrder: "10 April 2026", daysInactive: 67, riskLevel: "HighRisk", lostRevenue: "Rp 420.000" },
  { id: "CH-005", name: "Bambang Pamungkas", phone: "0811-2233-4455", lastOrder: "25 Mei 2026", daysInactive: 22, riskLevel: "Cooling", lostRevenue: "Rp 95.000" },
  { id: "CH-006", name: "Dinda Pratiwi", phone: "0813-5544-3322", lastOrder: "18 Maret 2026", daysInactive: 90, riskLevel: "Critical", lostRevenue: "Rp 560.000" },
];

const riskConfig = {
  Cooling: { label: "Cooling Down", threshold: "30 Hari", icon: Thermometer, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", count: 2 },
  HighRisk: { label: "High Risk", threshold: "60 Hari", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", count: 2 },
  Critical: { label: "Critical (Ghost)", threshold: "90+ Hari", icon: Ghost, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", count: 2 },
};

export function AdminChurnView() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(churnData.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBroadcast = () => {
    if (selectedIds.length === 0) return;
    setIsBroadcastModalOpen(true);
  };

  const confirmBroadcast = () => {
    alert(`Win-Back Promo via WhatsApp berhasil ditembakkan ke ${selectedIds.length} pelanggan secara serentak!`);
    setIsBroadcastModalOpen(false);
    setSelectedIds([]);
  };

  return (
    <>
      <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
        
        {/* Header */}
        <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Manajemen Churn</h2>
            <p className="mt-1.5 text-base text-zinc-500">
              Pusat Kampanye Retensi (Win-Back) untuk menyelamatkan pendapatan dari pelanggan yang mulai menghilang.
            </p>
          </div>
          <button 
            onClick={handleBroadcast}
            disabled={selectedIds.length === 0}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 ${
              selectedIds.length > 0 
                ? "bg-zinc-950 text-white hover:bg-zinc-800 hover:shadow-xl hover:-translate-y-0.5" 
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <PaperPlaneRight size={18} weight="fill" /> 
            Broadcast Promo ({selectedIds.length})
          </button>
        </motion.div>

        {/* Risk Pipeline Dashboard */}
        <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(riskConfig) as RiskLevel[]).map((level) => {
            const conf = riskConfig[level];
            const Icon = conf.icon;
            return (
              <div key={level} className={`clean-card p-6 border-l-4 ${conf.border}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2.5 rounded-xl ${conf.bg} ${conf.color}`}>
                    <Icon size={24} weight="fill" />
                  </div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{conf.threshold} Inaktif</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-500">{conf.label}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-zinc-950">{conf.count}</span>
                    <span className="text-sm font-semibold text-zinc-400">Pelanggan</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Churn Table with Lost Revenue */}
        <motion.div variants={itemVars} className="clean-card overflow-hidden">
          <div className="border-b border-zinc-100 px-6 py-5 bg-white flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Daftar Pelanggan "At Risk"</h3>
              <p className="text-sm text-zinc-500 mt-1">Sentang pelanggan untuk mengirim pesan Retensi (Win-Back) massal.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold">
              <WarningCircle size={18} weight="fill" />
              Total Risiko Rugi: Rp 2.425.000
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4 font-semibold w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      checked={selectedIds.length === churnData.length && churnData.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 font-semibold">Nama & Kontak</th>
                  <th className="px-6 py-4 font-semibold">Suhu Risiko</th>
                  <th className="px-6 py-4 font-semibold">Terakhir Order</th>
                  <th className="px-6 py-4 font-semibold text-right text-red-500 flex justify-end gap-1 items-center">
                    <Plugs size={16} /> Potensi Hilang
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <AnimatePresence>
                  {churnData.map((customer) => {
                    const conf = riskConfig[customer.riskLevel];
                    const RIcon = conf.icon;
                    const isSelected = selectedIds.includes(customer.id);

                    return (
                      <motion.tr 
                        key={customer.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`transition-colors ${isSelected ? "bg-blue-50/50" : "hover:bg-zinc-50/50"}`}
                      >
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            checked={isSelected}
                            onChange={() => handleSelectOne(customer.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-zinc-900">{customer.name}</div>
                          <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                            <WhatsappLogo size={12} weight="fill" className="text-emerald-500" />
                            {customer.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${conf.bg} ${conf.color}`}>
                            <RIcon size={14} weight="fill" /> {conf.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-semibold text-zinc-700">{customer.daysInactive} Hari Lalu</div>
                          <div className="text-xs text-zinc-400">{customer.lastOrder}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                            {customer.lostRevenue}
                          </span>
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

      {/* Broadcast Modal Overlay */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBroadcastModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="bg-emerald-600 p-6 text-white text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4 backdrop-blur-md">
                  <WhatsappLogo size={36} weight="fill" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Broadcast Win-Back Promo</h3>
                <p className="text-emerald-100 mt-2 text-sm">
                  Mengirimkan Blast WhatsApp ke <strong>{selectedIds.length} Pelanggan</strong> sekaligus.
                </p>
              </div>

              <div className="p-6">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-6 relative">
                  <div className="absolute top-4 right-4 text-zinc-400">
                    <CheckSquareOffset size={20} weight="fill" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Preview Pesan (Auto-generated)</h4>
                  <p className="text-sm text-zinc-800 leading-relaxed font-mono">
                    "Halo <span className="text-blue-600 bg-blue-50 px-1 rounded">[Nama Pelanggan]</span>! 👋<br/><br/>
                    Sudah lama kami tidak mencuci pakaianmu di CleanKilo. Kami merindukanmu! Sebagai hadiah spesial karena kamu pernah menjadi pelanggan setia kami, ini ada <strong>Voucher Diskon 20%</strong> untuk cucian berikutnya.<br/><br/>
                    Kode: <strong>COMEBACK20</strong> (Berlaku 7 Hari). Yuk, nyuci lagi! 👕✨"
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsBroadcastModalOpen(false)}
                    className="w-1/3 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    Batalkan
                  </button>
                  <button 
                    onClick={confirmBroadcast}
                    className="w-2/3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2"
                  >
                    Kirim Broadcast Sekarang <PaperPlaneRight size={18} weight="fill" />
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
