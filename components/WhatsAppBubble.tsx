import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/ContactIcons";

export function WhatsAppBubble() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110">
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </span>
    </a>
  );
}
