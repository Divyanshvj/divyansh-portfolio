import { Briefcase } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { IconBadge } from "@/components/ui/icon-badge";
import { hero } from "@/content/hero";

/**
 * Above-the-fold section. Carries the page's single <h1>.
 *
 * Deliberately a Server Component with ZERO client JS: the entrance is a
 * CSS animation (`animate-reveal-up`), not Framer Motion, so the hero can
 * never be left invisible by a failed hydration or a missed
 * IntersectionObserver callback. `prefers-reduced-motion` is handled
 * globally in globals.css.
 *
 * All copy comes from content/hero.ts - nothing is hardcoded here.
 */
export function Hero() {
  const ctas = hero.ctas.filter((cta) => !cta.pending);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="accent-wash relative pt-14 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Text column - the dominant element */}
          <div className="max-w-2xl">
            <p className="animate-reveal-up font-mono text-xs uppercase leading-5 tracking-[0.2em] text-accent">
              {hero.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="animate-reveal-up mt-5 font-semibold text-foreground [animation-delay:80ms]"
            >
              <span className="block text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                {hero.headline}
              </span>
              <span className="mt-2 block text-gradient text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.2] tracking-[-0.02em]">
                {hero.headlineAccent}
              </span>
            </h1>

            {hero.subheadline && (
              <p className="animate-reveal-up mt-5 max-w-xl text-base leading-relaxed text-muted [animation-delay:160ms] md:text-lg">
                {hero.subheadline}
              </p>
            )}

            <ul
              aria-label="Core technologies"
              className="animate-reveal-up mt-7 flex flex-wrap gap-2 [animation-delay:240ms]"
            >
              {hero.techHighlights.map((tech) => (
                <Chip key={tech} as="li" size="sm">
                  {tech}
                </Chip>
              ))}
            </ul>

            <div className="animate-reveal-up mt-8 flex flex-col gap-3 [animation-delay:320ms] sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={cta.variant}
                  size="lg"
                  icon={cta.icon}
                  iconPosition={cta.variant === "primary" ? "right" : "left"}
                  {...(cta.newTab
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-full sm:w-auto"
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Current-role panel. Verified facts only - no invented metrics. */}
          {hero.status && (
            <div className="animate-reveal-up w-full [animation-delay:400ms] lg:justify-self-end">
              <Card
                variant="glass"
                className="w-full p-6 md:p-7 lg:max-w-sm lg:ml-auto"
              >
                <div className="flex items-center gap-3">
                  <IconBadge icon={Briefcase} tone="accent" size="md" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    Currently
                  </p>
                </div>

                <p className="mt-5 text-lg font-medium text-foreground">
                  {hero.status.role}
                </p>
                <p className="mt-1 text-sm text-muted">{hero.status.company}</p>

                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-mono text-xs text-subtle">
                    {hero.status.period}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
