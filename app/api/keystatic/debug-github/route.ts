import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  console.log('GitHub OAuth Callback Code:', code);

  try {
    const tokenRes = await fetch(
      `https://github.com/login/oauth/access_token`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          client_id: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
          client_secret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
          code,
        }),
    });

    const text = await tokenRes.text();
    console.log("GitHub OAuth response raw:", text);
    
    // Keystatic expects to handle the exchange internally, but if we are intercepting 
    // it for debugging, we might interfere with Keystatic's own flow if we consume the code.
    // However, the user wants to debug why it's failing.
    // The Keystatic route handler typically handles /api/keystatic/github/oauth/callback
    // We can't easily "inject" code into the library function `makeRouteHandler`.
    
    // BUT, we can create a temporary specific route handler for debugging 
    // to check if the credentials are correct and if GitHub returns a token.
    
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        data = text;
    }

    return NextResponse.json({ 
      message: 'Debug callback check', 
      githubResponse: data,
      envCheck: {
        hasClientId: !!process.env.KEYSTATIC_GITHUB_CLIENT_ID,
        hasClientSecret: !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET
      }
    });

  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

