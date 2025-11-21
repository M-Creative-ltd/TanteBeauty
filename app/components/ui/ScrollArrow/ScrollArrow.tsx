'use client';

import { useState, useEffect } from 'react';

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (typeof window === 'undefined') return;
      
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;
      
      setIsVisible(isScrollable && !isAtBottom);
    };

    // Check initially
    checkVisibility();

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 bg-primary rounded-full left-1/2 -translate-x-1/2 z-50 w-12 h-12 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg"
      style={{ 
        backgroundColor: 'var(--color-primary)',
        animation: 'bounceDown 2s ease-in-out infinite' 
      }}
      onClick={scrollDown}
      aria-label="Scroll down"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path 
          d="M12 5V19M12 19L5 12M12 19L19 12" 
          stroke="var(--color-secondary)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
