import type { NavItem } from "@/types";

/**
 * Drives the navbar, the mobile menu and scroll-spy.
 * `id` must match the `id` rendered by the corresponding section.
 *
 * Deliberately limited to five destinations. "Case Studies" and
 * "What I Build" still exist as page sections but are kept out of the nav
 * to avoid crowding it; they can be added back on request.
 */
export const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];
