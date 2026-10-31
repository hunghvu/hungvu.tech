# hungvu.tech

Personal blogfolio: Astro 7 (static), Tailwind CSS v4 + DaisyUI 5, MDX content, Pagefind search, Satori OG images. Package manager is **pnpm**. Deployed as a static `dist` served by Caddy.

## Commands

- `pnpm dev` — dev server on http://localhost:4321
- `pnpm run lint` / `pnpm run format` — Prettier check / write (also sorts Tailwind classes and imports)
- `pnpm astro check` — types + template diagnostics; must be 0 errors, 0 warnings, 0 hints
- `pnpm test:unit` — Vitest (Astro Container API for components)
- `pnpm test:e2e` — Playwright + axe; runs against `pnpm preview`, so **`dist` must be built first** (`pnpm astro build && pnpm exec pagefind --site dist`)
- `pnpm build` — check + build + pagefind (what deploy runs). Formatting is enforced by CI (`pnpm run lint`) and, while working with Claude, by a `PostToolUse` Prettier hook, not by the build.

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
- Supply chain (`pnpm-workspace.yaml`): `minimumReleaseAge` is 14 days, so `pnpm add`/`update` rejects newer versions; wait or ask before adding `minimumReleaseAgeExclude`. The exact-version exclude list there is a temporary grandfather list: delete it after 2026-11-11. pnpm is pinned via `packageManager` (12.14.0, the newest past the age gate); bump it on or after 2026-11-13.
- TypeScript stays on 6.x until `astro check` supports 7. Hold `prettier-plugin-astro` at 0.14.x (1.x reformats 13 files).

## SEO

- Meta tags always via `BaseHead.astro` + `SeoHead.astro` (canonical, Open Graph, Twitter, RSS link). JSON-LD (`copyrightHolder`, `creator`, `author`, breadcrumbs) must stay valid per Google's schemas.
- New public routes must appear in the sitemap; check `public/robots.txt`.

## Claude setup (`.claude/`, `.mcp.json`)

- `settings.json` has a `PostToolUse` hook (`hooks/format.mjs`) that runs Prettier on every file Claude edits or writes.
- CI (`.github/workflows/ci.yml`) runs format check, `astro check`, unit tests, build and E2E on Linux for pushes to `main`/`development` and PRs into `main`.
- `rules/` load only when matching files are touched: `daisyui.md` (the `daisyui-` prefix, theming) and `content.md` (blog frontmatter), `tests.md`.
- `skills/`: `astro`, `tailwindcss`, `typescript`, `new-blog-post`, `verify`, `github-cli`, and the vendor-installed `daisyui` (from `saadeghi/daisyui`; pinned in `skills-lock.json`, update with `npx skills add saadeghi/daisyui --agent claude-code --yes`).
- `.mcp.json`: `astro-docs` (official Astro docs search), `daisyui` (GitMCP), `context7`. Approve them on first use.
- Astro 7, Tailwind 4 and DaisyUI 5 are recent and differ from older versions: look things up through those servers or WebFetch (`daisyui.com/llms.txt`, `tailwindcss.com/docs`) instead of recalling from memory.
