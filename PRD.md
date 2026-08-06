# PRD — WebXie Website

## 1. Ringkasan Proyek

**WebXie** adalah jasa freelance web development yang menyasar klien UMKM (Usaha Mikro, Kecil, dan Menengah) di Indonesia. Berbasis di Tangerang Selatan, Banten. Website ini menjadi alat marketing dan lead-generation utama — tujuannya membangun kesan profesional dan kredibel di mata calon klien UMKM, serta mendorong mereka mengisi form konsultasi.

**Layanan yang ditawarkan:** Company Profile dan Sistem Custom.

**Status saat ini:** Tahap perencanaan selesai (belum ada development). Dokumen ini adalah acuan lengkap untuk mulai membangun website secara aktual (rencana development di Claude Code).

---

## 2. Identitas Brand

- **Nama:** WebXie
- **Tagline:** "Innovative Web Solutions"
- **Logo:** Gradasi navy gelap dengan hexagon putih berisi ikon panah/play biru, wordmark "WebXie" tebal berwarna putih dengan huruf "i" beraksen biru
- **Aset logo:** sudah final, tersedia (`Logo_WebXie.jpeg`, diupload user)

### Palet Warna
| Token | Hex | Penggunaan |
|---|---|---|
| Navy 950 | `#050914` | Background halaman (paling gelap) |
| Navy 900 | `#0a1128` | Background section alternatif |
| Navy 850 | `#0d1730` | Background card |
| Navy 700 | `#16213f` | Border, card surface |
| Navy 600 | `#233258` | Border aksen |
| Blue 500 | `#2f6fef` | CTA utama, aksen primer |
| Blue 400 | `#4c8dff` | Aksen hover, ikon |
| Blue 300 | `#8db8ff` | Highlight teks, eyebrow label |
| Ivory | `#f4f6fb` | Teks utama |
| Ivory dim | `#a9b3cc` | Teks sekunder |

### Tipografi
- **Display/Heading:** Space Grotesk (700) — bold, geometris, senada dengan wordmark logo
- **Body/UI:** Inter (400/500/600)

### Elemen Signature
Motif **hexagon** dari logo dipakai berulang sebagai elemen struktural — bingkai ikon, aksen dekoratif, pola grid tipis di background hero — bukan cuma di navbar. Ini yang membedakan dari template navy-blue generik.

