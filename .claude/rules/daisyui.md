---
paths:
  - "src/**/*.astro"
  - "src/**/*.mdx"
  - "src/styles/**"
  - "tests/**"
---

# DaisyUI 5

`src/styles/global.css` loads DaisyUI with a custom prefix:

```css
@plugin "daisyui" {
  prefix: "daisyui-";
}
```

**Every DaisyUI component/modifier class must be prefixed**: `daisyui-btn`, `daisyui-btn-ghost`, `daisyui-card-body`, `daisyui-navbar-start`, `daisyui-modal-box`, `daisyui-join-item`, etc. Unprefixed `btn`/`card` silently render unstyled. Translate every class from the official docs. Classes already in use: `grep -rhoE "daisyui-[a-z0-9-]+" src | sort -u`.

## Theming

- Use semantic colors through Tailwind utilities: `bg-base-100`, `text-base-content`, `text-primary`, `fill-base-content`, etc.
- Theme switching uses `theme-change` with `data-theme` on `<html>` and `data-toggle-theme="dark"` on the toggle input. The input is visually hidden in DaisyUI 5, so E2E tests click its `label` container.
- Tailwind's `dark:` variant is remapped in `global.css` via `@custom-variant dark` to `[data-theme="dark"]`, not the OS preference.

## Looking things up

DaisyUI changes between releases; never rely on memory or v4 examples. In order of preference:

1. The `daisyui` MCP server (GitMCP over the `saadeghi/daisyui` repo, configured in `.mcp.json`, no key needed).
2. `https://daisyui.com/llms.txt` via WebFetch (free, condensed docs, verified reachable).
3. Context7 (`context7` MCP), or the component pages on `daisyui.com`.

The paid "Blueprint" MCP is not needed.
