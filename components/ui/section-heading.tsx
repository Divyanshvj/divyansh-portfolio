import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  /** Must match the `labelledBy` passed to the parent Section. */
  id?: string;
  description?: ReactNode;
  /** Heading level. Sections use h2; nested blocks can drop to h3. */
  as?: "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow + heading + optional description, with consistent spacing. */
export function SectionHeading({
  eyebrow,
  title,
  id,
  description,
  as: Heading = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={cn(
          "font-semibold text-foreground",
          Heading === "h2"
            ? "text-3xl leading-tight md:text-4xl lg:text-[2.75rem]"
            : "text-2xl leading-tight md:text-3xl",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
