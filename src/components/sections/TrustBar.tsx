"use client";

import { trustPhrases, marqueeItems } from "@/lib/content-extra";
import { Typewriter } from "../ui/Typewriter";

export function TrustBar() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-8 border-y border-outline bg-white overflow-hidden">
      <div className="container-page mb-6">
        <p className="text-sm sm:text-base text-on-surface-variant text-center">
          Trusted by{" "}
          <Typewriter
            words={trustPhrases}
            className="font-semibold text-[#1a1a1a]"
          />
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-12 px-4">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-sm font-semibold text-[#1a1a1a]/20 whitespace-nowrap tracking-tight"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
