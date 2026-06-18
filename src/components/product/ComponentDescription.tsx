"use client";

import { forwardRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getHotspotById } from "@/lib/product-hotspots";

export const ComponentDescription = forwardRef<HTMLDivElement, { activeId: string | null }>(
  function ComponentDescription({ activeId }, ref) {
    const active = activeId ? getHotspotById(activeId) : null;

    return (
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            ref={ref}
            key={activeId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden rounded-[var(--radius-card)] border border-outline/40 bg-white px-5 py-4 shadow-[var(--shadow-soft)]"
          >
            <span className="absolute left-0 top-0 h-full w-1 bg-primary" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-on-surface-muted mb-1 pl-1">
              Component
            </p>
            <h3 className="text-base font-semibold text-[#1a1a1a] pl-1">{active.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant pl-1">{active.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
