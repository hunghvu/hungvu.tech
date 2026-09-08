# Changelog

## [2.2] - 2026-09-08

### Major Highlights & Upgrades

- **Astro 7 Migration**: Migrated to Astro 7 with `@astrojs/markdown-remark` unified pipeline for rehype syntax processing.
- **Tailwind CSS v4 & DaisyUI 5**: Fully migrated to the pure-CSS plugin architecture (`@plugin "daisyui"` with required `daisyui-` prefix).
- **pnpm 12 Support**: Modernized workspace configuration, cleaned obsolete flags, and removed deprecated `.npmrc`.
- **Toolchain Streamlining**: Switched to a lightweight, deterministic Prettier-only workflow (`prettier . --check` / `--write`) and relied on `astro check` for template and TypeScript validation, eliminating ESLint overhead.
- **Automated Agent Capabilities**: Configured live documentation integration via MCP servers (`astro-docs` and `context7`), added GitHub CLI (`gh`) skill, and updated agent standards with tsconfig path aliases and Content Layer API practices.

### Accessibility & Tests

- **WCAG Accessibility Fixes**: Added `aria-disabled="true"` and `tabindex="-1"` to disabled pagination buttons in `[...page].astro` to resolve Axe-core color contrast false positives.
- **Playwright Suite Drift**: Fixed DaisyUI 5 hidden toggle checkbox interaction by targeting label containers; configured non-interactive Playwright test reporter.
- **TypeScript Alignment**: Added Astro-recommended `include` and `exclude` boundaries in `tsconfig.json`.

---

## [2.1] - 2026-03-16

### Features

- **Client-Side Search**: Implemented fast, static search powered by Pagefind with interactive modal dialog and keyboard navigation.
- **Reading Progress Bar**: Added a responsive reading progress indicator for long-form blog articles.
- **Structured Data & SEO**: Implemented Breadcrumb JSON-LD schema support and dynamic Open Graph image generation using Satori.
- **Custom Error Pages**: Designed custom, branded `404` (Not Found) and `500` (Server Error) routes.
- **Content Expansion**: Added new blog articles #13 through #41 covering cloud architecture, virtualization, homelab setups, and web technologies.
- **Cloudflare Web Analytics**: Integrated privacy-friendly web analytics beacon.

### Performance & Refactoring

- **Astro 6 & Content Layer**: Migrated to Astro 6 and adopted modern content collections (`src/content.config.ts`).
- **Component Abstractions**: Extracted reusable `BaseLayout` and unified SVG `Icon` components.
- **Image Optimization**: Migrated to `astro:assets` `<Picture />` with AVIF and WebP fallback generation and native lazy loading.
- **HTML Compression & Prefetching**: Enabled static HTML compression and aggressive prefetching on internal links.

### Testing & Verification

- **Automated Testing Suite**: Introduced **Vitest** for component testing (via Astro Container API) and **Playwright** with **@axe-core/playwright** for end-to-end and accessibility regression prevention.

---

## [2.0] - 2025-01-04

- Simplify and migrate from Payload v2 + NextJS + Turborepo to just Astro as a static site generator (zero JS).
- Now support pagination for home page.
- Background is no longer animated. The animation in v1 heavily consumes CPU cycles on browser without GPU acceleration.
- Support table of contents.
- Support dark and light mode.
- Support RSS.
- Code block now has line numbers, height restriction, and is scrollable, to avoid a wall of text.
- Migrate from a PrimeReact (JS-heavy) to DaisyUI (essentially a lightweight CSS utility).
- The web design is now generic, KISS essentially.
- Remove OpenWRT ToH page because of low traffic and it makes the site JS-heavy.

## [1.2] - 2024-02-25

