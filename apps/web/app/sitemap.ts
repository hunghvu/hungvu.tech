/**
 * Author: Hung Vu
 * 
 * Sitemap generator: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

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

  const articles = await fetch(process.env.NEXT_REQUEST_CMS_ARTICLES_URL!);
  (await articles.json()).docs.foreach((article: any) => {
    sites.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/${article.settings.slug}`,
      lastModified: new Date(article.updatedAt as string),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  });

  return sites;
}

export default sitemap