import { PRODUCTS, PRODUCTS_STORE_LINK } from "@/data/products";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Products — WebXie",
  description:
    "AI micro-tools digital dari WebXie untuk bisnis kuliner dan UMKM — praktis, terjangkau, langsung dipakai via browser.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Products
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            AI Micro-Tools untuk Bisnis Kuliner & UMKM
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Produk digital siap pakai langsung via browser — simple,
            terjangkau, dan langsung membantu operasional bisnis kamu.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <ScrollReveal key={p.slug} delay={(i % 3) * 0.08}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-navy-700 bg-navy-850 overflow-hidden h-full hover:border-blue-400 transition-colors"
              >
                <div className="relative h-44 bg-navy-700">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display font-bold group-hover:text-blue-300 transition-colors">
                    {p.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-blue-300 font-semibold">
                      {p.price}
                    </span>
                    <span className="text-xs text-ivory-dim line-through">
                      {p.originalPrice}
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-blue-400 font-semibold text-sm">
                    Lihat Produk →
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href={PRODUCTS_STORE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-8 py-3 font-semibold"
          >
            Lihat Semua Produk di Lynk.id
          </a>
        </div>
      </section>
    </>
  );
}
