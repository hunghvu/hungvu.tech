---
paths:
  - "tests/**"
  - "playwright.config.ts"
  - "vitest.config.ts"
---

# Tests

- Unit (`tests/unit`): Vitest with the Astro Container API (`experimental_AstroContainer`, still experimental in Astro 7). Assert on rendered output, not implementation.
- E2E (`tests/e2e`): Playwright against `pnpm preview`, so `dist` must be built first. Axe scans use the `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` tags.
- DaisyUI 5 hides the theme toggle input; click its `label` container.
- CI (`.github/workflows/ci.yml`) runs the same suite on Linux; keep the suite small and fast (smoke + axe), not exhaustive.
- Never write a test that can pass vacuously (for example wrapping assertions in `if (href)`). If a selector finds nothing, fail the test.
- Don't loosen an assertion to make a failing test pass; work out whether the app or the test is wrong first.
