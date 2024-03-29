/**
 * Author: Hung Vu
 * 
 * Middleware
 */

import { NextResponse } from 'next/server'

// Strict Content Security Policy
export function middleware(request: any): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  // style-src unsafe-inline is required for Tailwind CSS
  const cspHeader = `
    default-src 'self';
    script-src 'self' https://hungvu.tech https://static.cloudflareinsights.com 'unsafe-inline' ${process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`};
    style-src 'self' https://hungvu.tech 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers as HeadersInit)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  response.headers.set(
    'Cache-Control',
    'private, max-age=7200, must-revalidate'
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}