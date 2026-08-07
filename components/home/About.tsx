import { ScrollReveal } from "./ScrollReveal";

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
      </div>
    </section>
  );
}
