"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";
import {
  CustomerData,
  CustomerTab,
  customerNavItems,
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
  const router = useRouter();

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

          <div className="flex items-center gap-4">
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
              className="hidden flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-red-200 hover:text-red-600 md:flex transition-colors"
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
