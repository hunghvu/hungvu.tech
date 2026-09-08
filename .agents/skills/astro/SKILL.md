---
name: astro
description: Guidelines for writing and structuring Astro components, pages, layouts, routing, and data fetching in this project.
---

# Astro Skill Guidelines

You are working in an Astro web project (`hungvu.tech`). Follow these conventions when creating or modifying Astro files (`.astro`):

## 1. File Structure & Path Aliases

- **Pages**: Store route entry points in `src/pages/`.
- **Layouts**: Use `src/layouts/` for page wrappers that provide common HTML structure (e.g., `<head>`, main navigation, footer).
- **Components**: Reusable UI elements go in `src/components/`.
- **Path Aliases**: Always use the tsconfig path aliases instead of brittle relative paths:
  - `@components/*` &rarr; `src/components/*`
  - `@layouts/*` &rarr; `src/layouts/*`
  - `@assets/*` &rarr; `src/assets/*`

## 2. Component Structure

- Keep the frontmatter script cleanly separated from the HTML template.
- Use explicit TypeScript interfaces for component `Props`.

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="...">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>
```

## 3. Content Layer & Data Fetching

- Use Astro's file-based routing.
- Content is managed via Astro's **Content Layer API** in `src/content.config.ts` using `defineCollection` and `glob()` loaders.
- Query collections using `getCollection("blog")` or `getEntry("blog", id)` from `astro:content`.
- Markdown processing in `astro.config.ts` uses `markdown.processor: unified(...)` from `@astrojs/markdown-remark`.

## 4. Script and Style Tags

- Avoid client-side `<script>` tags unless interactive behavior is strictly required. Prefer standard scoped `<script>` blocks when needed.
- Rely on Tailwind CSS / DaisyUI (always using the `daisyui-` prefix for component classes) rather than custom `<style>` blocks in Astro components.

## 5. Official Astro Documentation & MCP Server

When generating, debugging, or modifying Astro code in this project, consult Astro's official documentation:

- **Primary (Fastest)**: Use the `search_astro_docs` tool from the **`astro-docs` MCP server**. This queries the live Astro v7 documentation directly and returns concise, relevant sections.
- **Secondary (Raw text)**: If you need broad context, use `read_url_content` on:
  - `https://docs.astro.build/llms.txt`
  - `https://docs.astro.build/_llms-txt/api-reference.txt`
  - `https://docs.astro.build/_llms-txt/how-to-recipes.txt`
