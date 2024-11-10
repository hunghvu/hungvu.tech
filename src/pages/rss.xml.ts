import type { APIContext } from 'astro';

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { BASE_SITE_NAME, BASE_SITE_DESCRIPTION } from "../consts";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: BASE_SITE_NAME,
    description: BASE_SITE_DESCRIPTION,
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.seoTitle,
      description: post.data.seoDescription,
      pubDate: post.data.publishedDate,
      link: `/${post.slug}`,
    })),
  });
}
