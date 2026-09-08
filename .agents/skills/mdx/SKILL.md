---
name: mdx
description: Rules for structuring content, using frontmatter, and handling rich text formatting.
---

# MDX Skill Guidelines

The project uses `@astrojs/mdx` for blog content authoring in `src/content/blog/`.

## 1. Frontmatter Schema (`src/content.config.ts`)

Blog post frontmatter is strictly validated with Zod. Every blog post MUST include:

```yaml
---
readerTitle: "My Article Title"
readerDescription: "A concise summary for readers."
coverImage: "/public/my-image.png"
coverAlt: "Description of the cover image"
publishedDate: 2026-09-07
updatedDate: 2026-09-08 # optional
series: "My Series Name" # optional
seoTitle: "SEO Optimized Title"
seoDescription: "Search engine description under 160 characters."
---
```

> [!WARNING]
> Do NOT use generic fields like `layout`, `title`, or `tags` in frontmatter. They are not in the schema and will trigger validation errors during `astro check` and `astro build`.

## 2. Code Blocks & Syntax Highlighting

- Code blocks are parsed using `rehype-pretty-code` with `transformerCopyButton` enabled.
- Always provide a language hint for fenced code blocks (e.g., ```typescript).
- Line numbers and copy buttons are styled automatically by global CSS and rehype plugins.

## 3. Component Injection

- You can import and use `.astro` components inside `.mdx` files.
- Place imports right after the frontmatter closing `---`.
- Prefer path aliases: `@components/*`, `@layouts/*`, `@assets/*`.

## 4. Documentation References

- **Astro Docs MCP**: Use `search_astro_docs` for quick lookups on MDX integration and syntax.
- **Astro MDX Guide**: `https://docs.astro.build/en/guides/integrations-guide/mdx/`
