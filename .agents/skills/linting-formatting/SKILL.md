---
name: linting-formatting
description: Instructions on how to run and fix formatting/linting using prettier and eslint.
---

# Linting & Formatting Skill Guidelines

The codebase employs automated linting and formatting workflows using Eslint and Prettier.

## 1. Running Format & Lint

- Use the package script `pnpm run format` (or `npm run format`) to automatically write Prettier format fixes to the codebase.
- Use the package script `pnpm run lint` (or `npm run lint`) to identify any TypeScript, JSX, or Astro-related lint issues in `src/`.

## 2. Best Practices

- Before completing a task or submitting significant code modifications, run the formatting to ensure alignment with `.prettierrc.ts`.
- Address Eslint warnings and avoid disabling rules inline (`// eslint-disable-next-line`) unless absolutely necessary with a verified justification comment.

## 3. Configurations

- The exact configs are stored in `eslint.config.js` and `.prettierrc.ts`. Do not modify these configuration files without explicit user instruction.

## 4. Documentation References

When resolving complex formatting or linting rules, refer to this documentation for ESLint core concepts and glossary definitions:

- **ESLint Glossary**: `https://eslint.org/docs/latest/use/core-concepts/glossary`

You can use the `read_url_content` tool to look up ESLint concepts if needed.
