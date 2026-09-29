import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "surface" | "glass";

interface CardProps {
  as?: ElementType;
  /**
   * "surface" (default) is an opaque panel with no blur - correct for the
   * many cards in skill/project grids. "glass" applies the shared glass
   * utility and is reserved for a few featured panels, so blur stays cheap.
   */
  variant?: CardVariant;
  /** Adds the hover lift. Use for cards that link somewhere. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  surface: "border border-line bg-surface",
  glass: "glass",
};

export function Card({
  as: Tag = "div",
  variant = "surface",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card",
        variantStyles[variant],
        "transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out",
        interactive &&
          cn(
            "hover:-translate-y-1 hover:border-line-strong hover:bg-elevated",
            "hover:shadow-[0_16px_40px_-24px_rgb(0_0_0_/_0.9)]",
            "focus-within:-translate-y-1 focus-within:border-line-strong",
          ),
        className,
      )}
    >
      {children}
    </Tag>
  );
}
