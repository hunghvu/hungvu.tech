import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import { transformerCopyButton } from "@rehype-pretty/transformers";
import { rehypePrettyCode } from "rehype-pretty-code";

// https://astro.build/config
export default defineConfig({
  site: "https://hungvu.tech",
  integrations: [mdx(), sitemap(), tailwind()],
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
});
