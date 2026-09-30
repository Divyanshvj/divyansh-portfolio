import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation & layout                                                 */
/* ------------------------------------------------------------------ */

/** A single entry in the primary navigation / scroll-spy. */
export interface NavItem {
  /** Matches the `id` of the section it scrolls to. */
  id: string;
  label: string;
  href: string;
}

/** Eyebrow + heading + optional description copy for a section. */
export interface SectionCopy {
  eyebrow: string;
  title: string;
  /** Optional: omitted until verified copy exists. */
  description?: string;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export interface HeroCta {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  /** True when href is still a TODO and the CTA must not render. */
  pending?: boolean;
  /** Opens in a new tab with the usual security attributes. */
  newTab?: boolean;
}

/** Verified current-role badge shown beside the hero. */
export interface HeroStatus {
  role: string;
  company: string;
  period: string;
}

export interface HeroContent {
  /** Small mono line above the h1. */
  eyebrow: string;
  /** Rendered as the single h1. */
  headline: string;
  /** Accented second line of the h1. */
  headlineAccent: string;
  /**
   * Optional supporting paragraph. Left undefined until verified copy is
   * supplied - the hero renders without it rather than with invented text.
   */
  subheadline?: string;
  /** Technology chips shown under the headline. Confirmed stack only. */
  techHighlights: string[];
  ctas: HeroCta[];
  /**
   * Derived from the most recent verified experience entry. Undefined if
   * that entry is missing any of role/company/period.
   */
  status?: HeroStatus;
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

/** A single key/value row in the "at a glance" panel. */
export interface AboutFact {
  label: string;
  /** Undefined means the value is still pending user input. */
  value?: string;
  icon?: LucideIcon;
}

export interface AboutContent extends SectionCopy {
  /**
   * Narrative paragraphs. Empty until the user supplies real copy; the
   * section renders only the facts panel in the meantime.
   */
  paragraphs: string[];
  facts: AboutFact[];
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/**
 * Grouping from the latest resume's Technical Skills section, which is the
 * authoritative source for the public Skills section.
 */
export type SkillCategoryId =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "tools";

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  icon: LucideIcon;
  /** Confirmed technologies only. */
  skills: string[];
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

/**
 * Every field except `id` is optional: no employment history has been
 * verified yet, and nothing here may be guessed.
 */
export interface Experience {
  id: string;
  company?: string;
  role?: string;
  /** Human-readable range, e.g. "Jan 2024 - Present". Never inferred. */
  period?: string;
  location?: string;
  employmentType?: string;
  /** Responsibilities. Only ever user-supplied. */
  points?: string[];
  stack?: string[];
}

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

/**
 * Not rendered anywhere yet - stored so an Education section can be added
 * later without re-gathering the data.
 */
export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  /** e.g. "CGPA: 8.81". Omitted when not provided. */
  result?: string;
  location?: string;
}

/* ------------------------------------------------------------------ */
/* Projects & case studies                                             */
/* ------------------------------------------------------------------ */

export interface ProjectFeature {
  title: string;
  /** Optional: omitted where no verified detail exists. */
  description?: string;
}

export interface ProjectChallenge {
  challenge: string;
  approach?: string;
}

export interface ProjectLinks {
  /** Real URLs only. Undefined until provided. */
  live?: string;
  github?: string;
}

export interface ProjectCaseStudy {
  overview?: string;
  problem?: string;
  solution?: string;
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
}

export interface Project {
  /** Route segment for /projects/[slug]. */
  slug: string;
  name: string;
  /** One-line description. Undefined until verified. */
  tagline?: string;
  /** The user's role on the project. Never inferred. */
  role?: string;
  featured: boolean;
  /** Confirmed technologies only. */
  stack: string[];
  /** Card bullets. Only verified functionality. */
  highlights?: string[];
  caseStudy?: ProjectCaseStudy;
  links?: ProjectLinks;
  /** Path under /public. Undefined until a real screenshot exists. */
  image?: string;
  /** Optional icon used as a placeholder while no screenshot exists. */
  icon?: LucideIcon;
}

/* ------------------------------------------------------------------ */
/* What I build                                                        */
/* ------------------------------------------------------------------ */

export interface Capability {
  id: string;
  title: string;
  /** Strictly describes confirmed technologies - no outcome claims. */
  description: string;
  icon: LucideIcon;
  /** Technologies backing this capability. Confirmed stack only. */
  stack: string[];
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

/**
 * Contact section copy. The channels themselves are read straight from
 * `site` (email, socials) and guarded with `hasValue`, so an unverified
 * channel simply never renders.
 */
export type ContactContent = SectionCopy;

export type { LucideIcon };
