"use client";

import Image from "next/image";
import { images } from "@/lib/images";
import { problemStats } from "@/lib/content";
import { SectionTag, SerifEm } from "../ui/Typography";
import { Button } from "../ui/Button";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

const problemTiles = [
  {
    ...problemStats[0],
    image: images.irrigation,
    grid: "lg:col-span-3 lg:row-span-2",
    imagePosition: "center",
  },
  {
    ...problemStats[1],
    image: images.wheat,
    grid: "lg:col-span-2 lg:col-start-4 lg:row-start-1",
    imagePosition: "center",
  },
  {
    ...problemStats[2],
    image: images.aerialFields,
    grid: "lg:col-span-2 lg:col-start-4 lg:row-start-2",
    imagePosition: "center top",
    label: "Every season",
  },
  {
    ...problemStats[3],
    image: images.grass,
    grid: "lg:col-span-5 lg:row-start-3 min-h-[200px]",
    imagePosition: "center",
  },
];

function InlinePill({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-block relative w-12 h-8 sm:w-16 sm:h-10 rounded-full overflow-hidden align-middle mx-1 sm:mx-2 border-2 border-white shadow-sm">
      <Image src={src} alt={alt} fill className="object-cover" sizes="64px" />
    </span>
  );
}

function ProblemTile({
  title,
  stat,
  body,
  image,
  imagePosition = "center",
  label,
}: (typeof problemTiles)[number] & { label?: string }) {
  return (
    <article className="group relative h-full min-h-[240px] lg:min-h-0 rounded-[var(--radius-card)] overflow-hidden ring-1 ring-black/[0.06]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ objectPosition: imagePosition }}
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-80" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
        {stat ? (
          <p className="stat-value text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold text-primary leading-none mb-2">
            {stat}
          </p>
        ) : label ? (
          <span className="inline-flex w-fit items-center rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary mb-3">
            {label}
          </span>
        ) : null}

        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/80 leading-relaxed max-w-sm">{body}</p>
      </div>
    </article>
  );
}

export function Problem() {
  return (
    <section id="problem" className="py-[var(--section-y)] bg-surface-muted">
      <div className="container-page">
        <AnimateIn className="mb-10">
          <SectionTag>The Problem We Solve</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a] max-w-4xl leading-[1.15]">
            The challenges farmers
            <InlinePill src={images.farmer} alt="Farmer" />
            face every season can be solved with{" "}
            <SerifEm>real field intelligence</SerifEm>
          </h2>
        </AnimateIn>

        <Stagger className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[1fr_1fr_auto] gap-4 mb-10 lg:min-h-[480px]">
          {problemTiles.map((tile) => (
            <StaggerItem key={tile.title} className={tile.grid}>
              <ProblemTile {...tile} />
            </StaggerItem>
          ))}
        </Stagger>

        <AnimateIn className="pt-8 border-t border-outline">
          <p className="text-xs text-on-surface-muted mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden />
            The cost of inaction
          </p>

          <p className="text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.35] tracking-[-0.02em] max-w-4xl mb-6">
            <span className="font-semibold text-[#1a1a1a]">
              $6 billion lost every year. 150 million farmers at risk.
            </span>{" "}
            <span className="text-[#1a1a1a]/40">
              Agriculture uses 70% of India&apos;s freshwater. Up to 60% is wasted every season.
            </span>
          </p>

          <Button
            variant="primary"
            showArrow={false}
            onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
          >
            See The Solution
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
