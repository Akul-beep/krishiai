"use client";

import { useEffect, useState } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
      {open ? (
        <path
          d="M5 5L15 15M15 5L5 15"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 6.5H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 10H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 13.5H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4">
      <div className="container-page relative">
        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <a
            href="#home"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border border-black/6 shadow-[var(--shadow-soft)] shrink-0"
            aria-label={brand.name}
          >
            <SproutIcon className="w-5 h-5 text-[#1a1a1a]" />
          </a>

          <nav
            className="pill-nav flex items-center gap-0.5 rounded-full px-2 py-2 mx-auto"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full text-sm font-medium text-[#1a1a1a]/80 hover:text-[#1a1a1a] hover:bg-black/4 transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <span className="w-px h-8 bg-black/10 mx-1.5 shrink-0" aria-hidden />
            <div className="flex items-center gap-1.5 shrink-0">
              {sdgNavLinks.map((sdg) => (
                <a
                  key={sdg.label}
                  href={sdg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${sdg.label}: ${sdg.title}`}
                  aria-label={`${sdg.label}: ${sdg.title}`}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden ring-1 ring-black/8 hover:ring-black/20 hover:scale-105 transition-all shrink-0"
                >
                  <Image
                    src={sdg.image}
                    alt={sdg.title}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </a>
              ))}
            </div>
          </nav>

          <Button href={ctas.partner.href} variant="dark" size="sm" showArrow={false} className="shrink-0">
            {ctas.partner.label}
          </Button>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-between gap-3">
          <a
            href="#home"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border border-black/6 shadow-[var(--shadow-soft)] shrink-0"
            aria-label={brand.name}
            onClick={() => setMenuOpen(false)}
          >
            <SproutIcon className="w-5 h-5 text-[#1a1a1a]" />
          </a>

          <button
            type="button"
            className="pill-nav flex items-center justify-center w-11 h-11 rounded-full text-[#1a1a1a] shrink-0"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 z-40 bg-black/25"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="mobile-nav-menu"
              className="md:hidden absolute top-[calc(100%+0.75rem)] left-0 right-0 z-50 pill-nav rounded-3xl p-3 flex flex-col gap-1"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-2xl text-base font-medium text-[#1a1a1a] hover:bg-black/4 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-px bg-black/8 my-1 mx-2" aria-hidden />
              <div className="flex items-center gap-2 px-2 py-2">
                {sdgNavLinks.map((sdg) => (
                  <a
                    key={sdg.label}
                    href={sdg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${sdg.label}: ${sdg.title}`}
                    aria-label={`${sdg.label}: ${sdg.title}`}
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg overflow-hidden ring-1 ring-black/8"
                  >
                    <Image
                      src={sdg.image}
                      alt={sdg.title}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  </a>
                ))}
              </div>
              <a
                href={ctas.partner.href}
                className="mt-1 mx-1 mb-1 inline-flex items-center justify-center rounded-full bg-[#1a1a1a] text-white text-sm font-medium h-11 px-5"
                onClick={() => setMenuOpen(false)}
              >
                {ctas.partner.label}
              </a>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
