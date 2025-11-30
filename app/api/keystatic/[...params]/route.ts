import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../keystatic.config';

const { POST, GET: originalGet } = makeRouteHandler({
  config: keystaticConfig,
});

export { POST };

export async function GET(req: Request) {
  const url = new URL(req.url);
  // Only log relevant auth paths to reduce noise
  if (url.pathname.includes('/github')) {
    console.log(`[Keystatic API] GET request to: ${url.pathname}`);
    console.log(`[Keystatic API] Active storage kind: ${keystaticConfig.storage.kind}`);
  }

  try {
    return originalGet(req);
  } catch (err) {
    console.error('[Keystatic OAuth Error]', err);
    throw err;
  }
}
