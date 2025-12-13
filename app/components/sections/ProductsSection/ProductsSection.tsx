'use client';

import { useRef, useEffect, useState } from 'react';
import Image from '../../ui/Image/Image';
import Link from 'next/link';

interface Product {
  name: string;
  mainImage?: string;
  slug?: string; // Optional slug for dynamic linking
}

interface ProductsSectionProps {
  heading: string;
  subtitle?: string;
  descriptionText?: string;
  products: Product[];
  primaryColor?: string;
}

export default function ProductsSection({
    heading,
    subtitle,
    descriptionText,
    products,
    primaryColor = '#014b3c',
  }: ProductsSectionProps) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const scrollDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

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

      // Use current index to determine boundaries
      const isAtFirstItem = currentProductIndex === 0;
      const isAtLastItem = currentProductIndex === products.length - 1;

      const isAtStartBoundary = scrollLeft <= threshold;
      const isAtEndBoundary = scrollLeft >= maxScroll - threshold;

      // At the very start with the first item focused and scrolling up: let the page scroll.
      const shouldAllowPageScroll = isAtFirstItem && isAtStartBoundary && scrollDirection === 'up';

      if (shouldAllowPageScroll) {
        // Allow natural page scroll at boundaries
        return;
      }

      // When we've reached the horizontal end and keep scrolling down,
      // step focus through the remaining products until the very last one
      // has been focused, then allow the page to scroll.
      if (isAtEndBoundary && scrollDirection === 'down' && products.length > 0) {
        const lastIndex = products.length - 1;

        if (!isAtLastItem) {
          e.preventDefault();
          e.stopPropagation();

          const targetIndex = Math.min(currentProductIndex + 1, lastIndex);
          const productCards = Array.from(container.querySelectorAll('.group')) as HTMLElement[];
          const targetCard = productCards[targetIndex];

          if (targetCard) {
            const targetPosition =
              targetCard.offsetLeft - container.clientWidth / 2 + targetCard.offsetWidth / 2;

            isScrollingRef.current = true;
            container.scrollTo({
              left: Math.max(0, Math.min(targetPosition, maxScroll)),
              behavior: 'smooth',
            });

            setCurrentProductIndex(targetIndex);

            setTimeout(() => {
              isScrollingRef.current = false;
            }, 300);
          }

          return;
        }

        // Already at the last item and at the end: let the page scroll.
        return;
      }

      // Prevent default to stop page scroll
      e.preventDefault();
      e.stopPropagation();

      // Debounce: wait a bit to see if more scroll events come
      scrollDebounceRef.current = setTimeout(() => {
        if (!scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        // Products are in divs, not buttons
        const productCards = Array.from(container.children) as HTMLElement[];
        // Filter out spacers (divs without class or with specific spacer class if we added one)
        // Actually, the spacers are divs too. We need to identify product cards.
        // Product cards have 'group' class.
        const actualProductCards = productCards.filter(el => el.classList.contains('group'));
        
        if (actualProductCards.length === 0) return;

        // Find current item closest to center
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let currentIndex = 0;
        let minDistance = Infinity;

        actualProductCards.forEach((card, index) => {
          const itemCenter = card.offsetLeft + card.offsetWidth / 2;
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
          targetIndex = Math.min(currentIndex + 1, actualProductCards.length - 1);
        } else {
          // Scrolling up = move to previous item (left)
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        // Only scroll if target is different from current
        if (targetIndex !== currentIndex && actualProductCards[targetIndex]) {
          isScrollingRef.current = true;
          const targetCard = actualProductCards[targetIndex];
          const targetPosition = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.offsetWidth / 2);

          container.scrollTo({
            left: Math.max(0, Math.min(targetPosition, maxScroll)),
            behavior: 'smooth'
          });
          
          setCurrentProductIndex(targetIndex);

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
  }, [products.length, currentProductIndex]);

  // Track scroll position to update current index manually if user scrolls via touch/trackpad
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const productCards = Array.from(container.querySelectorAll('.group')) as HTMLElement[];
    
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    productCards.forEach((card, index) => {
      const itemCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== currentProductIndex) {
      setCurrentProductIndex(closestIndex);
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
  };

  const renderProductCard = (product: Product) => (
    <Link
      href={product.slug ? `/products/${product.slug}` : `/products`}
      key={product.name}
      className={`relative border-2 border-primary overflow-hidden group flex-shrink-0 snap-center w-[85%] md:w-[40%] lg:w-[22%] flex flex-col`}
    >
      {/* Image Container - Aspect Square */}
      <div className="relative aspect-square w-full">
        {product.mainImage && (
          <>
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              quality={100}
              className="object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
            />
            {/* Category Name Overlay - Top Left */}
            <div className="absolute w-full flex justify-center py-2 z-10">
              <span
                className="text-xs mx-auto sm:text-sm md:text-base font-serif font-bold px-2 py-1 rounded"
                style={{
                  color: primaryColor,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {product.name}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Learn More Button - Bottom of card */}
      <div 
        className="w-full py-3 text-center font-serif font-bold transition-colors hover:opacity-90 text-secondary"
        style={{
          backgroundColor: primaryColor,
        }}
      >
        Learn More
      </div>
    </Link>
  );

  return (
    <section className="py-12 md:py-2 md:h-[75vh] lg:py-3 bg-secondary">
      <div className="container px-4 min-w-full sm:px-6 md:px-8 lg:px-12">
        {/* Heading and Subtitle */}
        <div className="text-start mb-8 md:mb-12 font-cormorant italic font-semibold">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4"
            style={{ color: primaryColor }}
          >
            {heading}
          </h1>
          {subtitle && (
            <p className="text-start text-lg md:text-xl text-primary max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {products.length > 0 && (
          <>
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {/* Hover Area with 3rem padding around the scroll list */}
            <div
              ref={hoverAreaRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="cursor-grab active:cursor-grabbing"
              style={{
                padding: '0rem',
                margin: '0.5rem',
              }}
            >
              {/* Unified Scrollable Row for ALL screens */}
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x snap-mandatory no-scrollbar"
              >
                {/* Padding for centering/alignment
                    Mobile: Keep somewhat centered or adjust as needed.
                    MD+: Start at the start of screen (approx 2rem).
                */}
                <div className="min-w-[7.5vw] md:min-w-[2rem]" />
                
                {products.map((product) => renderProductCard(product))}
                
                <div className="min-w-[7.5vw] md:min-w-[2rem]" />
              </div>
            </div>
          </>
        )}

        {/* Description Text */}
        {descriptionText && (
          <div className="text-start">
            <p className="text-sm font-cormorant font-semibold italic sm:text-base md:text-lg text-primary py-4 max-w-4xl mx-auto md:mx-0">
              {descriptionText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
