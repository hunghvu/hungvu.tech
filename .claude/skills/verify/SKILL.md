---
name: verify
description: Run the full quality gate (format, astro check, unit tests, build, E2E) for hungvu.tech and report results. Use before committing or opening a PR.
---

Run in order, stop and fix on first real failure:

1. `pnpm run format`, then `git diff --stat` to review what Prettier changed. On Windows, CRLF noise from `core.autocrlf` is expected; don't commit mass line-ending changes.
2. `pnpm astro check` — require 0 errors/warnings/hints.
3. `pnpm run test:unit`
4. `pnpm astro build && pnpm exec pagefind --site dist`
5. `pnpm run test:e2e` (needs the `dist` from step 4; if the browser is missing run `pnpm exec playwright install chromium`).

Report each step as pass/fail with the failing output quoted. Never claim success for a skipped step.
