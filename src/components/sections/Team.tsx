import Image from "next/image";
import { images } from "@/lib/images";
import { team } from "@/lib/content";
import { SectionTag, SerifEm } from "../ui/Typography";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

const teamImages: Record<string, string> = {
  akul: images.akul,
  karambir: images.karambir,
};

export function Team() {
  return (
    <section id="team" className="py-[var(--section-y)] bg-[#f9f9f9]">
      <div className="container-page">
        <AnimateIn className="mb-14">
          <SectionTag>Our Team</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a] max-w-lg">
            The People Behind <SerifEm>KrishiAI</SerifEm>
          </h2>
        </AnimateIn>

        <Stagger className="space-y-5 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <StaggerItem key={member.name}>
              <article className="card-soft overflow-hidden flex flex-col sm:flex-row">
                <div className={`relative w-full sm:w-[220px] shrink-0 ${i % 2 === 1 ? "sm:order-2" : ""}`}>
                  <div className="relative aspect-square sm:aspect-auto sm:h-full min-h-[220px]">
                    <Image
                      src={teamImages[member.image]}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                </div>
                <div className={`p-8 sm:p-10 flex flex-col justify-center ${i % 2 === 1 ? "sm:order-1" : ""}`}>
                  <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-4">{member.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{member.bio}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
