import React from 'react';
import Image from '../../ui/Image/Image';

interface FocusedServiceDisplayProps {
  service: {
    title: string;
    categoryLabel?: string;
    description: React.ReactNode; // Rendered content
    image?: string;
  };
  primaryColor?: string;
}

export default function FocusedServiceDisplay({
  service,
  primaryColor = '#014b3c',
}: FocusedServiceDisplayProps) {
  return (
    <div className="w-full">
      <div className="mb-6 text-center md:text-left">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight line-clamp-2"
          style={{ color: primaryColor }}
        >
          {service.title}
        </h2>
        {service.categoryLabel && (
          <p
            className="mt-2 text-lg sm:text-xl md:text-2xl font-serif"
            style={{ color: primaryColor }}
          >
            {service.categoryLabel}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Description */}
        <div className="order-2 lg:order-1">
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center md:text-left">
            {service.description}
          </div>
        </div>

        {/* Image */}
        {service.image && (
          <div className="order-1 lg:order-2">
            <div className="relative w-full max-w-3xl mx-auto aspect-square sm:aspect-square md:aspect-square lg:aspect-square max-h-[70vh] sm:max-h-[65vh] md:max-h-[60vh] lg:max-h-[70vh] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



