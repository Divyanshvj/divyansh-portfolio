import {
  BrainCircuit,
  Database,
  KeyRound,
  Layers,
  PlugZap,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { Capability, SectionCopy } from "@/types";

/**
 * What I build.
 *
 * Each entry is backed by the verified resume: the Cysco and Inwizio
 * roles, and the Smart Assist / Krishi Sahayak projects. Descriptions name
 * technologies and delivered functionality only - no proficiency levels,
 * no outcome claims, no invented statistics.
 *
 * REST APIs, JWT, OTP and the OpenAI API appear here because the resume
 * documents them in the experience/project sections, even though the
 * Technical Skills list does not repeat them.
 *
 * Deliberately NOT claimed anywhere: cloud architecture, DevOps, CI/CD,
 * system design, microservices, Docker/Kubernetes, or any ML expertise
 * level.
 */
export const capabilities: Capability[] = [
  {
    id: "react-native-apps",
    title: "React Native Applications",
    description:
      "Cross-platform mobile applications, including production API integration.",
    icon: Smartphone,
    stack: ["React Native", "JavaScript"],
  },
  {
    id: "full-stack-web",
    title: "Full Stack Web Applications",
    description:
      "Web applications built across React.js on the front end and Node.js with Express.js on the back end.",
    icon: Layers,
    stack: ["React.js", "Node.js", "Express.js"],
  },
  {
    id: "rest-api-integration",
    title: "REST API Integration",
    description:
      "Connecting clients to REST services and wiring up frontend-backend communication.",
    icon: PlugZap,
    stack: ["REST APIs", "Swagger"],
  },
  {
    id: "auth-user-flows",
    title: "Authentication & User Flows",
    description:
      "User registration with OTP-based email verification, plus JWT authentication and access control.",
    icon: KeyRound,
    stack: ["JWT", "OTP / Email Verification"],
  },
  {
    id: "ai-features",
    title: "AI-Powered Features",
    description:
      "Features built on the OpenAI API: AI-based evaluation with structured feedback, and document Q&A.",
    icon: Sparkles,
    stack: ["OpenAI API"],
  },
  {
    id: "data-integration",
    title: "Data & Database Integration",
    description:
      "Application data modelled in MongoDB and MySQL and served through APIs.",
    icon: Database,
    stack: ["MongoDB", "MySQL"],
  },
  {
    id: "ml-applications",
    title: "ML-Backed Applications",
    description:
      "Connecting a web front end to a trained model through a REST API, as in the Krishi Sahayak Portal's image-based crop disease prediction.",
    icon: BrainCircuit,
    stack: ["REST APIs"],
  },
];

/** Section copy. Description omitted - no verified summary line provided. */
export const whatIBuildSection: SectionCopy = {
  eyebrow: "What I build",
  title: "What I can build for a team",
};
