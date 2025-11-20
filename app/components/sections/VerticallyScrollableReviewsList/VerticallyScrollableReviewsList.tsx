'use client';

import { useState, useEffect, useRef } from 'react';

interface Review {
  name: string;
  location?: string;
  testimonial: string;
}

interface VerticallyScrollableReviewsListProps {
  reviews: Review[];
}

export default function VerticallyScrollableReviewsList({ reviews }: VerticallyScrollableReviewsListProps) {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize with first 3 reviews
  useEffect(() => {
    if (reviews.length > 0) {
      const initial = reviews.slice(0, Math.min(3, reviews.length));
      setDisplayedReviews(initial);
      itemRefs.current = new Array(initial.length).fill(null);
    }
  }, [reviews]);

  // Handle scroll to show next review
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || reviews.length <= 3) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemHeight = containerHeight / 3;

      // If scrolled past one item, move to next
      if (scrollTop >= itemHeight * 0.8) {
        const nextIndex = (startIndex + 1) % reviews.length;
        const nextReview = reviews[nextIndex];
        
        setDisplayedReviews(prev => {
          const newList = [...prev.slice(1), nextReview];
          return newList;
        });
        
        setStartIndex(nextIndex);
        
        // Reset scroll position
        setTimeout(() => {
          container.scrollTop = 0;
        }, 50);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [startIndex, reviews]);

  if (reviews.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No reviews available</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full overflow-y-auto scroll-smooth"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#014b3c transparent',
      }}
    >
      <div className="flex flex-col md:h-full justify-start">
        {displayedReviews.map((review, index) => (
          <div
            key={`${review.name}-${startIndex + index}`}
            ref={(el) => (itemRefs.current[index] = el)}
            className="flex-shrink-0 p-4 md:p-6 border-b border-gray-200 last:border-b-0"
            style={{ minHeight: 'calc(100% / 3)' }}
          >
            <p className="text-sm md:text-base text-gray-700 mb-2">
              {review.testimonial}
            </p>
            <p className="text-sm md:text-base font-serif italic" style={{ color: '#014b3c' }}>
              - {review.name}{review.location ? `, ${review.location}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

