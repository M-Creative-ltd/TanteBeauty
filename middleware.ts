import { NextResponse, type NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const ADMIN_COOKIE = 'AuthToken';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

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

  const jwtSecretEnv = process.env.JWT_SECRET;

  // If there is no token or no secret configured, fail closed and require login.
  if (!adminCookie?.value || !jwtSecretEnv) {
    const response = NextResponse.redirect(new URL('/keystatic-login?error=2', request.url));
    response.cookies.delete(ADMIN_COOKIE);
    return response;
  }

  // Check if the token is valid
  try {
    const decoded = jwt.verify(adminCookie.value, jwtSecretEnv) as { username: string };
    if (decoded && decoded.username && decoded.username === process.env.KEYSTATIC_ADMIN_USERNAME) {
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(new URL('/keystatic-login?error=3', request.url));
    }
  }
  catch (error) {
    const response = NextResponse.redirect(new URL('/keystatic-login?error=4', request.url));
    response.cookies.delete(ADMIN_COOKIE);
    return response;
  }
}
  
export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};
