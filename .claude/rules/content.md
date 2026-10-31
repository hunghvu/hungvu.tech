---
paths:
  - "src/content/**"
  - "src/content.config.ts"
---

# Blog content (MDX)

Posts live at `src/content/blog/<slug>/index.mdx` with images co-located. Frontmatter is Zod-validated by `src/content.config.ts`, the source of truth. Required: `readerTitle`, `readerDescription`, `coverImage`, `coverAlt`, `publishedDate`, `seoTitle`, `seoDescription`. Optional: `updatedDate`, `series`. To scaffold a post, use the `new-blog-post` skill.

- `coverImage` is a path **relative to the post**: `./cover-image.webp`.
- Dates are coerced, so `2026-09-07` and `May 19, 2022` both parse. Prefer ISO going forward.
- Do not add `layout`, `title` or `tags`; unknown keys break `astro check` and the build.
- Keep `seoDescription` under 160 characters.
- Fenced code blocks always get a language. Highlighting and the copy button come from `rehype-pretty-code` + `transformerCopyButton` in `astro.config.ts`.
- `.astro` components can be imported right after the frontmatter (use aliases). `astro-embed` is enabled for embeds.
- Internal links are root-relative slugs, e.g. `/javascript-promise-chaining-avoid-callback-hell`.
- After editing, run `pnpm astro check`.
