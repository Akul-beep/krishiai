import Image from "next/image";
import { images } from "@/lib/images";
import { impactStats, missionStatement } from "@/lib/content";
import { impactStories } from "@/lib/content-extra";
import { SectionTag, SerifEm } from "../ui/Typography";
import { ImpactStatValue } from "../ui/ImpactStatValue";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

const storyImages = {
  irrigation: images.impactStoryIrrigation,
  harvest: images.impactStoryHarvest,
  field: images.impactStorySoil,
};

export function ImpactStats() {
  return (
    <section id="impact" className="pt-8 pb-12 sm:pb-14 bg-white">
      <div className="container-page">
        <AnimateIn className="pb-6 border-b border-outline mb-0">
          <SectionTag>What It Delivers</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a] max-w-2xl mt-1">
            Outcomes For <SerifEm>Farmers &amp; Fields</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
            {missionStatement}
          </p>
        </AnimateIn>

        <AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 py-8 border-b border-outline">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center sm:text-left sm:px-6 sm:first:pl-0 sm:last:pr-0 sm:border-r sm:last:border-r-0 border-outline"
              >
                <p className="stat-value text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-[#1a1a1a] leading-none mb-2">
                  <ImpactStatValue stat={stat} iconClassName="w-6 h-6 sm:w-7 sm:h-7" />
                </p>
                <p className="text-sm font-medium text-[#1a1a1a] mb-1">{stat.label}</p>
                <p className="text-xs text-on-surface-muted">{stat.desc}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn className="py-8 border-b border-outline mb-8">
          <h2 className="headline-lg text-[#1a1a1a] max-w-2xl">
            Supporting Smarter Growth For{" "}
            <SerifEm>Farmers &amp; Rural Communities</SerifEm>
          </h2>
        </AnimateIn>

        <p className="text-xs font-medium tracking-[0.08em] uppercase text-on-surface-muted mb-6">
          How We Create Impact
        </p>

        <Stagger className="grid md:grid-cols-3 gap-5">
          {impactStories.map((story) => (
            <StaggerItem key={story.title}>
              <article className="group">
                <div className="relative rounded-[var(--radius-card)] overflow-hidden aspect-[4/3] mb-4">
                  <Image
                    src={storyImages[story.image]}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                </div>
                <h3 className="text-base font-semibold text-[#1a1a1a] mb-2">{story.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{story.lines}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
