import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Projects | WebXie",
  description: "Portofolio project company profile dan sistem custom WebXie.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Projects
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Hasil Kerja Kami
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Klik project untuk melihat langsung hasilnya. Setiap tautan
            mengarah ke project asli.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 space-y-10">
          {PROJECTS.map((p) => (
            <ScrollReveal key={p.slug}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-navy-700 bg-navy-850 overflow-hidden hover:border-blue-400 transition-colors md:flex"
              >
                <div className="relative h-56 md:h-auto md:w-2/5 bg-navy-700 flex-shrink-0">
                  <Image
                    src={p.screenshot}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs text-blue-300 uppercase font-semibold">
                    {p.category} · {p.industry}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold group-hover:text-blue-300 transition-colors">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-ivory-dim">{p.description}</p>

                  {p.techDetail && (
                    <div className="mt-6 space-y-3 text-sm">
                      <div>
                        <p className="font-semibold text-blue-300">Alur Kerja</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.flow}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Validasi</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.validation}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Tech Stack</p>
                        <ul className="mt-1 flex flex-wrap gap-2">
                          {p.techDetail.stack.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-navy-600 px-3 py-1 text-xs text-ivory-dim"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-300">Catatan Scope</p>
                        <p className="mt-1 text-ivory-dim">{p.techDetail.scope}</p>
                      </div>
                    </div>
                  )}

                  <span className="mt-6 inline-flex items-center gap-1 text-blue-400 font-semibold text-sm">
                    Kunjungi Project →
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
