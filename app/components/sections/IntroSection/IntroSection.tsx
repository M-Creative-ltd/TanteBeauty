import Image from '../../ui/Image/Image';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';
import Button from '../../ui/Button/Button';

import Image from 'next/image';

interface IntroSectionProps {
  image: string;
  logo?: string;
  copy: any; // markdoc node
  ctaLabel?: string;
  ctaTarget?: string;
  secondaryColor?: string;
  primaryColor?: string;
  accentIcon?: string;
}

export default function IntroSection({
  image,
  logo,
  copy,
  ctaLabel,
  ctaTarget,
  secondaryColor = '#fff7f5',
  primaryColor = '#014b3c',
  accentIcon,
}: IntroSectionProps) {
  return (
    <section 
      className="py-12 md:min-h-screen md:py-16 lg:py-20 flex items-center relative"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Product Display Image */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
              <Image
                src={image}
                alt="Product display"
                fill
                quality={100}
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right: Logo, Content, and CTA */}
          <div className="order-1 lg:order-2 text-center md:text-left">
            {/* Logo */}
            {logo && (
              <div className="mb-6 md:mb-8 flex justify-center md:justify-start">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <Image
                    src={logo}
                    alt="Logo"
                    fill
                    quality={100}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Markdoc Content */}
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center md:text-left mb-6 md:mb-8">
              <MarkdownContent content={copy} />
            </div>

            {/* CTA Button */}
            {ctaLabel && ctaTarget && (
              <div className="flex justify-center md:justify-start">
                <Button
                  label={ctaLabel}
                  href={ctaTarget}
                  primaryColor={primaryColor}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Arrow Icon - Center Bottom */}
      {accentIcon && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10" style={{ animation: 'bounceDown 2s ease-in-out infinite' }}>
          <Image
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
