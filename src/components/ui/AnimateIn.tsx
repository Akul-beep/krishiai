"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { EASE_OUT } from "@/lib/motion";

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const hidden = reduce
    ? { opacity: 1, y: 0, x: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 24 : 0,
        x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
      };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={
        isInView ? { opacity: 1, y: 0, x: 0 } : hidden
      }
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduce ? 0 : 0.07 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduce
          ? { hidden: {}, visible: {} }
          : {
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE_OUT },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
