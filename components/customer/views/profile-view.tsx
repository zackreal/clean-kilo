"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CheckCircle, User, Phone, EnvelopeSimple, MapPin, ShieldCheck, BellRinging, Key, Fingerprint, LockKey } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerData, initials } from "@/lib/data";

export function CustomerProfileView({
  data,
  setData,
}: {
  data: CustomerData;
  setData: Dispatch<SetStateAction<CustomerData>>;
}) {
  const [success, setSuccess] = useState(false);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifWA, setNotifWA] = useState(true);
  const [biometric, setBiometric] = useState(false);

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

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      
      {/* Sisi Kiri: Kartu Identitas & Info Akun */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Premium Membership Card */}
        <motion.div variants={itemVars} className="relative overflow-hidden rounded-3xl bg-zinc-950 p-6 sm:p-8 text-white shadow-xl shadow-zinc-950/20 text-center flex flex-col items-center">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
            />
          </div>

          <div className="relative z-10 w-full">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-zinc-950 font-mono text-3xl font-black shadow-lg mb-4 ring-4 ring-white/10">
              {initials(data.name)}
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-zinc-950">
                <ShieldCheck size={16} weight="fill" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold tracking-tight text-white">
              {data.name}
            </h3>
            
            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-300 backdrop-blur-md">
                {data.tier} Member
              </span>
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-zinc-400 font-medium">Bergabung sejak</p>
              <p className="mt-1 font-mono text-sm font-bold text-white">{data.since}</p>
            </div>
          </div>
        </motion.div>

        {/* Info Keamanan Singkat */}
        <motion.div variants={itemVars} className="clean-card p-5 bg-blue-50/50 border-blue-100 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <LockKey size={20} weight="fill" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-950">Akun Terverifikasi</h4>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Data diri Anda dienkripsi dan diamankan oleh sistem CleanKilo.
            </p>
          </div>
        </motion.div>
      </div>


      {/* Sisi Kanan: Formulir Edit Profil & Pengaturan */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Form Profil Utama */}
        <motion.div variants={itemVars} className="clean-card p-6 sm:p-8">
          <div className="mb-8 border-b border-zinc-100 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Informasi Pribadi</h2>
            <p className="mt-1.5 text-sm text-zinc-500">
              Perbarui data diri Anda untuk kelancaran layanan penjemputan.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              setData((prev) => ({
                ...prev,
                name: String(formData.get("name") || prev.name),
                phone: String(formData.get("phone") || prev.phone),
                address: String(formData.get("address") || prev.address),
                email: String(formData.get("email") || prev.email),
              }));
              setSuccess(true);
              setTimeout(() => setSuccess(false), 4000);
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField label="Nama Lengkap" name="name" defaultValue={data.name} icon={User} />
              <ProfileField label="Nomor Handphone" name="phone" defaultValue={data.phone} icon={Phone} />
            </div>
            
            <ProfileField label="Email" name="email" defaultValue={data.email} icon={EnvelopeSimple} type="email" />
            <ProfileField label="Alamat Penjemputan Utama" name="address" defaultValue={data.address} icon={MapPin} isTextArea />

            <div className="pt-4 flex items-center justify-between">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100"
                  >
                    <CheckCircle size={20} weight="fill" />
                    Tersimpan!
                  </motion.div>
                ) : (
                  <div></div> // Spacer
                )}
              </AnimatePresence>
              
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/20"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </motion.div>

        {/* Pengaturan Tambahan (Super-App Style) */}
        <motion.div variants={itemVars} className="clean-card p-6 sm:p-8">
          <div className="mb-6 border-b border-zinc-100 pb-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950">Pengaturan Akun</h2>
          </div>

          <div className="space-y-6">
            {/* Setting 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <BellRinging size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-950">Notifikasi Promo</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Terima info diskon via Push Notification.</p>
                </div>
              </div>
              <Toggle checked={notifPromo} onChange={() => setNotifPromo(!notifPromo)} />
            </div>

            {/* Setting 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Phone size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-950">Pesan WhatsApp</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Info status cucian dikirim ke WhatsApp.</p>
                </div>
              </div>
              <Toggle checked={notifWA} onChange={() => setNotifWA(!notifWA)} />
            </div>

            {/* Setting 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Fingerprint size={20} weight="fill" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-950">Login Biometrik</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Gunakan Sidik Jari / Face ID untuk masuk.</p>
                </div>
              </div>
              <Toggle checked={biometric} onChange={() => setBiometric(!biometric)} />
            </div>
            
            <div className="pt-4 border-t border-zinc-100">
              <button className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                <Key size={18} weight="bold" />
                Ganti Kata Sandi
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

// Komponen Input Field Khusus Profil
function ProfileField({
  label,
  name,
  defaultValue,
  icon: Icon,
  type = "text",
  isTextArea = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  icon: any;
  type?: string;
  isTextArea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-bold text-zinc-700 uppercase tracking-widest">{label}</span>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
          <Icon size={20} />
        </div>
        {isTextArea ? (
          <textarea
            name={name}
            defaultValue={defaultValue}
            className="w-full min-h-[80px] resize-y rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3 pl-12 pr-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 shadow-sm"
          />
        ) : (
          <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3 pl-12 pr-4 text-sm text-zinc-950 outline-none transition-colors focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600 shadow-sm"
          />
        )}
      </div>
    </label>
  );
}

// Komponen Toggle Switch Custom
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-zinc-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        } shadow-sm`}
      />
    </button>
  );
}
