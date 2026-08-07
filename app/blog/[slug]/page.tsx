import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { meta } = getPostBySlug(params.slug);
    return { title: `${meta.title} — WebXie Blog`, description: meta.excerpt };
  } catch {
    return { title: "Artikel Tidak Ditemukan — WebXie Blog" };
  }
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-blue-400 hover:underline">
        ← Kembali ke Blog
      </Link>
      <p className="mt-6 text-xs text-blue-300 uppercase font-semibold">
        {post!.meta.pillar}
      </p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">
        {post!.meta.title}
      </h1>
      <div className="prose prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-blue-400 mt-8 max-w-none">
        <MDXRemote source={post!.content} />
      </div>
    </article>
  );
}
