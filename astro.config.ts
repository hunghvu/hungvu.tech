import { defineConfig } from "astro/config";
import embeds from "astro-embed/integration";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { rehypePrettyCode } from "rehype-pretty-code";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://hungvu.tech",
  integrations: [embeds(), mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          transformers: [
            transformerCopyButton({
              visibility: "always",
              feedbackDuration: 2_500,
            }),
          ],
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
