'use client';

import { useState, useEffect, useRef } from 'react';
import Image from '../../ui/Image/Image';
import FocusedServiceDisplay from './FocusedServiceDisplay';

interface Service {
  title: string;
  categoryLabel?: string;
  description: React.ReactNode; // Rendered content
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  // Update focused service index when services change
  useEffect(() => {
    if (services.length > 0 && focusedServiceIndex >= services.length) {
      setFocusedServiceIndex(0);
    }
  }, [services, focusedServiceIndex]);

  // Add native wheel event listener with passive: false to ensure preventDefault works
  useEffect(() => {
    const hoverArea = hoverAreaRef.current;
    if (!hoverArea) return;

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !isHoveringRef.current) return;
      const container = scrollContainerRef.current;

      // Prevent if already scrolling to avoid conflicts
      if (isScrollingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Clear any existing debounce
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }

      const scrollDelta = e.deltaY;
      const scrollDirection = scrollDelta > 0 ? 'down' : 'up';

      // Calculate boundary positions
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      const maxScroll = scrollWidth - clientWidth;
      const threshold = 10;

      // Use current focused index to determine boundaries
      // This prevents skipping items when near the edge but not at the very last item
      const isAtFirstItem = focusedServiceIndex === 0;
      const isAtLastItem = focusedServiceIndex === services.length - 1;

      // Only allow page scroll if we are TRULY at the start/end item AND scrolling in that direction
      // AND we are physically at the scroll boundary
      const isAtStartBoundary = scrollLeft <= threshold;
      const isAtEndBoundary = scrollLeft >= maxScroll - threshold;

      const shouldAllowPageScroll = (isAtFirstItem && isAtStartBoundary && scrollDirection === 'up') || 
                                   (isAtLastItem && isAtEndBoundary && scrollDirection === 'down');

      if (shouldAllowPageScroll) {
        // Allow natural page scroll at boundaries
        return;
      }

      // Prevent default to stop page scroll
      e.preventDefault();
      e.stopPropagation();

      // Debounce: wait a bit to see if more scroll events come
      scrollDebounceRef.current = setTimeout(() => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const buttons = Array.from(container.querySelectorAll('button')) as HTMLElement[];
        if (buttons.length === 0) return;

        // Find current item closest to center
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let currentIndex = 0;
        let minDistance = Infinity;

        buttons.forEach((button, index) => {
          const itemCenter = button.offsetLeft + button.offsetWidth / 2;
          const distance = Math.abs(containerCenter - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            currentIndex = index;
          }
        });

        // Calculate next/previous item based on scroll direction
        let targetIndex: number;
        if (scrollDirection === 'down') {
          // Scrolling down = move to next item (right)
          targetIndex = Math.min(currentIndex + 1, buttons.length - 1);
        } else {
          // Scrolling up = move to previous item (left)
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        // Only scroll if target is different from current
        if (targetIndex !== currentIndex && buttons[targetIndex]) {
          isScrollingRef.current = true;
          const targetButton = buttons[targetIndex];
          const targetPosition = targetButton.offsetLeft - (container.clientWidth / 2) + (targetButton.offsetWidth / 2);

          container.scrollTo({
            left: Math.max(0, Math.min(targetPosition, maxScroll)),
            behavior: 'smooth'
          });

          // Update focused index
          setFocusedServiceIndex(targetIndex);

          // Reset scrolling flag after animation completes
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 300); // Smooth scroll typically takes ~300ms
        }
      }, 50); // Small debounce to batch rapid scrolls
    };

    // Add event listener with passive: false to ensure preventDefault works
    hoverArea.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      hoverArea.removeEventListener('wheel', handleWheel);
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, [services.length, focusedServiceIndex]); // Add focusedServiceIndex to deps for accurate boundary checks

  if (services.length === 0) {
    return null;
  }

  const currentFocused = services[focusedServiceIndex] || services[0];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    // Relaxed Edge Handling:
    // Removed aggressive force-set logic. 
    // Instead, we rely on the center calculation below to update state naturally.

    // Calculate center item
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    const buttons = Array.from(container.querySelectorAll('button'));
    buttons.forEach((button, index) => {
        const element = button as HTMLElement;
        // Calculate center relative to scroll parent
        const itemCenter = element.offsetLeft + element.offsetWidth / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    if (closestIndex !== focusedServiceIndex) {
       setFocusedServiceIndex(closestIndex);
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  const handleItemClick = (index: number) => {
    setFocusedServiceIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttons = Array.from(container.querySelectorAll('button'));
      const targetButton = buttons[index] as HTMLElement;

      if (targetButton) {
        container.scrollTo({
            left: targetButton.offsetLeft - (container.clientWidth / 2) + (targetButton.offsetWidth / 2),
            behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary">
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
          <div className="mb-8 md:mb-12">
            <FocusedServiceDisplay
              service={currentFocused}
              primaryColor={primaryColor}
            />
          </div>
        )}

        {/* Hover Area with 3rem padding around the scroll list */}
        <div
          ref={hoverAreaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col justify-center cursor-grab active:cursor-grabbing pt-8 -mt-8"
        >
          {/* Service Scroll List - Bottom Section */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto items-center snap-x snap-mandatory gap-4 md:gap-6 py-6 md:py-8 no-scrollbar"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE and Edge */
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Add explicit padding container to allow first/last items to be centered/aligned
                Mobile: Keep somewhat centered (30vw).
                MD+: Start at the start of screen (approx 2rem).
            */}
            <div className="min-w-[30vw] md:min-w-[2rem]" />

            {services.map((service, index) => {
              const isFocused = index === focusedServiceIndex;
              return (
                <button
                  key={service.title}
                  onClick={() => handleItemClick(index)}
                  className={`relative flex-shrink-0 w-[40%] md:w-[25%] lg:w-[16.666%] aspect-square snap-center overflow-hidden rounded-lg transition-all duration-300 ${
                    isFocused
                      ? 'ring-4 ring-offset-2'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    // @ts-ignore
                    '--tw-ring-color': isFocused ? primaryColor : 'transparent',
                    borderColor: isFocused ? primaryColor : 'transparent',
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
            <div className="min-w-[30vw] md:min-w-[2rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
