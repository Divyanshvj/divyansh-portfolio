import type { Education } from "@/types";

/**
 * Verified education history.
 *
 * NOT rendered anywhere yet - the architecture has no Education section.
 * Stored here so one can be added later without re-gathering the data.
 */
export const education: Education[] = [
  {
    id: "skit-btech-cse",
    degree: "Bachelor of Technology in Computer Science",
    institution:
      "Swami Keshvanand Institute Of Technology, Management and Gramothan",
    period: "December 2020 - July 2024",
    result: "CGPA: 8.81",
    // TODO(content): location, if you want it displayed.
  },
];
