import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerTag = "div" | "ul" | "ol" | "section";
type ItemTag = "div" | "li" | "article";

interface StaggerGroupProps {
  as?: ContainerTag;
  trigger?: "view" | "mount";
  className?: string;
  children?: ReactNode;
}

/**
 * Wrapper for a grid or list whose <StaggerItem> children reveal as they
 * scroll into view.
 *
 * Server component. Because each item is driven by its own scroll
 * position, items naturally arrive in sequence without any JS timing.
 */
export function StaggerGroup({
  as = "div",
  className,
  children,
}: StaggerGroupProps) {
  return createElement(as, { className: cn(className) }, children);
}

interface StaggerItemProps {
  as?: ItemTag;
  className?: string;
  children?: ReactNode;
}

/** A single child of StaggerGroup. */
export function StaggerItem({
  as = "div",
  className,
  children,
}: StaggerItemProps) {
  return createElement(
    as,
    { className: cn("reveal-on-scroll", className) },
    children,
  );
}
