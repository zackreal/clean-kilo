"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignOut, Bell } from "@phosphor-icons/react";
import {
  CustomerData,
  CustomerTab,
  customerNavItems,
  customerNotifications,
  initialCustomer,
  initials,
} from "@/lib/data";
import { CustomerFeedbackView } from "./views/feedback-view";
import { CustomerHistoryView } from "./views/history-view";
import { CustomerHomeView } from "./views/home-view";
import { CustomerOrderView } from "./views/order-view";
import { CustomerPointsView } from "./views/points-view";
import { CustomerProfileView } from "./views/profile-view";

export function CustomerShell() {
  const [activeTab, setActiveTab] = useState<CustomerTab>("home");
  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomer);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = customerNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotifColor = (type: string) => {
    switch (type) {
      case "success": return "bg-emerald-100 text-emerald-600";
      case "warning": return "bg-amber-100 text-amber-600";
      case "promo": return "bg-purple-100 text-purple-600";
      default: return "bg-blue-100 text-blue-600";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  const renderSubView = () => {
    switch (activeTab) {
      case "home":
        return <CustomerHomeView data={customerData} onNavigate={setActiveTab} />;
      case "order":
        return <CustomerOrderView data={customerData} />;
      case "history":
        return <CustomerHistoryView data={customerData} />;
      case "points":
        return <CustomerPointsView data={customerData} />;
      case "feedback":
        return <CustomerFeedbackView />;
      case "profile":
        return (
          <CustomerProfileView
            data={customerData}
            setData={setCustomerData}
          />
        );
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-clean-light font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation (Desktop) / Header (Mobile) */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
                <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="url(#nlg1-c)" strokeWidth="1.5" fill="none"/>
                <circle cx="14" cy="14" r="4" fill="url(#nlg2-c)"/>
                <defs>
                  <linearGradient id="nlg1-c" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb"/>
                    <stop offset="1" stopColor="#3b82f6"/>
                  </linearGradient>
                  <linearGradient id="nlg2-c" x1="10" y1="10" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb"/>
                    <stop offset="1" stopColor="#3b82f6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-zinc-950">
              CleanKilo<span className="text-blue-600 ml-0.5">App</span>
            </span>
          </div>
          
          <nav className="hidden items-center gap-2 md:flex">
            {customerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-zinc-950 text-white shadow-md hover:scale-[1.02]"
                      : "text-zinc-500 hover:bg-white/50 hover:text-zinc-950"
                  }`}
                >
                  <Icon size={18} weight={isActive ? "fill" : "bold"} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
              >
                <Bell size={20} weight={notifOpen ? "fill" : "bold"} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/50 overflow-hidden z-50"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
                      <h3 className="text-sm font-bold text-zinc-900">Notifikasi</h3>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {unreadCount} baru
                      </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-zinc-50">
                      {customerNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-zinc-50 transition-colors cursor-pointer ${!notif.read ? "bg-blue-50/30" : ""}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${getNotifColor(notif.type)}`}>
                              <Bell size={12} weight="fill" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-zinc-900 truncate">{notif.title}</h4>
                              <p className="text-[11px] text-zinc-500 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden flex-col items-end md:flex">
              <span className="text-sm font-bold text-zinc-950">{customerData.name}</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cobalt">
                {customerData.tier} Member
              </span>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"
            >
              {initials(customerData.name)}
            </button>
            <button
              onClick={handleLogout}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-red-200 hover:text-red-600 md:flex transition-colors"
              title="Keluar"
            >
              <SignOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {/* Let the sub-views dictate their own grid layouts without max-w-3xl constraints */}
            <div className="w-full">
              {renderSubView()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Customer (Desktop & Mobile) */}
      <footer className="w-full border-t border-zinc-200 bg-white/50 py-6 pb-20 md:pb-6">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 mb-0.5">
            CleanKilo App
          </p>
          <p className="text-[9px] text-zinc-500 font-medium max-w-xs leading-relaxed">
            &copy; 2026 Hak Cipta Dilindungi. <br/>
            Dibangun dengan ♥ untuk Proyek UAS CRM.
          </p>
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="sticky bottom-0 z-40 grid w-full grid-cols-6 border-t border-zinc-200 bg-white/90 pb-safe pt-2 backdrop-blur-md md:hidden">
        {customerNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 pb-2 text-[10px] font-medium transition ${
                isActive ? "text-cobalt" : "text-zinc-400"
              }`}
            >
              <span
                className={`flex h-8 w-12 items-center justify-center rounded-full ${
                  isActive ? "bg-blue-50" : ""
                }`}
              >
                <Icon size={20} weight={isActive ? "fill" : "regular"} />
              </span>
              <span className="truncate px-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
