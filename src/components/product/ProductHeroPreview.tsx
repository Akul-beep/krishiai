import Image from "next/image";
import { images } from "@/lib/images";
import { ctas } from "@/lib/content";

const HERO_PRODUCT_BG = "#1a2218";

/** Horizontal position of the unit inside the card. Higher % = further right (e.g. 50% center, 75% right). */
const HERO_IMAGE_OBJECT_POSITION = "center center";

/** Inner spacing around the image: top | right | bottom | left */
const HERO_IMAGE_PADDING = "3.5rem 1.25rem 1rem 1.25rem";

export function ProductHeroPreview() {
  return (
    <div className="flex h-full w-full max-w-[250px] flex-col lg:ml-auto">
      <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-[var(--radius-card)] ring-1 ring-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.28)] bg-[#1a2218]/75 backdrop-blur-xl">
        <div
          className="relative min-h-[240px] flex-1 w-full"
          style={{ backgroundColor: HERO_PRODUCT_BG }}
        >
          <p className="absolute left-4 top-4 z-10 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white/75 backdrop-blur-sm pointer-events-none lg:left-5 lg:top-5 lg:px-3.5 lg:py-2 lg:text-xs">
            KrishiAI Unit
          </p>
          <Image
            src={images.heroProduct}
            alt="KrishiAI solar-powered field unit"
            fill
            priority
            className="object-contain lg:pt-16 lg:pb-4"
            style={{
              objectPosition: HERO_IMAGE_OBJECT_POSITION,
              padding: HERO_IMAGE_PADDING,
            }}
            sizes="250px"
          />
        </div>
        <div className="shrink-0 border-t border-white/12 bg-black/30 px-5 py-3.5 text-center backdrop-blur-sm lg:px-6 lg:py-5">
          <a
            href={ctas.viewSolution.href}
            className="text-sm font-medium text-white/90 hover:text-primary transition-colors lg:text-base"
          >
            {ctas.viewSolution.label} →
          </a>
        </div>
      </div>
    </div>
  );
}
