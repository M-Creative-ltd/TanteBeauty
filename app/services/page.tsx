import ServiceCard from "../components/ui/ServiceCard/ServiceCard";
import { reader } from "../reader";
import Image from 'next/image';

export default async function ServicesPage() {
    const serviceSlugs = await reader.collections.services.list();

    const servicelist = await Promise.all(serviceSlugs.map(async (slug) => {
        const service = await reader.collections.services.read(slug);

        if (!service) {
            return null;
        }

        return { ...service, slug: slug };
    }));

    const services = servicelist.filter((service): service is NonNullable<typeof service> => service !== null);


    // Load contact information for WhatsApp and phone links
    const contact = await reader.singletons.contact.read();
    const phoneNumber = contact?.phoneNumber || '';
    const phoneNumberFormatted = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappBaseUrl = `https://wa.me/${phoneNumberFormatted}`;


    //fetch service settings
    const serviceSettings = await reader.singletons.serviceSettings.read();


  return (
    <div className="relative flex flex-col gap-[24px]">
      
      {/* Background Image */}
      <div className="relative w-full h-[50vh]">
          {serviceSettings?.introMobiImage ? (
            <>
              {/* Mobile hero image */}
              <Image
                src={serviceSettings.introMobiImage}
                alt=""
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover block md:hidden"
                style={{ objectFit: 'cover' }}
              />
              {/* Desktop / tablet hero image */}
              {serviceSettings?.introDeskImage && (
                <>
                <Image
                  src={serviceSettings.introDeskImage}
                  alt=""
                  fill
                  priority
                  quality={85}
                  sizes="100vw"
                  className="object-cover hidden md:block"
                  style={{ objectFit: 'cover' }}
                />
                </>
              )
              }
            </>
          ) : (
            <Image
              src={serviceSettings?.introDeskImage || ''}
              alt=""
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover border-2 border-blue-500"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="flex flex-col item-center justify-center w-full">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary font-serif">{serviceSettings?.heading}</h1>
          <h3 className='px-[12px] justify-center md:text-center'>{serviceSettings?.subHeading}</h3>
        </div>

        <div className="w-full h-fit flex flex-col items-center justify-center sm:flex-row flex-wrap gap-[0px] md:gap-[16px] lg:gap-[32px]">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={{...service, whatsappBaseUrl, phoneNumber}} />
          ))}
        </div>
    </div>
   
  );
}