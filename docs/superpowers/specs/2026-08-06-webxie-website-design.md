# Design Spec — WebXie Website

**Date:** 2026-08-06
**Status:** Approved, ready for implementation planning
**Source PRD:** `PRD.md` (repo root)

## 1. Overview

WebXie adalah jasa freelance web development untuk UMKM di Indonesia (berbasis Tangerang Selatan). Website ini adalah alat marketing & lead-generation utama: membangun kesan profesional/kredibel dan mendorong pengisian form konsultasi. Layanan: Company Profile & Sistem Custom.

Full brand identity, copy, pricing, dan data project ada di `PRD.md` — dokumen ini fokus ke keputusan desain teknis & UX yang melengkapi PRD, bukan mengulang isinya.

## 2. Tech Stack

- **Next.js 14+ (App Router) + TypeScript + Tailwind CSS**
- **GSAP + ScrollTrigger** — satu-satunya library animasi (tidak pakai Framer Motion, untuk menghindari overhead dua library animasi)
- Dev lokal (`npm run dev`) untuk sekarang — deploy ke Vercel menyusul, di luar scope kerja ini
- Blog: MDX per artikel (`content/blog/*.mdx`)
- Services & Projects: data terstruktur di `data/services.ts` dan `data/projects.ts` (dataset kecil & tetap, tidak perlu CMS)

## 3. Routing / Arsitektur Situs

| Route | Deskripsi |
|---|---|
| `/` | Home — 8 section sesuai PRD 5.1 |
| `/services` | Single halaman — 2 card layanan + Proses Kerja 7 tahap (timeline vertikal beranimasi). Tidak ada sub-halaman per layanan. |
| `/projects` | Single halaman — 3 card besar (nama, kategori, industri, deskripsi lengkap termasuk detail teknis Felyhart). Seluruh card clickable, `target="_blank"` langsung ke link project asli. **Tidak ada** sub-halaman studi kasus per project (keputusan final, dikonfirmasi ulang oleh user). |
| `/blog` | Index artikel, grid dengan filter per pilar konten |
| `/blog/[slug]` | Halaman per-artikel (MDX), wajib multi-page untuk SEO |
| `/contact` | Info kontak + card form konsultasi |

Navbar & Footer adalah komponen shared di semua halaman (PRD 5.1 poin 1 & 8).

## 4. Design System

Semua token warna & tipografi mengikuti PRD section 2 persis (Navy 950/900/850/700/600, Blue 500/400/300, Ivory, Ivory dim; Space Grotesk untuk heading, Inter untuk body).

**Motif hexagon** sebagai elemen struktural berulang (bukan cuma navbar/logo):
- Bingkai hexagon di sekitar ikon (value prop, service card, step proses kerja)
- Pola grid hexagon tipis (low-opacity) sebagai tekstur background hero & CTA band
- Divider/section-break berbentuk hexagon-cut

## 5. Strategi Animasi (GSAP + ScrollTrigger)

- **Navbar**: glassmorphism blur + shrink saat scroll (scroll listener ringan, bukan ScrollTrigger)
- **Hero**: entrance timeline (headline stagger, subheadline & CTA fade-up). Visual: **animasi abstrak** (floating/rotating hexagon shapes + glow biru, gradient movement) — **bukan** screenshot project (keputusan eksplisit user)
- **Scroll-reveal**: tiap section fade-up + stagger saat masuk viewport (Tentang, Value Prop, Preview Services, Preview Projects, dst)
- **Card hover**: scale + glow border + micro-animation ikon
- **Proses Kerja** (Services): timeline vertikal dengan garis progress "tergambar" (line-draw) saat di-scroll
- **Angka statistik** ("Tentang WebXie": 2 layanan, 3 project): count-up saat masuk viewport
- **Page transition**: fade sederhana antar halaman
- **Wajib**: seluruh animasi non-esensial di-gate lewat `prefers-reduced-motion` (matchMedia) — dinonaktifkan/diperlambat untuk user yang mengaktifkan setting itu

## 6. Contact Form

Field sesuai PRD 5.5 (Nama Anda, Nama Bisnis, Layanan Dibutuhkan, Ceritakan Bisnis Anda).

**Flow**: validasi semua field wajib di client (pesan error inline, bukan `alert()`) → on submit sukses, redirect ke `https://wa.me/6282295298663?text=...` dengan pesan pre-filled berisi seluruh data form, buka tab baru. **Tidak** ada backend/API email — murni client-side redirect.

## 7. Konten Blog — 4 Artikel Launch

Satu artikel per pilar konten (dipilih oleh user dari 12 kandidat di PRD 5.4):

1. **Pilar 1**: "5 Alasan UMKM Wajib Punya Website di 2026"
2. **Pilar 2**: "Cara UMKM Mulai Digital Tanpa Bingung Mulai dari Mana"
3. **Pilar 3**: "3 Mitos Bikin Website yang Bikin UMKM Ragu Duluan"
4. **Pilar 4**: "Tren Digital UMKM Indonesia yang Perlu Diketahui"

Gaya bahasa: santai, non-jargon, sesuai target audiens PRD section 3. Panjang wajar (800–1200 kata). CTA konsultasi implisit di akhir artikel saja — bukan banner promosi.

## 8. Aset Visual Project

Screenshot 3 project diambil via browser automation dari live link:
- Area Tinggi Service — https://areatinggi.net/
- Felyhart pH Detector — https://felyhart-ph-detector-v2.vercel.app
- Kopi 4 Mata — https://github.com/afifahhadie/kopi-4mata (**catatan**: ini link GitHub repo, bukan domain live. Perlu dicek dulu apakah ada live demo di README; jika tidak ada, screenshot diambil dari halaman repo GitHub apa adanya sebagai fallback)

## 9. Error Handling & Edge Cases

- Form: validasi inline, tidak pakai `alert()`/`confirm()`
- Reduced motion: semua animasi GSAP di-gate
- Screenshot gagal dimuat: `next/image` dengan fallback placeholder bergaya brand (bukan broken-image icon)
- 404 page custom sesuai brand (penting karena `/blog/[slug]` dinamis)
- Responsive mobile-first: navbar jadi hamburger menu, animasi scroll tetap smooth di viewport kecil

## 10. Verifikasi

Setelah build: jalankan `npm run dev`, cek tiap halaman via browser (Claude in Chrome), test form flow end-to-end (redirect WA dengan data benar), cek console error, screenshot hasil akhir tiap halaman untuk review sebelum dianggap selesai.

## 11. Open Items (di luar scope sesi ini)

- Deploy ke Vercel (menyusul setelah review)
- Artikel blog tambahan di luar 4 yang dipilih (8 judul kandidat lain di PRD 5.4 belum ditulis)
