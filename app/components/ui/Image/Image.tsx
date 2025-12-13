import NextImage from 'next/image';
import { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends Omit<NextImageProps, 'alt'> {
  alt: string; // Make alt required for accessibility
  priority?: boolean;
  className?: string;
  quality?: number;
}

export default function Image({ 
  alt, 
  priority = false, 
  className,
  quality = 85,
  sizes,
  ...props 
}: ImageProps) {
  return (
    <NextImage
      alt={alt}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      quality={quality}
      className={className || ''}
      sizes={sizes}
      {...props}
    />
  );
}




