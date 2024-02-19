/**
 * Author: Hung Vu
 * 
 * Proxy API to avoid CORS, and also to add caching
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const numberOfDevices = req.nextUrl.searchParams.get('limit')
  const page = req.nextUrl.searchParams.get('page')
  let res;
  try {
    res = await fetch(
      `${process.env.NEXT_REQUEST_CMS_OPENWRT_TOH!}?limit=${numberOfDevices}&page=${page}`,
      { next: { revalidate: process.env.NODE_ENV === "production" ? 86400 : 0 } }
    );
  } catch (err) {
    return new NextResponse('Cannot fetch OpenWRT Table of Hardware', { status: 500 });
  }

  // This endpoint is public, so no need to catch 4xx
  // The endpoint only returns code 500 for catch-all purpose
  // The bigger (>) comparison is for when the server is down, Cloudflare can return 5xx status
  if (res.status >= 500) {
    return new NextResponse('Cannot fetch OpenWRT Table of Hardware', { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json({ ...data }, { status: res.status })
}