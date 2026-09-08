---
description: Project structure, SEO, and testing guidelines for hungvu.tech
glob: src/**/*
---

# Project Standards & Implementation Guidelines

When working on this project (hungvu.tech), strictly adhere to the following architectural and testing guidelines:

## 1. Code Structure and Organization

- **Layouts**: Always use the layout components in `src/layouts` (e.g., `BaseLayout.astro`) to wrap pages (`src/pages`). Do not hardcode HTML boilerplate (`<html lang="en">`, `<head>`, `<body>`) directly inside route files.
- **Component Abstraction**: Abstract complex or repetitive UI elements (such as verbose SVG icons in headers and footers) into reusable components (e.g., `SocialLinks.astro` or `Icon.astro`). Avoid inline SVG clutter in structural components.
- **Import Path Aliases**: Always use tsconfig aliases (`@components/*`, `@layouts/*`, `@assets/*`) rather than multi-level relative paths (`../../components`).
- **Styling**: Use DaisyUI with the required `daisyui-` prefix on all components and modifiers.

## 2. SEO Support

- **Meta Tags**: Always utilize `BaseHead.astro` and `SeoHead.astro` for injecting meta tags across all pages to ensure Canonical URLs, Open Graph, Twitter cards, and RSS links are uniformly present.
- **Structured Data (JSON-LD)**: When updating or creating SEO components, ensure JSON-LD structured data properties (like `copyrightHolder`, `creator`, and `author`) strictly adhere to Google Search's required schemas.
- **Robots & Sitemaps**: Ensure new public routes are correctly exposed, and consider `robots.txt` endpoint availability.

## 3. Testing & Verification Standards

- **Unit & Component Testing**: Use **Vitest** via `pnpm run test:unit` for testing Astro components (using Astro Container API), utilities, and isolated TypeScript/JavaScript logic.
- **End-to-End (E2E) Testing**: Use **Playwright** via `pnpm run test:e2e` for testing critical user flows, routing integrations, and UI state changes (such as Light/Dark theme toggling).
- **Code Quality Checks**: Run `pnpm run lint` (Prettier check) and `pnpm astro check` (type validation) before finishing changes.
- Ensure any new core features or abstractions are naturally accompanied by corresponding tests.
