"use client";

import { useState } from "react";
import { AdminSection, adminMenuItems } from "@/lib/data";
import { AdminChurnView } from "./sections/churn-view";
import { AdminCustomers } from "./sections/customers";
import { AdminFeedbackCenter } from "./sections/feedback-center";
import { AdminLoyaltyView } from "./sections/loyalty-view";
import { AdminOverview } from "./sections/overview";
import { AdminSegmentation } from "./sections/segmentation";

export function AdminShell() {
  const [activeSection, setActiveSection] =
    useState<AdminSection>("summary");

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <nav className="flex w-full gap-2 overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm lg:sticky lg:top-24 lg:w-64 lg:flex-col lg:overflow-x-visible">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-4 text-xs font-semibold transition lg:shrink ${
                isActive
                  ? "bg-cobalt text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              <Icon size={17} weight={isActive ? "fill" : "regular"} />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="min-w-0 flex-1">
        {activeSection === "summary" && <AdminOverview />}
        {activeSection === "customers" && <AdminCustomers />}
        {activeSection === "segments" && <AdminSegmentation />}
        {activeSection === "retention" && <AdminChurnView />}
        {activeSection === "loyalty" && <AdminLoyaltyView />}
        {activeSection === "reviews" && <AdminFeedbackCenter />}
      </div>
    </section>
  );
}
