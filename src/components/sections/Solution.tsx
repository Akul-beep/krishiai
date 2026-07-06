"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { images } from "@/lib/images";
import { sensors, aiRecommendations } from "@/lib/content";
import { solutionPillars } from "@/lib/content-extra";
import { SectionTag, SerifEm } from "../ui/Typography";
import { AnimateIn } from "../ui/AnimateIn";
import { ProductViewerLoader } from "../product/ProductViewerLoader";
import { ComponentDescription } from "../product/ComponentDescription";
import { ComponentPinConnector } from "../product/ComponentPinConnector";
import { CloudSun, Leaf, Sun, Cpu } from "@phosphor-icons/react";

const pillarImages = {
  sensor: images.solutionNpk,
  irrigation: images.solutionIrrigation,
  drone: images.solutionPestAi,
};

const accordionItems = [
  {
    title: "Real-Time Soil Intelligence",
    body: "Six sensors track NPK, moisture, soil temperature, and humidity. Live data from the field, 24 hours a day.",
    icon: Leaf,
  },
  {
    title: "Weather & Climate Sync",
    body: "On-ground readings merge with live weather APIs. Every alert accounts for what is happening now and what comes next.",
    icon: CloudSun,
  },
  {
    title: "AI Recommendations",
    body: "Irrigation, fertilizer, pest, and disease guidance sent straight to farmers on WhatsApp. No app. No training required.",
    icon: Cpu,
  },
  {
    title: "Solar-Powered & Off-Grid",
    body: "Runs entirely on solar. Built for remote farms with no electricity, no broadband, and no specialist on site.",
    icon: Sun,
  },
];

const sensorChips = sensors.map((s) => s.label);
const aiChips = aiRecommendations;
const AUTOPLAY_MS = 5000;
const RESUME_AFTER_MS = 14000;

export function Solution() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [componentId, setComponentId] = useState<string | null>("npk");
  const pinPointRef = useRef<{ x: number; y: number } | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handlePinScreenPosition = useCallback((point: { x: number; y: number } | null) => {
    pinPointRef.current = point;
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveAccordion((i) => (i + 1) % accordionItems.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) return;
    const resume = setTimeout(() => setIsPaused(false), RESUME_AFTER_MS);
    return () => clearTimeout(resume);
  }, [isPaused, activeAccordion]);

  const handleAccordionClick = useCallback((index: number) => {
    setActiveAccordion(index);
    setIsPaused(true);
  }, []);

  return (
    <section id="solution" className="scroll-mt-0 pt-[var(--nav-offset)] pb-[var(--section-y)] bg-white">
      <div className="container-page">
        <AnimateIn className="text-center max-w-2xl mx-auto mb-14">
          <SectionTag>The Solution</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a] mb-4">
            One Unit. <SerifEm>Every Answer.</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The full precision agriculture stack in a single solar-powered device. Soil sensors, weather data, and AI
            that turns raw readings into{" "}
            <strong className="text-[#1a1a1a] font-semibold">clear action for farmers</strong>.
          </p>
        </AnimateIn>

        <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          <ComponentPinConnector
            pinPointRef={pinPointRef}
            cardRef={descriptionRef}
            active={componentId !== null}
          />
          <div className="space-y-4" aria-live="polite">
            {accordionItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeAccordion === i;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleAccordionClick(i)}
                  className={`w-full text-left rounded-[var(--radius-card)] p-7 sm:p-8 transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-primary text-[#1a1a1a] scale-[1.02] shadow-[var(--shadow-float)]"
                      : "bg-surface-muted text-[#1a1a1a]/60 hover:bg-surface-subtle"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`w-6 h-6 shrink-0 mt-1 ${isActive ? "" : "opacity-40"}`} weight="fill" />
                    <div>
                      <h3 className={`text-lg sm:text-xl font-semibold mb-1 ${isActive ? "" : "text-[#1a1a1a]/70"}`}>
                        {item.title}
                      </h3>
                      {isActive && (
                        <p className="text-sm sm:text-base opacity-90 leading-relaxed mt-2">{item.body}</p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            <ComponentDescription ref={descriptionRef} activeId={componentId} />
          </div>

          <AnimateIn delay={0.1}>
            <ProductViewerLoader
              activeId={componentId}
              onSelect={setComponentId}
              onPinScreenPosition={handlePinScreenPosition}
            />
          </AnimateIn>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {solutionPillars.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.08}>
              <article className="group">
                <div className="relative rounded-[var(--radius-card)] overflow-hidden aspect-[16/10] mb-4">
                  <Image
                    src={pillarImages[item.image]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="33vw"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </article>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="flex flex-wrap gap-2 justify-center">
            {[...sensorChips, ...aiChips].map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-full bg-surface-muted text-xs text-on-surface-variant border border-outline/60"
              >
                {chip}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
