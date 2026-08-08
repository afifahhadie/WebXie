import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/ContactIcons";

export function WhatsAppBubble() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
}
