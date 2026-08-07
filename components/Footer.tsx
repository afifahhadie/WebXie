import Link from "next/link";
import Image from "next/image";

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
            <li>WhatsApp: +62 822-9529-8663</li>
            <li>Email: webxie.jasawebsite@gmail.com</li>
            <li>Tangerang Selatan, Banten</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-700 py-4 text-center text-xs text-ivory-dim">
        © {new Date().getFullYear()} WebXie. All rights reserved.
      </div>
    </footer>
  );
}
