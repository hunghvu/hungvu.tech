---
name: linting-formatting
description: Instructions on how to run formatting and code quality checks using Prettier and astro check.
---

# Formatting & Code Quality Guidelines

The codebase relies on **Prettier** for deterministic formatting and Tailwind class sorting, and **Astro Check** for TypeScript and template diagnostics.

## 1. Running Format & Checks

- **Format files**: Run `pnpm run format` (`prettier . --write`) to automatically format all files and sort Tailwind CSS classes.
- **Check formatting**: Run `pnpm run lint` (`prettier . --check`) to verify that all files conform to code style rules.
- **Type & Template Diagnostics**: Run `pnpm astro check` (or `pnpm run build`) to detect any TypeScript errors or broken props across `.astro`, `.ts`, and `.mdx` files.

## 2. Best Practices

- Run `pnpm run format` before concluding work or submitting changes.
- Always verify that `pnpm astro check` passes with 0 errors and 0 warnings.
- Keep Tailwind/DaisyUI utility classes clean; `prettier-plugin-tailwindcss` will automatically organize them when formatting.

## 3. Configuration

- Formatting configuration is stored in `prettier.config.mjs`. Do not modify this file without explicit user instruction.
