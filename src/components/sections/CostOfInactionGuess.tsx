"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

const OPTIONS = [
  { label: "$600 million", value: 0.6 },
  { label: "$1.5 billion", value: 1.5 },
  { label: "$3 billion", value: 3 },
  { label: "$6 billion", value: 6 },
];

const ANSWER = 6;

export function CostOfInactionGuess() {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (value: number) => {
    setPicked(value);
    setRevealed(true);
  };

  const isCorrect = picked === ANSWER;

  return (
    <div className="rounded-[var(--radius-card)] border border-outline bg-white p-6 sm:p-8 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-on-surface-muted mb-3">
        Guess the cost of inaction
      </p>
      <p className="text-lg sm:text-xl font-semibold text-[#1a1a1a] mb-5 leading-snug">
        How much does India lose every year to outdated farming practices?
      </p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {OPTIONS.map((option) => {
          const selected = picked === option.value;
          const showResult = revealed && selected;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => handlePick(option.value)}
              disabled={revealed}
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                showResult
                  ? isCorrect
                    ? "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-red-400 bg-red-50 text-red-900"
                  : revealed
                    ? "border-outline/50 bg-surface-muted text-on-surface-muted"
                    : "border-outline bg-surface-muted hover:border-[#1a1a1a]/20 hover:bg-white text-[#1a1a1a]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="space-y-3">
          <p className={`text-sm font-medium ${isCorrect ? "text-amber-800" : "text-red-800"}`}>
            {isCorrect
              ? "Right — $6 billion is lost every year."
              : `Not quite — the real figure is $6 billion every year.`}
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            150 million farmers are at risk. Agriculture uses 70% of India&apos;s freshwater, and up to 60% is wasted
            every season.
          </p>
        </div>
      )}

      {!revealed && (
        <Button
          variant="primary"
          showArrow={false}
          onClick={() => document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" })}
        >
          See The Solution
        </Button>
      )}
    </div>
  );
}
