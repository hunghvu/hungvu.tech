---
name: tailwindcss
description: Best practices and conventions for styling the project using Tailwind CSS v4.
---

# Tailwind CSS v4 Skill Guidelines

This project uses **Tailwind CSS v4** via the `@tailwindcss/vite` plugin.

## 1. Class Organization

- Order utility classes consistently.
- Prefer grouping related utilities (e.g., layout, typography, colors, spacing).

## 2. Using Tailwind v4 Features

- Take advantage of the new Tailwind v4 syntax, CSS variables, and native `@theme` directives in the global stylesheet if modifications to the standard theme are required.
- Do not use `@apply` excessively. Instead, rely on utility classes within markup or reusable Astro components to keep stylesheets lean.

## 3. Responsive Design

- Design mobile-first. Default classes apply to mobile screens.
- Use standard breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to enhance the layout for larger viewports.

## 4. Typography

- The project includes `@tailwindcss/typography`. Use the `prose` class for styling rendered Markdown or block-level rich text.

## 5. Documentation References

When generating layouts, components, or resolving styling issues, use the official documentation or MCP to fetch accurate utility class definitions and guidelines:

- **Context7 MCP**: Use the Context7 tools (`resolve-library-id` or `query-docs` directly with `libraryId: "/tailwindlabs/tailwindcss.com"` or `libraryId: "/websites/tailwindcss"`) to look up Tailwind v4 syntax, utility classes, and theme directives.
- **Tailwind Utility Classes Guide**: `https://tailwindcss.com/docs/styling-with-utility-classes`
