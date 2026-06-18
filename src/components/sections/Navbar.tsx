"use client";

import { SproutIcon } from "../ui/Icons";
import { Button } from "../ui/Button";
import { brand, ctas } from "@/lib/content";

const navLinks = [
  { label: "Impact", href: "#impact" },
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Events", href: "#events" },
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
          className="pill-nav flex items-center gap-1 rounded-full px-2 py-1.5 mx-auto"
          aria-label="Primary"
        >
          <a href="#home" className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5">
            <SproutIcon className="w-4 h-4" />
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:bg-black/4 transition-colors whitespace-nowrap"
            >
              {link.label}
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
