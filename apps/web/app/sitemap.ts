/**
 * Author: Hung Vu
 * 
 * Sitemap generator: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from 'next'
import getArticlesWithMinimalResponse from "@utils/request/server-side/blog/get-articles-with-minimal-response";
import getLabsWithMinimalResponse from "@utils/request/server-side/lab/get-labs-with-minimal-response";

export const dynamic = 'force-dynamic'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sites: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL!,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/lab`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]

  const articles = await getArticlesWithMinimalResponse();
  articles.forEach((article: any) => {
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

  const labs = await getLabsWithMinimalResponse();
  labs.forEach((lab: any) => {
    sites.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL!}/lab/${lab.settings.slug}`,
      lastModified: new Date(lab.updatedAt as string),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  });

  return sites;
}

export default sitemap