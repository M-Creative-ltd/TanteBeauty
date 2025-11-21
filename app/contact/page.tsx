import { reader } from '../reader';
import Image from '../components/ui/Image/Image';

export default async function ContactPage() {
  const contact = await reader.singletons.contact.read();
  const home = await reader.singletons.home.read();

  if (!contact) {
    return (
      <p>Contact information not found. Please configure the contact singleton in Keystatic.</p>
    );
  }

  const primaryColor = home?.theme?.primaryColor || '#014b3c';
  const secondaryColor = home?.theme?.secondaryColor || '#fff7f5';

  return (
    <section className="min-h-screen flex" style={{ backgroundColor: secondaryColor }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center mx-auto">
        {/* Left: Contact Photo - 50vh */}
        {contact.contactPhoto && (
          <div className="order-2 lg:order-1 relative w-full md:w-[50vh] h-[50vh] lg:h-[50vh] items-center justify-center mx-auto">
            <Image
              src={contact.contactPhoto}
              alt="Contact photo"
              fill
              quality={100}
              className="object-cover"
            />
          </div>
        )}

        {/* Right: Contact Information Section */}
        <div 
          className="order-1 lg:order-2 flex items-start justify-center w-full min-h-[50vh]  px-4 sm:px-6 md:px-8 lg:px-12"
          
        >
          <div className="w-full items-center md:items-start">
            {/* Main Heading - Full Width, Cormorant Garamond Italic */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant italic font-semibold mb-16 md:mb-20 text-left tracking-tight"
              style={{ color: primaryColor }}
            >
              CONTACT US
            </h1>

            {/* Contact Details - Label and Value on Same Line */}
            <div className="space-y-8 md:space-y-10 text-left">
              {/* Mailing Address */}
              {contact.mailingAddress && (
                <div className="flex flex-col min-w-full  sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-8">
                  <span
                    className="text-xl sm:text-2xl md:text-4xl min-w-[50%] font-cormorant italic font-medium whitespace-nowrap"
                    style={{ color: primaryColor }}
                  >
                    Mailing Address:
                  </span>
                  <span
                    className="text-xl sm:text-2xl font-cormorant italic font-medium hover:opacity-75 transition-opacity duration-200 cursor-pointer"
                    style={{ color: primaryColor }}
                  >
                    {contact.mailingAddress}
                  </span>
                </div>
              )}

              {/* Email Address */}
              {contact.emailAddress && (
                <div className="flex flex-col sm:flex-row  sm:items-center gap-3 sm:gap-6 md:gap-8">
                  <span
                    className="text-xl sm:text-2xl md:text-4xl  min-w-[50%] font-cormorant italic font-medium whitespace-nowrap"
                    style={{ color: primaryColor }}
                  >
                    Email Address:
                  </span>
                  <a
                    href={`mailto:${contact.emailAddress}`}
                    className="text-xl sm:text-2xl font-cormorant italic font-medium hover:opacity-75 transition-opacity duration-200"
                    style={{ color: primaryColor }}
                  >
                    {contact.emailAddress}
                  </a>
                </div>
              )}

              {/* Phone Number */}
              {contact.phoneNumber && (
                <div className="flex flex-col sm:flex-row  sm:items-center gap-3 sm:gap-6 md:gap-8">
                  <span
                    className="text-xl sm:text-2xl md:text-4xl min-w-[50%] font-cormorant italic font-medium whitespace-nowrap"
                    style={{ color: primaryColor }}
                  >
                    Phone Number:
                  </span>
                  <a
                    href={`tel:${contact.phoneNumber}`}
                    className="text-xl sm:text-2xl font-cormorant italic font-medium hover:opacity-75 transition-opacity duration-200"
                    style={{ color: primaryColor }}
                  >
                    {contact.phoneNumber}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
