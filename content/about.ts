import { Briefcase, Code, MapPin, Smartphone } from "lucide-react";
import type { AboutContent } from "@/types";
import { experiences } from "./experience";
import { site } from "./site";

/**
 * Current role, derived from the most recent verified experience entry so
 * the fact lives in exactly one place. Undefined if that entry is missing
 * either value, in which case the fact is filtered out of the panel.
 */
const currentExperience = experiences[0];
const currentRole =
  currentExperience?.role && currentExperience.company
    ? `${currentExperience.role}, ${currentExperience.company}`
    : undefined;

/**
 * About section.
 *
 * Both paragraphs are built strictly from the verified profile summary
 * and the two verified roles. No years-of-experience totals, no metrics
 * beyond those stated on the resume, no superlatives.
 *
 * NOTE: the second paragraph restates the employment history in prose.
 * That is an editorial choice rather than generated text, so when
 * content/experience.ts changes, this paragraph must be updated by hand
 * in the same commit. The `Currently` fact below updates itself.
 */
export const about: AboutContent = {
  eyebrow: "About",
  title: "About me",

  paragraphs: [
    "I'm a Full Stack & React Native Developer building mobile and web applications with the MERN stack and cross-platform technologies. My work centres on API integration, performance optimization, and shipping production-ready features for real-world users.",
    "At Cysco Pvt. Ltd. I work as a Software Developer I on a production React Native application, where I've integrated 30+ REST API endpoints, built a geolocation feature with real-time address fetching, and integrated the OpenAI GPT API to power an AI-based evaluation feature. Previously, as a Full Stack Developer at Inwizio Technologies Pvt Ltd, I built a user registration module with OTP-based email verification and implemented JWT authentication and access control using Node.js, Express.js and MongoDB.",
  ],

  facts: [
    {
      label: "Currently",
      /** Derived - never hardcode the employer here. */
      value: currentRole,
      icon: Briefcase,
    },
    {
      label: "Target roles",
      value: site.roles.join(", "),
      icon: Smartphone,
    },
    {
      label: "Core stack",
      value: "React Native, React.js, Node.js, Express.js, MongoDB, MySQL",
      icon: Code,
    },
    {
      label: "Location",
      // TODO(content): city / country. Undefined until provided.
      value: site.location || undefined,
      icon: MapPin,
    },
  ],
};
