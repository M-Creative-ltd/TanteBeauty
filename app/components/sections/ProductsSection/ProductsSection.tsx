import Image from '../../ui/Image/Image';

interface Product {
  name: string;
  mainImage?: string;
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
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl w-full">
        {/* Heading and Subtitle */}
        <div className="text-center mb-8 md:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4"
            style={{ color: primaryColor }}
          >
            {heading}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8 md:mb-12">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.name}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                {product.mainImage && (
                  <>
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Category Name Overlay - Top Left */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                      <span
                        className="text-xs sm:text-sm md:text-base font-serif font-bold px-2 py-1 rounded"
                        style={{
                          color: primaryColor,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        {product.name}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Description Text */}
        {descriptionText && (
          <div className="text-center">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto">
              {descriptionText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

