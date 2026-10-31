---
name: tailwindcss
description: Tailwind CSS v4 conventions for this repo (CSS-first config, typography plugin, mobile-first). Use when styling components or editing global.css.
---

# Tailwind CSS v4

- Loaded via `@tailwindcss/vite` (registered in `astro.config.ts`); there is **no `tailwind.config.js`**. All config is CSS in `src/styles/global.css` (`@import "tailwindcss"`, `@plugin`, `@theme`, `@custom-variant`).
- Customize the theme with `@theme` in CSS, not JS config. Avoid piling on `@apply`; prefer utilities in markup or a reusable Astro component.
- Mobile-first: unprefixed classes are mobile, then `sm:` `md:` `lg:` `xl:` `2xl:`.
- Rendered markdown uses `@tailwindcss/typography` (`prose`).
- Don't hand-sort classes: `prettier-plugin-tailwindcss` sorts them on `pnpm run format`.
- `global.css` has a v3 border-color compatibility layer (v4 defaults to `currentColor`). Elements that rely on it will change look if you remove it.

## Docs

v4 differs a lot from v3 (renamed utilities, CSS-first config). Verify syntax at `https://tailwindcss.com/docs` instead of using memory.
