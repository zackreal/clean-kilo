"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserGear, Plus, Trash, ShieldCheck, X, CalendarCheck, WarningCircle } from "@phosphor-icons/react";

type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: "Manager" | "Admin" | "Kasir" | "Kurir";
  status: "Aktif" | "Nonaktif";
};

const initialUsers: StaffUser[] = [
  { id: "USR-001", name: "Zacky", email: "zacky@cleankilo.com", role: "Manager", status: "Aktif" },
  { id: "USR-002", name: "Zulvan", email: "zulvan@cleankilo.com", role: "Admin", status: "Aktif" },
  { id: "USR-003", name: "Adit", email: "adit@cleankilo.com", role: "Kasir", status: "Aktif" },
  { id: "USR-004", name: "Cello", email: "cello@cleankilo.com", role: "Kurir", status: "Aktif" },
  { id: "USR-005", name: "Sofyan", email: "sofyan@cleankilo.com", role: "Kurir", status: "Nonaktif" },
  { id: "USR-006", name: "Udin", email: "udin@cleankilo.com", role: "Kasir", status: "Nonaktif" },
  { id: "USR-007", name: "Dono", email: "dono@cleankilo.com", role: "Kurir", status: "Aktif" },
  { id: "USR-008", name: "Ronaldo", email: "ronaldo@cleankilo.com", role: "Admin", status: "Aktif" },
];

export function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  
  // States for Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAbsenModalOpen, setIsAbsenModalOpen] = useState(false);
  
  // Selected Data
  const [selectedUser, setSelectedUser] = useState<StaffUser | null>(null);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<StaffUser["role"]>("Kasir");

  const containerVars: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVars: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const triggerDelete = (user: StaffUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const triggerAbsensi = (user: StaffUser) => {
    setSelectedUser(user);
    setIsAbsenModalOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === "Aktif" ? "Nonaktif" : "Aktif" };
      }
      return u;
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newUser: StaffUser = {
      id: `USR-00${Math.floor(Math.random() * 900) + 100}`,
      name: newName,
      email: `${newName.toLowerCase().replace(/\s+/g, ".")}@cleankilo.com`,
      role: newRole,
      status: "Aktif"
    };
    
    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setNewName("");
    setNewRole("Kasir");
  };

  return (
    <>
      <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={itemVars} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">Kelola Staf & Hak Akses</h2>
            <p className="mt-1.5 text-base text-zinc-500">
              Manajemen akun pengguna internal (Manager, Admin, Kasir, Kurir) yang dapat mengakses sistem CRM.
            </p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors active:scale-95"
          >
            <Plus size={16} weight="bold" /> Tambah Staf Baru
          </button>
        </motion.div>

        <motion.div variants={itemVars} className="clean-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nama Staf</th>
                  <th className="px-6 py-4 font-semibold">Role Akses</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white">
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.tr 
                      key={user.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-900">{user.name}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">
                          <ShieldCheck size={14} className="text-zinc-500" /> {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors hover:opacity-80 ${
                            user.status === "Aktif" ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20" : "bg-zinc-100 text-zinc-500 ring-1 ring-zinc-500/20"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${user.status === "Aktif" ? "bg-emerald-500" : "bg-zinc-400"}`}></span>
                          {user.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => triggerAbsensi(user)}
                            className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                            title="Cek Kehadiran/Absensi"
                          >
                            <CalendarCheck size={16} weight="bold" />
                          </button>
                          <button 
                            onClick={() => triggerDelete(user)}
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Hapus Akun"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal Form Tambah Staf */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                <h3 className="text-lg font-bold text-zinc-950">Tambah Staf Baru</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="p-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-950">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Masukkan nama staf..."
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-950">Hak Akses (Role)</label>
                    <select 
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    >
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="Kasir">Kasir</option>
                      <option value="Kurir">Kurir</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-colors"
                  >
                    Simpan Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Konfirmasi Hapus */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-2xl text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
                <WarningCircle size={32} weight="fill" />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 mb-2">Hapus Akun Staf?</h3>
              <p className="text-sm text-zinc-500 mb-8">
                Tindakan ini tidak dapat dibatalkan. Data absensi dan akses milik <strong>{selectedUser.name}</strong> akan hilang secara permanen.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmDelete}
                  className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-red-600/20 hover:bg-red-700 transition-colors"
                >
                  Hapus Permanen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Info Absensi */}
      <AnimatePresence>
        {isAbsenModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAbsenModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-zinc-950">Log Kehadiran</h3>
                <button 
                  onClick={() => setIsAbsenModalOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CalendarCheck size={24} weight="fill" />
                </div>
                <div>
                  <div className="font-bold text-zinc-950">{selectedUser.name}</div>
                  <div className="text-xs text-zinc-500">{selectedUser.role}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Hari ini:</span>
                  <span className="font-bold text-emerald-600">Hadir (07:45)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Kemarin:</span>
                  <span className="font-bold text-emerald-600">Hadir (08:02)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Total Absen (Bulan Ini):</span>
                  <span className="font-bold text-red-500">1 Hari</span>
                </div>
              </div>

              <button 
                onClick={() => setIsAbsenModalOpen(false)}
                className="w-full mt-8 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-zinc-800 transition-colors"
              >
                Tutup
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
