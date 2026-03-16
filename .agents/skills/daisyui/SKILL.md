---
name: daisyui
description: Instructions on leveraging DaisyUI predefined components and handling theming.
---

# DaisyUI Skill Guidelines

This project incorporates **DaisyUI** on top of Tailwind CSS for its component library.

## 1. Component Usage

- Prefer using built-in DaisyUI component classes (e.g., `btn`, `card`, `alert`, `modal`, `drawer`) over building complex custom components from scratch using primitive Tailwind utilities.
- When creating buttons, always use the `btn` base class combined with variants like `btn-primary`, `btn-outline`, or `btn-ghost`.

## 2. Theming and Colors

- Use DaisyUI semantic colors (`primary`, `secondary`, `accent`, `neutral`, `base-100`, `info`, `success`, `warning`, `error`) via Tailwind utilities (e.g., `text-primary`, `bg-base-200`) to ensure compatibility with different themes.
- The project uses `theme-change` to handle theme switching. When adding new elements, make sure they adapt properly to dark/light modes relying on DaisyUI's CSS variables.

## 3. Layouts

- Use DaisyUI layout components like `navbar`, `footer`, and `hero` for standard page sections to speed up development and maintain visual consistency.

## 4. Official DaisyUI LLM Documentation

When generating or modifying components, relying on exact class names is critical. You **MUST** fetch and utilize the official DaisyUI LLM documentation for accurate utility class structures and layout setups.

- **DaisyUI LLM Docs**: `https://daisyui.com/llms.txt`

If encountering an issue with configuring or using a specific component, read the contents of this URL to retrieve the most up-to-date documentation.
