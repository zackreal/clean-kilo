"use client";

import { useState } from "react";
import { CheckCircle, MapPin, Drop, Lightning, Sparkle, NotePencil, Receipt, Package, Truck, HandsClapping, Checks, Motorcycle, TShirt } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerData } from "@/lib/data";

const services = [
  { id: "reguler", name: "Cuci Kiloan Reguler", desc: "Selesai dalam 48 jam", price: "Rp8.000/kg", icon: Drop },
  { id: "express", name: "Cuci + Setrika Express", desc: "Selesai dalam 12 jam", price: "Rp15.000/kg", icon: Lightning },
  { id: "dryclean", name: "Dry Cleaning Premium", desc: "Perawatan khusus bahan jas/gaun", price: "Mulai Rp25.000", icon: Sparkle },
];

export function CustomerOrderView({ data }: { data: CustomerData }) {
  const [activeTab, setActiveTab] = useState<"baru" | "berjalan">("berjalan");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedService, setSelectedService] = useState("reguler");

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

  // Layar Sukses (Pembuatan Order Baru)
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-20"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl animate-pulse"></div>
          <CheckCircle size={56} weight="fill" className="relative z-10" />
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-2">Order Berhasil Diterima!</h2>
        <p className="text-zinc-500 max-w-sm mb-8">
          Kurir CleanKilo sedang bersiap menjemput pakaian kotor di lokasimu. Estimasi tiba dalam 30 menit.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setActiveTab("berjalan");
          }}
          className="rounded-full bg-blue-50 px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-100 transition"
        >
          Lihat Status Pesanan
        </button>
      </motion.div>
    );
  }

  // Layar Sukses (Konfirmasi Terima Barang)
  if (isConfirmed) {
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
          <HandsClapping size={64} weight="fill" className="relative z-10 text-emerald-500" />
        </motion.div>
        <h2 className="text-4xl font-black tracking-tighter text-zinc-950 mb-3">Selesai & Lunas!</h2>
        <p className="text-zinc-500 max-w-sm mb-10 text-base">
          Pakaian bersih Anda telah diterima. Transaksi ini otomatis tersimpan di menu Riwayat.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setIsConfirmed(false);
              setActiveTab("baru");
            }}
            className="rounded-full bg-emerald-50 px-8 py-3.5 text-sm font-bold text-emerald-600 hover:bg-emerald-100 transition"
          >
            Order Baru
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Pesanan Saya</h2>
          <p className="mt-1.5 text-base text-zinc-500">
            Kelola pesanan aktif atau buat jadwal penjemputan baru.
          </p>
        </div>

        <div className="flex rounded-full bg-zinc-100 p-1">
          <button
            onClick={() => setActiveTab("berjalan")}
            className={`relative rounded-full px-6 py-2 text-sm font-bold transition-colors ${
              activeTab === "berjalan" ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {activeTab === "berjalan" && (
              <motion.div layoutId="order-tab" className="absolute inset-0 rounded-full bg-white shadow-sm" />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500"></span> Sedang Berjalan
            </span>
          </button>
          <button
            onClick={() => setActiveTab("baru")}
            className={`relative rounded-full px-6 py-2 text-sm font-bold transition-colors ${
              activeTab === "baru" ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {activeTab === "baru" && (
              <motion.div layoutId="order-tab" className="absolute inset-0 rounded-full bg-white shadow-sm" />
            )}
            <span className="relative z-10">Buat Order Baru</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* ========================================================= */}
        {/* TAB 1: SEDANG BERJALAN (ACTIVE ORDER)                     */}
        {/* ========================================================= */}
        {activeTab === "berjalan" && (
          <motion.div 
            key="tab-berjalan"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            
            {/* Kiri: Status & Konfirmasi */}
            <div className="lg:col-span-7 space-y-6">
              
              <motion.div variants={itemVars} className="rounded-3xl shadow-sm p-6 sm:p-8 bg-blue-600 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20 transform translate-x-8 -translate-y-8">
                  <Truck size={180} weight="fill" className="text-white" />
                </div>

                <div className="relative z-10 text-white">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-100">Pesanan Aktif</span>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-blue-200 text-sm font-medium mb-1">ID Pesanan</p>
                    <h3 className="font-mono text-3xl sm:text-4xl font-bold tracking-tight">CK-2406-118</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div>
                      <p className="text-xs font-medium text-blue-200 uppercase tracking-widest mb-1">Layanan</p>
                      <p className="font-bold text-sm sm:text-base">Cuci + Setrika Express</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-200 uppercase tracking-widest mb-1">Total Biaya</p>
                      <p className="font-bold text-sm sm:text-base font-mono">Rp 35.000</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVars} className="clean-card p-6">
                <div className="flex items-center gap-3 mb-4 text-amber-600">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                    <Package size={24} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-bold">Barang Sedang Diantar!</h4>
                    <p className="text-xs text-amber-700 font-medium">Kurir sedang menuju alamat Anda.</p>
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 mb-6">
                  <p className="text-xs text-zinc-500 mb-1">Alamat Pengiriman:</p>
                  <p className="text-sm font-bold text-zinc-950">{data.address}</p>
                </div>

                {/* Tombol Konfirmasi Paling Penting */}
                <button
                  onClick={() => setIsConfirmed(true)}
                  className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-4 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] shadow-lg"
                >
                  <Checks size={20} weight="bold" className="text-emerald-400 transition-transform group-hover:scale-125" />
                  Konfirmasi Pakaian Diterima
                </button>
              </motion.div>

            </div>

            {/* Kanan: Vertical Timeline Lengkap */}
            <div className="lg:col-span-5">
              <motion.div variants={itemVars} className="clean-card p-6 sm:p-8 sticky top-24">
                <h3 className="text-lg font-bold text-zinc-950 mb-6 border-b border-zinc-100 pb-4">Riwayat Perjalanan</h3>
                
                <div className="relative pl-6 space-y-8">
                  {/* Vertical Line */}
                  <div className="absolute left-9 top-2 bottom-4 w-[2px] bg-zinc-100"></div>

                  {/* Step 1: Penjemputan (Done) */}
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-4 ring-white">
                      <CheckCircle size={14} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">Pakaian Dijemput</p>
                      <p className="text-xs text-zinc-500 mt-1">Kurir Bapak Budi (B 1234 XYZ)</p>
                      <p className="text-[10px] text-zinc-400 mt-1">10:15 WIB</p>
                    </div>
                  </div>

                  {/* Step 2: Dicuci (Done) */}
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-4 ring-white">
                      <CheckCircle size={14} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">Proses Pencucian</p>
                      <p className="text-xs text-zinc-500 mt-1">Telah ditimbang (2,3 kg) dan masuk mesin.</p>
                      <p className="text-[10px] text-zinc-400 mt-1">11:30 WIB</p>
                    </div>
                  </div>

                  {/* Step 3: Disetrika (Done) */}
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-4 ring-white">
                      <CheckCircle size={14} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">Proses Setrika & Packing</p>
                      <p className="text-xs text-zinc-500 mt-1">Diberi parfum premium dan dikemas rapi.</p>
                      <p className="text-[10px] text-zinc-400 mt-1">14:00 WIB</p>
                    </div>
                  </div>

                  {/* Step 4: Diantar (Active) */}
                  <div className="relative z-10 flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-50 text-blue-600 ring-4 ring-white shadow-sm">
                      <Motorcycle size={14} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-600">Dalam Pengantaran</p>
                      <p className="text-xs text-zinc-950 mt-1 font-medium">Kurir sedang menuju ke lokasi Anda.</p>
                      <p className="text-[10px] text-blue-500 mt-1 font-semibold animate-pulse">Menunggu penerimaan...</p>
                    </div>
                  </div>

                  {/* Step 5: Selesai (Pending) */}
                  <div className="relative z-10 flex gap-4 opacity-40">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-zinc-400 ring-4 ring-white">
                      <Package size={14} weight="bold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-950">Pesanan Selesai</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: BUAT ORDER BARU                                    */}
        {/* ========================================================= */}
        {activeTab === "baru" && (
          <motion.div 
            key="tab-baru"
            variants={containerVars}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Sisi Kiri: Form & Pilihan Layanan */}
            <div className="lg:col-span-7 space-y-8">
              <form
                id="order-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsSuccess(true);
                }}
                className="space-y-6"
              >
                {/* Lokasi Penjemputan */}
                <motion.div variants={itemVars} className="space-y-3">
                  <label className="flex items-center justify-between text-sm font-semibold text-zinc-950">
                    <span>Alamat Penjemputan</span>
                    <button type="button" className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <NotePencil size={14} /> Ubah
                    </button>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <MapPin size={20} />
                    </div>
                    <input
                      type="text"
                      required
                      defaultValue={data.address}
                      className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
                    />
                  </div>
                </motion.div>

                {/* Jadwal Penjemputan & Estimasi */}
                <motion.div variants={itemVars} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-950">Pilih Jadwal Penjemputan</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select className="w-full rounded-xl border border-zinc-200 bg-white py-3 px-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm">
                        <option>Hari Ini</option>
                        <option>Besok</option>
                      </select>
                      <select className="w-full rounded-xl border border-zinc-200 bg-white py-3 px-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm">
                        <option>08:00 - 10:00</option>
                        <option>10:00 - 12:00</option>
                        <option>13:00 - 15:00</option>
                        <option>16:00 - 18:00</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-950">Estimasi Berat (Opsional)</label>
                    <input
                      type="text"
                      placeholder="Contoh: 4 kg"
                      className="w-full rounded-xl border border-zinc-200 bg-white py-3 px-4 font-mono text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
                    />
                  </div>
                </motion.div>

                {/* Catatan untuk Kurir */}
                <motion.div variants={itemVars} className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-950">Catatan untuk Kurir (Opsional)</label>
                  <textarea
                    placeholder="Contoh: Tolong bel ke rumah nomor 12 pagar hitam, ada satpam di depan."
                    className="w-full min-h-[80px] resize-y rounded-xl border border-zinc-200 bg-white py-3 px-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
                  />
                </motion.div>

                {/* Radio Cards: Jenis Layanan */}
                <motion.div variants={itemVars} className="space-y-3 pt-2">
                  <label className="text-sm font-semibold text-zinc-950">Pilih Jenis Layanan</label>
                  <div className="grid gap-3">
                    {services.map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = selectedService === srv.id;
                      return (
                        <label 
                          key={srv.id} 
                          className={`relative flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                            isSelected 
                              ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" 
                              : "border-zinc-200 bg-white hover:border-zinc-300"
                          }`}
                          onClick={() => setSelectedService(srv.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" : "bg-zinc-100 text-zinc-500"}`}>
                              <Icon size={20} weight={isSelected ? "fill" : "regular"} />
                            </div>
                            <div>
                              <p className={`font-semibold ${isSelected ? "text-blue-900" : "text-zinc-900"}`}>{srv.name}</p>
                              <p className="mt-0.5 text-xs text-zinc-500">{srv.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-sm font-bold text-zinc-950">{srv.price}</p>
                          </div>
                          {/* Invisible Radio Input */}
                          <input type="radio" name="service" className="sr-only" checked={isSelected} readOnly />
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Sisi Kanan: Checkout Summary (Sticky) */}
            <motion.div variants={itemVars} className="lg:col-span-5 relative">
              <div className="sticky top-24 clean-card overflow-hidden">
                
                <div className="border-b border-zinc-100 bg-zinc-50/80 p-6 flex items-center gap-3">
                  <Receipt size={24} className="text-blue-600" />
                  <h3 className="font-bold text-zinc-950">Ringkasan Order</h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Layanan</span>
                    <span className="font-semibold text-zinc-950">
                      {services.find(s => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Biaya Jemput</span>
                    <span className="font-mono font-bold text-emerald-600">Gratis</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Asuransi Pakaian</span>
                    <span className="font-mono font-medium text-zinc-950">Rp2.000</span>
                  </div>

                  <div className="my-4 border-t border-dashed border-zinc-200"></div>

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-zinc-950">Total Estimasi</span>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold tracking-tight text-blue-600">~Rp34.000</span>
                      <p className="text-[10px] text-zinc-400 mt-1">Dihitung pasti setelah ditimbang</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-3">
                  <label className="text-sm font-semibold text-zinc-950">Metode Pembayaran</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-blue-600 bg-blue-50/50 p-3 text-sm font-semibold text-blue-900 ring-1 ring-blue-600 transition-all">
                      QRIS / E-Wallet
                      <input type="radio" name="payment" className="sr-only" defaultChecked />
                    </label>
                    <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white p-3 text-sm font-semibold text-zinc-600 hover:border-zinc-300 transition-all">
                      Bayar Tunai
                      <input type="radio" name="payment" className="sr-only" />
                    </label>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    form="order-form"
                    type="submit"
                    className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/20"
                  >
                    Konfirmasi Penjemputan
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
