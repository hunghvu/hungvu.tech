---
name: daisyui
description: DaisyUI 5 usage in this repo, including the mandatory daisyui- class prefix and theming. Use when adding or changing UI components or theme colors.
---

# DaisyUI 5

`src/styles/global.css` loads DaisyUI with a custom prefix:

```css
@plugin "daisyui" {
  prefix: "daisyui-";
}
```

**Every DaisyUI component/modifier class must be prefixed**: `daisyui-btn`, `daisyui-btn-ghost`, `daisyui-card-body`, `daisyui-navbar-start`, `daisyui-modal-box`, `daisyui-join-item`, etc. Unprefixed `btn`/`card` silently render unstyled. Translate every class from the official docs. Classes already in use are discoverable with `grep -rhoE "daisyui-[a-z0-9-]+" src | sort -u`.

## Theming

- Use semantic colors through Tailwind utilities: `bg-base-100`, `text-base-content`, `text-primary`, `fill-base-content`, etc.
- Theme switching uses `theme-change` with `data-theme` on `<html>` and `data-toggle-theme="dark"` on the toggle input. The toggle's input is visually hidden in DaisyUI 5, so E2E tests click its `label` container.
- Tailwind's `dark:` variant is remapped in `global.css` via `@custom-variant dark` to `[data-theme="dark"]`, not the OS preference.

## Docs

DaisyUI changes between releases. Look classes up in `https://daisyui.com/llms.txt` (reachable, verified) or the component pages on `daisyui.com`; do not rely on memory or on v4 examples.
