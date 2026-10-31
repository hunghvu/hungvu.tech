---
name: typescript
description: TypeScript strictness and typing conventions for .ts and .astro files in this repo. Use when writing or fixing types.
---

# TypeScript

- `tsconfig.json` extends `astro/tsconfigs/strictest` with `verbatimModuleSyntax`: use `import type` / `import { type X }` for type-only imports.
- No `any`; use `unknown` or exact types. Type params and return values; use Astro's utility types (`GetStaticPaths`, `InferGetStaticPropsType`, `MarkdownHeading`).
- Component props: `type Props = { ... }` (the repo convention). Use `interface` for other object shapes that may be extended.
- Use the path aliases (`@components/*`, `@layouts/*`, `@assets/*`).
- Client scripts: query with a generic and null-check, e.g. `const btn = document.querySelector<HTMLButtonElement>("#my-btn"); if (btn) { ... }`.
- Validate with `pnpm astro check` (covers `.astro` frontmatter, templates and `.mdx` frontmatter). Target: 0 errors, 0 warnings, 0 hints.

## Version note

TypeScript is on 6.x. **Do not move to 7 yet**: `astro check` refuses to run on TS 7 ("does not currently support TypeScript 7.0"). Astro offers experimental TS 7.1+ type-checking via `@astrojs/ts-content-mapper`; revisit when that is stable. `baseUrl` was removed from `tsconfig.json` (deprecated in TS 6), so `paths` entries are `./`-relative. Plain `tsc` cannot resolve `.astro` imports, so use `pnpm astro check` as the type checker.

Docs: `https://www.typescriptlang.org/docs/`
