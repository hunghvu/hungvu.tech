---
name: new-blog-post
description: Scaffold a new blog post under src/content/blog with valid frontmatter, matching existing posts. Use when asked to start, add, or draft a post.
---

1. Get (or infer) the title, one-sentence summary, optional series, and cover image.
2. Slug = kebab-case of the title. Create `src/content/blog/<slug>/index.mdx`; keep the cover and other images in the same folder (prefer `.webp`).
3. Frontmatter must match `src/content.config.ts` (the source of truth). Shape used by existing posts:

```yaml
---
coverImage: ./cover-image.webp
coverAlt: <alt text>
publishedDate: <YYYY-MM-DD>
readerTitle: <title shown on page>
readerDescription: <summary>
seoTitle: <short SEO title>
seoDescription: <under 160 chars>
series: <optional>
---
```

4. No `layout`, `title`, or `tags` keys. Fenced code blocks always get a language. Read one recent post first and mirror its closing section (related-links list and "let's connect").
5. If `series` is set, reuse the exact existing series string (grep other posts) so `Series.astro` groups it.
6. Run `pnpm astro check` to validate the frontmatter and report the result.
