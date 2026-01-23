import ServiceCard from "../components/ui/ServiceCard/ServiceCard";
import { reader } from "../reader";

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

  return (
    <div>
      <h1>Services</h1>
      <div className="flex flex-col items-center justify-center sm:flex-row flex-wrap gap-[16px]">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={{...service, whatsappBaseUrl, phoneNumber}} />
        ))}
      </div>
    </div>
  );
}