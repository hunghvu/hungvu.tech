import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import tailwindcss from "@tailwindcss/vite";
import embeds from "astro-embed/integration";
import { defineConfig } from "astro/config";
import { rehypePrettyCode } from "rehype-pretty-code";

// https://astro.build/config
export default defineConfig({
  site: "https://hungvu.tech",
  integrations: [embeds(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },
  compressHTML: true,
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
