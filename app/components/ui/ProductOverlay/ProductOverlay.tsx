'use client';

import { useEffect } from 'react';
import { FaWhatsapp, FaPhone, FaRegStar } from 'react-icons/fa';
import Image from '../Image/Image';
import TestimonialCard from '../TestimonyCard/TestimonyCard';

interface Review {
  readonly fullName: string;
  readonly role: string;
  readonly rating: number;
  readonly avatar: string | null;
  readonly testimony: string;
}

interface Product {
  readonly product_name: string;
  readonly image_url: string | null;
  readonly stock_status: boolean;
  readonly price: {
    readonly amount: number | null;
    readonly currency: string;
  };
  readonly details: {
    readonly description: string;
  };
  readonly reviews: readonly Review[] | null;
}

interface ProductOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  phoneNumber: string;
  whatsappUrl: string;
}

export default function ProductOverlay({
  isOpen,
  onClose,
  product,
  phoneNumber,
  whatsappUrl,
}: ProductOverlayProps) {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto px-4 py-8 md:py-16"
      onClick={handleBackdropClick}
    >
      {/* Centering Wrapper: Uses min-h-full to allow natural scrolling if content is tall */}
      <div className="flex flex-col items-center justify-start min-h-full w-full gap-8 pointer-events-none">
        
        {/* Main Product Card */}
        <div className="pointer-events-auto relative w-full max-w-[1071px] bg-white shadow-2xl overflow-hidden flex-shrink-0">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 md:right-8 md:top-8 w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center z-20 hover:bg-primary/10 transition-colors bg-white"
            aria-label="Close overlay"
          >
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <line x1="4" y1="4" x2="24" y2="24" stroke="#014B3C" strokeWidth="3" strokeLinecap="round" />
              <line x1="24" y1="4" x2="4" y2="24" stroke="#014B3C" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </button>

          {/* Desktop Layout (SM and Up) */}
          <div className="hidden sm:flex flex-row min-h-[500px]">
            {/* Left: Text Content */}
            <div className="w-1/2 flex flex-col justify-between p-10 md:p-16">
              <div className="flex flex-col gap-6">
                <h2 className="font-sans font-semibold text-3xl text-primary">
                  {product.product_name}
                </h2>
                <p className="font-sans font-normal text-base leading-relaxed text-gray-700">
                  {product.details.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <a href={whatsappUrl} className="flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded-md">
                  <FaWhatsapp /> <span className="text-xs font-bold">WhatsApp</span>
                </a>
                <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-md">
                  <FaPhone className="scale-x-[-1]" /> <span className="text-xs font-bold">Call Now</span>
                </a>
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-1/2 relative bg-gray-50">
              <Image
                src={product.image_url || ''}
                alt={product.product_name}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>

          {/* Mobile Layout (Only XS) */}
          <div className="flex sm:hidden flex-col w-full">
            <div className="relative w-full aspect-square">
              <Image
                src={product.image_url || ''}
                alt={product.product_name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-6 flex flex-col gap-4 text-center">
              <h2 className="font-semibold text-2xl text-primary">{product.product_name}</h2>
              <p className="text-sm text-gray-600 line-clamp-4">{product.details.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <a href={whatsappUrl} className="flex items-center justify-center gap-2 py-2 border border-primary text-primary rounded-md">
                  <FaWhatsapp /> <span className="text-xs font-bold">WhatsApp</span>
                </a>
                <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-md">
                  <FaPhone className="scale-x-[-1]" /> <span className="text-xs font-bold">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section: Horizontal Wrap on MD+, Vertical on SM */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pointer-events-auto w-full max-w-[1071px] flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 pb-10">
            {product.reviews.map((review, index) => (
              <div key={index} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <TestimonialCard {...review} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}