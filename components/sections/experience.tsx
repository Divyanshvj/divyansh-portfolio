import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import {
  experienceSection,
  experiences,
  hasExperience,
} from "@/content/experience";

/**
 * Experience timeline.
 *
 * The rail and markers are decorative and appear from `md` up; on mobile
 * the entries stack as plain cards so nothing is cramped. Only verified
 * fields render - location and employment type are absent by design.
 */
export function Experience() {
  if (!hasExperience) return null;

  return (
    <Section id="experience" labelledBy="experience-heading">
      <Reveal>
        <SectionHeading
          id="experience-heading"
          eyebrow={experienceSection.eyebrow}
          title={experienceSection.title}
          description={experienceSection.description}
        />
      </Reveal>

      <StaggerGroup as="ol" className="mt-12 space-y-5 md:space-y-6">
        {experiences.map((entry) => (
          <StaggerItem as="li" key={entry.id} className="relative md:pl-12">
            {/* Decorative timeline rail + marker */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-3 hidden h-full w-px bg-line md:block"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-2.5 hidden size-3.5 rounded-full border-2 border-accent bg-background md:block"
            />

            <Card variant="surface" className="p-5 md:p-7">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground md:text-xl">
                    {entry.role}
                  </h3>
                  {entry.company && (
                    <p className="mt-1 text-sm text-accent">{entry.company}</p>
                  )}
                </div>

                {entry.period && (
                  <p className="shrink-0 font-mono text-xs text-subtle sm:text-right">
                    {entry.period}
                  </p>
                )}
              </div>

              {entry.points && entry.points.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {entry.points.map((point, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.stack && entry.stack.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <Chip as="li" key={tech} size="sm">
                      {tech}
                    </Chip>
                  ))}
                </ul>
              )}
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
