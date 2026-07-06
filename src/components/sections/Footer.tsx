"use client";

import { LinkedinLogo, TelegramLogo, Envelope } from "@phosphor-icons/react";
import { brand, ctas, sdgNavLinks } from "@/lib/content";
import { SproutIcon } from "../ui/Icons";
import { Button } from "../ui/Button";

const footerLinks = [
  { label: "Impact", href: "#impact" },
  { label: "Solution", href: "#solution" },
  { label: "Evidence", href: "#evidence" },
  { label: "Journey", href: "#journey" },
  { label: "Team", href: "#team" },
  { label: "Reports", href: "#reports" },
];

const footerActions = [
  ctas.joinEvent,
  ctas.partner,
  ctas.fundraise,
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container-page">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-14">
          <div className="flex items-center gap-3">
            <SproutIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">{brand.name}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {footerActions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                size="sm"
                showArrow={false}
                variant={action.label === ctas.partner.label ? "primary" : "dark"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 mb-6 text-sm text-white/60" aria-label="Footer">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-12 text-xs text-white/45" aria-label="UN SDGs">
          {sdgNavLinks.map((sdg) => (
            <a
              key={sdg.label}
              href={sdg.href}
              target="_blank"
              rel="noopener noreferrer"
              title={sdg.title}
              className="hover:text-white transition-colors"
            >
              {sdg.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/40">
          <span>© 2026 {brand.name}. All rights reserved.</span>

          <div className="flex items-center gap-5">
            <a href={`mailto:${brand.email}`} aria-label="Email" className="hover:text-white transition-colors">
              <Envelope className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <LinkedinLogo className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-white transition-colors">
              <TelegramLogo className="w-5 h-5" />
            </a>
          </div>

          <a href={`mailto:${brand.email}`} className="hover:text-white transition-colors">
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
