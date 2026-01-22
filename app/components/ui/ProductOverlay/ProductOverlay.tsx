'use client';

import { useEffect } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import Image from '../Image/Image';

interface ProductOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    productName: string;
    productImage: string;
    productDescription: string;
    productPrice: number;
    productCurrency: string;
  };
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
      className="fixed  inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex relative w-full max-w-[1071px] h-[500px] bg-white px-16 py-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-[16px] top-[32px] w-[30px] h-[30px] rounded-full border-2 border-primary flex items-center justify-center z-10 hover:bg-primary/10 transition-colors"
          aria-label="Close overlay"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="absolute"
          >
            <line
              x1="4"
              y1="4"
              x2="24"
              y2="24"
              stroke="#014B3C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="24"
              y1="4"
              x2="4"
              y2="24"
              stroke="#014B3C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Content Container - Flex Layout */}
        <div className="flex flex-row gap-6 w-full h-full">
          {/* Left Section - Text Content */}
          <div className="w-1/2 flex flex-col items-center justify-center py-[8px] gap-[56px]">
            {/* Service text card */}
            <div className="flex flex-col items-center px-10 pb-10 gap-10 w-full">
              {/* Product Name */}
              <h2 className="w-full text-center font-sans font-semibold text-2xl leading-[29px] text-primary">
                {product.productName}
              </h2>

              {/* Product Description */}
              <p className="w-full font-sans font-normal text-base leading-[19px] text-black">
                {product.productDescription}
              </p>
            </div>

            {/* Frame 8 - CTAs */}
            <div className="flex flex-row justify-between items-center px-10 py-5 gap-4 w-full">
              {/* WhatsApp CTA - Left */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-2 flex-1 hover:opacity-80 transition-opacity"
              >
                <span className="font-sans font-semibold text-sm leading-[17px] text-primary whitespace-nowrap">
                  Get In Touch
                </span>
                <FaWhatsapp className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#014B3C' }} />
              </a>

              {/* Phone CTA - Right */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex flex-row items-center gap-2 flex-1 justify-end hover:opacity-80 transition-opacity"
              >
                <span className="font-sans font-semibold text-sm leading-[17px] text-primary whitespace-nowrap">
                  call us directly
                </span>
                <FaPhone className="w-[22px] h-[22px] flex-shrink-0 transform scale-x-[-1]" style={{ color: '#014B3C' }} />
              </a>
            </div>
          </div>

          {/* Right Section - Product Image */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[500px]">
              <Image
                src={product.productImage}
                alt={product.productName}
                fill
                className="object-cover"
                sizes="(max-width: 1071px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden relative w-full max-w-[440px] h-[80vh] bg-white p-5 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-[5px] top-[20px] w-[40px] h-[40px] rounded-full border-2 border-primary flex items-center justify-center z-10 hover:bg-primary/10 transition-colors"
          aria-label="Close overlay"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="absolute"
          >
            <line
              x1="7"
              y1="7"
              x2="21"
              y2="21"
              stroke="#014B3C"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="21"
              y1="7"
              x2="7"
              y2="21"
              stroke="#014B3C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="flex flex-col items-center w-full h-full">
          {/* Product Image - ~40% */}
          <div className="flex items-center justify-center w-full h-[40%] min-h-[200px] flex-shrink-0">
            <div className="relative w-full h-full max-w-[320px]">
              <Image
                src={product.productImage}
                alt={product.productName}
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
          </div>

          {/* Text Content - ~40% */}
          <div className="flex flex-col items-center justify-center w-full h-[40%] px-4 flex-shrink-0 overflow-y-auto">
            {/* Service text card */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Product Name */}
              <h2 className="w-full text-center font-sans font-semibold text-2xl leading-[29px] text-primary">
                {product.productName}
              </h2>

              {/* Product Description */}
              <p className="w-full font-sans font-normal text-base leading-[19px] text-black">
                {product.productDescription}
              </p>
            </div>
          </div>

          {/* CTAs - ~20% */}
          <div className="flex flex-row justify-between items-center w-full h-[20%] min-h-[60px] px-4 flex-shrink-0 gap-4">
            {/* WhatsApp CTA - Left */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-2 flex-1 hover:opacity-80 transition-opacity"
            >
              <span className="font-sans font-semibold text-xs leading-[15px] text-primary whitespace-nowrap">
                Get In Touch
              </span>
              <FaWhatsapp className="w-[22px] h-[22px] flex-shrink-0" style={{ color: '#014B3C' }} />
            </a>

            {/* Phone CTA - Right */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex flex-row items-center gap-2 flex-1 justify-end hover:opacity-80 transition-opacity"
            >
              <span className="font-sans font-semibold text-xs leading-[15px] text-primary whitespace-nowrap">
                call us directly
              </span>
              <FaPhone className="w-[22px] h-[22px] flex-shrink-0 transform scale-x-[-1]" style={{ color: '#014B3C' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

