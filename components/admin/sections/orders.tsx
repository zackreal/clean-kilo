"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListDashes, CheckCircle, Package, Drop, Wind, TShirt, CaretRight } from "@phosphor-icons/react";
import { OrderStatus } from "@/lib/data";

type OrderItem = {
  id: string;
  customer: string;
  service: string;
  date: string;
  status: OrderStatus;
};

const initialOrders: OrderItem[] = [
  { id: "CK-2407-101", customer: "Budi Santoso", service: "Cuci Kiloan Reguler", date: "Hari Ini, 09:00", status: "diterima" },
  { id: "CK-2407-099", customer: "Siti Aminah", service: "Cuci + Setrika Express", date: "Hari Ini, 07:30", status: "dicuci" },
  { id: "CK-2407-095", customer: "Rahmat Hidayat", service: "Dry Cleaning Premium", date: "Kemarin, 14:00", status: "dikeringkan" },
  { id: "CK-2407-092", customer: "Dinda Pratiwi", service: "Cuci Kiloan Reguler", date: "Kemarin, 09:00", status: "disetrika" },
];

const statusFlow: OrderStatus[] = ["diterima", "dicuci", "dikeringkan", "disetrika", "selesai"];

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string; bg: string }> = {
  "diterima": { label: "Diterima", icon: Package, color: "text-zinc-600", bg: "bg-zinc-100" },
  "dicuci": { label: "Dicuci", icon: Drop, color: "text-blue-600", bg: "bg-blue-50" },
  "dikeringkan": { label: "Dikeringkan", icon: Wind, color: "text-amber-600", bg: "bg-amber-50" },
  "disetrika": { label: "Disetrika", icon: TShirt, color: "text-purple-600", bg: "bg-purple-50" },
  "selesai": { label: "Selesai", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
};

export function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const advanceStatus = (id: string, currentStatus: OrderStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      setOrders(orders.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={itemVars}>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Kelola Pesanan</h2>
        <p className="mt-1.5 text-base text-zinc-500">
          Perbarui status pengerjaan laundry (Diterima ➔ Selesai) untuk pelanggan secara real-time.
        </p>
      </motion.div>

      <motion.div variants={itemVars} className="clean-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4 font-semibold">ID Pesanan</th>
                <th className="px-6 py-4 font-semibold">Pelanggan & Layanan</th>
                <th className="px-6 py-4 font-semibold">Status Saat Ini</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white">
              <AnimatePresence>
                {orders.map((order) => {
                  const config = statusConfig[order.status];
                  const Icon = config.icon;
                  const isDone = order.status === "selesai";

                  return (
                    <motion.tr 
                      key={order.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-zinc-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-zinc-950">{order.id}</span>
                        <div className="text-xs text-zinc-400 mt-1">{order.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-900">{order.customer}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{order.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${config.bg} ${config.color}`}>
                          <Icon size={14} weight="bold" />
                          {config.label}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!isDone ? (
                          <button
                            onClick={() => advanceStatus(order.id, order.status)}
                            className="inline-flex items-center gap-1 bg-zinc-950 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-zinc-800 transition-colors active:scale-95"
                          >
                            Proses Tahap Berikutnya <CaretRight size={12} weight="bold" />
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold">
                            <CheckCircle size={14} weight="fill" /> Selesai
                          </span>
                        )}
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
  );
}
