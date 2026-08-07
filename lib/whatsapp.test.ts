import { describe, it, expect } from "vitest";
import { validateConsultationForm, buildWhatsAppUrl, ConsultationFormData } from "./whatsapp";

describe("validateConsultationForm", () => {
  it("returns errors for all empty fields", () => {
    const errors = validateConsultationForm({});
    expect(errors.name).toBeTruthy();
    expect(errors.businessName).toBeTruthy();
    expect(errors.service).toBeTruthy();
    expect(errors.story).toBeTruthy();
  });

  it("returns no errors for a fully filled form", () => {
    const errors = validateConsultationForm({
      name: "Budi",
      businessName: "Kedai Budi",
      service: "Company Profile",
      story: "Jualan kopi di Tangerang.",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me URL with the correct number and encoded message", () => {
    const data: ConsultationFormData = {
      name: "Budi",
      businessName: "Kedai Budi",
      service: "Company Profile",
      story: "Jualan kopi di Tangerang.",
    };
    const url = buildWhatsAppUrl(data);
    expect(url.startsWith("https://wa.me/6282295298663?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Budi"));
    expect(url).toContain(encodeURIComponent("Kedai Budi"));
  });
});
