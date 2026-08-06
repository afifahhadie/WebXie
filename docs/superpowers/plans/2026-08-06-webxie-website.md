# WebXie Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the WebXie marketing website (Home, Services, Projects, Blog, Contact) as a modern, animation-rich Next.js site per the approved design spec.

**Architecture:** Next.js 14 App Router + TypeScript + Tailwind CSS, static-first (no external backend). GSAP + ScrollTrigger drives all animation. Services/Projects data are typed TS objects; Blog posts are MDX files parsed with gray-matter. Contact form is a pure client-side redirect to WhatsApp — no server/API route.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, gray-matter + next-mdx-remote, Vitest + @testing-library/react for unit tests.

## Global Constraints

- Colors (exact hex, from spec): Navy 950 `#050914`, Navy 900 `#0a1128`, Navy 850 `#0d1730`, Navy 700 `#16213f`, Navy 600 `#233258`, Blue 500 `#2f6fef`, Blue 400 `#4c8dff`, Blue 300 `#8db8ff`, Ivory `#f4f6fb`, Ivory dim `#a9b3cc`.
- Fonts: Space Grotesk 700 for headings, Inter 400/500/600 for body.
- Animation library: GSAP + ScrollTrigger only — do not add Framer Motion.
- All non-essential animation must be gated behind `prefers-reduced-motion`.
- WhatsApp number for CTAs/redirects: `6282295298663` (from `+62 822-9529-8663`).
- Email: `webxie.jasawebsite@gmail.com`. Location: Tangerang Selatan, Banten.
- No backend/API routes, no database, no email service — this is a static marketing site.
- All user-facing copy is in Bahasa Indonesia, plain language, no technical jargon (target audience: UMKM owners).
- Node v24.16.0 / npm 11.13.0 are available in the dev environment.

---

### Task 1: Project Scaffold — Next.js, Tailwind, Design Tokens, Fonts

**Files:**
- Create: entire Next.js app via `create-next-app` (package.json, tsconfig.json, next.config.js, app/, etc.)
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `.gitignore` update if needed (create-next-app provides one)

**Interfaces:**
- Produces: Tailwind theme tokens `navy.{950,900,850,700,600}`, `blue.{500,400,300}`, `ivory` / `ivory.dim`, `font-display` (Space Grotesk), `font-body` (Inter) — every later task's JSX uses these exact class names.

- [ ] **Step 1: Scaffold the Next.js app**

Run from `D:\WebXie Website` (the existing `PRD.md`, `Logo_WebXie.jpeg`, `docs/` must survive — do NOT let this overwrite them):

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-git
```

When prompted about the directory not being empty, confirm to proceed (it only contains the PRD, logo, and docs, which are safe).

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: Build succeeds with the default Next.js starter page.

- [ ] **Step 3: Move the logo into `public/`**

```bash
mkdir -p public/images
mv "Logo_WebXie.jpeg" "public/images/logo.jpeg"
```

- [ ] **Step 4: Configure Tailwind theme tokens**

Replace `tailwind.config.ts` content with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050914",
          900: "#0a1128",
          850: "#0d1730",
          700: "#16213f",
          600: "#233258",
        },
        blue: {
          500: "#2f6fef",
          400: "#4c8dff",
          300: "#8db8ff",
        },
        ivory: {
          DEFAULT: "#f4f6fb",
          dim: "#a9b3cc",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Load fonts and set up root layout**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WebXie — Innovative Web Solutions",
  description:
    "Jasa pembuatan website Company Profile dan Sistem Custom untuk UMKM di Indonesia. Berbasis Tangerang Selatan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-navy-950 text-ivory font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

(Navbar/Footer will be added to this layout in Task 4 — leave `{children}` as the only content for now.)

- [ ] **Step 6: Replace `app/globals.css` body**

Ensure it starts with the Tailwind directives and adds smooth scroll:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #050914;
}
```

- [ ] **Step 7: Delete the default starter content**

Replace `app/page.tsx` with a minimal placeholder so the build stays green until Task 6 fills it in:

```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-display text-2xl">WebXie</p>
    </div>
  );
}
```

- [ ] **Step 8: Verify build and dev server**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors.

Run: `npm run dev` (in background), then check `http://localhost:3000` loads with navy background and "WebXie" text in Space Grotesk.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app with Tailwind design tokens and fonts"
```

---

### Task 2: Testing Infrastructure + Reduced-Motion Utility (TDD)

**Files:**
- Create: `vitest.config.ts`
- Create: `lib/reduced-motion.ts`
- Test: `lib/reduced-motion.test.ts`
- Modify: `package.json` (add test script + devDependencies)

**Interfaces:**
- Produces: `prefersReducedMotion(mql: Pick<MediaQueryList, "matches">): boolean` and `useReducedMotion(): boolean` (React hook) — used by every GSAP animation task from Task 6 onward to gate motion.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

- [ ] **Step 2: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Add `test` script to `package.json`**

In the `"scripts"` block, add:

```json
"test": "vitest run"
```

- [ ] **Step 4: Write the failing test**

Create `lib/reduced-motion.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { prefersReducedMotion } from "./reduced-motion";

