import type { MetadataRoute } from "next";
import { projectSlugs } from "@/content/projects";
import { siteUrl } from "@/content/site";

/**
 * Static sitemap. Uses siteUrl, which reads NEXT_PUBLIC_SITE_URL, so the
 * production domain is configured through the environment rather than
 * hardcoded here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
