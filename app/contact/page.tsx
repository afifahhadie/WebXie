import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { HexagonGrid } from "@/components/HexagonGrid";

export const metadata = {
  title: "Contact — WebXie",
  description: "Hubungi WebXie untuk konsultasi gratis kebutuhan website bisnis kamu.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-16">
      <HexagonGrid />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Mari Diskusikan Kebutuhan Bisnis Kamu
          </h1>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-ivory-dim">
            <p>
              <span className="text-ivory font-semibold">WhatsApp:</span>{" "}
              +62 822-9529-8663
            </p>
            <p>
              <span className="text-ivory font-semibold">Email:</span>{" "}
              webxie.jasawebsite@gmail.com
            </p>
            <p>
              <span className="text-ivory font-semibold">Lokasi:</span>{" "}
              Tangerang Selatan, Banten
            </p>
          </div>

          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
