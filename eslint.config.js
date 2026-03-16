import pluginPrettier from "eslint-config-prettier";
import pluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".github", "node_modules", "dist/**", "pnpm-lock.yaml"],
  },
  tseslint.configs.recommended,
  ...pluginAstro.configs.recommended,
  ...pluginAstro.configs["jsx-a11y-strict"],
  pluginPrettier,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);
