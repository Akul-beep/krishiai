import Image from "next/image";
import { sdgs } from "@/lib/content";
import { SectionTag, SerifEm } from "../ui/Typography";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

export function SDGs() {
  return (
    <section id="sdgs" className="py-[var(--section-y)] bg-white">
      <div className="container-page">
        <AnimateIn className="text-center max-w-2xl mx-auto mb-12">
          <SectionTag>Sustainable Development Goals</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a] mb-4">
            Aligned With The <SerifEm>UN SDGs</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Measurable impact tied to three global goals. Built for farmers. Backed by data.
          </p>
        </AnimateIn>

        <Stagger className="grid md:grid-cols-3 gap-8">
          {sdgs.map((sdg) => (
            <StaggerItem key={sdg.id}>
              <article className="text-center">
                <div className="relative aspect-square w-full max-w-[220px] mx-auto mb-5 rounded-2xl overflow-hidden shadow-[var(--shadow-soft)]">
                  <Image
                    src={sdg.image}
                    alt={sdg.title}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
                <p className="stat-value text-3xl font-semibold text-primary leading-none mb-1">
                  {sdg.stat}
                </p>
                <p className="text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-3">
                  {sdg.statLabel}
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">{sdg.body}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
