import { describe, it, expect } from "vitest";
import { SERVICES } from "./services";
import { PROJECTS } from "./projects";

describe("SERVICES", () => {
  it("has exactly 2 services", () => {
    expect(SERVICES).toHaveLength(2);
  });

  it("each service has a name and slug", () => {
    for (const s of SERVICES) {
      expect(s.name).toBeTruthy();
      expect(s.slug).toBeTruthy();
    }
  });
});

describe("PROJECTS", () => {
  it("has exactly 3 projects", () => {
    expect(PROJECTS).toHaveLength(3);
  });

  it("each project has a working external link", () => {
    for (const p of PROJECTS) {
      expect(p.link.startsWith("http")).toBe(true);
    }
  });
});
