# hungvu.tech

Personal blogfolio: Astro 7 (static), Tailwind CSS v4 + DaisyUI 5, MDX content, Pagefind search, Satori OG images. Package manager is **pnpm**. Deployed as a static `dist` served by Caddy.

## Commands

- `pnpm dev` — dev server on http://localhost:4321
- `pnpm run lint` / `pnpm run format` — Prettier check / write (also sorts Tailwind classes and imports)
- `pnpm astro check` — types + template diagnostics; must be 0 errors, 0 warnings, 0 hints
- `pnpm test:unit` — Vitest (Astro Container API for components)
- `pnpm test:e2e` — Playwright + axe; runs against `pnpm preview`, so **`dist` must be built first** (`pnpm astro build && pnpm exec pagefind --site dist`)
- `pnpm build` — lint + check + build + pagefind (what deploy runs)

After a Playwright version bump, run `pnpm exec playwright install chromium`.

## Layout

- `src/pages/` routes (`[...slug]` posts, `[...page]` pagination, `og/[...slug].png.ts`, `rss.xml.ts`); always wrap in `src/layouts/BaseLayout.astro`
- `src/components/` (SEO in `components/head/`, TOC in `components/toc/`)
- `src/content/blog/<slug>/index.mdx` + co-located images; schema in `src/content.config.ts`
- `tests/unit`, `tests/e2e`

## Conventions

- Use tsconfig aliases `@components/*`, `@layouts/*`, `@assets/*`, never deep relative imports.
- DaisyUI classes need the `daisyui-` prefix.
- Meta tags go through `BaseHead.astro` / `SeoHead.astro`; keep JSON-LD schema-valid.
- Extract repeated or verbose UI (e.g. inline SVGs) into components such as `Icon.astro`.
- New features/abstractions get tests (Vitest for components/utils, Playwright for flows).
- Don't edit `prettier.config.mjs` without being asked.
- Frontmatter is Zod-validated: no `layout`, `title`, or `tags` fields. Real posts use a **relative** cover path (`coverImage: ./cover-image.webp`).
- Keep `CHANGELOG.md` and the `package.json` version in sync on releases.

## Gotchas

- Windows checkout has `core.autocrlf=true`, so `pnpm run lint` reports most files as CRLF-dirty locally. That is not a real failure; don't "fix" it by reformatting the repo.
- Branch flow: work on `development`, PR into `main`.

## SEO

- Meta tags always via `BaseHead.astro` + `SeoHead.astro` (canonical, Open Graph, Twitter, RSS link). JSON-LD (`copyrightHolder`, `creator`, `author`, breadcrumbs) must stay valid per Google's schemas.
- New public routes must appear in the sitemap; check `public/robots.txt`.

## Skills

Project skills in `.claude/skills/`: `astro`, `daisyui`, `tailwindcss`, `typescript`, `mdx`, `new-blog-post`, `verify`, `github-cli`.
Astro 7, Tailwind 4 and DaisyUI 5 are recent and differ from older versions: check the live docs (WebFetch / Context7) rather than recalling from memory.
