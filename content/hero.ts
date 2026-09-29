import { ArrowRight, Mail } from "lucide-react";
import type { HeroContent, HeroStatus } from "@/types";
import { experiences } from "./experience";
import { site } from "./site";

/**
 * Current role badge, derived from the most recent verified experience
 * entry so the fact lives in exactly one place. Renders only when that
 * entry has all three values.
 */
const currentExperience = experiences[0];
const status: HeroStatus | undefined =
  currentExperience?.role && currentExperience.company && currentExperience.period
    ? {
        role: currentExperience.role,
        company: currentExperience.company,
        period: currentExperience.period,
      }
    : undefined;

/**
 * Hero copy. Headline and subheadline are grounded strictly in the
 * verified resume: mobile + web applications, React Native, React,
 * Node.js, API integration and AI. No metrics or claims beyond that.
 */
export const hero: HeroContent = {
  /** Verified professional positioning. */
  eyebrow: site.positioning,
  headline: site.name,
  headlineAccent: site.role,
  subheadline:
    "I build mobile and web applications with React Native, React and Node.js, working across REST API integration and AI-powered features.",

  /** Confirmed core technologies only. */
  techHighlights: [
    "React Native",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
  ],

  /**
   * Exactly two CTAs.
   *
   * TODO(content): a "Download resume" CTA can be restored once
   * site.resumePath points at a real PDF in /public.
   * No GitHub CTA: the URL has not been verified.
   * No phone CTA: intentionally not a public call to action.
   */
  ctas: [
    {
      label: "View Projects",
      href: "#projects",
      variant: "primary",
      icon: ArrowRight,
    },
    {
      label: "Contact Me",
      href: "#contact",
      variant: "secondary",
      icon: Mail,
    },
  ],

  status,
};
