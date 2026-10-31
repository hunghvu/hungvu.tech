---
name: typescript
description: TypeScript conventions, strictness rules, and interface/type definitions.
---

# TypeScript Skill Guidelines

This project relies on **TypeScript** to ensure type safety across Astro and standard script files.

## 1. Strict Typing

- Do not use `any`. Use `unknown` or specify exact types.
- Ensure all function parameters, return types, and interface properties are properly typed.
- Rely on Astro's built-in utility types when applicable (e.g., `GetStaticPaths`, `AstroGlobal`).

## 2. Interfaces over Types

- Prefer `interface` over `type` for defining object shapes (like component Props or API responses) as they provide better error messages and are more easily extensible.

## 3. Path Aliases (`tsconfig.json`)

Always use the configured path aliases rather than deeply nested relative paths (e.g. `../../components`):

- `@components/*` -> `src/components/*`
- `@layouts/*` -> `src/layouts/*`
- `@assets/*` -> `src/assets/*`

## 4. DOM Interactions

- When interacting with the DOM in client-side scripts, cast elements gracefully, verifying they exist before accessing properties (e.g., `const btn = document.querySelector<HTMLButtonElement>('#my-btn'); if (btn) { ... }`).

## 5. Type Checking

- Run `pnpm astro check` to validate types across the entire project including Astro frontmatter and template expressions.

## 6. Documentation References

When handling complex type definitions or TypeScript utility types:

- **TypeScript Official Docs**: `https://www.typescriptlang.org/docs/`
- **Context7 MCP**: Use `query-docs` directly with `libraryId: "/microsoft/typescript"` (or `/websites/typescriptlang`) for TypeScript syntax, compiler options, and utility types.
