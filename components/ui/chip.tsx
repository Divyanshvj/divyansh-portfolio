import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChipTone = "neutral" | "accent" | "support";
export type ChipSize = "sm" | "md";

interface ChipProps {
  /** Renders as <li> inside a list, <span> otherwise. */
  as?: "span" | "li";
  tone?: ChipTone;
  size?: ChipSize;
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}

const toneStyles: Record<ChipTone, string> = {
  neutral: "border-line bg-elevated text-muted",
  accent: "border-accent/25 bg-accent/10 text-accent",
  support: "border-support/25 bg-support/10 text-support",
};

const sizeStyles: Record<ChipSize, string> = {
  sm: "h-6 gap-1.5 px-2.5 text-[11px]",
  md: "h-7 gap-1.5 px-3 text-xs",
};

/** Compact pill for technologies, skills and metadata tags. */
export function Chip({
  as: Tag = "span",
  tone = "neutral",
  size = "md",
  icon: Icon,
  className,
  children,
}: ChipProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center rounded-full border font-mono tracking-tight",
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
    >
      {Icon && <Icon className="size-3" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
