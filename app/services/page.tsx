import { SERVICES } from "@/data/services";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { HexagonGrid } from "@/components/HexagonGrid";
import { LiquidLinkButton } from "@/components/ui/liquid-link-button";

export const metadata = {
  title: "Services | WebXie",
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
            Pilih layanan yang paling sesuai dengan kebutuhan bisnis Anda.
            Belum yakin? Konsultasikan terlebih dahulu secara gratis.
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
                <LiquidLinkButton href="/contact" className="mt-6 justify-center">
                  {s.ctaLabel}
                </LiquidLinkButton>
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
