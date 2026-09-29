import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { ProjectCard } from "@/components/projects/project-card";
import { featuredProjects, projectsSection } from "@/content/projects";

/**
 * Projects grid. Each card links to its own case-study route; there is no
 * separate homepage case-studies block, which with two projects would only
 * repeat the same entries.
 */
export function Projects() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section id="projects" labelledBy="projects-heading">
      <Reveal>
        <SectionHeading
          id="projects-heading"
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.title}
          description={projectsSection.description}
        />
      </Reveal>

      <StaggerGroup
        as="ul"
        className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6"
      >
        {featuredProjects.map((project) => (
          <StaggerItem as="li" key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
