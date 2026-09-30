@AGENTS.md

# CLAUDE.md — Divyansh Vijay Portfolio

Orientation for Claude Code sessions on this repo. Read this before changing anything.

---

## 1. Project purpose

A recruiter-focused personal developer portfolio for **Divyansh Vijay**, positioned as a
**Full Stack & React Native Developer** targeting React Native Developer and MERN Stack
Developer roles.

It is a static marketing site: no backend, no database, no CMS, no auth, no forms. The
whole site is prerendered at build time.

The site must communicate within ~5 seconds who he is and what he builds.

---

## 2. Tech stack

| Package | Version | Notes |
| --- | --- | --- |
| next | 16.3.5 | App Router, Turbopack |
| react / react-dom | 19.2.8 | |
| typescript | 5.9.3 | `strict: true` |
| tailwindcss | 4.3.3 | **CSS-first — see below** |
| @tailwindcss/postcss | ^4 | |
| framer-motion | 13.4.1 | Only used by the navbar mobile menu |
| lucide-react | 1.47.0 | **v1 removed all brand icons** |
| eslint / eslint-config-next | ^9 / 16.3.5 | |

**Do not add dependencies.** Every feature so far has been built with these. If something
seems to need a package, look for an existing primitive first.

### Two things that will trip you up

1. **Tailwind v4 is CSS-first.** There is deliberately **no `tailwind.config.js`** and one
   must never be created. All design tokens live in `@theme` inside `app/globals.css`;
   custom utilities use `@utility`. Unused theme variables are tree-shaken from the output,
   so a missing `--color-*` in built CSS is expected, not a bug.
2. **Next.js 16 differs from older training data.** `AGENTS.md` (imported above) says to
   read `node_modules/next/dist/docs/` before writing code — do that. Route props use the
   global helpers `LayoutProps<"/">` and `PageProps<"/projects/[slug]">`; `params` is a
   **Promise**. Those global types only exist after a `next build`/`next dev` has run, so a
   fresh clone will fail `tsc` on the dynamic route until you build once.

`AGENTS.md` is rewritten by `next dev` on every run. Leave it alone; commit it if it changes.

---

## 3. Folder structure

```
app/
  layout.tsx              Root layout: fonts, metadata, skip link, JSON-LD, Navbar/main/Footer
  page.tsx                Homepage — composes the sections in order
  globals.css             ALL design tokens (@theme), base layer, @utility definitions
  icon.svg                Favicon (DV monogram)
  sitemap.ts              Static sitemap from projectSlugs
  robots.ts               robots.txt
  projects/[slug]/page.tsx  Case-study pages (SSG, dynamicParams = false)
components/
  layout/                 navbar.tsx (client), footer.tsx
  sections/               One file per homepage section
  projects/               project-card.tsx
  contact/                copy-email-button.tsx (client)
  motion/                 reveal.tsx, stagger-group.tsx  (CSS-driven, server components)
  seo/                    person-json-ld.tsx
  ui/                     Container, Section, SectionHeading, Button, Card, Chip,
                          IconBadge, brand-icons
content/                  ALL copy and data — edit the site here, never in components
lib/                      utils.ts (cn), motion.ts (one easing constant)
types/                    index.ts — every shared interface
public/                   resume.pdf
```

**Only two client components exist**: `components/layout/navbar.tsx` and
`components/contact/copy-email-button.tsx`. Everything else is a Server Component. Keep it
that way — don't add `"use client"` without a concrete interactive reason.

---

## 4. Important files

