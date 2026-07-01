"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { adminMenuItems } from "@/lib/data";
import { SignOut } from "@phosphor-icons/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    router.push("/login");
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-[100dvh] bg-clean-light font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar Navigation */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200 bg-white shadow-sm flex flex-col">
        {/* Logo & Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-zinc-100 px-6">
          <div className="flex h-8 w-8 items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
              <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" stroke="url(#nlg1)" strokeWidth="1.5" fill="none"/>
              <circle cx="14" cy="14" r="4" fill="url(#nlg2)"/>
              <defs>
                <linearGradient id="nlg1" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb"/>
                  <stop offset="1" stopColor="#3b82f6"/>
                </linearGradient>
                <linearGradient id="nlg2" x1="10" y1="10" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb"/>
                  <stop offset="1" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-950">
            CleanKilo<span className="text-blue-600 ml-0.5">CRM</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {adminMenuItems.map((item) => {
            const href = `/admin/${item.id}`;
            const isActive = pathname === href;
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
                }`}
              >
                <Icon size={18} weight={isActive ? "fill" : "regular"} className={isActive ? "text-blue-600" : "text-zinc-400"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (Bottom of sidebar) */}
        <div className="border-t border-zinc-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-zinc-950">Administrator</p>
              <p className="truncate text-[10px] font-medium text-zinc-500">Super Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-400 hover:text-red-600 transition-colors shrink-0"
              title="Keluar"
            >
              <SignOut size={18} weight="bold" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col pl-64">
        {/* Minimal Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-end gap-x-4 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-zinc-500 hidden sm:block">16 Juni 2026</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer Admin */}
        <footer className="border-t border-zinc-200 bg-white py-6 mt-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center md:flex md:items-center md:justify-between md:text-left">
            <p className="text-xs font-medium text-zinc-500">
              &copy; 2026 CleanKilo CRM. Hak Cipta Dilindungi.
            </p>
            <p className="mt-2 text-[11px] font-medium text-zinc-400 md:mt-0 flex items-center justify-center md:justify-end gap-1">
              Dibangun dengan <span className="text-red-500 text-xs">♥</span> untuk Proyek UAS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
