import { NextResponse, type NextRequest } from 'next/server';

/**
 * Redirects /health to /api/health for easier monitoring access.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/api/health';
  return NextResponse.redirect(url);
}
