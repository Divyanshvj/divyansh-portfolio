import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  /*
   * Required. The root layout sets `index: true`, which would otherwise be
   * inherited here and contradict the `noindex` tag Next.js emits for a
   * 404 response. This override keeps both robots tags consistent.
   */
  robots: { index: false, follow: true },
};

/**
 * 404 page.
 *
 * Renders inside the root layout, so the navbar and footer are already
 * present and this file only supplies the main content. It carries the
 * page's single <h1>.
 *
 * Deliberately static - no entrance animation, no client JavaScript.
 */
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="accent-wash flex min-h-[60vh] items-center py-20 md:py-28"
    >
      <Container>
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Error 404
          </p>

          <h1
            id="not-found-heading"
            className="mt-5 text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            Page not found
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            That page doesn&apos;t exist, or it may have moved. Everything else
            is still where you left it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href="/"
              variant="primary"
              size="lg"
              icon={ArrowLeft}
              className="w-full sm:w-auto"
            >
              Back to home
            </Button>

            <Button
              href="/#projects"
              variant="secondary"
              size="lg"
              icon={ArrowUpRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              View projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
