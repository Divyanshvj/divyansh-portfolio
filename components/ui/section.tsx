import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  /** Anchor target; must match the matching entry in `navItems`. */
  id: string;
  /** id of the heading element that labels this section. */
  labelledBy?: string;
  className?: string;
  /** Set false to lay out a full-bleed section and handle width internally. */
  contained?: boolean;
  children: ReactNode;
}

/**
 * Semantic section wrapper: landmark + anchor + consistent vertical rhythm.
 */
export function Section({
  id,
  labelledBy,
  className,
  contained = true,
  children,
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 md:py-28 lg:py-32", className)}
    >
      {content}
    </section>
  );
}
