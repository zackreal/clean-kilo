"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MagnifyingGlass, Funnel, Export, MapPin, CalendarBlank, Receipt, TrendUp, X, CaretRight, Crown, Star, Sparkle } from "@phosphor-icons/react";

type Tier = "Bronze" | "Silver" | "Gold" | "Platinum";

type Customer = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  points: number;
  orders: number;
  tier: Tier;
  ltv: string; // Life Time Value
  address: string;
  joinedDate: string;
};

// Expanded mock data
const customersData: Customer[] = [
  { id: "CUST-001", name: "Ibu Kartini", initials: "IK", email: "kartini@gmail.com", phone: "0812-3333-4444", points: 250, orders: 12, tier: "Silver", ltv: "Rp 1.450.000", address: "Jl. Merdeka No. 45, Jakarta", joinedDate: "12 Jan 2026" },
  { id: "CUST-002", name: "Bapak Sudirman", initials: "BS", email: "sudirman.office@yahoo.com", phone: "0811-9999-8888", points: 840, orders: 45, tier: "Gold", ltv: "Rp 5.200.000", address: "Kompleks Menteng Indah Blok A1", joinedDate: "05 Nov 2025" },
  { id: "CUST-003", name: "Mbak Yanti", initials: "MY", email: "yanti.kos@gmail.com", phone: "0857-1111-2222", points: 45, orders: 2, tier: "Bronze", ltv: "Rp 120.000", address: "Kos Putri Melati, Kamar 12", joinedDate: "20 Mei 2026" },
  { id: "CUST-004", name: "Keluarga Cendana", initials: "KC", email: "fam.cendana@outlook.com", phone: "0813-5555-7777", points: 5200, orders: 128, tier: "Platinum", ltv: "Rp 18.500.000", address: "Jl. Cendana Utama No. 8", joinedDate: "01 Mar 2024" },
  { id: "CUST-005", name: "Deni Sumargo", initials: "DS", email: "densu123@gmail.com", phone: "0819-8888-6666", points: 410, orders: 18, tier: "Silver", ltv: "Rp 2.100.000", address: "Apartemen Sudirman Park, 15A", joinedDate: "18 Feb 2026" },
  { id: "CUST-006", name: "Ibu Fatmawati", initials: "IF", email: "fatma.baking@gmail.com", phone: "0821-4444-5555", points: 1250, orders: 62, tier: "Gold", ltv: "Rp 7.800.000", address: "Jl. Fatmawati Raya No. 99", joinedDate: "10 Ags 2025" },
];

