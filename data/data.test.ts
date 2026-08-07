import { describe, it, expect } from "vitest";
import { SERVICES, PROCESS_STEPS } from "./services";
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

  it("contains both required service slugs with correct priceLabel values", () => {
    const slugMap = Object.fromEntries(SERVICES.map(s => [s.slug, s]));
    expect(slugMap["company-profile"]).toBeDefined();
    expect(slugMap["company-profile"].priceLabel).toBe("Mulai dari Rp 1.000.000");
    expect(slugMap["sistem-custom"]).toBeDefined();
    expect(slugMap["sistem-custom"].priceLabel).toBe("Sesuai konsultasi");
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

  it("contains three required projects with correct slugs and categories", () => {
    const slugMap = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));

    expect(slugMap["kopi-4-mata"]).toBeDefined();
    expect(slugMap["kopi-4-mata"].category).toBe("Company Profile");

    expect(slugMap["area-tinggi-service"]).toBeDefined();
    expect(slugMap["area-tinggi-service"].category).toBe("Company Profile");

    expect(slugMap["felyhart-ph-detector"]).toBeDefined();
    expect(slugMap["felyhart-ph-detector"].category).toBe("Sistem Custom");
  });
});

describe("PROCESS_STEPS", () => {
  it("has exactly 7 process steps", () => {
    expect(PROCESS_STEPS).toHaveLength(7);
  });

  it("each step has a non-empty title and description", () => {
    for (const step of PROCESS_STEPS) {
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
    }
  });
});
