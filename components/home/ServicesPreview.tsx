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
