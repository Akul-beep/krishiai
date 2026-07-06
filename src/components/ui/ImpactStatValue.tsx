"use client";

import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

type ImpactStat = {
  value: string;
  direction: "up" | "down";
};

export function ImpactStatValue({
  stat,
  className = "",
  iconClassName = "w-5 h-5 sm:w-6 sm:h-6",
}: {
  stat: ImpactStat;
  className?: string;
  iconClassName?: string;
}) {
  const Arrow = stat.direction === "up" ? ArrowUp : ArrowDown;

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Arrow className={iconClassName} weight="bold" aria-hidden />
      <span>{stat.value}</span>
    </span>
  );
}
