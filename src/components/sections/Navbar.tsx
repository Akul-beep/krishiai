"use client";

import Image from "next/image";
import { SproutIcon } from "../ui/Icons";
import { Button } from "../ui/Button";
import { brand, ctas, sdgNavLinks } from "@/lib/content";

const navLinks = [
  { label: "Impact", href: "#impact" },
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Journey", href: "#journey" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4">
      <div className="container-page flex items-center justify-between gap-4">
        <a
          href="#home"
          className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border border-black/6 shadow-[var(--shadow-soft)] shrink-0"
          aria-label={brand.name}
        >
          <SproutIcon className="w-5 h-5 text-[#1a1a1a]" />
        </a>

        <nav
          className="pill-nav flex items-center gap-0.5 rounded-full px-1.5 py-1.5 mx-auto overflow-x-auto max-w-[min(100%,calc(100vw-8rem))] scrollbar-none"
          aria-label="Primary"
        >
          <a href="#home" className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 shrink-0">
            <SproutIcon className="w-4 h-4" />
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-full text-sm font-medium text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:bg-black/4 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
          <span className="hidden md:block w-px h-5 bg-black/10 mx-1 shrink-0" aria-hidden />
          {sdgNavLinks.map((sdg) => (
            <a
              key={sdg.label}
              href={sdg.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${sdg.label}: ${sdg.title}`}
              aria-label={`${sdg.label}: ${sdg.title}`}
              className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden ring-1 ring-black/8 hover:ring-black/20 hover:scale-105 transition-all shrink-0"
            >
              <Image
                src={sdg.image}
                alt={sdg.title}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </nav>

        <Button href={ctas.partner.href} variant="dark" size="sm" showArrow={false} className="shrink-0 hidden sm:inline-flex">
          {ctas.partner.label}
        </Button>
      </div>
    </header>
  );
}
