"use client";

import { ArrowNE } from "./Icons";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "dark" | "ghost";
  size?: "md" | "sm";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  showArrow = true,
  className = "",
  onClick,
  type = "button",
  href,
}: ButtonProps) {
  const sizes = {
    md: "h-[52px] px-7 text-sm font-medium",
    sm: "h-10 px-5 text-sm font-medium",
  };

  const variants = {
    primary: "bg-primary text-[#1a1a1a] hover:bg-primary-hover btn-press",
    outline:
      "bg-transparent border border-white/50 text-white hover:bg-white/10",
    dark: "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] btn-press",
    ghost: "bg-transparent text-[#1a1a1a] hover:bg-black/5",
  };

  const arrowBg =
    variant === "primary"
      ? "bg-[#1a1a1a]/10"
      : variant === "dark"
        ? "bg-white/15"
        : "bg-primary";

  const cls = `inline-flex items-center gap-3 rounded-full whitespace-nowrap transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className={`flex items-center justify-center w-8 h-8 rounded-full ${arrowBg}`}>
          <ArrowNE />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function ArrowCircle({
  direction = "right",
  variant = "primary",
  onClick,
  className = "",
  label,
}: {
  direction?: "left" | "right";
  variant?: "primary" | "muted";
  onClick?: () => void;
  className?: string;
  label?: string;
}) {
  const bg = variant === "primary" ? "bg-primary" : "bg-surface-subtle";

  return (
    <button
      type="button"
      aria-label={label ?? (direction === "left" ? "Previous" : "Next")}
      onClick={onClick}
      className={`btn-press flex items-center justify-center w-10 h-10 rounded-full ${bg} text-[#1a1a1a] ${className}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden>
        {direction === "left" ? (
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export function LearnMoreLink({ children = "Learn More", href = "#" }: { children?: string; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 text-sm font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity"
    >
      {children}
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary group-hover:bg-primary-hover transition-colors">
        <ArrowNE />
      </span>
    </a>
  );
}