describe("prefersReducedMotion", () => {
  it("returns true when the media query matches", () => {
    expect(prefersReducedMotion({ matches: true })).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    expect(prefersReducedMotion({ matches: false })).toBe(false);
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npx vitest run lib/reduced-motion.test.ts`
Expected: FAIL — `lib/reduced-motion.ts` does not exist yet.

- [ ] **Step 6: Implement the utility**

Create `lib/reduced-motion.ts`:

```ts
"use client";

import { useEffect, useState } from "react";

export function prefersReducedMotion(
  mql: Pick<MediaQueryList, "matches">
): boolean {
  return mql.matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(prefersReducedMotion(mql));

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run lib/reduced-motion.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add Vitest infra and reduced-motion utility with tests"
```

---

### Task 3: GSAP Setup + Hexagon Components

**Files:**
- Create: `lib/gsap.ts`
- Create: `components/Hexagon.tsx`
- Create: `components/HexagonGrid.tsx`
- Test: `components/Hexagon.test.tsx`

**Interfaces:**
- Consumes: `useReducedMotion` from `lib/reduced-motion.ts` (Task 2)
- Produces: `registerGsap()` (call once, registers ScrollTrigger), `<Hexagon>{icon}</Hexagon>` component (hexagon-framed icon container), `<HexagonGrid />` (decorative low-opacity background pattern) — used by Navbar (Task 4), Hero (Task 6), value-prop/service cards (Tasks 7, 9).

- [ ] **Step 1: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 2: Create the GSAP registration helper**

Create `lib/gsap.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Write the failing test for Hexagon**

Create `components/Hexagon.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hexagon } from "./Hexagon";

describe("Hexagon", () => {
  it("renders its children inside the hexagon frame", () => {
    render(
      <Hexagon>
        <span>icon</span>
      </Hexagon>
    );
    expect(screen.getByText("icon")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run components/Hexagon.test.tsx`
Expected: FAIL — `components/Hexagon.tsx` does not exist.

- [ ] **Step 5: Implement `Hexagon`**

Create `components/Hexagon.tsx`:

```tsx
export function Hexagon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center w-16 h-16 ${className}`}
      style={{
        clipPath:
          "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
        background:
          "linear-gradient(160deg, #0d1730 0%, #16213f 100%)",
        border: "1px solid #233258",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run components/Hexagon.test.tsx`
Expected: PASS

- [ ] **Step 7: Implement `HexagonGrid` (decorative background, no test — pure visual)**

Create `components/HexagonGrid.tsx`:

```tsx
export function HexagonGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hex-grid"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z"
            fill="none"
            stroke="#4c8dff"
            strokeWidth="1"
          />
          <path
            d="M28 66 L56 82 L56 116 L28 132 L0 116 L0 82 Z"
            fill="none"
            stroke="#4c8dff"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-grid)" />
    </svg>
  );
}
```

- [ ] **Step 8: Verify visually**

In `app/page.tsx`, temporarily wrap the placeholder in a `relative` div with `<HexagonGrid />` behind it, run `npm run dev`, confirm a faint hexagon pattern renders. Then revert `app/page.tsx` to the Task 1 placeholder (Task 6 will build the real Home page).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Add GSAP registration helper and hexagon-themed components"
```

---

### Task 4: Navbar + Footer (Shared Layout)

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `Hexagon` (Task 3), brand colors from Tailwind config (Task 1)
- Produces: `<Navbar />` and `<Footer />`, mounted globally in `app/layout.tsx` — every page task from here on renders inside this shared chrome, no page task re-implements nav/footer.

- [ ] **Step 1: Implement `Navbar`**

Create `components/Navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/70 backdrop-blur-md border-b border-navy-700 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpeg"
            alt="WebXie"
            width={36}
            height={36}
            className="rounded"
          />
          <span className="font-display font-bold text-lg">
            Web<span className="text-blue-400">X</span>
            <span className="text-blue-400">i</span>e
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ivory-dim">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-ivory transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-5 py-2 text-sm font-semibold text-ivory"
        >
          Konsultasi Gratis
        </Link>

        <button
          className="md:hidden text-ivory"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-950 border-t border-navy-700 px-6 py-4">
          <ul className="flex flex-col gap-4 text-ivory-dim">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-ivory"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-ivory"
                onClick={() => setOpen(false)}
              >
                Konsultasi Gratis
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Implement `Footer`**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-900">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.jpeg"
              alt="WebXie"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-display font-bold">WebXie</span>
          </div>
          <p className="mt-3 text-sm text-ivory-dim">
            Innovative Web Solutions untuk UMKM Indonesia.
          </p>
        </div>

        <div>
          <p className="font-display text-sm text-blue-300 mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm text-ivory-dim">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm text-blue-300 mb-3">Kontak</p>
          <ul className="space-y-2 text-sm text-ivory-dim">
            <li>WhatsApp: +62 822-9529-8663</li>
            <li>Email: webxie.jasawebsite@gmail.com</li>
            <li>Tangerang Selatan, Banten</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700 py-4 text-center text-xs text-ivory-dim">
        © {new Date().getFullYear()} WebXie. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire both into the root layout**

Modify `app/layout.tsx` — add the imports and mount them around `{children}`:

```tsx
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
```

```tsx
<body className="bg-navy-950 text-ivory font-body antialiased">
  <Navbar />
  <main className="pt-20">{children}</main>
  <Footer />
</body>
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`. Confirm: navbar is transparent at top, gains blur/background after scrolling 24px; footer renders with 3 columns; mobile viewport (< 768px) shows hamburger button that toggles the menu.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add shared Navbar and Footer, wire into root layout"
```

---

### Task 5: Data Layer — Services & Projects

**Files:**
- Create: `data/services.ts`
- Create: `data/projects.ts`
- Test: `data/data.test.ts`

**Interfaces:**
- Produces: `SERVICES: Service[]` and `PROJECTS: Project[]` with the exact shapes below — consumed by Task 7 (Services page), Task 9 (Projects page), and Home preview sections (Task 6/7).

- [ ] **Step 1: Write the failing test**

Create `data/data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { SERVICES } from "./services";
import { PROJECTS } from "./projects";

describe("SERVICES", () => {
  it("has exactly 2 services", () => {
    expect(SERVICES).toHaveLength(2);
  });

  it("each service has a name and slug", () => {
    for (const s of SERVICES) {
      expect(s.name).toBeTruthy();
      expect(s.slug).toBeTruthy();
    }
  });
});

describe("PROJECTS", () => {
  it("has exactly 3 projects", () => {
    expect(PROJECTS).toHaveLength(3);
  });

  it("each project has a working external link", () => {
    for (const p of PROJECTS) {
      expect(p.link.startsWith("http")).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run data/data.test.ts`
Expected: FAIL — modules don't exist.

- [ ] **Step 3: Implement `data/services.ts`**

```ts
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
```

- [ ] **Step 4: Implement `data/projects.ts`**

```ts
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
    link: "https://github.com/afifahhadie/kopi-4mata",
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
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run data/data.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add typed data layer for services and projects"
```

---

### Task 6: Home Page — Hero Section

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/HeroVisual.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `useReducedMotion` (Task 2), `registerGsap`/`gsap` (Task 3), `HexagonGrid` (Task 3)
- Produces: `<Hero />` mounted as the first section of `app/page.tsx`; later Home sections (Task 7) are appended below it in the same file.

- [ ] **Step 1: Implement the abstract animated hero visual**

Create `components/home/HeroVisual.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !containerRef.current) return;

    const hexes = containerRef.current.querySelectorAll<HTMLElement>(
      "[data-hex]"
    );
    const tweens = Array.from(hexes).map((el, i) =>
      gsap.to(el, {
        y: i % 2 === 0 ? -18 : 18,
        rotate: i % 2 === 0 ? 8 : -8,
        duration: 3 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      })
    );

    return () => tweens.forEach((t) => t.kill());
  }, [reduced]);

  const hexStyle = (size: number) => ({
    clipPath:
      "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
    width: size,
    height: size,
  });

  return (
    <div
      ref={containerRef}
      className="relative h-72 w-72 md:h-96 md:w-96 mx-auto"
      aria-hidden="true"
    >
      <div
        data-hex
        className="absolute top-4 left-8 bg-gradient-to-br from-blue-500/30 to-blue-400/10 border border-blue-400/40"
        style={hexStyle(140)}
      />
      <div
        data-hex
        className="absolute bottom-8 right-6 bg-gradient-to-br from-navy-700 to-navy-850 border border-blue-300/30"
        style={hexStyle(180)}
      />
      <div
        data-hex
        className="absolute top-1/3 right-0 bg-gradient-to-br from-blue-400/20 to-transparent border border-blue-400/30"
        style={hexStyle(100)}
      />
      <div
        className="absolute inset-0 rounded-full blur-3xl bg-blue-500/20"
        style={{ transform: "scale(0.8)" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Implement `Hero`**

Create `components/home/Hero.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";
import { HexagonGrid } from "@/components/HexagonGrid";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (headlineRef.current) {
      tl.from(
        headlineRef.current.querySelectorAll("[data-word]"),
        { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 },
        0
      );
    }
    if (subRef.current) {
      tl.from(subRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.4);
    }
    if (ctaRef.current) {
      tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.55);
    }
  }, [reduced]);

  const headline = "Website Profesional untuk UMKM Naik Kelas";

  return (
    <section className="relative overflow-hidden">
      <HexagonGrid />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-300 text-sm font-semibold tracking-wide uppercase mb-4">
            Innovative Web Solutions
          </p>
          <h1
            ref={headlineRef}
            className="font-display font-bold text-4xl md:text-5xl leading-tight"
          >
            {headline.split(" ").map((word, i) => (
              <span data-word key={i} className="inline-block mr-3">
                {word}
              </span>
            ))}
          </h1>
          <p ref={subRef} className="mt-6 text-ivory-dim text-lg max-w-xl">
            WebXie bantu UMKM di Indonesia punya website yang bikin calon
            pelanggan percaya — proses jelas, harga masuk akal, tanpa
            istilah teknis yang bikin pusing.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
            >
              Konsultasi Gratis
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-navy-600 hover:border-blue-400 transition-colors px-6 py-3 font-semibold"
            >
              Lihat Hasil Kerja Kami
            </Link>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount `Hero` in `app/page.tsx`**

Replace `app/page.tsx` with:

```tsx
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`. Confirm: headline words stagger in on load, subheadline/CTAs fade up after, two floating hexagon shapes animate gently on the right. Toggle OS "reduce motion" setting (or override `matchMedia` in devtools) and confirm animations stop but content is still visible.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Home hero section with GSAP entrance animation and abstract visual"
```

---

### Task 7: Home Page — Tentang, Value Proposition, Preview Sections, CTA Band

**Files:**
- Create: `components/home/ScrollReveal.tsx`
- Create: `components/home/About.tsx`
- Create: `components/home/ValueProps.tsx`
- Create: `components/home/ServicesPreview.tsx`
- Create: `components/home/ProjectsPreview.tsx`
- Create: `components/home/CtaBand.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `PROJECTS` (Task 5), `Hexagon` (Task 3), `useReducedMotion`/`gsap` (Tasks 2–3)
- Produces: `<ScrollReveal>` wrapper component reused by every later page section (Tasks 9, 11, 13) for consistent fade-up-on-scroll behavior.

- [ ] **Step 1: Implement the reusable `ScrollReveal` wrapper**

Create `components/home/ScrollReveal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Implement `About` (with count-up stats)**

Create `components/home/About.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";
import { ScrollReveal } from "./ScrollReveal";

function StatCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (!ref.current) return;

    if (reduced) {
      setValue(target);
      return;
    }

    const counter = { n: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          n: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => setValue(Math.round(counter.n)),
        });
      },
    });

    return () => st.kill();
  }, [reduced, target]);

  return (
    <div className="text-center">
      <span ref={ref} className="block font-display text-4xl font-bold text-blue-300">
        {value}
      </span>
      <span className="text-sm text-ivory-dim">{label}</span>
    </div>
  );
}

