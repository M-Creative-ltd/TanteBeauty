import Image from '../../ui/Image/Image';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';
import Image as NextImage from 'next/image';

interface WhySectionProps {
  heading: string;
  body: any; // markdoc node
  image: string;
  primaryColor?: string;
  accentIcon?: string;
}

export default function WhySection({
  heading,
  body,
  image,
  primaryColor = '#014b3c',
  accentIcon,
}: WhySectionProps) {
  return (
    <section className="py-12 md:min-h-screen md:py-16 lg:py-20 bg-white flex items-center relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Heading and Body Text */}
          <div className="order-1 lg:order-1 text-center md:text-left">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8"
              style={{ color: primaryColor }}
            >
              {heading}
            </h2>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center md:text-left">
              <MarkdownContent content={body} />
            </div>
          </div>

          {/* Right: Primary Image */}
          <div className="order-2 lg:order-2">
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
              <Image
                src={image}
                alt={heading}
                fill
                quality={100}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Arrow Icon - Center Bottom */}
      {accentIcon && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10" style={{ animation: 'bounceDown 2s ease-in-out infinite' }}>
          <NextImage
            src={accentIcon}
            alt=""
            width={72}
            height={72}
            quality={100}
            className="object-contain"
          />
        </div>
      )}
    </section>
  );
}
