export interface Project {
  slug: string;
  name: string;
  category: "Company Profile" | "Sistem Custom";
  industry: string;
  description: string;
  link: string;
  screenshot: string;
  techDetail?: {
    flow: string;
    validation: string;
    stack: string[];
    scope: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "kopi-4-mata",
    name: "Kopi 4 Mata",
    category: "Company Profile",
    industry: "F&B (kedai kopi)",
    description:
      "Company profile untuk kedai kopi lokal di Tangerang — tema hangat, ramah, dan mudah ditemukan calon pelanggan.",
    link: "https://afifahhadie.github.io/kopi-4mata/",
    screenshot: "/images/projects/kopi-4-mata.png",
  },
  {
    slug: "area-tinggi-service",
    name: "Area Tinggi Service",
    category: "Company Profile",
    industry: "Jasa industri (rope access & perawatan gedung tinggi)",
    description:
      "Website B2B untuk spesialis rope access yang melayani klien gedung bertingkat di seluruh Indonesia.",
    link: "https://areatinggi.net/",
    screenshot: "/images/projects/area-tinggi-service.png",
  },
  {
    slug: "felyhart-ph-detector",
    name: "Felyhart pH Detector",
    category: "Sistem Custom",
    industry: "Pet-tech / consumer, AI & Computer Vision",
    description:
      "Web app yang menganalisis foto pasir kucing (via Computer Vision) untuk memberi estimasi awal kondisi pH urine kucing — indikasi dini masalah saluran kemih/ginjal, dilakukan sendiri di rumah.",
    link: "https://felyhart-ph-detector-v2.vercel.app",
    screenshot: "/images/projects/felyhart-ph-detector.png",
    techDetail: {
      flow: "Halaman panduan foto → upload foto (kamera/galeri) → analisis warna via OpenCV, dicocokkan ke database 3 kategori pH (Asam/pink-kemerahan, Normal/ungu, Basa/biru-kehijauan) → halaman hasil (estimasi pH, kondisi, saran).",
      validation:
        "Validasi foto pakai Claude API (Haiku) — menolak foto yang bukan pasir kucing.",
      stack: [
        "Next.js (Vercel)",
        "FastAPI + OpenCV (Render)",
        "PostgreSQL via Supabase",
        "Cloudflare R2 (storage foto)",
        "Claude API Haiku (validasi foto)",
        "UptimeRobot (uptime backend)",
      ],
      scope:
        "Bukan sistem monitoring kontinu — ini analisis per-sesi, tidak ada dashboard monitoring, input sensor, atau laporan otomatis berkala.",
    },
  },
];
