import Image from '../../ui/Image/Image';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';
import Button from '../../ui/Button/Button';

interface IntroSectionProps {
  image: string;
  logo?: string;
  copy: any; // markdoc node
  ctaLabel?: string;
  ctaTarget?: string;
  secondaryColor?: string;
  primaryColor?: string;
}

export default function IntroSection({
  image,
  logo,
  copy,
  ctaLabel,
  ctaTarget,
  secondaryColor = '#fff7f5',
  primaryColor = '#014b3c',
}: IntroSectionProps) {
  return (
    <section 
      className="py-12 md:min-h-screen md:py-16 lg:py-20 flex items-center md:snap-start"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-2xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: Product Display Image */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
              <Image
                src={image}
                alt="Product display"
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
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
                    quality={90}
                    sizes="(max-width: 768px) 128px, 160px"
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
    </section>
  );
}
