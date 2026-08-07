import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DEFAULT_BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  pillar: string;
  excerpt: string;
  date: string;
}

export function getAllPosts(dir: string = DEFAULT_BLOG_DIR): BlogPostMeta[] {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title as string,
      pillar: data.pillar as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(
  slug: string,
  dir: string = DEFAULT_BLOG_DIR
): { meta: BlogPostMeta; content: string } {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      pillar: data.pillar as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
    },
    content,
  };
}