export function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTier, setActiveTier] = useState<Tier | "All">("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const filteredCustomers = customersData.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = activeTier === "All" || c.tier === activeTier;
    return matchesSearch && matchesTier;
  });

  const getTierIcon = (tier: Tier) => {
    switch (tier) {
      case "Bronze": return <Star size={14} weight="fill" className="text-orange-600" />;
      case "Silver": return <Star size={14} weight="fill" className="text-slate-600" />;
      case "Gold": return <Crown size={14} weight="fill" className="text-amber-600" />;
      case "Platinum": return <Sparkle size={14} weight="fill" className="text-zinc-100" />;
    }
  };

  const getTierStyle = (tier: Tier) => {
    switch (tier) {
      case "Bronze": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Silver": return "bg-slate-100 text-slate-800 border-slate-200";
      case "Gold": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Platinum": return "bg-zinc-900 text-zinc-100 border-zinc-700";
    }
  };

  return (
    <>
      <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
        
        {/* Header & Export */}
        <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Database Pelanggan</h2>
            <p className="mt-1.5 text-base text-zinc-500">
              Direktori lengkap pelanggan terdaftar beserta metrik Life Time Value (LTV).
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-white border-2 border-zinc-200 text-zinc-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95">
            <Export size={18} weight="bold" /> Export CSV
          </button>
        </motion.div>

        {/* Search & Filter Tools */}
        <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:w-96">
            <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Cari nama atau email pelanggan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-zinc-200 p-1.5 rounded-xl shadow-sm overflow-x-auto w-full sm:w-auto">
            <div className="pl-3 pr-2 text-zinc-400"><Funnel size={16} weight="fill" /></div>
            {(["All", "Bronze", "Silver", "Gold", "Platinum"] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                  activeTier === tier 
                    ? "bg-zinc-900 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {tier === "All" ? "Semua Tier" : tier}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Modern Directory Table */}
        <motion.div variants={itemVars} className="clean-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Pelanggan</th>
                  <th className="px-6 py-4 font-semibold">Kontak</th>
                  <th className="px-6 py-4 font-semibold">Total Order</th>
                  <th className="px-6 py-4 font-semibold">Tier & Poin</th>
                  <th className="px-6 py-4 font-semibold text-right">LTV (Pengeluaran)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <motion.tr 
                        key={customer.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => setSelectedCustomer(customer)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                              {customer.initials}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-900 group-hover:text-blue-700 transition-colors">{customer.name}</div>
                              <div className="text-xs text-zinc-400 font-mono mt-0.5">{customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-700">{customer.phone}</div>
                          <div className="text-xs text-zinc-500 mt-0.5">{customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-zinc-900">{customer.orders}x Cuci</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getTierStyle(customer.tier)}`}>
                            {getTierIcon(customer.tier)} {customer.tier}
                          </span>
                          <div className="text-xs text-zinc-500 font-mono mt-1 ml-1">{customer.points.toLocaleString()} Pts</div>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="font-mono font-bold text-zinc-900">{customer.ltv}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5 flex items-center justify-end gap-1">
                            Klik detail <CaretRight size={10} weight="bold" />
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                        Tidak ada pelanggan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Customer Profile Modal (Quick View) */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
            >
              {/* Profile Header (Color coded by Tier) */}
              <div className={`p-6 pb-12 flex justify-between items-start ${
                selectedCustomer.tier === "Bronze" ? "bg-orange-500" :
                selectedCustomer.tier === "Silver" ? "bg-slate-500" :
                selectedCustomer.tier === "Gold" ? "bg-amber-500" : "bg-zinc-900"
              }`}>
                <div className="text-white">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4 border border-white/10">
                    {getTierIcon(selectedCustomer.tier)} {selectedCustomer.tier} Member
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="rounded-full p-2 bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Profile Body (Overlapping) */}
              <div className="px-6 pb-6 -mt-10 relative">
                <div className="flex justify-between items-end mb-6">
                  <div className="h-20 w-20 rounded-2xl bg-white shadow-lg border-4 border-white flex items-center justify-center text-2xl font-black text-blue-600">
                    {selectedCustomer.initials}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-500 font-semibold uppercase tracking-wider mb-1">Life Time Value</div>
                    <div className="text-2xl font-black text-emerald-600 font-mono">{selectedCustomer.ltv}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-zinc-950">{selectedCustomer.name}</h3>
                  <p className="text-sm text-zinc-500 font-mono">{selectedCustomer.id}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="p-2 bg-white text-zinc-400 rounded-lg shadow-sm"><MapPin size={20} weight="fill" /></div>
                    <div>
                      <div className="text-xs text-zinc-400 font-bold">Alamat Utama</div>
                      <div className="text-sm font-semibold text-zinc-700">{selectedCustomer.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="p-2 bg-white text-zinc-400 rounded-lg shadow-sm"><CalendarBlank size={20} weight="fill" /></div>
                    <div>
                      <div className="text-xs text-zinc-400 font-bold">Bergabung Sejak</div>
                      <div className="text-sm font-semibold text-zinc-700">{selectedCustomer.joinedDate}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-zinc-200 text-center bg-white">
                    <div className="flex items-center justify-center gap-2 text-zinc-400 mb-1">
                      <Receipt size={16} weight="fill" /> <span className="text-xs font-bold">Total Order</span>
                    </div>
                    <div className="text-xl font-black text-zinc-900">{selectedCustomer.orders}x</div>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-200 text-center bg-white">
                    <div className="flex items-center justify-center gap-2 text-zinc-400 mb-1">
                      <TrendUp size={16} weight="bold" /> <span className="text-xs font-bold">Poin Aktif</span>
                    </div>
                    <div className="text-xl font-black text-zinc-900">{selectedCustomer.points.toLocaleString()}</div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
