"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ClockCounterClockwise, Prohibit, Scales, Headset } from "@phosphor-icons/react";
import { resolutionTickets, ResolutionTicket } from "@/lib/data";

export function AdminResolutionCenter() {
  const [tickets, setTickets] = useState<ResolutionTicket[]>(resolutionTickets);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (id: string, actionName: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "Selesai" } : t));
    showToast(`Tiket ${id} ditutup dengan aksi: ${actionName}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Menunggu": return "bg-red-100 text-red-600";
      case "Diinvestigasi": return "bg-amber-100 text-amber-600";
      case "Selesai": return "bg-emerald-100 text-emerald-600";
      default: return "bg-zinc-100 text-zinc-600";
    }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8 relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-8 left-1/2 z-50 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-bold text-white shadow-xl flex items-center gap-2"
          >
            <CheckCircle size={18} weight="fill" className="text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVars}>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Pusat Resolusi (Ticketing)</h2>
        <p className="mt-1.5 text-base text-zinc-500">
          Tangani komplain pelanggan, setujui pengembalian dana, atau berikan layanan ulang gratis demi menjaga kepercayaan pelanggan (Service Recovery).
        </p>
      </motion.div>

      <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="clean-card p-6 border-b-4 border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Headset size={20} weight="fill" /></div>
            <span className="text-sm font-bold text-zinc-500">Tiket Terbuka</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-950">
              {tickets.filter(t => t.status !== "Selesai").length}
            </span>
            <span className="text-sm font-bold text-red-500 mb-1">Butuh Perhatian</span>
          </div>
        </div>

        <div className="clean-card p-6 border-b-4 border-emerald-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Scales size={20} weight="fill" /></div>
            <span className="text-sm font-bold text-zinc-500">Tingkat Resolusi</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-zinc-950">98%</span>
            <span className="text-sm font-bold text-emerald-500 mb-1">Kasus Selesai</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVars} className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="clean-card p-6 flex flex-col lg:flex-row gap-6 justify-between items-start">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  {ticket.id}
                </span>
                <span className="text-xs font-semibold text-zinc-500">Order: {ticket.orderId}</span>
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{ticket.customerName} - {ticket.category}</h3>
                <p className="text-sm text-zinc-600 mt-1">{ticket.description}</p>
                <div className="text-xs text-zinc-400 mt-2 font-medium">{ticket.date}</div>
              </div>
            </div>

            {ticket.status !== "Selesai" && (
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <button
                  onClick={() => handleAction(ticket.id, "Refund Tunai Disetujui")}
                  className="flex-1 lg:flex-none justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <CheckCircle size={16} weight="bold" /> Setujui Refund
                </button>
                <button
                  onClick={() => handleAction(ticket.id, "Cuci Ulang Gratis")}
                  className="flex-1 lg:flex-none justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <ClockCounterClockwise size={16} weight="bold" /> Cuci Ulang
                </button>
                <button
                  onClick={() => handleAction(ticket.id, "Klaim Ditolak")}
                  className="flex-1 lg:flex-none justify-center inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-lg text-xs font-bold transition-colors"
                >
                  <Prohibit size={16} weight="bold" /> Tolak
                </button>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
