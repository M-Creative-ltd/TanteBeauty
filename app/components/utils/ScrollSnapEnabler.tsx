'use client';

import { useEffect } from 'react';

export default function ScrollSnapEnabler() {
  useEffect(() => {
    // Add class to html element to enable scroll snapping
    document.documentElement.classList.add('enable-snap');

    // Cleanup: remove class when component unmounts
    return () => {
      document.documentElement.classList.remove('enable-snap');
    };
  }, []);

  return null;
}

