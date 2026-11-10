import localFont from 'next/font/local';

// Playfair Display – self-hosted, eliminates Google Fonts network call at build time
export const serifFont = localFont({
  src: [
    { path: '../app/fonts/playfair-display-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/playfair-display-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../app/fonts/playfair-display-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../app/fonts/playfair-display-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../app/fonts/playfair-display-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../app/fonts/playfair-display-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

// Inter – self-hosted
export const sansSerifFont = localFont({
  src: [
    { path: '../app/fonts/inter-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/inter-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../app/fonts/inter-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../app/fonts/inter-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

// Cormorant Garamond – self-hosted
export const cormorantGaramondFont = localFont({
  src: [
    { path: '../app/fonts/cormorant-garamond-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../app/fonts/cormorant-garamond-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/cormorant-garamond-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../app/fonts/cormorant-garamond-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../app/fonts/cormorant-garamond-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../app/fonts/cormorant-garamond-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../app/fonts/cormorant-garamond-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../app/fonts/cormorant-garamond-500-italic.woff2', weight: '500', style: 'italic' },
    { path: '../app/fonts/cormorant-garamond-600-italic.woff2', weight: '600', style: 'italic' },
    { path: '../app/fonts/cormorant-garamond-700-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});





