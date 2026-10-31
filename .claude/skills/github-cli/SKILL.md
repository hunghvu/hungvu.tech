---
name: github-cli
description: Instructions for interacting with GitHub via the GitHub CLI (gh) for branch, PR, release, and issue management.
---

# GitHub CLI (`gh`) Skill Guidelines

Use the GitHub CLI (`gh`) to perform GitHub workflows directly from the terminal without manual browser intervention.

## 1. CLI Path & Environment

On Windows, `gh.exe` is located at `C:\Program Files\GitHub CLI\gh.exe`. If `gh` is not found in the active shell PATH:

- In PowerShell, ensure the PATH is updated:
  ```powershell
  $env:PATH = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
  ```
- Or invoke directly via: `& "C:\Program Files\GitHub CLI\gh.exe"`

## 2. Authentication

Before performing any GitHub operations, always check authentication status:

```powershell
gh auth status
```

- If authenticated, proceed with commands.
- If not authenticated, prompt the user to run `gh auth login` in their terminal (interactive browser login).

## 3. Pull Request Management

### Creating Pull Requests

Always ensure local changes are committed and pushed to the remote branch before opening a PR:

```powershell
git push origin <branch-name>
```

Create the PR with clear title and markdown body:

```powershell
gh pr create --base main --head development --title "feat: descriptive PR title" --body "## Summary of Changes
- Change item 1
- Change item 2

## Verification
- pnpm run build (passed)
- pnpm run test:unit (passed)
- pnpm run test:e2e (passed)"
```

- If the user prefers a browser review before submitting, append `--web`.

### Checking PR Status & CI Checks

```powershell
# View current PRs related to this branch
gh pr status

# View PR details
gh pr view <pr-number>

# Check CI build / test status
gh pr checks <pr-number>
```

### Merging Pull Requests

Do not merge PRs without explicit user confirmation. When authorized:

```powershell
# Squash and merge (recommended for feature branches)
gh pr merge <pr-number> --squash --delete-branch
```

## 4. Release & Tag Management

To publish a new tagged release:

```powershell
gh release create v2.2 --title "v2.2 - Modernization & Maintenance" --notes-file CHANGELOG.md
```

## 5. Best Practices

- Always verify that all local checks pass (`pnpm run lint`, `pnpm astro check`, `pnpm run test:unit`, `pnpm run test:e2e`, and `pnpm run build`) before creating a PR to `main`.
- Use conventional commits syntax in PR titles (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- Always set the target `--base` branch explicitly (e.g. `main`).