| File | Responsibility |
| --- | --- |
| `content/site.ts` | Name, role, positioning, summary, email, socials, `resumePath`, `siteUrl`, SEO keywords, and the `hasValue()` guard |
| `content/projects.ts` | The two projects + `getProjectBySlug`, `projectSlugs`, `hasCaseStudy` |
| `content/experience.ts` | Two verified roles |
| `content/skills.ts` | Five skill categories |
| `content/whatIBuild.ts` | Seven capability cards |
| `content/hero.ts`, `about.ts`, `contact.ts`, `navigation.ts` | Section copy |
| `content/education.ts` | **Stored but not rendered anywhere.** Kept for a future Education section |
| `app/globals.css` | Design tokens, base layer, custom utilities, reduced-motion reset |
| `types/index.ts` | All interfaces. Unverified fields are **optional** by design |
| `components/ui/brand-icons.tsx` | `LinkedInIcon`, `GitHubIcon` — hand-rolled because lucide v1 has no brand icons. `forwardRef` + `LucideProps` so they satisfy `LucideIcon` and work in `Button`/`IconBadge` |
| `lib/utils.ts` | `cn()` — dependency-free class joiner (no clsx, no tailwind-merge) |

---

## 5. Homepage section order

```
Navbar  (in layout)
Hero
About
Skills
Experience
What I Build
Projects
Contact
Footer  (in layout)
```

Navbar and Footer live in `app/layout.tsx` so the case-study routes share them.

**Navbar links (5):** About · Skills · Experience · Projects · Contact.
"What I Build" is intentionally not in the nav. There is no separate homepage "Case
Studies" section — with two projects it would just repeat the Projects grid; each project
card links to its own `/projects/[slug]` page instead.

---

## 6. Design tokens

Defined in `@theme` in `app/globals.css`. Never hardcode a hex value in a component.

| Token | Value | Utility |
| --- | --- | --- |
| `--color-background` | `#08080A` | `bg-background` |
| `--color-surface` | `#0F0F12` | `bg-surface` |
| `--color-elevated` | `#16161A` | `bg-elevated` |
| `--color-foreground` | `#F4F4F5` | `text-foreground` |
| `--color-muted` | `#A1A1AA` | `text-muted` |
| `--color-subtle` | `#71717A` | `text-subtle` |
| `--color-accent` | `#22D3EE` | `text-accent` (primary accent) |
| `--color-accent-strong` | `#06B6D4` | hover state for accent fills |
| `--color-support` | `#3B82F6` | supporting accent, used sparingly |
| `--color-line` | `rgba(255,255,255,.08)` | `border-line` |
| `--color-line-strong` | `rgba(255,255,255,.14)` | `border-line-strong` (hover) |
| `--container-page` | `72rem` (1152px) | `max-w-page` |
| `--radius-card` | `1rem` | `rounded-card` |
| `--ease-out-soft` | `cubic-bezier(.22,1,.36,1)` | |

Dark theme only. **Do not introduce new colors.**

### Custom utilities (`@utility`)

- `glass` — the single glass recipe (blur + translucent bg + border). Used by the navbar
  and a couple of featured cards only. Do not overuse blur.
- `text-gradient` — foreground → accent gradient for headline accent lines.
- `accent-wash` — very low-opacity radial wash behind the hero and case-study headers.
- `page-gutter` — `1.25rem` inline padding, `2rem` from `md`.
- `reveal-on-scroll` — see Motion.

`Card` has two variants: `surface` (opaque, **no blur** — the default, used for grid cards)
and `glass` (reserved for a few featured panels).

---

## 7. Typography and responsive rules

- **Geist Sans** for everything; **Geist Mono** for eyebrows, tags, dates and metadata.
  Both loaded via `next/font/google` in the root layout with `display: "swap"`.
- Fluid headings use `clamp()` so they never overflow. Hero h1 name is
  `clamp(2rem, 5vw, 3.25rem)`; the accent role line is `clamp(1.25rem, 2.6vw, 2rem)`.
- Headings get `text-wrap: balance` and tight tracking; paragraphs get `text-wrap: pretty`.
- Body copy caps at `max-w-xl` / `62ch` for readability.

