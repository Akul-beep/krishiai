"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export function SectionTag({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={reduce ? false : { opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="section-tag mb-5"
    >
      <span className="section-tag-dot" aria-hidden />
      <span className="section-tag-text">{children}</span>
    </motion.span>
  );
}

export function SerifEm({ children }: { children: React.ReactNode }) {
  return <em className="font-serif italic font-normal">{children}</em>;
}
