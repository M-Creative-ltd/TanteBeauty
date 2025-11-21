import { reader } from '../reader';
import ProductsSection from '../components/sections/ProductsSection/ProductsSection';
import ServicesSection from '../components/sections/ServicesSection/ServicesSection';
import MarkdownContent from '../components/ui/MarkdownContent/MarkdownContent';

export default async function ProductsPage() {
  // Fetch settings
  const productSettings = await reader.singletons.productSettings.read();
  const serviceSettings = await reader.singletons.serviceSettings.read();

  // Fetch all products
  const productSlugs = await reader.collections.products.list();
  const allProducts = await Promise.all(
    productSlugs.map(async (slug) => {
      const product = await reader.collections.products.read(slug);
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
