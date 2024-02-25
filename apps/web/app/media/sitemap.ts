/**
 * Author: Hung Vu
 * 
 * Sitemap generator: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import getMedia from "@utils/request/server-side/get-media";
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sites: MetadataRoute.Sitemap = []

  const media = await getMedia();
  media.forEach((image: any) => {
    if (image.mimeType.startsWith('image')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      for (const [key, _value] of Object.entries<Record<string, unknown>>(image.sizes)) {
        if (image.sizes[key].url !== null) {
          sites.push({
            url: image.sizes[key].url as string,
            lastModified: new Date(image.updatedAt as string),
            changeFrequency: 'monthly',
            priority: 0.1,
          });
        }
      }
    }
  });

  return sites;
}

export default sitemap