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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-4 md:mb-16 items-center">
      {/* Large Image - Top on Mobile, Left on Desktop */}
      {service.image && (
        <div className="order-1 lg:order-1">
          {/* Using aspect-square ensures it's always square. 
              Using w-auto and h-[40vh] sets the height constraint.
              To force square with height constraint: height: 40vh, width: 40vh (aspect-square handles relation).
              But aspect-square is width-based usually. 
              Let's use aspect-square and fit it within the container.
          */}
          <div className="relative aspect-square w-auto h-[40vh] md:h-auto max-w-full mx-auto lg:max-w-none">
            <Image
              src={service.image}
              alt={service.title}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Service Title and Description - Bottom on Mobile, Right on Desktop */}
      <div className="order-2 lg:order-2 text-center md:text-left mb-4 md:mb-0">
        {service.categoryLabel && (
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-6"
            style={{ color: primaryColor }}
          >
            {service.categoryLabel}
          </h3>
        )}
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center md:text-left">
          {service.description}
        </div>
      </div>
    </div>
  );
}



