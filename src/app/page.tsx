import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Solution } from "@/components/sections/Solution";
import { EvidenceScroll } from "@/components/sections/EvidenceScroll";
import { FieldTimeline } from "@/components/sections/FieldTimeline";
import { Problem } from "@/components/sections/Problem";
import { SDGs } from "@/components/sections/SDGs";
import { Team } from "@/components/sections/Team";
import { AnnualReport } from "@/components/sections/AnnualReport";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      {/* Outcomes — first screen */}
      <Hero />
      <ImpactStats />
      <TrustBar />
      {/* How + evidence */}
      <Solution />
      <EvidenceScroll />
      <FieldTimeline />
      {/* Background — problem, alignment, team, partnerships */}
      <Problem />
      <SDGs />
      <Team />
      <AnnualReport />
      <Footer />
    </main>
  );
}
