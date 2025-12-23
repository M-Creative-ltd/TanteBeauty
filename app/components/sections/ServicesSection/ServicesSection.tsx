'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import FocusedServiceDisplay from './FocusedServiceDisplay';

interface Service {
  title: string;
  categoryLabel?: string;
  description: any; // Rendered content
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
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

  // Update focused service index when services change
  useEffect(() => {
    if (services.length > 0 && focusedServiceIndex >= services.length) {
      setFocusedServiceIndex(0);
    }
  }, [services, focusedServiceIndex]);

  // Respect prefers-reduced-motion to tone down animation intensity
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

      // At the very start with the first item focused and scrolling up: allow page scroll.
      const shouldAllowPageScroll = isAtFirstItem && isAtStartBoundary && scrollDirection === 'up';

      if (shouldAllowPageScroll) {
        return;
      }

      // When we've reached the horizontal end and keep scrolling down,
      // step focus through the remaining services until the very last one
      // has been focused, then allow the page to scroll.
      if (isAtEndBoundary && scrollDirection === 'down' && services.length > 0) {
        const lastIndex = services.length - 1;

        if (!isAtLastItem) {
          e.preventDefault();
          e.stopPropagation();

          const targetIndex = Math.min(focusedServiceIndex + 1, lastIndex);
          const slides = Array.from(container.querySelectorAll('[data-service-slide]')) as HTMLElement[];
          const targetSlide = slides[targetIndex] as HTMLElement | undefined;

          if (targetSlide) {
            const targetPosition =
              targetSlide.offsetLeft - container.clientWidth / 2 + targetSlide.offsetWidth / 2;

            isScrollingRef.current = true;
            container.scrollTo({
              left: Math.max(0, Math.min(targetPosition, maxScroll)),
              behavior: scrollBehavior,
            });

            setFocusedServiceIndex(targetIndex);

            setTimeout(() => {
              isScrollingRef.current = false;
            }, 300);
          }

          return;
        }

        // Already at the last item and at the end: let the page scroll.
        return;
      }

      // Prevent default to stop page scroll and handle mid-list stepping via debounce.
      e.preventDefault();
      e.stopPropagation();

      // Debounce: wait a bit to see if more scroll events come
      scrollDebounceRef.current = setTimeout(() => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
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
          // Scrolling down = move to next item (right)
          targetIndex = Math.min(currentIndex + 1, slides.length - 1);
        } else {
          // Scrolling up = move to previous item (left)
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        // Only scroll if target is different from current
        if (targetIndex !== currentIndex && slides[targetIndex]) {
          isScrollingRef.current = true;
          const targetSlide = slides[targetIndex];
          const targetPosition =
            targetSlide.offsetLeft - container.clientWidth / 2 + targetSlide.offsetWidth / 2;

          container.scrollTo({
            left: Math.max(0, Math.min(targetPosition, maxScroll)),
            behavior: scrollBehavior,
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
  }, [services.length, focusedServiceIndex, scrollBehavior]); // Add focusedServiceIndex to deps for accurate boundary checks

  if (services.length === 0) {
    return null;
  }

  const currentFocused = services[focusedServiceIndex] || services[0];

  const updateBoundaries = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;
    const maxScroll = scrollWidth - clientWidth;
    const threshold = 24;
    setIsAtStart(scrollLeft <= threshold);
    setIsAtEnd(scrollLeft >= maxScroll - threshold);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    updateBoundaries();
    
    // Relaxed Edge Handling:
    // Removed aggressive force-set logic. 
    // Instead, we rely on the center calculation below to update state naturally.

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

    const targetPosition =
      targetSlide.offsetLeft - container.clientWidth / 2 + targetSlide.offsetWidth / 2;

    container.scrollTo({
      left: Math.max(0, Math.min(targetPosition, container.scrollWidth)),
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

  useEffect(() => {
    updateBoundaries();
  }, [focusedServiceIndex, services.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    updateBoundaries();
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
    <section className="py-12 md:py-16 lg:py-20 bg-secondary md:h-[98vh] gap-12 flex items-stretch">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full flex flex-col h-full">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
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

        {/* Hover Area with 3rem padding around the scroll list */}
        <div
          ref={hoverAreaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col justify-between md:justify-center gap-6 cursor-grab active:cursor-grabbing pt-8 -mt-8 md:min-h-[70vh] lg:min-h-[75vh]"
        >
          {/* Service Scroll List - Bottom Section */}
          <div className="relative">
            {/* Gradients to hint overflow */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary via-secondary/70 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary via-secondary/70 to-transparent" aria-hidden="true" />

            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              className="flex overflow-x-auto items-stretch snap-x snap-mandatory gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-6 md:py-10 lg:py-12 no-scrollbar focus:outline-none md:h-[575px]"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
              }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Service list, horizontal scroll"
              tabIndex={0}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {/* Add explicit padding container to allow first/last items to be centered/aligned */}
              <div className="min-w-[6vw] sm:min-w-[4vw] md:min-w-[3vw]" />

              {services.map((service, index) => (
                <div
                  key={service.title}
                  data-service-slide
                  className="relative flex-shrink-0 w-[94vw] sm:w-[90vw] md:w-[88vw] lg:w-[86vw] xl:w-[84vw] 2xl:w-[80vw] snap-center"
                  aria-label={`Service ${service.title}`}
                  aria-roledescription="slide"
                >
                  <FocusedServiceDisplay
                    service={service}
                    primaryColor={primaryColor}
                  />
                </div>
              ))}

              <div className="min-w-[6vw] sm:min-w-[4vw] md:min-w-[3vw]" />
            </div>

            {/* Arrow controls (desktop) */}
            <div className="hidden md:flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={() => handleArrowClick('prev')}
                className={`pointer-events-auto absolute left-0 -translate-x-[20px] top-1/2 -translate-y-1/2 rounded-full border bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-2 hover:scale-110 active:scale-95`}
                style={{ borderColor: primaryColor, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '25px' }}
                aria-label="Scroll to previous service"
                disabled={isAtStart}
              >
                <span className="text-xl" style={{ color: primaryColor }}>‹</span>
              </button>
              <button
                type="button"
                onClick={() => handleArrowClick('next')}
                className={`pointer-events-auto absolute right-0 translate-x-[20px] top-1/2 -translate-y-1/2 rounded-full border bg-white/90 p-2 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-2 hover:scale-110 active:scale-95`}
                style={{ borderColor: primaryColor, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', width: '25px' }}
                aria-label="Scroll to next service"
                disabled={isAtEnd}
              >
                <span className="text-xl" style={{ color: primaryColor }}>›</span>
              </button>
            </div>
          </div>

          {/* Pagination dots */}
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
        </div>
      </div>
    </section>
  );
}
