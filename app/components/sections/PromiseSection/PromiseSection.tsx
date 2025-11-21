import Image from '../../ui/Image/Image';
import MarkdownContent from '../../ui/MarkdownContent/MarkdownContent';

interface PromiseSectionProps {
  heading: string;
  body: any; // markdoc node
  illustration?: string;
  secondaryColor?: string;
  primaryColor?: string;
}

export default function PromiseSection({
  heading,
  body,
  illustration,
  secondaryColor = '#fff7f5',
  primaryColor = '#014b3c',
}: PromiseSectionProps) {
  return (
    <section 
      className="py-12 md:min-h-screen md:py-16 lg:py-20 flex items-center py-10"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl w-full">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Heading */}
          <div className="text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8"
              style={{ color: primaryColor }}
            >
              {heading}
            </h2>
          </div>

          {/* Body Text */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-center always-center">
              <MarkdownContent content={body} />
            </div>
          </div>

          {/* Illustration with Pinky Promise Animation */}
          {illustration && (
            <div className="w-full flex justify-center" style={{ perspective: '1000px' }}>
              <div className="relative w-full aspect-square max-w-lg mx-auto" style={{ transformStyle: 'preserve-3d' }}>
                <Image
                  src={illustration}
                  alt="Promise illustration"
                  fill
                  quality={100}
                  className="object-contain animate-pinky-promise"
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
