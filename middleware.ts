import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_COOKIE = 'keystatic_admin';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only protect /keystatic and /api/keystatic here; other routes remain public.
  const isKeystaticPath =
    pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic');

  // Allow access to the login route itself without redirect loops.
  if (pathname.startsWith('/keystatic-login') || pathname.startsWith('/keystatic-logout')) {
    return NextResponse.next();
  }

  if (!isKeystaticPath) {
    return NextResponse.next();
  }

  // Check for existing auth cookie
  const adminCookie = request.cookies.get(ADMIN_COOKIE);
  if (adminCookie?.value === '1') {
    return NextResponse.next();
  }

  // Not authenticated: redirect to login, preserving the original destination
  const loginUrl = new URL('/keystatic-login', request.url);
  if (pathname) {
    loginUrl.searchParams.set('from', `${pathname}${search || ''}`);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};
