'use client';

import { useState, useEffect } from 'react';
import Image from '../../ui/Image/Image';
import FocusedServiceDisplay from './FocusedServiceDisplay';

interface Service {
  title: string;
  categoryLabel?: string;
  description: any; // markdoc content node (already resolved)
  image?: string;
}

interface ServicesSectionProps {
  heading: string;
  services: Service[];
  primaryColor?: string;
}

export default function ServicesSection({
  heading,
  services,
  primaryColor = '#014b3c',
}: ServicesSectionProps) {
  const [focusedServiceIndex, setFocusedServiceIndex] = useState<number>(0);

  // Update focused service index when services change
  useEffect(() => {
    if (services.length > 0 && focusedServiceIndex >= services.length) {
      setFocusedServiceIndex(0);
    }
  }, [services, focusedServiceIndex]);

  if (services.length === 0) {
    return null;
  }

  const currentFocused = services[focusedServiceIndex] || services[0];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl w-full">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold"
            style={{ color: primaryColor }}
          >
            {heading}
          </h2>
        </div>

        {/* Focused Service Display - Top Section */}
        {currentFocused && (
          <FocusedServiceDisplay
            service={currentFocused}
            primaryColor={primaryColor}
          />
        )}

        {/* Service Grid - Bottom Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {services.slice(0, 6).map((service, index) => {
            const isFocused = index === focusedServiceIndex;
            return (
              <button
                key={service.title}
                onClick={() => setFocusedServiceIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                  isFocused
                    ? 'ring-4 ring-offset-2'
                    : 'opacity-75 hover:opacity-100'
                }`}
                style={{
                  ringColor: isFocused ? primaryColor : 'transparent',
                }}
                aria-label={`View ${service.title} service`}
              >
                {service.image && (
                  <>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={100}
                      className="object-cover"
                    />
                    {/* Category Label Overlay - Top Left */}
                    {service.categoryLabel && (
                      <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                        <span
                          className="text-xs sm:text-sm md:text-base font-serif font-bold px-2 py-1 rounded"
                          style={{
                            color: primaryColor,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          }}
                        >
                          {service.categoryLabel}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

