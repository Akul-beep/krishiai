"use client";

import { Plant } from "@phosphor-icons/react";

export function SproutIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <Plant className={className} weight="fill" />;
}

export function ArrowNE({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
