"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKey, User, EnvelopeSimple, IdentificationBadge, Star } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Mock authentication logic
    if (loginEmail === "admin@cleankilo.com" && loginPassword === "password") {
      if (typeof window !== "undefined") {
        localStorage.setItem("role", "admin");
        router.push("/admin");
      }
    } else if (loginEmail === "dinda@cleankilo.com" && loginPassword === "password") {
      if (typeof window !== "undefined") {
        localStorage.setItem("role", "customer");
        router.push("/customer");
      }
    } else {
      setLoginError("Email atau password salah. Coba: admin@cleankilo.com / dinda@cleankilo.com");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration and auto-login to customer
    if (typeof window !== "undefined") {
      localStorage.setItem("role", "customer");
      router.push("/customer");
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-zinc-50 p-4 sm:p-8 overflow-hidden">
      
      {/* Background Aurora Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-blue-400/30 blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px]"
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-600/30">
            <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="14" cy="14" r="4" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-zinc-950 leading-tight">
            Tingkatkan Skala <br/>
            Bisnis Laundry Anda.
          </h1>
          <p className="mt-6 text-lg text-zinc-500 max-w-md leading-relaxed">
            CleanKilo CRM hadir dengan sistem manajemen pelanggan berteknologi cerdas, retensi otomatis, dan dasbor analitik kelas atas.
          </p>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-zinc-50 bg-zinc-200 z-${5-i} shadow-sm overflow-hidden`}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-950">Dipercaya oleh 2,000+ pelanggan</p>
              <div className="flex text-amber-400 mt-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} weight="fill" />)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Auth Portal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto"
        >
          <div className="relative rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-zinc-200/50 border border-white">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="14" cy="14" r="4" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-950">CleanKilo</span>
            </div>

            {/* Auth Switcher */}
            <div className="flex p-1 mb-8 bg-zinc-100 rounded-full">
              <button
                onClick={() => setIsLogin(true)}
                className={`relative flex-1 py-2.5 text-sm font-bold transition-colors z-10 ${isLogin ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-700"}`}
              >
                {isLogin && <motion.div layoutId="auth-tab" className="absolute inset-0 bg-white rounded-full shadow-sm" />}
                <span className="relative z-20">Masuk</span>
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`relative flex-1 py-2.5 text-sm font-bold transition-colors z-10 ${!isLogin ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-700"}`}
              >
                {!isLogin && <motion.div layoutId="auth-tab" className="absolute inset-0 bg-white rounded-full shadow-sm" />}
                <span className="relative z-20">Daftar Baru</span>
              </button>
            </div>

            {/* Dynamic Form Area */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                // ==========================
                // LOGIN FORM
                // ==========================
                <motion.form 
                  key="login-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin} 
                  className="flex flex-col gap-5"
                >
                  <h2 className="text-2xl font-bold text-zinc-950 mb-2">Selamat Datang Kembali! 👋</h2>
                  
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <EnvelopeSimple size={18} />
                      </div>
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3.5 pl-12 pr-4 text-sm text-zinc-950 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="admin@cleankilo.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500">
                        Kata Sandi
                      </label>
                      <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">Lupa Sandi?</button>
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <LockKey size={18} />
                      </div>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3.5 pl-12 pr-4 text-sm text-zinc-950 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {loginError && (
                    <div className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-100">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/20"
                  >
                    Masuk ke Dashboard
                  </button>

                  <div className="mt-4 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-4 text-center">
                    <p className="text-[11px] font-medium text-zinc-500 leading-relaxed">
                      <strong>Info Akun Demo:</strong><br />
                      Admin: <code className="bg-zinc-200 px-1 rounded text-zinc-800">admin@cleankilo.com</code><br />
                      Customer: <code className="bg-zinc-200 px-1 rounded text-zinc-800">dinda@cleankilo.com</code><br />
                      Sandi Keduanya: <code className="bg-zinc-200 px-1 rounded text-zinc-800">password</code>
                    </p>
                  </div>
                </motion.form>
              ) : (
                // ==========================
                // REGISTER FORM
                // ==========================
                <motion.form 
                  key="register-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister} 
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-2xl font-bold text-zinc-950 mb-2">Mulai Perjalanan Anda ✨</h2>
                  
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <IdentificationBadge size={18} />
                      </div>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3 pl-12 pr-4 text-sm text-zinc-950 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Ketik nama lengkap..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <EnvelopeSimple size={18} />
                      </div>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3 pl-12 pr-4 text-sm text-zinc-950 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="email@anda.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-zinc-500">
                      Kata Sandi
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
                        <LockKey size={18} />
                      </div>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-3 pl-12 pr-4 text-sm text-zinc-950 transition focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Minimal 8 karakter"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full rounded-2xl bg-zinc-950 py-4 text-sm font-bold text-white transition hover:bg-zinc-800 active:scale-[0.98] shadow-lg shadow-zinc-950/20"
                  >
                    Daftar Sekarang
                  </button>
                  <p className="text-center text-[11px] text-zinc-400 font-medium mt-2">
                    Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}
