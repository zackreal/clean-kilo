import type { Icon } from "@phosphor-icons/react";
import {
  BellRinging,
  ChartBar,
  ChartPieSlice,
  ChatCenteredText,
  ClockCounterClockwise,
  Coins,
  GearSix,
  House,
  Truck,
  User,
  UsersThree,
  ListDashes,
  UserGear,
} from "@phosphor-icons/react";

export type CustomerTab =
  | "home"
  | "order"
  | "history"
  | "points"
  | "feedback"
  | "profile";

export type AdminSection =
  | "summary"
  | "orders"
  | "customers"
  | "users"
  | "segments"
  | "retention"
  | "loyalty"
  | "reviews";

export type CustomerData = {
  name: string;
  tier: "Gold" | "Silver" | "Regular";
  since: string;
  points: number;
  vouchers: number;
  phone: string;
  address: string;
  email: string;
  hasOrder: boolean;
  hasHistory: boolean;
};

export type OrderStatus = "diterima" | "dicuci" | "dikeringkan" | "disetrika" | "selesai";

export type ReviewItem = {
  id: string;
  name: string;
  stars: number;
  text: string;
};

export const initialCustomer: CustomerData = {
  name: "Dinda Pratiwi",
  tier: "Gold",
  since: "Feb 2025",
  points: 1280,
  vouchers: 2,
  phone: "0812-3456-7890",
  address: "Jl. Margonda Raya No. 12, Depok",
  email: "dinda.pratiwi@email.com",
  hasOrder: true,
  hasHistory: true,
};

export const customerNavItems: ReadonlyArray<{
  id: CustomerTab;
  label: string;
  icon: Icon;
}> = [
  { id: "home", label: "Beranda", icon: House },
  { id: "order", label: "Order", icon: Truck },
  { id: "history", label: "Riwayat", icon: ClockCounterClockwise },
  { id: "points", label: "Poin", icon: Coins },
  { id: "feedback", label: "Ulasan", icon: ChatCenteredText },
  { id: "profile", label: "Profil", icon: User },
];

export const adminMenuItems: ReadonlyArray<{
  id: AdminSection;
  label: string;
  icon: Icon;
}> = [
  { id: "summary", label: "Ringkasan Bisnis", icon: ChartBar },
  { id: "orders", label: "Kelola Pesanan", icon: ListDashes },
  { id: "customers", label: "Daftar Pelanggan", icon: UsersThree },
  { id: "users", label: "Kelola Staf", icon: UserGear },
  { id: "segments", label: "Segmentasi Pasar", icon: ChartPieSlice },
  { id: "retention", label: "Manajemen Churn", icon: BellRinging },
  { id: "loyalty", label: "Aturan Loyalty", icon: GearSix },
  { id: "reviews", label: "Feedback Center", icon: ChatCenteredText },
];

export const historyItems = [
  {
    code: "CK-2406-118",
    service: "Cuci + Setrika Express",
    weight: "4,2 kg",
    date: "24 Jun",
    total: "Rp 63.000",
  },
  {
    code: "CK-2406-092",
    service: "Cuci Kiloan Reguler",
    weight: "3,4 kg",
    date: "18 Jun",
    total: "Rp 34.000",
  },
  {
    code: "CK-2406-061",
    service: "Dry Cleaning Modern",
    weight: "2 jas",
    date: "10 Jun",
    total: "Rp 110.000",
  },
];

export const reviews: ReviewItem[] = [
  {
    id: "1",
    name: "Dinda Pratiwi",
    stars: 5,
    text: "Hasil cucian wangi dan rapi, antar-jemput tepat waktu.",
  },
  {
    id: "2",
    name: "Rahmat Hidayat",
    stars: 3,
    text: "Ada satu kemeja yang belum kembali, mohon dicek segera.",
  },
];

export const customerRows = [
  { name: "Dinda Pratiwi", initials: "DP", points: 1280, orders: 14, tier: "Gold" },
  { name: "Rahmat Hidayat", initials: "RH", points: 540, orders: 6, tier: "Silver" },
  { name: "Putri Wulandari", initials: "PW", points: 120, orders: 2, tier: "Regular" },
];

export const formatPoints = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

export const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
