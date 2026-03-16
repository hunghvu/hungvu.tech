import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      // Viewable on a blog post page
      readerTitle: z.string(),
      readerDescription: z.string(),
      // Refine does not seem to work in v5 at the moment: https://github.com/withastro/astro/issues/12025
      // Because image() now returns a string, instead of an object with width and height
      // Reference: https://docs.astro.build/en/guides/images/#images-in-content-collections
      // When using frontmatter, the path must be absolute, such as "/public/image-name.png"
      // It cannot infer "/image-name.png" from the /public folder
      coverImage: image(),
      coverAlt: z.string(),

      // Viewable, but sort of metadata-like information
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      series: z.string().optional(),

      // Not viewable, but used for SEO
      seoTitle: z.string(),
      seoDescription: z.string(),
    }),
});

export const collections = { blog };
