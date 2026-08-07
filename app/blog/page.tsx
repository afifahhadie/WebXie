import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Blog — WebXie",
  description:
    "Artikel edukasi seputar digitalisasi UMKM: kenapa butuh website, tips praktis, mitos, dan tren digital.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden py-16">
        <HexagonGrid />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Blog
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Belajar Digitalisasi UMKM
          </h1>
          <p className="mt-4 text-ivory-dim max-w-2xl mx-auto">
            Artikel edukasi seputar website dan digitalisasi untuk UMKM —
            bukan promosi, murni buat bantu kamu paham.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <ScrollReveal key={post.slug}>
              <ArticleCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
