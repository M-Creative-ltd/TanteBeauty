'use client';

import { useEffect, useMemo, useState } from 'react';
import MediaPanel from '../MediaPanel/MediaPanel';
import VerticallyScrollableReviewsList from '../VerticallyScrollableReviewsList/VerticallyScrollableReviewsList';

interface Review {
  slug?: string;
  name: string;
  location?: string;
  testimonial: string;
  beforeImage?: string;
  afterImage?: string;
  video?: string;
}

interface ReviewsTopSubsectionProps {
  featuredReview?: Review;
  reviews: Review[];
  primaryColor?: string;
}

export default function ReviewsTopSubsection({
  featuredReview,
  reviews,
  primaryColor = '#014b3c',
}: ReviewsTopSubsectionProps) {
  // Determine initial focused index based on featured review, falling back to first review
  const initialFocusedIndex = useMemo(() => {
    if (featuredReview?.slug) {
      const featuredIndex = reviews.findIndex((r) => r.slug === featuredReview.slug);
      if (featuredIndex !== -1) return featuredIndex;
    }
    return 0;
  }, [featuredReview, reviews]);

  const [focusedIndex, setFocusedIndex] = useState(initialFocusedIndex);

  // Keep focused index in range if reviews change
  useEffect(() => {
    setFocusedIndex((current) => {
      if (current < 0) return 0;
      if (current >= reviews.length) return Math.max(0, reviews.length - 1);
      return current;
    });
  }, [reviews.length]);

  const focusedReview = reviews[focusedIndex] || reviews[0];

  return (
    <section className="min-h-screen md:h-screen flex items-center py-8 md:py-16 bg-white overflow-hidden">
      <div className="container min-w-full max-w-full px-4 py-15 sm:px-6 md:px-8 lg:px-12 w-full h-full md:py-15 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12 h-full justify-center items-center w-full">
          {/* Left: Customer Reviews Heading */}
          <div className="order-1 lg:order-1 flex items-center text-center justify-center md:text-left">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center md:text-center font-serif font-bold"
              style={{ color: primaryColor }}
            >
              CUSTOMER REVIEWS
            </h1>
          </div>

          {/* Center: Media Panel */}
          <div className="order-2 lg:order-2 flex items-center h-full justify-center overflow-hidden">
            {focusedReview && (
              <div className="relative w-full max-w-md md:max-w-lg aspect-[3/4]">
                <MediaPanel
                  beforeImage={focusedReview.beforeImage}
                  afterImage={focusedReview.afterImage}
                  video={focusedReview.video}
                />
              </div>
            )}
          </div>

          {/* Right: Featured Reviews List */}
          <div className="order-3 md:order-3 h-full w-full flex items-center md:justify-center overflow-hidden">
            <VerticallyScrollableReviewsList
              reviews={reviews}
              focusedIndex={focusedIndex}
              onFocusChange={setFocusedIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}



