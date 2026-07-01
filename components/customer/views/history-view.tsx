"use client";

import { useState } from "react";
import { CheckCircle, Receipt, ArrowUUpLeft, WarningCircle, X, DownloadSimple, Printer } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerData, historyItems } from "@/lib/data";

export function CustomerHistoryView({ data }: { data: CustomerData }) {
  const [returnRequested, setReturnRequested] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof historyItems[0] | null>(null);

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

  if (!data.hasHistory) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <Receipt size={48} className="text-zinc-300 mb-4" />
        <h3 className="text-xl font-bold tracking-tight text-zinc-950">Belum ada riwayat transaksi</h3>
        <p className="mt-2 text-sm text-zinc-500 max-w-sm">
          Semua pesanan yang telah selesai dan lunas akan muncul di halaman ini.
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        
        {/* Sisi Kiri: Daftar Riwayat Transaksi */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Riwayat Transaksi</h2>
            <p className="mt-1.5 text-base text-zinc-500">
              Daftar pesanan Anda yang telah selesai. Ajukan pengembalian jika terdapat kendala.
            </p>
          </div>

          <div className="space-y-4">
            {historyItems.map((item) => {
              const isReturning = returnRequested === item.code;

              return (
                <motion.div 
                  key={item.code} 
                  variants={itemVars}
                  className="clean-card p-5 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-100 pb-4 mb-4">
                    <div>
                      <p className="font-mono text-lg font-bold text-blue-600">
                        {item.code}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-950">
                        {item.service}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {item.weight} • Selesai pada {item.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                        <CheckCircle size={14} weight="fill" />
                        Lunas
                      </span>
                      <p className="mt-2 font-mono text-base font-bold text-zinc-950">
                        {item.total}
                      </p>
                    </div>
                  </div>

                  {isReturning ? (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-xl bg-orange-50 p-4 border border-orange-200"
                    >
                      <div className="flex gap-3">
                        <WarningCircle size={20} weight="fill" className="text-orange-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-orange-900">Pengajuan Pengembalian Diproses</p>
                          <p className="text-xs text-orange-700 mt-1">
                            Tim kami akan menghubungi Anda dalam 1x24 jam untuk proses penjemputan barang retur.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(item)}
                        className="group flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Receipt size={16} /> Lihat Invoice Digital
                      </button>
                      <button
                        type="button"
                        onClick={() => setReturnRequested(item.code)}
                        className="group flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 active:scale-95"
                      >
                        <ArrowUUpLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Ajukan Pengembalian
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sisi Kanan: Panel Informasi Garansi (Sticky) */}
        <motion.div variants={itemVars} className="lg:col-span-5 relative hidden lg:block">
          <div className="sticky top-24">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-950 p-8 text-white shadow-xl">
              {/* Background Accent */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md mb-6 border border-white/20">
                  <ArrowUUpLeft size={24} weight="duotone" className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Garansi Cuci Bersih & Aman</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  CleanKilo memberikan garansi 100% untuk pakaian yang hilang atau rusak, serta layanan cuci ulang gratis apabila hasil cucian tidak bersih atau apek.
                </p>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">
                      Batas Klaim
                    </p>
                    <p className="text-sm font-medium text-white">
                      Maksimal 2x24 jam sejak pakaian diterima.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
                      Proses Retur
                    </p>
                    <p className="text-sm font-medium text-white">
                      Kurir kami akan menjemput ulang pakaian retur tanpa tambahan biaya antar-jemput.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Digital Invoice Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm mx-auto flex flex-col"
            >
              {/* Receipt Top Edge (Zig-zag) */}
              <div className="h-4 w-full bg-white rounded-t-xl" style={{ backgroundImage: "radial-gradient(circle at 10px -5px, transparent 12px, white 13px)", backgroundSize: "20px 20px", backgroundRepeat: "repeat-x" }}></div>
              
              {/* Receipt Body */}
              <div className="bg-white px-8 py-6 text-zinc-900 font-mono shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="font-black text-2xl tracking-tighter">CLEAN<span className="text-blue-600">KILO</span></h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Digital Invoice</p>
                </div>

                {/* Info */}
                <div className="border-y-2 border-dashed border-zinc-200 py-4 mb-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Order ID:</span>
                    <span className="font-bold">{selectedInvoice.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tanggal:</span>
                    <span className="font-bold">{selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Pelanggan:</span>
                    <span className="font-bold">{data.name}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase text-zinc-500">
                    <span>Layanan</span>
                    <span>Total</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{selectedInvoice.service}</span>
                    <span>{selectedInvoice.total}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 mb-3">
                    Detail Berat: {selectedInvoice.weight}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t-2 border-dashed border-zinc-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase font-bold text-zinc-500">Grand Total</span>
                    <span className="text-xl font-black">{selectedInvoice.total}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] uppercase text-zinc-500">Status</span>
                    <span className="text-[10px] uppercase font-bold bg-zinc-900 text-white px-2 py-0.5 rounded">Lunas</span>
                  </div>
                </div>

                {/* Barcode Mock */}
                <div className="flex flex-col items-center justify-center opacity-60">
                  <svg className="w-48 h-12" preserveAspectRatio="none" viewBox="0 0 100 20">
                    <rect x="0" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="4" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="7" y="0" width="3" height="20" fill="currentColor"/>
                    <rect x="12" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="16" y="0" width="4" height="20" fill="currentColor"/>
                    <rect x="22" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="25" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="29" y="0" width="3" height="20" fill="currentColor"/>
                    <rect x="35" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="38" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="42" y="0" width="5" height="20" fill="currentColor"/>
                    <rect x="49" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="52" y="0" width="3" height="20" fill="currentColor"/>
                    <rect x="57" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="61" y="0" width="4" height="20" fill="currentColor"/>
                    <rect x="67" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="71" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="74" y="0" width="3" height="20" fill="currentColor"/>
                    <rect x="79" y="0" width="5" height="20" fill="currentColor"/>
                    <rect x="86" y="0" width="2" height="20" fill="currentColor"/>
                    <rect x="90" y="0" width="1" height="20" fill="currentColor"/>
                    <rect x="93" y="0" width="3" height="20" fill="currentColor"/>
                    <rect x="98" y="0" width="2" height="20" fill="currentColor"/>
                  </svg>
                  <span className="text-[9px] mt-1 tracking-[0.3em]">{selectedInvoice.code.replace(/-/g, "")}</span>
                </div>
              </div>
              
              {/* Receipt Bottom Edge (Zig-zag) */}
              <div className="h-4 w-full bg-white rounded-b-xl" style={{ backgroundImage: "radial-gradient(circle at 10px 25px, transparent 12px, white 13px)", backgroundSize: "20px 20px", backgroundRepeat: "repeat-x" }}></div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6">
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold transition-colors border border-white/20 flex items-center justify-center gap-2"
                >
                  <X size={18} weight="bold" /> Tutup
                </button>
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-bold transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <DownloadSimple size={18} weight="bold" /> Simpan PDF
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
