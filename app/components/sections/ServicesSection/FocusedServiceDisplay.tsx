import Image from '../../ui/Image/Image';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';

interface FocusedServiceDisplayProps {
  service: {
    title: string;
    categoryLabel?: string;
    description: any; // markdoc content node
    image?: string;
  };
  primaryColor?: string;
}

export default function FocusedServiceDisplay({
  service,
  primaryColor = '#014b3c',
}: FocusedServiceDisplayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-center">
      {/* Large Image - Left */}
      {service.image && (
        <div className="order-2 lg:order-1">
          <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
            <Image
              src={service.image}
              alt={service.title}
              fill
              quality={100}
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      )}

      {/* Service Title and Description - Right */}
      <div className="order-1 lg:order-2 text-center md:text-left">
        {service.categoryLabel && (
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-6"
            style={{ color: primaryColor }}
          >
            {service.categoryLabel}
          </h3>
        )}
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center md:text-left">
          <MarkdownContent content={service.description} />
        </div>
      </div>
    </div>
  );
}



