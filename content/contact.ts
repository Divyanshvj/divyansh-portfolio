import type { ContactContent } from "@/types";

/**
 * Contact section copy.
 *
 * The channels themselves live in `site` (email, socials) and are guarded
 * with `hasValue`, so an unverified channel never renders a dead link.
 *
 * TODO(content): GitHub URL and resume file - both stay hidden until a
 *                real value exists in site.ts. Phone is deliberately never
 *                surfaced as a public CTA.
 */
export const contact: ContactContent = {
  eyebrow: "Contact",
  title: "Get in touch",
  /**
   * An invitation to make contact. Deliberately says nothing about
   * availability or notice period, neither of which is verified.
   */
  description:
    "If you'd like to talk about a role, a project, or anything you've seen here, email or LinkedIn are the best ways to reach me.",
};

