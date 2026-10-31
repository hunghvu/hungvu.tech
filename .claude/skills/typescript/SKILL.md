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

## Upgrade note

TypeScript is pinned at 5.9. TS 7 is available but not adopted. `tsconfig.json` uses `baseUrl`, which newer TypeScript deprecates, so a TS upgrade will need `paths` reworked first. Check `astro check` compatibility before bumping.

Docs: `https://www.typescriptlang.org/docs/`
