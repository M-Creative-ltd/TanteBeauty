import { MetadataRoute } from 'next';
import { reader } from './reader';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await reader.singletons.seo.read();
  const baseUrl = seo?.siteUrl || 'https://tantebeauty.com';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
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

  



  return [
    ...staticRoutes,
  ];
}