### Referensi Desain
- [21st.dev](https://21st.dev) — arah hero section modern dengan animated navbar (glassmorphism, glow, micro-animation)
- [recent.design](https://recent.design) — referensi umum, gaya campuran

---

## 3. Target Audiens

Pemilik UMKM di Indonesia — sebagian besar belum terlalu tech-savvy, butuh bahasa yang jelas (bukan jargon teknis), dan sensitif terhadap harga. Seluruh copywriting dan struktur konten harus bicara ke pain point mereka: kepercayaan calon pelanggan, biaya yang masuk akal, dan kemudahan proses.

---

## 4. Arsitektur Situs

**Multi-page** (bukan single-page scroll) — dipilih untuk manfaat SEO, ruang deskripsi layanan yang lebih kaya, dan halaman studi kasus per-project.

Halaman: `Home`, `Services`, `Projects`, `Blog`, `Contact`

Blog wajib multi-page (tiap artikel URL sendiri, penting untuk SEO). Services dan Projects juga sebaiknya multi-page agar tiap layanan/project punya ruang detail yang cukup.

---

## 5. Spesifikasi Halaman

### 5.1 Home

Section (urutan):
1. **Navbar** — sticky, glassmorphism saat scroll. Logo + nav links (Home/Services/Projects/Blog/Contact) + CTA "Konsultasi Gratis"
2. **Hero** — headline + subheadline berbicara ke pain point UMKM, dua CTA (Konsultasi Gratis / Lihat Hasil Kerja Kami). Elemen visual: browser-frame mockup mengambang menampilkan salah satu project asli
3. **Tentang WebXie** — intro singkat + fakta jujur (bukan angka fiktif): 2 kategori layanan, 3 project rampung, berbasis Tangerang Selatan
4. **Value Proposition** — 4 poin: cepat & transparan, bahasa gampang dimengerti, harga masuk akal, bisa dari sederhana sampai custom
5. **Preview Services** — 2 card ringkas, link ke halaman Services
6. **Preview Projects** — 3 card ringkas, link ke halaman Projects
7. **CTA band** — ajakan konsultasi terakhir sebelum footer
8. **Footer** — logo, nav, kontak (WA/email/lokasi), copyright

### 5.2 Services

**Company Profile**
- Harga: **Mulai dari Rp 1.000.000**
- Harga final menyesuaikan jumlah halaman, kompleksitas desain, dan fitur tambahan — dibahas saat konsultasi (jangan rinci fitur lengkap di harga pembuka ini)
- CTA: "Konsultasi Gratis" → Contact

**Sistem Custom**
- Harga: **Sesuai konsultasi** (tidak ditampilkan angka di web)
- Scope sangat variatif (dari CRUD sederhana sampai integrasi AI), maka wajib konsultasi dulu untuk scoping
- CTA: "Diskusikan Kebutuhan" → Contact

**Proses Kerja** (7 tahap, tampilkan sebagai list bernomor karena memang urutan proses nyata):
1. Konsultasi & Briefing — gratis, via form konsultasi atau WA
2. Proposal & Kesepakatan — scope kerja, timeline, harga, DP 50%
3. Wireframe/Desain — approval sebelum development
4. Development
5. Testing & Revisi
6. Launch & Handover — training singkat cara update konten
7. Support Pasca-Launch — garansi bug-fix 7–14 hari (maintenance bulanan opsional, terpisah)

### 5.3 Projects

Tiga project, ditampilkan sebagai card di halaman Projects.

**Interaksi:** setiap card project bisa langsung diklik dan mengarah ke link asli project tersebut, buka di tab baru.

| Project | Kategori | Industri | Deskripsi Singkat | Link |
|---|---|---|---|---|
| Kopi 4 Mata | Company Profile | F&B (kedai kopi) | Company profile untuk kedai kopi lokal di Tangerang — tema hangat, ramah, mudah ditemukan calon pelanggan | https://github.com/afifahhadie/kopi-4mata |
| Area Tinggi Service | Company Profile | Jasa industri (rope access & perawatan gedung tinggi) | Website B2B untuk spesialis rope access yang melayani klien gedung bertingkat di seluruh Indonesia | https://areatinggi.net/ |
| Felyhart pH Detector | Sistem Custom | Pet-tech / consumer, AI & Computer Vision | Web app yang menganalisis foto pasir kucing (via Computer Vision) untuk memberi estimasi awal kondisi pH urine kucing — indikasi dini masalah saluran kemih/ginjal, dilakukan sendiri di rumah | https://felyhart-ph-detector-v2.vercel.app |

**Detail Felyhart pH Detector** (untuk studi kasus, harus akurat — jangan ditulis seolah ada fitur yang tidak ada):
- Alur: halaman panduan foto → upload foto (kamera/galeri) → analisis warna via OpenCV, dicocokkan ke database 3 kategori pH (Asam/pink-kemerahan, Normal/ungu, Basa/biru-kehijauan) → halaman hasil (estimasi pH, kondisi, saran)
- Validasi foto pakai Claude API (Haiku) — menolak foto yang bukan pasir kucing
- Tech stack: Next.js (Vercel), FastAPI + OpenCV (Render), PostgreSQL via Supabase, Cloudflare R2 (storage foto), Claude API Haiku (validasi foto), UptimeRobot (uptime backend)
- **Bukan** sistem monitoring kontinu — ini analisis per-sesi, tidak ada dashboard monitoring, input sensor, atau laporan otomatis berkala

### 5.4 Blog

**Fokus konten: murni edukasi soal UMKM** — bukan artikel promosi WebXie. CTA ke konsultasi hanya muncul implisit di akhir artikel.

4 pilar konten:

**Pilar 1 — Kenapa UMKM Butuh Website**
- 5 Alasan UMKM Wajib Punya Website di 2026
- Cuma Andalin Instagram/WA, Cukup Nggak buat Bisnis?
- Tanda-Tanda Usaha Kamu Udah Waktunya Punya Website
- Dampak Nggak Punya Website ke Kepercayaan Calon Pelanggan

**Pilar 2 — Tips Praktis Digital buat UMKM**
- 5 Hal Wajib Ada di Company Profile UMKM
- Cara Optimasi Google Maps Bisnis Biar Gampang Ditemukan
- Company Profile vs Landing Page: UMKM Cocok yang Mana?
- Cara UMKM Mulai Digital Tanpa Bingung Mulai dari Mana

**Pilar 3 — Mitos & Kekhawatiran Umum UMKM**
- 3 Mitos Bikin Website yang Bikin UMKM Ragu Duluan
- Website Mahal & Ribet Maintenance? Ini Faktanya

**Pilar 4 — Tren & Wawasan Digital UMKM**
- Tren Digital UMKM Indonesia yang Perlu Diketahui
- Kapan UMKM Perlu Sistem Custom, Bukan Sekadar Website Biasa?

> Jumlah artikel prioritas untuk launch pertama belum difinalisasi — masih open item.

### 5.5 Contact

**Info kontak:**
- WhatsApp: +62 822-9529-8663
- Email: webxie.jasawebsite@gmail.com
- Lokasi: Tangerang Selatan, Banten

**Card Konsultasi** (form), field:
- Nama Anda (text)
- Nama Bisnis (text)
- Layanan yang Dibutuhkan (select): Company Profile / Sistem Custom / Belum tahu, mau konsultasi dulu
- Ceritakan Bisnis Anda (textarea)

---

## 6. Status Aset Konten

| Item | Status |
|---|---|
| Logo & brand asset | ✅ Final |
| Struktur situs & copy Home | ✅ Final |
| Pricing & proses kerja Services | ✅ Final |
| Data & tech detail 3 project | ✅ Final |
| Daftar final artikel Blog untuk launch | ⏳ Belum difinalisasi (jumlah & prioritas) |
| Wireframe/desain visual Services, Projects, Blog, Contact | ⏳ Belum dibuat (baru Home) |

---

## 7. Catatan Teknis untuk Development

- Development dilakukan di Claude Code, bukan di sesi chat ini.
- Semua harga dan copy di atas sudah final dan sudah disepakati — tidak perlu dikonfirmasi ulang kecuali ada perubahan dari user.
