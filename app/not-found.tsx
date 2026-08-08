import { HexagonGrid } from "@/components/HexagonGrid";
import { LiquidLinkButton } from "@/components/ui/liquid-link-button";
import { ArrowLeft } from "lucide-react";

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
          Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.
        </p>
        <LiquidLinkButton href="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Home
        </LiquidLinkButton>
      </div>
    </section>
  );
}
