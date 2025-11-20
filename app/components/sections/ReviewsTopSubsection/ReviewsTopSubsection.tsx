import MediaPanel from '../MediaPanel/MediaPanel';
import VerticallyScrollableReviewsList from '../VerticallyScrollableReviewsList/VerticallyScrollableReviewsList';

interface Review {
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
  // Use featured review for media panel, or first review with media
  const mediaReview = featuredReview || reviews.find(r => r.beforeImage || r.afterImage || r.video) || reviews[0];

  return (
    <section className="min-h-screen md:h-screen flex items-center py-8 md:py-16 bg-white">
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
          <div className="order-2 lg:order-2 flex items-center h-full  justify-center min-h-[300px] md:min-h-full lg:min-h-[500px]">
            {mediaReview && (
              <MediaPanel
                beforeImage={mediaReview.beforeImage}
                afterImage={mediaReview.afterImage}
                video={mediaReview.video}
              />
            )}
          </div>

          {/* Right: Featured Reviews List */}
          <div className="order-3 md:order-3 h-full items-center md:justify-center w-full">
            <VerticallyScrollableReviewsList reviews={reviews} />
          </div>
        </div>
      </div>
    </section>
  );
}



