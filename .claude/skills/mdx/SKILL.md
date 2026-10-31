---
name: mdx
description: Rules for blog post content in src/content/blog (frontmatter schema, code blocks, components in MDX). Use when editing existing posts; use new-blog-post to scaffold one.
---

# MDX blog content

Posts live at `src/content/blog/<slug>/index.mdx` with images co-located. Frontmatter is Zod-validated by `src/content.config.ts`, which is the source of truth. Required: `readerTitle`, `readerDescription`, `coverImage`, `coverAlt`, `publishedDate`, `seoTitle`, `seoDescription`. Optional: `updatedDate`, `series`.

- `coverImage` is a path **relative to the post**: `./cover-image.webp`. (An older version of this guide said `/public/...`; that is wrong.)
- Dates are coerced, so `2026-09-07` and `May 19, 2022` both parse. Prefer ISO going forward.
- Do not add `layout`, `title` or `tags`; unknown keys break `astro check` and the build.
- Keep `seoDescription` under 160 chars.
- Fenced code blocks always get a language. Highlighting and the copy button come from `rehype-pretty-code` + `transformerCopyButton` configured in `astro.config.ts`.
- `.astro` components can be imported right after the frontmatter (use aliases). `astro-embed` is enabled for embeds.
- Internal links are root-relative slugs, e.g. `/javascript-promise-chaining-avoid-callback-hell`.
- After editing, run `pnpm astro check`.
