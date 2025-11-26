'use client';

import { useEffect, useRef } from 'react';

interface Review {
  name: string;
  location?: string;
  testimonial: string;
}

interface VerticallyScrollableReviewsListProps {
  reviews: Review[];
  focusedIndex: number;
  onFocusChange: (index: number) => void;
}

export default function VerticallyScrollableReviewsList({
  reviews,
  focusedIndex,
  onFocusChange,
}: VerticallyScrollableReviewsListProps) {
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const verticalItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const horizontalItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle wheel scroll when hovering near/over the list (primarily for md+ vertical layout)
  useEffect(() => {
    const hoverArea = hoverAreaRef.current;
    if (!hoverArea) return;

    const handleWheel = (e: WheelEvent) => {
      if (!verticalScrollRef.current || !isHoveringRef.current) return;
      const container = verticalScrollRef.current;

      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const maxScroll = scrollHeight - clientHeight;
      const threshold = 10;

      const scrollDelta = e.deltaY;
      const scrollDirection = scrollDelta > 0 ? 'down' : 'up';

      const isAtTopBoundary = scrollTop <= threshold;
      const isAtBottomBoundary = scrollTop >= maxScroll - threshold;

      // If we're at the very top and scrolling up, allow natural page scroll.
      if (isAtTopBoundary && scrollDirection === 'up') {
        return;
      }

      // Special handling when we've reached the bottom with the last three reviews visible:
      // as the user continues scrolling down, advance focus to the last two reviews
      // one at a time before allowing the page to scroll.
      if (isAtBottomBoundary && scrollDirection === 'down' && reviews.length >= 3) {
        const lastIndex = reviews.length - 1;
        const secondLastIndex = reviews.length - 2;

        if (focusedIndex < secondLastIndex) {
          e.preventDefault();
          e.stopPropagation();
          onFocusChange(secondLastIndex);
          return;
        }

        if (focusedIndex === secondLastIndex) {
          e.preventDefault();
          e.stopPropagation();
          onFocusChange(lastIndex);
          return;
        }

        // focusedIndex is already at the last item; now allow page scroll
        return;
      }

      // For all other cases, take over the scroll to move the reviews list
      e.preventDefault();
      e.stopPropagation();

      const nextScrollTop = Math.max(0, Math.min(scrollTop + scrollDelta, maxScroll));
      container.scrollTop = nextScrollTop;
    };

    // Use passive: false so preventDefault works
    hoverArea.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      hoverArea.removeEventListener('wheel', handleWheel);
    };
  }, [reviews.length, focusedIndex, onFocusChange]);

  // Determine focused item for vertical layout based on scroll position
  const updateVerticalFocusFromScroll = () => {
    const container = verticalScrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    verticalItemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(itemRect.top - containerRect.top);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== focusedIndex) {
      onFocusChange(closestIndex);
    }
  };

  // Determine focused item for horizontal layout based on scroll position
  const updateHorizontalFocusFromScroll = () => {
    const container = horizontalScrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    horizontalItemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(itemRect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== focusedIndex) {
      onFocusChange(closestIndex);
    }
  };

  // Initialize focus based on current scroll positions when component mounts
  useEffect(() => {
    updateVerticalFocusFromScroll();
    updateHorizontalFocusFromScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No reviews available</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .reviews-scrollbar {
          scrollbar-width: thin;
        }
        .reviews-scrollbar::-webkit-scrollbar {
          width: 2px;
          height: 2px;
        }
        .reviews-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .reviews-scrollbar::-webkit-scrollbar-thumb {
          background-color: #014b3c;
          border-radius: 9999px;
        }
      `}</style>
      <div
        ref={hoverAreaRef}
        className="w-full h-full"
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
        }}
        style={{
          padding: '1rem',
          margin: '0.5rem',
        }}
      >
        {/* Mobile / small screens: horizontal scrollable row */}
        <div className="md:hidden w-full h-full">
          <div
            ref={horizontalScrollRef}
            onScroll={updateHorizontalFocusFromScroll}
            className="flex flex-row gap-4 overflow-x-auto scroll-smooth reviews-scrollbar pb-4"
          >
            {reviews.map((review, index) => {
              const isFocused = index === focusedIndex;
              return (
                <div
                  key={`${review.name}-mobile-${index}`}
                  ref={(el) => {
                    horizontalItemRefs.current[index] = el;
                  }}
                  onClick={() => onFocusChange(index)}
                  className={`flex-shrink-0 w-72 max-w-xs cursor-pointer transition-all duration-200 border rounded-xl ${
                    isFocused
                      ? 'bg-primary text-white shadow-lg border-primary'
                      : 'bg-white text-gray-900 border-gray-200'
                  }`}
                >
                  <div className="p-4">
                    <p
                      className={`text-sm md:text-base mb-2 ${
                        isFocused ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {review.testimonial}
                    </p>
                    <p
                      className={`text-sm md:text-base font-serif italic ${
                        isFocused ? 'text-white/90' : 'text-[#014b3c]'
                      }`}
                    >
                      - {review.name}
                      {review.location ? `, ${review.location}` : ''}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop / md+ screens: vertical scrollable column */}
        <div className="hidden md:block w-full h-full">
          <div
            ref={verticalScrollRef}
            onScroll={updateVerticalFocusFromScroll}
            className="w-full h-full overflow-y-auto scroll-smooth reviews-scrollbar"
          >
            <div className="flex flex-col h-full justify-start">
              {reviews.map((review, index) => {
                const isFocused = index === focusedIndex;
                return (
                  <div
                    key={`${review.name}-desktop-${index}`}
                    ref={(el) => {
                      verticalItemRefs.current[index] = el;
                    }}
                    onClick={() => onFocusChange(index)}
                    className={`flex-shrink-0 p-4 md:p-6 border-b last:border-b-0 cursor-pointer transition-all duration-200 ${
                      isFocused
                        ? 'bg-primary text-white shadow-lg border-primary'
                        : 'bg-white text-gray-900 border-gray-200'
                    }`}
                    style={{ minHeight: 'calc(100% / 3)' }}
                  >
                    <p
                      className={`text-sm md:text-base mb-2 ${
                        isFocused ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {review.testimonial}
                    </p>
                    <p
                      className={`text-sm md:text-base font-serif italic ${
                        isFocused ? 'text-white/90' : 'text-[#014b3c]'
                      }`}
                    >
                      - {review.name}
                      {review.location ? `, ${review.location}` : ''}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

