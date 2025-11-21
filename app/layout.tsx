import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { serifFont, sansSerifFont, cormorantGaramondFont } from '../lib/fonts';
import PageLayout from './components/layout/PageLayout/PageLayout';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" className={`${serifFont.variable} ${sansSerifFont.variable} ${cormorantGaramondFont.variable}`}>
      <body className={sansSerifFont.className}>
        <PageLayout>
          {children}
        </PageLayout>
      </body>
      </html>
  );
}
