import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { capabilities, whatIBuildSection } from "@/content/whatIBuild";

/**
 * What I build. Capability cards, each backed by verified experience or
 * project work. No statistics, no proficiency claims.
 */
export function WhatIBuild() {
  return (
    <Section id="what-i-build" labelledBy="what-i-build-heading">
      <Reveal>
        <SectionHeading
          id="what-i-build-heading"
          eyebrow={whatIBuildSection.eyebrow}
          title={whatIBuildSection.title}
          description={whatIBuildSection.description}
        />
      </Reveal>

      <StaggerGroup
        as="ul"
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((capability) => (
          <StaggerItem as="li" key={capability.id}>
            <Card variant="surface" interactive className="h-full p-5 md:p-6">
              <IconBadge icon={capability.icon} tone="accent" size="md" />

              <h3 className="mt-4 text-base font-medium text-foreground">
                {capability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {capability.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {capability.stack.map((tech) => (
                  <Chip as="li" key={tech} size="sm">
                    {tech}
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