**Breakpoints** are Tailwind defaults — `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
Mobile-first: write the single-column layout first, then add `sm:`/`md:`/`lg:`.

Verified working at **360, 390, 768, 1024, 1440**. Section rhythm is
`py-20 md:py-28 lg:py-32`; page width is `max-w-page` plus `page-gutter`.

---

## 8. Motion conventions

**The hard rule: content must never depend on JavaScript to become visible.**

This was learned the hard way — two separate bugs left whole sections permanently blank.
Don't undo it.

| Where | Mechanism |
| --- | --- |
| Above the fold (Hero) | CSS keyframe `animate-reveal-up` with inline `animation-delay` stagger |
| Below the fold | `reveal-on-scroll` utility using `animation-timeline: view()` |
| Navbar mobile menu | Framer Motion `AnimatePresence` (genuinely interactive) |

`components/motion/reveal.tsx` and `stagger-group.tsx` export `Reveal`, `StaggerGroup` and
`StaggerItem`. **They are Server Components that only apply CSS classes** — the names are
historical. Content is visible by default; the animation is pure progressive enhancement
behind `@supports (animation-timeline: view())` and `prefers-reduced-motion`. Browsers
without scroll-driven animation support (Firefox, Safari) simply show content with no
entrance, which is the correct degradation.

**Never** reintroduce:
- Framer's `whileInView` or `initial={{ opacity: 0 }}` on content
- a `useReducedMotion()` branch that changes the *rendered element* — the server has no
  preference, so it emits `style="opacity:0"`, React refuses to patch the mismatch, and
  reduced-motion visitors see blank sections

Also avoid: parallax, 3D, cursor effects, continuous animation, large movement, page
transitions. Durations stay 0.4–0.6s.

The `prefers-reduced-motion` block in `globals.css` zeroes **duration *and* delay** —
without the delay reset, `animation-fill-mode: both` holds staggered items at `opacity: 0`
for the length of their delay, flashing blank.

---

## 9. Accessibility conventions

- **Exactly one `<h1>` per page.** Homepage: the hero. Case studies: the project name.
- Heading order h1 → h2 (sections) → h3 (cards), never skipped.
- Every section: `<Section id labelledBy>` wiring `aria-labelledby` to its heading id.
- Landmarks: `<main id="main-content">`, `<footer>`, `<nav aria-label="Primary">` and
  `<nav aria-label="Footer">`. A skip link is the first focusable element.
- **One** focus ring, defined globally as `:focus-visible` in `globals.css`. Don't add
  per-component focus styles.
- Decorative icons get `aria-hidden="true"`. `IconBadge` becomes `role="img"` only when
  given a `label`.
- Project cards have **one** link each, stretched over the card with `after:inset-0`, so
  the card is clickable but is a single tab stop with a descriptive accessible name.
- Mobile menu: `aria-expanded`, `aria-controls`, state-dependent `aria-label`, Escape
  closes and restores focus to the toggle, body scroll locks while open, closes on link
  click and when the viewport passes `md`.
- Never render a dead link or a button that does nothing. Guard with `hasValue()`.
- External links: `target="_blank"` **plus** `rel="noopener noreferrer"`.

---

## 10. SEO architecture

- `metadataBase`, canonical, Open Graph, Twitter card, robots directives and a title
  template (`%s — Divyansh Vijay`) all in `app/layout.tsx`, driven by `siteUrl`.
- `app/sitemap.ts` — homepage + both case studies, built from `projectSlugs`.
- `app/robots.ts` — allow all, points at the sitemap.
- `app/projects/[slug]/page.tsx` exports `generateStaticParams` and `generateMetadata`.
  Each project page **overrides `keywords`** with `[project.name, ...project.stack]` so a
  project page never implies technologies belonging to other work.
- `components/seo/person-json-ld.tsx` — `Person` schema rendered server-side as a plain
  `<script>`, so it never participates in hydration. It omits any field without a verified
  value; `sameAs` contains only real profiles.
- `app/icon.svg` provides the favicon.

Do not add unverified keywords, fake URLs, ratings, employer URLs or credentials.

---

## 11. Environment variables

**One variable, public by design. There are no secrets in this repo.**

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production only | Absolute base for `metadataBase`, canonical URLs, OG, sitemap and robots |

Read once in `content/site.ts`:

```ts
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
```

It is inlined at **build time**, so changing it requires a redeploy. `.env.example`
documents it and is force-committed via a `!.env.example` exception in `.gitignore`
(which otherwise ignores `.env*`).

Never introduce a second URL source or hardcode a domain.

---

## 12. Deployment workflow

1. Push to GitHub.
2. Import the repo in Vercel — framework preset is auto-detected, no build config needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain under
   **Project Settings → Environment Variables**.
4. Redeploy so canonical URLs and the sitemap pick up the real domain.

Every route is statically prerendered, so any static-capable host works.

**Note:** the footer copyright year is evaluated at build time, so it refreshes on rebuild.

---

## 13. Resume

The authoritative resume PDF lives at **`public/resume.pdf`**, served from **`/resume.pdf`**.

- **Never generate, rewrite or modify this PDF.** The user replaces it manually.
- The path is configured once, in `content/site.ts` → `resumePath: "/resume.pdf"`.
- It appears in three places, all `target="_blank" rel="noopener noreferrer"`: the Hero
  ("View Resume", ghost), the Contact card, and the Footer.
- Emptying `resumePath` removes all three links automatically — the hero CTA is filtered
  by its `pending` flag, the others by `hasValue()`.

---

## 14. GitHub URL configuration

Set in **exactly one place**, `content/site.ts`:

```ts
socials: {
  github: "https://github.com/Divyanshvj",
  linkedin: "https://www.linkedin.com/in/divyansh-vijay-1aa58823b/",
},
```

This is now configured, so the Contact button and Footer link render with the `GitHubIcon`
brand mark. If the value is ever emptied, both disappear automatically — no placeholder, no
`#` link. No environment variable, no other file to touch.

