/**
 * Author: Hung Vu
 * 
 * Proxy API to avoid CORS, and also to add caching
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse } from 'next/server'

export async function GET() {
  let res;
  try {
    res = await fetch(
      `${process.env.NEXT_REQUEST_CMS_MEDIA_URL!}?limit=9999`,
      { next: { revalidate: process.env.NODE_ENV === "production" ? 7200 : 0 } }
    );
  } catch (err) {
    return NextResponse.json({ error: 'Cannot fetch media from the CMS.' }, { status: 500 });
  }

  // This endpoint is public, so no need to catch 4xx
  // The endpoint only returns code 500 for catch-all purpose
  // The bigger (>) comparison is for when the server is down, Cloudflare can return 5xx status
  if (res.status >= 500) {
    return NextResponse.json('Cannot fetch media from the CMS.', { status: 500 });
  }
  let sitemap = ''
  const data = await res.json();
  data.docs.forEach((image: any) => {
    if (image.mimeType.startsWith('image')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      for (const [key, _value] of Object.entries<Record<string, unknown>>(image.sizes)) {
        if (image.sizes[key].url !== null) {
          sitemap = sitemap.concat(`<image:loc>${image.sizes[key].url}</image:loc>`, '\n')
        }
      }
    }
  });
  return new NextResponse(
    `
      <urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
          <image:image>
            ${sitemap}
          </image:image>
      </urlset>
    `
    , { status: res.status, headers: { "Content-Type": "text/xml" } })
}