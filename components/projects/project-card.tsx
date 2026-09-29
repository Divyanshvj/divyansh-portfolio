import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { hasCaseStudy } from "@/content/projects";
import type { Project } from "@/types";

/** Highlights shown on the card; the rest live on the case-study page. */
const MAX_HIGHLIGHTS = 4;

interface ProjectCardProps {
  project: Project;
  /** Heading level, so the card fits its surrounding outline. */
  headingLevel?: "h3" | "h2";
}

/**
 * Text-first project card. There are no verified screenshots, so instead
 * of a broken-looking image placeholder the card leads with a tinted
 * header band carrying the project icon.
 *
 * Accessibility: exactly ONE link per card. The footer link is stretched
 * over the whole card via `after:absolute after:inset-0`, so the card is
 * fully clickable while remaining a single tab stop with an accessible
 * name that names the project.
 */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const Icon = project.icon;
  const highlights = project.highlights?.slice(0, MAX_HIGHLIGHTS) ?? [];

  return (
    <Card
      variant="surface"
      interactive
      className="group relative flex h-full flex-col overflow-hidden"
    >
      {/* Text-first visual band - not a fake screenshot */}
      <div className="accent-wash relative flex h-24 items-center justify-center border-b border-line bg-elevated/40 md:h-28">
        {Icon && (
          <Icon
            className="size-9 text-accent/80 transition-transform duration-300 group-hover:scale-105 md:size-10"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Heading className="text-lg font-medium text-foreground md:text-xl">
          {project.name}
        </Heading>

        {project.tagline && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
        )}

        {project.stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Chip as="li" key={tech} size="sm" tone="accent">
                {tech}
              </Chip>
            ))}
          </ul>
        )}

        {highlights.length > 0 && (
          <ul className="mt-5 space-y-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Only linked when a real case study exists - never a dead link. */}
        {hasCaseStudy(project) && (
          <p className="mt-6 flex items-center gap-1.5 pt-1 text-sm font-medium text-accent">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              View case study
              <span className="sr-only"> for {project.name}</span>
            </Link>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </p>
        )}
      </div>
    </Card>
  );
}
