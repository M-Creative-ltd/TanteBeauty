import { reader } from './reader';
import Button from './components/ui/Button/Button';
import Image from './components/ui/Image/Image';
import Link from 'next/link';

export default async function NotFound() {
  const home = await reader.singletons.home.read();
  const primaryColor = home?.theme?.primaryColor || '#014b3c';
  const secondaryColor = home?.theme?.secondaryColor || '#fff7f5';
  const logo = home?.hero?.logo;

  return (
    <section 
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        {logo && (
          <div className="mb-8 flex justify-center">
            <Image
              src={logo}
              alt="Tante Beauty Logo"
              width={64}
              height={64}
              className="h-16 w-auto object-contain"
              priority
              quality={90}
            />
          </div>
        )}

        {/* 404 Number */}
        <h1
          className="text-8xl md:text-9xl font-serif font-bold mb-6"
          style={{ color: primaryColor }}
        >
          404
        </h1>

        {/* Message */}
        <h2
          className="text-3xl md:text-4xl font-serif font-semibold mb-4"
          style={{ color: primaryColor }}
        >
          Page Not Found
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            label="Go Home"
            href="/"
            primaryColor={primaryColor}
            className="w-full sm:w-auto"
          />
          <Link
            href="/products"
            className="px-6 py-3 text-base font-semibold uppercase rounded-lg border-2 transition-colors hover:opacity-90 w-full sm:w-auto text-center"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}

