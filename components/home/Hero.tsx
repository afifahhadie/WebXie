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

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
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
            WebXie membantu UMKM di Indonesia memiliki website yang
            membangun kepercayaan calon pelanggan. Proses kerja jelas,
            harga masuk akal, dan tanpa istilah teknis yang membingungkan.
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
