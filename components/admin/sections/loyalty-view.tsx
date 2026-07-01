"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Coins, Crown, Sparkle, Star, HandCoins, Ticket, Lightning, Gift } from "@phosphor-icons/react";

type Promo = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  icon: any;
};

export function AdminLoyaltyView() {
  const [saved, setSaved] = useState(false);
  
  // Point Conversion State
  const [rupiahVal, setRupiahVal] = useState("1.000");
  const [pointVal, setPointVal] = useState("1");

  // Promos State
  const [promos, setPromos] = useState<Promo[]>([
    { id: "P1", name: "Bonus 2x Poin Akhir Bulan", description: "Menggandakan poin untuk setiap transaksi di minggu terakhir.", active: true, icon: Lightning },
    { id: "P2", name: "Diskon 15% Cuci Express", description: "Otomatis memotong harga 15% untuk layanan Express.", active: false, icon: Ticket },
    { id: "P3", name: "Gratis 1 Kg (Tier Gold+)", description: "Memberikan free 1 Kg untuk minimal transaksi 5 Kg khusus VIP.", active: true, icon: Gift },
  ]);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleTogglePromo = (id: string) => {
    setPromos(promos.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Mesin Gamifikasi (Loyalty)</h2>
          <p className="mt-1.5 text-base text-zinc-500">
            Atur konversi poin E-Wallet, batasan Tier pelanggan, dan aktivasi kode Promo.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors active:scale-95"
        >
          {saved ? <CheckCircle size={18} weight="bold" className="text-emerald-300" /> : <Coins size={18} weight="bold" />}
          {saved ? "Berhasil Disimpan!" : "Simpan Pengaturan"}
        </button>
      </motion.div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Point Conversion Card */}
        <motion.section variants={itemVars} className="clean-card p-6 border-t-4 border-blue-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <HandCoins size={24} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Rasio Konversi Poin (E-Wallet)</h3>
              <p className="text-sm text-zinc-500">Tentukan seberapa banyak pelanggan harus belanja untuk mendapat 1 Poin.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
            <div className="flex-1 w-full relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Rp</span>
              <input 
                type="text" 
                value={rupiahVal}
                onChange={e => setRupiahVal(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-lg font-mono font-bold text-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div className="text-zinc-400 font-black text-xl">=</div>
            <div className="flex-1 w-full relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">Poin</span>
              <input 
                type="text" 
                value={pointVal}
                onChange={e => setPointVal(e.target.value)}
                className="w-full pl-4 pr-14 py-3 bg-white border border-zinc-200 rounded-lg font-mono font-bold text-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </motion.section>

        {/* Tier Management */}
        <motion.section variants={itemVars} className="clean-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Crown size={24} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Batas Tier Pelanggan</h3>
              <p className="text-sm text-zinc-500">Atur minimal poin kumulatif agar pelanggan naik kelas.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bronze */}
            <div className="p-4 border-2 border-orange-200 bg-orange-50/30 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-orange-200/50 group-hover:scale-110 transition-transform">
                <Star size={80} weight="fill" />
              </div>
              <h4 className="font-bold text-orange-700 relative z-10 flex items-center gap-2">Bronze <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-orange-200">Default</span></h4>
              <div className="mt-4 relative z-10">
                <input type="text" defaultValue="0" className="w-full px-3 py-2 bg-white/80 border border-orange-200 rounded-lg font-mono font-bold text-orange-900 text-sm focus:outline-none" />
                <p className="text-xs text-orange-600/70 mt-2 font-medium">Syarat Poin Minimal</p>
              </div>
            </div>

            {/* Silver */}
            <div className="p-4 border-2 border-slate-200 bg-slate-50 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-slate-200/50 group-hover:scale-110 transition-transform">
                <Star size={80} weight="fill" />
              </div>
              <h4 className="font-bold text-slate-600 relative z-10">Silver</h4>
              <div className="mt-4 relative z-10">
                <input type="text" defaultValue="500" className="w-full px-3 py-2 bg-white/80 border border-slate-200 rounded-lg font-mono font-bold text-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400" />
                <p className="text-xs text-slate-500/70 mt-2 font-medium">Syarat Poin Minimal</p>
              </div>
            </div>

            {/* Gold */}
            <div className="p-4 border-2 border-amber-200 bg-amber-50 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-amber-200/50 group-hover:scale-110 transition-transform">
                <Crown size={80} weight="fill" />
              </div>
              <h4 className="font-bold text-amber-600 relative z-10">Gold</h4>
              <div className="mt-4 relative z-10">
                <input type="text" defaultValue="1.500" className="w-full px-3 py-2 bg-white/80 border border-amber-200 rounded-lg font-mono font-bold text-amber-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400" />
                <p className="text-xs text-amber-600/70 mt-2 font-medium">Syarat Poin Minimal</p>
              </div>
            </div>

            {/* Platinum */}
            <div className="p-4 border-2 border-zinc-800 bg-zinc-900 rounded-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-zinc-800 group-hover:scale-110 transition-transform">
                <Sparkle size={80} weight="fill" />
              </div>
              <h4 className="font-bold text-zinc-100 relative z-10">Platinum</h4>
              <div className="mt-4 relative z-10">
                <input type="text" defaultValue="5.000" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg font-mono font-bold text-white text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400" />
                <p className="text-xs text-zinc-400 mt-2 font-medium">Syarat Poin Minimal</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Promo Switches */}
        <motion.section variants={itemVars} className="clean-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <Ticket size={24} weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Aktivasi Promosi</h3>
              <p className="text-sm text-zinc-500">Nyalakan atau matikan program diskon yang sedang berlangsung.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {promos.map((promo) => {
              const PIcon = promo.icon;
              return (
                <div key={promo.id} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${promo.active ? "border-emerald-200 bg-emerald-50/30" : "border-zinc-100 bg-white"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${promo.active ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"}`}>
                      <PIcon size={20} weight="fill" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${promo.active ? "text-zinc-900" : "text-zinc-500"}`}>{promo.name}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{promo.description}</p>
                    </div>
                  </div>
                  
                  {/* iOS Style Toggle Switch */}
                  <button 
                    type="button"
                    onClick={() => handleTogglePromo(promo.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${promo.active ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${promo.active ? 'translate-x-5' : 'translate-x-0'}`} 
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.section>
      </form>
    </motion.div>
  );
}
