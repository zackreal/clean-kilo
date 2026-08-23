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
  Presentation,
  Headset,
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
  | "reviews"
  | "analytics"
  | "resolution";

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
  date: string;
  tags: string[];
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "promo";
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
  { id: "retention", label: "Analisis Churn", icon: ClockCounterClockwise },
  { id: "loyalty", label: "Loyalty Program", icon: Presentation },
  { id: "reviews", label: "Feedback Center", icon: ChatCenteredText },
  { id: "analytics", label: "Laporan & Analitik", icon: Presentation },
  { id: "resolution", label: "Pusat Resolusi", icon: Headset },
];

export type ResolutionTicket = {
  id: string;
  orderId: string;
  customerName: string;
  category: "Pakaian Hilang" | "Pakaian Luntur" | "Hasil Kotor" | "Lainnya";
  description: string;
  date: string;
  status: "Menunggu" | "Diinvestigasi" | "Selesai";
};

export const resolutionTickets: ResolutionTicket[] = [
  {
    id: "TKT-2408-01",
    orderId: "CK-2408-115",
    customerName: "Siti Aminah",
    category: "Pakaian Luntur",
    description: "Kemeja putih saya kelunturan warna merah jambu dari baju lain. Mohon segera ditindaklanjuti.",
    date: "Hari Ini, 10:15 WIB",
    status: "Menunggu",
  },
  {
    id: "TKT-2408-02",
    orderId: "CK-2408-090",
    customerName: "Rahmat Hidayat",
    category: "Pakaian Hilang",
    description: "Satu celana jeans levis biru saya sepertinya tertukar atau hilang, tidak ada di dalam plastik.",
    date: "Kemarin, 15:30 WIB",
    status: "Diinvestigasi",
  },
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
  {
    code: "CK-2405-048",
    service: "Cuci + Setrika Express",
    weight: "5,1 kg",
    date: "28 Mei",
    total: "Rp 76.500",
  },
  {
    code: "CK-2405-022",
    service: "Cuci Kiloan Reguler",
    weight: "2,8 kg",
    date: "15 Mei",
    total: "Rp 28.000",
  },
];

export const reviews: ReviewItem[] = [
  {
    id: "1",
    name: "Dinda Pratiwi",
    stars: 5,
    text: "Hasil cucian wangi dan rapi, antar-jemput tepat waktu. Sangat memuaskan!",
    date: "2 jam lalu",
    tags: ["Wangi Banget", "Tepat Waktu"],
  },
  {
    id: "2",
    name: "Rahmat Hidayat",
    stars: 3,
    text: "Ada satu kemeja yang belum kembali, mohon dicek segera.",
    date: "5 jam lalu",
    tags: ["Pakaian Hilang"],
  },
  {
    id: "3",
    name: "Siti Aminah",
    stars: 5,
    text: "Pelayanan sangat cepat dan bersih. Kurir juga sangat sopan. Recommended!",
    date: "1 hari lalu",
    tags: ["Sangat Bersih", "Kurir Ramah"],
  },
  {
    id: "4",
    name: "Budi Santoso",
    stars: 4,
    text: "Secara keseluruhan bagus, hanya saja pengiriman agak terlambat 30 menit dari estimasi.",
    date: "1 hari lalu",
    tags: ["Terlambat"],
  },
  {
    id: "5",
    name: "Mega Lestari",
    stars: 2,
    text: "Pakaian putih saya jadi kekuningan setelah dicuci. Sangat kecewa dan minta kompensasi.",
    date: "2 hari lalu",
    tags: ["Pakaian Luntur", "Kurang Bersih"],
  },
  {
    id: "6",
    name: "Andi Saputra",
    stars: 5,
    text: "Layanan dry cleaning untuk jas saya hasilnya luar biasa. Seperti baru lagi!",
    date: "3 hari lalu",
    tags: ["Sangat Bersih", "Pakaian Rapi"],
  },
];

export const customerRows = [
  { name: "Dinda Pratiwi", initials: "DP", points: 1280, orders: 14, tier: "Gold" },
  { name: "Rahmat Hidayat", initials: "RH", points: 540, orders: 6, tier: "Silver" },
  { name: "Putri Wulandari", initials: "PW", points: 120, orders: 2, tier: "Regular" },
];

export const adminNotifications: NotificationItem[] = [
  {
    id: "N1",
    title: "Order Baru Masuk",
    message: "Budi Santoso baru saja membuat order Cuci Kilat (5kg).",
    time: "2 menit lalu",
    read: false,
    type: "info",
  },
  {
    id: "N2",
    title: "Ulasan Bintang 5 ⭐",
    message: "Siti Aminah memberikan rating sempurna untuk layanan Express.",
    time: "15 menit lalu",
    read: false,
    type: "success",
  },
  {
    id: "N3",
    title: "Peringatan Churn!",
    message: "3 pelanggan baru masuk zona 'High Risk' - sudah 60+ hari tidak order.",
    time: "1 jam lalu",
    read: false,
    type: "warning",
  },
  {
    id: "N4",
    title: "Komplain Masuk",
    message: "Mega Lestari melaporkan pakaian luntur pada order CK-2406-045.",
    time: "2 jam lalu",
    read: true,
    type: "warning",
  },
  {
    id: "N5",
    title: "Voucher Diklaim",
    message: "Rahmat Hidayat menggunakan kode COMEBACK20 untuk diskon 20%.",
    time: "5 jam lalu",
    read: true,
    type: "promo",
  },
  {
    id: "N6",
    title: "Target Bulanan Tercapai!",
    message: "Pendapatan bulan ini telah melampaui target Rp 30jt. Selamat! 🎉",
    time: "1 hari lalu",
    read: true,
    type: "success",
  },
];

export const customerNotifications: NotificationItem[] = [
  {
    id: "CN1",
    title: "Cucian Anda Sedang Dicuci",
    message: "Order CK-2406-118 sudah masuk proses pencucian. Estimasi selesai: 4 jam.",
    time: "30 menit lalu",
    read: false,
    type: "info",
  },
  {
    id: "CN2",
    title: "Poin Berhasil Ditambahkan! 🎉",
    message: "+45 poin dari transaksi terakhir Anda. Total poin aktif: 1.280.",
    time: "2 jam lalu",
    read: false,
    type: "success",
  },
  {
    id: "CN3",
    title: "Promo Spesial Akhir Bulan!",
    message: "Dapatkan bonus 2x poin untuk semua layanan Express hingga 30 Juni.",
    time: "1 hari lalu",
    read: true,
    type: "promo",
  },
  {
    id: "CN4",
    title: "Ulasan Anda Dibalas",
    message: "Tim CleanKilo telah membalas ulasan Anda. Lihat balasan sekarang.",
    time: "2 hari lalu",
    read: true,
    type: "info",
  },
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

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export const getCurrentDate = () => {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};