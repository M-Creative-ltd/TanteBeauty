import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'keystatic_admin';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/keystatic-login', request.url));
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

