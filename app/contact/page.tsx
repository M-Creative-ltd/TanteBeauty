import { reader } from '../reader';
import Image from '../components/ui/Image/Image';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await reader.singletons.seo.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';
  
  const title = `Contact Us | ${siteName}`;
  const description = `Get in touch with Tante Beauty. Find our contact information including address, email, and phone number. We'd love to hear from you!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/contact`,
      siteName,
    },
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
  };
}

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
    <section 
      className="py-12 md:min-h-screen md:py-16 lg:py-20 flex items-center"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-2xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: Contact Photo */}
          <div className="order-2 lg:order-1">
            {contact.contactPhoto && (
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
                <Image
                  src={contact.contactPhoto}
                  alt="Contact photo"
                  fill
                  quality={100}
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Right: Contact Information Section */}
          <div className="order-1 lg:order-2 text-center md:text-left">
            <div className="w-full items-center md:items-start">
              {/* Main Heading - Full Width, Cormorant Garamond Italic */}
              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-cormorant italic mb-16 md:mb-20 text-left tracking-tight"
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
                      className="text-xl sm:text-2xl md:text-4xl min-w-[50%] font-cormorant italic font-semibold whitespace-nowrap"
                      style={{ color: primaryColor }}
                    >
                      Mailing Address:
                    </span>
                    <span
                      className="text-xl sm:text-2xl font-cormorant italic hover:opacity-75 transition-opacity duration-200 cursor-pointer"
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
                      className="text-xl sm:text-2xl md:text-4xl  min-w-[50%] font-cormorant italic font-semibold whitespace-nowrap"
                      style={{ color: primaryColor }}
                    >
                      Email Address:
                    </span>
                    <a
                      href={`mailto:${contact.emailAddress}`}
                      className="text-xl sm:text-2xl font-cormorant italic hover:opacity-75 transition-opacity duration-200"
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
                      className="text-xl sm:text-2xl md:text-4xl min-w-[50%] font-cormorant italic font-semibold whitespace-nowrap"
                      style={{ color: primaryColor }}
                    >
                      Phone Number:
                    </span>
                    <a
                      href={`tel:${contact.phoneNumber}`}
                      className="text-xl sm:text-2xl font-cormorant italic hover:opacity-75 transition-opacity duration-200"
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
      </div>
    </section>
  );
}
