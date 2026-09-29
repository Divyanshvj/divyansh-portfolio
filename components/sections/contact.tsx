import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { CopyEmailButton } from "@/components/contact/copy-email-button";
import { contact } from "@/content/contact";
import { hasValue, site } from "@/content/site";

/**
 * Contact.
 *
 * Renders only channels that have a verified value: email and LinkedIn.
 * GitHub and the resume stay suppressed until real values exist, so no
 * dead link or do-nothing button is ever shown. There is no contact form,
 * because no backend or email service is configured.
 */
export function Contact() {
  const email = hasValue(site.email) ? site.email : null;
  const linkedin = hasValue(site.socials.linkedin) ? site.socials.linkedin : null;

  return (
    <Section id="contact" labelledBy="contact-heading">
      <Reveal>
        <SectionHeading
          id="contact-heading"
          eyebrow={contact.eyebrow}
          title={contact.title}
          description={contact.description}
        />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Card variant="glass" className="p-6 md:p-8">
          {email && (
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                  Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-1 block truncate text-base font-medium text-foreground transition-colors hover:text-accent md:text-lg"
                >
                  {email}
                </a>
              </div>
              <CopyEmailButton email={email} className="ml-auto" />
            </div>
          )}

          {(email || linkedin) && (
            <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap">
              {email && (
                <Button
                  href={`mailto:${email}`}
                  variant="primary"
                  size="lg"
                  icon={Mail}
                  className="w-full sm:w-auto"
                >
                  Email me
                </Button>
              )}

              {linkedin && (
                <Button
                  href={linkedin}
                  variant="secondary"
                  size="lg"
                  icon={LinkedInIcon}
                  className="w-full sm:w-auto"
                >
                  Connect on LinkedIn
                </Button>
              )}
            </div>
          )}
        </Card>
      </Reveal>
    </Section>
  );
}
