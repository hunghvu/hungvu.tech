/**
 * Author: Hung Vu
 * 
 * Sitemap generator: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/homelab`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]

  const articles = await fetch(process.env.PAYLOAD_SERVER_ARTICLES_URL!, {
    cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
  });
  (await articles.json()).docs.map((article: any) => {
    sites.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/${article.settings.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  });

  return sites;
}