---
name: github-cli
description: Use the GitHub CLI (gh) for PRs, CI checks, releases and issues in this repo. Use when asked to open/merge a PR, check CI, or cut a release.
---

# GitHub CLI

- Repo: `hunghvu/hungvu.tech`. Flow: work on `development`, PR into `main`. Always pass `--base main --head development` explicitly.
- `gh` lives at `C:\Program Files\GitHub CLI\gh.exe`; if it isn't on PATH in PowerShell, refresh it from the Machine and User env vars or call it with `&`.
- Check `gh auth status` first. If logged out, ask the user to run `! gh auth login`.
- There is currently **no CI** (`.github/` doesn't exist), so `gh pr checks` has nothing to report until workflows are added.

## Pull requests

Commit and push first (`git push origin development`), then:

```bash
gh pr create --base main --head development --title "feat: ..." --body "## Summary ..."
gh pr status
gh pr view <n>
gh pr checks <n>
```

- Conventional-commit titles (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- List in the body which of lint (see CLAUDE.md CRLF caveat), `astro check`, unit, build and E2E actually ran. Don't claim ones that didn't.
- **Never merge or create a release without explicit user confirmation.** When authorized: `gh pr merge <n> --squash --delete-branch` (history shows `development` is merged into `main` with merge commits, so confirm which style the user wants).

## Releases

Bump `package.json` version, add the `CHANGELOG.md` entry, merge to `main`, then:

```bash
gh release create v<version> --title "v<version> - <summary>" --notes-file <notes>
```

`--notes-file CHANGELOG.md` would publish the entire changelog; extract only the new section instead.
