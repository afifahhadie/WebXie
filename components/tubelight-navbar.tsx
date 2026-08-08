"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  FolderKanban, 
  ShoppingBag, 
  FileText, 
  MessageCircle 
} from "lucide-react";
import { LiquidLinkButton } from "@/components/ui/liquid-link-button";

const NAV_ITEMS = [
  { 
    href: "/", 
    label: "Home", 
    icon: Home,
    desktopIcon: Home
  },
  { 
    href: "/services", 
    label: "Services", 
    icon: Briefcase,
    desktopIcon: Briefcase
  },
  { 
    href: "/projects", 
    label: "Projects", 
    icon: FolderKanban,
    desktopIcon: FolderKanban
  },
  { 
    href: "/products", 
    label: "Products", 
    icon: ShoppingBag,
    desktopIcon: ShoppingBag
  },
  { 
    href: "/blog", 
    label: "Blog", 
    icon: FileText,
    desktopIcon: FileText
  },
  { 
    href: "/contact", 
    label: "Contact", 
    icon: MessageCircle,
    desktopIcon: MessageCircle
  },
];

export function TubelightNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get active index based on current pathname
  const activeIndex = NAV_ITEMS.findIndex(item => item.href === pathname);
  
  // Use hovered index if hovering, otherwise use active index
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

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
          ? "bg-navy-950/80 backdrop-blur-md border-b border-navy-600/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center z-10">
          <Image
            src="/images/logo-full.png"
            alt="WebXie"
            width={187}
            height={65}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 relative">
          <div className="relative flex items-center gap-1 px-1 py-1 rounded-2xl border border-navy-700/30 bg-navy-900/40 backdrop-blur-sm">
            {/* Glowing indicator */}
            <motion.div
              layoutId="tubelight-indicator"
              className="absolute -z-10 rounded-xl bg-gradient-to-r from-blue-500/20 via-blue-400/40 to-blue-300/20 
                       shadow-lg shadow-blue-500/20 border border-blue-400/30 backdrop-blur-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ 
                width: `${100 / NAV_ITEMS.length}%`,
                height: "calc(100% - 8px)",
                margin: "4px",
                transform: `translateX(${displayIndex * 100}%)`,
              }}
            />

            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium relative z-10 ${
                    activeIndex === index
                      ? "text-ivory"
                      : "text-ivory-dim hover:text-ivory"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <item.desktopIcon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="ml-6">
            <LiquidLinkButton href="/contact" className="h-10 px-6">
              Free Consultation
            </LiquidLinkButton>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ivory z-10 p-2"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={open ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed inset-x-0 top-20 bg-navy-950/95 backdrop-blur-xl border-b border-navy-700 px-6 py-6"
            >
              <div className="space-y-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_ITEMS.indexOf(item) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 py-3 transition-colors ${
                        activeIndex === index
                          ? "text-ivory"
                          : "text-ivory-dim hover:text-ivory"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="pt-4"
                >
                  <LiquidLinkButton
                    href="/contact"
                    className="w-full h-11"
                    onClick={() => setOpen(false)}
                  >
                    Free Consultation
                  </LiquidLinkButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}