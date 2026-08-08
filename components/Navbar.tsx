"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiquidLinkButton } from "@/components/ui/liquid-link-button";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/70 backdrop-blur-md border-b border-navy-700 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-full.png"
            alt="WebXie"
            width={187}
            height={65}
            className="h-9 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-ivory-dim">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-ivory transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <LiquidLinkButton href="/contact" className="h-10 px-5">
                Free Consultation
          </LiquidLinkButton>
        </div>

        <button
          className="md:hidden text-ivory"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-950 border-t border-navy-700 px-6 py-4">
          <ul className="flex flex-col gap-4 text-ivory-dim">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-ivory"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <LiquidLinkButton
                href="/contact"
                className="h-10 px-5"
                onClick={() => setOpen(false)}
              >
            Free Consultation
              </LiquidLinkButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
