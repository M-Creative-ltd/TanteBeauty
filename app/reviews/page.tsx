import { reader } from '../reader';
import ReviewsTopSubsection from '../components/sections/ReviewsTopSubsection/ReviewsTopSubsection';

export default async function ReviewsPage() {
  // Fetch all reviews
  const reviewSlugs = await reader.collections.reviews.list();
  const allReviews = await Promise.all(
    reviewSlugs.map(async (slug) => {
      const review = await reader.collections.reviews.read(slug);
      return review;
    })
  );

  // Filter out null reviews and sort by displayOrder
  const reviews = allReviews
    .filter((review): review is NonNullable<typeof review> => review !== null)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Find featured review
  const featuredReview = reviews.find((review) => review.featured) || null;

  // Fetch home singleton for theme colors
  const home = await reader.singletons.home.read();
  const primaryColor = home?.theme?.primaryColor || '#014b3c';

  // Transform reviews for components
  const transformedReviews = reviews.map((review) => ({
    name: review.name,
    location: review.location || undefined,
    testimonial: review.testimonial,
    beforeImage: review.beforeImage || undefined,
    afterImage: review.afterImage || undefined,
    video: review.video || undefined,
  }));

  const transformedFeaturedReview = featuredReview
    ? {
        name: featuredReview.name,
        location: featuredReview.location || undefined,
        testimonial: featuredReview.testimonial,
        beforeImage: featuredReview.beforeImage || undefined,
        afterImage: featuredReview.afterImage || undefined,
        video: featuredReview.video || undefined,
      }
    : undefined;

  return (
    <ReviewsTopSubsection
      featuredReview={transformedFeaturedReview}
      reviews={transformedReviews}
      primaryColor={primaryColor}
    />
  );
}
