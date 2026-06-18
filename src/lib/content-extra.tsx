import type { ReactNode } from "react";

export const impactStories: {
  image: "irrigation" | "harvest" | "field";
  title: string;
  lines: ReactNode;
}[] = [
  {
    image: "irrigation",
    title: "Precision Irrigation",
    lines: (
      <>
        Track <strong className="text-[#1a1a1a] font-semibold">soil moisture</strong> and{" "}
        <strong className="text-[#1a1a1a] font-semibold">soil temperature</strong> live. Water only when crops{" "}
        <strong className="text-[#1a1a1a] font-semibold">actually need it</strong>.
      </>
    ),
  },
  {
    image: "harvest",
    title: "Stronger Harvests",
    lines: (
      <>
        AI tells farmers <strong className="text-[#1a1a1a] font-semibold">when to irrigate</strong>, what{" "}
        <strong className="text-[#1a1a1a] font-semibold">fertilizer to use</strong>, and when{" "}
        <strong className="text-[#1a1a1a] font-semibold">disease risk is rising</strong> before crops fail.
      </>
    ),
  },
  {
    image: "field",
    title: "Healthier Soil",
    lines: (
      <>
        <strong className="text-[#1a1a1a] font-semibold">NPK sensors</strong> show exactly what the soil needs. Right nutrients. Right time.{" "}
        <strong className="text-[#1a1a1a] font-semibold">Less waste</strong>. Stronger land year after year.
      </>
    ),
  },
];

export const trustPhrases = [
  "farmers across Punjab",
  "150 million growers in India",
  "agricultural partners worldwide",
  "rural communities at scale",
];

export const marqueeItems = [
  "Fazilka Pilot",
  "Punjab Field Program",
  "UN SDG 2",
  "UN SDG 6",
  "UN SDG 13",
  "Live NPK Data",
  "Solar Field Units",
  "WhatsApp Alerts",
];

export const solutionPillars = [
  {
    image: "sensor" as const,
    title: "NPK & Soil Monitoring",
    desc: (
      <>
        Live <strong className="text-[#1a1a1a] font-semibold">nitrogen, phosphorus, and potassium</strong> readings. Know your soil before you plant.
      </>
    ),
  },
  {
    image: "irrigation" as const,
    title: "Smart Irrigation",
    desc: (
      <>
        Water when <strong className="text-[#1a1a1a] font-semibold">moisture hits the threshold</strong>. Stop flooding fields. Start saving water.
      </>
    ),
  },
  {
    image: "drone" as const,
    title: "Pest & Disease AI",
    desc: (
      <>
        Spots <strong className="text-[#1a1a1a] font-semibold">pest and disease risk</strong> early using temperature, humidity, and weather data.
      </>
    ),
  },
];

export const fieldTimeline = [
  { step: "01", label: "Research", detail: "Mapped irrigation and soil pain points with Punjab farmers." },
  { step: "02", label: "Validation", detail: "Tested sensor placement and AI alerts with real field teams." },
  { step: "03", label: "Fazilka Pilot", detail: "Deployed units across pilot farms. Collecting live yield and water data." },
  { step: "04", label: "Scale", detail: "Expanding partnerships and reporting outcomes against UN SDGs 2, 6, and 13." },
];

export const evidenceCopy = [
  "Farmers tested our sensors in the field and shaped how the product works.",
  "We recorded how real decisions on water, fertilizer, and pests get made on the ground.",
  "Pilot farms in Fazilka now stream live NPK and moisture data every day.",
  "Working with cooperatives and NGOs to expand beyond the Fazilka pilot.",
];
