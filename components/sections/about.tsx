import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { about } from "@/content/about";

/**
 * About. Copy comes entirely from content/about.ts - nothing is hardcoded.
 * Facts without a verified value (e.g. location) are filtered out rather
 * than rendered blank.
 */
export function About() {
  const facts = about.facts.filter((fact) => fact.value);

  return (
    <Section id="about" labelledBy="about-heading">
      <Reveal>
        <SectionHeading
          id="about-heading"
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <Reveal className="space-y-5">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="max-w-[62ch] text-base leading-relaxed text-muted md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {facts.length > 0 && (
          <Reveal delay={0.1}>
            <Card variant="surface" className="p-6 md:p-7">
              <dl className="space-y-6">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label}>
                      <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                        {Icon && (
                          <Icon className="size-3.5 text-accent" aria-hidden="true" />
                        )}
                        {fact.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-foreground">
                        {fact.value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Card>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
