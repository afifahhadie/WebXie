export interface Service {
  slug: "company-profile" | "sistem-custom";
  name: string;
  priceLabel: string;
  priceNote: string;
  description: string;
  ctaLabel: string;
}

export const SERVICES: Service[] = [
  {
    slug: "company-profile",
    name: "Company Profile",
    priceLabel: "Mulai dari Rp 1.000.000",
    priceNote:
      "Harga final menyesuaikan jumlah halaman, kompleksitas desain, dan fitur tambahan — dibahas saat konsultasi.",
    description:
      "Website profil bisnis yang membangun kepercayaan calon pelanggan — cocok untuk UMKM yang ingin tampil profesional dan mudah ditemukan online.",
    ctaLabel: "Konsultasi Gratis",
  },
  {
    slug: "sistem-custom",
    name: "Sistem Custom",
    priceLabel: "Sesuai konsultasi",
    priceNote:
      "Scope sangat variatif, dari CRUD sederhana sampai integrasi AI — kami scoping dulu bareng kamu sebelum bicara harga.",
    description:
      "Sistem/aplikasi web yang dibangun sesuai kebutuhan spesifik bisnis kamu — dari tools internal sampai produk digital custom.",
    ctaLabel: "Diskusikan Kebutuhan",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Konsultasi & Briefing",
    description: "Gratis, via form konsultasi atau WhatsApp.",
  },
  {
    title: "Proposal & Kesepakatan",
    description: "Scope kerja, timeline, harga, dan DP 50%.",
  },
  {
    title: "Wireframe/Desain",
    description: "Approval desain sebelum masuk development.",
  },
  {
    title: "Development",
    description: "Website/sistem dibangun sesuai desain yang disepakati.",
  },
  {
    title: "Testing & Revisi",
    description: "Pengecekan menyeluruh dan revisi sesuai feedback.",
  },
  {
    title: "Launch & Handover",
    description: "Website live, plus training singkat cara update konten.",
  },
  {
    title: "Support Pasca-Launch",
    description:
      "Garansi bug-fix 7–14 hari. Maintenance bulanan tersedia opsional, terpisah.",
  },
];
