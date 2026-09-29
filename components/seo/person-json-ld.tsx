import { allSkills } from "@/content/skills";
import { hasValue, site, siteUrl } from "@/content/site";

/**
 * Person structured data.
 *
 * Every field is a verified fact. Fields with no verified value - GitHub,
 * address, employer URL, credentials - are omitted entirely rather than
 * guessed. `sameAs` only contains profiles that actually exist.
 *
 * Rendered from a Server Component as a plain script tag, so it never
 * participates in hydration.
 */
export function PersonJsonLd() {
  const sameAs = [site.socials.linkedin].filter(hasValue);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    jobTitle: site.positioning,
    description: site.summary,
    knowsAbout: allSkills,
    ...(hasValue(site.email) ? { email: `mailto:${site.email}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised server-side; contains no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
