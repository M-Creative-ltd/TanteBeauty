import { reader } from "../../reader";
import Button from "../../components/ui/Button/Button";
import MarkdownContent from "../../components/ui/MarkdownContent/MarkdownContent";
import Image from "../../components/ui/Image/Image";

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
 console.log('slug', slug);

  const product = await reader.collections.products.read(slug);
  if (!product) {
    console.error(`Product not found: ${slug}`);
    return <div>Product not found!</div>;
  }
  const home = await reader.singletons.home.read();
  const contact = await reader.singletons.contact.read();
  const logo = home?.hero?.logo;

  // Format phone number for WhatsApp (remove spaces, +, etc.)
  const phoneNumber = contact?.phoneNumber?.replace(/[^0-9]/g, '') || '';
  const message = `Hello, I would like to order *${product?.name}*`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <section className="relative h-screen w-full overflow-hidden md:snap-start">
     <div className="flex md:min-h-vh">
       {logo && (
         <div className="absolute top-0 left-4 md:top-0 md:left-6 z-40" style={{ width: '16rem', height: '15rem' }}>
            <Image
              src={logo}
              alt="Tante Beauty Logo"
              width={480}
              height={480}
              priority
              quality={100}
              className="object-contain w-full h-full"
            />
          </div>
      )}
        <div>{product?.name}</div>    
        <div>
          <MarkdownContent content={product?.description || ''} />
        </div>
        <div className='outer-circle'>
          <div className='inner-circle'>
            <Image alt={product?.name || ''} src={product?.mainImage || ''} width={480} height={480}/>
          </div>
        </div>
        <Button label="Order Now" href={whatsappUrl} />
     </div>
    </section>
  );
}




