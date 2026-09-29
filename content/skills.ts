import {
  Braces,
  Database,
  LayoutDashboard,
  Server,
  Wrench,
} from "lucide-react";
import type { SectionCopy, SkillCategory } from "@/types";

/**
 * Public Skills section.
 *
 * SOURCE OF TRUTH: the latest resume's Technical Skills section. Nothing
 * is added because it is "common in a MERN portfolio".
 *
 * Deliberately EXCLUDED until explicitly confirmed:
 *   TypeScript, Postman, VS Code, GitHub, Redux Toolkit, RTK Query.
 *
 * Note: technologies documented elsewhere in the resume - JWT and
 * OTP / Email Verification (Inwizio), REST APIs (Cysco, Krishi Sahayak)
 * and the OpenAI API (Cysco, Smart Assist) - legitimately remain in the
 * Experience and Project content. They are simply not listed as public
 * skill chips here, because the resume's skills section does not list them.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: Braces,
    skills: ["C++", "JavaScript", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: LayoutDashboard,
    skills: ["React.js", "React Native"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB"],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    skills: ["Git", "Swagger", "Bruno", "Confluence", "JIRA", "Cursor"],
  },
];

/** Flat list of every confirmed skill, for chips and SEO. */
export const allSkills: string[] = skillCategories.flatMap(
  (category) => category.skills,
);

/** Section copy. Description omitted - no verified summary line provided. */
export const skillsSection: SectionCopy = {
  eyebrow: "Skills",
  title: "Technologies I work with",
};
