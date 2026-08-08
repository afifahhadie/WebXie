import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { HexagonGrid } from "@/components/HexagonGrid";
import { WhatsAppIcon, EmailIcon, LocationIcon } from "@/components/icons/ContactIcons";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact | WebXie",
  description: "Hubungi WebXie untuk konsultasi gratis mengenai kebutuhan website bisnis Anda.",
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
            Mari Diskusikan Kebutuhan Bisnis Anda
          </h1>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-ivory-dim">
            <p className="flex items-center gap-3">
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-blue-300" />
              <span>
                <span className="text-ivory font-semibold">WhatsApp:</span>{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ivory"
                >
                  +62 822-9529-8663
                </a>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <EmailIcon className="h-5 w-5 shrink-0 text-blue-300" />
              <span>
                <span className="text-ivory font-semibold">Email:</span>{" "}
                <a href="mailto:webxie.jasawebsite@gmail.com" className="hover:text-ivory">
                  webxie.jasawebsite@gmail.com
                </a>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <LocationIcon className="h-5 w-5 shrink-0 text-blue-300" />
              <span>
                <span className="text-ivory font-semibold">Lokasi:</span>{" "}
                Tangerang Selatan, Banten
              </span>
            </p>
          </div>

          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
