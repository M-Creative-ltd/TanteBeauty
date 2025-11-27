import { MetadataRoute } from 'next';
import { reader } from './reader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await reader.singletons.seo.read();
  const baseUrl = seo?.siteUrl || 'https://tantebeauty.com';

  // Get all dynamic routes
  const productSlugs = await reader.collections.products.list();
   

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Product pages
  const productRoutes: MetadataRoute.Sitemap = await Promise.all(
    productSlugs.map(async (slug) => {
      const product = await reader.collections.products.read(slug);
      return {
        url: `${baseUrl}/products/${slug}`,
        lastModified: product ? new Date() : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    })
  );



  return [
    ...staticRoutes,
    ...productRoutes,
  ];
}


