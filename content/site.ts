/**
 * Global site configuration.
 *
 * RULE: only verified, user-supplied facts live in this file.
 * Anything not yet confirmed is an empty string marked TODO(content)
 * and MUST be treated as "missing" by the UI, never rendered as-is.
 */

/**
 * Set NEXT_PUBLIC_SITE_URL in the deployment environment once the domain
 * exists. Falls back to localhost so metadata/OG URLs resolve in dev.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "Divyansh Vijay",
  /** Hero headline, exactly as specified. */
  role: "React Native & MERN Stack Developer",
  /** Professional positioning line from the resume. */
  positioning: "Full Stack & React Native Developer",
  /** The two target roles, exactly as provided. */
  roles: ["React Native Developer", "MERN Stack Developer"] as const,
  /** Professional summary, from the resume. */
  summary:
    "Full Stack & React Native Developer building mobile and web applications using MERN stack and cross-platform technologies. Skilled in API integration, performance optimization, and developing production-ready features for real-world users.",
  /** SEO description. Confirmed technologies only. */
  description:
    "Divyansh Vijay is a Full Stack & React Native Developer building mobile and web applications with React Native, React.js, Node.js, Express.js, MongoDB and MySQL, focused on API integration and production-ready features.",
  locale: "en_US",

  email: "divyanshvijay24@gmail.com",
  /** TODO(content): city / country. */
  location: "",
  /** TODO(content): e.g. "Open to full-time roles". Availability unknown. */
  availability: "",
  /**
   * TODO(content): phone number. Intentionally NOT surfaced as a primary
   * CTA - only add to the UI if explicitly requested.
   */
  phone: "",

  socials: {
    /**
     * TODO(content): paste your GitHub profile URL here, e.g.
     * "https://github.com/your-username". This is the ONLY place it needs
     * to be set - the contact section and footer pick it up automatically
     * and render nothing while it is empty.
     */
    github: "https://github.com/Divyanshvj",
    linkedin: "https://www.linkedin.com/in/divyansh-vijay-1aa58823b/",
  },

  /** Served from public/resume.pdf. Empty would hide every resume link. */
  resumePath: "/resume.pdf",
} as const;

/** True only when a value has been supplied. Guards every optional render. */
export const hasValue = (value?: string): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Verified technologies only - no aspirational keywords. */
export const seoKeywords = [
  "React Native Developer",
  "MERN Stack Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Node.js Developer",
  "Express.js",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "JWT Authentication",
  "OpenAI API",
  "Divyansh Vijay",
];
