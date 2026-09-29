# Divyansh Vijay — Portfolio

Personal developer portfolio for **Divyansh Vijay**, a Full Stack & React Native Developer.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Environment variables

One variable, and it is public by design — there are no secrets in this project.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production only | Absolute base for `metadataBase`, canonical URLs, Open Graph, `sitemap.xml` and `robots.txt`. Falls back to `http://localhost:3000`. |

Copy `.env.example` to `.env.local` for local overrides. On Vercel, set it under
**Project Settings → Environment Variables** after the first deploy, then redeploy so
the sitemap and canonical URLs pick up the real domain.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel — the framework preset is detected automatically; no build
   configuration is needed.
3. Add `NEXT_PUBLIC_SITE_URL` with the production domain.
4. Redeploy.

Every route is statically prerendered, so the site can also be hosted anywhere that
serves a Next.js build.

## Project structure

```
app/                 Routes, layout, global CSS, sitemap, robots, icon
  projects/[slug]/   Statically generated case-study pages
components/
  layout/            Navbar, Footer
  sections/          One component per homepage section
  projects/          Project card
  contact/           Copy-to-clipboard button (client)
  motion/            Reveal, StaggerGroup, MotionProvider
  seo/               Person JSON-LD
  ui/                Container, Section, Button, Card, Chip, IconBadge, …
content/             All copy and data — edit the site here, not in components
lib/                 Small helpers (cn, motion tokens)
types/               Shared TypeScript interfaces
```

## Editing content

All copy and data live in `content/`. Components take props and render — you can
rewrite every word without touching a component.

Unverified fields are intentionally left empty and are guarded in the UI, so nothing
renders a placeholder or a dead link. To fill them in:

| What | Where |
| --- | --- |
| GitHub URL | `content/site.ts` → `socials.github` |
| Résumé PDF | Add `public/resume.pdf`, then set `content/site.ts` → `resumePath` |
| Location / availability | `content/site.ts` |
| Project roles, case-study problem / solution / challenges | `content/projects.ts` |
| Project screenshots | Add to `public/projects/`, then set `image` in `content/projects.ts` |
| Education section | Data already in `content/education.ts`; no section renders it yet |

## Design system

Tailwind v4 is CSS-first: all design tokens live in `@theme` inside `app/globals.css`.
There is deliberately **no** `tailwind.config.js`.

Dark theme only — background `#08080A`, surface `#0F0F12`, elevated `#16161A`,
foreground `#F4F4F5`, muted `#A1A1AA`, subtle `#71717A`, accent `#22D3EE`,
support `#3B82F6`.

## Accessibility & motion

One `h1` per page, semantic landmarks, a skip link, `aria-labelledby` on every section,
and a single global `:focus-visible` ring.

Motion respects `prefers-reduced-motion` through `MotionConfig reducedMotion="user"`.
Above-the-fold content animates with CSS rather than JavaScript, so it can never be
left invisible by a failed hydration.
