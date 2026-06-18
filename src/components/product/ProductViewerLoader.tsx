"use client";

import dynamic from "next/dynamic";

const ProductViewer = dynamic(
  () => import("./ProductViewer").then((mod) => mod.ProductViewer),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-[var(--radius-card)] bg-surface-muted ring-1 ring-black/[0.06]">
        <div className="relative aspect-[4/5] w-full bg-[#161616] sm:aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-primary" />
              <p className="text-sm text-white/50">Loading 3D viewer…</p>
            </div>
          </div>
        </div>
        <div className="h-14 border-t border-outline/40 bg-white" />
      </div>
    ),
  }
);

export function ProductViewerLoader({
  activeId,
  onSelect,
  onPinScreenPosition,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  onPinScreenPosition?: (point: { x: number; y: number } | null) => void;
}) {
  return (
    <ProductViewer
      activeId={activeId}
      onSelect={onSelect}
      onPinScreenPosition={onPinScreenPosition}
    />
  );
}
