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
