import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconBadgeTone = "neutral" | "accent" | "support";
export type IconBadgeSize = "sm" | "md" | "lg";

interface IconBadgeProps {
  /** Lucide icon component - callers never pass raw SVG markup. */
  icon: LucideIcon;
  tone?: IconBadgeTone;
  size?: IconBadgeSize;
  /**
   * Accessible name. Omit when the badge is decorative next to a visible
   * label, which is the common case.
   */
  label?: string;
  className?: string;
}

const toneStyles: Record<IconBadgeTone, string> = {
  neutral: "border-line bg-elevated text-muted",
  accent: "border-accent/20 bg-accent/10 text-accent",
  support: "border-support/20 bg-support/10 text-support",
};

const sizeStyles: Record<IconBadgeSize, string> = {
  sm: "size-8 rounded-lg",
  md: "size-10 rounded-xl",
  lg: "size-12 rounded-xl",
};

const iconSizeStyles: Record<IconBadgeSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

/** Reusable square container for a Lucide icon. */
export function IconBadge({
  icon: Icon,
  tone = "accent",
  size = "md",
  label,
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      <Icon className={iconSizeStyles[size]} strokeWidth={1.75} />
    </span>
  );
}
