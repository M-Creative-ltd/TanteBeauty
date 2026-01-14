'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

// Define the Service interface
interface Service {
  title: string;
  categoryLabel?: string;
  description: any; // Rendered content
  image?: string;
}

// Define props for the main ServicesSection component
interface ServicesSectionProps {
  heading: string;
  services: Service[];
  primaryColor?: string;
}

// --- FocusedServiceDisplay Component (Helper) ---
// This handles the layout within a single slide
const FocusedServiceDisplay: React.FC<{ service: Service; primaryColor: string }> = ({ service, primaryColor }) => {
  return (
    // Add standard 'paper margins' padding to the full-width slide
    <div className="p-4 sm:p-8 md:p-12 h-full flex flex-col justify-center">
      
      {/* Container for the 2-column layout (Text left, Image right) */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        
        {/* Left Side: Text Content (Occupies full width on mobile, half on MD+) */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
            {service.title}
          </h3>
          <div className="text-gray-600">{service.description}</div>
          {/* Ensure the actual image URL is used here */}
          {service.image && <p className="text-xs mt-4">Image Source: {service.image}</p>}
        </div>

        {/* Right Side: Image Container */}
        <div className="md:w-1/2">
          {/* Image wrapper to control aspect ratio responsively using intrinsic ratios and Tailwind aspect-ratio plugin classes */}
          {/* Note: If you don't have the Tailwind aspect-ratio plugin installed, you'll need to use the padding-bottom hack */}
          <div className="relative w-full aspect-w-4 aspect-h-5 md:aspect-w-1 md:aspect-h-1">
            {service.image ? (
                <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full rounded-lg shadow-xl"
                />
            ) : (
                <div className="absolute inset-0 bg-gray-200 rounded-lg shadow-xl flex items-center justify-center">
                    <span className="text-gray-500">Service Image Placeholder (1:1/4:5 aspect ratio)</span>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main ServicesSection Component ---
export default function ServicesSection({
  heading,
  services,
  primaryColor = '#014b3c',
}: ServicesSectionProps) {
  const [focusedServiceIndex, setFocusedServiceIndex] = useState<number>(0);
  // Removed isAtStart/isAtEnd state as we manage disabled state via index now
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  const scrollBehavior = useMemo<ScrollBehavior>(
    () => (prefersReducedMotion ? 'auto' : 'smooth'),
    [prefersReducedMotion]
  );

  // Derived state for button disabled status (purely index-based now)
  const isAtStart = focusedServiceIndex === 0;
  const isAtEnd = focusedServiceIndex === services.length - 1;

  // Update focused service index when services change
  useEffect(() => {
    if (services.length > 0 && focusedServiceIndex >= services.length) {
      setFocusedServiceIndex(0);
    }
  }, [services, focusedServiceIndex]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Add native wheel event listener with passive: false to ensure preventDefault works
  useEffect(() => {
    const hoverArea = hoverAreaRef.current;
    if (!hoverArea) return;

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !isHoveringRef.current) return;
      const container = scrollContainerRef.current;

      if (isScrollingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }

      const scrollDelta = e.deltaY;
      const scrollDirection = scrollDelta > 0 ? 'down' : 'up';

      // Use current focused index to determine boundaries
      const isAtFirstItem = focusedServiceIndex === 0;
      const isAtLastItem = focusedServiceIndex === services.length - 1;

      // When at absolute start/end index, allow page scroll
      if ((isAtFirstItem && scrollDirection === 'up') || (isAtLastItem && scrollDirection === 'down')) {
        return;
      }
      
      // Prevent default to stop page scroll and handle mid-list stepping via debounce.
      e.preventDefault();
      e.stopPropagation();

      // Debounce logic remains the same to handle mid-scroll stepping
      scrollDebounceRef.current = setTimeout(() => {
        if (!scrollContainerRef.current) return;
        
        const slides = Array.from(container.querySelectorAll('[data-service-slide]')) as HTMLElement[];
        if (slides.length === 0) return;

        // Find current item closest to center
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let currentIndex = 0;
        let minDistance = Infinity;

        slides.forEach((slide, index) => {
          const itemCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const distance = Math.abs(containerCenter - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            currentIndex = index;
          }
        });

        // Calculate next/previous item based on scroll direction
        let targetIndex: number;
        if (scrollDirection === 'down') {
          targetIndex = Math.min(currentIndex + 1, slides.length - 1);
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        if (targetIndex !== currentIndex && slides[targetIndex]) {
          isScrollingRef.current = true;
          const targetSlide = slides[targetIndex];
          
          // Since slides are full screen width (w-screen), the offsetLeft is exactly where we need to scroll to
          const targetPosition = targetSlide.offsetLeft; 

          container.scrollTo({
            left: targetPosition,
            behavior: scrollBehavior,
          });

          setFocusedServiceIndex(targetIndex);

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 300);
        }
      }, 50);
    };

    hoverArea.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      hoverArea.removeEventListener('wheel', handleWheel);
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current);
      }
    };
  }, [services.length, focusedServiceIndex, scrollBehavior]);

  if (services.length === 0) {
    return null;
  }

  const currentFocused = services[focusedServiceIndex] || services[0];

  // Simplified handleScroll: only updates focused index and does NOT manage pixel-based boundaries
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    // Calculate center item
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    const slides = Array.from(container.querySelectorAll('[data-service-slide]'));
    slides.forEach((slide, index) => {
      const element = slide as HTMLElement;
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

  const scrollToIndex = (targetIndex: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const slides = Array.from(container.querySelectorAll('[data-service-slide]'));
    const targetSlide = slides[targetIndex] as HTMLElement | undefined;
    if (!targetSlide) return;

    // Scroll directly to the left edge of the full-width slide
    const targetPosition = targetSlide.offsetLeft;

    container.scrollTo({
      left: targetPosition,
      behavior: scrollBehavior,
    });
    setFocusedServiceIndex(targetIndex);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    const lastIndex = services.length - 1;
    const nextIndex =
      direction === 'next'
        ? Math.min(focusedServiceIndex + 1, lastIndex)
        : Math.max(focusedServiceIndex - 1, 0);
    scrollToIndex(nextIndex);
  };
  
  // Removed the useEffect that called updateBoundaries based on index change

  useEffect(() => {
    // We only need to call handleScroll initially to sync state
    handleScroll();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleArrowClick('next');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleArrowClick('prev');
    }
  };

  return (
    // Updated container: removed items-stretch and made height a min-height for robustness
    <section className="py-12 md:py-16 lg:py-20 bg-secondary min-h-[98vh] flex items-center">
      <div className="mx-auto w-full flex flex-col h-full"> 
        
        {/* Heading remains centered within the normal document flow/margin area */}
        <div className="text-center mb-8 md:mb-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold"
            style={{ color: primaryColor }}
          >
            {heading}
          </h2>
          <p className="mt-3 text-sm md:hidden text-primary/80">
            Swipe to explore all services →
          </p>
        </div>

        {/* This div is now just for tracking hover state for the mouse wheel functionality */}
        <div
          ref={hoverAreaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col justify-between md:justify-center w-full cursor-grab active:cursor-grabbing"
        >

            {/* Service Scroll List - This container manages the horizontal flow */}
            <div className="relative w-full">
              {/* No gradient overlays needed */}

              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                // Key changes: Removed gap utilities. Slides use w-screen now.
                className="flex overflow-x-auto items-stretch snap-x snap-mandatory focus:outline-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ensure cross-browser scrollbar hiding if needed
                role="region"
                aria-roledescription="carousel"
                aria-label="Service list, horizontal scroll"
                tabIndex={0}
              >
                
                {/* We need to re-add the webkit scrollbar hide for chrome/safari */}
                <style jsx global>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {services.map((service, index) => (
                  <div
                    key={service.title}
                    data-service-slide
                    className="relative flex-shrink-0 w-screen snap-center" // <-- KEY CHANGE: w-screen for true full-width slides
                    aria-label={`Service ${service.title}`}
                    aria-roledescription="slide"
                  >
                    <FocusedServiceDisplay
                      service={service}
                      primaryColor={primaryColor}
                    />
                  </div>
                ))}
              </div>

              {/* Arrow controls (desktop) - Positioned in the "paper margins" area */}
              <div className="hidden md:flex items-center justify-between pointer-events-none absolute inset-y-0 inset-x-0 px-4 md:px-8 lg:px-12">
                <button
                  type="button"
                  onClick={() => handleArrowClick('prev')}
                  className={`pointer-events-auto rounded-full border bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-2 hover:scale-110 active:scale-95 disabled:opacity-50`}
                  style={{ borderColor: primaryColor, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '40px', height: '40px' }}
                  aria-label="Scroll to previous service"
                  disabled={isAtStart}
                >
                  <span className="text-2xl" style={{ color: primaryColor }}>‹</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleArrowClick('next')}
                  className={`pointer-events-auto rounded-full border bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-2 hover:scale-110 active:scale-95 disabled:opacity-50`}
                  style={{ borderColor: primaryColor, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '40px', height: '40px' }}
                  aria-label="Scroll to next service"
                  disabled={isAtEnd}
                >
                  <span className="text-2xl" style={{ color: primaryColor }}>›</span>
                </button>
              </div>
            </div>

            {/* Pagination dots remain the same, centered below the main content area */}
            <div className="mt-4 md:mt-6 mb-4 md:mb-8 flex items-center justify-center gap-2" aria-label="Service pagination">
              {services.map((service, index) => {
                const isActive = index === focusedServiceIndex;
                return (
                  <button
                    key={`${service.title}-dot`}
                    onClick={() => scrollToIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2`}
                    style={{
                      width: isActive ? '26px' : '12px',
                      opacity: isActive ? 1 : 0.5,
                      backgroundColor: primaryColor,
                    }}
                    aria-label={`Go to ${service.title}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {`Viewing service ${focusedServiceIndex + 1} of ${services.length}: ${currentFocused?.title || ''}`}
            </div>

        </div> {/* End of hover area div */}

      </div>
    </section>
  );
}
