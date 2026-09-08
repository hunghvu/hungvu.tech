---
name: daisyui
description: Instructions on leveraging DaisyUI predefined components and handling theming.
---

# DaisyUI Skill Guidelines

This project incorporates **DaisyUI** on top of Tailwind CSS for its component library.

## 1. CRITICAL: Required `daisyui-` Prefix

In `src/styles/global.css`, DaisyUI is configured with a custom prefix:

```css
@plugin "daisyui" {
  prefix: "daisyui-";
}
```

**ALL DaisyUI component, layout, and modifier classes MUST be prefixed with `daisyui-`**:

- Buttons: `daisyui-btn`, `daisyui-btn-primary`, `daisyui-btn-outline`, `daisyui-btn-ghost`, `daisyui-btn-circle`
- Layout & Navigation: `daisyui-navbar`, `daisyui-navbar-start`, `daisyui-navbar-center`, `daisyui-navbar-end`, `daisyui-menu`, `daisyui-menu-horizontal`, `daisyui-menu-title`
- Cards & Content: `daisyui-card`, `daisyui-card-body`, `daisyui-card-title`, `daisyui-divider`
- Overlays & Interactivity: `daisyui-dropdown`, `daisyui-dropdown-content`, `daisyui-modal`, `daisyui-drawer`, `daisyui-swap`, `daisyui-swap-rotate`, `daisyui-swap-on`, `daisyui-swap-off`

Do NOT use unprefixed DaisyUI classes (like `btn` or `card`), as they will not be styled.

## 2. Theming and Colors

- Use DaisyUI semantic colors (`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-content`, `info`, `success`, `warning`, `error`) via Tailwind utilities (e.g., `text-primary`, `bg-base-100`, `fill-base-content`).
- The project uses `theme-change` to handle theme switching via `data-theme` and `data-toggle-theme="dark"`. Ensure elements adapt properly to dark/light modes.

## 3. Documentation References

When looking up DaisyUI components or utilities:

- **Context7 MCP**: Use the Context7 tools (`resolve-library-id` or `query-docs` directly with `libraryId: "/saadeghi/daisyui"` or `libraryId: "/websites/daisyui"`) to search DaisyUI component syntax, props, and examples.
- **Free LLM Docs**: `https://daisyui.com/llms.txt` (use `read_url_content` if needed).
- Remember to always prepend `daisyui-` to classes found in official documentation!
