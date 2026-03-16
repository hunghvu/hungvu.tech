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

## 3. DOM Interactions

- When interacting with the DOM in client-side scripts, cast elements gracefully, verifying they exist before accessing properties (e.g., `const btn = document.querySelector<HTMLButtonElement>('#my-btn'); if (btn) { ... }`).

## 4. Documentation References

When handling complex type definitions or TypeScript utility types, utilize the official TypeScript documentation to fetch accurate guidelines:

- **TypeScript Official Docs**: `https://www.typescriptlang.org/docs/`

If encountering an issue with specific compiler checks or required patterns, read the contents of this URL for the necessary context.
