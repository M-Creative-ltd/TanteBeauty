import { Playfair_Display, Inter } from 'next/font/google';

// Modern serif font for "Tante" - Playfair Display is elegant and modern
export const serifFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

// Sans-serif font for "Beauty" and body text - Inter is modern and readable
export const sansSerifFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});








