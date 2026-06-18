"use client";

import Image from "next/image";
import { images } from "@/lib/images";
import { impactStats, ctas } from "@/lib/content";
import { Navbar } from "./Navbar";
import { Button } from "../ui/Button";
import { SerifEm } from "../ui/Typography";
import { AnimateIn } from "../ui/AnimateIn";
import { ProductHeroPreviewLoader } from "../product/ProductHeroPreviewLoader";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Image src={images.hero} alt="Farmers in a golden wheat field" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70" />
      </div>

      <Navbar />

      <div className="relative flex-1 flex flex-col justify-center px-4 lg:px-10 xl:px-14 pt-28 pb-8">
        <div className="relative w-full max-w-[1320px] mx-auto flex flex-col gap-8 lg:pr-[270px]">
          <div className="text-center lg:text-left space-y-6">
            <AnimateIn>
              <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white max-w-[22ch] mx-auto lg:mx-0 mb-0">
                <span className="block">Precision Agriculture</span>
                <span className="block">
                  For <SerifEm>Every Farmer</SerifEm>
                </span>
              </h1>
            </AnimateIn>

            <AnimateIn delay={0.08}>
              <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                One solar-powered field unit delivers live soil data and AI guidance straight to farmers —
                built for India&apos;s 150 million growers.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn
            delay={0.12}
            className="mx-auto w-full max-w-[250px] lg:absolute lg:right-0 lg:bottom-0 lg:top-0 lg:mx-0"
          >
            <ProductHeroPreviewLoader />
          </AnimateIn>

          <div className="text-center lg:text-left space-y-8">
            <AnimateIn delay={0.16}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Button onClick={() => document.getElementById("impact")?.scrollIntoView({ behavior: "smooth" })}>
                  {ctas.viewImpact.label}
                </Button>
                <Button
                  variant="outline"
                  showArrow={false}
                  onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {ctas.viewSolution.label}
                </Button>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.22}>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 rounded-[var(--radius-card)] border border-white/15 bg-black/30 backdrop-blur-md px-4 py-5 sm:px-8 sm:py-6 max-w-3xl mx-auto lg:mx-0">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="stat-value text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-primary leading-none mb-1.5">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
