/**
 * Author: Hung Vu
 * 
 * Proxy API to avoid CORS, and also to add caching
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextResponse, type NextRequest } from 'next/server'
import type { DataTableStateEvent } from "primereact/datatable";

export async function POST(req: NextRequest) {
  const event = await req.json() as DataTableStateEvent;
  let res;
  try {
    res = await fetch(
      process.env.NEXT_REQUEST_CMS_OPENWRT_TOH_FILTER_URL!,
      {
        next: { revalidate: process.env.NODE_ENV === "production" ? 86400 : 0 },
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      },
    )
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