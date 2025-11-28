export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';


const ADMIN_COOKIE = 'AuthToken';

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username')?.toString() || '';
 
  const password = formData.get('password')?.toString() || '';

  const adminUser = process.env.KEYSTATIC_ADMIN_USERNAME || '';
  const adminPass = process.env.KEYSTATIC_ADMIN_PASSWORD || '';
  const from = (formData.get('from')?.toString() || '/keystatic').trim() || '/keystatic';

  if (!adminUser || !adminPass || username !== adminUser || password !== adminPass) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const isProd = process.env.NODE_ENV === 'production';
  const payload = { username };
  const jwtSecretEnv = process.env.JWT_SECRET;

  // Fail closed: never issue a token if the signing secret is missing.
  if (!jwtSecretEnv) {
    
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }

  const secret = jwtSecretEnv as Secret;
  const expiresIn: SignOptions['expiresIn'] =
    (process.env.JWT_EXPIRATION || '2h') as SignOptions['expiresIn'];

  const token = jwt.sign(payload, secret, { expiresIn });

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: Number(expiresIn) || 2 * 60 * 60, // 2 hours
  });

  return response;
}
