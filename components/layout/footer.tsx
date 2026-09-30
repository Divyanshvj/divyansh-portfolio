import { FileText, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { navItems } from "@/content/navigation";
import { hasValue, site } from "@/content/site";

/**
 * Minimal footer. Each channel renders only when its value is configured
 * in content/site.ts, so an unset GitHub URL simply produces no link.
 */
export function Footer() {
  const email = hasValue(site.email) ? site.email : null;
  const linkedin = hasValue(site.socials.linkedin)
    ? site.socials.linkedin
    : null;
  const github = hasValue(site.socials.github) ? site.socials.github : null;
  const resume = hasValue(site.resumePath) ? site.resumePath : null;

  return (
    <footer className="mt-auto border-t border-line py-12 md:py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-16">
          {/* Identity */}
          <div className="max-w-xs">
            <p className="font-mono text-sm font-medium text-foreground">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {site.positioning}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          {(email || linkedin || github || resume) && (
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-2.5">
                {email && (
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <Mail className="size-4" aria-hidden="true" />
                      {email}
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <LinkedInIcon className="size-4" />
                      LinkedIn
                    </a>
                  </li>
                )}
                {/* Rendered only once site.socials.github is configured. */}
                {github && (
                  <li>
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <GitHubIcon className="size-4" />
                      GitHub
                    </a>
                  </li>
                )}
                {resume && (
                  <li>
                    <a
                      href={resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <FileText className="size-4" aria-hidden="true" />
                      Resume
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <p className="mt-12 border-t border-line pt-6 font-mono text-xs text-subtle">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
