import { reader } from '../reader';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import ServicesSection from '../components/sections/ServicesSection/ServicesSection';
import MarkdownContent from '../components/ui/MarkdownContent/MarkdownContent';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await reader.singletons.seo.read();
  const productSettings = await reader.singletons.productSettings.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';
  
  const title = productSettings?.heading 
    ? `${productSettings.heading} | ${siteName}`
    : `Our Products | ${siteName}`;
  
  const description = productSettings?.descriptionText 
    || `Browse our collection of natural beauty products and services. ${seo?.defaultDescription || ''}`;

  return {
    title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/products`,
      siteName,
    },
    alternates: {
      canonical: `${siteUrl}/products`,
    },
  };
}

export default async function ProductsPage() {
  // Fetch settings
  const productSettings = await reader.singletons.productSettings.read();
  const serviceSettings = await reader.singletons.serviceSettings.read();

  // Fetch all products
  const productSlugs = await reader.collections.products.list();
  const allProducts = await Promise.all(
    productSlugs.map(async (slug) => {
      const productObject = await reader.collections.products.read(slug);
      if (!productObject) {
        return null;
      }
      const product = { ...productObject, slug: slug };
      return product;
    })
  );

  // Filter and sort products
  const products = allProducts
    .filter((product): product is NonNullable<typeof product> => product !== null)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Fetch all services
  const serviceSlugs = await reader.collections.services.list();
  const allServices = await Promise.all(
    serviceSlugs.map(async (slug) => {
      const service = await reader.collections.services.read(slug);
      return service;
    })
  );

  // Filter and sort services
  const services = allServices
    .filter((service): service is NonNullable<typeof service> => service !== null)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Fetch home singleton for theme colors
  const home = await reader.singletons.home.read();
  const primaryColor = home?.theme?.primaryColor || '#014b3c';

  // Transform products for component
  const transformedProducts = products.map((product) => ({
    name: product.name,
    slug: product.slug || '',
    mainImage: product.mainImage || undefined,
   }));


  // Transform services for component
  // Note: services use format: { contentField: 'description' }, so description is accessed via service.description()
  // We need to resolve the markdoc content here in the server component
  const transformedServices = await Promise.all(
    services.map(async (service) => {
      const descriptionContent = await service.description();
      // The content() method returns { node } structure, extract the node
      const descriptionNode = descriptionContent?.node || descriptionContent;
      
      return {
        title: service.title,
        categoryLabel: service.categoryLabel || undefined,
        description: <MarkdownContent content={descriptionNode} />, // Render MarkdownContent on server
        image: service.image || undefined,
      };
    })
  );

  return (
    <>
      {productSettings && (
        <ProductsSection
          heading={productSettings.heading}
          subtitle={productSettings.subtitle || undefined}
          descriptionText={productSettings.descriptionText || undefined}
          products={transformedProducts}
          primaryColor={primaryColor}
        />
      )}
      {serviceSettings && (
        <ServicesSection
          heading={serviceSettings.heading}
          services={transformedServices}
          primaryColor={primaryColor}
        />
      )}
    </>
  );
}