---

## 15. Current verified content

Source: the user's latest resume.

**Identity** — Divyansh Vijay · Full Stack & React Native Developer · targeting React
Native Developer and MERN Stack Developer roles.

**Contact** — email `divyanshvijay24@gmail.com`, LinkedIn
`https://www.linkedin.com/in/divyansh-vijay-1aa58823b/`, GitHub
`https://github.com/Divyanshvj` (supplied by the user — do not change or guess at it).

**Experience (2 roles):**

| Role | Company | Period |
| --- | --- | --- |
| Software Developer I | Cysco Pvt. Ltd. | July 2025 – Present |
| Full Stack Developer | Inwizio Technologies Pvt Ltd | September 2024 – June 2025 |

Metrics that *are* verified and may be stated: 30+ REST API endpoints, over 1,000 users,
100% of protected routes, 2 critical bugs. Do not strengthen or extend them.

**Skills (5 categories, 15 entries):**

- Languages — C++, JavaScript, SQL
- Frontend — React.js, React Native
- Backend — Node.js, Express.js
- Databases — MySQL, MongoDB
- Tools — Git, Swagger, Bruno, Confluence, JIRA, Cursor

**Education** (in `content/education.ts`, not rendered): B.Tech Computer Science, Swami
Keshvanand Institute of Technology, Management and Gramothan, Dec 2020 – Jul 2024,
CGPA 8.81.

Technologies documented in the *experience and project* sections — REST APIs, JWT,
OTP / Email Verification, OpenAI API — legitimately appear there even though the resume's
Technical Skills list does not repeat them. Do not strip them from that context, and do not
promote them into the Skills section.

---

## 16. Current projects

Exactly two, both `featured: true`, both with a case-study route.

### Smart Assist — `/projects/smart-assist`
Tagline: *AI Assistant with Document Intelligence (RAG)*
Stack: **React Native, OpenAI API** — and nothing else.
Verified functionality: AI chat application · real-time streaming LLM responses ·
persistent conversation history · structured prompt design and response handling ·
loading/error/retry states · document upload · document Q&A.

### Krishi Sahayak Portal — `/projects/krishi-sahayak-portal`
Tagline: *Deep Learning Model*
Stack: **REST APIs** only — it is the one technology explicitly documented
("frontend connected to trained model through REST API").
Verified functionality: crop disease identification · web portal · image upload ·
prediction display · frontend connected to a trained model through REST API ·
real-time diagnosis.

