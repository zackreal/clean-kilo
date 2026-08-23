"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  adminMenuItems,
  adminNotifications,
  getCurrentDate,
  getCurrentTime,
} from "@/lib/data";
import {
  SignOut,
  List,
  X,
  Bell,
  Clock,
  CalendarBlank,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { ToastProvider } from "@/components/ui/toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Live clock
  useEffect(() => {
    setCurrentDate(getCurrentDate());
    setCurrentTime(getCurrentTime());
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setCurrentDate(getCurrentDate());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close notification dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  const unreadCount = adminNotifications.filter((n) => !n.read).length;

  if (!isAuthorized) return null;

  const getNotifTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 text-emerald-600";
      case "warning":
        return "bg-amber-100 text-amber-600";
      case "promo":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <ToastProvider>
      <div className="flex min-h-[100dvh] bg-clean-light font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* ─── Mobile Overlay ─── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* ─── Sidebar ─── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Brand */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-100 px-5">
            <div className="flex items-center gap-2.5">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M14 2L26 8V20L14 26L2 20V8L14 2Z"
                  stroke="url(#nlg1)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="14" cy="14" r="4" fill="url(#nlg2)" />
                <defs>
                  <linearGradient
                    id="nlg1"
                    x1="2"
                    y1="2"
                    x2="26"
                    y2="26"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient
                    id="nlg2"
                    x1="10"
                    y1="10"
                    x2="18"
                    y2="18"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-bold tracking-tight text-zinc-950">
                CleanKilo
                <span className="text-blue-600">CRM</span>
              </span>
            </div>
            {/* Close – mobile only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors lg:hidden"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {adminMenuItems.map((item) => {
              const href = `/admin/${item.id}`;
              const isActive = pathname === href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <Icon
                    size={18}
                    weight={isActive ? "fill" : "regular"}
                    className={isActive ? "text-blue-600" : "text-zinc-400"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User card at bottom */}
          <div className="border-t border-zinc-100 p-3">
            <div className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                AD
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-zinc-900">
                  Administrator
                </p>
                <p className="truncate text-[10px] text-zinc-500">
                  Super Admin
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Keluar"
              >
                <SignOut size={16} weight="bold" />
              </button>
            </div>
          </div>
        </aside>

        {/* ─── Main Column (offset by sidebar on lg) ─── */}
        <div className="flex min-h-[100dvh] flex-1 flex-col lg:pl-64">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
              {/* Left */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors lg:hidden"
                >
                  <List size={20} weight="bold" />
                </button>
                <div className="hidden items-center gap-1.5 text-xs font-medium text-zinc-500 sm:flex">
                  <CalendarBlank
                    size={14}
                    weight="bold"
                    className="text-zinc-400"
                  />
                  <span>{currentDate}</span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-semibold text-zinc-600 sm:flex">
                  <Clock
                    size={13}
                    weight="bold"
                    className="text-blue-500"
                  />
                  {currentTime}
                </div>

                {/* Notification Bell */}
                <div ref={notifRef} className="relative">
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-all"
                  >
                    <Bell size={18} weight={notifOpen ? "fill" : "bold"} />
                    {unreadCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {notifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-11 w-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl sm:w-96"
                      >
                        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/60 px-4 py-3">
                          <h3 className="text-sm font-bold text-zinc-900">
                            Notifikasi
                          </h3>
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                            {unreadCount} baru
                          </span>
                        </div>
                        <div className="max-h-72 divide-y divide-zinc-100 overflow-y-auto">
                          {adminNotifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`px-4 py-3 transition-colors hover:bg-zinc-50 cursor-pointer ${
                                !notif.read ? "bg-blue-50/30" : ""
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getNotifTypeColor(
                                    notif.type
                                  )}`}
                                >
                                  <Bell size={12} weight="fill" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="mb-0.5 flex items-center gap-2">
                                    <h4 className="truncate text-xs font-bold text-zinc-900">
                                      {notif.title}
                                    </h4>
                                    {!notif.read && (
                                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                    )}
                                  </div>
                                  <p className="line-clamp-2 text-[11px] text-zinc-500">
                                    {notif.message}
                                  </p>
                                  <p className="mt-0.5 text-[10px] font-medium text-zinc-400">
                                    {notif.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-2.5">
                          <button className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            Lihat Semua Notifikasi
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t border-zinc-200 bg-white py-5">
            <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 md:flex md:items-center md:justify-between md:text-left lg:px-8">
              <p className="text-xs font-medium text-zinc-500">
                &copy; 2026 CleanKilo CRM. Hak Cipta Dilindungi.
              </p>
              <p className="mt-1.5 flex items-center justify-center gap-1 text-[11px] font-medium text-zinc-400 md:mt-0 md:justify-end">
                Dibangun dengan{" "}
                <span className="text-xs text-red-500">♥</span> untuk Proyek
                UAS
              </p>
            </div>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}