export function About() {
  return (
    <section className="bg-navy-900 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Tentang WebXie
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold">
            Partner Digital untuk UMKM yang Serius Naik Kelas
          </h2>
          <p className="mt-4 text-ivory-dim">
            WebXie adalah jasa web development yang fokus melayani UMKM di
            Indonesia — dari company profile sampai sistem custom, kami
            bantu bisnis kamu tampil profesional secara online tanpa bahasa
            teknis yang membingungkan.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-3 gap-6">
          <StatCounter target={2} label="Kategori Layanan" />
          <StatCounter target={3} label="Project Rampung" />
          <StatCounter target={1} label="Berbasis Tangerang Selatan" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement `ValueProps`**

Create `components/home/ValueProps.tsx`:

```tsx
import { Hexagon } from "@/components/Hexagon";
import { ScrollReveal } from "./ScrollReveal";

const VALUE_PROPS = [
  { title: "Cepat & Transparan", desc: "Proses kerja jelas dari awal, tanpa kejutan biaya di tengah jalan." },
  { title: "Bahasa Gampang Dimengerti", desc: "Kami jelaskan semuanya tanpa jargon teknis yang bikin bingung." },
  { title: "Harga Masuk Akal", desc: "Investasi yang sepadan untuk UMKM, mulai dari kebutuhan dasar." },
  { title: "Sederhana sampai Custom", desc: "Dari company profile simpel sampai sistem custom kompleks, kami siap." },
];

export function ValueProps() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">
            Kenapa UMKM Pilih WebXie
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <div className="text-center">
                <Hexagon className="mx-auto">
                  <span className="text-blue-300 font-display font-bold">
                    {i + 1}
                  </span>
                </Hexagon>
                <h3 className="mt-4 font-display font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-ivory-dim">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement `ServicesPreview`**

Create `components/home/ServicesPreview.tsx`:

```tsx
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ScrollReveal } from "./ScrollReveal";

export function ServicesPreview() {
  return (
    <section className="bg-navy-900 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">Layanan Kami</h2>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 0.1}>
              <div className="rounded-2xl border border-navy-700 bg-navy-850 p-8 h-full hover:border-blue-400 transition-colors">
                <h3 className="font-display text-xl font-bold">{s.name}</h3>
                <p className="mt-2 text-blue-300 font-semibold">{s.priceLabel}</p>
                <p className="mt-4 text-ivory-dim text-sm">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex rounded-full border border-navy-600 hover:border-blue-400 transition-colors px-6 py-3 font-semibold"
          >
            Lihat Semua Layanan
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement `ProjectsPreview`**

Create `components/home/ProjectsPreview.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";

export function ProjectsPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">Hasil Kerja Kami</h2>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.1}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-navy-700 bg-navy-850 overflow-hidden hover:border-blue-400 transition-colors"
              >
                <div className="relative h-40 bg-navy-700">
                  <Image
                    src={p.screenshot}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-blue-300 uppercase font-semibold">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-ivory-dim line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-navy-600 hover:border-blue-400 transition-colors px-6 py-3 font-semibold"
          >
            Lihat Semua Project
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `CtaBand`**

Create `components/home/CtaBand.tsx`:

```tsx
import Link from "next/link";
import { HexagonGrid } from "@/components/HexagonGrid";
import { ScrollReveal } from "./ScrollReveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900 border-y border-navy-700">
      <HexagonGrid />
      <ScrollReveal className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">
          Siap Punya Website yang Bikin Bisnis Kamu Dipercaya?
        </h2>
        <p className="mt-4 text-ivory-dim">
          Konsultasi gratis, tanpa komitmen. Ceritakan bisnis kamu, kami bantu
          cari solusi yang paling pas.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-8 py-3 font-semibold"
        >
          Konsultasi Gratis Sekarang
        </Link>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 7: Assemble the full Home page**

Replace `app/page.tsx` with:

```tsx
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { ValueProps } from "@/components/home/ValueProps";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ValueProps />
      <ServicesPreview />
      <ProjectsPreview />
      <CtaBand />
    </>
  );
}
```

- [ ] **Step 8: Verify in browser**

Run `npm run dev`. Scroll through `http://localhost:3000` top to bottom. Confirm every section fades up as it enters the viewport, stat numbers count up once when "Tentang WebXie" is reached, and project preview cards link out correctly (`target="_blank"`). Project screenshots will 404 until Task 10 — that's expected for now.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Complete Home page: About, ValueProps, previews, and CTA band"
```

---

### Task 8: Services Page

**Files:**
- Create: `components/services/ProcessTimeline.tsx`
- Create: `app/services/page.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `PROCESS_STEPS` (Task 5), `ScrollReveal` (Task 7), `gsap`/`ScrollTrigger` (Task 3)

- [ ] **Step 1: Implement `ProcessTimeline` with line-draw scroll animation**

Create `components/services/ProcessTimeline.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/reduced-motion";
import { PROCESS_STEPS } from "@/data/services";

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={sectionRef} className="relative pl-10">
      <div className="absolute left-3 top-0 bottom-0 w-px bg-navy-700" />
      <div
        ref={lineRef}
        className="absolute left-3 top-0 bottom-0 w-px bg-blue-400"
        style={{ transform: "scaleY(0)" }}
      />
      <ol className="space-y-10">
        {PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-navy-850 border border-blue-400 text-xs flex items-center justify-center font-display font-bold text-blue-300">
              {i + 1}
            </span>
            <h3 className="font-display font-bold">{step.title}</h3>
            <p className="mt-1 text-sm text-ivory-dim">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 2: Implement the Services page**

Create `app/services/page.tsx`:

```tsx
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Services — WebXie",
  description:
    "Layanan Company Profile dan Sistem Custom dari WebXie untuk UMKM Indonesia.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Layanan
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Dari Company Profile Sampai Sistem Custom
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Pilih layanan yang paling sesuai kebutuhan bisnis kamu — atau
            belum yakin? Konsultasi dulu, gratis.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8">
          {SERVICES.map((s) => (
            <ScrollReveal key={s.slug}>
              <div className="rounded-2xl border border-navy-700 bg-navy-850 p-8 h-full flex flex-col">
                <h2 className="font-display text-2xl font-bold">{s.name}</h2>
                <p className="mt-2 text-blue-300 font-semibold">{s.priceLabel}</p>
                <p className="mt-1 text-xs text-ivory-dim">{s.priceNote}</p>
                <p className="mt-4 text-ivory-dim flex-1">{s.description}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex justify-center rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
                >
                  {s.ctaLabel}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold">Proses Kerja</h2>
            <p className="mt-3 text-ivory-dim">
              7 tahap yang kami lalui bersama, dari konsultasi sampai
              support pasca-launch.
            </p>
          </ScrollReveal>
          <ProcessTimeline />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/services`. Confirm both service cards render with correct pricing text, and the process timeline's vertical blue line draws downward as you scroll through the 7 steps.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add Services page with process timeline line-draw animation"
```

---

### Task 9: Project Screenshots (Browser Automation)

**Files:**
- Create: `public/images/projects/kopi-4-mata.png`
- Create: `public/images/projects/area-tinggi-service.png`
- Create: `public/images/projects/felyhart-ph-detector.png`

**Interfaces:**
- Produces: the three screenshot files referenced by `PROJECTS[].screenshot` in `data/projects.ts` (Task 5) and rendered by `ProjectsPreview` (Task 7) and the Projects page (Task 10).

- [ ] **Step 1: Check whether Kopi 4 Mata has a live demo**

Load `https://github.com/afifahhadie/kopi-4mata` in a browser tab (`ToolSearch` for `mcp__claude-in-chrome__*` tools if not yet loaded, then `tabs_create_mcp` + `navigate`). Read the README for a live URL (e.g. GitHub Pages, Vercel, Netlify link).

- [ ] **Step 2: Capture Area Tinggi Service**

Navigate to `https://areatinggi.net/`, wait for full load, take a full-page or above-the-fold screenshot at a desktop viewport (1280×800). Save as `public/images/projects/area-tinggi-service.png`.

- [ ] **Step 3: Capture Felyhart pH Detector**

Navigate to `https://felyhart-ph-detector-v2.vercel.app`, wait for full load, take a screenshot at 1280×800. Save as `public/images/projects/felyhart-ph-detector.png`.

- [ ] **Step 4: Capture Kopi 4 Mata**

If Step 1 found a live URL, navigate there and screenshot it the same way. If no live demo exists, screenshot the GitHub repo page itself (`https://github.com/afifahhadie/kopi-4mata`) as the fallback, per the design spec section 8. Save as `public/images/projects/kopi-4-mata.png`.

- [ ] **Step 5: Verify files exist and are reasonable size**

```bash
ls -la public/images/projects/
```

Expected: 3 PNG files, each non-zero size (a few hundred KB is typical for a full-page screenshot).

- [ ] **Step 6: Verify in browser**

Run `npm run dev`, check `http://localhost:3000` (Projects Preview section) and confirm all 3 images load without broken-image icons.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add project screenshots captured from live project links"
```

---

### Task 10: Projects Page

**Files:**
- Create: `app/projects/page.tsx`

**Interfaces:**
- Consumes: `PROJECTS` (Task 5), screenshots (Task 9), `ScrollReveal` (Task 7)

- [ ] **Step 1: Implement the Projects page**

Create `app/projects/page.tsx`:

```tsx
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Projects — WebXie",
  description: "Portofolio project company profile dan sistem custom WebXie.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Projects
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Hasil Kerja Kami
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Klik project untuk melihat langsung hasilnya — semua link
            mengarah ke project asli.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 space-y-10">
          {PROJECTS.map((p) => (
            <ScrollReveal key={p.slug}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-navy-700 bg-navy-850 overflow-hidden hover:border-blue-400 transition-colors md:flex"
              >
                <div className="relative h-56 md:h-auto md:w-2/5 bg-navy-700 flex-shrink-0">
                  <Image
                    src={p.screenshot}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs text-blue-300 uppercase font-semibold">
                    {p.category} · {p.industry}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold group-hover:text-blue-300 transition-colors">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-ivory-dim">{p.description}</p>

                  {p.techDetail && (
                    <div className="mt-6 space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-blue-300">Alur Kerja</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.flow}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Validasi</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.validation}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Tech Stack</p>
                        <ul className="mt-1 flex flex-wrap gap-2">
                          {p.techDetail.stack.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-navy-600 px-3 py-1 text-xs text-ivory-dim"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Catatan Scope</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.scope}</p>
                      </div>
                    </div>
                  )}

                  <span className="mt-6 inline-flex items-center gap-1 text-blue-400 font-semibold text-sm">
                    Kunjungi Project →
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/projects`. Confirm all 3 project cards render with screenshots, Felyhart's card shows the extra tech-detail block, and clicking any card opens the correct external link in a new tab.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Add Projects page with full project cards and external links"
```

---

### Task 11: Blog Infrastructure (MDX Loader, TDD)

**Files:**
- Create: `lib/blog.ts`
- Test: `lib/blog.test.ts`
- Create: `content/blog/` (directory)
- Modify: `next.config.js` (MDX support)

**Interfaces:**
- Produces: `getAllPosts(dir?: string): BlogPostMeta[]` and `getPostBySlug(slug: string, dir?: string): { meta: BlogPostMeta; content: string }` — consumed by Task 13 (blog index) and Task 14 (article page).

- [ ] **Step 1: Install MDX dependencies**

```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Create the content directory and a test fixture**

```bash
mkdir -p content/blog
mkdir -p lib/__fixtures__/blog
```

Create `lib/__fixtures__/blog/artikel-a.mdx`:

```
---
title: "Artikel A"
pillar: "Pilar 1"
excerpt: "Ringkasan artikel A."
date: "2026-01-01"
---

Isi artikel A.
```

Create `lib/__fixtures__/blog/artikel-b.mdx`:

```
---
title: "Artikel B"
pillar: "Pilar 2"
excerpt: "Ringkasan artikel B."
date: "2026-02-01"
---

Isi artikel B.
```

- [ ] **Step 3: Write the failing test**

Create `lib/blog.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import path from "path";
import { getAllPosts, getPostBySlug } from "./blog";

const FIXTURE_DIR = path.join(__dirname, "__fixtures__/blog");

describe("getAllPosts", () => {
  it("returns all posts sorted by date descending", () => {
    const posts = getAllPosts(FIXTURE_DIR);
    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("artikel-b");
    expect(posts[1].slug).toBe("artikel-a");
  });

  it("includes frontmatter fields", () => {
    const posts = getAllPosts(FIXTURE_DIR);
    expect(posts[0].title).toBe("Artikel B");
    expect(posts[0].pillar).toBe("Pilar 2");
  });
});

describe("getPostBySlug", () => {
  it("returns the matching post's meta and content", () => {
    const post = getPostBySlug("artikel-a", FIXTURE_DIR);
    expect(post.meta.title).toBe("Artikel A");
    expect(post.content.trim()).toBe("Isi artikel A.");
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run lib/blog.test.ts`
Expected: FAIL — `lib/blog.ts` does not exist.

- [ ] **Step 5: Implement `lib/blog.ts`**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DEFAULT_BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  pillar: string;
  excerpt: string;
  date: string;
}

export function getAllPosts(dir: string = DEFAULT_BLOG_DIR): BlogPostMeta[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      pillar: data.pillar as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(
  slug: string,
  dir: string = DEFAULT_BLOG_DIR
): { meta: BlogPostMeta; content: string } {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      pillar: data.pillar as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
    },
    content,
  };
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run lib/blog.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add MDX blog loader with gray-matter frontmatter parsing"
```

---

### Task 12: Write 4 Blog Articles

**Files:**
- Create: `content/blog/5-alasan-umkm-wajib-punya-website-2026.mdx`
- Create: `content/blog/cara-umkm-mulai-digital-tanpa-bingung.mdx`
- Create: `content/blog/3-mitos-bikin-website-umkm-ragu.mdx`
- Create: `content/blog/tren-digital-umkm-indonesia.mdx`

**Interfaces:**
- Produces: 4 MDX files consumed by `getAllPosts`/`getPostBySlug` (Task 11) and rendered by Task 13/14.

- [ ] **Step 1: Write "5 Alasan UMKM Wajib Punya Website di 2026"**

Create `content/blog/5-alasan-umkm-wajib-punya-website-2026.mdx`:

```
---
title: "5 Alasan UMKM Wajib Punya Website di 2026"
pillar: "Kenapa UMKM Butuh Website"
excerpt: "Instagram dan WhatsApp aja nggak cukup lagi. Ini 5 alasan kenapa website jadi kebutuhan, bukan gengsi-gengsian."
date: "2026-01-15"
---

Banyak pemilik UMKM masih mikir website itu cuma buat perusahaan besar. Padahal di 2026, calon pelanggan makin sering cari tahu dulu lewat Google sebelum memutuskan beli atau order jasa. Kalau bisnis kamu nggak muncul di sana, kamu kehilangan kesempatan tanpa sadar.

## 1. Website Bikin Bisnis Kamu Kelihatan Lebih Terpercaya

Ketika calon pelanggan menemukan website resmi, kesan pertama yang muncul adalah: bisnis ini serius, bukan cuma iseng-iseng. Ini penting terutama kalau kamu jualan produk atau jasa dengan nilai transaksi yang nggak kecil.

## 2. Nggak Bergantung ke Algoritma Media Sosial

Instagram dan media sosial lain sering berubah algoritma tanpa pemberitahuan — jangkauan postingan kamu bisa naik-turun drastis. Website adalah aset yang sepenuhnya kamu kontrol sendiri, nggak terpengaruh perubahan algoritma platform orang lain.

## 3. Gampang Ditemukan Lewat Pencarian Google

Orang yang butuh produk atau jasa kamu sering langsung ketik di Google, bukan buka Instagram dulu. Website yang dioptimasi dengan baik bisa muncul di hasil pencarian dan mendatangkan calon pelanggan baru secara gratis, terus-menerus.

## 4. Semua Informasi Bisnis Ada di Satu Tempat

Di website, kamu bisa taruh semua info penting — produk, harga, cara order, lokasi, testimoni — rapi dalam satu tempat. Calon pelanggan nggak perlu scroll-scroll story lama atau chat berkali-kali cuma buat tanya hal dasar.

## 5. Modal Investasi Jangka Panjang

Berbeda dengan iklan yang berhenti begitu budget habis, website terus bekerja untuk bisnis kamu 24 jam, kapan pun ada orang yang mencarinya. Sekali dibangun dengan baik, manfaatnya bisa dirasakan bertahun-tahun.

---

Kalau kamu masih bingung mulai dari mana, WebXie bisa bantu mikirin bareng — konsultasi awal gratis, tanpa tekanan harus langsung order.
```

- [ ] **Step 2: Write "Cara UMKM Mulai Digital Tanpa Bingung Mulai dari Mana"**

Create `content/blog/cara-umkm-mulai-digital-tanpa-bingung.mdx`:

```
---
title: "Cara UMKM Mulai Digital Tanpa Bingung Mulai dari Mana"
pillar: "Tips Praktis Digital buat UMKM"
excerpt: "Digitalisasi UMKM nggak harus rumit. Ini urutan langkah praktis yang bisa kamu ikuti tanpa perlu jadi ahli teknologi."
date: "2026-02-10"
---

Kata "digitalisasi" sering kedengaran ribet, padahal untuk UMKM prosesnya bisa dipecah jadi langkah-langkah kecil yang gampang diikuti satu per satu.

## Langkah 1: Rapikan Dulu Data Bisnis Kamu

Sebelum mikirin website atau aplikasi, pastikan dulu kamu punya data dasar yang rapi: daftar produk/jasa, harga, foto yang layak pakai, dan info kontak yang aktif. Fondasi ini yang nanti dipakai di semua platform digital kamu.

## Langkah 2: Pastikan Bisnis Kamu Muncul di Google Maps

Ini langkah paling murah dan berdampak besar. Daftarkan bisnis kamu di Google Business Profile supaya muncul saat orang cari "toko/jasa ... dekat sini". Isi jam buka, foto, dan kategori bisnis dengan benar.

## Langkah 3: Bangun Kehadiran di Satu Media Sosial Dulu

Nggak perlu langsung aktif di semua platform. Pilih satu yang paling sesuai target pelanggan kamu, lalu konsisten posting di situ dulu sampai terasa terkelola dengan baik.

## Langkah 4: Siapkan Website Sebagai "Rumah" Digital Kamu

Setelah dasar-dasar di atas jalan, website jadi tempat semua orang diarahkan — dari bio Instagram, dari Google Maps, dari kartu nama. Website inilah yang membangun kepercayaan lebih dalam dibanding sekadar postingan media sosial.

## Langkah 5: Evaluasi dan Perbaiki Secara Bertahap

Digitalisasi bukan proyek sekali jadi. Cek berkala: apakah info kontak masih benar, apakah ada pertanyaan pelanggan yang terus berulang (tandanya perlu ditambahkan ke FAQ), dan sesuaikan strategi sedikit demi sedikit.

---

Kalau kamu sudah sampai di langkah butuh website tapi belum tahu harus mulai dari mana, WebXie siap bantu diskusi kebutuhan bisnis kamu dari awal.
```

- [ ] **Step 3: Write "3 Mitos Bikin Website yang Bikin UMKM Ragu Duluan"**

Create `content/blog/3-mitos-bikin-website-umkm-ragu.mdx`:

```
---
title: "3 Mitos Bikin Website yang Bikin UMKM Ragu Duluan"
pillar: "Mitos & Kekhawatiran Umum UMKM"
excerpt: "Banyak UMKM urung punya website karena kekhawatiran yang sebenarnya nggak sepenuhnya benar. Ini faktanya."
date: "2026-03-05"
---

Sering kali yang menahan UMKM untuk punya website bukan soal butuh atau nggak, tapi soal mitos yang bikin ragu duluan sebelum coba cari tahu.

## Mitos 1: "Bikin Website Itu Mahal Banget"

Faktanya, harga website sangat bervariasi tergantung kebutuhan. Company profile sederhana untuk UMKM bisa dimulai dari nominal yang jauh lebih terjangkau dari yang dibayangkan kebanyakan orang — jauh dari kesan "hanya untuk perusahaan besar".

## Mitos 2: "Nanti Ribet Urus Maintenance-nya"

Banyak yang membayangkan punya website berarti harus terus-terusan bayar tim IT atau ribet update sendiri. Padahal, sebagian besar company profile UMKM cukup jarang perlu diubah — dan biasanya sudah ada sesi training singkat cara update konten dasar saat serah terima, jadi kamu nggak buta sama sekali soal websitenya sendiri.

## Mitos 3: "Cukup Instagram Aja, Nggak Perlu Website"

Instagram bagus untuk membangun engagement, tapi punya keterbatasan: algoritma yang berubah-ubah, sulit menampilkan informasi lengkap secara terstruktur, dan kesannya kurang formal untuk calon pelanggan yang butuh keyakinan lebih sebelum bertransaksi. Website dan media sosial sebenarnya saling melengkapi, bukan saling menggantikan.

---

Kalau salah satu dari kekhawatiran ini yang bikin kamu ragu, coba konsultasi dulu — gratis, dan kamu bisa dapat gambaran biaya serta prosesnya yang sebenarnya, sesuai kondisi bisnis kamu.
```

- [ ] **Step 4: Write "Tren Digital UMKM Indonesia yang Perlu Diketahui"**

Create `content/blog/tren-digital-umkm-indonesia.mdx`:

```
---
title: "Tren Digital UMKM Indonesia yang Perlu Diketahui"
pillar: "Tren & Wawasan Digital UMKM"
excerpt: "Lanskap digital UMKM terus berubah. Ini beberapa tren yang perlu diperhatikan pelaku usaha kecil-menengah di Indonesia."
date: "2026-04-02"
---

Perilaku konsumen Indonesia terus bergeser ke arah digital, dan UMKM yang mengikuti perubahan ini biasanya lebih siap menangkap peluang baru.

## Pencarian Lokal Makin Penting

Semakin banyak orang mencari produk/jasa dengan embel-embel lokasi ("... dekat saya", "... di [nama kota]"). UMKM yang optimasi kehadiran lokalnya — lewat Google Maps dan website dengan info lokasi jelas — punya keunggulan dibanding yang tidak.

## Konsumen Makin Cek Dulu Sebelum Beli

Sebelum memutuskan, calon pelanggan sekarang terbiasa "riset kecil-kecilan": cek website, cek media sosial, baca ulasan. Bisnis yang minim jejak digital berisiko dilewatkan begitu saja, meskipun produk/jasanya sebenarnya bagus.

## Kebutuhan Sistem Custom Mulai Meningkat

Semakin banyak UMKM yang sudah melewati tahap dasar (company profile, media sosial) mulai butuh solusi lebih spesifik — sistem pemesanan sendiri, tools internal, sampai integrasi teknologi seperti AI untuk kebutuhan khusus bisnis mereka.

## Kesederhanaan Tetap Jadi Kunci

Meski teknologi makin canggih, tren yang tetap bertahan adalah: UMKM lebih memilih solusi yang simpel, jelas prosesnya, dan nggak bikin pusing — dibanding solusi yang secara teknis canggih tapi sulit dipahami dan dikelola sendiri.

---

Penasaran solusi digital seperti apa yang paling pas untuk tahap bisnis kamu sekarang? Yuk konsultasi gratis dengan WebXie.
```

- [ ] **Step 5: Verify with the blog loader**

Run: `npx vitest run lib/blog.test.ts` (should still pass, unaffected — fixtures are separate)

The real end-to-end verification happens in Task 13 when the blog index page renders all 4 real articles.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add 4 launch blog articles (one per content pillar)"
```

---

### Task 13: Blog Index Page

**Files:**
- Create: `components/blog/ArticleCard.tsx`
- Create: `app/blog/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts` (Task 11), articles (Task 12), `ScrollReveal` (Task 7)

- [ ] **Step 1: Implement `ArticleCard`**

Create `components/blog/ArticleCard.tsx`:

```tsx
import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

export function ArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-2xl border border-navy-700 bg-navy-850 p-6 hover:border-blue-400 transition-colors"
    >
      <p className="text-xs text-blue-300 uppercase font-semibold">
        {post.pillar}
      </p>
      <h2 className="mt-2 font-display text-xl font-bold">{post.title}</h2>
      <p className="mt-3 text-sm text-ivory-dim">{post.excerpt}</p>
    </Link>
  );
}
```

- [ ] **Step 2: Implement the Blog index page**

Create `app/blog/page.tsx`:

```tsx
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Blog — WebXie",
  description:
    "Artikel edukasi seputar digitalisasi UMKM: kenapa butuh website, tips praktis, mitos, dan tren digital.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Blog
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Belajar Digitalisasi UMKM
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Artikel edukasi seputar website dan digitalisasi untuk UMKM —
            bukan promosi, murni buat bantu kamu paham.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <ArticleCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/blog`. Confirm all 4 articles render as cards with pillar label, title, and excerpt, newest first (Tren Digital UMKM Indonesia, dated 2026-04-02, should appear first).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add Blog index page listing all articles"
```

---

### Task 14: Blog Article Page

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/blog/[slug]/not-found.tsx`

**Interfaces:**
- Consumes: `getPostBySlug`, `getAllPosts` (Task 11)

- [ ] **Step 1: Confirm the MDX remote renderer is available (installed in Task 11 via `next-mdx-remote`)**

No additional install needed.

- [ ] **Step 2: Implement the article page with static params**

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { meta } = getPostBySlug(params.slug);
    return { title: `${meta.title} — WebXie Blog`, description: meta.excerpt };
  } catch {
    return { title: "Artikel Tidak Ditemukan — WebXie Blog" };
  }
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-blue-400 hover:underline">
        ← Kembali ke Blog
      </Link>
      <p className="mt-6 text-xs text-blue-300 uppercase font-semibold">
        {post!.meta.pillar}
      </p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">
        {post!.meta.title}
      </h1>
      <div className="prose prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-blue-400 mt-8 max-w-none">
        <MDXRemote source={post!.content} />
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Install the Tailwind typography plugin used above (`prose` classes)**

```bash
npm install -D @tailwindcss/typography
```

Add the plugin to `tailwind.config.ts`:

```ts
import typography from "@tailwindcss/typography";
```

```ts
plugins: [typography],
```

- [ ] **Step 4: Implement the not-found fallback for unknown slugs**

Create `app/blog/[slug]/not-found.tsx`:

```tsx
import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Artikel Tidak Ditemukan</h1>
      <p className="mt-4 text-ivory-dim">
        Artikel yang kamu cari mungkin sudah dipindahkan atau belum tersedia.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
      >
        Kembali ke Blog
      </Link>
    </div>
  );
}
```

- [ ] **Step 5: Verify in browser**

Run `npm run dev`. Open `http://localhost:3000/blog/5-alasan-umkm-wajib-punya-website-2026` and confirm the article renders with headings styled via `prose`. Open `http://localhost:3000/blog/artikel-yang-tidak-ada` and confirm the not-found page renders instead of a crash.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add blog article page with MDX rendering and not-found fallback"
```

---

### Task 15: Contact Page — WhatsApp Redirect Logic (TDD) + Form

**Files:**
- Create: `lib/whatsapp.ts`
- Test: `lib/whatsapp.test.ts`
- Create: `components/contact/ConsultationForm.tsx`
- Create: `app/contact/page.tsx`

**Interfaces:**
- Produces: `validateConsultationForm(data): FieldErrors`, `buildWhatsAppUrl(data): string` — consumed by `ConsultationForm`.

- [ ] **Step 1: Write the failing tests**

Create `lib/whatsapp.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { validateConsultationForm, buildWhatsAppUrl, ConsultationFormData } from "./whatsapp";

describe("validateConsultationForm", () => {
  it("returns errors for all empty fields", () => {
    const errors = validateConsultationForm({});
    expect(errors.name).toBeTruthy();
    expect(errors.businessName).toBeTruthy();
    expect(errors.service).toBeTruthy();
    expect(errors.story).toBeTruthy();
  });

  it("returns no errors for a fully filled form", () => {
    const errors = validateConsultationForm({
      name: "Budi",
      businessName: "Kedai Budi",
      service: "Company Profile",
      story: "Jualan kopi di Tangerang.",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me URL with the correct number and encoded message", () => {
    const data: ConsultationFormData = {
      name: "Budi",
      businessName: "Kedai Budi",
      service: "Company Profile",
      story: "Jualan kopi di Tangerang.",
    };
    const url = buildWhatsAppUrl(data);
    expect(url.startsWith("https://wa.me/6282295298663?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Budi"));
    expect(url).toContain(encodeURIComponent("Kedai Budi"));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/whatsapp.test.ts`
Expected: FAIL — `lib/whatsapp.ts` does not exist.

- [ ] **Step 3: Implement `lib/whatsapp.ts`**

```ts
export interface ConsultationFormData {
  name: string;
  businessName: string;
  service: "Company Profile" | "Sistem Custom" | "Belum tahu, mau konsultasi dulu" | "";
  story: string;
}

export type FieldErrors = Partial<Record<keyof ConsultationFormData, string>>;

export function validateConsultationForm(
  data: Partial<ConsultationFormData>
): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Nama wajib diisi";
  }
  if (!data.businessName || data.businessName.trim().length === 0) {
    errors.businessName = "Nama bisnis wajib diisi";
  }
  if (!data.service) {
    errors.service = "Pilih layanan yang dibutuhkan";
  }
  if (!data.story || data.story.trim().length === 0) {
    errors.story = "Ceritakan sedikit tentang bisnis Anda";
  }
  return errors;
}

const WHATSAPP_NUMBER = "6282295298663";

export function buildWhatsAppUrl(data: ConsultationFormData): string {
  const message = [
    "Halo WebXie, saya ingin konsultasi.",
    "",
    `Nama: ${data.name}`,
    `Nama Bisnis: ${data.businessName}`,
    `Layanan: ${data.service}`,
    `Cerita Bisnis: ${data.story}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/whatsapp.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Implement `ConsultationForm`**

Create `components/contact/ConsultationForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import {
  ConsultationFormData,
  FieldErrors,
  validateConsultationForm,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

const SERVICE_OPTIONS: ConsultationFormData["service"][] = [
  "Company Profile",
  "Sistem Custom",
  "Belum tahu, mau konsultasi dulu",
];

const EMPTY: ConsultationFormData = {
  name: "",
  businessName: "",
  service: "",
  story: "",
};

export function ConsultationForm() {
  const [data, setData] = useState<ConsultationFormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateConsultationForm(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const url = buildWhatsAppUrl(data);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-navy-700 bg-navy-850 p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="name">
          Nama Anda
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="businessName">
          Nama Bisnis
        </label>
        <input
          id="businessName"
          type="text"
          value={data.businessName}
          onChange={(e) => setData({ ...data, businessName: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-red-400">{errors.businessName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="service">
          Layanan yang Dibutuhkan
        </label>
        <select
          id="service"
          value={data.service}
          onChange={(e) =>
            setData({
              ...data,
              service: e.target.value as ConsultationFormData["service"],
            })
          }
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        >
          <option value="">Pilih layanan</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-400">{errors.service}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="story">
          Ceritakan Bisnis Anda
        </label>
        <textarea
          id="story"
          rows={4}
          value={data.story}
          onChange={(e) => setData({ ...data, story: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.story && (
          <p className="mt-1 text-sm text-red-400">{errors.story}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
      >
        Kirim via WhatsApp
      </button>
    </form>
  );
}
```

- [ ] **Step 6: Implement the Contact page**

Create `app/contact/page.tsx`:

```tsx
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Contact — WebXie",
  description: "Hubungi WebXie untuk konsultasi gratis kebutuhan website bisnis kamu.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-16">
      <HexagonGrid />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Mari Diskusikan Kebutuhan Bisnis Kamu
          </h1>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-ivory-dim">
            <p>
              <span className="text-ivory font-semibold">WhatsApp:</span>{" "}
              +62 822-9529-8663
            </p>
            <p>
              <span className="text-ivory font-semibold">Email:</span>{" "}
              webxie.jasawebsite@gmail.com
            </p>
            <p>
              <span className="text-ivory font-semibold">Lokasi:</span>{" "}
              Tangerang Selatan, Banten
            </p>
          </div>

          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Verify in browser**

Run `npm run dev`, open `http://localhost:3000/contact`. Submit the form empty — confirm inline errors appear under each field and no WhatsApp tab opens. Fill all fields and submit — confirm a new tab opens to `https://wa.me/6282295298663?text=...` with the message containing all submitted data correctly.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add Contact page with validated form and WhatsApp redirect"
```

---

### Task 16: 404 Page + Final Verification Pass

**Files:**
- Create: `app/not-found.tsx`

**Interfaces:**
- Consumes: nothing new — this task is the final integration check across all prior tasks.

- [ ] **Step 1: Implement the global 404 page**

Create `app/not-found.tsx`:

```tsx
import Link from "next/link";
import { HexagonGrid } from "@/components/HexagonGrid";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-32">
      <HexagonGrid />
      <div className="relative mx-auto max-w-xl px-6 text-center">
        <p className="font-display text-6xl font-bold text-blue-300">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-3 text-ivory-dim">
          Halaman yang kamu cari mungkin sudah dipindahkan atau tidak ada.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
        >
          Kembali ke Home
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm run test`
Expected: All Vitest suites pass (`reduced-motion`, `Hexagon`, `data`, `blog`, `whatsapp`).

- [ ] **Step 3: Run a full production build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript or lint errors; all routes (`/`, `/services`, `/projects`, `/blog`, `/blog/[slug]` ×4, `/contact`) are listed in the output as statically generated.

- [ ] **Step 4: Browser walkthrough of every route**

Run `npm run dev`. Using the browser tool, visit and screenshot each of: `/`, `/services`, `/projects`, `/blog`, each of the 4 `/blog/[slug]` pages, `/contact`, and a nonexistent route (e.g. `/does-not-exist`) to confirm the 404 page. For each page, check the browser console for errors (`read_console_messages`).

- [ ] **Step 5: Responsive check**

Resize the browser viewport to a mobile width (~375px) and re-check `/` and `/contact`: confirm the navbar collapses to a hamburger menu, sections stack vertically, and the form remains usable.

- [ ] **Step 6: Fix any issues found**

If console errors, broken links, or layout issues are found in Steps 4–5, fix them in the relevant component file (from earlier tasks) and re-verify.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "Add 404 page and complete final verification pass"
```
