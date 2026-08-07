"use client";

import { useState } from "react";
import {
  ConsultationFormData,
  FieldErrors,
  validateConsultationForm,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

const SERVICE_OPTIONS: ConsultationFormData["service"][] = [
  "Company Profile",
  "Sistem Custom",
  "Belum tahu, mau konsultasi dulu",
];

const EMPTY: ConsultationFormData = {
  name: "",
  businessName: "",
  service: "",
  story: "",
};

export function ConsultationForm() {
  const [data, setData] = useState<ConsultationFormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateConsultationForm(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const url = buildWhatsAppUrl(data);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-navy-700 bg-navy-850 p-8 space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="name">
          Nama Anda
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="businessName">
          Nama Bisnis
        </label>
        <input
          id="businessName"
          type="text"
          value={data.businessName}
          onChange={(e) => setData({ ...data, businessName: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.businessName && (
          <p className="mt-1 text-sm text-red-400">{errors.businessName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="service">
          Layanan yang Dibutuhkan
        </label>
        <select
          id="service"
          value={data.service}
          onChange={(e) =>
            setData({
              ...data,
              service: e.target.value as ConsultationFormData["service"],
            })
          }
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        >
          <option value="">Pilih layanan</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-400">{errors.service}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1" htmlFor="story">
          Ceritakan Bisnis Anda
        </label>
        <textarea
          id="story"
          rows={4}
          value={data.story}
          onChange={(e) => setData({ ...data, story: e.target.value })}
          className="w-full rounded-lg bg-navy-900 border border-navy-600 px-4 py-2 focus:border-blue-400 outline-none"
        />
        {errors.story && (
          <p className="mt-1 text-sm text-red-400">{errors.story}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-blue-500 hover:bg-blue-400 transition-colors px-6 py-3 font-semibold"
      >
        Kirim via WhatsApp
      </button>
    </form>
  );
}
