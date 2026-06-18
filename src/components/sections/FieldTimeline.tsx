"use client";

import { fieldTimeline } from "@/lib/content-extra";
import { ctas } from "@/lib/content";
import { SectionTag, SerifEm } from "../ui/Typography";
import { Button } from "../ui/Button";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

export function FieldTimeline() {
  return (
    <section id="events" className="py-[var(--section-y)] bg-white border-t border-outline">
      <div className="container-page">
        <AnimateIn className="mb-12 max-w-lg">
          <SectionTag>Field Events</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a]">
            From Research To <SerifEm>National Scale</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            Four stages. One goal: put better data in the hands of every farmer.
          </p>
        </AnimateIn>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {fieldTimeline.map((item, i) => (
            <StaggerItem key={item.step}>
              <article className="relative p-6 rounded-[var(--radius-card)] bg-surface-muted h-full">
                {i < fieldTimeline.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-outline" aria-hidden />
                )}
                <p className="text-3xl font-bold text-primary/40 mb-3">{item.step}</p>
                <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">{item.label}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <AnimateIn className="flex flex-wrap items-center justify-center gap-4">
          <Button href={ctas.joinEvent.href} showArrow={false}>
            {ctas.joinEvent.label}
          </Button>
          <Button href={ctas.partner.href} variant="ghost" showArrow={false} className="ring-1 ring-outline">
            {ctas.partner.label}
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
