"use client";

import Image from "next/image";
import { images } from "@/lib/images";
import { evidenceItems } from "@/lib/content";
import { evidenceCopy } from "@/lib/content-extra";
import { SectionTag, SerifEm } from "../ui/Typography";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

const evidenceImages: Record<string, string> = {
  workshop: images.workshop,
  interview: images.interview,
  field: images.field,
  punjab: images.punjab,
};

export function EvidenceScroll() {
  return (
    <section id="evidence" className="py-[var(--section-y)] bg-surface-muted">
      <div className="container-page">
        <AnimateIn className="mb-10 max-w-2xl">
          <SectionTag>Field Evidence</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a]">
            Built On <SerifEm>Real Farmer Data</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            Four proof points from workshops, interviews, live pilots, and field partnerships.
          </p>
        </AnimateIn>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evidenceItems.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="card-soft overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={evidenceImages[item.image] ?? images.field}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-[10px] font-semibold text-[#1a1a1a] uppercase tracking-wide">
                    {item.type}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-[#1a1a1a] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed flex-1">{evidenceCopy[i]}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
