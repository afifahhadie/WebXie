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
