import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { ScrollReveal } from "./ScrollReveal";

export function ProjectsPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold">Hasil Kerja Kami</h2>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.1}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-navy-700 bg-navy-850 overflow-hidden hover:border-blue-400 transition-colors"
              >
                <div className="relative h-40 bg-navy-700">
                  <Image
                    src={p.screenshot}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-blue-300 uppercase font-semibold">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm text-ivory-dim line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-navy-600 hover:border-blue-400 transition-colors px-6 py-3 font-semibold"
          >
            Lihat Semua Project
          </Link>
        </div>
      </div>
    </section>
  );
}
