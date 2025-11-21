import Image from 'next/image';

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  ctaLabel: string;
  ctaTarget: string;
  image: string;
  logo?: string;
  accentIcon?: string;
  primaryColor?: string;
}

export default function HeroSection({
  heading,
  subheading,
  ctaLabel,
  ctaTarget,
  image,
  logo,
  accentIcon,
  primaryColor = '#014b3c',
}: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          quality={100}
          className="object-cover"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Logo - Top Left */}
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

      {/* Heading - Bottom Left */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-30">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight"
          style={{ color: primaryColor }}
        >
          {heading}
        </h1>
      </div>

      {/* Arrow Icon - Center Bottom */}
      {accentIcon && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30" style={{ animation: 'bounceDown 2s ease-in-out infinite' }}>
          <Image
            src={accentIcon}
            alt=""
            width={72}
            height={72}
            priority
            quality={100}
            className="object-contain"
          />
        </div>
      )}
    </section>
  );
}

