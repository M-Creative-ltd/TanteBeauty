'use client';

import { useState, useEffect, useRef } from 'react';
import Image from '../../ui/Image/Image';

interface MediaPanelProps {
  beforeImage?: string;
  afterImage?: string;
  video?: string;
}

type MediaType = 'before' | 'after' | 'video';

export default function MediaPanel({ beforeImage, afterImage, video }: MediaPanelProps) {
  const [currentMedia, setCurrentMedia] = useState<MediaType | null>(null);
  const [availableMedia, setAvailableMedia] = useState<MediaType[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine available media and starting point
  useEffect(() => {
    const media: MediaType[] = [];
    if (beforeImage) media.push('before');
    if (afterImage) media.push('after');
    if (video) media.push('video');

    setAvailableMedia(media);
    
    // Start with first available media
    if (media.length > 0) {
      setCurrentMedia(media[0]);
    }
  }, [beforeImage, afterImage, video]);

  // Handle media cycling
  useEffect(() => {
    if (availableMedia.length === 0 || !currentMedia) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If current media is video, handle video end event
    if (currentMedia === 'video' && videoRef.current) {
      const handleVideoEnd = () => {
        // Cycle to next media after video ends
        const currentIndex = availableMedia.indexOf('video');
        const nextIndex = (currentIndex + 1) % availableMedia.length;
        setCurrentMedia(availableMedia[nextIndex]);
      };

      videoRef.current.addEventListener('ended', handleVideoEnd);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleVideoEnd);
        }
      };
    }

    // For images, show for 4 seconds then move to next
    if (currentMedia === 'before' || currentMedia === 'after') {
      timeoutRef.current = setTimeout(() => {
        const currentIndex = availableMedia.indexOf(currentMedia);
        const nextIndex = (currentIndex + 1) % availableMedia.length;
        setCurrentMedia(availableMedia[nextIndex]);
      }, 4000); // 4 seconds for natural recognition

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [currentMedia, availableMedia]);

  if (availableMedia.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No media available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Before Image */}
      {currentMedia === 'before' && beforeImage && (
        <div className="absolute inset-0">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* After Image */}
      {currentMedia === 'after' && afterImage && (
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt="After"
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Video */}
      {currentMedia === 'video' && video && (
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            loop={false}
          />
        </div>
      )}
    </div>
  );
}

