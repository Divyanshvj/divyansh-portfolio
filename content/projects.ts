import { Smartphone, Sprout } from "lucide-react";
import type { Project, SectionCopy } from "@/types";

/**
 * Projects.
 *
 * SOURCE OF TRUTH: the latest resume. Only the two projects it lists
 * appear here.
 *   - Prescripto was removed on 2026-09-28 (not on the latest resume).
 *   - Tiffin Management was removed on 2026-09-28 (not on the latest
 *     resume). No taglines, stacks, highlights, roles or case-study data
 *     were carried over from either.
 *
 * Every tagline, stack entry, highlight and case-study feature below comes
 * directly from verified resume information. Unverified fields are OMITTED
 * rather than filled with placeholder prose:
 *   - no `role` on either project (not provided)
 *   - no `links.live` / `links.github` (no URLs provided)
 *   - no `image` (no screenshots provided)
 *   - no `problem` / `solution` / `challenges` narrative (not provided)
 *
 * `icon` is a visual placeholder only and carries no factual claim.
 */
export const projects: Project[] = [
  {
    slug: "smart-assist",
    name: "Smart Assist",
    /** Provided verbatim. */
    tagline: "AI Assistant with Document Intelligence (RAG)",
    featured: true,
    icon: Smartphone,
    // TODO(content): your role on this project.
    /** Only the technologies verified for this project. */
    stack: ["React Native", "OpenAI API"],
    /** Verified functionality, as provided. */
    highlights: [
      "AI chat application",
      "Real-time streaming LLM responses",
      "Persistent conversation history",
      "Document upload and document Q&A",
      "Structured prompt design and response handling",
      "Loading, error and retry states",
    ],
    caseStudy: {
      /**
       * Verified description. States only facts that also appear in the
       * verified functionality list above.
       */
      overview:
        "Built an AI chat application with real-time streaming LLM responses and persistent conversation history, allowing users to revisit and continue previous conversations. Also built a document Q&A feature where users can upload files and chat with their content.",
      // TODO(content): problem and solution narrative.
      // TODO(content): challenges you ran into and how you solved them.
      /** Titles only - no descriptions, because none were provided. */
      features: [
        { title: "AI chat application" },
        { title: "Real-time streaming LLM responses" },
        { title: "Persistent conversation history" },
        { title: "Structured prompt design and response handling" },
        { title: "Loading, error and retry states" },
        { title: "Document upload" },
        { title: "Document Q&A" },
      ],
    },
    // TODO(content): links.live / links.github, image.
  },
  {
    slug: "krishi-sahayak-portal",
    name: "Krishi Sahayak Portal",
    /** Provided verbatim. */
    tagline: "Deep Learning Model",
    featured: true,
    icon: Sprout,
    // TODO(content): your role on this project.
    /**
     * REST APIs is the only technology explicitly documented for this
     * project ("frontend connected to trained model through REST API").
     *
     * TODO(content): the deep-learning framework, language and web stack
     * are NOT verified and are deliberately absent - not guessed.
     */
    stack: ["REST APIs"],
    /** Verified functionality, as provided. */
    highlights: [
      "Crop disease identification",
      "Web portal with image upload",
      "Prediction display",
      "Frontend connected to a trained model through REST API",
      "Real-time diagnosis",
    ],
    caseStudy: {
      /**
       * Assembled strictly from the verified functionality list below -
       * the same facts in sentence form. No framework, language, model
       * architecture, accuracy figure or dataset detail is stated,
       * because none has been verified.
       */
      overview:
        "A web portal that identifies crop diseases from uploaded images. The front end connects to a trained deep learning model through a REST API and displays the resulting prediction, giving a real-time diagnosis.",
      // TODO(content): problem and solution narrative.
      // TODO(content): challenges you ran into and how you solved them.
      /** Titles only - no descriptions, because none were provided. */
      features: [
        { title: "Deep learning model" },
        { title: "Crop disease identification" },
        { title: "Web portal" },
        { title: "Image upload" },
        { title: "Prediction display" },
        { title: "Frontend connected to trained model through REST API" },
        { title: "Real-time diagnosis" },
      ],
    },
    // TODO(content): links.live / links.github, image.
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

/** Used by generateStaticParams and the case-study route. */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const projectSlugs = projects.map((project) => project.slug);

/**
 * A project only earns a /projects/[slug] page once it has real case-study
 * substance. Prevents shipping near-empty detail pages.
 */
export const hasCaseStudy = (project: Project): boolean => {
  const study = project.caseStudy;
  if (!study) return false;
  return Boolean(
    study.overview ||
      study.problem ||
      study.solution ||
      study.features?.length ||
      study.challenges?.length,
  );
};

/** Section copy for the projects grid. */
export const projectsSection: SectionCopy = {
  eyebrow: "Selected work",
  title: "Projects",
  description:
    "Two personal projects, each with a dedicated case study.",
};
