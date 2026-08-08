import { HexagonGrid } from "@/components/HexagonGrid";
import { ScrollReveal } from "./ScrollReveal";
import { LiquidLinkButton } from "@/components/ui/liquid-link-button";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900 border-y border-navy-700">
      <HexagonGrid />
      <ScrollReveal className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-bold">
          Siap Memiliki Website yang Membuat Bisnis Anda Lebih Dipercaya?
        </h2>
        <p className="mt-4 text-ivory-dim">
          Konsultasi gratis tanpa komitmen. Ceritakan bisnis Anda, dan kami
          akan membantu menemukan solusi yang paling sesuai.
        </p>
        <LiquidLinkButton href="/contact" className="mt-8">
          Free Consultation Sekarang
          <ArrowRight className="size-4" aria-hidden="true" />
        </LiquidLinkButton>
      </ScrollReveal>
    </section>
  );
}
