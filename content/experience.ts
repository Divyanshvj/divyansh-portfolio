import type { Experience, SectionCopy } from "@/types";

/**
 * Employment history - verified from the latest resume.
 *
 * `location` and `employmentType` are omitted on both roles because
 * neither was provided. Stacks list ONLY the technologies stated for that
 * role. Metrics are reproduced exactly as given and are never strengthened.
 */
export const experiences: Experience[] = [
  {
    id: "cysco-software-developer-i",
    company: "Cysco Pvt. Ltd.",
    role: "Software Developer I",
    period: "July 2025 - Present",
    points: [
      "Integrated 30+ REST API endpoints into a production React Native application, improving frontend-backend communication and data reliability.",
      "Developed a geolocation feature with real-time address fetching and display functionality.",
      "Integrated OpenAI GPT API to develop an AI-based evaluation feature that automatically generated scoring and structured feedback based on user responses and predefined assessment parameters.",
    ],
    stack: ["React Native", "REST APIs", "OpenAI GPT API"],
    // TODO(content): location, employmentType.
  },
  {
    id: "inwizio-full-stack-developer",
    company: "Inwizio Technologies Pvt Ltd",
    role: "Full Stack Developer",
    period: "September 2024 - June 2025",
    points: [
      "Developed and integrated a user registration module with OTP-based email verification using Node.js, Express.js and MongoDB, enabling smoother registration for over 1,000 users.",
      "Implemented JWT-based authentication and access control for 100% of protected routes.",
      "Diagnosed and resolved 2 critical bugs, improving application stability.",
    ],
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "OTP / Email Verification",
    ],
    // TODO(content): location, employmentType.
  },
];

/** Guards the Experience section against rendering an empty timeline. */
export const hasExperience = experiences.length > 0;

/** Section copy. Description omitted - no verified summary line provided. */
export const experienceSection: SectionCopy = {
  eyebrow: "Experience",
  title: "Where I've worked",
};
