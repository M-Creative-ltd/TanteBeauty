import { reader } from "../../reader";
import Button from "../../components/ui/Button/Button";
import MarkdownContent from "../../components/ui/MarkdownContent/MarkdownContent";
import Image from "../../components/ui/Image/Image";
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ProductParams = Promise<{ slug: string }>;
type ProductEntry = Awaited<ReturnType<typeof reader.collections.products.read>>;

// Pre-generate static pages for all products so Vercel serves them correctly
export async function generateStaticParams() {
  const slugs = await reader.collections.products.list();
  
  // The 'slugs' array contains the filenames without extension (which act as slugs)
  // Example: ['Acne cream', 'Acne bar soap', ...]
  // We map these directly to the { slug } param object required by Next.js
  return slugs
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: ProductParams }
): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const product = await reader.collections.products.read(slug);
  const seo = await reader.singletons.seo.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const productEntry = product as NonNullable<ProductEntry>;
  const productName = productEntry.name || slug;
  const title = `${productName} | ${siteName}`;
  const description = typeof productEntry.description === 'string'
    ? productEntry.description
    : `Discover ${productName} - a premium natural beauty product from ${siteName}`;
  
  const productImage = productEntry.mainImage 
    ? `${siteUrl}${product.mainImage}` 
    : seo?.ogImage 
      ? `${siteUrl}${seo.ogImage}` 
      : undefined;

  return {
    title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteUrl}/products/${encodeURIComponent(slug)}`,
      siteName,
      images: productImage ? [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: productImage ? [productImage] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: ProductParams }) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const product = await reader.collections.products.read(slug);

  if (!product) {
    notFound();
  }
  const productEntry = product as NonNullable<ProductEntry>;
  const home = await reader.singletons.home.read();
  const contact = await reader.singletons.contact.read();
  const logo = home?.productDetailLogo || home?.hero?.logo;

  // Format phone number for WhatsApp (remove spaces, +, etc.)
  const phoneNumber = contact?.phoneNumber?.replace(/[^0-9]/g, '') || '';
  const message = `Hello, I would like to order *${product?.name}*`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const descriptionContent = productEntry.description;
  const descriptionNode = typeof descriptionContent === 'function'
    ? await descriptionContent()
    : descriptionContent;
  const descriptionRenderable = descriptionNode?.node || descriptionNode || '';
  
  return (
    <section className="flex flex-col relative overflow-hidden h-fit md:snap-start bg-secondary">
      <div className="flex flex-col md:flex-row w-full md:h-screen">
        {/* Left side: logo, name, description */}
        <div className="relative md:w-1/2 flex flex-col py-10 gap-8 md:gap-12 mx-auto px-2 md:px-10xl justify-center">
          <div className="flex size-fit items-center flex-row mx-auto gap-2">
            {logo && (
              <span className="size-fit z-40 h-full w-fit">
                <Image
                  src={logo}
                  alt="Tante Beauty Logo"
                  width={45}
                  height={45}
                  priority
                  quality={90}
                  className="object-contain w-full h-full"
                />
              </span>
            )}
            <span className="flex items-center justify-center mx-3 text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary">
              {productEntry?.name || slug}
            </span>
          </div>

          <div className="text-lg md:text-xl lg:text-2xl md:max-w-2xl mx-auto font-serif h-fit text-primary text-center px-2 md:px-10">
            <MarkdownContent content={descriptionRenderable} />
          </div>
        </div>

        {/* Right side: product image */}
        <div className="md:w-1/2 flex items-center justify-center overflow-hidden">
          {product?.mainImage ? (
            <div className="h-full md:h-[90%] md:flex items-center justify-center md:justify-end overflow-hidden md:overflow-visible">
              <div className='outer-circle relative top-1/4 left-1/2 -translate-x-1/2 translate-y-20 md:top-0 md:left-auto md:translate-x-2 md:translate-y-0 md:mr-[-5vw] lg:mr-[-6vw] lg:translate-x-40 bg-[#8e9f84] p-3 md:p-4 rounded-full size-fit'>
                <div className='inner-circle relative bg-primary p-4 md:p-6 rounded-full w-[90vw] md:w-[80vh] aspect-square z-10'>
                  <img
                    alt={productEntry?.name || ''}
                    src={productEntry.mainImage || ''}
                    width={0}
                    height={0}
                    className="w-[70%] absolute top-1/2 md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-1/9 -translate-y-2/3 md:translate-y-1/5 rounded-full aspect-square"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          label="Order Now"
          href={whatsappUrl}
          className="relative mx-auto my-5 md:my-10 md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2"
        />
      </div>
    </section>
  );
}




