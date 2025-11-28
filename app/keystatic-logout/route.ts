import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'AuthToken';

export async function GET(request: Request) {
  
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

