import { reader } from '../reader';
import ReviewsTopSubsection from '../components/sections/ReviewsTopSubsection/ReviewsTopSubsection';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await reader.singletons.seo.read();
  const siteUrl = seo?.siteUrl || 'https://tantebeauty.com';
  const siteName = seo?.siteName || 'Tante Beauty';
  
  const title = `Customer Reviews | ${siteName}`;
  const description = `Read authentic customer reviews and testimonials about Tante Beauty products. See real results from our satisfied customers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/reviews`,
      siteName,
    },
    alternates: {
      canonical: `${siteUrl}/reviews`,
    },
  };
}

export default async function ReviewsPage() {
  // Fetch all reviews
  const reviewSlugs = await reader.collections.reviews.list();
  const allReviews = await Promise.all(
    reviewSlugs.map(async (slug) => {
      const review = await reader.collections.reviews.read(slug);
      return { review, slug };
    })
  );

  // Filter out null reviews and sort by displayOrder
  const reviewsWithSlugs = allReviews
    .filter((item): item is { review: NonNullable<typeof item.review>; slug: string } => item.review !== null)
    .sort((a, b) => (a.review.displayOrder || 0) - (b.review.displayOrder || 0));

  // Find featured review
  const featuredReviewItem = reviewsWithSlugs.find((item) => item.review.featured) || null;

  // Fetch home singleton for theme colors
  const home = await reader.singletons.home.read();
  const primaryColor = home?.theme?.primaryColor || '#014b3c';

  // Transform reviews for components
  const transformedReviews = reviewsWithSlugs.map(({ review, slug }) => ({
    slug,
    name: review.name,
    location: review.location || undefined,
    testimonial: review.testimonial,
    beforeImage: review.beforeImage || undefined,
    afterImage: review.afterImage || undefined,
    video: review.video || undefined,
  }));

  const transformedFeaturedReview = featuredReviewItem
    ? {
        slug: featuredReviewItem.slug,
        name: featuredReviewItem.review.name,
        location: featuredReviewItem.review.location || undefined,
        testimonial: featuredReviewItem.review.testimonial,
        beforeImage: featuredReviewItem.review.beforeImage || undefined,
        afterImage: featuredReviewItem.review.afterImage || undefined,
        video: featuredReviewItem.review.video || undefined,
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