- This version focuses on delivering the website's "Lab" section. The "Lab" is a collection of mini projects the author wants to experiment on. This time, it is an OpenWRT table of hardware.
- Feature development was merged at [2867f61](https://github.com/hunghvu/hungvu.tech/commit/2867f61aaaf90a123b19702b02acf77ea77db4cd), but some fixes were introduced after to resolve issues in the production environment. The website is ready at [4213095](https://github.com/hunghvu/hungvu.tech/commit/4213095828983e96ef47444e93923898b8f054a8).
- For a detailed work view, please visit commit history or [Milestone v1.2](https://github.com/hunghvu/hungvu.tech/milestone/3?closed=1).

### Features

- Add footer. ([#72](https://github.com/hunghvu/hungvu.tech/issues/72))
- Add OpenWRT Table of Hardware (full details) that is updated every 24 hours. This involves several issues. Please take a look at the milestone for a better overview.

### Optimization

- Move from PrimeReact built-in styles plus Tailwind styles to fully unstyled Tailwind. This greatly reduces CSS and blocking resource size. ([#111](https://github.com/hunghvu/hungvu.tech/issues/111))
- Improve SEO on link elements. ([#62](https://github.com/hunghvu/hungvu.tech/issues/62))
- Improve semantics of blog/home page. ([#115](https://github.com/hunghvu/hungvu.tech/issues/115), and [5180b20](https://github.com/hunghvu/hungvu.tech/commit/5fd3230cb42dd24a9f8de16bd3016194d5fa6ff8))
- Extract all API requests to `utilities` for the front end. ([#70](https://github.com/hunghvu/hungvu.tech/issues/70))

### Known issues

- Menubar has a key unique error due to an upstream PrimeReact bug. [#123](https://github.com/hunghvu/hungvu.tech/issues/121)
- CSP Nonce is removed in [#150](https://github.com/hunghvu/hungvu.tech/issues/150) due to breaking behavior in production. Future releases will re-evaluate the implementation of CSP.
- Performance of OpenWRT Table of Hardware might not be optimal due to the lack of dynamic import for large JS bundle. [#147](https://github.com/hunghvu/hungvu.tech/issues/147)
- **Might be false positive**: Lighthouse test using PageSpeed Insights sometimes results in a lower score than expected, dropping about 10-20 points in performance. The result is not consistent so this needs to be investigated.

## [1.1] - 2023-12-30

- This version focuses on delivering bug fixes and optimization for [hungvu.tech](https://hungvu.tech).
- Milestone merged at [efecf45](https://github.com/hunghvu/hungvu.tech/commit/efecf450d7d0afc948117d22a9b3ff5d2cf43c07), but a hotfix was applied in [6cf083b](https://github.com/hunghvu/hungvu.tech/commit/6cf083b607e438dd80c248ce6b977473f7be29f0).
- Only notable changes relative to v1.0 are mentioned. Changes that are intermediate steps during the development are not mentioned.
- For a better view, please visit commit history or [Milestone v1.1](https://github.com/hunghvu/hungvu.tech/milestone/2?closed=1).

### Bug fixes

- Highlight.js code snippet does not use Geist Mono font. ([#101](https://github.com/hunghvu/hungvu.tech/issues/101))
- The ordered list is misaligned when the number label size changes. ([#89](https://github.com/hunghvu/hungvu.tech/issues/89))
- Line height is small causing big rows (e.g., with code element) to overlap. ([#84](https://github.com/hunghvu/hungvu.tech/issues/#84))
- Image are unexpectedly zoomed in. ([#65](https://github.com/hunghvu/hungvu.tech/issues/65))
- Long string overflows the text body. ([#88](https://github.com/hunghvu/hungvu.tech/issues/88))
- MongoDB performance issue causing slow blog/home page load. ([#93](https://github.com/hunghvu/hungvu.tech/issues/93))
- Payload custom Articles endpoints return draft articles and crash the front end. ([#97](https://github.com/hunghvu/hungvu.tech/issues/97))

### Optimization

- Turn the blog/home page into a server component to improve core web vitals. (#91)
- Overhaul UI to improve accessibility and user experience. ([#91](https://github.com/hunghvu/hungvu.tech/issues/91), [#99](https://github.com/hunghvu/hungvu.tech/issues/99), and some other not-linked-to-issue commits)
- Largely improve FCP and LCP by reducing bundled CSS and JavaScript. ([#99](https://github.com/hunghvu/hungvu.tech/issues/99))
- Side note: AVIF was considered for implementation, but it led to a heavy load and crashed the server, so was removed. ([#78](https://github.com/hunghvu/hungvu.tech/issues/78), [#105](https://github.com/hunghvu/hungvu.tech/issues/105))
- Use of cache header to utilize Cloudflare CDN. The issue ([#98](https://github.com/hunghvu/hungvu.tech/issues/98)) remains open for monitoring purposes, but the core idea is implemented.
- Increase QUIC/UDP buffer size. ([#95](https://github.com/hunghvu/hungvu.tech/issues/95))

### Features

- Use of a neutral theme for the website (no light/dark mode), with the use of animated SVG. ([#92](https://github.com/hunghvu/hungvu.tech/issues/92))

## [1.0] - 2023-12-17

- First revision of [hungvu.tech](https://hungvu.tech).
- Latest commit: [980fd64](https://github.com/hunghvu/hungvu.tech/commit/980fd64e3fb559ef3924463f2aefd55bf6109d51).

### Features

- Dark theme (the only theme at the moment).
- Home page and individual article pages.
- Each article page have a virtual scroller to access other articles in the same series.
- Every page can generate its own SEO information (meta tags and JSON Schema).
- An article page is cached to improve load time and reduce server load. Other pages are dynamically fetched to ensure data is up to date.
- HTTP/3, QUIC support.
- Automatic SSL termination.
- Infrastructure is defined using Pulumi (IaaC), ensuring consistent production environment.
