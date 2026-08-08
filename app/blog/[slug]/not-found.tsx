import { LiquidLinkButton } from "@/components/ui/liquid-link-button";
import { ArrowLeft } from "lucide-react";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Artikel Tidak Ditemukan</h1>
      <p className="mt-4 text-ivory-dim">
        Artikel yang Anda cari mungkin sudah dipindahkan atau belum tersedia.
      </p>
      <LiquidLinkButton href="/blog" className="mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Kembali ke Blog
      </LiquidLinkButton>
    </div>
  );
}