---

## 17. Content that must NOT be invented

> **Rule: the latest resume is the source of truth for every factual professional claim.**
> If something is not in the resume or explicitly supplied by the user, it does not go on
> the site. Leave the field empty/optional with a `TODO(content)` marker and let the UI
> guard hide it. An empty field is always better than a plausible guess.

Never add, restore or infer any of the following:

| Item | Status |
| --- | --- |
| **TypeScript** as a skill | **Not verified.** It was in an early draft and was deliberately removed — the resume's Technical Skills list does not include it. Do not re-add it to Skills, hero chips, capability stacks or SEO keywords. |
| **Postman, VS Code, GitHub (as a tool), Redux Toolkit, RTK Query** | Not on the current Technical Skills list. Excluded until explicitly confirmed. |
| **GitHub URL** | Now configured by the user in `socials.github`. Never guess or alter a username; if the field is emptied, render nothing rather than inventing one. |
| **Project screenshots** | None exist. Project cards use a text-first icon band by design — never fabricate product UI or add broken image placeholders. |
| **Project roles** | No role has been verified for either project. Omit the field; do not write "Full Stack Developer", "Lead Developer", etc. |
| **Location** | Unverified. `site.location` is empty and the About fact is filtered out. |
| **Availability / notice period** | Unverified. No copy may imply it. |
| **Phone number** | Never a public CTA. |
| **Krishi Sahayak framework / language / web stack** | Unverified. Do **not** add TensorFlow, PyTorch, Python, Flask, Django, React, Node.js, MongoDB or MySQL to it, nor model architecture, accuracy %, dataset size or training methodology. |
| **Smart Assist backend details** | Do **not** add a backend, database, auth method, cloud provider, vector DB, embedding model, RAG framework or deployment architecture. |
| **Case-study problem / solution / challenges** | Unverified for both projects. These sections are conditional and currently hidden. Do not fabricate them. |
| **Prescripto** | **Removed 2026-09-28** — not on the latest resume. Never reintroduce. |
| **Tiffin Management** | **Removed 2026-09-28** — not on the latest resume. Never reintroduce. |
| Metrics, user counts, performance numbers, client names, employer URLs, credentials, dates | Only what the resume states, verbatim in substance. |
| Superlatives — "expert", "world-class", "10x", "passionate problem solver", "industry-leading" | Never. |

Comments in `content/projects.ts` and `content/skills.ts` record *why* items were excluded.
Those mentions are an audit trail, not content — leave them.

---

## 18. Commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check — **there is no `typecheck` script** |

**There is no test suite.** The verification loop for any change is:

```bash
npx tsc --noEmit && npm run lint && npm run build
```

All three must exit 0 with zero warnings. Then inspect the running site.

### Verifying visually — read this before trusting a screenshot

Headless Chrome on Windows is unreliable here and has repeatedly produced false alarms:

- `--window-size` is clamped to roughly 500px wide, so `--window-size=360` silently lies.
  Render the page inside a fixed-width `<iframe>` in a local HTML file to get true mobile
  viewports.
- `--dump-dom` snapshots before animations run.
- Screenshots often catch CSS animations mid-flight. `--force-prefers-reduced-motion`
  makes entrances instant and gives a reliable capture.
- IntersectionObserver does not fire inside cross-origin iframes.

If a section looks blank in a capture, suspect the harness before the code — but do check
`.next/dev/logs/next-development.log` for hydration errors, which are real and silent.

---

## 19. Working agreement

- **Do not redesign.** The visual system, section order, spacing and typography are settled.
- **Content lives in `content/`.** Components take props and render. Never hardcode copy.
- **Unverified data stays optional**, guarded by `hasValue()` or a `pending` flag, so the UI
  degrades to showing nothing rather than something false.
- Keep the site server-first; justify any new client component.
- Add no dependencies.
- The user works in approval-gated steps. Report what was verified and what was assumed,
  and flag anything that could not be confirmed rather than papering over it.
