---
name: astro
description: Conventions for Astro components, pages, layouts, routing, content collections and markdown config in this repo. Use when creating or modifying .astro files, routes, or astro.config.ts.
---

# Astro conventions (Astro 7)

- **Where things go**: routes in `src/pages/`, page wrappers in `src/layouts/` (always `BaseLayout.astro`, never raw `<html>`/`<head>` in a route), reusable UI in `src/components/`.
- **Aliases**: `@components/*`, `@layouts/*`, `@assets/*` (see `tsconfig.json`); no deep relative imports.
- **Props**: declare `type Props = { ... }` in the frontmatter. This repo uses `type Props` throughout, which also lets pages use `InferGetStaticPropsType<typeof getStaticPaths>`. Keep the frontmatter script separate from the template.
- **Content**: Content Layer API in `src/content.config.ts` (`defineCollection` + `glob()` loader, `z` from `astro/zod`). Query with `getCollection("blog")` / `getEntry("blog", id)` from `astro:content`.
- **Markdown**: `astro.config.ts` uses `markdown.processor: unified({ rehypePlugins })` from `@astrojs/markdown-remark`, with `syntaxHighlight: false` because `rehype-pretty-code` does highlighting. Don't re-enable Shiki. Since Astro 7 the default processor is Sätteri (Rust, no plugin ecosystem); `unified()` is an explicit opt-in kept here only for the rehype plugins. Porting those plugins to Sätteri and dropping `@astrojs/markdown-remark` is a possible future simplification, not a requirement.
- **Scripts/styles**: avoid client JS unless needed (theme-change, Pagefind search and reading progress are the existing exceptions). Style with Tailwind/DaisyUI utilities; the two existing scoped `<style>` blocks (`BaseHead.astro`, `Search.astro`) are the exception, not the pattern.
- **Prefetch** is on globally (`prefetchAll`), so don't add per-link prefetch attributes.

## Docs

Astro 7 moves fast; check the docs rather than recalling from memory. Use the official hosted `astro-docs` MCP server (configured in `.mcp.json`; tool `search_astro_docs`, backed by the live docs index). Fallbacks: WebFetch on `https://docs.astro.build/en/...` pages, or Context7. `docs.astro.build/llms.txt` no longer exists (404).
