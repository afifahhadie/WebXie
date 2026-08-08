import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon, EmailIcon, LocationIcon } from "@/components/icons/ContactIcons";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-700 bg-navy-900">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <Image
            src="/images/logo-full.png"
            alt="WebXie"
            width={187}
            height={65}
            className="h-8 w-auto"
          />
          <p className="mt-3 text-sm text-ivory-dim">
            Innovative Web Solutions untuk UMKM Indonesia.
          </p>
        </div>

        <div>
          <p className="font-display text-sm text-blue-300 mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm text-ivory-dim">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm text-blue-300 mb-3">Kontak</p>
          <ul className="space-y-2 text-sm text-ivory-dim">
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-blue-300" />
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                +62 822-9529-8663
              </a>
            </li>
            <li className="flex items-center gap-2">
              <EmailIcon className="h-4 w-4 shrink-0 text-blue-300" />
              <a href="mailto:webxie.jasawebsite@gmail.com" className="hover:text-ivory">
                webxie.jasawebsite@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LocationIcon className="h-4 w-4 shrink-0 text-blue-300" />
              Tangerang Selatan, Banten
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700 py-4 text-center text-xs text-ivory-dim">
        © {new Date().getFullYear()} WebXie. All rights reserved.
      </div>
    </footer>
  );
}
