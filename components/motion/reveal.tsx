import { createElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li" | "article" | "section" | "span" | "p";

interface RevealProps {
  /** Semantic element to render. Defaults to a div. */
  as?: RevealTag;
  /**
   * Kept for API compatibility. "mount" renders without a scroll-linked
   * entrance, which is what above-the-fold content wants.
   */
  trigger?: "view" | "mount";
  /** Extra delay in seconds, for sequencing sibling reveals. */
  delay?: number;
  className?: string;
  children?: ReactNode;
  /** Passed through for aria-labelledby on sectioning elements. */
  "aria-labelledby"?: string;
}

/**
 * Fade + rise as the element scrolls into view.
 *
 * This is a SERVER component backed by a CSS scroll-driven animation, not
 * Framer Motion. Content is visible by default and the animation is pure
 * enhancement, so a reveal can never leave content invisible - the failure
 * mode that JS/IntersectionObserver-gated reveals have. It also ships zero
 * client JavaScript.
 *
 * Reduced motion is handled by the utility's own media query.
 */
export function Reveal({
  as = "div",
  trigger = "view",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  return createElement(
    as,
    {
      ...rest,
      className: cn(trigger === "view" && "reveal-on-scroll", className),
      style,
    },
    children,
  );
}
