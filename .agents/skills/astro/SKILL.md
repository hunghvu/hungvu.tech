---
name: astro
description: Guidelines for writing and structuring Astro components, pages, layouts, routing, and data fetching in this project.
---

# Astro Skill Guidelines

You are working in an Astro web project (`hungvu.tech`). Follow these conventions when creating or modifying Astro files (`.astro`):

## 1. File Structure

- **Pages**: Store route entry points in `src/pages/`.
- **Layouts**: Use `src/layouts/` for page wrappers that provide common HTML structure (e.g., `<head>`, main navigation, footer).
- **Components**: Reusable UI elements go in `src/components/`.

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

## 3. Routing & Data Fetching

- Use Astro's file-based routing.
- Prefer fetching data at build time inside the Astro frontmatter `---` using standard `fetch` or local content collections (`src/content/`).

## 4. Script and Style Tags

- Avoid client-side `<script>` tags unless interactive behavior is strictly required. If needed, prefer scoping them or using framework components if any are integrated.
- Rely on Tailwind CSS / DaisyUI for styling rather than writing custom `<style>` blocks in Astro components.

## 5. Official Astro LLM Documentation

When generating, debugging, or modifying Astro code in this project, you **MUST** fetch and utilize the official Astro LLM documentation sets for context if you have doubts about specific APIs or Astro capabilities:

- **Astro Overview**: `https://docs.astro.build/llms.txt`
- **Complete Documentation**: `https://docs.astro.build/llms-full.txt`
- **Abridged Documentation**: `https://docs.astro.build/llms-small.txt`
- **API Reference**: `https://docs.astro.build/_llms-txt/api-reference.txt`
- **How-to Recipes**: `https://docs.astro.build/_llms-txt/how-to-recipes.txt`

If encountering an error with Astro components, config, or features, use the `read_url_content` tool on these URLs for accurate ground truth instead of solely relying on pre-existing knowledge.
