import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { skillCategories, skillsSection } from "@/content/skills";

/**
 * Skills, grouped by category.
 *
 * No proficiency levels, progress bars, percentages or star ratings -
 * deliberately. Each category is a card so the list stays scannable
 * instead of becoming a wall of badges.
 */
export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <Reveal>
        <SectionHeading
          id="skills-heading"
          eyebrow={skillsSection.eyebrow}
          title={skillsSection.title}
          description={skillsSection.description}
        />
      </Reveal>

      <StaggerGroup
        as="ul"
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <StaggerItem as="li" key={category.id}>
            <Card
              variant="surface"
              interactive
              className="h-full p-5 md:p-6"
            >
              <div className="flex items-center gap-3">
                <IconBadge icon={category.icon} tone="accent" size="sm" />
                <h3 className="text-base font-medium text-foreground">
                  {category.label}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Chip as="li" key={skill} size="sm">
                    {skill}
                  </Chip>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
