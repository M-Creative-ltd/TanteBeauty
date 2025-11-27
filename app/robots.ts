import { MetadataRoute } from 'next';
import { reader } from './reader';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await reader.singletons.seo.read();
  
  // Default robots configuration
  const allowIndex = seo?.robotsIndex ?? true;
  const allowFollow = seo?.robotsFollow ?? true;
  
  const robotsRules = {
    userAgent: '*',
    allow: allowIndex && allowFollow ? '/' : undefined,
    disallow: !allowIndex ? '/' : undefined,
  };

  return {
    rules: [robotsRules],
    sitemap: seo?.siteUrl ? `${seo.siteUrl}/sitemap.xml` : undefined,
  };
}


