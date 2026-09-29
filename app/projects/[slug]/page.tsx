import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { getProjectBySlug, projects, projectSlugs } from "@/content/projects";
import { site } from "@/content/site";

/** Only the two verified projects get a page; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  /*
   * Description is derived only from verified project content - the case
   * study overview, else the tagline. No invented keywords.
   */
  const description =
    project.caseStudy?.overview ??
    (project.tagline
      ? `${project.name} - ${project.tagline}`
      : `${project.name}, a project by ${site.name}.`);

  const canonical = `/projects/${project.slug}`;

  return {
    title: project.name,
    description,
    /*
     * Override the site-wide keywords so a project page never implies it
     * used technologies that belong to other work.
     */
    keywords: [project.name, ...project.stack],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${project.name} - ${site.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - ${site.name}`,
      description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const Icon = project.icon;
  const study = project.caseStudy;
  const features = study?.features ?? [];
  const challenges = study?.challenges ?? [];

  /* With two projects this is simply the other one. */
  const nextProject =
    projects.find((candidate) => candidate.slug !== project.slug) ?? null;

  return (
    <article className="pb-20 md:pb-28">
      {/* Header */}
      <header className="accent-wash border-b border-line pt-10 pb-12 md:pt-14 md:pb-16">
        <Container>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to projects
          </Link>

          <div className="mt-8 flex items-start gap-4 md:gap-5">
            {Icon && <IconBadge icon={Icon} tone="accent" size="lg" />}
            <div className="min-w-0">
              <h1 className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                {project.name}
              </h1>
              {project.tagline && (
                <p className="mt-2 text-base text-muted md:text-lg">
                  {project.tagline}
                </p>
              )}
            </div>
          </div>

          {project.stack.length > 0 && (
            <ul
              aria-label="Technologies used"
              className="mt-7 flex flex-wrap gap-2"
            >
              {project.stack.map((tech) => (
                <Chip as="li" key={tech} size="md" tone="accent">
                  {tech}
                </Chip>
              ))}
            </ul>
          )}
        </Container>
      </header>

      <Container className="mt-12 md:mt-16">
        <div className="max-w-3xl space-y-12 md:space-y-16">
          {/* Overview - rendered only when verified copy exists */}
          {study?.overview && (
            <Reveal as="section" aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                Overview
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {study.overview}
              </p>
            </Reveal>
          )}

          {/*
            Problem / Solution / Challenges are intentionally absent for
            both projects: no verified content exists for them, so they are
            hidden rather than filled with invented prose.
          */}
          {study?.problem && (
            <Reveal as="section" aria-labelledby="problem-heading">
              <h2
                id="problem-heading"
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                Problem
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {study.problem}
              </p>
            </Reveal>
          )}

          {study?.solution && (
            <Reveal as="section" aria-labelledby="solution-heading">
              <h2
                id="solution-heading"
                className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
              >
                Solution
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {study.solution}
              </p>
            </Reveal>
          )}

          {features.length > 0 && (
            <section aria-labelledby="features-heading">
              <Reveal>
                <h2
                  id="features-heading"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
                >
                  Key features
                </h2>
              </Reveal>

              <StaggerGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <StaggerItem as="li" key={feature.title}>
                    <Card variant="surface" className="h-full p-4 md:p-5">
                      <p className="text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      {feature.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {feature.description}
                        </p>
                      )}
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </section>
          )}

          {challenges.length > 0 && (
            <section aria-labelledby="challenges-heading">
              <Reveal>
                <h2
                  id="challenges-heading"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
                >
                  Challenges
                </h2>
              </Reveal>
              <ul className="mt-6 space-y-4">
                {challenges.map((item) => (
                  <li key={item.challenge}>
                    <p className="text-sm font-medium text-foreground">
                      {item.challenge}
                    </p>
                    {item.approach && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {item.approach}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Footer navigation */}
          <nav
            aria-label="Project navigation"
            className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to projects
            </Link>

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-foreground"
              >
                {nextProject.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </Container>
    </article>
  );
}
