import { describe, it, expect } from "vitest";
import path from "path";
import { getAllPosts, getPostBySlug } from "./blog";

const FIXTURE_DIR = path.join(__dirname, "__fixtures__/blog");

describe("getAllPosts", () => {
  it("returns all posts sorted by date descending", () => {
    const posts = getAllPosts(FIXTURE_DIR);
    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("artikel-b");
    expect(posts[1].slug).toBe("artikel-a");
  });

  it("includes frontmatter fields", () => {
    const posts = getAllPosts(FIXTURE_DIR);
    expect(posts[0].title).toBe("Artikel B");
    expect(posts[0].pillar).toBe("Pilar 2");
  });
});

describe("getPostBySlug", () => {
  it("returns the matching post's meta and content", () => {
    const post = getPostBySlug("artikel-a", FIXTURE_DIR);
    expect(post.meta.title).toBe("Artikel A");
    expect(post.content.trim()).toBe("Isi artikel A.");
  });
});
