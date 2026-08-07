import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

export function ArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block rounded-2xl border border-navy-700 bg-navy-850 p-6 hover:border-blue-400 transition-colors"
    >
      <p className="text-xs text-blue-300 uppercase font-semibold">
        {post.pillar}
      </p>
      <h2 className="mt-2 font-display text-xl font-bold">{post.title}</h2>
      <p className="mt-3 text-sm text-ivory-dim">{post.excerpt}</p>
    </Link>
  );
}
