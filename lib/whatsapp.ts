export interface ConsultationFormData {
  name: string;
  businessName: string;
  service: "Company Profile" | "Sistem Custom" | "Belum tahu, mau konsultasi dulu" | "";
  story: string;
}

export type FieldErrors = Partial<Record<keyof ConsultationFormData, string>>;

export function validateConsultationForm(
  data: Partial<ConsultationFormData>
): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Nama wajib diisi";
  }
  if (!data.businessName || data.businessName.trim().length === 0) {
    errors.businessName = "Nama bisnis wajib diisi";
  }
  if (!data.service) {
    errors.service = "Pilih layanan yang dibutuhkan";
  }
  if (!data.story || data.story.trim().length === 0) {
    errors.story = "Ceritakan sedikit tentang bisnis Anda";
  }
  return errors;
}

const WHATSAPP_NUMBER = "6282295298663";

export function buildWhatsAppUrl(data: ConsultationFormData): string {
  const message = [
    "Halo WebXie, saya ingin konsultasi.",
    "",
    `Nama: ${data.name}`,
    `Nama Bisnis: ${data.businessName}`,
    `Layanan: ${data.service}`,
    `Cerita Bisnis: ${data.story}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
