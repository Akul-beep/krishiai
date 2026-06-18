"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";

type Point = { x: number; y: number };

function buildConnectorPath(pin: Point, cardRect: DOMRect): string {
  const x1 = pin.x;
  const y1 = pin.y;
  const x2 = cardRect.right;
  const y2 = cardRect.top + cardRect.height * 0.38;
  const bend = Math.max(48, (x1 - x2) * 0.35);
  return `M ${x1} ${y1} C ${x1 - bend} ${y1}, ${x2 + bend} ${y2}, ${x2} ${y2}`;
}

export function ComponentPinConnector({
  pinPointRef,
  cardRef,
  active,
}: {
  pinPointRef: RefObject<Point | null>;
  cardRef: RefObject<HTMLElement | null>;
  active: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const tick = () => {
      const pin = pinPointRef.current;
      const card = cardRef.current;

      if (pin && card && pathRef.current && dotRef.current && ringRef.current) {
        const d = buildConnectorPath(pin, card.getBoundingClientRect());
        pathRef.current.setAttribute("d", d);
        dotRef.current.setAttribute("cx", String(pin.x));
        dotRef.current.setAttribute("cy", String(pin.y));
        ringRef.current.setAttribute("cx", String(pin.x));
        ringRef.current.setAttribute("cy", String(pin.y));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, pinPointRef, cardRef]);

  return (
    <AnimatePresence>
      {active && (
        <motion.svg
          key="connector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 w-full h-full pointer-events-none z-30 hidden lg:block"
          aria-hidden
        >
          <defs>
            <marker
              id="component-pin-arrow"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#4dabf7" />
            </marker>
          </defs>
          <path
            ref={pathRef}
            fill="none"
            stroke="#4dabf7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 5"
            markerEnd="url(#component-pin-arrow)"
            opacity="0.9"
          />
          <circle ref={dotRef} r="5" fill="#4dabf7" opacity="0.95" />
          <circle ref={ringRef} r="9" fill="none" stroke="#4dabf7" strokeWidth="1.5" opacity="0.45" />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
