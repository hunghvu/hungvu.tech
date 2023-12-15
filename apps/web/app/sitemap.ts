/**
 * Author: Hung Vu
 * 
 * Sitemap generator: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sites: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    // {
    //   url: `${process.env.NEXT_PUBLIC_BASE_URL!}/homelab`,
    //   lastModified: new Date(),
    //   changeFrequency: 'always',
    //   priority: 1,
    // },
  ]

  const articles = await fetch(
    `${process.env.NEXT_REQUEST_CMS_ARTICLES_URL!}?limit=10000`,
    { next: { revalidate: 3600 } }
  );
  (await articles.json()).docs.forEach((article: any) => {
    sites.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/${article.settings.slug}`,
      lastModified: new Date(
        "customizedUpdatedAt" in article.settings
          ? article.settings.customizedUpdatedAt as string
          : article.updatedAt as string),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  });

  return sites;
}

export default sitemap