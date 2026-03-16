---
name: mdx
description: Rules for structuring content, using frontmatter, and handling rich text formatting.
---

# MDX Skill Guidelines

The project uses `@astrojs/mdx` for content authoring, allowing the integration of components inside Markdown.

## 1. Content Structure

- Write clear, concise Markdown.
- Use properly structured YAML Frontmatter at the top of the file to declare metadata like title, date, layout, and tags.

## 2. Code Blocks & Syntax Highlighting

- Code blocks are parsed using `rehype-pretty-code` and `transformerCopyButton` is enabled.
- Always provide a language hint for fenced code blocks (e.g., ```typescript).
- Be aware that copy buttons and syntax highlighting are automatically handled by the rehype plugins, so you don't need to manually inject them into the MDX content.

## 3. Component Injection

- You can import and use `.astro` components inside `.mdx` files.
- Keep the imports grouped and organized at the beginning of the MDX file, right after the frontmatter block.
- Use explicit component usage for complex interactive UI elements that Markdown alone cannot support.

## 4. Official MDX Documentation

The project uses the Astro MDX integration. When generating or modifying `.mdx` files, fetch and utilize the official documentation. Because MDX files frequently interact with core Astro features (Layouts, Components, Routing), you should consult both the overarching Astro LLM docs and the specific MDX guide:

- **Astro Overview (LLM Docs)**: `https://docs.astro.build/llms.txt`
- **Astro MDX Integration Guide**: `https://docs.astro.build/en/guides/integrations-guide/mdx/`

If encountering an issue with configuring or using `.mdx` inside this Astro project, read the contents of these URLs for accurate context.
