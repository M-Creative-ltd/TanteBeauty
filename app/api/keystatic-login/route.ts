import { NextResponse } from 'next/server';

const ADMIN_COOKIE = 'keystatic_admin';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const adminUser = process.env.KEYSTATIC_ADMIN_USERNAME || '';
  const adminPass = process.env.KEYSTATIC_ADMIN_PASSWORD || '';

  const from = (formData.get('from')?.toString() || '/keystatic').trim() || '/keystatic';

  if (!adminUser || !adminPass || username !== adminUser || password !== adminPass) {
    const loginUrl = new URL('/keystatic-login', request.url);
    loginUrl.searchParams.set('error', '1');
    return NextResponse.redirect(loginUrl, { status: 302 });
  }

  const response = NextResponse.redirect(new URL(from, request.url));
  const isProd = process.env.NODE_ENV === 'production';

  response.cookies.set(ADMIN_COOKIE, '1', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 3, // 3 hours
  });

  return response;
}
