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
            WebXie adalah penyedia jasa pengembangan website yang berfokus
            melayani UMKM di Indonesia. Mulai dari company profile hingga
            sistem custom, kami membantu bisnis Anda tampil profesional
            secara online tanpa istilah teknis yang membingungkan.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
