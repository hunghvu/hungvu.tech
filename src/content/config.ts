import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		// Viewable on a blog post page
		readerTitle: z.string(),
		readerDescription: z.string(),
		coverImage: z.string(),
		coverAlt: z.string(),

		// Viewable, but sort of metadata-like information
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()),
		series: z.string().optional(),

		// Not viewable, but used for SEO
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
});

export const collections = { blog };
