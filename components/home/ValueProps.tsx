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
