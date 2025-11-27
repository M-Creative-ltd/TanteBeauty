import { reader } from "../../reader";
import Button from "../../components/ui/Button/Button";
import MarkdownContent from "../../components/ui/MarkdownContent/MarkdownContent";
import Image from "../../components/ui/Image/Image";
import type { Metadata } from 'next';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await reader.collections.products.read(slug);
  const seo = await reader.singletons.seo.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const title = `${product.name} | ${siteName}`;
  const description = product.description 
    ? (typeof product.description === 'string' 
        ? product.description 
        : 'Premium natural beauty product from Tante Beauty')
    : `Discover ${product.name} - a premium natural beauty product from ${siteName}`;
  
  const productImage = product.mainImage 
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
      url: `${siteUrl}/products/${slug}`,
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

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const product = await reader.collections.products.read(slug);
  if (!product) {
    return <div>Product not found!</div>;
  }
  const home = await reader.singletons.home.read();
  const contact = await reader.singletons.contact.read();
  const logo = home?.productDetailLogo || home?.hero?.logo;

  // Format phone number for WhatsApp (remove spaces, +, etc.)
  const phoneNumber = contact?.phoneNumber?.replace(/[^0-9]/g, '') || '';
  const message = `Hello, I would like to order *${product?.name}*`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <section className="flex relative overflow-hidden h-fit md:snap-start bg-secondary">
     <div className="flex flex-col md:flex-row w-full md:h-screen">
      {/*left side*/}
      <div className="relative md:w-1/2 flex flex-col py-10 md:py-16 gap-8 md:gap-12 mx-auto px-2 md:px-10xl">
          {/* Logo and product name */}
          <div className="flex size-fit items-center flex-row mx-auto gap-2">
          {logo && (
            <span className="size-fit z-40 h-full w-fit">
                <Image
                  src={logo}
                  alt="Tante Beauty Logo"
                  width={45}
                  height={45}
                  priority
                  quality={100}
                  className="object-contain w-full h-full"
                />
              </span>
          )}
            <span className="flex items-center justify-center mx-3 text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-primary">{product?.name}</span>    
            </div>
            {/* Product description */}
            <div className="text-lg md:text-xl lg:text-2xl md:max-w-2xl mx-auto font-serif h-fit text-primary text-center px-2 md:px-10">
              <MarkdownContent content={product?.description || ''} />
            </div>
          </div>  
          {/* Product image and designs */}
          <div className="h-full md:h-[90%] overflow-hidden">
            <div className='outer-circle relative top-1/4 left-1/2 -translate-x-1/2 translate-y-1 md:top-1/2 md:left-0 md:translate-x-0 lg:left-1/6 lg:translate-x-0 lg:-translate-y-1/2 md:-translate-y-1/2 bg-[#8e9f84] p-3 md:p-4 rounded-full size-fit'>
              <div className='inner-circle relative bg-primary p-4 md:p-6 rounded-full w-[90vw] md:w-[80vh] aspect-square z-10'>
                <img alt={product?.name || ''} src={product?.mainImage || ''} width={0} height={0} className="w-[70%] absolute top-1/2 md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-1/9 -translate-y-2/3 md:translate-y-1/5 rounded-full aspect-square"/>
              </div>
            </div>
            {/* Order now button */}
           
        </div> 
        <Button label="Order Now" href={whatsappUrl} className="relative mx-auto my-5 md:my-10 md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2" />
      </div> 
      
    </section>
  );
}




