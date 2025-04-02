import pluginAstro from "eslint-plugin-astro";
// eslint-plugin-tailwindcss does not support astro yet
// typescript-eslint is not intended for astro files

// eslint-config-prettier is for turning rules that conflict with prettier
import pluginPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [".github", "node_modules", "dist/**"],
  },
  ...pluginAstro.configs["jsx-a11y-strict"],
  pluginPrettier,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error",
    },
  },
];
